// src/scrapers/cme-scraper.ts
// CME Events Scraper with Puppeteer for JavaScript rendering

import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

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
  let browser;
  
  try {
    console.log('🔍 Scraping CME events with Puppeteer...');
    
    // Launch browser
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    
    const page = await browser.newPage();
    
    // Go to CME events page with filter=* to show all
    await page.goto('https://cme-mec.ca/connection/#filter=*', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    // Wait for events to load (Isotope takes a moment)
    await page.waitForSelector('.mix', { timeout: 10000 });
    
    console.log('📊 CME: Page loaded, extracting events...');
    
    // Extract event data from the rendered page
    const events = await page.evaluate(() => {
      const eventElements = document.querySelectorAll('.mix');
      const extractedEvents: any[] = [];
      
      eventElements.forEach((elem) => {
        // Get title
        const titleElem = elem.querySelector('h2, h3, h4, .title');
        const title = titleElem?.textContent?.trim() || '';
        
        // Get link
        const linkElem = elem.querySelector('a');
        const url = linkElem?.href || '';
        
        // Get description
        const descElem = elem.querySelector('p, .description');
        const description = descElem?.textContent?.trim() || '';
        
        // Get date
        const dateElem = elem.querySelector('[class*="date"], time');
        const dateText = dateElem?.textContent?.trim() || '';
        
        // Get location
        const locationElem = elem.querySelector('[class*="location"]');
        const location = locationElem?.textContent?.trim() || '';
        
        // Get event type from classes
        const classes = elem.className || '';
        let eventType = 'conference';
        if (classes.includes('webinar')) eventType = 'webinar';
        if (classes.includes('training')) eventType = 'training';
        if (classes.includes('networking')) eventType = 'networking';
        
        if (title && url && title.length > 5) {
          extractedEvents.push({
            title,
            url,
            description,
            dateText,
            location,
            eventType,
            classes
          });
        }
      });
      
      return extractedEvents;
    });
    
    await browser.close();
    
    console.log(`📊 CME: Found ${events.length} events in browser`);
    
    // Process and format events
    const formattedEvents: CMEEvent[] = events.map((event, i) => {
      let startDate: string;
      
      if (event.dateText && event.dateText.length > 0) {
        try {
          const parsed = new Date(event.dateText);
          if (!isNaN(parsed.getTime())) {
            startDate = parsed.toISOString();
          } else {
            // Can't parse - assume on-demand
            startDate = new Date('2030-12-31').toISOString();
          }
        } catch {
          startDate = new Date('2030-12-31').toISOString();
        }
      } else {
        // No date = on-demand
        startDate = new Date('2030-12-31').toISOString();
      }
      
      const isOnDemand = startDate.includes('2030');
      
      return {
        id: `cme-${isOnDemand ? 'ondemand' : 'upcoming'}-${generateId(event.title)}`,
        title: cleanTitle(event.title) + (isOnDemand ? ' (On-Demand)' : ''),
        description: event.description || 'CME event for manufacturers and exporters.',
        startDate: startDate,
        location: isOnDemand ? 'On-Demand' : (event.location || 'Various locations'),
        url: event.url,
        organizerId: 'cme',
        organizerName: 'Canadian Manufacturers & Exporters',
        isFree: false,
        country: 'CA',
        eventType: event.eventType as CMEEvent['eventType']
      };
    });
    
    console.log(`✅ CME: Processed ${formattedEvents.length} events`);
    return formattedEvents;
    
  } catch (error) {
    console.error('❌ CME Puppeteer scraping failed:', error);
    if (browser) {
      await browser.close();
    }
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
