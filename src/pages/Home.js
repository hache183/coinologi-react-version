import React, { useEffect, useRef } from 'react';

const Home = () => {
  const cryptoIconsRef = useRef(null);

  useEffect(() => {
    // Animate crypto icons on mount
    const icons = cryptoIconsRef.current?.querySelectorAll('.crypto-icon');
    if (icons) {
      icons.forEach((icon, index) => {
        const delay = Math.random() * 2;
        icon.style.animationDelay = `${delay}s`;
      });
    }
  }, []);

  const services = [
    {
      id: 'crypto-academy',
      icon: 'fas fa-graduation-cap',
      title: 'Crypto Academy',
      description: 'Percorsi di formazione certificati per padroneggiare blockchain, crypto e trading, con metodi chiari e concreti adatti a ogni livello di esperienza.',
      link: 'Scopri di più',
      featured: false
    },
    {
      id: 'vip-trading-signals',
      icon: 'fas fa-chart-line',
      title: 'VIP Crypto Trading Signals',
      description: 'Accedi a segnali di trading esclusivi e analisi avanzate, entrando in una community riservata a investitori selezionati per massimizzare i tuoi risultati.',
      link: 'Accedi ora',
      featured: false,
      badge: 'VIP'
    },
    {
      id: 'web3-consulting',
      icon: 'fas fa-network-wired',
      title: 'Web3 Consulting',
      description: 'Consulenze personalizzate per aziende che desiderano integrare blockchain, tokenomics e Web3 nei propri modelli di business, con strategie chiare e operative.',
      link: 'Consulta ora',
      featured: false
    },
    {
      id: 'exclusive-events',
      icon: 'fas fa-calendar-star',
      title: 'Exclusive Events',
      description: 'Partecipa ai nostri esclusivi eventi formativi e di networking, ideali per professionisti e investitori interessati alla blockchain e al Web3.',
      link: 'Partecipa',
      featured: false
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__container">
          <div className="hero__content">
            <h1 id="hero-heading" className="hero__title">
              Il Futuro della <span className="hero__title-highlight">Crypto Consulting</span>
            </h1>
            <p className="hero__description">
              Coinologi nasce da un'idea di Ivan Eo, Dottore Commercialista e nerd affilato che dal 2014 offre supporto trasparente e sicuro a chiunque voglia avvicinarsi al mondo delle tecnologie decentralizzate.
            </p>
            <div className="hero__cta">
              <button className="btn btn--primary">Inizia Oggi</button>
              <button className="btn btn--secondary">Scopri di Più</button>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__crypto-icons" ref={cryptoIconsRef}>
              <div className="crypto-icon crypto-icon--bitcoin">
                <span>₿</span>
              </div>
              <div className="crypto-icon crypto-icon--ethereum">
                <span>Ξ</span>
              </div>
              <div className="crypto-icon crypto-icon--litecoin">
                <span>Ł</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" aria-labelledby="services-heading">
        <div className="services__container">
          <header className="services__header">
            <h2 id="services-heading" className="services__title">Cosa Facciamo</h2>
            <p className="services__subtitle">
              Offriamo soluzioni complete per navigare il mondo crypto con fiducia e competenza
            </p>
          </header>

          <div className="services__grid">
            {services.map((service) => (
              <article 
                key={service.id} 
                className={`service-card ${service.featured ? 'service-card--featured' : ''}`}
              >
                {service.badge && (
                  <div className="service-card__badge">{service.badge}</div>
                )}
                <div className="service-card__icon">
                  <i className={service.icon} aria-hidden="true"></i>
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">
                  {service.description}
                </p>
                <button className="service-card__link" aria-label={`Scopri ${service.title}`}>
                  {service.link} <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta" aria-labelledby="cta-heading">
        <div className="cta__container">
          <div className="cta__content">
            <h2 id="cta-heading" className="cta__title">Unisciti alla Nostra Community</h2>
            <p className="cta__description">
              La nostra community gratuita dove troverai supporto e trasparenza nelle informazioni fornite. Divulgazione e chiarezza, da parte nostra e da parte degli utenti che già hanno deciso di unirsi a COINOLOGI.
            </p>
            <div className="cta__features">
              <div className="cta__feature">
                <i className="fas fa-shield-alt" aria-hidden="true"></i>
                <span>Trasparenza e sicurezza</span>
              </div>
              <div className="cta__feature">
                <i className="fas fa-users" aria-hidden="true"></i>
                <span>Community attiva</span>
              </div>
              <div className="cta__feature">
                <i className="fas fa-star" aria-hidden="true"></i>
                <span>Supporto gratuito</span>
              </div>
            </div>
            <button className="btn btn--cta">Unisciti a noi</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Hero Styles */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #2d3436 0%, #636e72 100%);
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(99, 110, 114, 0.1) 100%);
          z-index: 1;
        }

        .hero__container {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
          width: 100%;
        }

        .hero__content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero__title {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.25;
          color: white;
          margin-bottom: 1.5rem;
          animation: slideInUp 0.8s ease-out;
        }

        .hero__title-highlight {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
        }

        .hero__description {
          font-size: 1.125rem;
          line-height: 1.625;
          color: #e2e8f0;
          margin-bottom: 2rem;
          animation: slideInUp 0.8s ease-out 0.2s both;
        }

        .hero__cta {
          display: flex;
          gap: 1rem;
          animation: slideInUp 0.8s ease-out 0.4s both;
        }

        .hero__visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 500px;
        }

        .hero__crypto-icons {
          position: relative;
          width: 400px;
          height: 400px;
          animation: float 6s ease-in-out infinite;
        }

        .crypto-icon {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          animation: float 6s ease-in-out infinite;
          overflow: hidden;
          color: white;
          font-size: 2rem;
          font-weight: bold;
        }

        .crypto-icon--bitcoin {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
          color: #f7931a;
        }

        .crypto-icon--ethereum {
          top: 40%;
          right: 15%;
          animation-delay: 0.7s;
          color: #627eea;
        }

        .crypto-icon--litecoin {
          bottom: 30%;
          left: 30%;
          animation-delay: 1.4s;
          color: #bfbbbb;
        }

        /* Services Styles */
        .services {
          padding: 5rem 0;
          background: white;
          position: relative;
          overflow: hidden;
        }

        .services::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(247, 250, 252, 0.8) 0%, rgba(255, 255, 255, 1) 100%);
          z-index: 1;
        }

        .services__container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .services__header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .services__title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 1rem;
          position: relative;
        }

        .services__title::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          border-radius: 2px;
        }

        .services__subtitle {
          font-size: 1.125rem;
          color: #718096;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.625;
        }

        .services__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }

        .service-card {
          position: relative;
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          border: 1px solid #e2e8f0;
          transition: transform 0.15s ease-out, border-color 0.15s ease-out;
          overflow: hidden;
          cursor: pointer;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          transform: scaleX(0);
          transition: transform 0.2s ease-out;
          transform-origin: left;
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-card:hover {
          transform: translateY(-4px);
          border-color: #ff6b35;
        }

        .service-card--featured {
          background: linear-gradient(135deg, #ff6b35 0%, #e55a2e 100%);
          color: white;
          border-color: #ff6b35;
        }

        .service-card--featured .service-card__title,
        .service-card--featured .service-card__description {
          color: white;
        }

        .service-card--featured .service-card__icon {
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .service-card__badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #636e72 0%, #2d3436 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .service-card__icon {
          width: 60px;
          height: 60px;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          transition: transform 0.15s ease-out;
        }

        .service-card:hover .service-card__icon {
          transform: scale(1.05);
        }

        .service-card__title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 1rem;
          line-height: 1.25;
        }

        .service-card__description {
          font-size: 1rem;
          color: #718096;
          line-height: 1.625;
          margin-bottom: 1.5rem;
        }

        .service-card__link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #ff6b35;
          background: none;
          border: 1px solid #ff6b35;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.1s ease-out;
          margin-top: auto;
        }

        .service-card__link:hover {
          background: #ff6b35;
          color: white;
          transform: translateX(2px);
        }

        .service-card__link i {
          transition: transform 0.1s ease-out;
        }

        .service-card__link:hover i {
          transform: translateX(2px);
        }

        /* CTA Styles */
        .cta {
          padding: 5rem 0;
          background: linear-gradient(135deg, #ff6b35 0%, #e55a2e 100%);
          position: relative;
          overflow: hidden;
        }

        .cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 212, 170, 0.3) 0%, transparent 50%);
          z-index: 1;
        }

        .cta__container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }

        .cta__content {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta__title {
          font-size: 2.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.25;
        }

        .cta__description {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.625;
          margin-bottom: 2.5rem;
        }

        .cta__features {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .cta__feature {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-size: 1rem;
          font-weight: 500;
        }

        .cta__feature i {
          font-size: 1.125rem;
          color: #636e72;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem;
          border-radius: 50%;
        }

        /* Button Styles */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1;
          border: 2px solid transparent;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.15s ease-out;
          text-decoration: none;
          white-space: nowrap;
          user-select: none;
        }

        .btn--primary {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          color: white;
          border-color: #ff6b35;
        }

        .btn--primary:hover {
          background: #e55a2e;
          border-color: #e55a2e;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .btn--secondary {
          background: transparent;
          color: #ff6b35;
          border-color: #ff6b35;
        }

        .btn--secondary:hover {
          background: #ff6b35;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .btn--cta {
          background: linear-gradient(135deg, #636e72 0%, #2d3436 100%);
          color: white;
          border-color: #636e72;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .btn--cta:hover {
          background: #2d3436;
          border-color: #2d3436;
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        /* Animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .hero {
            min-height: 90vh;
            padding-top: 80px;
          }
          
          .hero__container {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
            padding: 4rem 1.5rem;
          }
          
          .hero__title {
            font-size: 2.25rem;
          }
          
          .hero__description {
            font-size: 1rem;
          }
          
          .hero__cta {
            justify-content: center;
            flex-wrap: wrap;
          }
          
          .hero__visual {
            height: 300px;
            order: -1;
          }
          
          .hero__crypto-icons {
            width: 250px;
            height: 250px;
          }
          
          .crypto-icon {
            width: 60px;
            height: 60px;
            font-size: 1.25rem;
          }

          .services__grid {
            grid-template-columns: 1fr;
          }

          .cta__features {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 767px) {
          .hero__container {
            padding: 3rem 1.5rem;
          }
          
          .hero__title {
            font-size: 1.875rem;
          }
          
          .hero__cta {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 280px;
          }
          
          .hero__visual {
            height: 200px;
          }
          
          .hero__crypto-icons {
            width: 180px;
            height: 180px;
          }
          
          .crypto-icon {
            width: 45px;
            height: 45px;
            font-size: 1rem;
          }

          .services {
            padding: 3rem 0;
          }

          .service-card {
            padding: 1.5rem;
          }

          .cta {
            padding: 3rem 0;
          }

          .cta__title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Home;