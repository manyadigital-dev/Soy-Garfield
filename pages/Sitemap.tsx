import React from 'react';
import { Link } from 'react-router-dom';
import { Map, FileText, Tag, User } from 'lucide-react';

const Sitemap: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Mapa del Medio</h1>
          <p className="text-slate-500">Explora la estructura completa de nuestro centro de inteligencia.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Pages */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-garfield-100 rounded-lg text-garfield-600">
                <Map size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Páginas Principales</h2>
            </div>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-600 hover:text-garfield-600 font-medium block">Inicio</Link></li>
              <li><Link to="/glosario" className="text-slate-600 hover:text-garfield-600 font-medium block">Diccionario Digital</Link></li>
              <li><Link to="/authors" className="text-slate-600 hover:text-garfield-600 font-medium block">Nuestro Equipo</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-garfield-600 font-medium block">Contacto</Link></li>
              <li><Link to="/write" className="text-slate-600 hover:text-garfield-600 font-medium block">Escribe para nosotros</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Tag size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Categorías</h2>
            </div>
            <ul className="space-y-4">
              <li><Link to="/category/seo" className="text-slate-600 hover:text-garfield-600 font-medium block">SEO</Link></li>
              <li><Link to="/category/ia" className="text-slate-600 hover:text-garfield-600 font-medium block">IA (Inteligencia Artificial)</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                <FileText size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Legal</h2>
            </div>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-slate-600 hover:text-garfield-600 font-medium block">Política de Privacidad</Link></li>
              <li><Link to="/terms" className="text-slate-600 hover:text-garfield-600 font-medium block">Términos de Servicio</Link></li>
            </ul>
          </div>

          {/* Socials (External) */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                <User size={24} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Conecta</h2>
            </div>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-600 hover:text-garfield-600 font-medium block">Twitter</a></li>
              <li><a href="#" className="text-slate-600 hover:text-garfield-600 font-medium block">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;