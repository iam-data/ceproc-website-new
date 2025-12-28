// src/pages/api/setup-database.ts
import type { APIRoute } from 'astro';
import { neon } from '@neondatabase/serverless';

export const GET: APIRoute = async () => {
  const sql = neon(process.env.DATABASE_URL!);
  
  try {
    // Create events table
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        start_date TIMESTAMP NOT NULL,
        location TEXT,
        url TEXT NOT NULL,
        organizer_id TEXT NOT NULL,
        organizer_name TEXT NOT NULL,
        is_free BOOLEAN DEFAULT true,
        country TEXT NOT NULL,
        event_type TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_organizer ON events(organizer_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_country ON events(country)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_start_date ON events(start_date)`;
    
    // Create scraper_runs table
    await sql`
      CREATE TABLE IF NOT EXISTS scraper_runs (
        id SERIAL PRIMARY KEY,
        scraper_name TEXT NOT NULL,
        events_count INTEGER,
        status TEXT,
        error_message TEXT,
        run_at TIMESTAMP DEFAULT NOW()
      )
    `;
    
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Database tables created successfully!'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
