// src/pages/api/events.ts
// Modular Event Aggregator - Each scraper is independent

import { scrapeEDC } from '../../scrapers/edc-scraper';
import { scrapeBDC } from '../../scrapers/bdc-scraper';
import { scrapeCME } from '../../scrapers/cme-scraper';

interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  url: string;
  organizerId: string;
  organizerName: string;
  isFree?: boolean;
  country?: 'CA' | 'US';
  eventType?: 'webinar' | 'trade-mission' | 'conference' | 'workshop' | 'training' | 'networking';
}

// Cache configuration
let cachedEvents: Event[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes for testing (change to 6 hours later)

function getFutureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(14, 0, 0, 0);
  return date.toISOString();
}

// Curated events for organizations we don't scrape yet
const curatedEvents: Event[] = [
  // EDC events are now scraped - no manual events needed
  
  {
    id: "tcs-asia-markets",
    title: "Accessing Asian Markets: Export Strategies",
    description: "Trade Commissioners share insights on market entry strategies for Asia.",
    startDate: getFutureDate(25),
    location: "Online Webinar",
    url: "https://www.tradecommissioner.gc.ca/en/trade-events-training.html",
    organizerId: "tcs",
    organizerName: "Canadian Trade Commissioner Service",
    isFree: true,
    country: 'CA',
    eventType: 'trade-mission'
  },
  {
    id: "us-commerce-export-basics",
    title: "Export Basics for Small Businesses",
    description: "U.S. Department of Commerce webinar on getting started with exporting.",
    startDate: getFutureDate(12),
    location: "Online Webinar",
    url: "https://trade.gov/network-and-learn-events",
    organizerId: "us-commerce",
    organizerName: "U.S. Department of Commerce",
    isFree: true,
    country: 'US',
    eventType: 'webinar'
  },
  {
    id: "exim-bank-financing",
    title: "Export Financing Solutions Workshop",
    description: "Learn about EXIM Bank financing options for exporters.",
    startDate: getFutureDate(22),
    location: "Washington, D.C.",
    url: "https://www.exim.gov/",
    organizerId: "exim-bank",
    organizerName: "Export-Import Bank of the United States",
    isFree: true,
    country: 'US',
    eventType: 'workshop'
  },
];

async function aggregateEvents(): Promise<Event[]> {
  const now = Date.now();
  
  // Return cached events if still valid
  if (cachedEvents.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
    console.log('📦 Using cached events');
    return cachedEvents;
  }
  
  console.log('🔄 Fetching fresh events from all sources...');
  
  // Scrape each source independently - failures don't affect others
  const [edcEvents, bdcEvents, cmeEvents] = await Promise.allSettled([
    scrapeEDC(),
    scrapeBDC(),
    scrapeCME()
  ]);
  
  // Collect successful results
  const allEvents: Event[] = [];
  
  if (edcEvents.status === 'fulfilled') {
    allEvents.push(...edcEvents.value);
  } else {
    console.error('EDC scraper failed:', edcEvents.reason);
  }
  
  if (bdcEvents.status === 'fulfilled') {
    allEvents.push(...bdcEvents.value);
  } else {
    console.error('BDC scraper failed:', bdcEvents.reason);
  }
  
  if (cmeEvents.status === 'fulfilled') {
    allEvents.push(...cmeEvents.value);
  } else {
    console.error('CME scraper failed:', cmeEvents.reason);
  }
  
  // Add curated events
  allEvents.push(...curatedEvents);
  
  // Remove duplicates by URL
  const uniqueEvents = new Map<string, Event>();
  for (const event of allEvents) {
    if (!uniqueEvents.has(event.url)) {
      uniqueEvents.set(event.url, event);
    }
  }
  
  // Filter out past events
  const futureEvents = Array.from(uniqueEvents.values()).filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate >= new Date();
  });
  
  // Sort by date
  futureEvents.sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  
  // Update cache
  cachedEvents = futureEvents;
  lastFetchTime = now;
  
  console.log(`✅ Total events: ${futureEvents.length}`);
  console.log(`   - EDC: ${futureEvents.filter(e => e.organizerId === 'edc').length}`);
  console.log(`   - BDC: ${futureEvents.filter(e => e.organizerId === 'bdc').length}`);
  console.log(`   - CME: ${futureEvents.filter(e => e.organizerId === 'cme').length}`);
  console.log(`   - Curated: ${futureEvents.filter(e => ['tcs', 'us-commerce', 'exim-bank'].includes(e.organizerId)).length}`);
  
  return futureEvents;
}

export async function GET({ request }: { request: Request }) {
  try {
    const allEvents = await aggregateEvents();
    
    const canadianEvents = allEvents.filter(e => e.country === 'CA').length;
    const usEvents = allEvents.filter(e => e.country === 'US').length;
    
    return new Response(JSON.stringify({
      success: true,
      count: allEvents.length,
      events: allEvents,
      meta: {
        canadianEvents,
        usEvents,
        total: allEvents.length,
        lastUpdated: new Date(lastFetchTime).toISOString(),
        cacheValid: (Date.now() - lastFetchTime) < CACHE_DURATION,
        scrapers: {
          edc: allEvents.filter(e => e.organizerId === 'edc').length,
          bdc: allEvents.filter(e => e.organizerId === 'bdc').length,
          cme: allEvents.filter(e => e.organizerId === 'cme').length
        }
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
  } catch (error) {
    console.error('❌ Error in events API:', error);
    
    return new Response(JSON.stringify({
      success: false,
      count: 0,
      events: curatedEvents,
      meta: {
        error: 'Event aggregation failed',
        fallback: true
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}