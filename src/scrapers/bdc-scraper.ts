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
    
    // BDC structure: div.block.textblock with h3 > a
    $('.block.textblock').each((i, elem) => {
      const $elem = $(elem);
      
      // Get title and link from h3 > a
      const $title = $elem.find('h3 a').first();
      const title = $title.text().trim();
      const link = $title.attr('href');
      
      // Get description from <p> tag
      const description = $elem.find('p').first().text().trim();
      
      if (title && link && title.length > 10) {
        const absoluteUrl = link.startsWith('http') ? link : `https://www.bdc.ca${link}`;
        
        // All BDC webinars are on-demand - use far future date
        const onDemandDate = new Date('2030-12-31').toISOString();
        
        events.push({
          id: `bdc-ondemand-${generateId(title)}`,
          title: `${cleanTitle(title)} (On-Demand)`,
          description: description || 'BDC webinar for Canadian entrepreneurs available to watch anytime.',
          startDate: onDemandDate,
          location: 'On-Demand Webinar',
          url: absoluteUrl,
          organizerId: 'bdc',
          organizerName: 'Business Development Bank of Canada',
          isFree: true,
          country: 'CA',
          eventType: 'webinar'
        });
      }
    });
    
    console.log(`✅ BDC: Found ${events.length} on-demand webinars`);
    return events;
    
  } catch (error) {
    console.error('❌ BDC scraping failed:', error);
    return [];
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
