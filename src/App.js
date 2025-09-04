import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
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
    {/* Stili migrati in global.css */}
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main" role="main">
          <ErrorBoundary>
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
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;