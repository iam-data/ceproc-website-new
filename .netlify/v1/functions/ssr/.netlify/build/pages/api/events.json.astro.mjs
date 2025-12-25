export { renderers } from '../../renderers.mjs';

const prerender = false;
const canadianOrganizers = [
  { id: "edc", name: "Export Development Canada", website: "https://www.edc.ca", eventsUrl: "https://www.edc.ca/en/events.html", description: "Canada's export credit agency", scrapingStrategy: "curated", country: "CA" },
  { id: "bdc", name: "Business Development Bank of Canada", website: "https://www.bdc.ca", eventsUrl: "https://www.bdc.ca/en/articles-tools/entrepreneur-toolkit/webinars", description: "Free business webinars", scrapingStrategy: "curated", country: "CA" },
  { id: "tfo-canada", name: "Trade Facilitation Office Canada", website: "https://www.tfocanada.ca", eventsUrl: "https://www.tfocanada.ca/events", description: "Trade facilitation", scrapingStrategy: "jsonld", country: "CA" },
  { id: "world-trade-centre-toronto", name: "World Trade Centre Toronto", website: "https://www.wtctoronto.com", eventsUrl: "https://www.wtctoronto.com/events", description: "Global trade connections", scrapingStrategy: "jsonld", country: "CA" },
  { id: "trade-commissioner-service", name: "Canadian Trade Commissioner Service", website: "https://www.tradecommissioner.gc.ca", eventsUrl: "https://www.tradecommissioner.gc.ca/events", description: "Government trade support", scrapingStrategy: "curated", country: "CA" },
  { id: "fitt", name: "Forum for International Trade Training", website: "https://www.fitt.ca", eventsUrl: "https://www.fitt.ca/events", description: "Trade training", scrapingStrategy: "jsonld", country: "CA" },
  { id: "cme", name: "Canadian Manufacturers & Exporters", website: "https://cme-mec.ca", eventsUrl: "https://cme-mec.ca/events/", description: "Manufacturing association", scrapingStrategy: "curated", country: "CA" },
  { id: "canadian-chamber", name: "Canadian Chamber of Commerce", website: "https://www.chamber.ca", eventsUrl: "https://www.chamber.ca/events/", description: "Business voice", scrapingStrategy: "curated", country: "CA" },
  // NEW CANADIAN ORGANIZATIONS
  { id: "export-alberta", name: "Export Alberta", website: "https://www.alberta.ca", eventsUrl: "https://www.alberta.ca/export-alberta", description: "Alberta export support", scrapingStrategy: "curated", country: "CA" },
  { id: "ontario-exports", name: "Ontario Exports", website: "https://www.ontario.ca", eventsUrl: "https://www.ontario.ca/page/ontario-exports", description: "Ontario trade programs", scrapingStrategy: "curated", country: "CA" },
  { id: "investissement-quebec", name: "Investissement Québec International", website: "https://www.investquebec.com", eventsUrl: "https://www.investquebec.com/international/en", description: "Quebec export support", scrapingStrategy: "curated", country: "CA" },
  { id: "naita", name: "North American International Trade Association", website: "https://www.naita.org", eventsUrl: "https://www.naita.org/events", description: "Cross-border trade events", scrapingStrategy: "curated", country: "CA" }
];
const usOrganizers = [
  { id: "us-commerce", name: "U.S. Department of Commerce", website: "https://www.trade.gov", eventsUrl: "https://www.trade.gov/events", description: "U.S. government trade events", scrapingStrategy: "curated", country: "US" },
  { id: "exim-bank", name: "Export-Import Bank of the United States", website: "https://www.exim.gov", eventsUrl: "https://www.exim.gov/news/events", description: "U.S. export financing events", scrapingStrategy: "curated", country: "US" },
  { id: "sba-international", name: "SBA Office of International Trade", website: "https://www.sba.gov", eventsUrl: "https://www.sba.gov/offices/headquarters/oit", description: "Small business export support", scrapingStrategy: "curated", country: "US" },
  { id: "nasbite", name: "NASBITE International", website: "https://www.nasbite.org", eventsUrl: "https://www.nasbite.org/events", description: "Trade education events", scrapingStrategy: "curated", country: "US" },
  { id: "us-chamber", name: "U.S. Chamber of Commerce", website: "https://www.uschamber.com", eventsUrl: "https://www.uschamber.com/events", description: "Business advocacy events", scrapingStrategy: "curated", country: "US" },
  { id: "trade-shows-usa", name: "Trade Show News Network", website: "https://www.tsnn.com", eventsUrl: "https://www.tsnn.com", description: "Trade show directory", scrapingStrategy: "curated", country: "US" }
];
const eventOrganizers = [...canadianOrganizers, ...usOrganizers];
function getFutureDate(daysFromNow) {
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(14, 0, 0, 0);
  return date.toISOString();
}
const curatedEvents = [
  // === CANADIAN EVENTS ===
  {
    id: "edc-webinar-upcoming-1",
    title: "Export Market Insights: U.S. Market Opportunities",
    description: "Join EDC experts to learn about current opportunities in the U.S. market for Canadian exporters.",
    startDate: getFutureDate(15),
    location: "Online Webinar",
    url: "https://www.edc.ca/en/events.html",
    organizerId: "edc",
    organizerName: "Export Development Canada",
    isFree: true,
    isCurated: true,
    country: "CA",
    eventType: "webinar"
  },
  {
    id: "edc-trade-mission-upcoming",
    title: "Trade Mission: Technology Sector Opportunities",
    description: "EDC trade mission focused on technology sector. Network with potential partners.",
    startDate: getFutureDate(30),
    endDate: getFutureDate(32),
    location: "Various Locations",
    url: "https://www.edc.ca/en/events.html",
    organizerId: "edc",
    organizerName: "Export Development Canada",
    isFree: false,
    isCurated: true,
    country: "CA",
    eventType: "trade-mission"
  },
  {
    id: "bdc-resilience-webinar",
    title: "Building Business Resilience in 2025",
    description: "Learn strategies to build resilience amid trade uncertainty.",
    startDate: getFutureDate(10),
    location: "Online Webinar",
    url: "https://www.bdc.ca/en/articles-tools/entrepreneur-toolkit/webinars",
    organizerId: "bdc",
    organizerName: "Business Development Bank of Canada",
    isFree: true,
    isCurated: true,
    country: "CA",
    eventType: "webinar"
  },
  {
    id: "bdc-ai-webinar",
    title: "AI for Small Business: Practical Applications",
    description: "Demystify AI for small businesses. Learn practical applications.",
    startDate: getFutureDate(20),
    location: "Online Webinar",
    url: "https://www.bdc.ca/en/articles-tools/entrepreneur-toolkit/webinars",
    organizerId: "bdc",
    organizerName: "Business Development Bank of Canada",
    isFree: true,
    isCurated: true,
    country: "CA",
    eventType: "webinar"
  },
  {
    id: "tcs-asia-market",
    title: "Accessing Asian Markets: Opportunities for Canadian Exporters",
    description: "Trade Commissioners share insights on market entry strategies.",
    startDate: getFutureDate(25),
    location: "Online Webinar",
    url: "https://www.tradecommissioner.gc.ca/events",
    organizerId: "trade-commissioner-service",
    organizerName: "Canadian Trade Commissioner Service",
    isFree: true,
    isCurated: true,
    country: "CA",
    eventType: "webinar"
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
    isCurated: true,
    country: "CA",
    eventType: "conference"
  },
  {
    id: "chamber-policy-briefing",
    title: "Economic Outlook 2025: What Businesses Need to Know",
    description: "Policy briefing on the economic outlook for Canadian businesses.",
    startDate: getFutureDate(35),
    location: "Online Webinar",
    url: "https://www.chamber.ca/events/",
    organizerId: "canadian-chamber",
    organizerName: "Canadian Chamber of Commerce",
    isFree: true,
    isCurated: true,
    country: "CA",
    eventType: "webinar"
  },
  {
    id: "ontario-exports-workshop",
    title: "Getting Started with Exporting: Ontario Workshop",
    description: "Learn the fundamentals of international trade for Ontario businesses.",
    startDate: getFutureDate(18),
    location: "Toronto, ON",
    url: "https://www.ontario.ca/page/ontario-exports",
    organizerId: "ontario-exports",
    organizerName: "Ontario Exports",
    isFree: true,
    isCurated: true,
    country: "CA",
    eventType: "workshop"
  },
  {
    id: "naita-cross-border",
    title: "Cross-Border Trade Forum: Canada-U.S. Relations",
    description: "Explore opportunities in Canada-U.S. trade and navigate regulations.",
    startDate: getFutureDate(40),
    location: "Vancouver, BC",
    url: "https://www.naita.org/events",
    organizerId: "naita",
    organizerName: "North American International Trade Association",
    isFree: false,
    isCurated: true,
    country: "CA",
    eventType: "conference"
  },
  // === US EVENTS ===
  {
    id: "us-commerce-export-basics",
    title: "Export Basics for U.S. Small Businesses",
    description: "U.S. Department of Commerce webinar on getting started with exporting.",
    startDate: getFutureDate(12),
    location: "Online Webinar",
    url: "https://www.trade.gov/events",
    organizerId: "us-commerce",
    organizerName: "U.S. Department of Commerce",
    isFree: true,
    isCurated: true,
    country: "US",
    eventType: "webinar"
  },
  {
    id: "exim-bank-financing",
    title: "Export Financing Solutions Workshop",
    description: "Learn about EXIM Bank financing options for U.S. exporters.",
    startDate: getFutureDate(22),
    location: "Washington, D.C.",
    url: "https://www.exim.gov/news/events",
    organizerId: "exim-bank",
    organizerName: "Export-Import Bank of the United States",
    isFree: true,
    isCurated: true,
    country: "US",
    eventType: "workshop"
  },
  {
    id: "sba-trade-mission-latam",
    title: "SBA Trade Mission: Latin America",
    description: "Join SBA's trade mission to explore opportunities in Latin American markets.",
    startDate: getFutureDate(50),
    endDate: getFutureDate(55),
    location: "Mexico City, Mexico",
    url: "https://www.sba.gov/offices/headquarters/oit",
    organizerId: "sba-international",
    organizerName: "SBA Office of International Trade",
    isFree: false,
    isCurated: true,
    country: "US",
    eventType: "trade-mission"
  },
  {
    id: "nasbite-certification",
    title: "NASBITE CGBP Certification Workshop",
    description: "Prepare for the Certified Global Business Professional exam.",
    startDate: getFutureDate(28),
    location: "Online",
    url: "https://www.nasbite.org/events",
    organizerId: "nasbite",
    organizerName: "NASBITE International",
    isFree: false,
    isCurated: true,
    country: "US",
    eventType: "workshop"
  },
  {
    id: "us-chamber-summit",
    title: "U.S. Chamber Global Business Summit",
    description: "Annual summit on global business trends and opportunities.",
    startDate: getFutureDate(60),
    endDate: getFutureDate(61),
    location: "New York, NY",
    url: "https://www.uschamber.com/events",
    organizerId: "us-chamber",
    organizerName: "U.S. Chamber of Commerce",
    isFree: false,
    isCurated: true,
    country: "US",
    eventType: "conference"
  }
];
async function fetchWithTimeout(url, timeout = 1e4) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html"
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    return null;
  }
}
function extractFromJSONLD(html, organizer) {
  const events = [];
  const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      let data = JSON.parse(match[1]);
      if (data["@graph"]) data = data["@graph"];
      const eventData = Array.isArray(data) ? data.filter((d) => d["@type"] === "Event" || d["@type"] === "EventSeries") : data["@type"] === "Event" || data["@type"] === "EventSeries" ? [data] : [];
      for (const event of eventData) {
        if (!event.name || !event.startDate) continue;
        events.push({
          id: `${organizer.id}-${hashString(event.url || event.name)}`,
          title: cleanText(event.name),
          description: cleanText(event.description || ""),
          startDate: event.startDate,
          endDate: event.endDate,
          location: extractLocation(event.location),
          url: event.url || organizer.eventsUrl || organizer.website,
          organizerId: organizer.id,
          organizerName: organizer.name,
          isFree: event.isAccessibleForFree || event.offers?.price === "0",
          imageUrl: event.image?.url || event.image,
          country: organizer.country
        });
      }
    } catch (e) {
    }
  }
  return events;
}
function extractLocation(location) {
  if (!location) return "Online or See Event Details";
  if (typeof location === "string") return location;
  if (location["@type"] === "VirtualLocation") return "Online Event";
  if (location["@type"] === "Place") {
    if (location.name) return location.name;
    if (location.address) {
      const addr = location.address;
      if (typeof addr === "string") return addr;
      const parts = [];
      if (addr.addressLocality) parts.push(addr.addressLocality);
      if (addr.addressRegion) parts.push(addr.addressRegion);
      if (parts.length > 0) return parts.join(", ");
    }
  }
  return "See Event Details";
}
function cleanText(text) {
  if (!text) return "";
  return text.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
async function fetchEventsFromOrganizer(organizer) {
  if (organizer.scrapingStrategy === "curated") {
    const orgEvents = curatedEvents.filter((e) => e.organizerId === organizer.id);
    if (orgEvents.length > 0) {
      console.log(`   📚 ${orgEvents.length} curated event(s)`);
      return orgEvents;
    }
  }
  if (!organizer.eventsUrl) return [];
  const response = await fetchWithTimeout(organizer.eventsUrl);
  if (!response || !response.ok) {
    console.log(`   ⚠️  HTTP ${response?.status || "failed"}`);
    return [];
  }
  try {
    const html = await response.text();
    const events = extractFromJSONLD(html, organizer);
    if (events.length > 0) {
      console.log(`   ✅ ${events.length} event(s)`);
      return events;
    }
    console.log(`   ℹ️  No events extracted`);
    return [];
  } catch (error) {
    console.error(`   ❌ Error:`, error instanceof Error ? error.message : error);
    return [];
  }
}
function filterEvents(events, params) {
  let filtered = [...events];
  const keyword = params.get("keyword");
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = filtered.filter(
      (event) => event.title.toLowerCase().includes(lowerKeyword) || event.description.toLowerCase().includes(lowerKeyword) || event.organizerName.toLowerCase().includes(lowerKeyword)
    );
  }
  const organizerId = params.get("organizer");
  if (organizerId) {
    filtered = filtered.filter((event) => event.organizerId === organizerId);
  }
  const country = params.get("country");
  if (country && (country === "CA" || country === "US")) {
    filtered = filtered.filter((event) => event.country === country);
  }
  const now = /* @__PURE__ */ new Date();
  now.setHours(0, 0, 0, 0);
  const timeframe = params.get("timeframe") || "upcoming";
  filtered = filtered.filter((event) => {
    if (event.isPlaceholder) return true;
    const eventDate = new Date(event.startDate);
    switch (timeframe) {
      case "this-week": {
        const endOfWeek = new Date(now);
        endOfWeek.setDate(endOfWeek.getDate() + 7);
        return eventDate >= now && eventDate <= endOfWeek;
      }
      case "this-month": {
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return eventDate >= now && eventDate <= endOfMonth;
      }
      case "next-3-months": {
        const end3Months = new Date(now);
        end3Months.setMonth(end3Months.getMonth() + 3);
        return eventDate >= now && eventDate <= end3Months;
      }
      default:
        return eventDate >= now;
    }
  });
  return filtered;
}
async function GET({ request }) {
  const url = new URL(request.url);
  const params = url.searchParams;
  console.log("\n📅 ===== EVENT AGGREGATION (CANADA + US) =====");
  try {
    const startTime = Date.now();
    const allEventsPromises = eventOrganizers.map(
      (org) => fetchEventsFromOrganizer(org).catch(() => [])
    );
    const eventsArrays = await Promise.all(allEventsPromises);
    let allEvents = eventsArrays.flat();
    const uniqueEvents = /* @__PURE__ */ new Map();
    for (const event of allEvents) {
      if (!uniqueEvents.has(event.url)) {
        uniqueEvents.set(event.url, event);
      }
    }
    allEvents = Array.from(uniqueEvents.values());
    allEvents.sort((a, b) => {
      if (a.isPlaceholder && !b.isPlaceholder) return 1;
      if (!a.isPlaceholder && b.isPlaceholder) return -1;
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });
    const filteredEvents = filterEvents(allEvents, params);
    const fetchTime = Date.now() - startTime;
    const realEvents = filteredEvents.filter((e) => !e.isPlaceholder && !e.isCurated).length;
    const curatedCount = filteredEvents.filter((e) => e.isCurated).length;
    const placeholders = filteredEvents.filter((e) => e.isPlaceholder).length;
    const canadianEvents = filteredEvents.filter((e) => e.country === "CA").length;
    const usEvents = filteredEvents.filter((e) => e.country === "US").length;
    console.log(`✅ ${filteredEvents.length} total (CA: ${canadianEvents}, US: ${usEvents}) (${(fetchTime / 1e3).toFixed(1)}s)
`);
    return new Response(JSON.stringify({
      success: true,
      count: filteredEvents.length,
      events: filteredEvents,
      meta: {
        fetchTimeMs: fetchTime,
        organizationsQueried: eventOrganizers.length,
        scrapedEvents: realEvents,
        curatedEvents: curatedCount,
        placeholders,
        canadianEvents,
        usEvents,
        breakdown: {
          canadian: {
            total: canadianEvents,
            organizers: canadianOrganizers.length
          },
          us: {
            total: usEvents,
            organizers: usOrganizers.length
          }
        }
      },
      sources: eventOrganizers.map((org) => ({
        id: org.id,
        name: org.name,
        website: org.website,
        eventsPage: org.eventsUrl,
        country: org.country
      }))
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=1800",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("❌ ERROR:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to aggregate events",
      message: error instanceof Error ? error.message : "Unknown error",
      events: []
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
