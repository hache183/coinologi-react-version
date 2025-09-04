import React, { useState, useEffect, useRef } from 'react';
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
  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/crypto-academy', label: 'Crypto Academy' },
    { path: '/vip-trading-signals', label: 'VIP Trading Signals' },
    { path: '/web3-consulting', label: 'Web3 Consulting' },
    { path: '/exclusive-events', label: 'Exclusive Events' },
    { path: '/about-us', label: 'Chi Siamo' },
    { path: '/contact', label: 'Contatti' }
  ];
  const navRef = useRef(null);
  const { isMenuOpen, toggleMobileMenu, setIsMenuOpen } = useMobileMenu(navRef);
  const location = useLocation();

  // Chiudi menu quando cambia la route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <CryptoTicker />
      <header className={styles.headerStatic} role="banner">
        <nav className={styles.navContainer} role="navigation" ref={navRef}>
          <div className={styles.navWrapper}>
            <div className={styles.navLogo}>
              <Link to="/" className={styles.logoBtn}>
                <span className={styles.logoText}>COINOLOGI</span>
              </Link>
            </div>
            <ul className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuActive : ''}`}>
              {menuItems.map((item) => (
                <li key={item.path} className={styles.navItem}>
                  <Link
                    to={item.path}
                    className={`${styles.navLink} ${location.pathname === item.path ? styles.navLinkActive : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button 
              className={`${styles.navToggle} ${isMenuOpen ? styles.navToggleActive : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className={styles.toggleLine}></span>
              <span className={styles.toggleLine}></span>
              <span className={styles.toggleLine}></span>
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div 
            className={styles.navBackdrop}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>
      {/* Stili migrati in Header.module.css */}
    </>
  );
};

export default Header;