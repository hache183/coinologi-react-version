import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import styles from './Footer.module.css';

const Footer = () => {
  const footerLinks = {
    services: [
      { label: 'Crypto Academy', path: '/crypto-academy' },
      { label: 'VIP Trading Signals', path: '/vip-trading-signals' },
      { label: 'Web3 Consulting', path: '/web3-consulting' },
      { label: 'Exclusive Events', path: '/exclusive-events' }
    ],
    company: [
      { label: 'Chi Siamo', path: '/about-us' },
      { label: 'Contatti', path: '/contact' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Termini di Servizio', path: '/terms' }
    ]
  };

  const socialLinks = [
    { icon: 'fab fa-twitter', label: 'Twitter', url: '#' },
    { icon: 'fab fa-linkedin-in', label: 'LinkedIn', url: '#' },
    { icon: 'fab fa-telegram-plane', label: 'Telegram', url: '#' },
    { icon: 'fab fa-youtube', label: 'YouTube', url: '#' }
  ];

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3 className={styles.footerLogo}>COINOLOGI</h3>
            <p className={styles.footerDescription}>
              Il tuo partner di fiducia nel mondo crypto dal 2014. Trasparenza, competenza e risultati concreti.
            </p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Servizi</h4>
              <ul className={styles.footerMenu}>
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Azienda</h4>
              <ul className={styles.footerMenu}>
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className={styles.footerLink}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Seguici</h4>
              <div className={styles.footerSocial}>
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    className={styles.footerSocialLink} 
                    aria-label={`Seguici su ${social.label}`}
                  >
                    <i className={social.icon} aria-hidden="true"></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            &copy; 2025 COINOLOGI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;