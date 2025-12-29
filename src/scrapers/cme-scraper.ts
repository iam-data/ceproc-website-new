// src/scrapers/cme-scraper.ts
// CME Events - Curated approach (Puppeteer doesn't work on Vercel free tier)

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
  console.log('📊 Loading CME curated events...');
  
  // Curated CME on-demand events from their website
  const events: CMEEvent[] = [
    {
      id: 'cme-ondemand-ai-manufacturers',
      title: 'AI for Manufacturers (On-Demand)',
      description: 'CME, Manufacturing Insights (MI) and the Advanced Manufacturing Cluster (AMC) presents a virtual information session on AI implementation for Canadian manufacturers.',
      startDate: new Date('2030-12-31').toISOString(),
      location: 'On-Demand Webinar',
      url: 'https://cme-mec.ca/connection/',
      organizerId: 'cme',
      organizerName: 'Canadian Manufacturers & Exporters',
      isFree: false,
      country: 'CA',
      eventType: 'webinar'
    },
    {
      id: 'cme-ondemand-robotics',
      title: 'Robotics in Manufacturing (On-Demand)',
      description: 'The Zoom link and agenda for the meeting will be sent to you upon registration. Learn how robotics can transform your manufacturing operations.',
      startDate: new Date('2030-12-31').toISOString(),
      location: 'On-Demand Webinar',
      url: 'https://cme-mec.ca/connection/',
      organizerId: 'cme',
      organizerName: 'Canadian Manufacturers & Exporters',
      isFree: false,
      country: 'CA',
      eventType: 'webinar'
    },
    {
      id: 'cme-ondemand-tech-talk',
      title: 'Tech Talk Series 2025 (On-Demand)',
      description: 'Take part in short webinars on several topics delivered for Canadian manufacturers, covering lean productivity, workforce development, and workplace safety.',
      startDate: new Date('2030-12-31').toISOString(),
      location: 'On-Demand Webinar',
      url: 'https://cme-mec.ca/connection/',
      organizerId: 'cme',
      organizerName: 'Canadian Manufacturers & Exporters',
      isFree: false,
      country: 'CA',
      eventType: 'webinar'
    },
    {
      id: 'cme-ondemand-technology-assessment',
      title: 'Unlocking Smarter Technology Decisions with CME Technology Assessment (On-Demand)',
      description: 'FEATURING: CME Presenters – Aseem Sharma & Bert Driessen. Learn how to make data-driven technology decisions for your manufacturing business.',
      startDate: new Date('2030-12-31').toISOString(),
      location: 'On-Demand Webinar',
      url: 'https://cme-mec.ca/connection/',
      organizerId: 'cme',
      organizerName: 'Canadian Manufacturers & Exporters',
      isFree: false,
      country: 'CA',
      eventType: 'webinar'
    },
    {
      id: 'cme-ondemand-funding',
      title: 'Discover Funding, Financing, and Incentive Opportunities (On-Demand)',
      description: 'Join AMC Atlantic March fair for Funding, for Financing Atlantic Canadian Manufacturers. Learn about available government funding and financing programs.',
      startDate: new Date('2030-12-31').toISOString(),
      location: 'On-Demand Webinar',
      url: 'https://cme-mec.ca/connection/',
      organizerId: 'cme',
      organizerName: 'Canadian Manufacturers & Exporters',
      isFree: false,
      country: 'CA',
      eventType: 'webinar'
    },
    {
      id: 'cme-ondemand-tariff-relief',
      title: 'Tariff Relief Workshops & Webinars (On-Demand)',
      description: 'LEADERSHIP & EXECUTIVE, TRADE EXPORT & SUPPLY CHAIN, POLITICS, TRADE & EXPORT. Learn strategies to navigate tariffs and reduce trade costs.',
      startDate: new Date('2030-12-31').toISOString(),
      location: 'On-Demand Webinar',
      url: 'https://cme-mec.ca/connection/',
      organizerId: 'cme',
      organizerName: 'Canadian Manufacturers & Exporters',
      isFree: false,
      country: 'CA',
      eventType: 'webinar'
    },
    {
      id: 'cme-ondemand-ai-intelligence',
      title: 'Artificial Intelligence for Manufacturers (On-Demand)',
      description: 'These insightful module sessions showcase how Canadian manufacturers can leverage AI for competitive advantage and operational excellence.',
      startDate: new Date('2030-12-31').toISOString(),
      location: 'On-Demand Webinar',
      url: 'https://cme-mec.ca/connection/',
      organizerId: 'cme',
      organizerName: 'Canadian Manufacturers & Exporters',
      isFree: false,
      country: 'CA',
      eventType: 'webinar'
    }
  ];
  
  console.log(`✅ CME: Loaded ${events.length} curated on-demand events`);
  return events;
}