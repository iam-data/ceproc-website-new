// src/pages/api/tdaas/datasets.ts
// API endpoint to list all available TDaaS datasets

import type { APIRoute } from 'astro';
import { db } from '@lib/db';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Query datasets from database
    const result = await db.execute(`
      SELECT 
        dataset_key,
        title,
        description,
        value_proposition,
        icon,
        category,
        last_updated,
        record_count,
        is_active
      FROM trade_datasets
      WHERE is_active = true
      ORDER BY 
        CASE category
          WHEN 'Overview' THEN 1
          WHEN 'Markets' THEN 2
          WHEN 'Commodities' THEN 3
          WHEN 'Regional' THEN 4
          WHEN 'Sectors' THEN 5
          WHEN 'Policy' THEN 6
          ELSE 7
        END,
        title ASC
    `);

    const datasets = result.rows.map((row: any) => ({
      key: row.dataset_key,
      title: row.title,
      description: row.description,
      value: row.value_proposition,
      icon: row.icon,
      category: row.category,
      lastUpdated: row.last_updated,
      recordCount: row.record_count,
      apiEndpoint: `/api/tdaas/${row.dataset_key}`
    }));

    return new Response(
      JSON.stringify({
        success: true,
        count: datasets.length,
        datasets
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        }
      }
    );

  } catch (error) {
    console.error('Error fetching datasets:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch datasets',
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
