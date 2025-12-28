// src/scrapers/edc-scraper.ts
// EDC Events Scraper - Fetches JSON data directly

import axios from 'axios';
import * as cheerio from 'cheerio';

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
    
    const events: EDCEvent[] = [];
    
    // ========================================
    // PART 1: Scrape UPCOMING events from JSON API
    // ========================================
    try {
      const jsonResponse = await axios.get('https://www.edc.ca/bin/upcomingeventsservlet.json', {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
          'Referer': 'https://www.edc.ca/en/events.html'
        }
      });
      
      const pageItems = jsonResponse.data?.pageItems;
      
      if (pageItems && Array.isArray(pageItems)) {
        console.log(`📊 EDC Upcoming events: ${pageItems.length}`);
        
        for (const item of pageItems) {
          const title = item.linkText || item.title || '';
          const description = item.description || '';
          const dateStr = item.date || item.eventDate || item.startDate || '';
          const link = item.linkUrl || item.url || '';
          const eventType = item.eventType || 'webinar';
          
          if (title && link) {
            let startDate: string;
            if (dateStr) {
              try {
                startDate = new Date(dateStr).toISOString();
              } catch {
                startDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
              }
            } else {
              startDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
            }
            
            const absoluteUrl = link.startsWith('http') ? link : `https://www.edc.ca${link}`;
            
            events.push({
              id: `edc-upcoming-${generateId(title, dateStr || title)}`,
              title: cleanTitle(title),
              description: cleanDescription(description),
              startDate: startDate,
              location: 'Online Webinar',
              url: absoluteUrl,
              organizerId: 'edc',
              organizerName: 'Export Development Canada',
              isFree: true,
              country: 'CA',
              eventType: determineEventType(title, description, eventType)
            });
          }
        }
      }
    } catch (error) {
      console.error('⚠️ EDC JSON API failed:', error);
    }
    
    // ========================================
    // PART 2: Scrape ON-DEMAND webinars from HTML
    // ========================================
    try {
      const htmlResponse = await axios.get('https://www.edc.ca/en/events.html', {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const $ = cheerio.load(htmlResponse.data);
      
      // Find on-demand webinars section
      const onDemandLinks: string[] = [];
      
      // Look for links in the on-demand section
      $('a[href*="/en/events/webinar/"]').each((i, elem) => {
        const $link = $(elem);
        const href = $link.attr('href');
        const title = $link.find('h4, .title').text().trim() || $link.text().trim();
        
        if (href && title && title.length > 10) {
          // Avoid duplicates
          if (!onDemandLinks.includes(href)) {
            onDemandLinks.push(href);
            
            const absoluteUrl = href.startsWith('http') ? href : `https://www.edc.ca${href}`;
            
            // On-demand = available anytime, use far future date so they appear last
            const onDemandDate = new Date('2030-12-31').toISOString();
            
            events.push({
              id: `edc-ondemand-${generateId(href, '')}`,
              title: `${cleanTitle(title)} (On-Demand)`,
              description: 'On-demand webinar available to watch anytime.',
              startDate: onDemandDate,
              location: 'On-Demand Webinar',
              url: absoluteUrl,
              organizerId: 'edc',
              organizerName: 'Export Development Canada',
              isFree: true,
              country: 'CA',
              eventType: 'webinar'
            });
          }
        }
      });
      
      console.log(`📊 EDC On-demand webinars: ${onDemandLinks.length}`);
      
    } catch (error) {
      console.error('⚠️ EDC HTML scraping failed:', error);
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
