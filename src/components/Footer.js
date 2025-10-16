import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const footerLinks = {
    services: [
      { label: 'Crypto Academy', path: '/crypto-academy' },
      { label: 'VIP Trading Signals', path: '/vip-trading-signals' },
      { label: 'Web3 Consulting', path: '/web3-consulting' },
      { label: 'Exclusive Events', path: '/exclusive-events' },
      { label: 'Blog', path: '/blog' }
    ],
    company: [
      { label: 'Chi Siamo', path: '/about-us' },
      { label: 'Contatti', path: '/contact' },
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Termini di Servizio', path: '/terms' }
    ]
  };

  const socialLinks = [
    { icon: 'fab fa-twitter', label: 'Twitter', url: 'https://twitter.com/coinologi' },
    { icon: 'fab fa-linkedin-in', label: 'LinkedIn', url: 'https://www.linkedin.com/company/coinologi' },
    { icon: 'fab fa-telegram-plane', label: 'Telegram', url: 'https://t.me/coinologi_official' },
    { icon: 'fab fa-youtube', label: 'YouTube', url: 'https://www.youtube.com/@coinologi' }
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
                    target="_blank"
                    rel="noopener noreferrer"
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