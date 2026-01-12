// API Endpoint: Trade Balance
// Path: /api/tdaas/trade-balance
// Purpose: Serve Canada's trade balance data

import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

const sql = neon(import.meta.env.DATABASE_URL);

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    
    // Query parameters
    const currency = url.searchParams.get('currency') || 'CAD';
    const limit = parseInt(url.searchParams.get('limit') || '12');

    // Validate currency
    if (!['CAD', 'USD'].includes(currency)) {
      return new Response(JSON.stringify({ error: 'Invalid currency. Use CAD or USD.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate limit
    if (limit < 1 || limit > 60) {
      return new Response(JSON.stringify({ error: 'Limit must be between 1 and 60' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch balance data - simple query
    const balanceData = await sql`
      SELECT 
        period,
        period_date,
        exports_cad,
        imports_cad,
        balance_cad,
        exports_usd,
        imports_usd,
        balance_usd,
        balance_type,
        exchange_rate,
        metadata
      FROM tdaas.trade_balance
      ORDER BY period_date DESC
      LIMIT ${limit}
    `;

    // Calculate summary statistics in JavaScript
    const currencyField = currency === 'CAD' ? 'balance_cad' : 'balance_usd';
    
    let surplusCount = 0;
    let deficitCount = 0;
    let totalBalance = 0;
    let maxBalance = -Infinity;
    let minBalance = Infinity;
    let bestMonth = null;
    let worstMonth = null;

    balanceData.forEach((row: any) => {
      const balance = parseFloat(row[currencyField]);
      totalBalance += balance;
      
      if (row.balance_type === 'surplus') surplusCount++;
      if (row.balance_type === 'deficit') deficitCount++;
      
      if (balance > maxBalance) {
        maxBalance = balance;
        bestMonth = { period: row.period, balance };
      }
      if (balance < minBalance) {
        minBalance = balance;
        worstMonth = { period: row.period, balance };
      }
    });

    const avgBalance = balanceData.length > 0 ? totalBalance / balanceData.length : 0;
    const surplusRate = balanceData.length > 0 ? (surplusCount / balanceData.length * 100) : 0;

    // Prepare response based on selected currency
    const exportField = currency === 'CAD' ? 'exports_cad' : 'exports_usd';
    const importField = currency === 'CAD' ? 'imports_cad' : 'imports_usd';

    const response = {
      success: true,
      data: {
        balance: balanceData.map((row: any) => ({
          period: row.period,
          periodDate: row.period_date,
          exports: parseFloat(row[exportField]),
          imports: parseFloat(row[importField]),
          balance: parseFloat(row[currencyField]),
          balanceType: row.balance_type,
          exchangeRate: row.exchange_rate ? parseFloat(row.exchange_rate) : null,
          metadata: row.metadata
        })),
        summary: {
          currency,
          totalPeriods: balanceData.length,
          surplusCount,
          deficitCount,
          surplusRate: surplusRate.toFixed(2),
          avgBalance: avgBalance.toFixed(2),
          bestMonth: bestMonth ? {
            period: bestMonth.period,
            balance: bestMonth.balance.toFixed(2)
          } : null,
          worstMonth: worstMonth ? {
            period: worstMonth.period,
            balance: worstMonth.balance.toFixed(2)
          } : null
        }
      },
      metadata: {
        source: 'Statistics Canada',
        table: '12-10-0011-01',
        description: 'Canada merchandise trade balance (imports, exports, and balance)',
        lastUpdated: new Date().toISOString(),
        queryParams: {
          currency,
          limit
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
    console.error('Error fetching trade balance data:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch trade balance data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};