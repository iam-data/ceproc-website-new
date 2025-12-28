// src/lib/db.ts
import { neon } from '@neondatabase/serverless';

export interface DBEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  location: string;
  url: string;
  organizerId: string;
  organizerName: string;
  isFree: boolean;
  country: string;
  eventType: string;
}

const sql = neon(process.env.DATABASE_URL!);

export async function saveEvents(events: DBEvent[], scraperName: string) {
  try {
    // Delete old events from this scraper
    await sql`DELETE FROM events WHERE organizer_id = ${scraperName}`;
    
    // Insert new events
    for (const event of events) {
      await sql`
        INSERT INTO events (
          id, title, description, start_date, location, url,
          organizer_id, organizer_name, is_free, country, event_type
        ) VALUES (
          ${event.id}, ${event.title}, ${event.description}, 
          ${event.startDate}, ${event.location}, ${event.url},
          ${event.organizerId}, ${event.organizerName}, ${event.isFree},
          ${event.country}, ${event.eventType}
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          start_date = EXCLUDED.start_date,
          location = EXCLUDED.location,
          url = EXCLUDED.url,
          updated_at = NOW()
      `;
    }
    
    // Log scraper run
    await sql`
      INSERT INTO scraper_runs (scraper_name, events_count, status)
      VALUES (${scraperName}, ${events.length}, 'success')
    `;
    
    return { success: true, count: events.length };
  } catch (error) {
    await sql`
      INSERT INTO scraper_runs (scraper_name, status, error_message)
      VALUES (${scraperName}, 'error', ${String(error)})
    `;
    throw error;
  }
}

export async function getAllEvents() {
  const rows = await sql`
    SELECT 
      id, title, description, 
      start_date as "startDate",
      location, url, organizer_id as "organizerId",
      organizer_name as "organizerName",
      is_free as "isFree", country, event_type as "eventType"
    FROM events
    ORDER BY start_date ASC
  `;
  return rows;
}
