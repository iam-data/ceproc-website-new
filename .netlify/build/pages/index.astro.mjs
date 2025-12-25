import { c as createComponent, m as maybeRenderHead, f as addAttribute, r as renderTemplate, i as renderComponent } from '../chunks/astro/server_DW7p6Anu.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D9-Fp7JG.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const heroContent = {
  badges: [
    {
      name: "TCS",
      fullName: "Trade Commissioner",
      url: "https://www.tradecommissioner.gc.ca/",
      color: "cyan"
    },
    {
      name: "EDC",
      fullName: "Export Development",
      url: "https://www.edc.ca/",
      color: "blue"
    },
    {
      name: "GAC",
      fullName: "Global Affairs",
      url: "https://www.international.gc.ca/",
      color: "purple"
    }
  ],
  headline: {
    main: "Canada's Global Ambition:",
    highlight: "50% More Exports by 2025"
  },
  subheadline: "The Integrated Platform for Canadian Exporters",
  description: "CEPROC unifies Canada's trade expertise, financial solutions, and global network to drive sustainable economic growth and diversification. We simplify global expansion, connecting you to the right guidance, capital, and opportunities.",
  ctas: [
    {
      text: "Find Your Export Solution Now",
      link: "/solutions",
      primary: true
    },
    {
      text: "View Strategy",
      link: "/about",
      primary: false
    }
  ],
  stats: [
    {
      number: "15+",
      label: "Trade Agreements",
      gradient: "from-cyan-400 to-blue-400"
    },
    {
      number: "49",
      label: "Partner Countries",
      gradient: "from-blue-400 to-purple-400"
    },
    {
      number: "2025",
      label: "Target Year",
      gradient: "from-purple-400 to-pink-400"
    }
  ],
  visual: {
    title: "Unlock Global Markets",
    subtitle: "Access to Europe, Asia, and the Americas"
  }
};

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const colorMap = {
    cyan: { border: "border-cyan-500/30", hover: "hover:border-cyan-500", bg: "bg-cyan-400", text: "text-cyan-400" },
    blue: { border: "border-blue-500/30", hover: "hover:border-blue-500", bg: "bg-blue-400", text: "text-blue-400" },
    purple: { border: "border-purple-500/30", hover: "hover:border-purple-500", bg: "bg-purple-400", text: "text-purple-400" }
  };
  return renderTemplate`${maybeRenderHead()}<section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-32" data-astro-cid-bbe6dxrz> <!-- Animated Background Elements --> <div class="absolute inset-0 overflow-hidden" data-astro-cid-bbe6dxrz> <div class="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" data-astro-cid-bbe6dxrz></div> <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" data-astro-cid-bbe6dxrz></div> <div class="absolute top-40 left-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" data-astro-cid-bbe6dxrz></div> </div> <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-astro-cid-bbe6dxrz> <div class="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center" data-astro-cid-bbe6dxrz> <!-- Content --> <div class="space-y-8" data-astro-cid-bbe6dxrz> <!-- Trust Badges with Links --> <div class="flex items-center space-x-4 text-xs" data-astro-cid-bbe6dxrz> ${heroContent.badges.map((badge) => {
    const colors = colorMap[badge.color];
    return renderTemplate`<a${addAttribute(badge.url, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(`flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800 border ${colors.border} ${colors.hover} hover:bg-slate-700 transition-all group`, "class")} data-astro-cid-bbe6dxrz> <div${addAttribute(`h-2 w-2 rounded-full ${colors.bg} group-hover:scale-125 transition-transform`, "class")} data-astro-cid-bbe6dxrz></div> <span${addAttribute(`${colors.text} font-semibold`, "class")} data-astro-cid-bbe6dxrz>${badge.name}</span> <span class="hidden sm:inline text-slate-400 group-hover:text-slate-300" data-astro-cid-bbe6dxrz>${badge.fullName}</span> </a>`;
  })} </div> <!-- Headline --> <div class="space-y-6" data-astro-cid-bbe6dxrz> <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl leading-tight" data-astro-cid-bbe6dxrz> ${heroContent.headline.main} <span class="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" data-astro-cid-bbe6dxrz> ${heroContent.headline.highlight} </span> </h1> <h2 class="text-xl text-cyan-300 font-medium sm:text-2xl" data-astro-cid-bbe6dxrz> ${heroContent.subheadline} </h2> </div> <!-- Description --> <p class="text-lg text-slate-300 leading-relaxed" data-astro-cid-bbe6dxrz> ${heroContent.description} </p> <!-- CTAs --> <div class="flex flex-col sm:flex-row gap-4" data-astro-cid-bbe6dxrz> ${heroContent.ctas.map((cta) => cta.primary ? renderTemplate`<a${addAttribute(cta.link, "href")} class="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all" data-astro-cid-bbe6dxrz> ${cta.text} <svg class="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-bbe6dxrz> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-astro-cid-bbe6dxrz></path> </svg> </a>` : renderTemplate`<a${addAttribute(cta.link, "href")} class="inline-flex items-center justify-center rounded-xl border-2 border-slate-600 bg-slate-800/50 backdrop-blur px-8 py-4 text-base font-semibold text-white hover:border-cyan-400 hover:bg-slate-700/50 transition-all" data-astro-cid-bbe6dxrz> ${cta.text} </a>`)} </div> <!-- Stats --> <div class="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700" data-astro-cid-bbe6dxrz> ${heroContent.stats.map((stat) => renderTemplate`<div class="group cursor-default" data-astro-cid-bbe6dxrz> <div${addAttribute(`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform`, "class")} data-astro-cid-bbe6dxrz> ${stat.number} </div> <div class="text-sm text-slate-400 mt-1" data-astro-cid-bbe6dxrz>${stat.label}</div> </div>`)} </div> </div> <!-- Visual --> <div class="relative h-96 lg:h-[600px]" data-astro-cid-bbe6dxrz> <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm" data-astro-cid-bbe6dxrz></div> <div class="relative h-full rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl p-8 flex items-center justify-center border border-slate-700" data-astro-cid-bbe6dxrz> <div class="text-center space-y-8" data-astro-cid-bbe6dxrz> <div class="relative mx-auto h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/50 animate-pulse-slow" data-astro-cid-bbe6dxrz> <svg class="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-bbe6dxrz> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-bbe6dxrz></path> </svg> <div class="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 animate-ping opacity-20" data-astro-cid-bbe6dxrz></div> </div> <div class="space-y-3" data-astro-cid-bbe6dxrz> <p class="text-2xl font-bold text-white" data-astro-cid-bbe6dxrz>${heroContent.visual.title}</p> <p class="text-slate-400 text-lg" data-astro-cid-bbe6dxrz>${heroContent.visual.subtitle}</p> </div> </div> </div> </div> </div> </div> </section> `;
}, "/Users/anthony.mano/ceproc-astro-website/src/components/Hero.astro", void 0);

const $$ValuePillars = createComponent(($$result, $$props, $$slots) => {
  const pillars = [
    {
      title: "Global Market Access & Diversification",
      description: "Maximize Canada's extensive network of trade agreements to unlock new, high-growth markets across the globe.",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      gradient: "from-cyan-500 to-blue-600",
      features: [
        "Official trade missions to key global markets",
        "B2B networking with international partners",
        "Foreign market intelligence and insights",
        "Access to CUSMA, CPTPP, CETA opportunities"
      ]
    },
    {
      title: "Capital, Coverage & Risk Mitigation",
      description: "Export with confidence through comprehensive financial solutions and risk management tools.",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      gradient: "from-blue-500 to-purple-600",
      features: [
        "Trade credit insurance against non-payment",
        "Financing and direct lending solutions",
        "Working capital guarantees",
        "Investment matching programs"
      ]
    },
    {
      title: "Expert Intelligence & Regulatory Guidance",
      description: "Navigate complex international regulations with specialized knowledge and real-time market intelligence.",
      icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      gradient: "from-purple-500 to-pink-600",
      features: [
        "Country and industry-specific reports",
        "Tariff and sanctions guidance",
        "Export and import control navigation",
        "Trade policy and compliance updates"
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-slate-50"> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <!-- Section Header --> <div class="text-center max-w-3xl mx-auto mb-16"> <h2 class="text-4xl font-bold text-slate-900 mb-4">
Three Pillars of Export Success
</h2> <p class="text-xl text-slate-600">
Comprehensive support across market access, financing, and intelligence
</p> </div> <!-- Pillars Grid --> <div class="grid gap-8 lg:grid-cols-3"> ${pillars.map((pillar, index) => renderTemplate`<div class="group relative rounded-3xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-transparent hover:-translate-y-2"> <!-- Gradient Border on Hover --> <div${addAttribute(`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl`, "class")}></div> <!-- Icon --> <div${addAttribute(`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.gradient} shadow-lg`, "class")}> <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${addAttribute(pillar.icon, "d")}></path> </svg> </div> <!-- Content --> <h3 class="text-2xl font-bold text-slate-900 mb-3"> ${pillar.title} </h3> <p class="text-slate-600 mb-6 leading-relaxed"> ${pillar.description} </p> <!-- Features --> <ul class="space-y-3"> ${pillar.features.map((feature) => renderTemplate`<li class="flex items-start"> <svg${addAttribute(`h-6 w-6 mr-3 flex-shrink-0 bg-gradient-to-br ${pillar.gradient} bg-clip-text text-transparent`, "class")} fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span class="text-slate-700 text-sm">${feature}</span> </li>`)} </ul> </div>`)} </div> </div> </section>`;
}, "/Users/anthony.mano/ceproc-astro-website/src/components/ValuePillars.astro", void 0);

const $$ExporterJourney = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-gradient-to-b from-slate-50 to-white"> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div class="text-center max-w-3xl mx-auto mb-16"> <h2 class="text-4xl font-bold text-slate-900 mb-4">
Your Export Journey
</h2> <p class="text-xl text-slate-600">
Tailored solutions for every stage of your global expansion
</p> </div> <div class="grid gap-8 lg:grid-cols-3"> <div class="relative"> <div class="absolute -top-4 -left-4 h-14 w-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-2xl flex items-center justify-center shadow-2xl z-10">
1
</div> <div class="h-full rounded-3xl border-2 border-slate-200 bg-white p-8 hover:border-cyan-400 hover:shadow-2xl transition-all"> <div class="inline-flex items-center rounded-full bg-cyan-100 px-4 py-1 text-sm font-semibold text-cyan-700 mb-4">
Explorer
</div> <h3 class="text-2xl font-bold text-slate-900 mb-2">
Thinking Global?
</h3> <p class="text-sm font-medium text-cyan-600 mb-4">
Take your first step toward international sales
</p> <p class="text-slate-600 mb-8 leading-relaxed">
Get foundational support, export advisory services, and market information to start your global journey.
</p> <a href="/solutions#explorer" class="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white hover:shadow-xl hover:scale-105 transition-all">
Start Your Export Plan
<svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </div> </div> <div class="relative"> <div class="absolute -top-4 -left-4 h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-2xl flex items-center justify-center shadow-2xl z-10">
2
</div> <div class="h-full rounded-3xl border-2 border-slate-200 bg-white p-8 hover:border-purple-400 hover:shadow-2xl transition-all"> <div class="inline-flex items-center rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-700 mb-4">
Operator
</div> <h3 class="text-2xl font-bold text-slate-900 mb-2">
Ready to Diversify?
</h3> <p class="text-sm font-medium text-purple-600 mb-4">
Protect and optimize your operations
</p> <p class="text-slate-600 mb-8 leading-relaxed">
Access credit insurance, working capital guarantees, and resources to navigate trade challenges.
</p> <a href="/solutions#operator" class="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white hover:shadow-xl hover:scale-105 transition-all">
Secure Financing & Insurance
<svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </div> </div> <div class="relative"> <div class="absolute -top-4 -left-4 h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold text-2xl flex items-center justify-center shadow-2xl z-10">
3
</div> <div class="h-full rounded-3xl border-2 border-slate-200 bg-white p-8 hover:border-pink-400 hover:shadow-2xl transition-all"> <div class="inline-flex items-center rounded-full bg-pink-100 px-4 py-1 text-sm font-semibold text-pink-700 mb-4">
Expediter
</div> <h3 class="text-2xl font-bold text-slate-900 mb-2">
Scaling Success?
</h3> <p class="text-sm font-medium text-pink-600 mb-4">
Expand into new markets faster
</p> <p class="text-slate-600 mb-8 leading-relaxed">
Strategic advice, high-value B2B connections, direct lending, and priority access to trade missions.
</p> <a href="/solutions#expediter" class="inline-flex items-center justify-center w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white hover:shadow-xl hover:scale-105 transition-all">
Connect to Global Opportunities
<svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </div> </div> </div> <div class="mt-20 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 text-center shadow-2xl border border-slate-700 relative overflow-hidden"> <div class="absolute inset-0"> <div class="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div> <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div> </div> <div class="relative z-10"> <h3 class="text-3xl font-bold text-white mb-4">
Join 95,000+ Canadian Export Leaders
</h3> <p class="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
Receive timely market analysis, expert economic outlooks, and priority notifications for trade missions and funding programs.
</p> <form action="https://formspree.io/f/xzznlkog" method="POST" class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"> <input type="email" name="email" required placeholder="Enter your email" class="flex-1 rounded-xl px-6 py-4 text-slate-900 bg-white focus:outline-none focus:ring-4 focus:ring-cyan-500/50 shadow-lg"> <!-- Honeypot for spam protection --> <input type="text" name="_gotcha" style="display:none" tabindex="-1" autocomplete="off"> <!-- Hidden fields --> <input type="hidden" name="_subject" value="New CEPROC Newsletter Subscription"> <input type="hidden" name="_next" value="/thank-you"> <input type="hidden" name="_captcha" value="false"> <button type="submit" class="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white hover:shadow-2xl hover:scale-105 transition-all shadow-lg">
Subscribe
</button> </form> </div> </div> </div> </section>`;
}, "/Users/anthony.mano/ceproc-astro-website/src/components/ExporterJourney.astro", void 0);

const $$TrustSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-20 bg-white border-y border-slate-200"> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div class="grid gap-12 lg:grid-cols-2 items-center"> <!-- Trust Content --> <div class="space-y-6"> <div class="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold shadow-lg"> <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span>Ethical Trade Certified</span> </div> <h2 class="text-4xl font-bold text-slate-900">
Ethical Trade. Transparent Practices. Sustainable Growth.
</h2> <p class="text-lg text-slate-600 leading-relaxed">
CEPROC positions Canada as a principled, reliable global partner committed to rule-based trade, transparency, and Environmental, Social, and Governance (ESG) principles.
</p> <div class="space-y-4"> <div class="flex items-start group"> <div class="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg"> <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> </div> <div> <h4 class="font-bold text-slate-900 text-lg">Transparency First</h4> <p class="text-slate-600">Open governance and public accountability standards</p> </div> </div> <div class="flex items-start group"> <div class="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg"> <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> </div> <div> <h4 class="font-bold text-slate-900 text-lg">ESG Commitment</h4> <p class="text-slate-600">Sustainable economic growth and responsible practices</p> </div> </div> <div class="flex items-start group"> <div class="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform shadow-lg"> <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path> </svg> </div> <div> <h4 class="font-bold text-slate-900 text-lg">Rule-Based Trade</h4> <p class="text-slate-600">Stable, predictable trading environment</p> </div> </div> </div> </div> <!-- Stats Grid --> <div class="grid grid-cols-2 gap-6"> <div class="group rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-default"> <div class="text-5xl font-bold text-white mb-2">15</div> <div class="text-sm text-cyan-100">Active Trade Agreements</div> </div> <div class="group rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-default"> <div class="text-5xl font-bold text-white mb-2">49</div> <div class="text-sm text-blue-100">Countries in Network</div> </div> <div class="group rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-default"> <div class="text-5xl font-bold text-white mb-2">2025</div> <div class="text-sm text-purple-100">Target Growth Year</div> </div> <div class="group rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-default"> <div class="text-5xl font-bold text-white mb-2">100%</div> <div class="text-sm text-pink-100">Verified Quality</div> </div> </div> </div> </div> </section>`;
}, "/Users/anthony.mano/ceproc-astro-website/src/components/TrustSection.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "ValuePillars", $$ValuePillars, {})} ${renderComponent($$result2, "ExporterJourney", $$ExporterJourney, {})} ${renderComponent($$result2, "TrustSection", $$TrustSection, {})}  ${maybeRenderHead()}<section class="py-24 bg-slate-50"> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div class="text-center max-w-3xl mx-auto mb-12"> <h2 class="text-4xl font-bold text-slate-900 mb-4">
Upcoming Trade Missions & Events
</h2> <p class="text-xl text-slate-600">
Connect with global partners and unlock new market opportunities
</p> </div> <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"> <!-- Event Card 1 --> <div class="group rounded-3xl border-2 border-slate-200 overflow-hidden hover:border-transparent hover:shadow-2xl transition-all bg-white hover:-translate-y-2"> <div class="h-48 bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center relative overflow-hidden"> <div class="absolute inset-0 bg-blue-600 opacity-20 group-hover:scale-110 transition-transform"></div> <div class="relative text-center text-white z-10"> <div class="text-5xl font-bold mb-2">EU</div> <div class="text-sm font-semibold tracking-wider">TRADE MISSION</div> </div> </div> <div class="p-6"> <div class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
MARCH 2025
</div> <h3 class="text-xl font-bold text-slate-900 mb-3">Creative Industries - Europe</h3> <p class="text-slate-600 text-sm mb-4">Germany, Sweden, Netherlands. 360+ B2B meetings expected.</p> <a href="/events" class="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 group/link">
Learn More
<svg class="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </div> </div> <!-- Event Card 2 --> <div class="group rounded-3xl border-2 border-slate-200 overflow-hidden hover:border-transparent hover:shadow-2xl transition-all bg-white hover:-translate-y-2"> <div class="h-48 bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center relative overflow-hidden"> <div class="absolute inset-0 bg-green-600 opacity-20 group-hover:scale-110 transition-transform"></div> <div class="relative text-center text-white z-10"> <div class="text-5xl font-bold mb-2">MX</div> <div class="text-sm font-semibold tracking-wider">TRADE MISSION</div> </div> </div> <div class="p-6"> <div class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 mb-3">
APRIL 2025
</div> <h3 class="text-xl font-bold text-slate-900 mb-3">CUSMA Opportunities - Mexico</h3> <p class="text-slate-600 text-sm mb-4">Leverage North American trade agreements for growth.</p> <a href="/events" class="inline-flex items-center text-sm font-semibold text-green-600 hover:text-green-700 group/link">
Learn More
<svg class="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </div> </div> <!-- Event Card 3 --> <div class="group rounded-3xl border-2 border-slate-200 overflow-hidden hover:border-transparent hover:shadow-2xl transition-all bg-white hover:-translate-y-2"> <div class="h-48 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center relative overflow-hidden"> <div class="absolute inset-0 bg-purple-600 opacity-20 group-hover:scale-110 transition-transform"></div> <div class="relative text-center text-white z-10"> <div class="text-5xl font-bold mb-2">ASIA</div> <div class="text-sm font-semibold tracking-wider">MARKET BRIEF</div> </div> </div> <div class="p-6"> <div class="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 mb-3">
MAY 2025
</div> <h3 class="text-xl font-bold text-slate-900 mb-3">CPTPP Market Intelligence</h3> <p class="text-slate-600 text-sm mb-4">Expert briefing on Asia-Pacific opportunities.</p> <a href="/events" class="inline-flex items-center text-sm font-semibold text-purple-600 hover:text-purple-700 group/link">
Learn More
<svg class="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> </a> </div> </div> </div> <div class="text-center mt-12"> <a href="/events" class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-4 text-base font-semibold text-white hover:from-slate-800 hover:to-slate-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
View All Events
<svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> </div> </div> </section> ` })}`;
}, "/Users/anthony.mano/ceproc-astro-website/src/pages/index.astro", void 0);

const $$file = "/Users/anthony.mano/ceproc-astro-website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
