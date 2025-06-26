import React, { useState, useEffect } from 'react';

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Menu items
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'crypto-academy', label: 'Crypto Academy' },
    { id: 'vip-trading-signals', label: 'VIP Trading Signals' },
    { id: 'web3-consulting', label: 'Web3 Consulting' },
    { id: 'exclusive-events', label: 'Exclusive Events' },
    { id: 'about-us', label: 'Chi Siamo' },
    { id: 'contact', label: 'Contatti' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle menu click
  const handleMenuClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
    // Scroll to top when changing page
    window.scrollTo(0, 0);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`} role="banner">
      <nav className="nav" role="navigation" aria-label="Menu principale">
        <div className="nav__container">
          {/* Logo */}
          <div className="nav__logo">
            <button 
              onClick={() => handleMenuClick('home')} 
              className="nav__logo-link" 
              aria-label="Coinologi Homepage"
            >
              <span className="nav__logo-text">COINOLOGI</span>
            </button>
          </div>

          {/* Desktop Navigation Menu */}
          <ul className={`nav__menu ${isMenuOpen ? 'nav__menu--active' : ''}`} role="menubar">
            {menuItems.map((item) => (
              <li key={item.id} className="nav__item" role="menuitem">
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`nav__link ${currentPage === item.id ? 'nav__link--active' : ''}`}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className={`nav__toggle ${isMenuOpen ? 'nav__toggle--active' : ''}`}
            aria-label={isMenuOpen ? 'Chiudi menu mobile' : 'Apri menu mobile'}
            aria-expanded={isMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="nav__toggle-line"></span>
            <span className="nav__toggle-line"></span>
            <span className="nav__toggle-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div 
          className="nav__backdrop nav__backdrop--active"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .header--scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .nav__container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          height: 80px;
        }

        .nav__logo {
          flex-shrink: 0;
        }

        .nav__logo-link {
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .nav__logo-link:hover {
          transform: scale(1.05);
        }

        .nav__logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.025em;
        }

        .nav__menu {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 16px;
        }

        .nav__item {
          margin: 0;
        }

        .nav__link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4a5568;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav__link:hover {
          color: #ff6b35;
          background-color: #f7fafc;
          transform: translateY(-1px);
        }

        .nav__link--active {
          color: white;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8a5c 100%);
        }

        .nav__link--active:hover {
          color: white;
          background: #e55a2e;
        }

        .nav__toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .nav__toggle:hover {
          background-color: #f7fafc;
        }

        .nav__toggle-line {
          width: 24px;
          height: 2px;
          background-color: #4a5568;
          transition: all 0.2s ease;
          margin: 2px 0;
          border-radius: 2px;
        }

        .nav__toggle--active .nav__toggle-line:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }

        .nav__toggle--active .nav__toggle-line:nth-child(2) {
          opacity: 0;
        }

        .nav__toggle--active .nav__toggle-line:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        .nav__backdrop {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        @media (max-width: 991px) {
          .nav__toggle {
            display: flex;
          }

          .nav__menu {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #e2e8f0;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            flex-direction: column;
            align-items: stretch;
            gap: 0;
            padding: 1.5rem;
            max-height: calc(100vh - 80px);
            overflow-y: auto;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .nav__menu--active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          .nav__item {
            width: 100%;
          }

          .nav__link {
            width: 100%;
            padding: 1rem 1.5rem;
            font-size: 1rem;
            border-radius: 12px;
            margin-bottom: 0.5rem;
            justify-content: flex-start;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;