import React from 'react';
import { Zap, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-garfield-500 text-white">
                < Zap size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Soy<span className="text-garfield-600">Garfield</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Impulsando el éxito de profesionales SEO y expertos en IA cada día.
              Diseñado para la web moderna con una estética premium.
            </p>
          </div>

          {/* Column 2: Publication */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-widest uppercase mb-6">Publicación</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Inicio</Link></li>
              <li><Link to="/category/seo" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">SEO</Link></li>
              <li><Link to="/category/ia" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Inteligencia Artificial</Link></li>
              <li><Link to="/authors" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Nuestro Equipo</Link></li>
              <li><Link to="/glosario" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Glosario SEO</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Contacto</Link></li>

            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-widest uppercase mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/sitemap" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Sitemap</Link></li>
              <li><Link to="/privacy" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Privacidad</Link></li>
              <li><Link to="/terms" className="text-sm text-slate-500 hover:text-garfield-600 transition-colors">Términos</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 tracking-widest uppercase mb-6">Conecta</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-slate-400 hover:text-garfield-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-garfield-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-garfield-500 transition-colors"><Github size={20} /></a>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs text-slate-500 mb-2 font-medium">Suscríbete a las novedades</p>
              <Link to="/write" className="text-xs font-bold text-garfield-600 hover:text-garfield-700 uppercase tracking-wide">
                Unirse a la Newsletter &rarr;
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} SoyGarfield. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;