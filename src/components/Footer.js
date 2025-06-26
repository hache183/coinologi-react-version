import React from 'react';

const Footer = () => {
  const footerLinks = {
    services: [
      { label: 'Crypto Academy', id: 'crypto-academy' },
      { label: 'VIP Trading Signals', id: 'vip-trading-signals' },
      { label: 'Web3 Consulting', id: 'web3-consulting' },
      { label: 'Exclusive Events', id: 'exclusive-events' }
    ],
    company: [
      { label: 'Chi Siamo', id: 'about-us' },
      { label: 'Contatti', id: 'contact' },
      { label: 'Privacy Policy', id: 'privacy' },
      { label: 'Termini di Servizio', id: 'terms' }
    ]
  };

  const socialLinks = [
    { icon: 'fab fa-twitter', label: 'Twitter', url: '#' },
    { icon: 'fab fa-linkedin-in', label: 'LinkedIn', url: '#' },
    { icon: 'fab fa-telegram-plane', label: 'Telegram', url: '#' },
    { icon: 'fab fa-youtube', label: 'YouTube', url: '#' }
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__brand">
            <h3 className="footer__logo">COINOLOGI</h3>
            <p className="footer__description">
              Il tuo partner di fiducia nel mondo crypto dal 2014. Trasparenza, competenza e risultati concreti.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__column-title">Servizi</h4>
              <ul className="footer__menu">
                {footerLinks.services.map((link) => (
                  <li key={link.id}>
                    <button className="footer__link">{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Azienda</h4>
              <ul className="footer__menu">
                {footerLinks.company.map((link) => (
                  <li key={link.id}>
                    <button className="footer__link">{link.label}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__column-title">Seguici</h4>
              <div className="footer__social">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    className="footer__social-link" 
                    aria-label={`Seguici su ${social.label}`}
                  >
                    <i className={social.icon} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; 2025 COINOLOGI. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #2d3436;
          color: #e2e8f0;
          padding: 4rem 0 2rem;
          position: relative;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ff6b35, transparent);
        }

        .footer__container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .footer__content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer__brand {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer__logo {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .footer__description {
          font-size: 1rem;
          line-height: 1.625;
          color: #cbd5e0;
          max-width: 300px;
          margin: 0;
        }

        .footer__links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .footer__column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer__column-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.75rem;
        }

        .footer__menu {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer__menu li {
          margin: 0;
        }

        .footer__link {
          color: #cbd5e0;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          padding: 0.25rem 0;
          position: relative;
          transition: color 0.1s ease-out;
          text-align: left;
        }

        .footer__link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #ff6b35;
          transition: width 0.2s ease-out;
        }

        .footer__link:hover {
          color: #ff6b35;
        }

        .footer__link:hover::before {
          width: 100%;
        }

        .footer__social {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .footer__social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: #4a5568;
          color: #cbd5e0;
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.15s ease-out;
          font-size: 1.125rem;
        }

        .footer__social-link:hover {
          background: #ff6b35;
          color: white;
          transform: scale(1.05);
        }

        .footer__social-link:nth-child(1):hover {
          background: #1da1f2;
        }

        .footer__social-link:nth-child(2):hover {
          background: #0077b5;
        }

        .footer__social-link:nth-child(3):hover {
          background: #0088cc;
        }

        .footer__social-link:nth-child(4):hover {
          background: #ff0000;
        }

        .footer__bottom {
          padding-top: 2rem;
          border-top: 1px solid #4a5568;
          text-align: center;
        }

        .footer__copyright {
          font-size: 0.875rem;
          color: #a0aec0;
          margin: 0;
        }

        @media (max-width: 991px) {
          .footer__content {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          
          .footer__brand {
            align-items: center;
          }
          
          .footer__description {
            max-width: 100%;
          }
          
          .footer__links {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .footer__social {
            justify-content: center;
          }
        }

        @media (max-width: 767px) {
          .footer {
            padding: 3rem 0 1.5rem;
          }
          
          .footer__content {
            gap: 1.5rem;
          }
          
          .footer__links {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .footer__column {
            text-align: center;
          }
          
          .footer__logo {
            font-size: 1.25rem;
          }
          
          .footer__description {
            font-size: 0.875rem;
          }
          
          .footer__social {
            gap: 0.75rem;
          }
          
          .footer__social-link {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;