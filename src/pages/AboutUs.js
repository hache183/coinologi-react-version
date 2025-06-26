import React, { useState, useEffect } from 'react';

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
      isFounder: true
    },
    {
      name: 'Marco Rossi',
      role: 'Head of Trading',
      credential: 'Analista Finanziario',
      bio: 'Ex trader istituzionale con 15 anni di esperienza nei mercati tradizionali e crypto. Marco guida la nostra divisione trading e sviluppa strategie innovative per i nostri VIP signals.'
    },
    {
      name: 'Sara Bianchi',
      role: 'Blockchain Developer',
      credential: 'Specialista DeFi',
      bio: 'Sviluppatrice blockchain esperta in smart contracts e protocolli DeFi. Sara guida i nostri progetti di consulenza Web3 e sviluppo di soluzioni innovative.'
    },
    {
      name: 'Luca Verde',
      role: 'Community Manager',
      credential: 'Specialista Marketing',
      bio: 'Esperto di community building e marketing crypto. Luca gestisce la nostra community e sviluppa strategie per coinvolgere e educare i nostri membri.'
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
    <div className="flex gap-8 mb-12 relative group">
      <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform duration-300">
        {item.year}
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md flex-1 group-hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
        <p className="text-gray-600 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );

  const TeamMember = ({ member }) => (
    <article className={`bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative ${member.isFounder ? 'border-3 border-orange-500' : ''}`}>
      {member.isFounder && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
          Founder
        </div>
      )}
      
      <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
        {member.name.split(' ').map(n => n[0]).join('')}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
      <p className="text-orange-500 font-medium mb-1">{member.role}</p>
      <p className="text-gray-500 text-sm italic mb-4">{member.credential}</p>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>
      
      {member.stats && (
        <div className="flex justify-center gap-6 mb-6">
          {member.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <span className="block text-lg font-bold text-orange-500">{stat.number}</span>
              <span className="text-xs text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-center gap-3">
        <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-orange-500 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-orange-500 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
          <i className="fab fa-twitter"></i>
        </a>
        {member.name === 'Sara Bianchi' && (
          <a href="#" className="w-10 h-10 bg-gray-200 hover:bg-orange-500 hover:text-white rounded-full flex items-center justify-center transition-colors duration-300">
            <i className="fab fa-github"></i>
          </a>
        )}
      </div>
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
                  La Nostra Storia
                </span>
                <br />
                Pionieri del Crypto dal 2014
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                COINOLOGI nasce dalla visione di Ivan Eo, Dottore Commercialista e appassionato di tecnologie blockchain dal 2014. 
                Da oltre 10 anni offriamo supporto trasparente e competente a chiunque voglia avvicinarsi al mondo delle criptovalute.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                    <span className="block text-2xl font-bold text-orange-400 mb-1">
                      {achievement.number === '10+' ? `${animatedNumbers.experience}+` : 
                       achievement.number === '1000+' ? `${animatedNumbers.clients}+` : 
                       achievement.number}
                    </span>
                    <span className="text-sm text-white font-medium">{achievement.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {timeline.slice(0, 4).map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                      style={{ 
                        animation: `float 3s ease-in-out infinite`,
                        animationDelay: `${index * 0.5}s` 
                      }}
                    >
                      <div className="text-orange-400 font-bold text-sm mb-1">{item.year}</div>
                      <div className="text-white text-xs">{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">La Nostra Missione</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Democratizzare l'accesso alle tecnologie blockchain e crypto, fornendo formazione di qualità, 
                consulenza professionale e strumenti pratici per navigare con successo nel mondo decentralizzato.
              </p>
              
              <div className="space-y-6">
                {values.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className={`fas fa-${value.icon} text-white`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-8">
              {[
                { number: '98%', label: 'Clienti Soddisfatti' },
                { number: '500+', label: 'Ore di Formazione' }
              ].map((stat, index) => (
                <div key={index} className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-orange-500">
                  <div className="text-3xl font-bold text-orange-500 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 text-center font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Il Nostro Team</h2>
            <p className="text-lg text-gray-600">
              Esperti appassionati che uniscono competenza tecnica e visione strategica
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Il Nostro Percorso</h2>
          
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
            
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-orange-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Unisciti al Nostro Viaggio</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Fai parte della community COINOLOGI e inizia il tuo percorso nel mondo crypto con il supporto 
            di esperti che ci sono dal primo giorno. La rivoluzione blockchain è appena iniziata.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {[
              { icon: 'history', text: '10+ anni di esperienza' },
              { icon: 'award', text: 'Risultati provati' },
              { icon: 'heart', text: 'Passione autentica' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-3 rounded-full text-white">
                <i className={`fas fa-${feature.icon} text-orange-400`}></i>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <a href="/contact" className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-lg">
            Contattaci Ora
          </a>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;