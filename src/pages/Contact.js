import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    privacy: false,
    newsletter: false
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const services = [
    { value: '', label: 'Seleziona un servizio' },
    { value: 'crypto-academy', label: 'Crypto Academy' },
    { value: 'vip-signals', label: 'VIP Trading Signals' },
    { value: 'web3-consulting', label: 'Web3 Consulting' },
    { value: 'exclusive-events', label: 'Exclusive Events' },
    { value: 'general', label: 'Informazioni Generali' },
    { value: 'other', label: 'Altro' }
  ];

  const contactInfo = [
    {
      icon: 'envelope',
      title: 'Email',
      value: 'info@coinologi.com',
      subtitle: 'Risposta entro 24h'
    },
    {
      icon: 'phone',
      title: 'Telefono',
      value: '+39 02 1234 5678',
      subtitle: 'Lun-Ven 9:00-18:00'
    },
    {
      icon: 'map-marker-alt',
      title: 'Sede',
      value: 'Via Blockchain 123',
      subtitle: 'Milano, Italia'
    },
    {
      icon: 'telegram',
      title: 'Telegram',
      value: '@coinologi_official',
      subtitle: 'Supporto istantaneo',
      isBrand: true
    }
  ];

  const schedule = [
    { day: 'Lunedì - Venerdì', hours: '9:00 - 18:00' },
    { day: 'Sabato', hours: '10:00 - 16:00' },
    { day: 'Domenica', hours: 'Chiuso' }
  ];

  const socialLinks = [
    { platform: 'twitter', icon: 'fab fa-twitter' },
    { platform: 'linkedin', icon: 'fab fa-linkedin-in' },
    { platform: 'telegram', icon: 'fab fa-telegram' },
    { platform: 'youtube', icon: 'fab fa-youtube' },
    { platform: 'instagram', icon: 'fab fa-instagram' }
  ];

  const faqData = [
    {
      question: 'Quanto costa una consulenza iniziale?',
      answer: 'La prima consulenza di 30 minuti è completamente gratuita! Durante questo colloquio valuteremo le tue esigenze e ti proporremo la soluzione migliore.'
    },
    {
      question: 'In quanto tempo riceverò una risposta?',
      answer: 'Garantiamo una risposta entro 24 ore per tutte le richieste inviate durante i giorni lavorativi. Per urgenze, puoi contattarci via Telegram per una risposta immediata.'
    },
    {
      question: 'Offrite supporto anche nei weekend?',
      answer: 'Il supporto completo è disponibile dal lunedì al venerdì. Il sabato offriamo supporto limitato (10:00-16:00), mentre la domenica siamo chiusi. I membri VIP hanno accesso al supporto priority anche nei weekend.'
    },
    {
      question: 'Posso prenotare una call diretta con gli esperti?',
      answer: 'Certamente! Dopo il primo contatto, possiamo organizzare una video call su Google Meet o Zoom per discutere in dettaglio le tue esigenze e obiettivi.'
    },
    {
      question: 'Lavorate con aziende di tutte le dimensioni?',
      answer: 'Sì, lavoriamo sia con privati che con aziende di ogni dimensione, dalle startup alle multinazionali. I nostri servizi sono scalabili e personalizzabili in base alle specifiche esigenze.'
    },
    {
      question: 'I miei dati personali sono al sicuro?',
      answer: 'Assolutamente sì. Tutti i dati sono trattati secondo il GDPR e utilizzati esclusivamente per rispondere alle tue richieste. Non condividiamo mai informazioni con terze parti senza il tuo consenso esplicito.'
    }
  ];

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'message':
        if (!value.trim()) {
          error = 'Questo campo è obbligatorio';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Questo campo è obbligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Inserisci un indirizzo email valido';
        }
        break;
      case 'phone':
        if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
          error = 'Inserisci un numero di telefono valido';
        }
        break;
      case 'privacy':
        if (!value) {
          error = 'Devi accettare la Privacy Policy';
        }
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate form submission
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSubmitSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          privacy: false,
          newsletter: false
        });
        
        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
                  Contattaci
                </span>
                <br />
                Siamo Qui per Te
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Hai domande su crypto, blockchain o DeFi? Vuoi una consulenza personalizzata? 
                Il team di esperti di COINOLOGI è pronto ad aiutarti nel tuo percorso verso il successo nel mondo crypto.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: 'clock', text: 'Risposta in 24h' },
                  { icon: 'shield-alt', text: '100% Confidenziale' },
                  { icon: 'star', text: 'Consulenza Gratuita' }
                ].map((feature, index) => (
                  <div key={index} className="text-center bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20">
                    <i className={`fas fa-${feature.icon} text-orange-400 text-2xl mb-2 block`}></i>
                    <span className="text-white text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 animate-float">
                  <div className="bg-orange-500 rounded-lg p-4 mb-4 text-center">
                    <i className="fas fa-comments text-white text-3xl mb-2"></i>
                    <span className="text-white font-medium">Come possiamo aiutarti?</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {['envelope', 'phone', 'telegram', 'whatsapp'].map((icon, index) => (
                      <div 
                        key={index}
                        className={`w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white text-xl hover:bg-orange-500 transition-colors duration-300`}
                        style={{ animation: `float 4s ease-in-out infinite ${index * 0.5}s` }}
                      >
                        <i className={`fab fa-${icon === 'envelope' ? 'fas fa-envelope' : `fab fa-${icon}`}`}></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Invia un Messaggio</h2>
                <p className="text-gray-600 mb-8">Compila il form e ti risponderemo entro 24 ore</p>

                {submitSuccess && (
                  <div className="bg-green-500 text-white p-4 rounded-lg mb-6 flex items-center gap-3 animate-slideDown">
                    <i className="fas fa-check-circle text-xl"></i>
                    <span>Messaggio inviato con successo! Ti contatteremo presto.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-300 ${
                          formErrors.firstName ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                        }`}
                      />
                      {formErrors.firstName && (
                        <span className="text-red-500 text-sm mt-1 block">{formErrors.firstName}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Cognome *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-300 ${
                          formErrors.lastName ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                        }`}
                      />
                      {formErrors.lastName && (
                        <span className="text-red-500 text-sm mt-1 block">{formErrors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-300 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                        }`}
                      />
                      {formErrors.email && (
                        <span className="text-red-500 text-sm mt-1 block">{formErrors.email}</span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-300 ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                        }`}
                      />
                      {formErrors.phone && (
                        <span className="text-red-500 text-sm mt-1 block">{formErrors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Azienda
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 transition-colors duration-300"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                      Servizio di interesse
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 transition-colors duration-300"
                    >
                      {services.map(service => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Messaggio *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Descrivi la tua richiesta in dettaglio..."
                      className={`w-full px-4 py-3 border-2 rounded-lg transition-colors duration-300 resize-vertical ${
                        formErrors.message ? 'border-red-500' : 'border-gray-200 focus:border-orange-500'
                      }`}
                    />
                    {formErrors.message && (
                      <span className="text-red-500 text-sm mt-1 block">{formErrors.message}</span>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="privacy"
                        checked={formData.privacy}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className={`text-sm leading-relaxed ${formErrors.privacy ? 'text-red-500' : 'text-gray-700'}`}>
                        Accetto la <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a> e i{' '}
                        <a href="#" className="text-orange-500 hover:underline">Termini di Servizio</a> *
                      </span>
                    </label>
                    {formErrors.privacy && (
                      <span className="text-red-500 text-sm block">{formErrors.privacy}</span>
                    )}

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 text-orange-500 border-2 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Desidero ricevere newsletter e aggiornamenti da COINOLOGI
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Invia Messaggio
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Contact Details */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Informazioni di Contatto</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className={`${info.isBrand ? 'fab' : 'fas'} fa-${info.icon} text-white text-lg`}></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{info.title}</h4>
                        <p className="text-gray-700 font-medium">{info.value}</p>
                        <small className="text-gray-500">{info.subtitle}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Orari di Supporto</h3>
                <div className="space-y-3">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                      <span className="font-semibold text-gray-700">{item.day}</span>
                      <span className="text-gray-600 font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Seguici sui Social</h3>
                <div className="flex gap-3 flex-wrap">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-12 h-12 bg-gray-100 hover:bg-orange-500 hover:text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Domande Frequenti</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-orange-500 transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
                >
                  <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                  <i className={`fas fa-chevron-down text-orange-500 transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}></i>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-orange-500">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Pronto a Iniziare?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Non aspettare oltre! Contattaci oggi stesso per la tua consulenza gratuita 
            e scopri come COINOLOGI può aiutarti a raggiungere i tuoi obiettivi nel mondo crypto.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+390212345678"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <i className="fas fa-phone mr-2"></i>
              Chiamaci Ora
            </a>
            <a
              href="mailto:info@coinologi.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold rounded-lg transition-all duration-300"
            >
              <i className="fas fa-envelope mr-2"></i>
              Invia Email
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Contact;