import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';

const AboutUs = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    experience: 0,
    clients: 0,
    support: '24/7'
  });

  useEffect(() => {
    const animateNumber = (target, key, duration = 2000) => {
      const startTime = Date.now();
      const endValue = target;
      
      const updateNumber = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const currentValue = Math.floor(progress * endValue);
        
        setAnimatedNumbers(prev => ({
          ...prev,
          [key]: currentValue
        }));
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        }
      };
      
      updateNumber();
    };

    // Simulate intersection observer trigger
    const timer = setTimeout(() => {
      animateNumber(10, 'experience');
      animateNumber(1000, 'clients');
    }, 500);

    return () => clearTimeout(timer);
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
      description: 'Lancio della Crypto Academy con i primi corsi di formazione strutturati. Centinaia di studenti iniziano il loro percorso crypto con noi.'
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
      name: 'Ivan Eo',
      role: 'Founder & CEO',
      credential: 'Dottore Commercialista',
      bio: 'Pioniere del settore crypto in Italia, Ivan ha iniziato il suo percorso nel 2014. Con la sua esperienza di Dottore Commercialista e la passione per l\'innovazione, guida COINOLOGI verso nuovi traguardi nel mondo blockchain.',
      stats: [
        { number: '10+', label: 'Anni Crypto' },
        { number: '500+', label: 'Consulenze' }
      ],
      isFounder: true,
      links: {
        linkedin: 'https://www.linkedin.com/in/ivan-coinologi',
        twitter: 'https://twitter.com/coinologi'
      }
    },
    {
      name: 'Marco Rossi',
      role: 'Head of Trading',
      credential: 'Analista Finanziario',
      bio: 'Ex trader istituzionale con 15 anni di esperienza nei mercati tradizionali e crypto. Marco guida la nostra divisione trading e sviluppa strategie innovative per i nostri VIP signals.',
      links: {
        linkedin: 'https://www.linkedin.com/in/marco-rossi-trading',
        twitter: 'https://twitter.com/coinologi'
      }
    },
    {
      name: 'Sara Bianchi',
      role: 'Blockchain Developer',
      credential: 'Specialista DeFi',
      bio: 'Sviluppatrice blockchain esperta in smart contracts e protocolli DeFi. Sara guida i nostri progetti di consulenza Web3 e sviluppo di soluzioni innovative.',
      links: {
        linkedin: 'https://www.linkedin.com/in/sara-bianchi-dev',
        twitter: 'https://twitter.com/coinologi',
        github: 'https://github.com/sarabi-dev'
      }
    },
    {
      name: 'Luca Verde',
      role: 'Community Manager',
      credential: 'Specialista Marketing',
      bio: 'Esperto di community building e marketing crypto. Luca gestisce la nostra community e sviluppa strategie per coinvolgere e educare i nostri membri.',
      links: {
        linkedin: 'https://www.linkedin.com/in/luca-verde-marketing',
        twitter: 'https://twitter.com/coinologi'
      }
    }
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
            <div className="about-showcase">
              <div className="showcase-circle">
                <i className="fas fa-rocket"></i>
                <span>Innovazione</span>
              </div>
              <div className="showcase-circle">
                <i className="fas fa-shield-alt"></i>
                <span>Sicurezza</span>
              </div>
              <div className="showcase-circle">
                <i className="fas fa-users"></i>
                <span>Community</span>
              </div>
              <div className="showcase-circle">
                <i className="fas fa-graduation-cap"></i>
                <span>Formazione</span>
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
        /* About Showcase */
        .about-showcase {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
          width: 100%;
          max-width: 100%;
          justify-items: center;
        }

        .showcase-circle {
          justify-self: center;
          width: 120px;
          height: 120px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--color-white);
          transition: var(--transition-base);
          animation: float 6s ease-in-out infinite;
        }

        .showcase-circle:nth-child(2) {
          animation-delay: 1.5s;
        }

        .showcase-circle:nth-child(3) {
          animation-delay: 3s;
        }

        .showcase-circle:nth-child(4) {
          animation-delay: 4.5s;
        }

        .showcase-circle:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.2);
        }

        .showcase-circle i {
          font-size: var(--font-size-2xl);
          margin-bottom: var(--space-2);
          color: var(--color-primary);
        }

        .showcase-circle span {
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          text-align: center;
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

        /* Float Animation */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        /* Responsive */
        @media (max-width: 991px) {
          .about-showcase {
            grid-template-columns: repeat(2, 1fr);
            max-width: 360px;
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
          .showcase-circle {
            width: 100px;
            height: 100px;
          }

          .about-showcase {
            gap: var(--space-4);
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
          .about-showcase {
            grid-template-columns: 1fr;
            max-width: 220px;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
};

export default AboutUs;