COINOLOGI React - Crypto Consulting Platform
Una piattaforma web moderna per consulenza crypto e trading, sviluppata con React per offrire servizi professionali nel mondo blockchain e Web3.
🌟 Panoramica
COINOLOGI è una piattaforma di consulenza crypto fondata da Ivan Eo (Dottore Commercialista) che dal 2014 offre supporto trasparente nel mondo delle tecnologie decentralizzate. Il progetto React include:

Crypto Academy - Percorsi formativi certificati
VIP Trading Signals - Segnali di trading esclusivi
Web3 Consulting - Consulenza per aziende
Exclusive Events - Eventi e networking

🚀 Caratteristiche Principali
✨ Design & UX

Responsive Design ottimizzato per tutti i dispositivi
Dark/Light mode con supporto preferenze utente
Animazioni fluide e micro-interazioni
Crypto Ticker in tempo reale
Performance ottimizzate con lazy loading

🛠️ Architettura

Feature-based architecture per scalabilità
CSS Modules per isolamento degli stili
Custom hooks per logica riutilizzabile
Error boundaries per gestione errori
SEO ottimizzato con React Helmet

📱 Componenti

Design system completo con componenti UI riutilizzabili
Header con navigation responsive e crypto ticker
Hero sections dinamiche per ogni pagina
Footer con link e social media
Form di contatto avanzati con validazione

🏗️ Struttura del Progetto
src/
├── components/          # Componenti condivisi
│   ├── ui/             # Design system (Button, Input, Card, Modal)
│   ├── Header.js       # Navigation e crypto ticker
│   ├── Footer.js       # Footer con link
│   ├── SEO.js          # Componente SEO
│   └── ErrorBoundary.js
├── pages/              # Pagine principali (lazy loaded)
│   ├── Home.js
│   ├── CryptoAcademy.js
│   ├── VipTradingSignals.js
│   ├── Web3Consulting.js
│   ├── ExclusiveEvents.js
│   ├── AboutUs.js
│   └── Contact.js
├── hooks/              # Custom hooks
│   ├── useCryptoTicker.js
│   └── useMobileMenu.js
├── styles/             # CSS globali e variabili
└── utils/              # Funzioni di utilità
🎨 Design System
Colori

Primary: #ff6b35 (Coinologi Orange)
Secondary: #2d3436 (Dark Gray)
Gradienti: CSS custom properties per consistency

Typography

Font: Inter (Google Fonts)
Scale: Sistema tipografico modulare
Responsive: Font-size adattivi

Componenti UI

Button con varianti (primary, secondary, cta)
Input e form controls
Card e modal system
Sistema di spacing consistente

📊 Funzionalità Avanzate
Crypto Ticker

Prezzi crypto in tempo reale via CoinGecko API
Animazioni scroll automatiche
Supporto per 15+ criptovalute
Aggiornamento ogni 30 secondi

Performance Dashboard

Grafici di performance interattivi
Animazioni basate su scroll
Metriche animate con contatori

Form di Contatto

Validazione client-side avanzata
Stati di loading e success
Supporto per file upload
Accessibilità completa

🔧 Tecnologie Utilizzate

React 18.3.1 - Framework principale
React Router 7.6.2 - Routing client-side
React Helmet Async - SEO management
CSS Modules - Styling isolato
FontAwesome 6.7.2 - Iconografia
Google Fonts - Typography (Inter)

📱 Responsive Design
Breakpoints

Mobile: < 576px
Tablet: 576px - 991px
Desktop: > 991px
Large: > 1200px

Features Mobile

Navigation hamburger menu
Touch-optimized interactions
Swipe gestures
Viewport meta ottimizzato

⚡ Performance
Ottimizzazioni

Lazy loading delle pagine
Code splitting automatico
Image optimization
CSS/JS minification
Gzip compression (Apache config)

Core Web Vitals

LCP < 2.5s
FID < 100ms
CLS < 0.1

🚀 Installazione e Sviluppo
bash# Clone del repository
git clone https://github.com/username/coinologi-react.git
cd coinologi-react

# Installazione dipendenze
npm install

# Avvio ambiente di sviluppo
npm start

# Build per produzione
npm run build

# Test
npm test
envREACT_APP_API_URL=https://api.coinologi.net
🔧 Configurazione Frontend
Environment Variables
```
REACT_APP_API_URL=https://api.coinologi.net
REACT_APP_COINGECKO_API=https://api.coingecko.com/api/v3
```
Proxy Setup
Il progetto include proxy per CoinGecko API per evitare CORS issues:
javascript// setupProxy.js
app.use('/api/coingecko', createProxyMiddleware({
  target: 'https://api.coingecko.com',
  changeOrigin: true
}));
📁 File di Configurazione
SEO & Meta

public/sitemap.xml - Sitemap per SEO
public/robots.txt - Configurazione crawler
public/.htaccess - Configurazione Apache

Build & Deploy

package.json - Dipendenze e scripts
.gitignore - File da escludere
Configurazione per hosting Apache

🛠️ Backend API

Il repository include un'API Express/MongoDB sotto `backend/` per autenticazione admin, CRUD articoli e upload immagini.

1. **Installazione**
  ```bash
  cd backend
  npm install
  ```

2. **Configura l'ambiente** copiando `.env.example` in `.env` e impostando i valori:
  ```bash
  PORT=5000
  MONGO_URI=mongodb+srv://<username>:<password>@cluster-url/dbname
  JWT_SECRET=change_me_super_secret
  JWT_EXPIRY=7d
  CLIENT_URL=http://localhost:3000
  CORS_ORIGIN=http://localhost:3000
  UPLOAD_DIR=uploads
  FILE_BASE_URL=http://localhost:5000
  ADMIN_NAME=Admin User
  ADMIN_EMAIL=admin@coinologi.net
  ADMIN_PASSWORD=change_me_super_secret
  ```
  > `UPLOAD_DIR` e `FILE_BASE_URL` determinano come vengono salvate/servite le immagini caricate dal CMS.

3. **Seed dell'utente admin** (primo avvio):
  ```bash
  npm run seed:admin
  ```

4. **Avvio API**
  ```bash
  npm run dev
  ```

L'API espone endpoint su `http://localhost:5000/api`, tra cui `POST /api/admin/posts/upload` per le immagini.

🧭 Flusso Admin & Blog

- Login admin frontend: `http://localhost:3000/admin/login`
- Dashboard articoli: `/admin/dashboard`
- Creazione/modifica: `/admin/blog/new`, `/admin/blog/edit/:id`
- Blog pubblico: `/blog` e `/blog/:slug`
- Upload immagini: dal form editor usa "Carica immagine" (limite 2 MB), i file vengono serviti da `/uploads`.

Suggerimento: avvia backend e frontend in terminal separati (`npm run dev` in `backend/`, `npm start` nella root) per lo sviluppo locale.

🎯 Best Practices
CSS

CSS Custom Properties per theming
Mobile-first approach
Utility classes per spacing
Consistent naming con BEM methodology

JavaScript

ES6+ features moderni
Functional components con hooks
Error handling robusto
TypeScript ready structure

Accessibilità

ARIA labels appropriati
Keyboard navigation
Color contrast WCAG compliant
Screen reader friendly

🔮 Roadmap Future

 TypeScript migration
 PWA implementation
 Dark mode completo
 Testing con Jest/RTL
 Storybook per componenti
 Internationalization (i18n)
