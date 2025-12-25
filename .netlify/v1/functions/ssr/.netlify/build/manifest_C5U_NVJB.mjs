import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { o as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_DW7p6Anu.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/anthony.mano/ceproc-astro-website/","cacheDir":"file:///Users/anthony.mano/ceproc-astro-website/node_modules/.astro/","outDir":"file:///Users/anthony.mano/ceproc-astro-website/dist/","srcDir":"file:///Users/anthony.mano/ceproc-astro-website/src/","publicDir":"file:///Users/anthony.mano/ceproc-astro-website/public/","buildClientDir":"file:///Users/anthony.mano/ceproc-astro-website/dist/","buildServerDir":"file:///Users/anthony.mano/ceproc-astro-website/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@tailwind base;@tailwind components;@tailwind utilities;\n"}],"routeData":{"route":"/accessibility","isIndex":false,"type":"page","pattern":"^\\/accessibility\\/?$","segments":[[{"content":"accessibility","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/accessibility.astro","pathname":"/accessibility","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/events","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/events\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"events","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/events.ts","pathname":"/api/events","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/events.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/events\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"events.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/events.json.ts","pathname":"/api/events.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@tailwind base;@tailwind components;@tailwind utilities;\n"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".line-clamp-3[data-astro-cid-ro7pgs3h]{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}\n@tailwind base;@tailwind components;@tailwind utilities;\n"}],"routeData":{"route":"/events","isIndex":false,"type":"page","pattern":"^\\/events\\/?$","segments":[[{"content":"events","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/events.astro","pathname":"/events","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@tailwind base;@tailwind components;@tailwind utilities;\n"}],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@keyframes blob{0%{transform:translate(0) scale(1)}33%{transform:translate(30px,-50px) scale(1.1)}66%{transform:translate(-20px,20px) scale(.9)}to{transform:translate(0) scale(1)}}.animate-blob[data-astro-cid-6dt247gv]{animation:blob 7s infinite}.animation-delay-2000[data-astro-cid-6dt247gv]{animation-delay:2s}\n@tailwind base;@tailwind components;@tailwind utilities;\n"}],"routeData":{"route":"/solutions","isIndex":false,"type":"page","pattern":"^\\/solutions\\/?$","segments":[[{"content":"solutions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/solutions.astro","pathname":"/solutions","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@tailwind base;@tailwind components;@tailwind utilities;\n"}],"routeData":{"route":"/terms","isIndex":false,"type":"page","pattern":"^\\/terms\\/?$","segments":[[{"content":"terms","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/terms.astro","pathname":"/terms","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@tailwind base;@tailwind components;@tailwind utilities;\n"}],"routeData":{"route":"/thank-you","isIndex":false,"type":"page","pattern":"^\\/thank-you\\/?$","segments":[[{"content":"thank-you","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/thank-you.astro","pathname":"/thank-you","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@tailwind base;@tailwind components;@tailwind utilities;\n@keyframes blob{0%{transform:translate(0) scale(1)}33%{transform:translate(30px,-50px) scale(1.1)}66%{transform:translate(-20px,20px) scale(.9)}to{transform:translate(0) scale(1)}}.animate-blob[data-astro-cid-bbe6dxrz]{animation:blob 7s infinite}.animation-delay-2000[data-astro-cid-bbe6dxrz]{animation-delay:2s}.animation-delay-4000[data-astro-cid-bbe6dxrz]{animation-delay:4s}.animate-pulse-slow[data-astro-cid-bbe6dxrz]{animation:pulse 3s cubic-bezier(.4,0,.6,1) infinite}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/anthony.mano/ceproc-astro-website/src/pages/accessibility.astro",{"propagation":"none","containsHead":true}],["/Users/anthony.mano/ceproc-astro-website/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/anthony.mano/ceproc-astro-website/src/pages/events.astro",{"propagation":"none","containsHead":true}],["/Users/anthony.mano/ceproc-astro-website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/anthony.mano/ceproc-astro-website/src/pages/privacy.astro",{"propagation":"none","containsHead":true}],["/Users/anthony.mano/ceproc-astro-website/src/pages/solutions.astro",{"propagation":"none","containsHead":true}],["/Users/anthony.mano/ceproc-astro-website/src/pages/terms.astro",{"propagation":"none","containsHead":true}],["/Users/anthony.mano/ceproc-astro-website/src/pages/thank-you.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/accessibility@_@astro":"pages/accessibility.astro.mjs","\u0000@astro-page:src/pages/api/events@_@ts":"pages/api/events.astro.mjs","\u0000@astro-page:src/pages/api/events.json@_@ts":"pages/api/events.json.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/events@_@astro":"pages/events.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/solutions@_@astro":"pages/solutions.astro.mjs","\u0000@astro-page:src/pages/terms@_@astro":"pages/terms.astro.mjs","\u0000@astro-page:src/pages/thank-you@_@astro":"pages/thank-you.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_C5U_NVJB.mjs","/Users/anthony.mano/ceproc-astro-website/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","/Users/anthony.mano/ceproc-astro-website/src/pages/contact.astro?astro&type=script&index=0&lang.ts":"_astro/contact.astro_astro_type_script_index_0_lang.BRLRzTKp.js","/Users/anthony.mano/ceproc-astro-website/src/pages/events.astro?astro&type=script&index=0&lang.ts":"_astro/events.astro_astro_type_script_index_0_lang.Bux5tLBv.js","/Users/anthony.mano/ceproc-astro-website/src/components/Navigation.astro?astro&type=script&index=0&lang.ts":"_astro/Navigation.astro_astro_type_script_index_0_lang.BgEWZmo6.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/anthony.mano/ceproc-astro-website/src/pages/contact.astro?astro&type=script&index=0&lang.ts","const a=document.getElementById(\"phone\");a&&(a.addEventListener(\"input\",s=>{let e=s.target.value.replace(/\\D/g,\"\");e.length>11&&(e=e.slice(0,11));let i=\"\";e.length===0?i=\"\":e.length<=3?i=`(${e}`:e.length<=6?i=`(${e.slice(0,3)}) ${e.slice(3)}`:e.length<=10?i=`(${e.slice(0,3)}) ${e.slice(3,6)}-${e.slice(6)}`:e.length===11&&(i=`+${e.slice(0,1)} (${e.slice(1,4)}) ${e.slice(4,7)}-${e.slice(7)}`),s.target.value=i;const d=e.length;d>0&&d<10?(s.target.classList.add(\"border-red-300\"),s.target.classList.remove(\"border-slate-300\",\"border-green-300\")):d>=10?(s.target.classList.remove(\"border-red-300\",\"border-slate-300\"),s.target.classList.add(\"border-green-300\")):(s.target.classList.remove(\"border-red-300\",\"border-green-300\"),s.target.classList.add(\"border-slate-300\"))}),a.addEventListener(\"blur\",()=>{const s=a.value.replace(/\\D/g,\"\");s.length>0&&s.length<10?a.setCustomValidity(\"Phone number must be at least 10 digits\"):a.setCustomValidity(\"\")}));const u=document.getElementById(\"message\"),l=document.getElementById(\"char-count\");u&&l&&u.addEventListener(\"input\",()=>{const s=u.value.length;l.textContent=s.toString(),s<20?(l.classList.add(\"text-red-500\"),l.classList.remove(\"text-green-600\")):(l.classList.add(\"text-green-600\"),l.classList.remove(\"text-red-500\"))});const r=document.getElementById(\"contact-form\"),o=document.getElementById(\"submit-btn\"),c=document.getElementById(\"btn-text\"),m=document.getElementById(\"btn-arrow\"),g=document.getElementById(\"btn-spinner\"),t=document.getElementById(\"error-message\"),n=document.getElementById(\"error-text\");r&&(r.addEventListener(\"submit\",async e=>{if(e.preventDefault(),t&&t.classList.add(\"hidden\"),!r.checkValidity()){r.reportValidity(),t&&t.classList.remove(\"hidden\"),n&&(n.textContent=\"Please fill out all required fields correctly.\");return}const i=document.getElementById(\"first-name\")?.value||\"\",d=document.getElementById(\"last-name\")?.value||\"\",y=document.getElementById(\"email\")?.value||\"\",b=document.getElementById(\"message\")?.value||\"\",f=document.getElementById(\"phone\")?.value||\"\",v=document.getElementById(\"inquiry-type\")?.value||\"\";if(i.trim().length<2||d.trim().length<2){t&&t.classList.remove(\"hidden\"),n&&(n.textContent=\"First and last names must be at least 2 characters.\");return}if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$/i.test(y)){t&&t.classList.remove(\"hidden\"),n&&(n.textContent=\"Please enter a valid email address.\");return}const L=f.replace(/\\D/g,\"\");if(f&&L.length<10){t&&t.classList.remove(\"hidden\"),n&&(n.textContent=\"Phone number must be at least 10 digits.\");return}if(b.trim().length<20){t&&t.classList.remove(\"hidden\"),n&&(n.textContent=\"Message must be at least 20 characters.\");return}if(!v){t&&t.classList.remove(\"hidden\"),n&&(n.textContent=\"Please select how we can help you.\");return}o&&(o.disabled=!0,c&&(c.textContent=\"Sending...\"),m&&m.classList.add(\"hidden\"),g&&g.classList.remove(\"hidden\"));try{const h=new FormData(r);if((await fetch(r.action,{method:\"POST\",body:h,headers:{Accept:\"application/json\"}})).ok){const p=r.querySelector('input[name=\"_next\"]');window.location.href=p?.value||\"/thank-you\"}else throw new Error(\"Form submission failed\")}catch{t&&t.classList.remove(\"hidden\"),n&&(n.textContent=\"Something went wrong. Please try again or email us directly.\"),o&&(o.disabled=!1,c&&(c.textContent=\"Send Message\"),m&&m.classList.remove(\"hidden\"),g&&g.classList.add(\"hidden\"))}}),r.querySelectorAll(\"input, textarea, select\").forEach(e=>{e.addEventListener(\"blur\",()=>{e.checkValidity()?(e.classList.remove(\"border-red-300\"),e.classList.add(\"border-slate-300\")):(e.classList.add(\"border-red-300\"),e.classList.remove(\"border-slate-300\"))})}));"],["/Users/anthony.mano/ceproc-astro-website/src/components/Navigation.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"mobile-menu-button\"),t=document.getElementById(\"mobile-menu\");e&&t&&e.addEventListener(\"click\",()=>{t.classList.toggle(\"hidden\")});"]],"assets":["/ceproc-logo.png","/favicon.svg","/file.svg","/globe.svg","/next.svg","/vercel.svg","/window.svg","/_astro/events.astro_astro_type_script_index_0_lang.Bux5tLBv.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"rIc4HufIZ9j0YeKB6unpVefWGfUTiLvkbR++u1eqLEI=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
