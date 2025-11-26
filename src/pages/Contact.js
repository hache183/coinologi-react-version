import React, { useState } from 'react';
import SEO from '../components/SEO';

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
  { value: 'results', label: 'Results' },
    { value: 'general', label: 'Informazioni Generali' },
    { value: 'other', label: 'Altro' }
  ];

  const contactInfo = [
    {
      icon: 'envelope',
      title: 'Email',
  value: 'info@coinologi.net',
      subtitle: 'Risposta entro 24h'
    },
    {
      icon: 'phone',
      title: 'Telefono',
      value: '+39 02 1234 5678',
      subtitle: 'Lun-Ven 9:00-18:00'
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
    { platform: 'twitter', icon: 'fab fa-twitter', url: 'https://twitter.com/coinologi' },
    { platform: 'linkedin', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/coinologi' },
    { platform: 'telegram', icon: 'fab fa-telegram', url: 'https://t.me/coinologi_official' },
    { platform: 'youtube', icon: 'fab fa-youtube', url: 'https://www.youtube.com/@coinologi' },
    { platform: 'instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/coinologi' }
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
        if (value && !/^[\d\s+()-]+$/.test(value)) {
          error = 'Inserisci un numero di telefono valido';
        }
        break;
      case 'privacy':
        if (!value) {
          error = 'Devi accettare la Privacy Policy';
        }
        break;
      default:
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
    <>
      <SEO
        title="Contattaci"
        description="Richiedi supporto personalizzato dal team Coinologi per consulenze crypto, formazione e servizi professionali."
        canonical="/contact"
      />
      {/* Hero Section */}
      <section className="hero hero--contact" aria-labelledby="hero-heading">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <i className="fas fa-comments"></i>
              <span>SIAMO QUI PER TE</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-highlight">Contattaci</span><br />
              Iniziamo Insieme il Tuo Percorso
            </h1>
            <p className="hero__description">
              Hai domande su crypto, blockchain o DeFi? Vuoi una consulenza personalizzata? 
              Il team di esperti di COINOLOGI è pronto ad aiutarti nel tuo percorso verso il successo nel mondo crypto.
            </p>

            <div className="hero__contact-features">
              <div className="contact-feature">
                <i className="fas fa-clock"></i>
                <span>Risposta in 24h</span>
              </div>
              <div className="contact-feature">
                <i className="fas fa-shield-alt"></i>
                <span>100% Confidenziale</span>
              </div>
              <div className="contact-feature">
                <i className="fas fa-star"></i>
                <span>Consulenza Gratuita</span>
              </div>
            </div>

            <div className="hero__cta">
              <button className="btn btn--primary">Invia Messaggio</button>
              <button className="btn btn--secondary">Chiamaci</button>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <div className="form-card">
                <header className="form-header">
                  <h2>Invia un Messaggio</h2>
                  <p>Compila il form e ti risponderemo entro 24 ore</p>
                </header>

                {submitSuccess && (
                  <div className="success-message">
                    <i className="fas fa-check-circle"></i>
                    <span>Messaggio inviato con successo! Ti contatteremo presto.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">Nome *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={formErrors.firstName ? 'error' : ''}
                      />
                      {formErrors.firstName && (
                        <span className="error-message">{formErrors.firstName}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Cognome *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={formErrors.lastName ? 'error' : ''}
                      />
                      {formErrors.lastName && (
                        <span className="error-message">{formErrors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? 'error' : ''}
                      />
                      {formErrors.email && (
                        <span className="error-message">{formErrors.email}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Telefono</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={formErrors.phone ? 'error' : ''}
                      />
                      {formErrors.phone && (
                        <span className="error-message">{formErrors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Azienda</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">Servizio di interesse</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      {services.map(service => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Messaggio *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Descrivi la tua richiesta in dettaglio..."
                      className={formErrors.message ? 'error' : ''}
                    />
                    {formErrors.message && (
                      <span className="error-message">{formErrors.message}</span>
                    )}
                  </div>

                  <div className="form-checkboxes">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="privacy"
                        checked={formData.privacy}
                        onChange={handleInputChange}
                      />
                      <span className={formErrors.privacy ? 'error' : ''}>
                        Accetto la <a href="https://coinologi.net/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> e i{' '}
                        <a href="https://coinologi.net/termini-di-servizio" target="_blank" rel="noopener noreferrer">Termini di Servizio</a> *
                      </span>
                    </label>
                    {formErrors.privacy && (
                      <span className="error-message">{formErrors.privacy}</span>
                    )}

                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                      />
                      <span>
                        Desidero ricevere newsletter e aggiornamenti da COINOLOGI
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
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
            <div className="contact-info">
              {/* Contact Details */}
              <div className="info-card">
                <h3>Informazioni di Contatto</h3>
                <div className="contact-methods">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="contact-method-item">
                      <div className="method-icon">
                        <i className={`${info.isBrand ? 'fab' : 'fas'} fa-${info.icon}`}></i>
                      </div>
                      <div className="method-info">
                        <h4>{info.title}</h4>
                        <p>{info.value}</p>
                        <small>{info.subtitle}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div className="info-card">
                <h3>Orari di Supporto</h3>
                <div className="schedule-list">
                  {schedule.map((item, index) => (
                    <div key={index} className="schedule-item">
                      <span className="day">{item.day}</span>
                      <span className="hours">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="info-card">
                <h3>Seguici sui Social</h3>
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="social-link"
                      aria-label={`Seguici su ${social.platform}`}
                      target="_blank"
                      rel="noopener noreferrer"
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
      <section className="faq-section">
        <div className="container">
          <header className="services__header">
            <h2 className="services__title">Domande Frequenti</h2>
            <p className="services__subtitle">
              Le risposte alle domande più comuni sui nostri servizi
            </p>
          </header>
          
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="faq-question"
                >
                  <span>{faq.question}</span>
                  <i className={`fas fa-chevron-down ${openFaq === index ? 'rotate' : ''}`}></i>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
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
            <h2 className="cta__title">Pronto a Iniziare?</h2>
            <p className="cta__description">
              Non aspettare oltre! Contattaci oggi stesso per la tua consulenza gratuita 
              e scopri come COINOLOGI può aiutarti a raggiungere i tuoi obiettivi nel mondo crypto.
            </p>
            
            <div className="cta__actions">
              <a
                href="tel:+390212345678"
                className="btn btn--primary contact-cta__button contact-cta__button--primary"
              >
                <i className="fas fa-phone"></i>
                Chiamaci Ora
              </a>
              <a
                href="mailto:info@coinologi.net"
                className="btn btn--secondary contact-cta__button contact-cta__button--secondary"
              >
                <i className="fas fa-envelope"></i>
                Invia Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Hero Contact Features */
        .hero__contact-features {
          display: flex;
          gap: var(--space-8);
          margin: var(--space-8) 0;
          flex-wrap: wrap;
        }

        .contact-feature {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          background: rgba(255, 255, 255, 0.1);
          padding: var(--space-3) var(--space-4);
          border-radius: var(--radius-lg);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-white);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        .contact-feature i {
          color: var(--color-primary);
        }

        /* Contact Section */
        .contact-section {
          padding: var(--space-20) 0;
          background: var(--color-gray-100);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--space-12);
        }

        /* Form Card */
        .contact-form-wrapper {
          display: flex;
          flex-direction: column;
        }

        .form-card {
          background: var(--color-white);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--color-gray-200);
        }

        .form-header {
          margin-bottom: var(--space-8);
        }

        .form-header h2 {
          font-size: var(--font-size-2xl);
          color: var(--color-gray-900);
          margin-bottom: var(--space-2);
        }

        .form-header p {
          color: var(--color-gray-600);
          margin-bottom: 0;
        }

        .success-message {
          background: var(--color-success);
          color: var(--color-white);
          padding: var(--space-4);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-6);
          display: flex;
          align-items: center;
          gap: var(--space-3);
          animation: slideDown 0.5s ease-out;
        }

        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Form Styles */
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-6);
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .form-group label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-gray-700);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: var(--space-3) var(--space-4);
          border: 2px solid var(--color-gray-200);
          border-radius: var(--radius-lg);
          font-size: var(--font-size-base);
          transition: var(--transition-base);
          background: var(--color-white);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--color-primary);
          outline: none;
        }

        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
          border-color: var(--color-error);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .error-message {
          color: var(--color-error);
          font-size: var(--font-size-sm);
        }

        .form-checkboxes {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          margin-top: var(--space-1);
          width: 20px;
          height: 20px;
          accent-color: var(--color-primary);
        }

        .checkbox-label span {
          font-size: var(--font-size-sm);
          line-height: var(--line-height-relaxed);
          color: var(--color-gray-700);
        }

        .checkbox-label span.error {
          color: var(--color-error);
        }

        .checkbox-label a {
          color: var(--color-primary);
        }

        .checkbox-label a:hover {
          text-decoration: underline;
        }

        .submit-button {
          background: var(--gradient-primary);
          color: var(--color-white);
          padding: var(--space-4) var(--space-6);
          border: none;
          border-radius: var(--radius-lg);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-semibold);
          cursor: pointer;
          transition: var(--transition-base);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          margin-top: var(--space-4);
        }

        .submit-button:hover:not(:disabled) {
          background: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid var(--color-white);
          border-radius: var(--radius-full);
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Contact Info */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .info-card {
          background: var(--color-white);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--color-gray-200);
        }

        .info-card h3 {
          font-size: var(--font-size-xl);
          color: var(--color-gray-900);
          margin-bottom: var(--space-6);
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .contact-method-item {
          display: flex;
          gap: var(--space-4);
          align-items: flex-start;
        }

        .method-icon {
          width: 48px;
          height: 48px;
          background: var(--gradient-primary);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .method-icon i {
          color: var(--color-white);
          font-size: var(--font-size-lg);
        }

        .method-info h4 {
          font-size: var(--font-size-base);
          color: var(--color-gray-900);
          margin-bottom: var(--space-1);
        }

        .method-info p {
          font-size: var(--font-size-base);
          color: var(--color-gray-700);
          font-weight: var(--font-weight-medium);
          margin-bottom: var(--space-1);
        }

        .method-info small {
          color: var(--color-gray-500);
          font-size: var(--font-size-sm);
        }

        .schedule-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .schedule-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-3);
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
          border-left: 4px solid var(--color-primary);
        }

        .schedule-item .day {
          font-weight: var(--font-weight-semibold);
          color: var(--color-gray-700);
        }

        .schedule-item .hours {
          color: var(--color-gray-600);
          font-weight: var(--font-weight-medium);
        }

        .social-links {
          display: flex;
          gap: var(--space-3);
          flex-wrap: wrap;
        }

        .social-link {
          width: 48px;
          height: 48px;
          background: var(--color-gray-100);
          color: var(--color-gray-600);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-base);
          font-size: var(--font-size-lg);
        }

        .social-link:hover {
          background: var(--color-primary);
          color: var(--color-white);
          transform: translateY(-2px);
        }

        /* FAQ Section */
        .faq-section {
          padding: var(--space-20) 0;
          background: var(--color-white);
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .faq-item {
          background: var(--color-white);
          border: 2px solid var(--color-gray-100);
          border-radius: var(--radius-xl);
          overflow: hidden;
          transition: var(--transition-base);
        }

        .faq-item:hover {
          border-color: var(--color-primary);
        }

        .faq-item.open {
          border-color: var(--color-primary);
        }

        .faq-question {
          width: 100%;
          padding: var(--space-6);
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-gray-900);
          transition: var(--transition-base);
        }

        .faq-question:hover {
          background: var(--color-gray-50);
        }

        .faq-question i {
          color: var(--color-primary);
          transition: var(--transition-base);
          flex-shrink: 0;
          margin-left: var(--space-4);
        }

        .faq-question i.rotate {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .faq-item.open .faq-answer {
          max-height: 200px;
        }

        .faq-answer p {
          padding: 0 var(--space-6) var(--space-6);
          color: var(--color-gray-600);
          line-height: var(--line-height-relaxed);
          margin: 0;
        }

        /* CTA Actions */
        .cta__actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta__actions .btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .contact-cta__button {
          min-width: 220px;
          font-weight: var(--font-weight-semibold);
          padding: var(--space-4) var(--space-8);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
        }

        .contact-cta__button--primary {
          background: var(--gradient-primary);
          color: var(--color-white);
          border-color: var(--color-primary);
        }

        .contact-cta__button--primary:hover {
          background: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
          color: var(--color-white);
        }

        .contact-cta__button--secondary {
          background: var(--color-white);
          color: var(--color-primary);
          border-color: var(--color-white);
        }

        .contact-cta__button--secondary:hover {
          background: transparent;
          color: var(--color-white);
          border-color: var(--color-white);
        }

        /* Responsive */
        @media (max-width: 991px) {
          .hero__contact-features {
            flex-direction: column;
            align-items: center;
            gap: var(--space-4);
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 767px) {
          .form-card {
            padding: var(--space-6);
          }

          .info-card {
            padding: var(--space-6);
          }

          .contact-method-item {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }

          .method-icon {
            align-self: center;
          }

          .schedule-item {
            flex-direction: column;
            text-align: center;
            gap: var(--space-2);
          }

          .social-links {
            justify-content: center;
          }

          .faq-question {
            padding: var(--space-4);
            font-size: var(--font-size-base);
          }

          .faq-answer p {
            padding: 0 var(--space-4) var(--space-4);
          }

          .cta__actions {
            flex-direction: column;
            align-items: center;
          }

          .cta__actions .btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </>
  );
};

export default Contact;