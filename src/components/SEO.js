// src/components/SEO.js
import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage = '/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image'
}) => {
  const siteUrl = 'https://coinologi.net';
  const fullTitle = title ? `${title} | COINOLOGI` : 'COINOLOGI - Il Futuro della Crypto Consulting';
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph (Facebook) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="COINOLOGI" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="COINOLOGI" />
      <meta name="language" content="it-IT" />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "COINOLOGI",
          "url": siteUrl,
          "logo": `${siteUrl}/logo.png`,
          "description": "Il tuo partner di fiducia nel mondo crypto dal 2014. Trasparenza, competenza e risultati concreti.",
          "founder": {
            "@type": "Person",
            "name": "Ivan Eo"
          },
          "foundingDate": "2014",
          "sameAs": [
            "https://twitter.com/coinologi",
            "https://linkedin.com/company/coinologi",
            "https://t.me/coinologi_official"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;