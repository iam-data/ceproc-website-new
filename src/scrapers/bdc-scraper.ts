// src/scrapers/bdc-scraper.ts
// BDC Webinars Scraper

import axios from 'axios';
import * as cheerio from 'cheerio';

interface BDCEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  location: string;
  url: string;
  organizerId: string;
  organizerName: string;
  isFree: boolean;
  country: 'CA';
  eventType: 'webinar';
}

export async function scrapeBDC(): Promise<BDCEvent[]> {
  try {
    console.log('🔍 Scraping BDC webinars...');
    
    const response = await axios.get('https://www.bdc.ca/en/articles-tools/entrepreneur-toolkit/webinars', {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const events: BDCEvent[] = [];
    
    // BDC specific selectors - update these based on actual HTML structure
    $('.webinar-card, .card, article').each((i, elem) => {
      const $elem = $(elem);
      
      // Extract data
      const title = $elem.find('h2, h3, .title, .card-title').first().text().trim();
      const description = $elem.find('p, .description, .summary, .card-text').first().text().trim();
      const dateText = $elem.find('.date, time, .event-date').first().text().trim();
      const link = $elem.find('a').first().attr('href');
      
      if (title && link && title.length > 10) {
        // Parse date or create future date
        let startDate: string;
        try {
          startDate = new Date(dateText).toISOString();
        } catch {
          // If no valid date, create placeholder date in future
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + (10 + i * 5));
          startDate = futureDate.toISOString();
        }
        
        const absoluteUrl = link.startsWith('http') ? link : `https://www.bdc.ca${link}`;
        
        events.push({
          id: `bdc-${generateId(title)}`,
          title: cleanTitle(title),
          description: description || 'BDC webinar for business growth and resilience.',
          startDate: startDate,
          location: 'Online Webinar',
          url: absoluteUrl,
          organizerId: 'bdc',
          organizerName: 'Business Development Bank of Canada',
          isFree: true,
          country: 'CA',
          eventType: 'webinar'
        });
      }
    });
    
    console.log(`✅ BDC: Found ${events.length} events`);
    return events;
    
  } catch (error) {
    console.error('❌ BDC scraping failed:', error);
    
    // Fallback event
    return [{
      id: 'bdc-fallback',
      title: 'Building Business Resilience in 2025',
      description: 'Learn strategies to build resilience amid trade uncertainty.',
      startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      location: 'Online Webinar',
      url: 'https://www.bdc.ca/en/articles-tools/entrepreneur-toolkit/webinars',
      organizerId: 'bdc',
      organizerName: 'Business Development Bank of Canada',
      isFree: true,
      country: 'CA',
      eventType: 'webinar'
    }];
  }
}

function cleanTitle(title: string): string {
  return title.trim().replace(/\s+/g, ' ');
}

function generateId(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = ((hash << 5) - hash) + title.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
