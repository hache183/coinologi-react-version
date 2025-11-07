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
const Results = React.lazy(() => import('./pages/Results'));
const AboutUs = React.lazy(() => import('./pages/AboutUs'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const AdminLogin = React.lazy(() => import('./pages/admin/Login'));
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const AdminBlogEditor = React.lazy(() => import('./pages/admin/BlogEditor'));
const ProtectedRoute = React.lazy(() => import('./components/admin/ProtectedRoute'));

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
                <Route path="/results" element={<Results />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={(
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  path="/admin/blog/new"
                  element={(
                    <ProtectedRoute>
                      <AdminBlogEditor />
                    </ProtectedRoute>
                  )}
                />
                <Route
                  path="/admin/blog/edit/:id"
                  element={(
                    <ProtectedRoute>
                      <AdminBlogEditor />
                    </ProtectedRoute>
                  )}
                />
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