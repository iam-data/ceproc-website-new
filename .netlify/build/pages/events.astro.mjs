import { c as createComponent, i as renderComponent, j as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DW7p6Anu.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D9-Fp7JG.mjs';
/* empty css                                  */
export { renderers } from '../renderers.mjs';

const $$Events = createComponent(async ($$result, $$props, $$slots) => {
  const pageTitle = "International Business Events";
  const pageDescription = "Discover export opportunities, trade missions, webinars, and networking events from Canada and the United States";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": pageTitle, "description": pageDescription, "data-astro-cid-ro7pgs3h": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-screen bg-gray-50" data-astro-cid-ro7pgs3h> <!-- Hero Section --> <section class="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16" data-astro-cid-ro7pgs3h> <div class="container mx-auto px-4" data-astro-cid-ro7pgs3h> <div class="max-w-4xl mx-auto text-center" data-astro-cid-ro7pgs3h> <h1 class="text-4xl md:text-5xl font-bold mb-4" data-astro-cid-ro7pgs3h>
International Business Events
</h1> <p class="text-xl text-blue-100 mb-8" data-astro-cid-ro7pgs3h>
Discover export opportunities, trade missions, webinars, and networking events from Canada and the United States
</p> <!-- Country Tabs --> <div class="flex justify-center gap-4 mb-8" data-astro-cid-ro7pgs3h> <button id="tab-all" class="country-tab px-6 py-3 bg-white text-blue-900 rounded-lg font-semibold transition-all active" data-country="all" data-astro-cid-ro7pgs3h>
🌎 All Events
</button> <button id="tab-ca" class="country-tab px-6 py-3 bg-blue-800 hover:bg-blue-700 rounded-lg font-semibold transition-all" data-country="CA" data-astro-cid-ro7pgs3h>
🍁 Canadian Events
</button> <button id="tab-us" class="country-tab px-6 py-3 bg-blue-800 hover:bg-blue-700 rounded-lg font-semibold transition-all" data-country="US" data-astro-cid-ro7pgs3h>
🇺🇸 U.S. Events
</button> </div> <!-- Search and Filters --> <div class="bg-white rounded-lg shadow-lg p-6 text-gray-800" data-astro-cid-ro7pgs3h> <form id="event-search-form" class="space-y-4" data-astro-cid-ro7pgs3h> <div class="grid md:grid-cols-3 gap-4" data-astro-cid-ro7pgs3h> <input type="text" id="search-keyword" placeholder="Search events..." class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" data-astro-cid-ro7pgs3h> <select id="filter-organizer" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" data-astro-cid-ro7pgs3h> <option value="" data-astro-cid-ro7pgs3h>All Organizations</option> <optgroup label="Canadian Organizations" data-astro-cid-ro7pgs3h> <option value="edc" data-astro-cid-ro7pgs3h>Export Development Canada</option> <option value="bdc" data-astro-cid-ro7pgs3h>Business Development Bank of Canada</option> <option value="trade-commissioner-service" data-astro-cid-ro7pgs3h>Trade Commissioner Service</option> <option value="fitt" data-astro-cid-ro7pgs3h>FITT</option> <option value="cme" data-astro-cid-ro7pgs3h>Canadian Manufacturers & Exporters</option> <option value="canadian-chamber" data-astro-cid-ro7pgs3h>Canadian Chamber of Commerce</option> <option value="ontario-exports" data-astro-cid-ro7pgs3h>Ontario Exports</option> <option value="naita" data-astro-cid-ro7pgs3h>NAITA</option> </optgroup> <optgroup label="U.S. Organizations" data-astro-cid-ro7pgs3h> <option value="us-commerce" data-astro-cid-ro7pgs3h>U.S. Dept of Commerce</option> <option value="exim-bank" data-astro-cid-ro7pgs3h>EXIM Bank</option> <option value="sba-international" data-astro-cid-ro7pgs3h>SBA International Trade</option> <option value="nasbite" data-astro-cid-ro7pgs3h>NASBITE International</option> <option value="us-chamber" data-astro-cid-ro7pgs3h>U.S. Chamber of Commerce</option> </optgroup> </select> <select id="filter-timeframe" class="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" data-astro-cid-ro7pgs3h> <option value="upcoming" data-astro-cid-ro7pgs3h>Upcoming Events</option> <option value="this-week" data-astro-cid-ro7pgs3h>This Week</option> <option value="this-month" data-astro-cid-ro7pgs3h>This Month</option> <option value="next-3-months" data-astro-cid-ro7pgs3h>Next 3 Months</option> </select> </div> <button type="submit" class="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors" data-astro-cid-ro7pgs3h>
Search Events
</button> </form> </div> <!-- Stats Bar --> <div id="stats-bar" class="mt-6 flex justify-center gap-8 text-sm text-blue-100" data-astro-cid-ro7pgs3h> <div data-astro-cid-ro7pgs3h> <span class="font-bold" id="stat-total" data-astro-cid-ro7pgs3h>0</span> Total Events
</div> <div data-astro-cid-ro7pgs3h>
🍁 <span class="font-bold" id="stat-ca" data-astro-cid-ro7pgs3h>0</span> Canadian
</div> <div data-astro-cid-ro7pgs3h>
🇺🇸 <span class="font-bold" id="stat-us" data-astro-cid-ro7pgs3h>0</span> U.S.
</div> </div> </div> </div> </section> <!-- Loading State --> <div id="loading-state" class="container mx-auto px-4 py-12 text-center" data-astro-cid-ro7pgs3h> <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" data-astro-cid-ro7pgs3h></div> <p class="mt-4 text-gray-600" data-astro-cid-ro7pgs3h>Loading events...</p> </div> <!-- Events List --> <section class="container mx-auto px-4 py-12" data-astro-cid-ro7pgs3h> <div id="events-container" class="hidden space-y-6" data-astro-cid-ro7pgs3h> <!-- Events will be inserted here --> </div> <!-- No Results --> <div id="no-results" class="hidden text-center py-12" data-astro-cid-ro7pgs3h> <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-ro7pgs3h> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-ro7pgs3h></path> </svg> <h3 class="mt-4 text-xl font-semibold text-gray-700" data-astro-cid-ro7pgs3h>No events found</h3> <p class="mt-2 text-gray-500" data-astro-cid-ro7pgs3h>Try adjusting your search or filters</p> </div> </section> </div> ` })} ${renderScript($$result, "/Users/anthony.mano/ceproc-astro-website/src/pages/events.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/anthony.mano/ceproc-astro-website/src/pages/events.astro", void 0);

const $$file = "/Users/anthony.mano/ceproc-astro-website/src/pages/events.astro";
const $$url = "/events";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Events,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
