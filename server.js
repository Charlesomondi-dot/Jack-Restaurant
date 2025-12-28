const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname), {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : '0',
  etag: false
}));

// Cache control headers
app.use((req, res, next) => {
  // Service worker - never cache
  if (req.url.endsWith('sw.js') || req.url.endsWith('manifest.json')) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
  }
  // HTML - revalidate frequently
  else if (req.url.endsWith('.html') || req.url === '/') {
    res.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  }
  // CSS & JS - shorter cache; we use ?v= for busting
  else if (req.url.endsWith('.css') || req.url.endsWith('.js')) {
    res.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  }
  // Images - cache for a week
  else if (/\.(jpg|jpeg|png|gif|svg|webp)$/i.test(req.url)) {
    res.set('Cache-Control', 'public, max-age=604800');
  }
  next();
});

// Route for SPA - serve index.html for all unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🔥 Jack's Hearth Kitchen Running 🔥    ║
╠═══════════════════════════════════════════╣
║ http://localhost:${PORT}                   ║
║ Environment: ${process.env.NODE_ENV || 'development'}                    ║
╚═══════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received - shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
