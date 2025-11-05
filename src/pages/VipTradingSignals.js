import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';

const VipTradingSignals = () => {
  const [dashboardProfit, setDashboardProfit] = useState(4.2);
  const chartBarsRef = useRef([]);
  const summaryNumbersRef = useRef([]);

  useEffect(() => {
    // Animate chart bars
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const height = entry.target.dataset.height;
          entry.target.style.height = '0%';
          setTimeout(() => {
            entry.target.style.height = height;
          }, 200);
          chartObserver.unobserve(entry.target);
        }
      });
    });

    chartBarsRef.current.forEach(bar => {
      if (bar) chartObserver.observe(bar);
    });

    // Animate summary numbers
    const summaryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          summaryObserver.unobserve(entry.target);
        }
      });
    });

    summaryNumbersRef.current.forEach(number => {
      if (number) summaryObserver.observe(number);
    });

    // Animate trading dashboard profit
    const profitInterval = setInterval(() => {
      setDashboardProfit(prev => {
        const change = (Math.random() * 0.2 - 0.1);
        return Math.max(0, prev + change);
      });
    }, 3000);

    return () => {
      chartObserver.disconnect();
      summaryObserver.disconnect();
      clearInterval(profitInterval);
    };
  }, []);

  const animateNumber = (element) => {
    const target = element.textContent;
    const isPercent = target.includes('%');
    const isPlus = target.includes('+');
    const isRatio = target.includes(':');
    
    if (isRatio) return; // Don't animate ratio values

    const number = parseFloat(target.replace(/[^\d.]/g, ''));
    let current = 0;
    const increment = number / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        current = number;
        clearInterval(timer);
      }
      
      let displayValue = Math.floor(current * 10) / 10; // One decimal place
      let finalText = '';
      if (isPlus) finalText += '+';
      finalText += displayValue;
      if (isPercent) finalText += '%';
      
      element.textContent = finalText;
    }, 40);
  };

  const performanceData = [
    { month: 'Gennaio 2025', profit: '+24.7%', height: '85%', signals: '15 Segnali • 13 Vincenti' },
    { month: 'Dicembre 2024', profit: '+31.2%', height: '92%', signals: '18 Segnali • 17 Vincenti' },
    { month: 'Novembre 2024', profit: '+18.9%', height: '76%', signals: '12 Segnali • 10 Vincenti' },
    { month: 'Ottobre 2024', profit: '+15.3%', height: '68%', signals: '14 Segnali • 11 Vincenti' }
  ];

  const features = [
    {
      icon: 'fas fa-bolt',
      title: 'Segnali in Tempo Reale',
      description: 'Ricevi notifiche istantanee su Telegram con entry point, target e stop loss precisi per ogni operazione.'
    },
    {
      icon: 'fas fa-microscope',
      title: 'Analisi Tecniche Avanzate',
      description: 'Spiegazioni dettagliate di ogni segnale con grafici, indicatori e ragionamento dietro ogni decisione di trading.'
    },
    {
      icon: 'fas fa-users',
      title: 'Community Esclusiva',
      description: 'Accesso al gruppo Telegram VIP con discussioni, Q&A live e condivisione di strategie tra membri selezionati.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'App Mobile Dedicata',
      description: 'Dashboard personalizzata per tracciare performance, portfolio e ricevere notifiche push per ogni nuovo segnale.'
    },
    {
      icon: 'fas fa-headset',
      title: 'Supporto Priority 24/7',
      description: 'Assistenza dedicata via chat privata per dubbi su segnali, strategie o problemi tecnici.'
    }
  ];

  const pricingPlans = [
    {
      name: 'VIP Trading Signals 1Y',
      badge: 'Top Annuale',
      price: '€1000',
      period: '/anno',
      features: [
        'Accesso completo segnali VIP per 12 mesi',
        'Bot trading automatico incluso',
        'Analisi tecniche avanzate',
        'Supporto priority 24/7'
      ],
      cta: 'Richiedi Annuale',
      featured: true
    },
    {
      name: 'Sala Segnali Mensile',
      badge: 'Mensile',
      price: '€120',
      period: '/mese',
      features: [
        'Segnali di trading in tempo reale',
        'Analisi di mercato giornaliere',
        'Community Telegram',
        'Report settimanali'
      ],
      cta: 'Attiva Mensile'
    }
  ];

  return (
    <>
      <SEO
        title="VIP Trading Signals"
        description="Accedi ai segnali di trading premium Coinologi con analisi avanzate, community riservata e supporto priority."
        canonical="/vip-trading-signals"
      />
      {/* Hero Section */}
      <section className="hero hero--vip" aria-labelledby="hero-heading">
        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__badge">
              <i className="fas fa-crown"></i>
              <span>ESCLUSIVO</span>
            </div>
            <h1 className="hero__title">
              <span className="hero__title-highlight">VIP Trading Signals</span><br />
              La Community Riservata ai Vincenti
            </h1>
            <p className="hero__description">
              Accedi ai segnali di trading crypto più esclusivi del mercato italiano. 
              Analisi avanzate, strategie provate e una community riservata a investitori selezionati per massimizzare i tuoi risultati.
            </p>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="stat-number">+127%</span>
                <span className="stat-label">ROI Medio 2024</span>
              </div>
              <div className="hero__stat">
                <span className="stat-number">89%</span>
                <span className="stat-label">Win Rate</span>
              </div>
              <div className="hero__stat">
                <span className="stat-number">150+</span>
                <span className="stat-label">Membri VIP</span>
              </div>
            </div>
            <div className="hero__cta">
              <button className="btn btn--primary">Accedi Ora</button>
              <button className="btn btn--secondary">Vedi Performance</button>
            </div>
          </div>
          <div className="hero__visual">
            <div className="trading-dashboard">
              <div className="dashboard-header">
                <h3>🚀 SEGNALE LIVE</h3>
                <span className="status-live">ATTIVO</span>
              </div>
              <div className="signal-card">
                <div className="signal-pair">BTC/USDT</div>
                <div className="signal-action buy">BUY</div>
                <div className="signal-price">Entry: $59,450</div>
                <div className="signal-targets">
                  <span>TP1: $88,200 ✅</span>
                  <span>TP1: $92,400 ✅</span>
                  <span>TP1: $98,900 ✅</span>
                  <span>TP1: $103,800 ✅</span>
                  <span>TP1: $105,000 ✅</span>
                  <span>TP1: $109,000 ✅</span>
                  <span>TP1: $111,000 ✅</span>
                  <span>TP1: $114,000 ✅</span>
                  <span>TP1: $118,000 ✅</span>
                  <span>TP1: $126,000 </span>
                  <span>SL: $79,100</span>
                </div>
                <div className="signal-profit">+{dashboardProfit.toFixed(1)}% PROFIT</div>
              </div>
              <div className="recent-signals">
                <div className="mini-signal">ETH/USDT +7.3% ✅</div>
                <div className="mini-signal">ADA/USDT +12.1% ✅</div>
                <div className="mini-signal">SOL/USDT +8.7% ✅</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ...existing code... */}

      {/* Performance Section */}
      <section className="performance">
        <div className="container">
          <h2 className="performance__title">Performance Track Record</h2>
          <p className="performance__subtitle">Risultati verificati e trasparenti dei nostri segnali VIP</p>
          
          <div className="performance__grid">
            {performanceData.map((data, index) => (
              <div key={index} className="performance-card">
                <h3>{data.month}</h3>
                <div className="performance-chart">
                  <div 
                    className="chart-bar" 
                    data-height={data.height}
                    ref={el => chartBarsRef.current[index] = el}
                  >
                    {data.profit}
                  </div>
                </div>
                <div className="performance-details">
                  <span>{data.signals}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="performance__summary">
            <div className="summary-card">
              <i className="fas fa-trophy"></i>
              <h4>Win Rate Complessivo</h4>
              <span className="summary-number" ref={el => summaryNumbersRef.current[0] = el}>89.2%</span>
              <p>Su oltre 200 segnali analizzati</p>
            </div>
            <div className="summary-card">
              <i className="fas fa-chart-line"></i>
              <h4>ROI Medio Mensile</h4>
              <span className="summary-number" ref={el => summaryNumbersRef.current[1] = el}>+22.5%</span>
              <p>Performance media degli ultimi 12 mesi</p>
            </div>
            <div className="summary-card">
              <i className="fas fa-shield-alt"></i>
              <h4>Risk Management</h4>
              <span className="summary-number" ref={el => summaryNumbersRef.current[2] = el}>1:3</span>
              <p>Rapporto Risk/Reward medio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="vip-features">
        <div className="container">
          <h2 className="vip-features__title">Cosa Include il Servizio VIP</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section className="vip-pricing">
        <div className="container">
          <h2 className="vip-pricing__title">Piani VIP Esclusivi</h2>
          <p className="vip-pricing__subtitle">Scegli il piano che si adatta meglio ai tuoi obiettivi di trading</p>
          
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}>
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                  <div className="pricing-badge">{plan.badge}</div>
                </div>
                <div className="pricing-price">
                  <span className="price-amount">{plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <i className="fas fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
                <button className="pricing-cta">{plan.cta}</button>
              </div>
            ))}
          </div>
          
          <div className="pricing-guarantee">
            <i className="fas fa-shield-alt"></i>
            <div>
              <h4>Garanzia 30 Giorni</h4>
              <p>Se non sei soddisfatto dei risultati, ti rimborsiamo il 100% dell'importo pagato</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta cta--vip">
        <div className="cta__container">
          <div className="cta__content">
            <h2 className="cta__title">Unisciti all'Elite del Trading Crypto</h2>
            <p className="cta__description">
              Solo 150 posti disponibili nella nostra community VIP. 
              Non perdere l'opportunità di fare trading come i professionisti e massimizzare i tuoi risultati.
            </p>
            <div className="cta__urgency">
              <i className="fas fa-fire"></i>
              <span>Solo 12 posti rimasti questo mese</span>
            </div>
            <button className="btn btn--cta">Richiedi Accesso VIP</button>
          </div>
        </div>
      </section>

  <style>{`
        .hero--vip {
          background: linear-gradient(135deg, #2d3436 0%, #636e72 50%, #ff6b35 100%);
          position: relative;
          overflow: hidden;
          /* push content below the fixed ticker + header (60px + 70px = 130px) */
          padding-top: 140px;
          min-height: calc(90vh - 140px);
        }

        .hero--vip .hero__container {
          align-items: stretch;
        }

        .hero--vip .hero__content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero--vip .hero__visual {
          display: flex;
          justify-content: center;
          align-items: center;
          height: auto;
          min-height: 100%;
          overflow: visible;
          padding: 1rem 0;
        }

        .hero--vip::before {
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
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: #2d3436;
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
          from { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          to { box-shadow: 0 0 30px rgba(255, 215, 0, 0.8); }
        }

        .hero__stats {
          display: flex;
          gap: 2rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .hero__stat {
          text-align: center;
          background: rgba(255, 255, 255, 0.18);
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          backdrop-filter: blur(12px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        .hero__stat .stat-number {
          display: block;
          font-size: 1.875rem;
          font-weight: 700;
          color: #ffd700;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        }

        .hero__stat .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.95);
          font-weight: 600;
        }

        .trading-dashboard {
          background: #ffffff;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
          border: 1px solid rgba(226, 232, 240, 0.9);
          width: 100%;
          max-width: 420px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          transform: translateZ(0);
        }

        .trading-dashboard:hover {
          transform: translateY(-6px);
          box-shadow: 0 35px 60px rgba(15, 23, 42, 0.3);
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
          color: #ffffff;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          animation: pulse 2s infinite;
        }

        .signal-card {
          background: #f7fafc;
          border-radius: 0.75rem;
          padding: 1rem;
          margin-bottom: 1rem;
          border: 1px solid #e2e8f0;
        }

        .signal-pair {
          font-size: 1.25rem;
          font-weight: 700;
          color: #2d3436;
          margin-bottom: 0.5rem;
        }

        .signal-action {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .signal-action.buy {
          background: #10b981;
          color: white;
        }

        .signal-price {
          font-size: 1rem;
          color: #4a5568;
          margin-bottom: 0.75rem;
        }

        .signal-targets {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 0.75rem;
        }

        .signal-targets span {
          font-size: 0.875rem;
          color: #475569;
        }

        .signal-profit {
          background: #10b981;
          color: #ffffff;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          text-align: center;
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.35);
        }

        .recent-signals {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mini-signal {
          background: #ecfdf5;
          color: #047857;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-left: 3px solid #10b981;
          box-shadow: inset 0 0 0 1px rgba(16, 185, 129, 0.2);
        }

        .performance {
          padding: 5rem 0;
          background: #f7fafc;
        }

        .performance__title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 1rem;
          color: #2d3436;
        }

        .performance__subtitle {
          text-align: center;
          font-size: 1.125rem;
          color: #718096;
          margin-bottom: 4rem;
        }

        .performance__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .performance-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .performance-card h3 {
          font-size: 1.125rem;
          margin-bottom: 1rem;
          color: #2d3436;
        }

        .performance-chart {
          height: 120px;
          display: flex;
          align-items: end;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .chart-bar {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          width: 60px;
          border-radius: 0.5rem 0.5rem 0 0;
          display: flex;
          align-items: end;
          justify-content: center;
          color: white;
          font-weight: 700;
          padding-bottom: 0.75rem;
          transition: height 1s ease-out;
          height: 0%;
        }

        .performance-details {
          font-size: 0.875rem;
          color: #718096;
        }

        .performance__summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .summary-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          text-align: center;
          border-top: 4px solid #ff6b35;
        }

        .summary-card i {
          font-size: 1.875rem;
          color: #ff6b35;
          margin-bottom: 1rem;
        }

        .summary-card h4 {
          font-size: 1.125rem;
          margin-bottom: 0.75rem;
          color: #2d3436;
        }

        .summary-number {
          display: block;
          font-size: 2.25rem;
          font-weight: 700;
          color: #ff6b35;
          margin-bottom: 0.5rem;
        }

        .summary-card p {
          color: #718096;
          margin: 0;
        }

        .vip-features {
          padding: 5rem 0;
        }

        .vip-features__title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 4rem;
          color: #2d3436;
        }

        .features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
  align-items: stretch; /* Le card si estendono per avere la stessa altezza */
        }

        .feature-card {
  background: white;
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: var(--transition-base);
  /* Usa flexbox per distribuire il contenuto */
  display: flex;
  flex-direction: column;
  height: 100%; /* Assicura che occupi tutta l'altezza disponibile */
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .feature-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 1.5rem;
          color: white;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: #2d3436;
        }

        .feature-card p {
  color: var(--color-gray-600);
  line-height: var(--line-height-relaxed);
  margin: 0;
  /* Flex-grow fa sì che il paragrafo si espanda per riempire lo spazio */
  flex-grow: 1;
        }

        .testimonials {
          padding: 5rem 0;
          background: #f7fafc;
        }

        .testimonials__title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 4rem;
          color: #2d3436;
        }

        .testimonials__grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .testimonial-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .testimonial__stars {
          font-size: 1.125rem;
          margin-bottom: 1rem;
        }

        .testimonial__text {
          font-size: 1rem;
          line-height: 1.625;
          color: #4a5568;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial__author strong {
          display: block;
          color: #2d3436;
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .testimonial__author span {
          color: #a0aec0;
          font-size: 0.875rem;
        }

        .vip-pricing {
          padding: 5rem 0;
        }

        .vip-pricing__title {
          text-align: center;
          font-size: 2.25rem;
          margin-bottom: 1rem;
          color: #2d3436;
        }

        .vip-pricing__subtitle {
          text-align: center;
          font-size: 1.125rem;
          color: #718096;
          margin-bottom: 4rem;
        }

        .pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-16);
  align-items: stretch; /* Le card si estendono per avere la stessa altezza */
        }

        .pricing-card {
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-md);
  position: relative;
  transition: var(--transition-base);
  /* Usa flexbox per distribuire il contenuto */
  display: flex;
  flex-direction: column;
  height: 100%; /* Assicura che occupi tutta l'altezza disponibile */
        }

        .pricing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .pricing-card--featured {
          border: 3px solid #ff6b35;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .pricing-header h3 {
          font-size: 1.5rem;
          color: #2d3436;
          margin-bottom: 0.5rem;
        }

        .pricing-badge {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .pricing-price {
          text-align: center;
          margin-bottom: 2rem;
        }

        .price-amount {
          font-size: 3rem;
          font-weight: 700;
          color: #ff6b35;
        }

        .price-period {
          font-size: 1rem;
          color: #718096;
        }

        .pricing-features {
  list-style: none;
  padding: 0;
  margin-bottom: var(--space-8);
  /* Flex-grow fa sì che le features si espandano per riempire lo spazio */
  flex-grow: 1;
        }

        .pricing-features li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .pricing-features i {
          color: #ff6b35;
          font-size: 0.875rem;
        }

        .pricing-cta {
            display: block;
  width: 100%;
  background: var(--gradient-primary);
  color: white;
  padding: var(--space-4) var(--space-6);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: var(--transition-base);
  /* Il pulsante rimane sempre in fondo */
  margin-top: auto;
        }

        .pricing-cta:hover {
          background: #e55a2e;
          transform: translateY(-2px);
        }

        .pricing-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
          max-width: 500px;
        }

        .pricing-guarantee i {
          font-size: 1.5rem;
          color: #ff6b35;
        }

        .pricing-guarantee h4 {
          font-size: 1.125rem;
          margin-bottom: 0.25rem;
          color: #2d3436;
        }

        .pricing-guarantee p {
          color: #718096;
          margin: 0;
        }

        .cta--vip {
          background: linear-gradient(135deg, #2d3436 0%, #ff6b35 100%);
        }

        .cta__urgency {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(255, 215, 0, 0.2);
          border: 2px solid #ffd700;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          margin: 1.5rem 0;
          color: #ffd700;
          font-weight: 700;
          animation: urgencyPulse 2s infinite;
        }

        @keyframes urgencyPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

    @media (max-width: 768px) {
          .hero__stats {
            flex-direction: column;
            align-items: center;
          }

          .trading-dashboard {
      margin-top: 2rem;
      /* ensure dashboard doesn't sit under the fixed header on small screens */
      margin-top: 1rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .testimonials__grid {
            grid-template-columns: 1fr;
          }

          .performance__grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .performance__summary {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .performance__grid {
            grid-template-columns: 1fr;
          }
        }
  `}</style>
    </>
  );
};

export default VipTradingSignals;