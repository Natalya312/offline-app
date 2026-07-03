self.addEventListener("install", () => {
  console.log("Service Worker installed");
});

self.addEventListener("fetch", (event) => {
  // Basic offline support placeholder
});
