// /src/pages/api/tdaas/trade-balance.ts
// REST API endpoint to serve Canada trade balance data
// Supports filtering by date range, currency, and limit

import type { APIRoute } from 'astro';

// Mock database query function
// TODO: Replace with actual database connection
async function queryTradeBalance(params: {
  startDate?: string;
  endDate?: string;
  currency?: 'CAD' | 'USD';
  limit?: number;
}) {
  // This would normally query PostgreSQL
  // For now, return sample data structure
  
  const sampleData = [
    {
      period: '2024-12',
      period_date: '2024-12-01',
      exports_cad: 69120.3,
      imports_cad: 66890.5,
      balance_cad: 2229.8,
      balance_type: 'surplus',
      exports_usd: 50650.0,
      imports_usd: 49000.0,
      balance_usd: 1650.0
    },
    {
      period: '2024-11',
      period_date: '2024-11-01',
      exports_cad: 68890.7,
      imports_cad: 65920.4,
      balance_cad: 2970.3,
      balance_type: 'surplus',
      exports_usd: 50450.0,
      imports_usd: 48300.0,
      balance_usd: 2150.0
    },
    {
      period: '2024-10',
      period_date: '2024-10-01',
      exports_cad: 68420.5,
      imports_cad: 65180.2,
      balance_cad: 3240.3,
      balance_type: 'surplus',
      exports_usd: 50100.0,
      imports_usd: 47750.0,
      balance_usd: 2350.0
    },
    {
      period: '2024-09',
      period_date: '2024-09-01',
      exports_cad: 67890.3,
      imports_cad: 64520.8,
      balance_cad: 3369.5,
      balance_type: 'surplus',
      exports_usd: 49800.0,
      imports_usd: 47300.0,
      balance_usd: 2500.0
    },
    {
      period: '2024-08',
      period_date: '2024-08-01',
      exports_cad: 66750.8,
      imports_cad: 63890.4,
      balance_cad: 2860.4,
      balance_type: 'surplus',
      exports_usd: 48900.0,
      imports_usd: 46800.0,
      balance_usd: 2100.0
    },
    {
      period: '2024-07',
      period_date: '2024-07-01',
      exports_cad: 65980.2,
      imports_cad: 64120.6,
      balance_cad: 1859.6,
      balance_type: 'surplus',
      exports_usd: 48300.0,
      imports_usd: 47000.0,
      balance_usd: 1300.0
    },
    {
      period: '2024-06',
      period_date: '2024-06-01',
      exports_cad: 67210.5,
      imports_cad: 65780.3,
      balance_cad: 1430.2,
      balance_type: 'surplus',
      exports_usd: 49200.0,
      imports_usd: 48200.0,
      balance_usd: 1000.0
    },
    {
      period: '2024-05',
      period_date: '2024-05-01',
      exports_cad: 66540.7,
      imports_cad: 66890.1,
      balance_cad: -349.4,
      balance_type: 'deficit',
      exports_usd: 48750.0,
      imports_usd: 49000.0,
      balance_usd: -250.0
    },
    {
      period: '2024-04',
      period_date: '2024-04-01',
      exports_cad: 65320.4,
      imports_cad: 64230.8,
      balance_cad: 1089.6,
      balance_type: 'surplus',
      exports_usd: 47850.0,
      imports_usd: 47050.0,
      balance_usd: 800.0
    },
    {
      period: '2024-03',
      period_date: '2024-03-01',
      exports_cad: 66890.2,
      imports_cad: 65120.5,
      balance_cad: 1769.7,
      balance_type: 'surplus',
      exports_usd: 49000.0,
      imports_usd: 47700.0,
      balance_usd: 1300.0
    },
    {
      period: '2024-02',
      period_date: '2024-02-01',
      exports_cad: 64780.6,
      imports_cad: 63450.2,
      balance_cad: 1330.4,
      balance_type: 'surplus',
      exports_usd: 47450.0,
      imports_usd: 46500.0,
      balance_usd: 950.0
    },
    {
      period: '2024-01',
      period_date: '2024-01-01',
      exports_cad: 65120.8,
      imports_cad: 64890.3,
      balance_cad: 230.5,
      balance_type: 'surplus',
      exports_usd: 47700.0,
      imports_usd: 47550.0,
      balance_usd: 150.0
    }
  ];
  
  // Apply limit
  const limit = params.limit || 12;
  return sampleData.slice(0, limit);
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    
    // Parse query parameters
    const startDate = url.searchParams.get('start_date') || undefined;
    const endDate = url.searchParams.get('end_date') || undefined;
    const currency = (url.searchParams.get('currency') || 'CAD').toUpperCase() as 'CAD' | 'USD';
    const limit = parseInt(url.searchParams.get('limit') || '12');
    
    // Validate currency
    if (currency !== 'CAD' && currency !== 'USD') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid currency. Must be CAD or USD.'
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Query database
    const rawData = await queryTradeBalance({
      startDate,
      endDate,
      currency,
      limit
    });
    
    // Transform data based on currency selection
    const data = rawData.map(row => {
      const isCad = currency === 'CAD';
      return {
        period: row.period,
        date: row.period_date,
        exports: isCad ? row.exports_cad : row.exports_usd,
        imports: isCad ? row.imports_cad : row.imports_usd,
        balance: isCad ? row.balance_cad : row.balance_usd,
        type: row.balance_type
      };
    });
    
    // Calculate summary statistics
    const totalExports = data.reduce((sum, d) => sum + d.exports, 0);
    const totalImports = data.reduce((sum, d) => sum + d.imports, 0);
    const avgBalance = data.reduce((sum, d) => sum + d.balance, 0) / data.length;
    const surplusMonths = data.filter(d => d.type === 'surplus').length;
    const deficitMonths = data.filter(d => d.type === 'deficit').length;
    
    // Build response
    const response = {
      success: true,
      data: data,
      metadata: {
        total_records: data.length,
        date_range: {
          start: data[data.length - 1]?.date || null,
          end: data[0]?.date || null
        },
        currency: currency,
        unit: 'millions',
        source: 'Statistics Canada',
        table: '12-10-0011-01',
        seasonally_adjusted: true,
        last_updated: new Date().toISOString()
      },
      summary: {
        total_exports: parseFloat(totalExports.toFixed(2)),
        total_imports: parseFloat(totalImports.toFixed(2)),
        average_balance: parseFloat(avgBalance.toFixed(2)),
        surplus_months: surplusMonths,
        deficit_months: deficitMonths,
        surplus_rate: parseFloat(((surplusMonths / data.length) * 100).toFixed(1))
      }
    };
    
    return new Response(
      JSON.stringify(response, null, 2),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        }
      }
    );
    
  } catch (error) {
    console.error('Trade balance API error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

// OPTIONS handler for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
};
