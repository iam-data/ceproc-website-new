// src/scrapers/cme-scraper.ts
// Canadian Manufacturers & Exporters Events Scraper

import axios from 'axios';
import * as cheerio from 'cheerio';

interface CMEEvent {
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
  eventType: 'webinar' | 'conference' | 'training' | 'networking';
}

export async function scrapeCME(): Promise<CMEEvent[]> {
  try {
    console.log('🔍 Scraping CME events...');
    
    const response = await axios.get('https://cme-mec.ca/connection/', {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const events: CMEEvent[] = [];
    
    // CME uses isotope filtering - events have specific classes
    $('.element, .mix, .event-item, article').each((i, elem) => {
      const $elem = $(elem);
      
      const title = $elem.find('h2, h3, h4, .title, .event-title').first().text().trim();
      const description = $elem.find('p, .description').first().text().trim();
      const dateText = $elem.find('.date, time').first().text().trim();
      const link = $elem.find('a').first().attr('href');
      
      // Determine event type from classes
      let eventType: CMEEvent['eventType'] = 'conference';
      const classes = $elem.attr('class') || '';
      if (classes.includes('webinar')) eventType = 'webinar';
      if (classes.includes('training')) eventType = 'training';
      if (classes.includes('networking')) eventType = 'networking';
      
      if (title && link && title.length > 5) {
        let startDate: string;
        try {
          startDate = new Date(dateText).toISOString();
        } catch {
          const futureDate = new Date();
          futureDate.setDate(futureDate.getDate() + (20 + i * 10));
          startDate = futureDate.toISOString();
        }
        
        const absoluteUrl = link.startsWith('http') ? link : `https://cme-mec.ca${link}`;
        
        events.push({
          id: `cme-${generateId(title)}`,
          title: cleanTitle(title),
          description: description || 'CME event for manufacturers and exporters.',
          startDate: startDate,
          location: 'Various locations',
          url: absoluteUrl,
          organizerId: 'cme',
          organizerName: 'Canadian Manufacturers & Exporters',
          isFree: false,
          country: 'CA',
          eventType: eventType
        });
      }
    });
    
    console.log(`✅ CME: Found ${events.length} events`);
    return events;
    
  } catch (error) {
    console.error('❌ CME scraping failed:', error);
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
