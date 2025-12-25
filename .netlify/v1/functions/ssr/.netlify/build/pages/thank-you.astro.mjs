import { c as createComponent, i as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DW7p6Anu.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_D9-Fp7JG.mjs';
export { renderers } from '../renderers.mjs';

const $$ThankYou = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Thank You for Subscribing" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-24"> <div class="max-w-2xl mx-auto px-4 text-center"> <div class="bg-slate-800 rounded-3xl shadow-2xl p-12 border border-slate-700"> <div class="mb-8"> <img src="/ceproc-logo.png" alt="CEPROC" class="h-20 w-auto mx-auto mb-6"> </div> <div class="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6"> <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <h1 class="text-4xl font-bold text-white mb-4">
Welcome to CEPROC!
</h1> <p class="text-xl text-slate-300 mb-8">
Thank you for subscribing to Canadian Export Leaders
</p> <div class="bg-slate-900 rounded-2xl p-6 mb-8 border border-slate-700"> <p class="text-slate-300 text-left mb-4"> <strong class="text-white">What happens next?</strong> </p> <ul class="text-left space-y-3 text-slate-300"> <li class="flex items-start"> <svg class="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span>Check your inbox for a welcome email</span> </li> <li class="flex items-start"> <svg class="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span>Get priority notifications for trade missions</span> </li> <li class="flex items-start"> <svg class="h-6 w-6 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path> </svg> <span>Receive expert market analysis and insights</span> </li> </ul> </div> <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8"> <a href="/solutions" class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
Explore Our Solutions
<svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path> </svg> </a> <a href="/" class="inline-flex items-center justify-center rounded-xl border-2 border-slate-600 bg-slate-800/50 backdrop-blur px-8 py-4 text-base font-semibold text-white hover:border-cyan-400 hover:bg-slate-700/50 transition-all">
Back to Home
</a> </div> <p class="text-sm text-slate-400">
Questions? Email us at <a href="mailto:info@ceproc.ca" class="text-cyan-400 hover:text-cyan-300 underline">info@ceproc.ca</a> </p> </div> </div> </section> ` })}`;
}, "/Users/anthony.mano/ceproc-astro-website/src/pages/thank-you.astro", void 0);

const $$file = "/Users/anthony.mano/ceproc-astro-website/src/pages/thank-you.astro";
const $$url = "/thank-you";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ThankYou,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
