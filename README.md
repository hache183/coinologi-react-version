# COINOLOGI React

Applicazione React single-page con build statica per il sito Coinologi. Il blog ora legge contenuti versionati nel repository, senza dipendenze da backend o database esterni.

## Panoramica
- **Stack**: React 18, React Router 7, CSS Modules, React Helmet Async.
- **Build**: `npm run build` produce bundle statici pronti per hosting CDN o file server.
- **Contenuti**: gli articoli del blog sono file JavaScript in `src/content/posts/entries` importati in fase di build.
- **Dati esterni**: il crypto ticker recupera i prezzi da CoinGecko (`https://api.coingecko.com/api/v3`).

## Struttura rilevante
```
src/
  content/
    posts/
      index.js         # loader che importa e normalizza ogni articolo statico
      entries/         # un file per articolo (slug univoco)
  pages/
    Blog.js            # lista con filtri, ricerca e paginazione
    BlogPost.js        # dettaglio articolo con SEO dinamico
  hooks/
    useCryptoTicker.js # fetch diretto a CoinGecko senza proxy locale
```

## Setup locale
```bash
npm install
npm start
```
La build di produzione è disponibile con:
```bash
npm run build
```
Non sono necessarie variabili d'ambiente.

## Aggiungere un articolo statico
1. Crea un file in `src/content/posts/entries/slug-articolo.js`.
2. Esporta un oggetto con lo schema:
   ```javascript
   export default {
     slug: 'slug-articolo',
     title: 'Titolo leggibile',
     excerpt: 'Anteprima mostrata nelle card e nei meta tag.',
     category: 'Analisi',
     tags: ['mercati', 'defi'],       // opzionale
     publishedAt: '2025-11-01',       // formato ISO YYYY-MM-DD
     featuredImage: 'https://...jpg', // opzionale, URL assoluto o asset pubblico
     seo: {
       metaTitle: 'Titolo per i motori di ricerca',
       metaDescription: 'Descrizione SEO dedicata'
     },
     content: `
       <p>Paragrafo introduttivo.</p>
       <h2>Sottotitolo</h2>
       <p>Testo principale dell'articolo.</p>
     `
   };
   ```
3. Il loader in `src/content/posts/index.js` include automaticamente tutti i file nella cartella `entries`, valida l'unicità dello slug e ordina gli articoli per `publishedAt` (dal più recente).
4. Il campo `content` può contenere HTML o Markdown già convertito; il rendering avviene tramite `DOMPurify` per mantenere sicurezza XSS.

## Funzionamento del blog statico
- Filtri, ricerca e paginazione operano lato client sull'array di articoli già importato in memoria.
- I post correlati sono scelti prioritizzando la stessa categoria e integrando, se necessario, con i più recenti.
- I meta tag SEO della pagina dettaglio derivano dalle proprietà statiche dell'articolo (`seo.metaTitle`, `seo.metaDescription`).

## Cosa è stato rimosso
- Directory `backend/` (Express + MongoDB) e qualsiasi riferimento a JWT.
- Servizi API e contesti di autenticazione (`src/services/*`, `src/contexts/AuthContext.js`).
- Componenti e pagine admin (`src/components/admin`, `src/pages/admin`).
- Proxy di sviluppo (`src/setupProxy.js`) e la dipendenza `react-quill` usata dall'editor.

## Controlli consigliati
- Eseguire `npm run build` per assicurarsi che la produzione resti funzionante.
- Verificare manualmente `/blog` e alcune rotte `/blog/:slug` per controllare copy, immagini e SEO.
- Confermare che link e immagini esterne usate nei contenuti siano raggiungibili via HTTPS.

## Attività manuali suggerite
- Rimuovere eventuali variabili d'ambiente legacy (`REACT_APP_API_URL`, `MONGO_URI`, ecc.) da `.env` locali o pipeline.
- Disattivare cluster MongoDB Atlas, bucket upload o server Express non più necessari.
- Aggiornare la pipeline CI/CD per effettuare il deploy degli asset statici generati da `npm run build`.
