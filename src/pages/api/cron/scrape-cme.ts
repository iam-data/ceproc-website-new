// src/pages/api/cron/scrape-cme.ts
import type { APIRoute } from 'astro';
import { scrapeCME } from '../../../scrapers/cme-scraper';
import { saveEvents } from '../../../lib/db';

export const GET: APIRoute = async ({ request }) => {
  // Verify this is actually Vercel calling
  const authHeader = request.headers.get('authorization');
  const cronSecret = import.meta.env.CRON_SECRET;
  
  if (authHeader !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    console.log('🔄 Starting CME scrape via cron...');
    
    const events = await scrapeCME();
    
    console.log(`✅ Scraped ${events.length} CME events`);
    
    // Save to database
    await saveEvents(events, 'cme');
    
    console.log('✅ Saved CME events to database');
    
    return new Response(JSON.stringify({ 
      success: true, 
      scraped: events.length,
      message: 'CME events updated successfully'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ CME cron scrape failed:', error);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
