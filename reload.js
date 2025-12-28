// Live reload script for development (auto-injects when using live-server)
(function() {
  // Skip in production
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return;
  }

  let isReloading = false;

  // Check for file changes every 1 second in dev
  const checkForUpdates = () => {
    fetch(window.location.href, { cache: 'no-store' })
      .then(response => response.text())
      .then(html => {
        const newVersion = new Date(response.headers.get('date')).getTime();
        const currentVersion = window.__pageVersion || 0;

        if (currentVersion && newVersion > currentVersion && !isReloading) {
          isReloading = true;
          console.log('🔥 Reload detected - hot reloading...');
          window.location.reload();
        }
        window.__pageVersion = newVersion;
      })
      .catch(err => console.log('Update check failed:', err));
  };

  // Live reload check (only in dev)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setInterval(checkForUpdates, 1000);
  }
})();
