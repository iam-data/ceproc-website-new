import { c as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_DW7p6Anu.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D9-Fp7JG.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const solutionsContent = {
  hero: {
    badge: "Complete Export Solutions",
    headline: "Your Path to Global Success",
    subheadline: "Whether you're a Canadian producer ready to export or a global buyer seeking verified suppliers, we have the expertise and network to accelerate your success."},
  producers: {
    headline: "Scale Without Risk: Your Dedicated Export Partner",
    description: "We help Canadian businesses move beyond domestic success and confidently expand into profitable global markets. Our services eliminate compliance barriers, buyer risk, and logistics complexity.",
    services: [
      {
        title: "The CEPROC Vetting Program",
        tagline: "Transform from unknown to verified partner",
        description: "Elevate your credibility and unlock exclusive trade opportunities through our rigorous certification process.",
        features: [
          {
            title: "Financial Due Diligence",
            description: "Assessment of export readiness, stability, and capacity to meet international demand"
          },
          {
            title: "Compliance Audit",
            description: "Rigorous verification against Canadian and target market regulations, customs codes, and documentation"
          },
          {
            title: "Credibility Certification",
            description: "Official CEPROC Verified Producer mark that builds instant trust with foreign buyers"
          }
        ],
        outcome: "You gain confidence, and buyers gain certainty",
        gradient: "from-cyan-500 to-blue-600",
        icon: "shield-check"
      },
      {
        title: "Strategic Market Access",
        tagline: "Connect with the right opportunities",
        description: "Stop wasting resources on cold calls. Our proprietary data connects you with qualified, high-value opportunities.",
        features: [
          {
            title: "High-Value Buyer Introductions",
            description: "Access our curated database of pre-qualified foreign buyers actively seeking Canadian goods"
          },
          {
            title: "Target Market Selection",
            description: "Data-driven recommendations identifying highest-potential export regions for your products"
          },
          {
            title: "Trade Mission Facilitation",
            description: "Exclusive access to CEPROC-led delegations, B2B events, and virtual buyer-seller meetings"
          }
        ],
        outcome: "Direct, high-conversion pathways to new revenue streams",
        gradient: "from-blue-500 to-purple-600",
        icon: "trending-up"
      },
      {
        title: "End-to-End Compliance Bridge",
        tagline: "Navigate complexity with confidence",
        description: "We manage the paperwork challenge, ensuring frictionless movement of goods and secure payments.",
        features: [
          {
            title: "Customs & Tariff Advisory",
            description: "Real-time guidance on rules of origin, duties, and leveraging FTAs for competitive pricing"
          },
          {
            title: "Logistics Coordination",
            description: "Access to vetted freight forwarders offering preferential rates and reliable tracking"
          },
          {
            title: "Payment & Risk Mitigation",
            description: "Secure payment through Letters of Credit and export credit insurance solutions"
          }
        ],
        outcome: "Minimized delays, avoided fines, and secured payments",
        gradient: "from-purple-500 to-pink-600",
        icon: "document-check"
      }
    ],
    cta: {
      text: "Apply for CEPROC Vetting & Partnership",
      link: "/services/producers#apply",
      subtext: "Start your verified export journey today"
    }
  },
  buyers: {
    headline: "Secure Sourcing: The Trusted Gateway to Verified Canadian Quality",
    description: "For international businesses, governments, and trade commissions, CEPROC is the official trusted source for accessing Canada's best exporters. We eliminate supplier risk.",
    services: [
      {
        title: "Verified Sourcing and Vetting",
        tagline: "Zero-risk supplier connections",
        description: "We perform comprehensive due diligence so you can source with complete confidence.",
        features: [
          {
            title: "Pre-Qualified Suppliers",
            description: "Direct access to producers who passed rigorous CEPROC vetting for financial, legal, and operational compliance"
          },
          {
            title: "Product Integrity",
            description: "Verified quality certifications and standards for consistent, reliable shipments"
          },
          {
            title: "Direct Introduction",
            description: "Personalized matchmaking with Canadian producers suited to your volume and specifications"
          }
        ],
        outcome: "Zero-risk sourcing with proven suppliers",
        gradient: "from-cyan-500 to-blue-600",
        icon: "check-badge"
      },
      {
        title: "Market Intelligence & Economic Insights",
        tagline: "Data-driven procurement decisions",
        description: "Make strategic decisions based on current, reliable economic data direct from the source.",
        features: [
          {
            title: "Proprietary Market Briefs",
            description: "Deep-dive analysis of Canadian export sectors identifying trends, capacity, and key players"
          },
          {
            title: "Trade Policy Impact Reports",
            description: "Exclusive insights on Canadian trade legislation impact on commodity pricing and logistics"
          },
          {
            title: "Custom Research",
            description: "Commissioned research for specific sourcing, compliance, or investment opportunity assessments"
          }
        ],
        outcome: "Strategic decision-making supported by vetted data",
        gradient: "from-blue-500 to-purple-600",
        icon: "chart-bar"
      },
      {
        title: "Government-to-Government Facilitation",
        tagline: "Seamless institutional partnerships",
        description: "Primary liaison for foreign government agencies engaging with Canadian industry.",
        features: [
          {
            title: "Procurement Support",
            description: "Facilitate connections between government procurement teams and qualified Canadian suppliers"
          },
          {
            title: "Investment Advisory",
            description: "Intelligence and connections for FDI into Canadian export sector with regulatory guidance"
          },
          {
            title: "Dispute Resolution",
            description: "Neutral intermediary assistance for trade and compliance issues"
          }
        ],
        outcome: "Smoother governmental engagement and greater trade confidence",
        gradient: "from-purple-500 to-pink-600",
        icon: "building-library"
      }
    ],
    cta: {
      text: "Submit a Verified Buyer Inquiry",
      link: "/services/buyers#inquiry",
      subtext: "Find your Canadian partner today"
    }
  }
};

const $$Solutions = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Our Solutions", "data-astro-cid-6dt247gv": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-24" data-astro-cid-6dt247gv> <div class="absolute inset-0 overflow-hidden" data-astro-cid-6dt247gv> <div class="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" data-astro-cid-6dt247gv></div> <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" data-astro-cid-6dt247gv></div> </div> <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-astro-cid-6dt247gv> <div class="text-center max-w-4xl mx-auto mb-16" data-astro-cid-6dt247gv> <div class="inline-flex items-center rounded-full bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-sm font-semibold text-cyan-400 mb-6" data-astro-cid-6dt247gv> ${solutionsContent.hero.badge} </div> <h1 class="text-5xl font-bold text-white mb-6 lg:text-6xl" data-astro-cid-6dt247gv> ${solutionsContent.hero.headline} </h1> <p class="text-xl text-slate-300" data-astro-cid-6dt247gv> ${solutionsContent.hero.subheadline} </p> </div> <!-- Audience Selection Cards --> <div class="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto" data-astro-cid-6dt247gv> <!-- Canadian Producers Card --> <a href="#producers" class="group relative rounded-3xl bg-slate-800/50 backdrop-blur border-2 border-slate-700 hover:border-transparent p-10 transition-all hover:scale-105 hover:shadow-2xl block" data-astro-cid-6dt247gv> <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" data-astro-cid-6dt247gv></div> <div class="relative" data-astro-cid-6dt247gv> <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 mb-6 shadow-lg group-hover:scale-110 transition-transform" data-astro-cid-6dt247gv> <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-6dt247gv> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-astro-cid-6dt247gv></path> </svg> </div> <h3 class="text-2xl font-bold text-white mb-3" data-astro-cid-6dt247gv>
Canadian Producers
</h3> <p class="text-slate-300 mb-6" data-astro-cid-6dt247gv>
Scale without risk with verified export partnerships
</p> <div class="inline-flex items-center text-sm font-semibold text-cyan-400 group-hover:text-cyan-300" data-astro-cid-6dt247gv>
Learn More
<svg class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-6dt247gv> <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" data-astro-cid-6dt247gv></path> </svg> </div> </div> </a> <!-- Global Buyers Card --> <a href="#buyers" class="group relative rounded-3xl bg-slate-800/50 backdrop-blur border-2 border-slate-700 hover:border-transparent p-10 transition-all hover:scale-105 hover:shadow-2xl block" data-astro-cid-6dt247gv> <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" data-astro-cid-6dt247gv></div> <div class="relative" data-astro-cid-6dt247gv> <div class="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 mb-6 shadow-lg group-hover:scale-110 transition-transform" data-astro-cid-6dt247gv> <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-6dt247gv> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-6dt247gv></path> </svg> </div> <h3 class="text-2xl font-bold text-white mb-3" data-astro-cid-6dt247gv>
Global Buyers
</h3> <p class="text-slate-300 mb-6" data-astro-cid-6dt247gv>
Access verified, quality Canadian suppliers instantly
</p> <div class="inline-flex items-center text-sm font-semibold text-pink-400 group-hover:text-pink-300" data-astro-cid-6dt247gv>
Learn More
<svg class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-6dt247gv> <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" data-astro-cid-6dt247gv></path> </svg> </div> </div> </a> </div> </div> </section>  <section id="producers" class="py-24 bg-white scroll-mt-20" data-astro-cid-6dt247gv> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-astro-cid-6dt247gv> <div class="mb-16" data-astro-cid-6dt247gv> <div class="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white mb-6" data-astro-cid-6dt247gv>
For Canadian Producers
</div> <h2 class="text-4xl font-bold text-slate-900 mb-4 lg:text-5xl" data-astro-cid-6dt247gv> ${solutionsContent.producers.headline} </h2> <p class="text-xl text-slate-600 max-w-3xl" data-astro-cid-6dt247gv> ${solutionsContent.producers.description} </p> </div> <div class="grid gap-8 lg:grid-cols-3 mb-12" data-astro-cid-6dt247gv> ${solutionsContent.producers.services.map((service) => renderTemplate`<div class="relative group rounded-3xl border-2 border-slate-200 bg-white p-8 hover:border-transparent hover:shadow-2xl transition-all hover:-translate-y-2" data-astro-cid-6dt247gv> <div${addAttribute(`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity`, "class")} data-astro-cid-6dt247gv></div> <div${addAttribute(`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 shadow-lg`, "class")} data-astro-cid-6dt247gv> <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-6dt247gv> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-6dt247gv></path> </svg> </div> <h3 class="text-2xl font-bold text-slate-900 mb-2" data-astro-cid-6dt247gv> ${service.title} </h3> <p${addAttribute(`text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-4`, "class")} data-astro-cid-6dt247gv> ${service.tagline} </p> <p class="text-slate-600 mb-6" data-astro-cid-6dt247gv> ${service.description} </p> <ul class="space-y-3 mb-6" data-astro-cid-6dt247gv> ${service.features.map((feature) => renderTemplate`<li class="flex items-start text-sm" data-astro-cid-6dt247gv> <svg class="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-6dt247gv> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-astro-cid-6dt247gv></path> </svg> <div data-astro-cid-6dt247gv> <strong class="text-slate-900" data-astro-cid-6dt247gv>${feature.title}:</strong> <span class="text-slate-600" data-astro-cid-6dt247gv> ${feature.description}</span> </div> </li>`)} </ul> <div${addAttribute(`pt-4 border-t border-slate-200 text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`, "class")} data-astro-cid-6dt247gv>
✓ ${service.outcome} </div> </div>`)} </div> <div class="text-center" data-astro-cid-6dt247gv> <a${addAttribute(solutionsContent.producers.cta.link, "href")} class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all" data-astro-cid-6dt247gv> ${solutionsContent.producers.cta.text} <svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-6dt247gv> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-6dt247gv></path> </svg> </a> <p class="text-sm text-slate-600 mt-3" data-astro-cid-6dt247gv>${solutionsContent.producers.cta.subtext}</p> </div> </div> </section>  <section id="buyers" class="py-24 bg-slate-50 scroll-mt-20" data-astro-cid-6dt247gv> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-astro-cid-6dt247gv> <div class="mb-16" data-astro-cid-6dt247gv> <div class="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 text-sm font-semibold text-white mb-6" data-astro-cid-6dt247gv>
For Global Buyers
</div> <h2 class="text-4xl font-bold text-slate-900 mb-4 lg:text-5xl" data-astro-cid-6dt247gv> ${solutionsContent.buyers.headline} </h2> <p class="text-xl text-slate-600 max-w-3xl" data-astro-cid-6dt247gv> ${solutionsContent.buyers.description} </p> </div> <div class="grid gap-8 lg:grid-cols-3 mb-12" data-astro-cid-6dt247gv> ${solutionsContent.buyers.services.map((service) => renderTemplate`<div class="relative group rounded-3xl border-2 border-slate-200 bg-white p-8 hover:border-transparent hover:shadow-2xl transition-all hover:-translate-y-2" data-astro-cid-6dt247gv> <div${addAttribute(`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity`, "class")} data-astro-cid-6dt247gv></div> <div${addAttribute(`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 shadow-lg`, "class")} data-astro-cid-6dt247gv> <svg class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-6dt247gv> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-astro-cid-6dt247gv></path> </svg> </div> <h3 class="text-2xl font-bold text-slate-900 mb-2" data-astro-cid-6dt247gv> ${service.title} </h3> <p${addAttribute(`text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-4`, "class")} data-astro-cid-6dt247gv> ${service.tagline} </p> <p class="text-slate-600 mb-6" data-astro-cid-6dt247gv> ${service.description} </p> <ul class="space-y-3 mb-6" data-astro-cid-6dt247gv> ${service.features.map((feature) => renderTemplate`<li class="flex items-start text-sm" data-astro-cid-6dt247gv> <svg class="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" data-astro-cid-6dt247gv> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" data-astro-cid-6dt247gv></path> </svg> <div data-astro-cid-6dt247gv> <strong class="text-slate-900" data-astro-cid-6dt247gv>${feature.title}:</strong> <span class="text-slate-600" data-astro-cid-6dt247gv> ${feature.description}</span> </div> </li>`)} </ul> <div${addAttribute(`pt-4 border-t border-slate-200 text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`, "class")} data-astro-cid-6dt247gv>
✓ ${service.outcome} </div> </div>`)} </div> <div class="text-center" data-astro-cid-6dt247gv> <a${addAttribute(solutionsContent.buyers.cta.link, "href")} class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-4 text-base font-semibold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all" data-astro-cid-6dt247gv> ${solutionsContent.buyers.cta.text} <svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-6dt247gv> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-6dt247gv></path> </svg> </a> <p class="text-sm text-slate-600 mt-3" data-astro-cid-6dt247gv>${solutionsContent.buyers.cta.subtext}</p> </div> </div> </section>  <section class="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" data-astro-cid-6dt247gv> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-astro-cid-6dt247gv> <div class="text-center max-w-3xl mx-auto" data-astro-cid-6dt247gv> <h2 class="text-4xl font-bold text-white mb-6" data-astro-cid-6dt247gv>
Ready to Start Your Export Journey?
</h2> <p class="text-xl text-slate-300 mb-8" data-astro-cid-6dt247gv>
Whether you're exploring international markets for the first time or scaling global operations, CEPROC has the expertise and network to support your success.
</p> <div class="flex flex-col sm:flex-row gap-4 justify-center" data-astro-cid-6dt247gv> <a href="/contact" class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all" data-astro-cid-6dt247gv>
Schedule a Consultation
<svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-6dt247gv> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" data-astro-cid-6dt247gv></path> </svg> </a> <a href="/" class="inline-flex items-center justify-center rounded-xl border-2 border-slate-600 bg-slate-800/50 backdrop-blur px-8 py-4 text-base font-semibold text-white hover:border-cyan-400 hover:bg-slate-700/50 transition-all" data-astro-cid-6dt247gv>
Learn More About CEPROC
</a> </div> </div> </div> </section> ` })} `;
}, "/Users/anthony.mano/ceproc-astro-website/src/pages/solutions.astro", void 0);

const $$file = "/Users/anthony.mano/ceproc-astro-website/src/pages/solutions.astro";
const $$url = "/solutions";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Solutions,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
