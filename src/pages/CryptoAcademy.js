import React, { useEffect, useRef } from 'react';
import SEO from '../components/SEO';

const CryptoAcademy = () => {
  const progressBarsRef = useRef([]);
  const statNumbersRef = useRef([]);

  useEffect(() => {
    // Animate progress bars
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width;
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
          progressObserver.unobserve(bar);
        }
      });
    });

    progressBarsRef.current.forEach(bar => {
      if (bar) progressObserver.observe(bar);
    });

    // Animate numbers
    const numberObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          numberObserver.unobserve(entry.target);
        }
      });
    });

    statNumbersRef.current.forEach(number => {
      if (number) numberObserver.observe(number);
    });

    return () => {
      progressObserver.disconnect();
      numberObserver.disconnect();
    };
  }, []);

  const animateNumber = (element) => {
    const target = element.textContent;
    const isPlus = target.includes('+');
    const isPercent = target.includes('%');
    const isSlash = target.includes('/');
    
    if (isSlash) return; // Don't animate 24/7

    const number = parseInt(target.replace(/\D/g, ''));
    let current = 0;
    const increment = number / 30;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        current = number;
        clearInterval(timer);
      }
      
      let displayValue = Math.floor(current);
      if (isPlus) displayValue += '+';
      if (isPercent) displayValue += '%';
      
      element.textContent = displayValue;
    }, 50);
  };

  const courses = [
  // FREE
  {
    id: 'starter-free',
    level: 'Principiante',
    icon: 'fas fa-rocket',
    title: 'Coinologi Starter Pack',
    description: 'Mini-corsi gratuiti: basi crypto, blockchain e fiscalità.',
    features: [
      'Mini-corso “Da Zero a Crypto”',
      'Mini-guida MiCAR & tasse',
      'Accesso community Telegram'
    ],
    oldPrice: '€49',
    newPrice: 'Gratis',
    cta: 'Iscriviti Gratis'
  },

  // CRYPTO PATH
  {
    id: 'crypto-beginner',
    level: 'Principiante',
    icon: 'fas fa-seedling',
    title: 'Crypto Beginner',
    description: 'Blockchain, wallet, exchange e fiscalità spiegati facile.',
    features: [
      '3 h di video lezioni',
      'Guida wallet & sicurezza',
      'Introduzione trading',
      'Community Telegram'
    ],
    oldPrice: '€99',
    newPrice: '€69',
    cta: 'Acquista Ora'
  },
  {
    id: 'crypto-pro',
    level: 'Intermedio',
    icon: 'fas fa-leaf',
    title: 'Crypto Pro',
    description: 'Masterclass DeFi, NFT, yield farming e fiscalità avanzata.',
    features: [
      '5 h di lezioni',
      'Casi studio DeFi & NFT',
      'Mentorship 30 min',
      '3 mesi Telegram Premium'
    ],
    oldPrice: '€349',
    newPrice: '€249',
    cta: 'Acquista Ora',
    popular: true
  },
  {
    id: 'crypto-executive',
    level: 'Avanzato',
    icon: 'fas fa-crown',
    title: 'Crypto Executive',
    description: 'Token, DAO aziendali e strategia Web3 per PMI.',
    features: [
      '7 h di formazione',
      'Token & DAO per aziende',
      '2 call mentorship (60 min)',
      '12 mesi Telegram Premium'
    ],
    oldPrice: '€699',
    newPrice: '€499',
    cta: 'Acquista Ora'
  },

  // TRADING PATH
  {
    id: 'trading-essentials',
    level: 'Principiante',
    icon: 'fas fa-chart-line',
    title: 'Trading Essentials',
    description: 'Basi del trading crypto e risk management.',
    features: [
      '2 h di video-lezioni',
      'Analisi tecnica base',
      'Risk management base',
      '1 mese segnali VIP'
    ],
    oldPrice: '€149',
    newPrice: '€89',
    cta: 'Acquista Ora'
  },
  {
    id: 'trading-master',
    level: 'Intermedio',
    icon: 'fas fa-chart-area',
    title: 'Trading Master',
    description: 'Tecniche avanzate (order flow, on-chain) e coaching.',
    features: [
      '6 h di lezioni avanzate',
      'Order-flow & Volume Profile',
      'Analisi on-chain pratica',
      'Call privata 60 min',
      '3 mesi segnali VIP'
    ],
    oldPrice: '€399',
    newPrice: '€299',
    cta: 'Acquista Ora'
  },
  {
    id: 'trading-premium',
    level: 'Avanzato',
    icon: 'fas fa-gem',
    title: 'Trading Premium',
    description: 'Strategie hedge, opzioni e bot personalizzati.',
    features: [
      '10 h formazione pro',
      'Hedge futures/opzioni',
      'Bot trading ready-to-use',
      '2 call private 90 min',
      '12 mesi segnali VIP'
    ],
    oldPrice: '€1 199',
    newPrice: '€799',
    cta: 'Scopri di Più'
  },

  // COMPLIANCE TRAINING (solo formazione)
  {
    id: 'compliance-masterclass',
    level: 'Professionisti',
    icon: 'fas fa-shield-alt',
    title: 'MiCAR Compliance Masterclass',
    description:
      'Corso completo su MiCAR, AML e fiscalità crypto per consulenti e PMI.',
    features: [
      '4 h di video-lezioni',
      'Template whitepaper MiCAR',
      'Checklist AML/Fiscalità',
      'Q&A live mensile'
    ],
    oldPrice: '€349',
    newPrice: '€249',
    cta: 'Acquista Ora'
  },

  // MEMBERSHIP
  {
    id: 'membership-pro',
    level: 'Membership Annuale',
    icon: 'fas fa-users',
    title: 'Coinologi PRO Membership',
    description:
      'Tutti i corsi + segnali VIP + webinar esclusivi per 12 mesi.',
    features: [
      'Accesso completo ai corsi',
      'Segnali Telegram VIP',
      'Webinar mensili',
      'Eventi networking VIP'
    ],
    oldPrice: '€999',
    newPrice: '€499/anno',
    cta: 'Abbonati Ora'
  }
];

  const instructors = [
    {
      name: 'Ivan Eo',
      role: 'Founder & Lead Instructor',
      bio: 'Dottore Commercialista e esperto blockchain dal 2014. Oltre 8 anni di esperienza nel settore crypto.',
      stats: { years: '10+', consultations: '500+' },
      founder: true
    },
    {
      name: 'Marco Rossi',
      role: 'Trading Expert',
      bio: 'Ex trader istituzionale con 15 anni di esperienza nei mercati finanziari tradizionali e crypto.'
    },
    {
      name: 'Sara Bianchi',
      role: 'Blockchain Developer',
      bio: 'Sviluppatrice blockchain esperta in smart contracts e protocolli DeFi e sviluppo di soluzioni innovative.'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero hero--academy" aria-labelledby="hero-heading">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <i className="fas fa-graduation-cap"></i>
              <span>FORMAZIONE CERTIFICATA</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-highlight">Crypto Academy</span><br />
              La Tua Formazione Blockchain
            </h1>
            <p className="hero__description">
              Percorsi di formazione certificati per padroneggiare blockchain, crypto e trading, con metodi chiari e concreti adatti a ogni livello di esperienza. Dalla teoria alla pratica, diventa un esperto del mondo crypto.
            </p>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="stat-number" ref={el => statNumbersRef.current[0] = el}>500+</span>
                <span className="stat-label">Studenti Formati</span>
              </div>
              <div className="hero__stat">
                <span className="stat-number" ref={el => statNumbersRef.current[1] = el}>50+</span>
                <span className="stat-label">Ore di Contenuti</span>
              </div>
              <div className="hero__stat">
                <span className="stat-number" ref={el => statNumbersRef.current[2] = el}>95%</span>
                <span className="stat-label">Tasso Successo</span>
              </div>
            </div>
            <div className="hero__cta">
              <button className="btn btn--primary">Esplora i Corsi</button>
              <button className="btn btn--secondary">Demo Gratuita</button>
            </div>
          </div>
          <div className="hero__visual">
            <div className="academy-dashboard">
              <div className="dashboard-header">
                <h3>📚 ACADEMY LIVE</h3>
                <span className="status-live">ATTIVA</span>
              </div>
              <div className="course-progress">
                <div className="course-item">
                  <div className="course-name">Blockchain Foundations</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      data-width="87%"
                      ref={el => progressBarsRef.current[0] = el}
                    ></div>
                  </div>
                  <div className="course-score">87% Completato</div>
                </div>
                <div className="course-item">
                  <div className="course-name">DeFi Masterclass</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      data-width="65%"
                      ref={el => progressBarsRef.current[1] = el}
                    ></div>
                  </div>
                  <div className="course-score">65% Completato</div>
                </div>
              </div>
              <div className="academy-stats">
                <div className="mini-stat">Studenti: 500+ ✅</div>
                <div className="mini-stat">Certificati: 450+ 🏆</div>
                <div className="mini-stat">Rating: 4.9/5 ⭐</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses">
        <div className="container">
          <header className="courses__header">
            <h2 className="courses__title">I Nostri Percorsi Formativi</h2>
            <p className="courses__subtitle">
              Scegli il percorso che fa per te, dal livello principiante all'esperto trader
            </p>
          </header>

          <div className="courses__grid">
            {courses.map((course) => (
              <article 
                key={course.id} 
                className={`course-card ${course.popular ? 'course-card--popular' : ''}`}
              >
                <div className="course-card__badge">{course.level}</div>
                <div className="course-card__icon">
                  <i className={course.icon}></i>
                </div>
                <h3 className="course-card__title">{course.title}</h3>
                <p className="course-card__description">{course.description}</p>
                <ul className="course-card__features">
                  {course.features.map((feature, index) => (
                    <li key={index}>
                      <i className="fas fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
                <div className="course-card__price">
                  <span className="course-card__old-price">{course.oldPrice}</span>
                  <span className="course-card__new-price">{course.newPrice}</span>
                </div>
                <button className="course-card__cta">{course.cta}</button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="demo-section">
        <div className="container">
          <div className="demo-content">
            <div className="demo-info">
              <h2 className="demo-title">Prova Gratuita</h2>
              <p className="demo-description">
                Accedi a una lezione demo gratuita e scopri la qualità dei nostri contenuti formativi. Nessun impegno, solo valore puro.
              </p>
              <ul className="demo-features">
                <li><i className="fas fa-play-circle"></i> Video lezione di 45 minuti</li>
                <li><i className="fas fa-download"></i> Materiali scaricabili</li>
                <li><i className="fas fa-question-circle"></i> Q&A con esperti</li>
              </ul>
              <button className="btn btn--cta">Accedi alla Demo</button>
            </div>
            <div className="demo-video">
              <div className="video-placeholder">
                <i className="fas fa-play"></i>
                <span>Guarda l'Anteprima</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="instructors">
        <div className="container">
          <header className="instructors__header">
            <h2 className="instructors__title">I Nostri Esperti</h2>
            <p className="instructors__subtitle">
              Impara dai migliori professionisti del settore blockchain e crypto
            </p>
          </header>

          <div className="instructors__grid">
            {instructors.map((instructor, index) => (
              <div 
                key={index}
                className={`instructor-card ${instructor.founder ? 'instructor-card--founder' : ''}`}
              >
                {instructor.founder && <div className="instructor-card__badge">Founder</div>}
                <div className="instructor-card__avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h3 className="instructor-card__name">{instructor.name}</h3>
                <p className="instructor-card__role">{instructor.role}</p>
                <p className="instructor-card__bio">{instructor.bio}</p>
                {instructor.stats && (
                  <div className="instructor-card__stats">
                    <div className="stat">
                      <span className="stat__number">{instructor.stats.years}</span>
                      <span className="stat__label">Anni Crypto</span>
                    </div>
                    <div className="stat">
                      <span className="stat__number">{instructor.stats.consultations}</span>
                      <span className="stat__label">Consulenze</span>
                    </div>
                  </div>
                )}
                <div className="instructor-card__social">
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta__container">
          <div className="cta__content">
            <h2 className="cta__title">Inizia il Tuo Percorso Crypto Oggi</h2>
            <p className="cta__description">
              Unisciti a centinaia di studenti che hanno già trasformato la loro carriera con i nostri corsi. 
              Inizia con una lezione gratuita e scopri il tuo potenziale nel mondo blockchain.
            </p>
            <div className="cta__features">
              <div className="cta__feature">
                <i className="fas fa-certificate"></i>
                <span>Certificazioni riconosciute</span>
              </div>
              <div className="cta__feature">
                <i className="fas fa-users"></i>
                <span>Community attiva</span>
              </div>
              <div className="cta__feature">
                <i className="fas fa-headset"></i>
                <span>Supporto dedicato</span>
              </div>
            </div>
            <button className="btn btn--cta">Inizia Gratis</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero--academy {
          background: linear-gradient(135deg, #2d3436 0%, #636e72 50%, #ff6b35 100%);
          min-height: 90vh;
          position: relative;
          overflow: hidden;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .hero__stats {
          display: flex;
          gap: 2rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .hero__stat {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          backdrop-filter: blur(10px);
        }

        .stat-number {
          display: block;
          font-size: 1.875rem;
          font-weight: 700;
          color: #ff6b35;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: white;
          font-weight: 500;
        }

        .academy-dashboard {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(20px);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid #e2e8f0;
        }

        .dashboard-header h3 {
          font-size: 1.125rem;
          color: #2d3436;
          margin: 0;
        }

        .status-live {
          background: #10b981;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          animation: pulse 2s infinite;
        }

        .course-item {
          background: #f7fafc;
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 0.75rem;
        }

        .course-name {
          font-size: 1rem;
          font-weight: 600;
          color: #2d3436;
          margin-bottom: 0.5rem;
        }

        .progress-bar {
          background: #cbd5e0;
          height: 8px;
          border-radius: 9999px;
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .progress-fill {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          height: 100%;
          border-radius: 9999px;
          transition: width 1s ease-out;
          width: 0%;
        }

        .course-score {
          font-size: 0.875rem;
          color: #ff6b35;
          font-weight: 700;
        }

        .mini-stat {
          background: #f0f9ff;
          color: #0ea5e9;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-left: 3px solid #10b981;
          margin-bottom: 0.5rem;
        }

        .courses {
          padding: 5rem 0;
        }

        .courses__header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .courses__title {
          font-size: 2.25rem;
          margin-bottom: 1rem;
          color: #2d3436;
        }

        .courses__subtitle {
          font-size: 1.125rem;
          color: #718096;
        }

        .courses__grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
           gap: var(--space-8);
           align-items: stretch; /* Le card si estendono per avere la stessa altezza */
        }

        .course-card {
            background: white;
            border-radius: var(--radius-xl);
            padding: var(--space-8);
            box-shadow: var(--shadow-md);
            transition: var(--transition-base);
            position: relative;
          /* Usa flexbox per distribuire il contenuto */
         display: flex;
  flex-direction: column;
  height: 100%; /* Assicura che occupi tutta l'altezza disponibile */
        }

        .course-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .course-card--popular {
          border: 3px solid #ff6b35;
        }

        .course-card__badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .course-card__icon {
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

        .course-card:hover .course-card__icon {
          transform: scale(1.05);
        }

        .course-card__title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1a202c;
          margin-bottom: 1rem;
        }

        .course-card__description {
          font-size: 1rem;
          color: #718096;
          line-height: 1.625;
          margin-bottom: 1.5rem;
        }

        .course-card__features {
  list-style: none;
  padding: 0;
  margin-bottom: var(--space-6);
  /* Flex-grow fa sì che le features si espandano per riempire lo spazio */
  flex-grow: 1;
        }

        .course-card__features li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: #718096;
        }

        .course-card__features i {
          color: #ff6b35;
        }

        .course-card__price {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .course-card__old-price {
          text-decoration: line-through;
          color: #a0aec0;
          font-size: 1rem;
        }

        .course-card__new-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ff6b35;
        }

        .course-card__cta {
  display: block;
  width: 100%;
  background: var(--gradient-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: var(--transition-base);
  /* Il pulsante rimane sempre in fondo */
  margin-top: auto;
        }

        .course-card__cta:hover {
          background: #e55a2e;
          transform: translateY(-2px);
        }

        .demo-section {
          padding: 5rem 0;
          background: #f7fafc;
        }

        .demo-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .demo-title {
          font-size: 1.875rem;
          color: #2d3436;
          margin-bottom: 1rem;
        }

        .demo-description {
          font-size: 1.125rem;
          color: #718096;
          line-height: 1.625;
          margin-bottom: 1.5rem;
        }

        .demo-features {
          list-style: none;
          padding: 0;
          margin-bottom: 2rem;
        }

        .demo-features li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 1rem;
          color: #4a5568;
        }

        .demo-features i {
          color: #ff6b35;
          font-size: 1.125rem;
        }

        .demo-video {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .video-placeholder {
          aspect-ratio: 16/9;
          background: #e2e8f0;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #718096;
          cursor: pointer;
          transition: all 0.15s ease-out;
        }

        .video-placeholder:hover {
          background: #cbd5e0;
          transform: scale(1.02);
        }

        .video-placeholder i {
          font-size: 2.25rem;
          margin-bottom: 0.75rem;
          color: #ff6b35;
        }

        .instructors {
          padding: 5rem 0;
        }

        .instructors__header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .instructors__title {
          font-size: 2.25rem;
          margin-bottom: 1rem;
          color: #2d3436;
        }

        .instructors__subtitle {
          font-size: 1.125rem;
          color: #718096;
        }

        .instructors__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .instructor-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: all 0.15s ease-out;
          position: relative;
        }

        .instructor-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .instructor-card--founder {
          border: 3px solid #ff6b35;
        }

        .instructor-card__badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .instructor-card__avatar {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 1.5rem;
          color: white;
        }

        .instructor-card__name {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #2d3436;
        }

        .instructor-card__role {
          font-size: 1rem;
          color: #ff6b35;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .instructor-card__bio {
          font-size: 0.875rem;
          line-height: 1.625;
          color: #718096;
          margin-bottom: 1.5rem;
        }

        .instructor-card__stats {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .stat {
          text-align: center;
        }

        .stat__number {
          display: block;
          font-size: 1.125rem;
          font-weight: 700;
          color: #ff6b35;
        }

        .stat__label {
          font-size: 0.75rem;
          color: #a0aec0;
        }

        .instructor-card__social {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
        }

        .instructor-card__social a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: #e2e8f0;
          color: #718096;
          border-radius: 50%;
          transition: all 0.15s ease-out;
        }

        .instructor-card__social a:hover {
          background: #ff6b35;
          color: white;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero__stats {
            flex-direction: column;
            align-items: center;
          }

          .academy-dashboard {
            margin-top: 2rem;
          }

          .courses__grid {
            grid-template-columns: 1fr;
          }

          .demo-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .instructors__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default CryptoAcademy;