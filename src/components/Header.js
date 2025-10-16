import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import useCryptoTicker from '../hooks/useCryptoTicker';
import useMobileMenu from '../hooks/useMobileMenu';

// Componente Crypto Ticker
const CryptoTicker = () => {
  const { cryptoData, loading, error } = useCryptoTicker();

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `€${(price / 1000).toFixed(1)}K`;
    } else if (price >= 1) {
      return `€${price.toFixed(2)}`;
    } else {
      return `€${price.toFixed(4)}`;
    }
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className={styles.cryptoTickerFixed}>
        <div className={styles.tickerLoading}>
          <span>Loading crypto prices...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.cryptoTickerFixed} ${styles.cryptoTickerError}`}>
        <span>Crypto prices unavailable</span>
      </div>
    );
  }

  return (
    <div className={styles.cryptoTickerFixed}>
      <div className={styles.tickerScroll}>
        {[...cryptoData, ...cryptoData, ...cryptoData].map((crypto, index) => (
          <div key={`${crypto.id}-${index}`} className={styles.tickerCrypto}>
            <span className={styles.cryptoSym}>{crypto.symbol}</span>
            <span className={styles.cryptoPr}>{formatPrice(crypto.price)}</span>
            <span className={`${styles.cryptoCh} ${crypto.change24h >= 0 ? styles.cryptoChPos : styles.cryptoChNeg}`}>
              {formatChange(crypto.change24h)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Header component con React Router
const Header = () => {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'Chi siamo' },
    { to: '/blog', label: 'Blog' },
    { to: '/crypto-academy', label: 'Crypto Academy' },
    { to: '/vip-trading-signals', label: 'VIP Trading Signals' },
    { to: '/web3-consulting', label: 'Web3 Consulting' },
    { to: '/exclusive-events', label: 'Exclusive Events' },
    { to: '/contact', label: 'Contatti' }
  ];
  const navRef = useRef(null);
  const { isMenuOpen, toggleMobileMenu, setIsMenuOpen } = useMobileMenu(navRef);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <CryptoTicker />
      <header className={styles.headerStatic}>
        <nav className={styles.navContainer}>
          <div className={styles.navWrapper} ref={navRef}>
            <Link to="/" className={styles.logoBtn}>
              <span className={styles.logoText}>COINOLOGI</span>
            </Link>
            <button
              className={`${styles.navToggle} ${isMenuOpen ? styles.navToggleActive : ''}`}
              aria-label="Apri menu"
              onClick={toggleMobileMenu}
            >
              <span className={styles.toggleLine}></span>
              <span className={styles.toggleLine}></span>
              <span className={styles.toggleLine}></span>
            </button>
            <ul
              className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuActive : ''}`}
            >
              {navLinks.map((link) => (
                <li key={link.to} className={styles.navItem}>
                  <Link
                    to={link.to}
                    className={
                      location.pathname === link.to
                        ? `${styles.navLink} ${styles.navLinkActive}`
                        : styles.navLink
                    }
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {isMenuOpen && <div className={styles.navBackdrop} onClick={closeMenu} />}
        </nav>
      </header>
      {/* Stili migrati in Header.module.css */}
    </>
  );
};

export default Header;