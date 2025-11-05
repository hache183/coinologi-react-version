import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';

const AboutUs = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    experience: 0,
    clients: 0,
    support: '24/7'
  });
  const [statsVisible, setStatsVisible] = useState(false);
  const statsDashboardRef = useRef(null);

  useEffect(() => {
    if (!statsVisible) return;

    const animateNumber = (target, key, duration = 2000) => {
      const startTime = Date.now();
      let frameId;

      const updateNumber = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const currentValue = Math.floor(progress * target);

        setAnimatedNumbers((prev) => ({
          ...prev,
          [key]: currentValue
        }));

        if (progress < 1) {
          frameId = requestAnimationFrame(updateNumber);
        }
      };

      frameId = requestAnimationFrame(updateNumber);

      return () => cancelAnimationFrame(frameId);
    };

    const cancelExperience = animateNumber(10, 'experience');
    const cancelClients = animateNumber(1000, 'clients');

    return () => {
      cancelExperience?.();
      cancelClients?.();
    };
  }, [statsVisible]);

  useEffect(() => {
    const node = statsDashboardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries, obs) => {
      const [entry] = entries;
      if (!entry || !entry.isIntersecting) return;

      setStatsVisible(true);
      obs.disconnect();
    }, { threshold: 0.4 });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const timeline = [
    {
      year: '2014',
      title: 'I Primi Passi',
      description: 'Ivan Eo scopre Bitcoin e inizia a studiare la tecnologia blockchain. Primo contatto con il mondo delle criptovalute e comprensione del potenziale rivoluzionario.'
    },
    {
      year: '2017',
      title: 'Nasce COINOLOGI',
      description: 'Fondazione ufficiale di COINOLOGI come progetto di divulgazione e consulenza crypto. Prime consulenze per privati e aziende interessate alle criptovalute.'
    },
    {
      year: '2019',
      title: 'Espansione del Team',
      description: 'Il team si allarga con l\'arrivo di specialisti in trading, sviluppo blockchain e community management. Nascono i primi servizi strutturati.'
    },
    {
      year: '2020',
      title: 'Crypto Academy',
      description: 'Lancio della Crypto Academy con i primi corsi di formazione strutturati. Decine di studenti iniziano il loro percorso crypto con noi.'
    },
    {
      year: '2022',
      title: 'VIP Trading Signals',
      description: 'Introduzione dei servizi di trading signals premium e consulenza Web3 per aziende. Risultati eccellenti per i nostri clienti VIP.'
    },
    {
      year: '2025',
      title: 'Leader del Settore',
      description: 'COINOLOGI si afferma come punto di riferimento in Italia per formazione crypto, consulenza Web3 e servizi premium nel settore blockchain.'
    }
  ];

  const team = [
    {
      name: 'Ivan Epicoco',
      role: 'Founder & CEO',
      credential: 'Dottore Commercialista',
      bio: 'Pioniere del settore crypto in Italia, Ivan ha iniziato il suo percorso nel 2014. Autore del libro "Diritto del Metaverso" pubblicato da Giappicchelli e ricercatore presso l\'Università di Trento, guida COINOLOGI con visione e innovazione.',
      stats: [
        { number: '10+', label: 'Anni Crypto' },
        { number: '500+', label: 'Consulenze' }
      ],
      isFounder: true,
      links: {
        linkedin: 'https://www.linkedin.com/in/ivan-coinologi'
      }
    },
    {
      name: 'Marco Epicoco',
      role: 'CTO',
      credential: 'Analista Finanziario',
      bio: 'Trader con diversi anni di esperienza nel trading crypto. Marco guida la nostra divisione trading e sviluppa strategie innovative per i nostri VIP signals.',
           stats: [
        { number: '15+', label: 'Anni Crypto' },
        { number: '1000+', label: 'Analisi Tecniche' }
      ],
      links: {
        linkedin: 'https://www.linkedin.com/in/marco-epicoco'
      }
    },
  ];

  const values = [
    {
      icon: 'shield-alt',
      title: 'Trasparenza',
      description: 'Informazioni chiare e oneste, senza promesse irrealistiche'
    },
    {
      icon: 'graduation-cap',
      title: 'Formazione',
      description: 'Educazione continua per crescere insieme alla tecnologia'
    },
    {
      icon: 'users',
      title: 'Community',
      description: 'Una rete di supporto per condividere esperienze e conoscenze'
    }
  ];

  const achievements = [
    { number: '10+', label: 'Anni di Esperienza' },
    { number: '1000+', label: 'Clienti Soddisfatti' },
    { number: '24/7', label: 'Supporto Community' }
  ];

  const TimelineItem = ({ item, index }) => (
    <div className="timeline-item">
      <div className="timeline-marker">
        {item.year}
      </div>
      <div className="timeline-content">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );

  const TeamMember = ({ member }) => (
    <article className={`team-card ${member.isFounder ? 'team-card--founder' : ''}`}>
      {member.isFounder && (
        <div className="team-card__badge">Founder</div>
      )}
      
      <div className="team-card__avatar">
        {member.name.split(' ').map(n => n[0]).join('')}
      </div>
      
      <div className="team-card__info">
        <h3>{member.name}</h3>
        <p className="team-role">{member.role}</p>
        <p className="team-credential">{member.credential}</p>
        <p className="team-bio">{member.bio}</p>
        
        {member.stats && (
          <div className="team-stats">
            {member.stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="team-social">
          {member.links?.linkedin ? (
            <a
              href={member.links.linkedin}
              aria-label={`LinkedIn di ${member.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          ) : null}
          {member.links?.twitter ? (
            <a
              href={member.links.twitter}
              aria-label={`Twitter di ${member.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
          ) : null}
          {member.links?.github ? (
            <a
              href={member.links.github}
              aria-label={`GitHub di ${member.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );

  return (
    <>
      <SEO
        title="Chi Siamo"
        description="Scopri il team Coinologi, oltre dieci anni di esperienza in consulenza crypto, formazione blockchain e soluzioni Web3."
        canonical="/about-us"
      />
      {/* Hero Section */}
      <section className="hero hero--about" aria-labelledby="hero-heading">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <i className="fas fa-heart"></i>
              <span>LA NOSTRA STORIA</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-highlight">Chi Siamo</span><br />
              Pionieri del Crypto dal 2014
            </h1>
            <p className="hero__description">
              COINOLOGI nasce dalla visione di Ivan Eo, Dottore Commercialista e appassionato di tecnologie blockchain dal 2014. 
              Da oltre 10 anni offriamo supporto trasparente e competente a chiunque voglia avvicinarsi al mondo delle criptovalute.
            </p>

            <div className="hero__stats">
              {achievements.map((achievement, index) => (
                <div key={index} className="hero__stat">
                  <span className="stat-number">
                    {achievement.number === '10+' ? `${animatedNumbers.experience}+` : 
                     achievement.number === '1000+' ? `${animatedNumbers.clients}+` : 
                     achievement.number}
                  </span>
                  <span className="stat-label">{achievement.label}</span>
                </div>
              ))}
            </div>

            <div className="hero__cta">
              <button className="btn btn--primary">Il Nostro Team</button>
              <button className="btn btn--secondary">La Nostra Storia</button>
            </div>
          </div>

          <div className="hero__visual">
            <div
              className={`stats-dashboard ${statsVisible ? 'stats-dashboard--visible' : ''}`}
              ref={statsDashboardRef}
            >
              <div className="dashboard-header">
                <h3>🏆 STATS AZIENDALI</h3>
                <span className="status-badge status-badge--verified">VERIFICATO</span>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon stat-icon--primary">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <span className="stat-number">{`${animatedNumbers.experience}+`}</span>
                  <span className="stat-label">Anni di Esperienza</span>
                </div>

                <div className="stat-card">
                  <div className="stat-icon stat-icon--success">
                    <i className="fas fa-users"></i>
                  </div>
                  <span className="stat-number">{`${animatedNumbers.clients.toLocaleString('it-IT')}+`}</span>
                  <span className="stat-label">Clienti Serviti</span>
                </div>

                <div className="stat-card">
                  <div className="stat-icon stat-icon--warning">
                    <i className="fas fa-star"></i>
                  </div>
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Soddisfazione</span>
                </div>

                <div className="stat-card">
                  <div className="stat-icon stat-icon--info">
                    <i className="fas fa-headset"></i>
                  </div>
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Supporto Attivo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="services">
        <div className="services__container">
          <div className="mission-grid">
            <div className="mission-content">
              <h2 className="section-title">La Nostra Missione</h2>
              <p className="section-description">
                Democratizzare l'accesso alle tecnologie blockchain e crypto, fornendo formazione di qualità, 
                consulenza professionale e strumenti pratici per navigare con successo nel mondo decentralizzato.
              </p>
              
              <div className="values-list">
                {values.map((value, index) => (
                  <div key={index} className="value-item">
                    <div className="value-icon">
                      <i className={`fas fa-${value.icon}`}></i>
                    </div>
                    <div className="value-content">
                      <h3>{value.title}</h3>
                      <p>{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mission-stats">
              <div className="stat-circle">
                <span className="stat-number">98%</span>
                <span className="stat-label">Clienti Soddisfatti</span>
              </div>
              <div className="stat-circle">
                <span className="stat-number">500+</span>
                <span className="stat-label">Ore di Formazione</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="services" style={{ background: 'var(--color-gray-100)' }}>
        <div className="services__container">
          <header className="services__header">
            <h2 className="services__title">Il Nostro Team</h2>
            <p className="services__subtitle">
              Esperti appassionati che uniscono competenza tecnica e visione strategica
            </p>
          </header>

          <div className="team-grid">
            {team.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="timeline-section">
        <div className="container">
          <header className="services__header">
            <h2 className="services__title">Il Nostro Percorso</h2>
            <p className="services__subtitle">
              Dalla scoperta di Bitcoin nel 2014 al successo di oggi
            </p>
          </header>
          
          <div className="timeline">
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta__container">
          <div className="cta__content">
            <h2 className="cta__title">Unisciti al Nostro Viaggio</h2>
            <p className="cta__description">
              Fai parte della community COINOLOGI e inizia il tuo percorso nel mondo crypto con il supporto 
              di esperti che ci sono dal primo giorno. La rivoluzione blockchain è appena iniziata.
            </p>
            
            <div className="cta__features">
              <div className="cta__feature">
                <i className="fas fa-history"></i>
                <span>10+ anni di esperienza</span>
              </div>
              <div className="cta__feature">
                <i className="fas fa-award"></i>
                <span>Risultati provati</span>
              </div>
              <div className="cta__feature">
                <i className="fas fa-heart"></i>
                <span>Passione autentica</span>
              </div>
            </div>

            <button className="btn btn--cta">Contattaci Ora</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Stats Dashboard */
        .stats-dashboard {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 25px 50px rgba(15, 23, 42, 0.25);
          max-width: 420px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.3);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
          will-change: transform;
        }

        .stats-dashboard--visible {
          opacity: 1;
          transform: translateY(0);
          box-shadow: 0 35px 60px rgba(15, 23, 42, 0.3);
        }

        .stats-dashboard:hover {
          transform: translateY(-6px);
          box-shadow: 0 35px 60px rgba(15, 23, 42, 0.32);
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid rgba(226, 232, 240, 0.6);
        }

        .dashboard-header h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #2d3436;
          margin: 0;
          letter-spacing: 0.025em;
          line-height: 1.2;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-badge--verified {
          background: #10b981;
          color: #ffffff;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: #ffffff;
          padding: 20px 12px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
          animation-play-state: paused;
        }

        .stats-dashboard--visible .stat-card {
          animation-play-state: running;
        }

        .stat-card:nth-child(1) {
          animation-delay: 0.1s;
        }

        .stat-card:nth-child(2) {
          animation-delay: 0.2s;
        }

        .stat-card:nth-child(3) {
          animation-delay: 0.3s;
        }

        .stat-card:nth-child(4) {
          animation-delay: 0.4s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          margin-bottom: 12px;
          font-size: 1.25rem;
          color: #ffffff;
        }

        .stat-icon--primary {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
        }

        .stat-icon--success {
          background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
        }

        .stat-icon--warning {
          background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
        }

        .stat-icon--info {
          background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3436;
          margin-bottom: 4px;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #718096;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          line-height: 1.4;
        }

        /* Mission Grid */
        .mission-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--space-16);
          align-items: center;
        }

        .mission-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .section-title {
          font-size: var(--font-size-3xl);
          color: var(--color-gray-900);
          margin-bottom: 0;
        }

        .section-description {
          font-size: var(--font-size-lg);
          color: var(--color-gray-600);
          line-height: var(--line-height-relaxed);
          margin-bottom: 0;
        }

        .values-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .value-item {
          display: flex;
          gap: var(--space-4);
          align-items: flex-start;
        }

        .value-icon {
          width: 48px;
          height: 48px;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .value-icon i {
          color: var(--color-white);
          font-size: var(--font-size-lg);
        }

        .value-content h3 {
          font-size: var(--font-size-lg);
          color: var(--color-gray-900);
          margin-bottom: var(--space-2);
        }

        .value-content p {
          color: var(--color-gray-600);
          margin-bottom: 0;
        }

        .mission-stats {
          display: flex;
          flex-direction: column;
          gap: var(--space-8);
          align-items: center;
        }

        .stat-circle {
          width: 160px;
          height: 160px;
          background: var(--color-white);
          border: 4px solid var(--color-primary);
          border-radius: var(--radius-full);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-xl);
          transition: var(--transition-base);
        }

        .stat-circle:hover {
          transform: scale(1.05);
        }

        .stat-circle .stat-number {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          line-height: 1;
        }

        .stat-circle .stat-label {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          text-align: center;
          font-weight: var(--font-weight-medium);
          margin-top: var(--space-2);
        }

        /* Team Grid */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-8);
        }

        .team-card {
          background: var(--color-white);
          padding: var(--space-8);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          text-align: center;
          transition: var(--transition-base);
          position: relative;
        }

        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .team-card--founder {
          border: 3px solid var(--color-primary);
        }

        .team-card__badge {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          background: var(--gradient-primary);
          color: var(--color-white);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          text-transform: uppercase;
        }

        .team-card__avatar {
          width: 80px;
          height: 80px;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--space-6);
          font-size: var(--font-size-xl);
          color: var(--color-white);
          font-weight: var(--font-weight-bold);
        }

        .team-card__info {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .team-card__info h3 {
          font-size: var(--font-size-xl);
          color: var(--color-gray-900);
          margin-bottom: 0;
        }

        .team-role {
          font-size: var(--font-size-base);
          color: var(--color-primary);
          font-weight: var(--font-weight-medium);
          margin-bottom: 0;
        }

        .team-credential {
          font-size: var(--font-size-sm);
          color: var(--color-gray-500);
          font-style: italic;
          margin-bottom: 0;
        }

        .team-bio {
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          line-height: var(--line-height-relaxed);
          margin-bottom: 0;
        }

        .team-stats {
          display: flex;
          justify-content: center;
          gap: var(--space-6);
          margin: var(--space-4) 0;
        }

        .stat-item {
          text-align: center;
        }

        .stat-item .stat-number {
          display: block;
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
        }

        .stat-item .stat-label {
          font-size: var(--font-size-xs);
          color: var(--color-gray-500);
        }

        .team-social {
          display: flex;
          justify-content: center;
          gap: var(--space-3);
        }

        .team-social a {
          width: 40px;
          height: 40px;
          background: var(--color-gray-200);
          color: var(--color-gray-600);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-base);
        }

        .team-social a:hover {
          background: var(--color-primary);
          color: var(--color-white);
          transform: translateY(-2px);
        }

        /* Timeline */
        .timeline-section {
          padding: var(--space-20) 0;
          background: var(--color-white);
        }

        .timeline {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: var(--space-8);
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
        }

        .timeline-item {
          display: flex;
          gap: var(--space-8);
          margin-bottom: var(--space-8);
          position: relative;
        }

        .timeline-marker {
          background: var(--gradient-primary);
          color: var(--color-white);
          width: 64px;
          height: 64px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-bold);
          flex-shrink: 0;
          position: relative;
          z-index: 10;
          transition: var(--transition-base);
        }

        .timeline-item:hover .timeline-marker {
          transform: scale(1.1);
        }

        .timeline-content {
          background: var(--color-white);
          padding: var(--space-6);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          flex: 1;
          transition: var(--transition-base);
        }

        .timeline-content:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .timeline-content h3 {
          font-size: var(--font-size-lg);
          color: var(--color-gray-900);
          margin-bottom: var(--space-3);
        }

        .timeline-content p {
          color: var(--color-gray-600);
          line-height: var(--line-height-relaxed);
          margin-bottom: 0;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 991px) {
          .stats-dashboard {
            max-width: 380px;
          }

          .mission-grid {
            grid-template-columns: 1fr;
            gap: var(--space-12);
            text-align: center;
          }

          .mission-stats {
            flex-direction: row;
            justify-content: center;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .timeline::before {
            left: var(--space-4);
          }

          .timeline-item {
            gap: var(--space-4);
          }

          .timeline-marker {
            width: 48px;
            height: 48px;
            font-size: var(--font-size-xs);
          }
        }

        @media (max-width: 767px) {
          .stats-dashboard {
            padding: 16px;
          }

          .stats-grid {
            gap: 12px;
          }

          .stat-card {
            padding: 16px 8px;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
            font-size: 1rem;
            margin-bottom: 8px;
          }

          .stat-number {
            font-size: 1.25rem;
          }

          .stat-label {
            font-size: 0.625rem;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }

          .mission-stats {
            flex-direction: column;
          }

          .stat-circle {
            width: 140px;
            height: 140px;
          }

          .timeline-content {
            padding: var(--space-4);
          }

          .values-list {
            gap: var(--space-4);
          }

          .value-item {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .stats-dashboard {
            padding: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stats-dashboard {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
          }

          .stat-card {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default AboutUs;