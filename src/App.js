import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CryptoAcademy from './pages/CryptoAcademy';
import VipTradingSignals from './pages/VipTradingSignals';
import Web3Consulting from './pages/Web3Consulting';
import ExclusiveEvents from './pages/ExclusiveEvents';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import './styles/global.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'crypto-academy':
        return <CryptoAcademy />;
      case 'vip-trading-signals':
        return <VipTradingSignals />;
      case 'web3-consulting':
        return <Web3Consulting />;
      case 'exclusive-events':
        return <ExclusiveEvents />;
      case 'about-us':
        return <AboutUs />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main" role="main">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;