import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/global.css';

// Lazy loading dei componenti per migliorare le performance
const Home = React.lazy(() => import('./pages/Home'));
const CryptoAcademy = React.lazy(() => import('./pages/CryptoAcademy'));
const VipTradingSignals = React.lazy(() => import('./pages/VipTradingSignals'));
const Web3Consulting = React.lazy(() => import('./pages/Web3Consulting'));
const ExclusiveEvents = React.lazy(() => import('./pages/ExclusiveEvents'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Contact = React.lazy(() => import('./pages/Contact'));

// Componente di loading
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <p>Caricamento...</p>
    
    <style jsx>{`
      .page-loader {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 50vh;
        padding: 2rem;
      }
      
      .loader-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #ff6b35;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      .page-loader p {
        color: #718096;
        font-size: 1rem;
        margin: 0;
      }
    `}</style>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main" role="main">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/crypto-academy" element={<CryptoAcademy />} />
              <Route path="/vip-trading-signals" element={<VipTradingSignals />} />
              <Route path="/web3-consulting" element={<Web3Consulting />} />
              <Route path="/exclusive-events" element={<ExclusiveEvents />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              {/* 404 Route - Redirect to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;