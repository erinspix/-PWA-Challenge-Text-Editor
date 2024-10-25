const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

// Cache for the main pages – gotta keep them snappy
const mainPageCache = new CacheFirst({
  cacheName: "main-page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm up the cache for key pages
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: mainPageCache,
});

// Cache navigation requests
registerRoute(
  ({ request }) => request.mode === "navigate",
  mainPageCache
);

// Cache static assets (images, styles, etc.) 
registerRoute(
  ({ request }) => ["script", "style", "image"].includes(request.destination),
  new CacheFirst({
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
