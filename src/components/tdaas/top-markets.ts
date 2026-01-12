// API Endpoint: Top Export Markets
// Path: /api/tdaas/top-markets
// Purpose: Serve Canada's top export destination data with filtering, aggregation, and comparison features
// Data Source: Statistics Canada Table 12-10-0144-01

import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

const sql = neon(import.meta.env.DATABASE_URL);

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    
    // Query parameters
    const currency = url.searchParams.get('currency') || 'CAD';
    const limit = parseInt(url.searchParams.get('limit') || '12'); // Number of months
    const periodType = url.searchParams.get('periodType') || 'monthly'; // 'monthly' or 'annual'
    const topN = parseInt(url.searchParams.get('topN') || '15'); // Top N countries
    const countries = url.searchParams.get('countries'); // Comma-separated country codes for comparison
    const compareMode = url.searchParams.get('compareMode') || 'false'; // Enable country comparison

    // Validate parameters
    if (!['CAD', 'USD'].includes(currency)) {
      return new Response(JSON.stringify({ error: 'Invalid currency. Use CAD or USD.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (limit < 1 || limit > 60) {
      return new Response(JSON.stringify({ error: 'Limit must be between 1 and 60' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Build country filter for comparison mode
    let countryFilter = '';
    let countryList: string[] = [];
    
    if (compareMode === 'true' && countries) {
      countryList = countries.split(',').map(c => c.trim().toUpperCase());
      const placeholders = countryList.map((_, i) => `$${i + 1}`).join(',');
      countryFilter = `AND country_code IN (${placeholders})`;
    }

    // Determine which fields to select based on currency
    const exportField = currency === 'CAD' ? 'exports_cad' : 'exports_usd';
    const shareField = currency === 'CAD' ? 'share_of_total_cad' : 'share_of_total_usd';
    const rankField = currency === 'CAD' ? 'rank_cad' : 'rank_usd';

    // Fetch data with proper parameterized query
    let marketsData;
    
    if (compareMode === 'true' && countries) {
      // Comparison mode: Get specific countries across time periods
      marketsData = await sql`
        SELECT 
          period,
          period_date,
          period_type,
          country_code,
          country_name,
          region,
          ${sql(exportField)} as exports,
          ${sql(shareField)} as share_of_total,
          ${sql(rankField)} as rank,
          yoy_change_cad,
          yoy_growth_rate,
          mom_change_cad,
          mom_growth_rate,
          exchange_rate,
          metadata
        FROM tdaas.top_export_markets
        WHERE period_type = ${periodType}
          AND country_code = ANY(${countryList})
        ORDER BY period_date DESC, rank ASC
        LIMIT ${limit * countryList.length}
      `;
    } else {
      // Normal mode: Get top N countries for each period
      marketsData = await sql`
        WITH RankedMarkets AS (
          SELECT 
            period,
            period_date,
            period_type,
            country_code,
            country_name,
            region,
            ${sql(exportField)} as exports,
            ${sql(shareField)} as share_of_total,
            ${sql(rankField)} as rank,
            yoy_change_cad,
            yoy_growth_rate,
            mom_change_cad,
            mom_growth_rate,
            exchange_rate,
            metadata,
            ROW_NUMBER() OVER (PARTITION BY period ORDER BY ${sql(rankField)} ASC) as period_rank
          FROM tdaas.top_export_markets
          WHERE period_type = ${periodType}
        )
        SELECT *
        FROM RankedMarkets
        WHERE period_rank <= ${topN}
          AND period_date >= (
            SELECT MAX(period_date) - INTERVAL '${limit} months'
            FROM tdaas.top_export_markets
            WHERE period_type = ${periodType}
          )
        ORDER BY period_date DESC, rank ASC
      `;
    }

    // Calculate summary statistics
    const latestPeriod = marketsData[0]?.period;
    const latestData = marketsData.filter((row: any) => row.period === latestPeriod);

    // Get top 5 markets from latest period
    const topMarkets = latestData
      .sort((a: any, b: any) => a.rank - b.rank)
      .slice(0, 5)
      .map((row: any) => ({
        country: row.country_name,
        code: row.country_code,
        exports: parseFloat(row.exports),
        share: parseFloat(row.share_of_total),
        rank: row.rank
      }));

    // Calculate total exports for latest period
    const totalExports = latestData.reduce((sum: number, row: any) => 
      sum + parseFloat(row.exports), 0
    );

    // Calculate average growth rate (latest 12 months, excluding nulls)
    const recentData = marketsData.filter((row: any) => row.yoy_growth_rate !== null);
    const avgGrowthRate = recentData.length > 0
      ? recentData.reduce((sum: number, row: any) => sum + parseFloat(row.yoy_growth_rate), 0) / recentData.length
      : 0;

    // Find fastest growing market (latest period, positive growth)
    const growingMarkets = latestData.filter((row: any) => 
      row.yoy_growth_rate && parseFloat(row.yoy_growth_rate) > 0
    );
    const fastestGrowing = growingMarkets.length > 0
      ? growingMarkets.reduce((max: any, row: any) => 
          parseFloat(row.yoy_growth_rate) > parseFloat(max.yoy_growth_rate) ? row : max
        )
      : null;

    // Group data by country for easier frontend processing
    const dataByCountry: Record<string, any[]> = {};
    marketsData.forEach((row: any) => {
      if (!dataByCountry[row.country_code]) {
        dataByCountry[row.country_code] = [];
      }
      dataByCountry[row.country_code].push({
        period: row.period,
        periodDate: row.period_date,
        exports: parseFloat(row.exports),
        shareOfTotal: parseFloat(row.share_of_total),
        rank: row.rank,
        yoyChange: row.yoy_change_cad ? parseFloat(row.yoy_change_cad) : null,
        yoyGrowthRate: row.yoy_growth_rate ? parseFloat(row.yoy_growth_rate) : null,
        momChange: row.mom_change_cad ? parseFloat(row.mom_change_cad) : null,
        momGrowthRate: row.mom_growth_rate ? parseFloat(row.mom_growth_rate) : null
      });
    });

    // Prepare response
    const response = {
      success: true,
      data: {
        markets: marketsData.map((row: any) => ({
          period: row.period,
          periodDate: row.period_date,
          periodType: row.period_type,
          countryCode: row.country_code,
          countryName: row.country_name,
          region: row.region,
          exports: parseFloat(row.exports),
          shareOfTotal: parseFloat(row.share_of_total),
          rank: row.rank,
          yoyChange: row.yoy_change_cad ? parseFloat(row.yoy_change_cad) : null,
          yoyGrowthRate: row.yoy_growth_rate ? parseFloat(row.yoy_growth_rate) : null,
          momChange: row.mom_change_cad ? parseFloat(row.mom_change_cad) : null,
          momGrowthRate: row.mom_growth_rate ? parseFloat(row.mom_growth_rate) : null,
          exchangeRate: row.exchange_rate ? parseFloat(row.exchange_rate) : null,
          metadata: row.metadata
        })),
        dataByCountry,
        summary: {
          latestPeriod,
          currency,
          periodType,
          topMarkets,
          totalExports: parseFloat(totalExports.toFixed(2)),
          avgGrowthRate: parseFloat(avgGrowthRate.toFixed(2)),
          fastestGrowing: fastestGrowing ? {
            country: fastestGrowing.country_name,
            code: fastestGrowing.country_code,
            growthRate: parseFloat(fastestGrowing.yoy_growth_rate),
            exports: parseFloat(fastestGrowing.exports)
          } : null,
          recordCount: marketsData.length,
          periodsIncluded: limit,
          countriesIncluded: compareMode === 'true' && countries ? countryList.length : topN
        }
      },
      metadata: {
        source: 'Statistics Canada',
        table: '12-10-0144-01',
        description: 'Canada merchandise exports by destination country',
        lastUpdated: new Date().toISOString(),
        queryParams: {
          currency,
          limit,
          periodType,
          topN,
          compareMode,
          countries: compareMode === 'true' ? countryList : null
        }
      }
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Error fetching top export markets:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch export markets data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
