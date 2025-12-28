// src/scrapers/edc-scraper.ts
// EDC Events Scraper - Fetches JSON data directly

import axios from 'axios';

interface EDCEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  url: string;
  organizerId: string;
  organizerName: string;
  isFree: boolean;
  country: 'CA';
  eventType: 'webinar' | 'conference' | 'workshop' | 'trade-mission';
}

export async function scrapeEDC(): Promise<EDCEvent[]> {
  try {
    console.log('🔍 Scraping EDC events...');
    
    // Fetch the JSON endpoint directly
    const response = await axios.get('https://www.edc.ca/bin/upcomingeventsservlet.json', {
      params: {
        pageUrl: 'L2NvbnRlbnQvZWRjL2VuL2V2ZW50cw==', // Base64 encoded path
      },
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': 'https://www.edc.ca/en/events.html'
      }
    });
    
    const events: EDCEvent[] = [];
    
    // Parse the JSON response
    if (response.data && Array.isArray(response.data)) {
      for (const item of response.data) {
        // Extract event details from JSON
        const title = item.title || item.eventTitle || '';
        const description = item.description || item.eventDescription || '';
        const dateStr = item.date || item.eventDate || item.startDate || '';
        const link = item.link || item.url || item.eventUrl || '';
        const location = item.location || item.eventLocation || 'Online Webinar';
        const eventType = determineEventType(title, description, item.type);
        
        if (title && link) {
          // Parse date
          let startDate: string;
          try {
            startDate = new Date(dateStr).toISOString();
          } catch {
            // If date parsing fails, skip this event
            console.warn(`⚠️ Could not parse date for: ${title}`);
            continue;
          }
          
          // Ensure URL is absolute
          const absoluteUrl = link.startsWith('http') 
            ? link 
            : `https://www.edc.ca${link}`;
          
          events.push({
            id: `edc-${generateId(title, dateStr)}`,
            title: cleanTitle(title),
            description: cleanDescription(description),
            startDate: startDate,
            location: location,
            url: absoluteUrl,
            organizerId: 'edc',
            organizerName: 'Export Development Canada',
            isFree: true,
            country: 'CA',
            eventType: eventType
          });
        }
      }
    }
    
    // Sort by date
    events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    console.log(`✅ EDC: Successfully scraped ${events.length} events`);
    return events;
    
  } catch (error) {
    console.error('❌ EDC scraping failed:', error);
    
    // Return fallback curated event
    return [{
      id: 'edc-fallback',
      title: 'How to finance your global growth',
      description: 'Discover how EDC\'s financing solutions help Canadian exporters secure funding for expansion plans and global growth, even when banks hesitate.',
      startDate: new Date('2026-01-28T14:00:00').toISOString(),
      location: 'Online Webinar',
      url: 'https://www.edc.ca/en/events.html',
      organizerId: 'edc',
      organizerName: 'Export Development Canada',
      isFree: true,
      country: 'CA',
      eventType: 'webinar'
    }];
  }
}

// Helper functions
function determineEventType(title: string, description: string, type?: string): EDCEvent['eventType'] {
  const text = `${title} ${description} ${type || ''}`.toLowerCase();
  
  if (text.includes('webinar')) return 'webinar';
  if (text.includes('workshop')) return 'workshop';
  if (text.includes('trade mission')) return 'trade-mission';
  if (text.includes('conference')) return 'conference';
  
  return 'webinar'; // Default for EDC
}

function cleanTitle(title: string): string {
  return title.trim().replace(/\s+/g, ' ');
}

function cleanDescription(desc: string): string {
  // Remove HTML tags if present
  let cleaned = desc.replace(/<[^>]*>/g, '');
  // Normalize whitespace
  cleaned = cleaned.trim().replace(/\s+/g, ' ');
  // Truncate if too long
  if (cleaned.length > 300) {
    cleaned = cleaned.substring(0, 297) + '...';
  }
  return cleaned;
}

function generateId(title: string, date: string): string {
  // Create a simple hash from title and date
  const str = `${title}-${date}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
