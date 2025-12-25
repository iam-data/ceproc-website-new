export { renderers } from '../../renderers.mjs';

const eventOrganizers = [
  {
    id: "tfo-canada",
    name: "Trade Facilitation Office Canada",
    website: "https://www.tfocanada.ca",
    eventsUrl: "https://www.tfocanada.ca/events"
  },
  {
    id: "edc",
    name: "Export Development Canada",
    website: "https://www.edc.ca",
    eventsUrl: "https://www.edc.ca/en/events.html"
  },
  {
    id: "bdc",
    name: "Business Development Bank of Canada",
    website: "https://www.bdc.ca",
    eventsUrl: "https://www.bdc.ca/en/articles-tools/events"
  },
  {
    id: "world-trade-centre-toronto",
    name: "World Trade Centre Toronto",
    website: "https://www.wtctoronto.com",
    eventsUrl: "https://www.wtctoronto.com/events"
  },
  {
    id: "trade-commissioner",
    name: "Canadian Trade Commissioner Service",
    website: "https://www.tradecommissioner.gc.ca",
    eventsUrl: "https://www.tradecommissioner.gc.ca/events"
  },
  {
    id: "fitt",
    name: "Forum for International Trade Training",
    website: "https://www.fitt.ca",
    eventsUrl: "https://www.fitt.ca/events"
  },
  {
    id: "cme",
    name: "Canadian Manufacturers & Exporters",
    website: "https://cme-mec.ca",
    eventsUrl: "https://cme-mec.ca/events"
  },
  {
    id: "canadian-chamber",
    name: "Canadian Chamber of Commerce",
    website: "https://www.chamber.ca",
    eventsUrl: "https://www.chamber.ca/events"
  }
];
async function fetchWithTimeout(url, timeout = 8e3) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "CEPROC Event Aggregator Bot/1.0 (+https://ceproc.ca)",
        "Accept": "text/html,application/json,application/rss+xml"
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
function extractEventsFromJSONLD(html, organizer) {
  const events = [];
  const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      let data = JSON.parse(match[1]);
      if (data["@graph"]) {
        data = data["@graph"];
      }
      const eventData = Array.isArray(data) ? data.filter((d) => d["@type"] === "Event" || d["@type"] === "EventSeries") : data["@type"] === "Event" || data["@type"] === "EventSeries" ? [data] : [];
      for (const event of eventData) {
        if (!event.name || !event.startDate) continue;
        const eventObj = {
          id: `${organizer.id}-${hashString(event.url || event.name)}`,
          title: cleanText(event.name),
          description: cleanText(event.description || ""),
          startDate: event.startDate,
          endDate: event.endDate,
          location: extractLocation(event.location),
          url: event.url || organizer.eventsUrl || organizer.website,
          organizerId: organizer.id,
          organizerName: organizer.name,
          isFree: event.isAccessibleForFree || event.offers?.price === "0" || event.offers?.price === 0,
          imageUrl: event.image?.url || event.image
        };
        events.push(eventObj);
      }
    } catch (e) {
      console.error(`JSON-LD parsing error for ${organizer.name}:`, e);
    }
  }
  return events;
}
function extractLocation(location) {
  if (!location) return "Online or See Event Details";
  if (typeof location === "string") return location;
  if (location["@type"] === "Place" || location["@type"] === "VirtualLocation") {
    if (location.name) return location.name;
    if (location.address) {
      const addr = location.address;
      if (typeof addr === "string") return addr;
      const parts = [];
      if (addr.streetAddress) parts.push(addr.streetAddress);
      if (addr.addressLocality) parts.push(addr.addressLocality);
      if (addr.addressRegion) parts.push(addr.addressRegion);
      if (parts.length > 0) return parts.join(", ");
    }
  }
  if (location["@type"] === "VirtualLocation") {
    return location.url ? "Online Event" : "Virtual";
  }
  return "See Event Details";
}
function cleanText(text) {
  if (!text) return "";
  return text.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&rsquo;/g, "'").replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
async function fetchEventsFromOrganizer(organizer) {
  try {
    if (!organizer.eventsUrl) {
      console.log(`No events URL for ${organizer.name}`);
      return [];
    }
    console.log(`Fetching events from ${organizer.name}...`);
    const response = await fetchWithTimeout(organizer.eventsUrl);
    if (!response.ok) {
      console.error(`HTTP ${response.status} from ${organizer.name}`);
      return [];
    }
    const html = await response.text();
    const events = extractEventsFromJSONLD(html, organizer);
    console.log(`Found ${events.length} events from ${organizer.name}`);
    return events;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching from ${organizer.name}:`, error.message);
    }
    return [];
  }
}
function filterEvents(events, params) {
  let filtered = [...events];
  const keyword = params.get("keyword");
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filtered = filtered.filter(
      (event) => event.title.toLowerCase().includes(lowerKeyword) || event.description.toLowerCase().includes(lowerKeyword) || event.location.toLowerCase().includes(lowerKeyword) || event.organizerName.toLowerCase().includes(lowerKeyword)
    );
  }
  const organizerId = params.get("organizer");
  if (organizerId) {
    filtered = filtered.filter((event) => event.organizerId === organizerId);
  }
  const timeframe = params.get("timeframe") || "upcoming";
  const now = /* @__PURE__ */ new Date();
  now.setHours(0, 0, 0, 0);
  switch (timeframe) {
    case "this-week": {
      const endOfWeek = new Date(now);
      endOfWeek.setDate(endOfWeek.getDate() + 7);
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= now && eventDate <= endOfWeek;
      });
      break;
    }
    case "this-month": {
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= now && eventDate <= endOfMonth;
      });
      break;
    }
    case "next-3-months": {
      const end3Months = new Date(now);
      end3Months.setMonth(end3Months.getMonth() + 3);
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= now && eventDate <= end3Months;
      });
      break;
    }
    default:
      filtered = filtered.filter((event) => new Date(event.startDate) >= now);
  }
  const freeOnly = params.get("free") === "true";
  if (freeOnly) {
    filtered = filtered.filter((event) => event.isFree === true);
  }
  return filtered;
}
const GET = async ({ request }) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  try {
    console.log("Starting event aggregation...");
    const allEventsPromises = eventOrganizers.map(
      (org) => fetchEventsFromOrganizer(org).catch((err) => {
        console.error(`Failed to fetch from ${org.name}:`, err);
        return [];
      })
    );
    const eventsArrays = await Promise.all(allEventsPromises);
    let allEvents = eventsArrays.flat();
    console.log(`Total events fetched: ${allEvents.length}`);
    const uniqueEvents = /* @__PURE__ */ new Map();
    for (const event of allEvents) {
      if (!uniqueEvents.has(event.url)) {
        uniqueEvents.set(event.url, event);
      }
    }
    allEvents = Array.from(uniqueEvents.values());
    console.log(`Unique events: ${allEvents.length}`);
    allEvents.sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    const filteredEvents = filterEvents(allEvents, params);
    console.log(`Filtered events: ${filteredEvents.length}`);
    return new Response(JSON.stringify({
      success: true,
      count: filteredEvents.length,
      events: filteredEvents,
      sources: eventOrganizers.map((org) => ({
        id: org.id,
        name: org.name,
        website: org.website
      }))
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=1800",
        // 30 minutes cache
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    console.error("Critical error in events API:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to aggregate events",
      message: error instanceof Error ? error.message : "Unknown error",
      events: [],
      fallbackMessage: "Please visit our partner organizations directly for event information."
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
