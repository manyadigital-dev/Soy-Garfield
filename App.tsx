import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Write from './pages/Write';
import ArticleDetail from './pages/ArticleDetail';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Sitemap from './pages/Sitemap';
import AuthorDetail from './pages/AuthorDetail';
import Authors from './pages/Authors';
import { Navigate } from 'react-router-dom';

// ScrollToTop and Reveal observer
const AppEffects = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    // Reveal on scroll logic
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppEffects />
        <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              {/* Redirect /about to main author profile */}
              <Route path="/about" element={<Navigate to="/author/pietro-fiorillo" replace />} />
              <Route path="/write" element={<Write />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/article/:id" element={<ArticleDetail />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/authors" element={<Authors />} />
              <Route path="/author/:slug" element={<AuthorDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;