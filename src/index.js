import("./bootstrap.js");
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = process.env.NODE_ENV === 'production' ? '/mfe-shell' : '';
    navigator.serviceWorker.register(`${base}/service-worker.js`)
      .catch((e) => console.error('SW registration failed', e));
  });
}
