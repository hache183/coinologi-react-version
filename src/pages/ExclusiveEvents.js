import React, { useState, useEffect } from 'react';

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
    <article className={`event-card ${event.featured ? 'event-card--featured' : ''} bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative`}>
      {(event.soldOut || event.vipOnly) && (
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase z-10">
          {event.soldOut ? 'SOLD OUT' : 'VIP ONLY'}
        </div>
      )}
      
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4 text-center mb-6 inline-block">
        <span className="block text-3xl font-bold leading-none">{event.date.day}</span>
        <span className="block text-base font-medium opacity-90">{event.date.month}</span>
        <span className="block text-sm opacity-80">{event.date.year}</span>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">{event.title}</h3>
      
      <p className="text-gray-600 leading-relaxed mb-6">{event.description}</p>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <i className="fas fa-map-marker-alt text-orange-500 w-4"></i>
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <i className="fas fa-clock text-orange-500 w-4"></i>
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <i className="fas fa-users text-orange-500 w-4"></i>
          <span>{event.participants}</span>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded-lg mb-4 text-sm text-gray-700 italic">
        <span>Speaker: {event.speakers}</span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        {event.originalPrice && (
          <span className="line-through text-gray-500">{event.originalPrice}</span>
        )}
        <span className="text-xl font-bold text-orange-500">{event.currentPrice}</span>
      </div>

      {event.soldOut ? (
        <button disabled className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-bold cursor-not-allowed">
          SOLD OUT
        </button>
      ) : event.vipOnly ? (
        <a href="/vip-trading-signals" className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg text-center font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:-translate-y-0.5">
          Diventa VIP
        </a>
      ) : (
        <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:-translate-y-0.5">
          {event.currentPrice.includes('149') ? 'Early Bird' : 'Prenota Posto'}
        </button>
      )}
    </article>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-800 via-gray-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-transparent to-gray-600/20"></div>
        
        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Exclusive Events
                </span>
                <br />
                Dove il Futuro si Incontra
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Partecipa ai nostri esclusivi eventi formativi e di networking, ideali per professionisti 
                e investitori interessati alla blockchain e al Web3. Connettiti con esperti del settore, 
                impara dalle migliori menti e costruisci il tuo network nel mondo crypto.
              </p>

              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="bg-orange-500 text-white rounded-lg p-3 text-center min-w-16">
                    <span className="block text-lg font-bold">15</span>
                    <span className="block text-sm">FEB</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-white font-bold text-lg">Blockchain Summit Milano 2025</h3>
                    <p className="text-gray-300">Palazzo delle Stelline • 09:00-18:00</p>
                    <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mt-2">
                      {nextEventCountdown || 'Ultimi 20 posti'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#events" className="btn-primary">
                  Vedi Eventi
                </a>
                <a href="#past-events" className="btn-secondary">
                  Eventi Passati
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl animate-float">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4">
                    <div className="text-orange-500 text-2xl mb-2">🎤</div>
                    <div className="flex gap-2 mb-4">
                      {[...Array(6)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-5 h-5 bg-white/60 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 text-4xl animate-bounce">🎯</div>
                  <div className="absolute top-12 left-4 text-3xl animate-pulse">💡</div>
                  <div className="absolute bottom-12 right-6 text-3xl" style={{ animation: 'float 4s ease-in-out infinite 2s' }}>🚀</div>
                  <div className="absolute bottom-4 left-6 text-3xl" style={{ animation: 'float 4s ease-in-out infinite 3s' }}>🤝</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Prossimi Eventi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Tipologie di Eventi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((type, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`fas fa-${type.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section id="past-events" className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Eventi Passati</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              
              {pastEvents.map((event, index) => (
                <div key={index} className="flex gap-8 mb-8 items-start">
                  <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap relative z-10">
                    {event.date}
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-md flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex gap-4">
                      {event.stats.map((stat, i) => (
                        <span key={i} className="bg-gray-100 px-3 py-1 rounded-lg text-xs text-gray-600 font-medium">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Galleria Foto</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {['Blockchain Summit 2024', 'DeFi Workshop', 'VIP Dinner', 'Networking Event'].map((title, index) => (
                  <div key={index} className="aspect-[4/3] bg-gray-300 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <i className="fas fa-image text-4xl text-gray-500 mb-2"></i>
                    <span className="text-sm text-gray-600 text-center px-2">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Cosa Dicono i Partecipanti</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-lg mb-4">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <strong className="block text-gray-900">{testimonial.author}</strong>
                  <span className="text-gray-500 text-sm">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-orange-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Non Perdere il Prossimo Evento</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Iscriviti alla nostra newsletter per ricevere inviti esclusivi, early bird pricing 
            e accesso anticipato agli eventi più richiesti del settore blockchain.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { icon: 'ticket-alt', text: 'Accesso anticipato' },
              { icon: 'percentage', text: 'Sconti esclusivi' },
              { icon: 'bell', text: 'Notifiche priority' }
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-3 rounded-full text-white">
                <i className={`fas fa-${benefit.icon} text-yellow-400`}></i>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-cta">
              Iscriviti agli Eventi
            </a>
            <a href="/vip-trading-signals" className="btn-secondary">
              Accesso VIP
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .btn-primary {
          @apply inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg;
        }

        .btn-secondary {
          @apply inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300;
        }

        .btn-cta {
          @apply inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-lg;
        }
      `}</style>
    </div>
  );
};

export default ExclusiveEvents;