import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_C5U_NVJB.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/accessibility.astro.mjs');
const _page2 = () => import('./pages/api/events.astro.mjs');
const _page3 = () => import('./pages/api/events.json.astro.mjs');
const _page4 = () => import('./pages/contact.astro.mjs');
const _page5 = () => import('./pages/events.astro.mjs');
const _page6 = () => import('./pages/privacy.astro.mjs');
const _page7 = () => import('./pages/solutions.astro.mjs');
const _page8 = () => import('./pages/terms.astro.mjs');
const _page9 = () => import('./pages/thank-you.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/accessibility.astro", _page1],
    ["src/pages/api/events.ts", _page2],
    ["src/pages/api/events.json.ts", _page3],
    ["src/pages/contact.astro", _page4],
    ["src/pages/events.astro", _page5],
    ["src/pages/privacy.astro", _page6],
    ["src/pages/solutions.astro", _page7],
    ["src/pages/terms.astro", _page8],
    ["src/pages/thank-you.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "3cf3e06e-0f43-4e0e-8d82-9957ef6b76c8"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
