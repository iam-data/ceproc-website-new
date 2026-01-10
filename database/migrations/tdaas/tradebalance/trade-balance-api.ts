// /src/pages/api/tdaas/trade-balance.ts
// REST API endpoint to serve Canada trade balance data from Neon Postgres
// Supports filtering by date range, currency, and limit

import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

// Initialize Neon client
const getDatabaseClient = () => {
  const connectionString = import.meta.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  return neon(connectionString);
};

// Query trade balance data from database
async function queryTradeBalance(params: {
  startDate?: string;
  endDate?: string;
  currency?: 'CAD' | 'USD';
  limit?: number;
}) {
  const sql = getDatabaseClient();
  
  const { startDate, endDate, currency = 'CAD', limit = 12 } = params;
  
  // Build query with optional date filtering
  let query = `
    SELECT 
      period,
      period_date,
      exports_cad,
      imports_cad,
      balance_cad,
      balance_type,
      exports_usd,
      imports_usd,
      balance_usd,
      cad_usd_rate,
      data_source,
      last_synced_at
    FROM trade_balance
  `;
  
  const conditions: string[] = [];
  const values: any[] = [];
  
  if (startDate) {
    values.push(startDate);
    conditions.push(`period_date >= $${values.length}`);
  }
  
  if (endDate) {
    values.push(endDate);
    conditions.push(`period_date <= $${values.length}`);
  }
  
  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }
  
  query += ` ORDER BY period_date DESC LIMIT $${values.length + 1}`;
  values.push(limit);
  
  try {
    const result = await sql(query, values);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
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
    
    // Validate limit
    if (limit < 1 || limit > 120) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Limit must be between 1 and 120.'
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
    const data = rawData.map((row: any) => {
      const isCad = currency === 'CAD';
      return {
        period: row.period,
        date: row.period_date,
        exports: isCad ? parseFloat(row.exports_cad) : parseFloat(row.exports_usd || 0),
        imports: isCad ? parseFloat(row.imports_cad) : parseFloat(row.imports_usd || 0),
        balance: isCad ? parseFloat(row.balance_cad) : parseFloat(row.balance_usd || 0),
        type: row.balance_type
      };
    });
    
    // Calculate summary statistics
    const totalExports = data.reduce((sum, d) => sum + d.exports, 0);
    const totalImports = data.reduce((sum, d) => sum + d.imports, 0);
    const avgBalance = data.length > 0 ? data.reduce((sum, d) => sum + d.balance, 0) / data.length : 0;
    const surplusMonths = data.filter(d => d.type === 'surplus').length;
    const deficitMonths = data.filter(d => d.type === 'deficit').length;
    
    // Find strongest and weakest months
    const strongestMonth = data.length > 0 ? data.reduce((max, d) => d.balance > max.balance ? d : max, data[0]) : null;
    const weakestMonth = data.length > 0 ? data.reduce((min, d) => d.balance < min.balance ? d : min, data[0]) : null;
    
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
        last_updated: rawData[0]?.last_synced_at || new Date().toISOString()
      },
      summary: {
        total_exports: parseFloat(totalExports.toFixed(2)),
        total_imports: parseFloat(totalImports.toFixed(2)),
        average_balance: parseFloat(avgBalance.toFixed(2)),
        surplus_months: surplusMonths,
        deficit_months: deficitMonths,
        surplus_rate: data.length > 0 ? parseFloat(((surplusMonths / data.length) * 100).toFixed(1)) : 0,
        strongest_month: strongestMonth ? {
          period: strongestMonth.period,
          balance: parseFloat(strongestMonth.balance.toFixed(2))
        } : null,
        weakest_month: weakestMonth ? {
          period: weakestMonth.period,
          balance: parseFloat(weakestMonth.balance.toFixed(2))
        } : null
      }
    };
    
    return new Response(
      JSON.stringify(response, null, 2),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
          'Access-Control-Allow-Origin': '*', // Enable CORS
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
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
};

// OPTIONS handler for CORS preflight
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
