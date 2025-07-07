import React, { useState, useEffect } from 'react';

// Componente Crypto Ticker con altezza aumentata
const CryptoTicker = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cryptoSymbols = [
    'bitcoin', 'ethereum', 'binancecoin', 'cardano', 'solana',
    'polkadot', 'chainlink', 'litecoin', 'polygon', 'avalanche-2',
    'dogecoin', 'shiba-inu', 'tron', 'cosmos', 'algorand'
  ];

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbols.join(',')}&vs_currencies=eur&include_24hr_change=true`
      );
      
      if (!response.ok) {
        throw new Error('API Error');
      }
      
      const data = await response.json();
      
      const formattedData = Object.keys(data).map(key => ({
        id: key,
        symbol: getSymbol(key),
        price: data[key].eur,
        change24h: data[key].eur_24h_change
      }));
      
      setCryptoData(formattedData);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  const getSymbol = (id) => {
    const symbols = {
      'bitcoin': 'BTC',
      'ethereum': 'ETH',
      'binancecoin': 'BNB',
      'cardano': 'ADA',
      'solana': 'SOL',
      'polkadot': 'DOT',
      'chainlink': 'LINK',
      'litecoin': 'LTC',
      'polygon': 'MATIC',
      'avalanche-2': 'AVAX',
      'dogecoin': 'DOGE',
      'shiba-inu': 'SHIB',
      'tron': 'TRX',
      'cosmos': 'ATOM',
      'algorand': 'ALGO'
    };
    return symbols[id] || id.toUpperCase();
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="crypto-ticker-fixed">
        <div className="ticker-loading">
          <span>Loading crypto prices...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="crypto-ticker-fixed crypto-ticker-error">
        <span>Crypto prices unavailable</span>
      </div>
    );
  }

  return (
    <div className="crypto-ticker-fixed">
      <div className="ticker-scroll">
        {[...cryptoData, ...cryptoData, ...cryptoData].map((crypto, index) => (
          <div key={`${crypto.id}-${index}`} className="ticker-crypto">
            <span className="crypto-sym">{crypto.symbol}</span>
            <span className="crypto-pr">{formatPrice(crypto.price)}</span>
            <span className={`crypto-ch ${crypto.change24h >= 0 ? 'pos' : 'neg'}`}>
              {formatChange(crypto.change24h)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Header component con spaziature ottimizzate
const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'crypto-academy', label: 'Crypto Academy' },
    { id: 'vip-trading-signals', label: 'VIP Trading Signals' },
    { id: 'web3-consulting', label: 'Web3 Consulting' },
    { id: 'exclusive-events', label: 'Exclusive Events' },
    { id: 'about-us', label: 'Chi Siamo' },
    { id: 'contact', label: 'Contatti' }
  ];

  const handleMenuClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      {/* Ticker fisso in alto */}
      <CryptoTicker />
      
      {/* Header con spaziature ridotte */}
      <header className="header-static" role="banner">
        <nav className="nav-container" role="navigation">
          <div className="nav-wrapper">
            <div className="nav-logo">
              <button 
                onClick={() => handleMenuClick('home')} 
                className="logo-btn"
              >
                <span className="logo-text">COINOLOGI</span>
              </button>
            </div>

            <ul className={`nav-menu ${isMenuOpen ? 'nav-menu-active' : ''}`}>
              {menuItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`nav-link ${currentPage === item.id ? 'nav-link-active' : ''}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            <button 
              className={`nav-toggle ${isMenuOpen ? 'nav-toggle-active' : ''}`}
              onClick={toggleMobileMenu}
            >
              <span className="toggle-line"></span>
              <span className="toggle-line"></span>
              <span className="toggle-line"></span>
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div 
            className="nav-backdrop"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>

      <style jsx>{`
        /* ===== CRYPTO TICKER FISSO - ALLARGATO ===== */
        .crypto-ticker-fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          height: 60px; /* Aumentata da 32px a 40px */
          background: #1a202c;
          border-bottom: 1px solid #ff6b35;
          overflow: hidden;
        }

        .crypto-ticker-error {
          background: #e53e3e;
        }

        .ticker-loading {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ff6b35;
          font-size: 12px;
          font-weight: 500;
        }

        .ticker-scroll {
          height: 100%;
          display: flex;
          align-items: center;
          animation: scrollTicker 40s linear infinite;
          will-change: transform;
        }

        .ticker-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes scrollTicker {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }

        .ticker-crypto {
          display: flex;
          align-items: center;
          margin-right: 24px; /* Aumentato da 20px */
          padding: 0 12px; /* Aumentato da 8px */
          height: 32px; /* Aumentata da 24px */
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px; /* Aumentato da 3px */
          min-width: 160px; /* Aumentata da 140px */
          gap: 8px; /* Aumentato da 6px */
          flex-shrink: 0;
        }

        .crypto-sym {
          font-family: 'Courier New', monospace;
          font-weight: 700;
          font-size: 11px; /* Aumentato da 10px */
          color: #ffd700;
          min-width: 36px; /* Aumentato da 32px */
          text-align: left;
        }

        .crypto-pr {
          font-family: 'Courier New', monospace;
          font-size: 11px; /* Aumentato da 10px */
          font-weight: 600;
          color: #ffffff;
          min-width: 60px; /* Aumentato da 50px */
          text-align: right;
        }

        .crypto-ch {
          font-family: 'Courier New', monospace;
          font-size: 10px; /* Aumentato da 9px */
          font-weight: 600;
          padding: 2px 6px; /* Aumentato da 1px 4px */
          border-radius: 3px; /* Aumentato da 2px */
          min-width: 42px; /* Aumentato da 38px */
          text-align: center;
        }

        .crypto-ch.pos {
          color: #48bb78;
          background: rgba(72, 187, 120, 0.2);
        }

        .crypto-ch.neg {
          color: #f56565;
          background: rgba(245, 101, 101, 0.2);
        }

        /* ===== HEADER CON SPAZIATURE RIDOTTE ===== */
        .header-static {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          margin-top: 30px; /* Aggiornato da 32px a 40px */
          margin-bottom: 10px;
        }

        .nav-container {
          position: relative;
        }

        .nav-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.75rem 1.5rem; /* Ridotto da 1rem a 0.75rem */
          height: 70px; /* Ridotto da 80px a 70px */
        }

        .nav-logo {
          flex-shrink: 0;
        }

        .logo-btn {
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .logo-btn:hover {
          transform: scale(1.05);
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 16px;
        }

        .nav-item {
          margin: 0;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4a5568;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #ff6b35;
          background-color: #f7fafc;
          transform: translateY(-1px);
        }

        .nav-link-active {
          color: white;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
        }

        .nav-link-active:hover {
          color: white;
          background: #e55a2e;
        }

        .nav-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          cursor: pointer;
          border-radius: 8px;
        }

        .toggle-line {
          width: 24px;
          height: 2px;
          background-color: #4a5568;
          transition: all 0.2s ease;
          margin: 2px 0;
          border-radius: 2px;
        }

        .nav-toggle-active .toggle-line:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }

        .nav-toggle-active .toggle-line:nth-child(2) {
          opacity: 0;
        }

        .nav-toggle-active .toggle-line:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        .nav-backdrop {
         position: fixed;
         top: 100px; /* AGGIORNA questo valore in base all'altezza ticker + header */
         left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9998; 
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 991px) {
          .nav-toggle {
            display: flex;
          }

          .nav-menu {
  position: fixed;
  top: 48px; /* Altezza ticker aggiornata */
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  padding: 1.5rem;
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 9999; /* AUMENTATO */
}

          .nav-menu-active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .nav-item {
            width: 100%;
          }

          .nav-link {
            width: 100%;
            padding: 1rem 1.5rem;
            font-size: 1rem;
            margin-bottom: 0.5rem;
          }

          /* Ticker mobile - spaziature proporzionali */
          .ticker-crypto {
            margin-right: 18px;
            min-width: 140px;
            gap: 6px;
            height: 28px;
          }
          
          .crypto-sym {
            font-size: 10px;
            min-width: 32px;
          }
          
          .crypto-pr {
            font-size: 10px;
            min-width: 55px;
          }
          
          .crypto-ch {
            font-size: 9px;
            min-width: 38px;
          }
        }

        @media (max-width: 480px) {
          .nav-wrapper {
            padding: 0.5rem 1rem; /* Ulteriormente ridotto per mobile */
            height: 60px; /* Ridotto per mobile */
          }

          .ticker-crypto {
            margin-right: 15px;
            min-width: 120px;
            gap: 4px;
            height: 24px;
          }
          
          .crypto-sym {
            font-size: 9px;
            min-width: 28px;
          }
          
          .crypto-pr {
            font-size: 9px;
            min-width: 50px;
          }
          
          .crypto-ch {
            font-size: 8px;
            min-width: 32px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;