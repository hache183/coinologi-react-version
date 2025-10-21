import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';

const ExclusiveEvents = () => {
  const [nextEventCountdown, setNextEventCountdown] = useState('');

  useEffect(() => {
    const eventDate = new Date('2025-02-15T09:00:00');
    
    const updateCountdown = () => {
      const now = new Date();
      const timeLeft = eventDate - now;
      
      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        if (days > 0) {
          setNextEventCountdown(`${days} giorni rimasti`);
        }
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const upcomingEvents = [
    {
      id: 1,
      featured: true,
      soldOut: true,
      date: { day: '15', month: 'FEB', year: '2025' },
      title: 'Blockchain Summit Milano 2025',
      description: 'Il più grande evento blockchain d\'Italia. Speaker internazionali, workshop pratici e networking esclusivo.',
      location: 'Palazzo delle Stelline, Milano',
      time: '09:00 - 18:00',
      participants: '500 partecipanti',
      speakers: 'Ivan Eo, Vitalik Buterin, Charles Hoskinson',
      originalPrice: '€299',
      currentPrice: '€199'
    },
    {
      id: 2,
      date: { day: '22', month: 'MAR', year: '2025' },
      title: 'DeFi Masterclass Workshop',
      description: 'Workshop intensivo sui protocolli DeFi, yield farming e gestione del rischio nel mondo decentralizzato.',
      location: 'COINOLOGI HQ, Milano',
      time: '14:00 - 18:00',
      participants: '25 partecipanti',
      speakers: 'Sara Bianchi, Marco Rossi',
      currentPrice: '€97'
    },
    {
      id: 3,
      date: { day: '10', month: 'APR', year: '2025' },
      title: 'NFT & Metaverse Expo',
      description: 'Esplora il futuro degli NFT, metaverso e economia digitale con demo, workshop e networking esclusivo.',
      location: 'Fiera Milano City',
      time: '10:00 - 20:00',
      participants: '800 partecipanti',
      speakers: 'Team COINOLOGI + Guest Internazionali',
      originalPrice: '€199',
      currentPrice: '€149'
    },
    {
      id: 4,
      vipOnly: true,
      date: { day: '15', month: 'MAG', year: '2025' },
      title: 'Exclusive VIP Dinner',
      description: 'Cena esclusiva per membri VIP con investor talk, networking di alto livello e annunci in anteprima.',
      location: 'Villa San Martino, Milano',
      time: '19:00 - 23:00',
      participants: '50 partecipanti',
      speakers: 'Solo per membri VIP Trading Signals',
      currentPrice: 'Incluso VIP'
    }
  ];

  const eventTypes = [
    {
      icon: 'users',
      title: 'Conferenze & Summit',
      description: 'Grandi eventi con speaker internazionali, trend analysis e visioni sul futuro della blockchain.',
      features: ['500+ partecipanti', 'Speaker di livello mondiale', 'Networking premium', 'Workshop paralleli']
    },
    {
      icon: 'laptop-code',
      title: 'Workshop Tecnici',
      description: 'Sessioni hands-on per sviluppatori, trader e professionisti che vogliono skills pratiche.',
      features: ['25-50 partecipanti', 'Formazione pratica', 'Certificazioni', 'Q&A approfondite']
    },
    {
      icon: 'handshake',
      title: 'Networking Events',
      description: 'Incontri esclusivi per costruire relazioni professionali nel settore crypto e blockchain.',
      features: ['Ambiente informale', 'Matching facilitato', 'Investor meetup', 'Partnership opportunities']
    },
    {
      icon: 'crown',
      title: 'Eventi VIP',
      description: 'Esperienze esclusive riservate ai membri VIP con accesso privilegiato e contenuti premium.',
      features: ['Solo membri VIP', 'Accesso anticipato', 'Contenuti esclusivi', 'Direct access agli esperti']
    }
  ];

  const pastEvents = [
    {
      date: 'Dicembre 2024',
      title: 'Crypto Year End Party',
      description: 'Celebrazione di fine anno con review del mercato crypto e previsioni 2025',
      stats: ['200 partecipanti', '4.9/5 rating']
    },
    {
      date: 'Novembre 2024',
      title: 'DeFi Security Workshop',
      description: 'Workshop intensivo sulla sicurezza nei protocolli DeFi e smart contract auditing',
      stats: ['40 sviluppatori', '5.0/5 rating']
    },
    {
      date: 'Ottobre 2024',
      title: 'Blockchain Business Forum',
      description: 'Forum per aziende interessate ad integrare blockchain nei loro processi',
      stats: ['150 aziende', '4.8/5 rating']
    },
    {
      date: 'Settembre 2024',
      title: 'Trading Masterclass Live',
      description: 'Sessione di trading live con analisi di mercato e strategie avanzate',
      stats: ['80 trader', '4.9/5 rating']
    }
  ];

  const testimonials = [
    {
      rating: 5,
      text: 'Il Blockchain Summit di COINOLOGI è stato l\'evento più professionale a cui abbia mai partecipato. Networking di qualità e contenuti di altissimo livello.',
      author: 'Andrea Marchetti',
      role: 'CTO, TechCorp'
    },
    {
      rating: 5,
      text: 'Grazie al workshop DeFi ho implementato strategie che hanno migliorato del 40% le performance del nostro fondo. Investimento che ripaga immediatamente.',
      author: 'Francesca Rinaldi',
      role: 'Portfolio Manager'
    },
    {
      rating: 5,
      text: 'Gli eventi VIP di COINOLOGI sono un\'esperienza unica. L\'accesso diretto agli esperti e le informazioni esclusive valgono ogni centesimo.',
      author: 'Marco Santini',
      role: 'Crypto Investor'
    }
  ];

  const EventCard = ({ event }) => (
    <article className={`event-card ${event.featured ? 'event-card--featured' : ''}`}>
      {(event.soldOut || event.vipOnly) && (
        <div className="event-card__badge">
          {event.soldOut ? 'SOLD OUT' : 'VIP ONLY'}
        </div>
      )}
      
      <div className="event-card__date">
        <span className="date-day">{event.date.day}</span>
        <span className="date-month">{event.date.month}</span>
        <span className="date-year">{event.date.year}</span>
      </div>

      <div className="event-card__content">
        <h3 className="event-card__title">{event.title}</h3>
        <p className="event-card__description">{event.description}</p>

        <div className="event-card__details">
          <div className="detail-item">
            <i className="fas fa-map-marker-alt"></i>
            <span>{event.location}</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-clock"></i>
            <span>{event.time}</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-users"></i>
            <span>{event.participants}</span>
          </div>
        </div>

        <div className="event-card__speakers">
          <span>Speaker: {event.speakers}</span>
        </div>

        <div className="event-card__pricing">
          {event.originalPrice && (
            <span className="original-price">{event.originalPrice}</span>
          )}
          <span className="current-price">{event.currentPrice}</span>
        </div>

        {event.soldOut ? (
          <button disabled className="event-card__cta event-card__cta--disabled">
            SOLD OUT
          </button>
        ) : event.vipOnly ? (
          <a href="/vip-trading-signals" className="event-card__cta">
            Diventa VIP
          </a>
        ) : (
          <button className="event-card__cta">
            {event.currentPrice.includes('149') ? 'Early Bird' : 'Prenota Posto'}
          </button>
        )}
      </div>
    </article>
  );

  return (
    <>
      <SEO
        title="Eventi Esclusivi"
        description="Partecipa agli eventi esclusivi Coinologi dedicati a blockchain, DeFi e networking professionale."
        canonical="/exclusive-events"
      />
      {/* Hero Section */}
      <section className="hero hero--events" aria-labelledby="hero-heading">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <i className="fas fa-calendar-star"></i>
              <span>EVENTI ESCLUSIVI</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-highlight">Exclusive Events</span><br />
              Dove il Futuro si Incontra
            </h1>
            <p className="hero__description">
              Partecipa ai nostri esclusivi eventi formativi e di networking, ideali per professionisti 
              e investitori interessati alla blockchain e al Web3. Connettiti con esperti del settore, 
              impara dalle migliori menti e costruisci il tuo network nel mondo crypto.
            </p>
            
            <div className="hero__next-event">
              <div className="next-event-card">
                <div className="next-event-date">
                  <span className="event-day">15</span>
                  <span className="event-month">FEB</span>
                </div>
                <div className="next-event-info">
                  <h3>Blockchain Summit Milano 2025</h3>
                  <p>Palazzo delle Stelline • 09:00-18:00</p>
                  <span className="countdown-badge">
                    {nextEventCountdown || 'Ultimi 20 posti'}
                  </span>
                </div>
              </div>
            </div>

            <div className="hero__cta">
              <button className="btn btn--primary">Vedi Eventi</button>
              <button className="btn btn--secondary">Eventi Passati</button>
            </div>
          </div>
          
          <div className="hero__visual">
            <div className="events-showcase">
              <div className="showcase-item">
                <i className="fas fa-microphone"></i>
                <span>Speaker Internazionali</span>
              </div>
              <div className="showcase-item">
                <i className="fas fa-network-wired"></i>
                <span>Networking Premium</span>
              </div>
              <div className="showcase-item">
                <i className="fas fa-certificate"></i>
                <span>Certificazioni</span>
              </div>
              <div className="showcase-item">
                <i className="fas fa-handshake"></i>
                <span>Partnership</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="services">
        <div className="services__container">
          <header className="services__header">
            <h2 className="services__title">Prossimi Eventi</h2>
            <p className="services__subtitle">
              Non perdere le opportunità di networking e formazione più esclusive del settore
            </p>
          </header>
          
          <div className="events-grid">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="services" style={{ background: 'var(--color-gray-100)' }}>
        <div className="services__container">
          <header className="services__header">
            <h2 className="services__title">Tipologie di Eventi</h2>
            <p className="services__subtitle">
              Diversi formati per soddisfare ogni esigenza di formazione e networking
            </p>
          </header>

          <div className="services__grid">
            {eventTypes.map((type, index) => (
              <article key={index} className="service-card">
                <div className="service-card__icon">
                  <i className={`fas fa-${type.icon}`}></i>
                </div>
                <h3 className="service-card__title">{type.title}</h3>
                <p className="service-card__description">{type.description}</p>
                <ul className="feature-list">
                  {type.features.map((feature, i) => (
                    <li key={i}>
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Timeline */}
      <section className="timeline-section">
        <div className="container">
          <header className="services__header">
            <h2 className="services__title">Eventi Passati</h2>
            <p className="services__subtitle">
              La cronologia dei nostri successi e dei risultati ottenuti
            </p>
          </header>
          
          <div className="timeline">
            {pastEvents.map((event, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-date">{event.date}</div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <div className="timeline-stats">
                    {event.stats.map((stat, i) => (
                      <span key={i} className="stat-badge">{stat}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="services" style={{ background: 'var(--color-gray-100)' }}>
        <div className="services__container">
          <header className="services__header">
            <h2 className="services__title">Cosa Dicono i Partecipanti</h2>
            <p className="services__subtitle">
              Le esperienze di chi ha già partecipato ai nostri eventi
            </p>
          </header>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <article key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta__container">
          <div className="cta__content">
            <h2 className="cta__title">Non Perdere il Prossimo Evento</h2>
            <p className="cta__description">
              Iscriviti alla nostra newsletter per ricevere inviti esclusivi, early bird pricing 
              e accesso anticipato agli eventi più richiesti del settore blockchain.
            </p>
            
            <div className="cta__features">
              <div className="cta__feature">
                <i className="fas fa-ticket-alt"></i>
                <span>Accesso anticipato</span>
              </div>
              <div className="cta__feature">
                <i className="fas fa-percentage"></i>
                <span>Sconti esclusivi</span>
              </div>
              <div className="cta__feature">
                <i className="fas fa-bell"></i>
                <span>Notifiche priority</span>
              </div>
            </div>

            <button className="btn btn--cta">Iscriviti agli Eventi</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Event Cards */
        .events-grid {
 display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
  align-items: stretch; /* Le card si estendono per avere la stessa altezza */
        }

        .event-card {
  background: var(--color-white);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
  transition: var(--transition-base);
  position: relative;
  overflow: hidden;
  /* Usa flexbox per distribuire il contenuto */
  display: flex;
  flex-direction: column;
  height: 100%; /* Assicura che occupi tutta l'altezza disponibile */

        }

        .event-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .event-card--featured {
          border: 3px solid var(--color-primary);
        }

        .event-card__badge {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          background: var(--gradient-primary);
          color: var(--color-white);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          text-transform: uppercase;
          z-index: 10;
        }

        .event-card__date {
          background: var(--gradient-primary);
          color: var(--color-white);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          text-align: center;
          margin-bottom: var(--space-6);
          display: inline-block;
        }

        .date-day {
          display: block;
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-bold);
          line-height: 1;
        }

        .date-month {
          display: block;
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          opacity: 0.9;
        }

        .date-year {
          display: block;
          font-size: var(--font-size-sm);
          opacity: 0.8;
        }

        .event-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  /* Flex-grow fa sì che il contenuto si espanda per riempire lo spazio */
  flex-grow: 1;
        }

        .event-card__title {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-semibold);
          color: var(--color-gray-900);
          margin-bottom: 0;
        }

        .event-card__description {
          color: var(--color-gray-600);
          line-height: var(--line-height-relaxed);
          margin-bottom: 0;
        }

        .event-card__details {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          color: var(--color-gray-600);
          font-size: var(--font-size-sm);
        }

        .detail-item i {
          color: var(--color-primary);
          width: 16px;
          flex-shrink: 0;
        }

        .event-card__speakers {
  background: var(--color-gray-100);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  font-style: italic;
  /* Flex-grow fa sì che questa sezione si espanda se necessario */
  flex-grow: 1;
        }

        .event-card__pricing {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .original-price {
          text-decoration: line-through;
          color: var(--color-gray-500);
          font-size: var(--font-size-base);
        }

        .current-price {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
        }

        .event-card__cta {
  background: var(--gradient-primary);
  color: var(--color-white);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-base);
  text-decoration: none;
  text-align: center;
  /* Il pulsante rimane sempre in fondo */
  margin-top: auto;
  align-self: stretch; /* Il pulsante si estende per tutta la larghezza */
        }

        .event-card__cta:hover {
          background: var(--color-primary-dark);
          transform: translateY(-2px);
          color: var(--color-white);
        }

        .event-card__cta--disabled {
          background: var(--color-gray-400);
          cursor: not-allowed;
        }

        .event-card__cta--disabled:hover {
          background: var(--color-gray-400);
          transform: none;
        }

        /* Hero Next Event */
        .hero__next-event {
          margin: var(--space-8) 0;
        }

        .next-event-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          display: flex;
          gap: var(--space-4);
          align-items: center;
        }

        .next-event-date {
          background: var(--gradient-primary);
          color: var(--color-white);
          border-radius: var(--radius-lg);
          padding: var(--space-3);
          text-align: center;
          min-width: 80px;
        }

        .event-day {
          display: block;
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
        }

        .event-month {
          display: block;
          font-size: var(--font-size-sm);
        }

        .next-event-info h3 {
          color: var(--color-white);
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-2);
        }

        .next-event-info p {
          color: var(--color-gray-300);
          margin-bottom: var(--space-2);
        }

        .countdown-badge {
          background: var(--color-error);
          color: var(--color-white);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-bold);
          text-transform: uppercase;
        }

        /* Events Showcase */
        .events-showcase {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
          width: 100%;
          max-width: 100%;
          justify-items: center;
        }

        .showcase-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          text-align: center;
          color: var(--color-white);
          transition: var(--transition-base);
          justify-self: center;
          min-width: 140px;
          min-height: 140px;
        }

        .showcase-item:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.2);
        }

        .showcase-item i {
          font-size: 1.75rem;
          margin-bottom: var(--space-2);
          color: var(--color-primary);
        }

        .showcase-item span {
          display: block;
          font-size: 0.85rem;
          font-weight: var(--font-weight-medium);
        }

        @media (min-width: 992px) {
          .events-showcase {
            grid-template-columns: repeat(4, 1fr);
            max-width: 600px;
          }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .events-showcase {
            grid-template-columns: repeat(2, 1fr);
            max-width: 400px;
          }
        }

        @media (max-width: 767px) {
          .events-showcase {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-4);
          }

          .showcase-item {
            min-width: 120px;
            min-height: 120px;
            padding: var(--space-4);
          }

          .showcase-item i {
            font-size: 1.5rem;
          }

          .showcase-item span {
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .events-showcase {
            grid-template-columns: 1fr;
            max-width: 200px;
            margin: 0 auto;
          }

          .showcase-item {
            width: 100%;
          }
        }

        /* Feature List */
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .feature-list li {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--font-size-sm);
          color: var(--color-gray-600);
          margin-bottom: 0;
        }

        .feature-list i {
          color: var(--color-primary);
          font-size: var(--font-size-xs);
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
          width: 16px;
          height: 16px;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          flex-shrink: 0;
          margin-top: var(--space-1);
          position: relative;
          z-index: 10;
          margin-left: calc(var(--space-2) + 1px);
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

        .timeline-date {
          background: var(--gradient-primary);
          color: var(--color-white);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-bold);
          display: inline-block;
          margin-bottom: var(--space-3);
        }

        .timeline-content h3 {
          font-size: var(--font-size-lg);
          margin-bottom: var(--space-3);
          color: var(--color-gray-900);
        }

        .timeline-content p {
          color: var(--color-gray-600);
          margin-bottom: var(--space-4);
        }

        .timeline-stats {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .stat-badge {
          background: var(--color-gray-100);
          color: var(--color-gray-600);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-lg);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
        }

        /* Testimonials */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--space-8);
        }

        .testimonial-card {
          background: var(--color-white);
          padding: var(--space-8);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          transition: var(--transition-base);
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .testimonial-stars {
          font-size: var(--font-size-lg);
          margin-bottom: var(--space-4);
        }

        .testimonial-text {
          font-size: var(--font-size-base);
          line-height: var(--line-height-relaxed);
          color: var(--color-gray-600);
          margin-bottom: var(--space-6);
          font-style: italic;
        }

        .testimonial-author strong {
          display: block;
          color: var(--color-gray-900);
          font-size: var(--font-size-base);
          margin-bottom: var(--space-1);
        }

        .testimonial-author span {
          color: var(--color-gray-500);
          font-size: var(--font-size-sm);
        }

        /* Responsive */
        @media (max-width: 991px) {
          .next-event-card {
            flex-direction: column;
            text-align: center;
          }

          .events-grid {
            grid-template-columns: 1fr;
          }

          .timeline::before {
            left: var(--space-4);
          }

          .timeline-item {
            gap: var(--space-4);
          }
        }

        @media (max-width: 767px) {
          .event-card {
            padding: var(--space-6);
          }

          .event-card__details {
            gap: var(--space-3);
          }

          .timeline-content {
            padding: var(--space-4);
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
};

export default ExclusiveEvents;