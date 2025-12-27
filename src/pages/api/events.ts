
// src/pages/api/events.json.ts
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
  eventType?: 'webinar' | 'trade-mission' | 'conference' | 'workshop';
}

function getFutureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(14, 0, 0, 0);
  return date.toISOString();
}

const events: Event[] = [
  {
    id: "edc-export-webinar",
    title: "Export Market Insights: U.S. Opportunities",
    description: "Join EDC experts to learn about current opportunities in the U.S. market for Canadian exporters.",
    startDate: getFutureDate(15),
    location: "Online Webinar",
    url: "https://www.edc.ca/en/events.html",
    organizerId: "edc",
    organizerName: "Export Development Canada",
    isFree: true,
    country: 'CA',
    eventType: 'webinar'
  },
  {
    id: "bdc-resilience",
    title: "Building Business Resilience in 2025",
    description: "Learn strategies to build resilience amid trade uncertainty.",
    startDate: getFutureDate(10),
    location: "Online Webinar",
    url: "https://www.bdc.ca/en/articles-tools/entrepreneur-toolkit/webinars",
    organizerId: "bdc",
    organizerName: "Business Development Bank of Canada",
    isFree: true,
    country: 'CA',
    eventType: 'webinar'
  },
  {
    id: "tcs-asia-markets",
    title: "Accessing Asian Markets: Export Strategies",
    description: "Trade Commissioners share insights on market entry strategies for Asia.",
    startDate: getFutureDate(25),
    location: "Online Webinar",
    url: "https://www.tradecommissioner.gc.ca/events",
    organizerId: "tcs",
    organizerName: "Canadian Trade Commissioner Service",
    isFree: true,
    country: 'CA',
    eventType: 'webinar'
  },
  {
    id: "cme-manufacturing-summit",
    title: "Canadian Manufacturing Summit 2025",
    description: "Canada's premier manufacturing event. Connect with industry leaders.",
    startDate: getFutureDate(45),
    endDate: getFutureDate(46),
    location: "Toronto, ON",
    url: "https://cme-mec.ca/events/",
    organizerId: "cme",
    organizerName: "Canadian Manufacturers & Exporters",
    isFree: false,
    country: 'CA',
    eventType: 'conference'
  },
  {
    id: "us-commerce-export-basics",
    title: "Export Basics for Small Businesses",
    description: "U.S. Department of Commerce webinar on getting started with exporting.",
    startDate: getFutureDate(12),
    location: "Online Webinar",
    url: "https://www.trade.gov/events",
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
    url: "https://www.exim.gov/news/events",
    organizerId: "exim-bank",
    organizerName: "Export-Import Bank of the United States",
    isFree: true,
    country: 'US',
    eventType: 'workshop'
  },
];

export async function GET({ request }: { request: Request }) {
 console.log("FULL REQUEST URL:", request.url);
  const url = new URL(request.url);
  const params = url.searchParams;
  
  let filtered = [...events];
  
  const country = params.get('country');
  if (country && (country === 'CA' || country === 'US')) {
    filtered = filtered.filter(e => e.country === country);
  }
  
  console.log("DEBUG params:", params); const organizerId = params.get('organizer');
  console.log("DEBUG organizerId:", organizerId); if (organizerId) {
    console.log("DEBUG filtering by organizerId"); filtered = filtered.filter(e => e.organizerId === organizerId); console.log("DEBUG after filter:", filtered.length);
  }
  
  const keyword = params.get('keyword');
  if (keyword) {
    const lower = keyword.toLowerCase();
    filtered = filtered.filter(e =>
      e.title.toLowerCase().includes(lower) ||
      e.description.toLowerCase().includes(lower) ||
      e.organizerName.toLowerCase().includes(lower)
    );
  }
  
  const now = new Date();
  const timeframe = params.get('timeframe') || 'upcoming';
  
  filtered = filtered.filter(event => {
    const eventDate = new Date(event.startDate);
    
    switch (timeframe) {
      case 'this-week': {
        const endOfWeek = new Date(now);
        endOfWeek.setDate(endOfWeek.getDate() + 7);
        return eventDate >= now && eventDate <= endOfWeek;
      }
      case 'this-month': {
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return eventDate >= now && eventDate <= endOfMonth;
      }
      case 'next-3-months': {
        const end3Months = new Date(now);
        end3Months.setMonth(end3Months.getMonth() + 3);
        return eventDate >= now && eventDate <= end3Months;
      }
      default:
        return eventDate >= now;
    }
  });
  
  filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
  const canadianEvents = filtered.filter(e => e.country === 'CA').length;
  const usEvents = filtered.filter(e => e.country === 'US').length;
  
  return new Response(JSON.stringify({
    success: true,
    count: filtered.length,
    events: filtered,
    meta: {
      canadianEvents,
      usEvents,
      total: filtered.length
    }
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=1800'
    }
  });
}
