# Jack's Hearth Kitchen - Restaurant Website

Professional, production-ready restaurant website built with HTML, CSS, and vanilla JavaScript.

## Features

- **Hero Section** with strong CTAs (View Menu, Reserve a Table, WhatsApp)
- **About Section** with restaurant story and statistics
- **Dynamic Menu** with categories (Starters, Mains, Drinks, Desserts)
- **Reservations Form** with client-side validation
- **Image Gallery** with auto-playing slider
- **Contact Section** with embedded Google Maps and opening hours
- **Social Media Links** (WhatsApp, Facebook, Instagram, Threads, Twitter, LinkedIn)
- **Responsive Design** for mobile, tablet, and desktop
- **Accessibility** with semantic HTML and ARIA labels
- **Smooth Animations** with scroll reveals

## Local Development

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

## Deployment on Render.com

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up or log in
3. Connect your GitHub account

### Step 3: Deploy
1. Click **New +**
2. Select **Web Service**
3. Connect your `Jack-Restaurant` GitHub repository
4. Configure settings:
   - **Name:** `jack-restaurant`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or upgrade as needed)
5. Click **Create Web Service**

Render will automatically build and deploy your site. It generates a public URL like `https://jack-restaurant.onrender.com`.

### Step 4: Update DNS (Optional)
To use a custom domain:
1. In Render dashboard, go to your service
2. Click **Settings** → **Custom Domain**
3. Add your domain and follow DNS configuration instructions

## Customization

### Update Restaurant Details
- **Business Name:** Edit `index.html` - update "Jack's Hearth Kitchen"
- **Phone:** Edit phone number `071 950 1832` throughout
- **Email:** Update to `okalc9939@gmail.com`
- **Address:** Bondo Town, Siaya County, Kenya
- **Hours:** Modify opening hours in Contact section
- **Menu Items:** Edit menu sections (Starters, Mains, Drinks, Desserts)
- **Colors:** Adjust CSS variables in `style.css` (--accent, --accent-2, etc.)

### Add Your Photos
Replace Unsplash image URLs with your own:
1. Upload images to a CDN (Cloudinary, AWS S3, etc.)
2. Replace image URLs in `index.html`
3. Keep high-quality, optimized images for fast loading

## File Structure

```
.
├── index.html          # Main HTML document
├── style.css           # Responsive styling
├── script.js           # Vanilla JavaScript interactions
├── server.js           # Express server for Render
├── package.json        # Node.js dependencies
├── render.yaml         # Render deployment config
├── .gitignore          # Git exclusions
└── README.md           # This file
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Fully responsive: mobile, tablet, desktop
- Lazy-loaded images
- Optimized CSS and JavaScript
- Smooth animations with intersection observers
- Fast loading on shared hosting

## Security & Privacy

- No external tracking scripts
- Secure form handling
- Privacy notice in footer
- Reservations transmitted securely

## Support

For issues or questions, contact: `okalc9939@gmail.com`

---

**Ready to launch?** Your website is now configured for production deployment on Render.com. Push to GitHub and deploy in minutes!

## Not seeing changes on Render?
If your live site doesn’t reflect edits:

1) Make sure code is deployed
- Commit and push to the branch Render is watching (usually `main`).
- In Render dashboard → your service → click "Manual Deploy" → "Clear build cache & deploy".

2) Hard refresh the browser
- Desktop: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac).
- Mobile: close tab, clear site data, reopen.

3) Clear/update Service Worker cache
- DevTools → Application → Service Workers → Unregister.
- DevTools → Application → Clear storage → Clear site data.
- Reload the page.

4) Asset cache-busting
- We append `?v=YYYYMMDD` to CSS/JS in `index.html`.
- Server sends short cache headers; new deploys should appear within minutes.

If issues continue, confirm your Render service points to the correct repo/branch and that auto-deploys are enabled.

## SEO Notes

The site includes SEO best practices:
- Open Graph & Twitter meta tags for rich sharing
- JSON-LD Restaurant schema with address, hours, and reservation action
- robots.txt and sitemap.xml for crawler discovery

After you know your final production domain, update the placeholder `https://your-production-domain.example/` in:
- [index.html](index.html): canonical link, `og:url`, JSON-LD `url` and `menu`
- [sitemap.xml](sitemap.xml): `<loc>` entry
- [robots.txt](robots.txt): `Sitemap:` absolute URL (optional)

Optional improvements:
- Replace `og:image` with a high-quality image hosted on your domain
- Add real social profile URLs in JSON-LD `sameAs`
- Verify property in Google Search Console and submit sitemap
