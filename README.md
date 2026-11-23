# BizzTalks website

A premium, dark, interactive single-page site for BizzTalks, a digital marketing and creative agency.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion · Three.js / React Three Fiber · Lucide icons

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev        # opens a local dev server, usually http://localhost:5173
npm run build      # production build into /dist (type-checks first)
npm run preview    # serve the production build locally
```

## Deploy

### Vercel (recommended)
1. Push this folder to a GitHub repository.
2. On vercel.com, click **Add New → Project** and import the repo.
3. Vercel detects Vite automatically: build command `npm run build`, output directory `dist`.
4. Click **Deploy**. Add your custom domain under **Settings → Domains**.

### Netlify
Build command `npm run build`, publish directory `dist`.

### Any static host (Hostinger, cPanel and similar)
Run `npm run build` and upload the **contents** of `dist/` to your `public_html` folder. Asset paths are relative, so it also works inside a sub-folder.

## Folder structure

```
bizztalks/
├── index.html              SEO title, meta description, Open Graph tags, structured data, loading screen
├── public/                 favicon, apple-touch-icon, og-image.jpg
└── src/
    ├── data/
    │   ├── site.ts         ALL text and contact details: brand, services, why-us, process, founder
    │   └── work.ts         your portfolio items (add images here)
    ├── lib/contact.ts      form validation + WhatsApp / mailto message builders
    ├── assets/             logo (webp)
    ├── components/
    │   ├── Nav.tsx          sticky glass navbar, active-section highlight, mobile menu, WhatsApp CTA
    │   ├── Hero.tsx         headline animation, CTAs, floating labels
    │   ├── HeroScene.tsx    3D scene (lazy-loaded; pauses when off-screen)
    │   ├── About.tsx        split layout, interactive logo orbit, counters
    │   ├── Services.tsx     12 expandable service cards with "Get This Service"
    │   ├── Work.tsx         filterable gallery + enlarged preview
    │   ├── Why.tsx          differentiators
    │   ├── Process.tsx      animated 4-step timeline
    │   ├── FinalCTA.tsx     WhatsApp / email call to action
    │   ├── Contact.tsx      enquiry form → WhatsApp or email, Instagram button
    │   ├── Founder.tsx      founder profile and links
    │   ├── Footer.tsx       links, services, contact, back to top
    │   ├── ui.tsx           Reveal, SplitHeading, TiltCard, Counter, CursorGlow
    │   └── icons.tsx        WhatsApp, Instagram and LinkedIn marks
    └── index.css            design tokens, glass, buttons, form fields
```

## Common edits

- **Change any text, phone, email or link:** `src/data/site.ts`.
- **Add portfolio work:** follow the instructions at the top of `src/data/work.ts`. Until you add items, each category shows a styled tile that links to Instagram, so no fake projects are shown.
- **Colours:** `tailwind.config.js` (`void`, `ink`, `ice`, `frost`, `cyan`), taken from the BIZ-TALKS badge.
- **Social preview image:** once you have a domain, change `./og-image.jpg` in `index.html` to the full URL (for example `https://yourdomain.com/og-image.jpg`). WhatsApp, Facebook and LinkedIn need an absolute URL to show the preview.

## How the contact form works

The form doesn't send anything by itself. When a visitor clicks:

- **Send on WhatsApp:** opens `https://wa.me/919748989711?text=…` with every form field already written into the message.
- **Send by Email:** opens the visitor's email app addressed to managerialtalk@gmail.com, with subject "New Project Enquiry – BizzTalks" and every field in the body.

Required fields are name, email and message. Both buttons validate first and show inline errors. The site never claims an enquiry was sent. It tells the visitor to press Send in WhatsApp or their email app.

## Performance and accessibility

- three.js (≈245 KB gzipped) is lazy-loaded in its own chunk, so text and buttons appear before it.
- The 3D scene stops rendering when scrolled out of view, uses fewer particles and a lower pixel ratio on phones, and falls back to a CSS version if WebGL isn't available.
- The tilt and cursor effects run only on desktop. Everything respects the "reduce motion" setting.
- The site has a skip link, labelled controls, focus rings, keyboard-closable menus and modals, and semantic headings.
