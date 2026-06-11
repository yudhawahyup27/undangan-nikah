# 💍 Wedding Invitation — Cinematic Anime Experience

**Nur Kotimah & Yudha Wahyu Pratama**

> An immersive, cinematic wedding invitation built with Nuxt 3, GSAP ScrollTrigger, and Three.js.

---

## ✨ Features

- **Three.js Star Field** — Cinematic zoom-in/out through stars on open & close
- **GSAP ScrollTrigger** — Smooth scene transitions, parallax, text reveals
- **Parallax Layers** — Foreground / midground / background depth
- **Sakura Petals** — Floating animated petals
- **Guest Personalization** — `/undangan?to=NamaTamu`
- **RSVP System** — Form with local JSON persistence
- **Digital Gift / Amplop** — Copy-to-clipboard with toast
- **Background Music** — Toggle with visual bars
- **Countdown Timer** — Live countdown to wedding day
- **Mobile-First** — Optimized for WhatsApp sharing
- **Scroll Progress Bar** — Gold top progress indicator

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Open: http://localhost:3000/undangan?to=NamaTamu
```

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### VPS / PM2
```bash
npm run build
node .output/server/index.mjs
```

---

## 🎵 Background Music

1. Place your audio file at: `public/audio/wedding-bgm.mp3`
2. Recommended: soft instrumental, ~3-5 min loop
3. Suggested search: "wedding piano instrumental royalty free"

---

## 🖼️ Gallery Photos

Replace placeholders in `GalleryScene.vue` with real photos:
```
public/images/photo-1.jpg
public/images/photo-2.jpg
...
```

---

## 📁 Project Structure

```
wedding-invitation/
├── components/
│   ├── scenes/
│   │   ├── OpeningScene.vue    # Three.js star field + hero
│   │   ├── IntroScene.vue      # Parallax sakura scene
│   │   ├── LoveStoryScene.vue  # Timeline story
│   │   ├── EventScene.vue      # Date / venue / countdown
│   │   ├── GalleryScene.vue    # Photo gallery
│   │   ├── RSVPScene.vue       # Form + messages
│   │   ├── GiftScene.vue       # Digital envelope
│   │   └── ClosingScene.vue    # Outro + quote
│   └── ui/
│       ├── LoadingScreen.vue
│       ├── MusicToggle.vue
│       └── ToastNotification.vue
├── composables/
│   ├── useGSAP.ts              # GSAP helpers
│   └── useThree.ts             # Three.js star field
├── pages/
│   ├── index.vue               # Redirect to /undangan
│   └── undangan.vue            # Main page orchestrator
├── server/
│   ├── api/
│   │   ├── guests.get.ts
│   │   ├── rsvp.post.ts
│   │   ├── messages.get.ts
│   │   └── gift-click.post.ts
│   └── data/                   # JSON data storage
│       ├── guests.json
│       ├── rsvp.json
│       └── messages.json
└── assets/css/global.css
```

---

## 🎨 Customization

### Wedding Details (`EventScene.vue`)
```ts
const weddingDate = new Date('2025-02-15T08:00:00')
```

### Bank Info (`GiftScene.vue`)
```ts
const banks = [
  { bank: 'BCA', name: 'Yudha Wahyu Pratama', number: '1234567890' },
  { bank: 'Mandiri', name: 'Nur Kotimah', number: '9876543210' },
]
```

### Love Story (`LoveStoryScene.vue`)
Edit the `stories` array with your real timeline.

### Map (`EventScene.vue`)
Replace Google Maps embed `src` with the actual venue coordinates.

---

## 📱 WhatsApp Share URL

```
https://yourdomain.com/undangan?to=Budi%20Santoso
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Nuxt 3 | Vue 3 SSR/SPA framework |
| GSAP + ScrollTrigger | Scroll animations, parallax |
| Three.js | 3D star field, cinematic camera |
| TailwindCSS | Utility-first styling |
| Nitro | Backend API server |
| JSON files | Simple data persistence |

---

*Made with ❤️ — Clean, elegant, cinematic.*
