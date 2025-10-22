import React, { useEffect, useState, useRef } from 'react';
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

  const servicesOverview = [
    { icon: 'fas fa-link', name: 'Blockchain' },
    { icon: 'fas fa-coins', name: 'DeFi' },
    { icon: 'fas fa-image', name: 'NFT' },
    { icon: 'fas fa-users', name: 'DAO' },
    { icon: 'fas fa-code', name: 'Smart Contracts' },
    { icon: 'fas fa-certificate', name: 'Tokenomics' }
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

  const servicesDashboardRef = useRef(null);
  const [servicesDashboardVisible, setServicesDashboardVisible] = useState(false);

  useEffect(() => {
    const node = servicesDashboardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries, obs) => {
      const [entry] = entries;
      if (!entry || !entry.isIntersecting) return;

      setServicesDashboardVisible(true);
      obs.disconnect();
    }, { threshold: 0.4 });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

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
            <div
              className={`services-dashboard ${servicesDashboardVisible ? 'services-dashboard--visible' : ''}`}
              ref={servicesDashboardRef}
            >
              <header className="services-dashboard__header">
                <span className="services-dashboard__title">🚀 SERVIZI ATTIVI</span>
                <span className="services-dashboard__timestamp">Aggiornamento live</span>
              </header>
              <div className="services-dashboard__list" role="list">
                {servicesOverview.map((service, index) => (
                  <div
                    key={service.name}
                    className="services-dashboard__item"
                    role="listitem"
                    style={{ '--item-index': index, '--progress-delay': `${index * 120}ms` }}
                  >
                    <div className="services-dashboard__icon">
                      <i className={service.icon} aria-hidden="true"></i>
                    </div>
                    <div className="services-dashboard__info">
                      <div className="services-dashboard__title-row">
                        <span className="services-dashboard__name">{service.name}</span>
                        <span className="services-dashboard__badge">ATTIVO</span>
                      </div>
                      <div className="services-dashboard__progress">
                        <span className="services-dashboard__progress-bar"></span>
                      </div>
                    </div>
                  </div>
                ))}
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

        /* Services Dashboard */
        .services-dashboard {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          animation: dashboardFloat 6s ease-in-out infinite;
          transform: translateY(12px);
          opacity: 0;
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .services-dashboard--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .services-dashboard__header {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .services-dashboard__title {
          font-size: 1rem;
          font-weight: 700;
          color: #2d3436;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .services-dashboard__timestamp {
          font-size: 0.875rem;
          font-weight: 500;
          color: #718096;
          letter-spacing: 0.02em;
        }

        .services-dashboard__list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .services-dashboard__item {
          display: flex;
          gap: 1rem;
          align-items: center;
          background: rgba(248, 250, 252, 0.95);
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          border: 1px solid rgba(226, 232, 240, 0.7);
          position: relative;
          overflow: hidden;
          transform: translateY(12px);
          opacity: 0;
          transition: transform 0.45s ease, opacity 0.45s ease, box-shadow 0.45s ease;
          transition-delay: calc(0.08s * var(--item-index));
        }

        .services-dashboard__item::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 107, 53, 0.04) 0%, rgba(255, 138, 92, 0.12) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .services-dashboard--visible .services-dashboard__item {
          opacity: 1;
          transform: translateY(0);
        }

        .services-dashboard__item:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 0 18px 35px -18px rgba(15, 23, 42, 0.35);
        }

        .services-dashboard__item:hover::after {
          opacity: 1;
        }

        .services-dashboard__icon {
          width: 46px;
          height: 46px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          color: #ffffff;
          font-size: 1.3rem;
          flex-shrink: 0;
          box-shadow: 0 12px 20px -12px rgba(255, 107, 53, 0.7);
        }

        .services-dashboard__info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .services-dashboard__title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .services-dashboard__name {
          font-size: 1rem;
          font-weight: 600;
          color: #2d3436;
        }

        .services-dashboard__badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ffffff;
          background: #10b981;
          border-radius: 999px;
          padding: 0.2rem 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          animation: badgePulse 2.5s ease-in-out infinite;
        }

        .services-dashboard__progress {
          position: relative;
          height: 6px;
          background: rgba(226, 232, 240, 0.8);
          border-radius: 999px;
          overflow: hidden;
        }

        .services-dashboard__progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          border-radius: inherit;
          transition: width 1s ease-out;
          transition-delay: var(--progress-delay, 0ms);
        }

        .services-dashboard--visible .services-dashboard__progress-bar {
          width: 100%;
        }

        .services-dashboard__progress-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
          border-radius: inherit;
        }

        @keyframes dashboardFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes badgePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.35);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }
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

          .services-dashboard {
            max-width: 380px;
          }

          .case-studies__grid {
            grid-template-columns: 1fr;
          }
        }

        /* Tablet piccolo (767px e meno) */
        @media (max-width: 767px) {
          .hero--web3 .hero__container {
            padding: 2.5rem 1rem;
            gap: 2rem;
          }

          .case-study__metrics {
            grid-template-columns: 1fr;
          }

          .services-dashboard {
            max-width: 100%;
            padding: 1.25rem;
          }
        }

        /* Mobile large (575px e meno) */
        @media (max-width: 575px) {
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
          .services-dashboard__item {
            flex-direction: column;
            align-items: flex-start;
          }

          .services-dashboard__title-row {
            width: 100%;
          }
        }

        /* Mobile molto piccolo (400px e meno) */
        @media (max-width: 400px) {
          .services-dashboard {
            padding: 1rem;
          }
        }

        /* Fix per orientamento landscape su mobile */
        @media screen and (max-height: 500px) and (orientation: landscape) {
          .services-dashboard {
            max-width: 320px;
          }
        }

        /* Miglioramenti hover per dispositivi touch */
        @media (hover: none) and (pointer: coarse) {
          .services-dashboard__item:hover {
            transform: translateY(-2px) scale(1.01);
          }
        }

        /* Disabilita le animazioni su dispositivi che preferiscono movimento ridotto */
        @media (prefers-reduced-motion: reduce) {
          .services-dashboard,
          .services-dashboard__badge {
            animation: none !important;
          }

          .services-dashboard__item,
          .services-dashboard__progress-bar {
            transition: none !important;
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