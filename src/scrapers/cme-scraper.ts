// src/scrapers/cme-scraper.ts
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
  console.log('🔍 Scraping CME events from /connection/ page...');
  
  try {
    const response = await axios.get('https://cme-mec.ca/connection/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
      timeout: 30000
    });
    
    const $ = cheerio.load(response.data);
    const events: CMEEvent[] = [];
    
    console.log('📊 CME: Looking for article.connection elements...');
    
    // Find all <a> tags that wrap article.connection elements
    const linkElements = $('a').filter((_, el) => {
      return $(el).find('article.connection').length > 0;
    });
    
    console.log(`📊 CME: Found ${linkElements.length} event links`);
    
    if (linkElements.length === 0) {
      console.log('⚠️ CME: No events found');
      return events;
    }
    
    linkElements.each((index, linkElement) => {
      try {
        const $link = $(linkElement);
        const $article = $link.find('article.connection').first();
        
        // Get URL from the wrapping <a> tag
        let url = $link.attr('href') || '';
        if (!url) {
          console.log(`⏭️ Skipping event ${index + 1} - no URL found`);
          return;
        }
        
        if (!url.startsWith('http')) {
          url = url.startsWith('/') ? `https://cme-mec.ca${url}` : `https://cme-mec.ca/${url}`;
        }
        
        // Get all classes from the article element
        const classes = $article.attr('class') || '';
        
        // Determine event type from classes
        let eventType: CMEEvent['eventType'] = 'conference';
        
        if (classes.includes('event_type-webinars')) {
          eventType = 'webinar';
        } else if (classes.includes('event_type-training-sessions')) {
          eventType = 'training';
        } else if (classes.includes('event_type-upcoming-events')) {
          eventType = 'conference';
        }
        
        // Extract title from h2.entry-title
        const title = $article.find('h2.entry-title').text().trim();
        
        if (!title || title.length < 3) {
          console.log(`⏭️ Skipping event ${index + 1} - no title found`);
          return;
        }
        
        // Extract description from .tile-description
        const description = $article.find('.tile-description p').text().trim() || title;
        
        // Extract date from the date field
        const dateText = $article.find('.entry-content__item:contains("Date") .custom-taxonomy p').text().trim();
        let startDate: string;
        
        if (dateText) {
          // Parse dates like "March 11, 2026"
          const parsedDate = new Date(dateText);
          if (!isNaN(parsedDate.getTime())) {
            startDate = parsedDate.toISOString();
          } else {
            startDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
          }
        } else {
          // Fallback to month from classes
          const monthMatch = classes.match(/event_months-(\w+)/);
          if (monthMatch) {
            const month = monthMatch[1];
            const monthMap: Record<string, number> = {
              january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
              july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
            };
            const monthNum = monthMap[month.toLowerCase()];
            if (monthNum !== undefined) {
              const year = new Date().getFullYear();
              startDate = new Date(year, monthNum, 15).toISOString();
            } else {
              startDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
            }
          } else {
            startDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
          }
        }
        
        // Extract location from Event Locations field
        const locationText = $article.find('.entry-content__item:contains("Event Locations") .custom-taxonomy p').text().trim();
        let location = locationText || 'Canada';
        
        if (classes.includes('online') || location.toLowerCase().includes('online')) {
          location = 'Virtual/Online';
        }
        
        // Create event ID from post ID
        const postIdMatch = classes.match(/post-(\d+)/);
        const id = postIdMatch ? `cme-${postIdMatch[1]}` : `cme-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)}`;
        
        const event: CMEEvent = {
          id,
          title: title.slice(0, 200),
          description: description.slice(0, 500),
          startDate,
          location,
          url,
          organizerId: 'cme',
          organizerName: 'Canadian Manufacturers & Exporters',
          isFree: false,
          country: 'CA',
          eventType
        };
        
        console.log(`✅ CME Event #${index + 1}: "${title}" | Type: ${eventType} | Location: ${location}`);
        events.push(event);
        
      } catch (err) {
        console.error(`❌ Error parsing CME event at index ${index}:`, err);
      }
    });
    
    console.log(`✅ CME: Successfully scraped ${events.length} events`);
    
    // Log summary by type
    const summary = events.reduce((acc, event) => {
      acc[event.eventType] = (acc[event.eventType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('📊 CME Events by type:', summary);
    
    return events;
    
  } catch (error) {
    console.error('❌ CME scraping failed:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response status:', error.response?.status);
    }
    throw error;
  }
}