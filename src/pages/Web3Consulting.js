import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';

function useAnimatedMetric(value, options = {}) {
  const { duration = 2000 } = options;
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    let start = 0;
    let end = parseFloat(value.replace(/[^\d.]/g, ''));
    let isEuro = value.includes('€');
    let isPercent = value.includes('%');
    let isPlus = value.includes('+');
    let isK = value.includes('K');
    let isM = value.includes('M');
    if (isK) end *= 1000;
    if (isM) end *= 1000000;
    let startTime = null;
    function animate(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      let current = start + (end - start) * progress;
      let displayValue = Math.floor(current);
      if (isM && current >= 1000000) {
        displayValue = (current / 1000000).toFixed(1) + 'M';
      } else if (isK && current >= 1000) {
        displayValue = (current / 1000).toFixed(0) + 'K';
      }
      let finalText = '';
      if (isEuro) finalText += '€';
      if (isPlus) finalText += '+';
      finalText += displayValue;
      if (isPercent) finalText += '%';
      setDisplay(finalText);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    setDisplay(value);
    requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [value]);
  return display;
}

const Web3Consulting = () => {
  const stats = [
    { value: '€45M', label: 'Valore Progetti' },
    { value: '50+', label: 'Aziende Clienti' },
    { value: '300%', label: 'ROI Medio' }
  ];

  const services = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Blockchain Strategy',
      description: 'Sviluppiamo strategie personalizzate per integrare la blockchain nel tuo business model, identificando opportunità e definendo roadmap operative complete.'
    },
    {
      icon: 'fas fa-code',
      title: 'Smart Contract Development',
      description: 'Sviluppiamo e auditiamo smart contract sicuri ed efficienti per automatizzare processi business e creare nuove funzionalità decentralizzate.',
      featured: false
    },
    {
      icon: 'fas fa-university',
      title: 'DeFi Protocol Design',
      description: 'Progettiamo protocolli DeFi innovativi per lending, staking, yield farming e altre funzionalità finanziarie decentralizzate avanzate.'
    },
    {
      icon: 'fas fa-image',
      title: 'NFT & Marketplace',
      description: 'Implementiamo soluzioni NFT complete, dai contratti ai marketplace, per monetizzare asset digitali e creare nuove revenue stream innovative.'
    },
    {
      icon: 'fas fa-coins',
      title: 'Tokenomics Design',
      description: 'Progettiamo ecosistemi token sostenibili con meccaniche di incentivazione, governance e distribuzione ottimizzate per il tuo progetto specifico.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'DApp Development',
      description: 'Creiamo applicazioni decentralizzate user-friendly che connettono il tuo business all\'ecosistema blockchain con UX/UI ottimizzate per il successo.'
    }
  ];

  const caseStudies = [
    {
      category: 'E-commerce',
      title: 'Marketplace NFT per Brand Fashion',
      description: 'Sviluppato marketplace NFT completo per brand fashion internazionale, abilitando la vendita di collezioni digitali e autenticazione blockchain.',
      metrics: [
        { number: '€2.5M', label: 'Revenue Generato' },
        { number: '50K+', label: 'NFT Venduti' },
        { number: '300%', label: 'ROI 1° Anno' }
      ],
      technologies: ['Ethereum', 'IPFS', 'React', 'Web3.js']
    },
    {
      category: 'Fintech',
      title: 'DeFi Lending Protocol',
      description: 'Implementato protocollo di lending decentralizzato con pool di liquidità dinamici e sistema di governance automatizzato per fintech innovativa.',
      metrics: [
        { number: '€45M', label: 'TVL Raggiunto' },
        { number: '12%', label: 'APY Medio' },
        { number: '5K+', label: 'Utenti Attivi' }
      ],
      technologies: ['Solidity', 'Compound', 'Chainlink', 'Polygon']
    },
    {
      category: 'Gaming',
      title: 'Play-to-Earn Gaming Platform',
      description: 'Creato ecosistema gaming blockchain completo con token economy, NFT rewards e marketplace integrato per studio di sviluppo gaming.',
      metrics: [
        { number: '100K+', label: 'Giocatori Attivi' },
        { number: '€8M', label: 'Token Market Cap' },
        { number: '80%', label: 'Player Retention' }
      ],
      technologies: ['BSC', 'Unity', 'ERC-721', 'MetaMask']
    }
  ];

  // Inizializza i 3 hook all'inizio del componente
  const animatedStat0 = useAnimatedMetric(stats[0].value);
  const animatedStat1 = useAnimatedMetric(stats[1].value);
  const animatedStat2 = useAnimatedMetric(stats[2].value);

  return (
    <>
      <SEO
        title="Web3 Consulting"
        description="Consulenza Web3 di Coinologi: tokenomics, smart contract e strategie blockchain per aziende e professionisti."
        canonical="/web3-consulting"
      />
      {/* Hero Section */}
      <section className="hero hero--web3" aria-labelledby="hero-heading">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <i className="fas fa-rocket"></i>
              <span>CONSULENZA ENTERPRISE</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-highlight">Web3 Consulting</span><br />
              Trasforma il Tuo Business con la Blockchain
            </h1>
            <p className="hero__description">
              Consulenze personalizzate per aziende che desiderano integrare blockchain, tokenomics e Web3 nei propri modelli di business. 
              Strategie chiare, implementazioni operative e risultati misurabili per il futuro decentralizzato.
            </p>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="stat-number" style={{minWidth:'80px',display:'inline-block'}}>{animatedStat0}</span>
                <span className="stat-label">{stats[0].label}</span>
              </div>
              <div className="hero__stat">
                <span className="stat-number" style={{minWidth:'80px',display:'inline-block'}}>{animatedStat1}</span>
                <span className="stat-label">{stats[1].label}</span>
              </div>
              <div className="hero__stat">
                <span className="stat-number" style={{minWidth:'80px',display:'inline-block'}}>{animatedStat2}</span>
                <span className="stat-label">{stats[2].label}</span>
              </div>
            </div>
            <div className="hero__cta">
              <button className="btn btn--primary">Scopri i Servizi</button>
              <button className="btn btn--secondary">Case Studies</button>
            </div>
          </div>
          <div className="hero__visual">
            <div className="web3-ecosystem">
              <div className="ecosystem-center">
                <i className="fas fa-cube"></i>
                <span>WEB3</span>
              </div>
              <div className="node node--blockchain">
                <i className="fas fa-link"></i>
                <span>Blockchain</span>
              </div>
              <div className="node node--defi">
                <i className="fas fa-coins"></i>
                <span>DeFi</span>
              </div>
              <div className="node node--nft">
                <i className="fas fa-image"></i>
                <span>NFT</span>
              </div>
              <div className="node node--dao">
                <i className="fas fa-users"></i>
                <span>DAO</span>
              </div>
              <div className="node node--smart">
                <i className="fas fa-code"></i>
                <span>Smart Contracts</span>
              </div>
              <div className="node node--tokens">
                <i className="fas fa-certificate"></i>
                <span>Tokenomics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="services__container">
          <header className="services__header">
            <h2 className="services__title">I Nostri Servizi di Consulenza</h2>
            <p className="services__subtitle">
              Soluzioni complete per integrare la blockchain nel tuo business
            </p>
          </header>

          <div className="services__grid">
            {services.map((service, index) => (
              <article 
                key={index} 
                className={`service-card ${service.featured ? 'service-card--featured' : ''}`}
              >
                {service.featured && (
                  <div className="service-card__badge">Più Richiesto</div>
                )}
                <div className="service-card__icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <button className="service-card__link">
                  Scopri di più <i className="fas fa-arrow-right"></i>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="case-studies">
        <div className="container">
          <h2 className="case-studies__title">Case Studies di Successo</h2>
          <div className="case-studies__grid">
            {caseStudies.map((study, index) => (
              <article key={index} className="case-study">
                <div className="case-study__header">
                  <div className="case-study__category">{study.category}</div>
                  <h3>{study.title}</h3>
                </div>
                <div className="case-study__content">
                  <p className="case-study__description">{study.description}</p>
                  <div className="case-study__metrics">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="metric">
                        <span className="metric__number">{metric.number}</span>
                        <span className="metric__label">{metric.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="case-study__technologies">
                    {study.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta cta--web3">
        <div className="cta__container">
          <div className="cta__content">
            <h2 className="cta__title">Pronto a Trasformare il Tuo Business?</h2>
            <p className="cta__description">
              Non restare indietro nella rivoluzione Web3. Contattaci per una consulenza gratuita 
              e scopri come integrare la blockchain nel tuo business per ottenere vantaggi competitivi duraturi.
            </p>
            <div className="cta__features">
              <div className="cta__feature">
                <i className="fas fa-gift"></i>
                <span>Consulenza gratuita 60 min</span>
              </div>
              <div className="cta__feature">
                <i className="fas fa-rocket"></i>
                <span>Implementazione in 30 giorni</span>
              </div>
              <div className="cta__feature">
                <i className="fas fa-handshake"></i>
                <span>Supporto post-lancio</span>
              </div>
            </div>
            <button className="btn btn--cta">Richiedi Consulenza Gratuita</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero--web3 {
          background: linear-gradient(135deg, #2d3436 0%, #636e72 50%, #ff6b35 100%);
          position: relative;
          overflow: hidden;
          min-height: 90vh;
        }

        .hero--web3::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 70%, rgba(255, 107, 53, 0.3) 0%, transparent 50%);
          z-index: 1;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(45deg, #8b5cf6, #a855f7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { box-shadow: 0 0 20px rgba(139, 92, 246, 0.5); }
          to { box-shadow: 0 0 30px rgba(139, 92, 246, 0.8); }
        }

        .hero__stats {
          display: flex;
          gap: 2rem;
          margin: 2rem 0;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero__stat {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          min-width: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #8b5cf6;
          margin-bottom: 0.25rem;
          min-width: 80px;
          text-align: center;
        }

        .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        /* Web3 Ecosystem con dimensioni migliorate */
        .web3-ecosystem {
          position: relative;
          width: 100%;
          max-width: 400px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: float 6s ease-in-out infinite;
          margin: 0 auto;
        }

        .ecosystem-center {
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          position: relative;
          z-index: 10;
        }

        .ecosystem-center i {
          font-size: 1.875rem;
          margin-bottom: 0.5rem;
        }

        .ecosystem-center span {
          font-size: 0.9rem;
          font-weight: 600;
        }

        .node {
          position: absolute;
          width: 90px;
          height: 90px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          text-align: center;
          animation: float 4s ease-in-out infinite;
          transition: all 0.15s ease-out;
          cursor: pointer;
          padding: 0.5rem;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .node:hover {
          transform: scale(1.1);
          z-index: 20;
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .node i {
          font-size: 1.25rem;
          margin-bottom: 0.4rem;
        }

        .node span {
          font-weight: 600;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          display: block;
          word-wrap: break-word;
          hyphens: auto;
          line-height: 1.2;
        }

        /* Posizionamento responsive dei nodi */
        .node--blockchain {
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 0s;
        }

        .node--defi {
          top: 25%;
          right: 15%;
          animation-delay: 0.7s;
        }

        .node--nft {
          bottom: 25%;
          right: 15%;
          animation-delay: 1.4s;
        }

        .node--dao {
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 2.1s;
        }

        .node--smart {
          bottom: 25%;
          left: 15%;
          animation-delay: 2.8s;
        }

        .node--tokens {
          top: 25%;
          left: 15%;
          animation-delay: 3.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .case-studies {
          padding: 5rem 0;
          background: #f7fafc;
        }

        .case-studies__title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 4rem;
          color: #2d3436;
        }

        .case-studies__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
  align-items: stretch; /* Le card si estendono per avere la stessa altezza */
        }

        .case-study {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);
  /* Usa flexbox per distribuire il contenuto */
  display: flex;
  flex-direction: column;
  height: 100%; /* Assicura che occupi tutta l'altezza disponibile */
        }

        .case-study:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .case-study__header {
          margin-bottom: 1.5rem;
        }

        .case-study__category {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .case-study h3 {
          font-size: 1.25rem;
          color: #2d3436;
          margin-bottom: 1rem;
        }

        .case-study__description {
          color: #718096;
          line-height: 1.625;
          margin-bottom: 1.5rem;
        }

        .case-study__metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .metric {
          text-align: center;
          background: #f7fafc;
          padding: 1rem;
          border-radius: 0.5rem;
        }

        .metric__number {
          display: block;
          font-size: 1.25rem;
          font-weight: 700;
          color: #ff6b35;
          margin-bottom: 0.25rem;
        }

        .metric__label {
          font-size: 0.75rem;
          color: #718096;
          font-weight: 500;
        }

        .case-study__technologies {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .tech-tag {
          background: #e2e8f0;
          color: #4a5568;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .cta--web3 {
          background: linear-gradient(135deg, #2d3436 0%, #ff6b35 100%);
        }

        /* Hero container fix */
        .hero--web3 .hero__container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          min-height: 90vh;
          position: relative;
          z-index: 2;
        }

        .hero--web3 .hero__visual {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        /* RESPONSIVE BREAKPOINTS MIGLIORATI */

        /* Tablet portrait (991px e meno) */
        @media (max-width: 991px) {
          .hero--web3 .hero__container {
            flex-direction: column;
            justify-content: center;
            text-align: center;
            gap: 3rem;
          }

          .hero__content, 
          .hero__visual {
            width: 100%;
            align-items: center;
          }

          .hero__stats {
            flex-direction: column;
            align-items: center;
          }

          .web3-ecosystem {
            max-width: 380px;
            height: 380px;
          }
          
          .ecosystem-center {
            width: 110px;
            height: 110px;
          }
          
          .ecosystem-center i {
            font-size: 1.75rem;
          }
          
          .ecosystem-center span {
            font-size: 0.85rem;
          }
          
          .node {
            width: 85px;
            height: 85px;
            font-size: 0.75rem;
          }
          
          .node i {
            font-size: 1.125rem;
          }

          .case-studies__grid {
            grid-template-columns: 1fr;
          }
        }

        /* Tablet piccolo (767px e meno) */
        @media (max-width: 767px) {
          .hero--web3 .hero__container {
            padding: 3rem 1rem;
            gap: 2rem;
          }
          
          .hero__visual {
            overflow: visible;
            width: 100%;
            max-width: 100%;
            display: flex;
            justify-content: center;
          }

          .web3-ecosystem {
            max-width: 350px;
            height: 350px;
          }
          
          .ecosystem-center {
            width: 100px;
            height: 100px;
          }
          
          .ecosystem-center i {
            font-size: 1.5rem;
            margin-bottom: 0.3rem;
          }
          
          .ecosystem-center span {
            font-size: 0.8rem;
          }
          
          .node {
            width: 80px;
            height: 80px;
            font-size: 0.7rem;
            padding: 0.4rem;
          }
          
          .node i {
            font-size: 1rem;
            margin-bottom: 0.3rem;
          }
          
          /* Riposiziona i nodi per evitare overflow su tablet */
          .node--defi {
            right: 8%;
            top: 18%;
          }
          
          .node--nft {
            right: 8%;
            bottom: 18%;
          }
          
          .node--smart {
            left: 8%;
            bottom: 18%;
          }
          
          .node--tokens {
            left: 8%;
            top: 18%;
          }

          .case-study__metrics {
            grid-template-columns: 1fr;
          }
        }

        /* Mobile large (575px e meno) */
        @media (max-width: 575px) {
          .web3-ecosystem {
            max-width: 320px;
            height: 320px;
          }
          
          .ecosystem-center {
            width: 90px;
            height: 90px;
          }
          
          .ecosystem-center i {
            font-size: 1.375rem;
            margin-bottom: 0.25rem;
          }
          
          .ecosystem-center span {
            font-size: 0.75rem;
            line-height: 1.2;
          }
          
          .node {
            width: 75px;
            height: 75px;
            font-size: 0.65rem;
            padding: 0.3rem;
            line-height: 1.1;
          }
          
          .node i {
            font-size: 0.95rem;
            margin-bottom: 0.2rem;
          }
          
          .node span {
            line-height: 1.1;
          }

          .hero__cta {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
          .btn {
            width: 100%;
            font-size: 1rem;
            padding: 0.85rem 0;
          }
        }

        /* Mobile standard (480px e meno) */
        @media (max-width: 480px) {
          .web3-ecosystem {
            max-width: 300px;
            height: 300px;
          }
          
          .ecosystem-center {
            width: 85px;
            height: 85px;
          }
          
          .ecosystem-center i {
            font-size: 1.25rem;
            margin-bottom: 0.2rem;
          }
          
          .ecosystem-center span {
            font-size: 0.7rem;
            line-height: 1.1;
          }
          
          .node {
            width: 70px;
            height: 70px;
            font-size: 0.6rem;
            padding: 0.25rem;
          }
          
          .node i {
            font-size: 0.875rem;
            margin-bottom: 0.15rem;
          }
          
          /* Posizionamento più compatto per mobile */
          .node--blockchain {
            top: 6%;
          }
          
          .node--defi {
            right: 6%;
            top: 16%;
          }
          
          .node--nft {
            right: 6%;
            bottom: 16%;
          }
          
          .node--dao {
            bottom: 6%;
          }
          
          .node--smart {
            left: 6%;
            bottom: 16%;
          }
          
          .node--tokens {
            left: 6%;
            top: 16%;
          }
        }

        /* Mobile molto piccolo (400px e meno) */
        @media (max-width: 400px) {
          .web3-ecosystem {
            max-width: 280px;
            height: 280px;
          }
          
          .ecosystem-center {
            width: 80px;
            height: 80px;
          }
          
          .ecosystem-center i {
            font-size: 1.125rem;
          }
          
          .ecosystem-center span {
            font-size: 0.65rem;
          }
          
          .node {
            width: 65px;
            height: 65px;
            font-size: 0.55rem;
            padding: 0.2rem;
          }
          
          .node i {
            font-size: 0.8rem;
          }
        }

        /* Fix per orientamento landscape su mobile */
        @media screen and (max-height: 500px) and (orientation: landscape) {
          .web3-ecosystem {
            max-width: 250px;
            height: 250px;
          }
          
          .ecosystem-center {
            width: 70px;
            height: 70px;
          }
          
          .ecosystem-center i {
            font-size: 1rem;
          }
          
          .ecosystem-center span {
            font-size: 0.6rem;
          }
          
          .node {
            width: 60px;
            height: 60px;
            font-size: 0.5rem;
            padding: 0.15rem;
          }
          
          .node i {
            font-size: 0.7rem;
          }
        }

        /* Miglioramenti hover per dispositivi touch */
        @media (hover: none) and (pointer: coarse) {
          .node:hover {
            transform: scale(1.05);
          }
          
          .node:active {
            transform: scale(1.1);
            z-index: 20;
          }
        }

        /* Disabilita le animazioni su dispositivi che preferiscono movimento ridotto */
        @media (prefers-reduced-motion: reduce) {
          .web3-ecosystem,
          .node {
            animation: none !important;
          }
          
          .node:hover {
            transform: scale(1.05);
          }
        }

        .hero__cta {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 2rem;
        }
        .btn {
          padding: 0.85rem 2.2rem;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, color 0.2s;
          box-shadow: 0 2px 8px rgba(255,107,53,0.08);
        }
        .btn--primary {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          color: #fff;
        }
        .btn--primary:hover {
          background: linear-gradient(135deg, #ff8a5c 0%, #ff6b35 100%);
          color: #fff;
          box-shadow: 0 4px 16px rgba(255,107,53,0.18);
        }
        .btn--secondary {
          background: #fff;
          color: #ff6b35;
          border: 2px solid #ff6b35;
        }
        .btn--secondary:hover {
          background: #ffe5d0;
          color: #ff6b35;
          box-shadow: 0 4px 16px rgba(255,107,53,0.12);
        }
      `}</style>
    </>
  );
};

export default Web3Consulting;