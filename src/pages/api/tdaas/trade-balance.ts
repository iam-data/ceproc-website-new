// src/pages/api/tdaas/trade-balance.ts
// API endpoint for Trade Balance Trends dataset

import type { APIRoute } from 'astro';
import db from "../../../../lib/db";

export const GET: APIRoute = async ({ request, url }) => {
  try {
    // Parse query parameters
    const searchParams = url.searchParams;
    const startDate = searchParams.get('startDate') || '2020-01-01';
    const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0];
    const granularity = searchParams.get('granularity') || 'month'; // month, quarter, year
    
    // Check cache first
    const cacheKey = `trade-balance-${startDate}-${endDate}-${granularity}`;
    const cachedResult = await db.execute(`
      SELECT cache_data 
      FROM trade_cache 
      WHERE cache_key = $1 AND expires_at > NOW()
    `, [cacheKey]);

    if (cachedResult.rows.length > 0) {
      return new Response(
        JSON.stringify({
          success: true,
          cached: true,
          ...cachedResult.rows[0].cache_data
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600'
          }
        }
      );
    }

    // Determine date truncation based on granularity
    let dateTrunc = 'month';
    if (granularity === 'quarter') dateTrunc = 'quarter';
    if (granularity === 'year') dateTrunc = 'year';

    // Query trade balance data
    const result = await db.execute(`
      SELECT 
        DATE_TRUNC($1, trade_date) as period,
        SUM(CASE WHEN trade_flow = 'export' THEN trade_value_cad ELSE 0 END) as exports_cad,
        SUM(CASE WHEN trade_flow = 'import' THEN trade_value_cad ELSE 0 END) as imports_cad,
        SUM(CASE WHEN trade_flow = 'export' THEN trade_value_cad ELSE 0 END) - 
          SUM(CASE WHEN trade_flow = 'import' THEN trade_value_cad ELSE 0 END) as balance_cad,
        COUNT(DISTINCT country_code) as country_count,
        COUNT(DISTINCT commodity_code) as commodity_count
      FROM trade_data
      WHERE trade_date BETWEEN $2 AND $3
      GROUP BY DATE_TRUNC($1, trade_date)
      ORDER BY period DESC
      LIMIT 100
    `, [dateTrunc, startDate, endDate]);

    // Format data for chart
    const chartData = result.rows.map((row: any) => ({
      period: row.period,
      exports: parseFloat(row.exports_cad) / 1000000, // Convert to millions
      imports: parseFloat(row.imports_cad) / 1000000,
      balance: parseFloat(row.balance_cad) / 1000000,
      countryCount: parseInt(row.country_count),
      commodityCount: parseInt(row.commodity_count)
    }));

    // Calculate summary statistics
    const summary = {
      totalPeriods: chartData.length,
      avgExports: chartData.reduce((sum, d) => sum + d.exports, 0) / chartData.length,
      avgImports: chartData.reduce((sum, d) => sum + d.imports, 0) / chartData.length,
      avgBalance: chartData.reduce((sum, d) => sum + d.balance, 0) / chartData.length,
      latestPeriod: chartData[0],
      surplusPeriods: chartData.filter(d => d.balance > 0).length,
      deficitPeriods: chartData.filter(d => d.balance < 0).length
    };

    const responseData = {
      success: true,
      cached: false,
      dataset: 'trade-balance',
      title: 'Canada Trade Balance Trends',
      parameters: {
        startDate,
        endDate,
        granularity
      },
      metadata: {
        currency: 'CAD (Millions)',
        source: 'Statistics Canada',
        lastUpdated: new Date().toISOString()
      },
      summary,
      data: chartData.reverse() // Reverse to show oldest first for charts
    };

    // Cache the result for 6 hours
    await db.execute(`
      INSERT INTO trade_cache (cache_key, dataset_id, cache_data, expires_at)
      VALUES ($1, $2, $3, NOW() + INTERVAL '6 hours')
      ON CONFLICT (cache_key) 
      DO UPDATE SET cache_data = $3, expires_at = NOW() + INTERVAL '6 hours'
    `, [cacheKey, 'trade-balance', responseData]);

    return new Response(
      JSON.stringify(responseData),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600'
        }
      }
    );

  } catch (error) {
    console.error('Error fetching trade balance data:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch trade balance data',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};

// Export CSV format
export const POST: APIRoute = async ({ request }) => {
  // This endpoint will handle CSV export requests
  // Implementation coming in next phase
  return new Response('CSV export endpoint', { status: 501 });
};
