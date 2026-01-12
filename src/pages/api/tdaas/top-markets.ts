// API Endpoint: Top Export Markets
// Path: /api/tdaas/top-markets
// Purpose: Serve Canada's top export destination data
// Data Source: Statistics Canada Table 12-10-0144-01

import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

const sql = neon(import.meta.env.DATABASE_URL);

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    
    // Query parameters
    const currency = url.searchParams.get('currency') || 'CAD';
    const limit = parseInt(url.searchParams.get('limit') || '12');
    const periodType = url.searchParams.get('periodType') || 'monthly';
    const topN = parseInt(url.searchParams.get('topN') || '15');

    // Validate parameters
    if (!['CAD', 'USD'].includes(currency)) {
      return new Response(JSON.stringify({ error: 'Invalid currency. Use CAD or USD.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Simple query - get all data and filter in JavaScript
    const marketsData = await sql`
      SELECT 
        period,
        period_date,
        period_type,
        country_code,
        country_name,
        region,
        exports_cad,
        exports_usd,
        share_of_total_cad,
        share_of_total_usd,
        rank_cad,
        rank_usd,
        yoy_change_cad,
        yoy_growth_rate,
        mom_change_cad,
        mom_growth_rate,
        exchange_rate,
        metadata
      FROM tdaas.top_export_markets
      WHERE period_type = ${periodType}
      ORDER BY period_date DESC, rank_cad ASC
      LIMIT ${limit * topN}
    `;

    // Process data based on currency
    const exportField = currency === 'CAD' ? 'exports_cad' : 'exports_usd';
    const shareField = currency === 'CAD' ? 'share_of_total_cad' : 'share_of_total_usd';
    const rankField = currency === 'CAD' ? 'rank_cad' : 'rank_usd';

    // Get latest period
    const latestPeriod = marketsData[0]?.period;
    const latestData = marketsData
      .filter((row: any) => row.period === latestPeriod)
      .slice(0, topN);

    // Calculate summary statistics
    const topMarkets = latestData
      .sort((a: any, b: any) => a[rankField] - b[rankField])
      .slice(0, 5)
      .map((row: any) => ({
        country: row.country_name,
        code: row.country_code,
        exports: parseFloat(row[exportField]),
        share: parseFloat(row[shareField]),
        rank: row[rankField]
      }));

    const totalExports = latestData.reduce((sum: number, row: any) => 
      sum + parseFloat(row[exportField]), 0
    );

    const recentData = marketsData.filter((row: any) => row.yoy_growth_rate !== null);
    const avgGrowthRate = recentData.length > 0
      ? recentData.reduce((sum: number, row: any) => sum + parseFloat(row.yoy_growth_rate), 0) / recentData.length
      : 0;

    const growingMarkets = latestData.filter((row: any) => 
      row.yoy_growth_rate && parseFloat(row.yoy_growth_rate) > 0
    );
    const fastestGrowing = growingMarkets.length > 0
      ? growingMarkets.reduce((max: any, row: any) => 
          parseFloat(row.yoy_growth_rate) > parseFloat(max.yoy_growth_rate) ? row : max
        )
      : null;

    // Group data by country
    const dataByCountry: Record<string, any[]> = {};
    marketsData.forEach((row: any) => {
      if (!dataByCountry[row.country_code]) {
        dataByCountry[row.country_code] = [];
      }
      dataByCountry[row.country_code].push({
        period: row.period,
        periodDate: row.period_date,
        exports: parseFloat(row[exportField]),
        shareOfTotal: parseFloat(row[shareField]),
        rank: row[rankField],
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
          exports: parseFloat(row[exportField]),
          shareOfTotal: parseFloat(row[shareField]),
          rank: row[rankField],
          yoyChange: row.yoy_change_cad ? parseFloat(row.yoy_change_cad) : null,
          yoyGrowthRate: row.yoy_growth_rate ? parseFloat(row.yoy_growth_rate) : null,
          momChange: row.mom_change_cad ? parseFloat(row.mom_change_cad) : null,
          momGrowthRate: row.mom_growth_rate ? parseFloat(row.mom_growth_rate) : null,
          exchangeRate: row.exchange_rate ? parseFloat(row.exchange_rate) : null,
          metadata: row.metadata
        })).slice(0, limit * topN),
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
            exports: parseFloat(fastestGrowing[exportField])
          } : null,
          recordCount: marketsData.length,
          periodsIncluded: limit,
          countriesIncluded: topN
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
          topN
        }
      }
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
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