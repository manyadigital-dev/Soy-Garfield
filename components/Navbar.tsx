import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X, Search, Zap, Home, User,
  MessageSquare, ChevronRight, Sparkles,
  BookOpen, Linkedin, Twitter, ArrowRight
} from 'lucide-react';
import { NavItem } from '../types';
import pietroLogo from '../assets/pietro.png';
import { motion, AnimatePresence } from 'framer-motion';

const navItems: NavItem[] = [
  { label: 'SEO', path: '/category/seo' },
  { label: 'IA', path: '/category/ia' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    }
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] py-3 border-b border-slate-100'
          : 'bg-white py-5 border-b border-white'
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center gap-3 group relative z-[110]">
              <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl overflow-hidden bg-slate-100 transition-all duration-500 group-hover:rotate-[5deg] group-hover:scale-110 shadow-lg border-2 border-white ring-1 ring-slate-100">
                <img
                  src={pietroLogo}
                  alt="Pietro Fiorillo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-none">
                  Soy<span className="text-garfield-600">Garfield</span>
                </span>
                <span className="hidden sm:block text-[0.6rem] font-black uppercase tracking-[0.3em] text-slate-400 mt-1">
                  Pietro Fiorillo
                </span>
              </div>
            </Link>

            {/* Desktop Actions bar toggle the menu */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`px-5 py-2.5 text-[0.7rem] font-black transition-all uppercase tracking-[0.2em] rounded-xl relative overflow-hidden group/link ${location.pathname === item.path
                      ? 'text-garfield-600 bg-garfield-50'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                ))}
                <Link
                  to="/author/pietro-fiorillo"
                  className={`px-5 py-2.5 text-[0.7rem] font-black transition-all uppercase tracking-[0.2em] rounded-xl group/link ${location.pathname === '/author/pietro-fiorillo'
                    ? 'text-garfield-600 bg-garfield-50'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <User size={14} className="opacity-50" />
                    Sobre Mí
                  </span>
                </Link>
              </nav>

              <div className="hidden md:flex items-center group/search relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className={`bg-slate-50 border border-slate-100 rounded-2xl px-5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-garfield-500 focus:bg-white outline-none transition-all duration-500 ${isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 pointer-events-none'
                    }`}
                />
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-2.5 text-slate-400 hover:text-garfield-600 hover:bg-garfield-50 rounded-xl transition-all ${isSearchOpen ? 'bg-garfield-50 text-garfield-600 ml-2' : ''
                    }`}
                >
                  <Search size={20} />
                </button>
              </div>

              <Link
                to="/contact"
                className="hidden sm:flex items-center gap-2 rounded-2xl bg-slate-900 px-8 py-3.5 text-[0.65rem] font-black uppercase tracking-[0.2em] text-white hover:bg-garfield-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 group/btn"
              >
                Let's Talk
                <Sparkles size={14} className="group-hover/btn:animate-sparkle" />
              </Link>

              {/* Mobile Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative z-[150] p-3 rounded-2xl bg-slate-900 text-white shadow-lg active:scale-90 transition-all"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FULL SCREEN MOBILE OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[140] bg-white lg:hidden flex flex-col"
          >
            {/* Safe Area / Top Spacer */}
            <div className="h-24 sm:h-28 flex-shrink-0"></div>

            <div className="flex-grow overflow-y-auto px-6 pb-24">
              <div className="mx-auto max-w-lg">
                {/* Author Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-50 rounded-[2.5rem] p-6 mb-8 border border-slate-100 relative overflow-hidden shadow-sm"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-garfield-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="flex items-center gap-5 relative z-10">
                    <div className="h-16 w-16 overflow-hidden rounded-3xl border-4 border-white shadow-xl flex-shrink-0">
                      <img src={pietroLogo} alt="Pietro" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl font-black text-slate-900 leading-tight">
                        Pietro <span className="text-garfield-600">Garfield</span>
                      </div>
                      <div className="text-[0.6rem] font-black uppercase tracking-widest text-slate-400 mt-1 truncate">
                        SEO & IA Architect
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Search Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative mb-8"
                >
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="¿Qué quieres aprender hoy?"
                    className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-5 pl-14 pr-6 text-sm font-bold placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-garfield-500 transition-all outline-none shadow-sm"
                  />
                </motion.div>

                {/* Navigation Sections */}
                <div className="grid grid-cols-1 gap-3 mb-10">
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                    <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-white rounded-2xl shadow-sm text-slate-900 group-hover:text-garfield-600 transition-colors">
                          <Home size={20} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Inicio</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-garfield-600 transition-all group-hover:translate-x-1" />
                    </Link>
                  </motion.div>

                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + (idx * 0.1) }}
                    >
                      <Link to={item.path} onClick={() => setIsOpen(false)} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-white rounded-2xl shadow-sm text-slate-900 group-hover:text-garfield-600 transition-colors">
                            {item.label === 'SEO' ? <Sparkles size={20} /> : <Zap size={20} />}
                          </div>
                          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">{item.label}</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-300 group-hover:text-garfield-600 transition-all group-hover:translate-x-1" />
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}>
                    <Link to="/author/pietro-fiorillo" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-100 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-white rounded-2xl shadow-sm text-slate-900 group-hover:text-garfield-600 transition-colors">
                          <User size={20} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Sobre Mí</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-garfield-600 transition-all group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </div>

                {/* Social and Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-auto border-t border-slate-100 pt-8"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-3">
                      <a href="#" className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <Linkedin size={20} />
                      </a>
                      <a href="#" className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                        <Twitter size={20} />
                      </a>
                    </div>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-garfield-600 flex items-center gap-2">
                      Consultoría <ArrowRight size={14} />
                    </Link>
                  </div>

                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 w-full bg-slate-900 py-5 rounded-3xl text-white font-black uppercase tracking-[0.2em] text-[0.7rem] shadow-2xl shadow-slate-900/10 active:scale-95 transition-all"
                  >
                    <MessageSquare size={18} />
                    Agendar una llamada
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING MOBILE NAV BAR - Hidden when menu is open */}
      <nav className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-md h-16 bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] lg:hidden flex items-center justify-around px-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 transition-all duration-300 ${isOpen ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <Link to="/" className={`flex flex-col items-center justify-center gap-1 transition-all ${location.pathname === '/' ? 'text-garfield-400' : 'text-slate-400 active:scale-90 hover:text-white'}`}>
          <Home size={20} strokeWidth={location.pathname === '/' ? 3 : 2} />
          <span className="text-[0.55rem] font-black uppercase tracking-widest">Inicio</span>
        </Link>
        <Link to="/category/seo" className={`flex flex-col items-center justify-center gap-1 transition-all ${location.pathname === '/category/seo' ? 'text-garfield-400' : 'text-slate-400 active:scale-90 hover:text-white'}`}>
          <Sparkles size={20} strokeWidth={location.pathname === '/category/seo' ? 3 : 2} />
          <span className="text-[0.55rem] font-black uppercase tracking-widest">SEO</span>
        </Link>
        <Link
          to="/write"
          className="relative -top-8 flex h-16 w-16 items-center justify-center rounded-[2rem] bg-garfield-500 text-white shadow-2xl shadow-garfield-500/40 transition-all hover:scale-110 active:scale-90"
        >
          <Zap size={28} fill="currentColor" />
        </Link>
        <Link to="/category/ia" className={`flex flex-col items-center justify-center gap-1 transition-all ${location.pathname === '/category/ia' ? 'text-garfield-400' : 'text-slate-400 active:scale-90 hover:text-white'}`}>
          <Zap size={20} strokeWidth={location.pathname === '/category/ia' ? 3 : 2} />
          <span className="text-[0.55rem] font-black uppercase tracking-widest">IA</span>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className={`flex flex-col items-center justify-center gap-1 transition-all ${isOpen ? 'text-garfield-400' : 'text-slate-400 active:scale-90 hover:text-white'}`}
        >
          <Menu size={20} strokeWidth={isOpen ? 3 : 2} />
          <span className="text-[0.55rem] font-black uppercase tracking-widest">Más</span>
        </button>
      </nav>

      {/* Spacer */}
      <div className="h-[80px] sm:h-[100px]"></div>
    </>
  );
};

export default Navbar;