import { c as createComponent, m as maybeRenderHead, j as renderScript, r as renderTemplate, f as addAttribute, d as createAstro, k as defineScriptVars, i as renderComponent, l as renderSlot, n as renderHead } from './astro/server_DW7p6Anu.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */

const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`---
---
${maybeRenderHead()}<nav class="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 shadow-xl backdrop-blur-sm bg-opacity-95"> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> <div class="flex h-20 items-center justify-between"> <!-- Logo --> <div class="flex items-center"> <a href="/" class="flex items-center transition-transform hover:scale-105"> <img src="/ceproc-logo.png" alt="CEPROC - Export Promotion Council" class="h-14 w-auto object-contain"> </a> </div> <!-- Desktop Navigation --> <div class="hidden md:flex md:items-center md:space-x-1"> <a href="/solutions" class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all">
Our Solutions
</a> <a href="/insights" class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all">
Markets & Insights
</a> <a href="/events" class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all">
Events & Missions
</a> <a href="/about" class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all">
About Us
</a> <a href="/contact" class="px-4 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all">
Contact
</a> </div> <!-- CTA Button --> <div class="hidden md:block"> <a href="/solutions" class="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all">
Get Started
<svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path> </svg> </a> </div> <!-- Mobile menu button --> <button type="button" id="mobile-menu-button" class="md:hidden rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-all"> <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> <!-- Mobile menu (hidden by default) --> <div id="mobile-menu" class="hidden md:hidden pb-4"> <div class="space-y-1"> <a href="/solutions" class="block px-4 py-2 text-base text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all">
Our Solutions
</a> <a href="/insights" class="block px-4 py-2 text-base text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all">
Markets & Insights
</a> <a href="/events" class="block px-4 py-2 text-base text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all">
Events & Missions
</a> <a href="/about" class="block px-4 py-2 text-base text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all">
About Us
</a> <a href="/contact" class="block px-4 py-2 text-base text-slate-300 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-all">
Contact
</a> <a href="/solutions" class="block mt-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-center text-base font-semibold text-white shadow-lg">
Get Started
</a> </div> </div> </div> </nav> ${renderScript($$result, "/Users/anthony.mano/ceproc-astro-website/src/components/Navigation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/anthony.mano/ceproc-astro-website/src/components/Navigation.astro", void 0);

const company = {"name":"Canadian Export Promotion Council","shortName":"CEPROC.CA","tagline":"Driving Canada's Export Growth"};
const address = {"street":"1117 Fair Birch Dr","city":"Mississauga","province":"ON","postalCode":"L5J 4M9","country":"Canada","full":"1117 Fair Birch Dr, Mississauga, ON L5J 4M9, Canada"};
const phone = {"main":"+1 (647) 292-6514","mainRaw":"+16472926514"};
const email = {"general":"info@ceproc.ca","legal":"legal@ceproc.ca","accessibility":"accessibility@ceproc.ca"};
const social = {"linkedin":"https://linkedin.com/company/ceproc","twitter":"https://twitter.com/ceproc"};
const departments = {"privacy":{"name":"Digital Compliance Department","title":"Privacy Officer"},"legal":{"name":"Digital Compliance Department","title":"Legal Department"},"accessibility":{"title":"Digital Compliance Officer"}};
const officeHours = {"weekday":{"days":"Monday - Friday","hours":"9:00 AM - 6:00 PM EST"},"saturday":{"days":"Saturday","hours":"10:00 AM - 2:00 PM EST"},"sunday":{"days":"Sunday","hours":"Closed"}};
const siteConfig = {
  company,
  address,
  phone,
  email,
  social,
  departments,
  officeHours};

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const footerLinks = {
    solutions: [
      { name: "For Explorers", href: "/solutions#explorer" },
      { name: "For Operators", href: "/solutions#operator" },
      { name: "For Expediters", href: "/solutions#expediter" },
      { name: "Find Your Solution", href: "/solutions" }
    ],
    resources: [
      { name: "Markets & Insights", href: "/insights" },
      { name: "Trade Missions", href: "/events" },
      { name: "Policy & Regulations", href: "/about#policy" },
      { name: "Contact Us", href: "/contact" }
    ],
    company: [
      { name: "About CEPROC", href: "/about" },
      { name: "Our Partners", href: "/about#partners" },
      { name: "Newsroom", href: "/about#news" },
      { name: "Careers", href: "/about#careers" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Accessibility", href: "/accessibility" },
      { name: "Terms of Service", href: "/terms" }
    ]
  };
  return renderTemplate`${maybeRenderHead()}<footer class="bg-gray-900 text-gray-300"> <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"> <div class="grid gap-12 lg:grid-cols-5"> <!-- Brand Column --> <div class="lg:col-span-2 space-y-6"> <div class="flex items-center space-x-3"> <img src="/ceproc-logo.png" alt="CEPROC" class="h-12 w-auto brightness-0 invert"> </div> <p class="text-gray-400 leading-relaxed"> ${siteConfig.company.tagline}. Unified trade expertise, financing, and global market access.
</p> <!-- Contact Info --> <div class="space-y-2 text-sm"> <p class="text-gray-400"> <a${addAttribute(`mailto:${siteConfig.email.general}`, "href")} class="hover:text-cyan-400 transition-colors"> ${siteConfig.email.general} </a> </p> <p class="text-gray-400"> <a${addAttribute(`tel:${siteConfig.phone.mainRaw}`, "href")} class="hover:text-cyan-400 transition-colors"> ${siteConfig.phone.main} </a> </p> <p class="text-gray-400"> ${siteConfig.address.full} </p> </div> <div class="flex space-x-4"> <a${addAttribute(siteConfig.social.linkedin, "href")} class="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn"> <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"> <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path> </svg> </a> <a${addAttribute(siteConfig.social.twitter, "href")} class="text-gray-400 hover:text-white transition-colors" aria-label="Twitter"> <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"> <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path> </svg> </a> </div> </div> <!-- Solutions --> <div> <h3 class="text-white font-semibold mb-4">Solutions</h3> <ul class="space-y-3"> ${footerLinks.solutions.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-sm hover:text-white transition-colors"> ${link.name} </a> </li>`)} </ul> </div> <!-- Resources --> <div> <h3 class="text-white font-semibold mb-4">Resources</h3> <ul class="space-y-3"> ${footerLinks.resources.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-sm hover:text-white transition-colors"> ${link.name} </a> </li>`)} </ul> </div> <!-- Company & Legal --> <div> <h3 class="text-white font-semibold mb-4">Company</h3> <ul class="space-y-3 mb-6"> ${footerLinks.company.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-sm hover:text-white transition-colors"> ${link.name} </a> </li>`)} </ul> <h3 class="text-white font-semibold mb-4">Legal</h3> <ul class="space-y-3"> ${footerLinks.legal.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-sm hover:text-white transition-colors"> ${link.name} </a> </li>`)} </ul> </div> </div> <!-- Bottom Bar --> <div class="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center"> <p class="text-sm text-gray-400">
© 2025 ${siteConfig.company.name}. All rights reserved.
</p> <p class="text-sm text-gray-400 mt-4 sm:mt-0"> ${siteConfig.company.tagline} </p> </div> </div> </footer>`;
}, "/Users/anthony.mano/ceproc-astro-website/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "CEPROC - Canadian Export Promotion Council." } = Astro2.props;
  const GA_MEASUREMENT_ID = "G-79C21F0R4E";
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', "><title>", ' | CEPROC</title><link rel="icon" type="image/svg+xml" href="/favicon.svg">', '</head> <body class="min-h-screen bg-white text-gray-900"> ', " <main> ", " </main> ", " <script async", "><\/script> <script>(function(){", "\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', GA_MEASUREMENT_ID);\n})();<\/script></body></html><!-- Google Analytics -->"])), addAttribute(description, "content"), title, renderHead(), renderComponent($$result, "Navigation", $$Navigation, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), addAttribute(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, "src"), defineScriptVars({ GA_MEASUREMENT_ID }));
}, "/Users/anthony.mano/ceproc-astro-website/src/layouts/Layout.astro", void 0);

export { $$Layout as $, siteConfig as s };
