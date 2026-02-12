import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlossaryTerm, getGlossaryTerms } from '../services/glossaryService';
import { Book, Search, ArrowRight, Loader2, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const categories = [
    'Todos',
    'SEO',
    'IA',
    'Marketing Digital',
    'Desarrollo Web',
    'E-commerce',
    'Social Media',
    'Publicidad Online'
];

const Glossary: React.FC = () => {
    const [terms, setTerms] = useState<GlossaryTerm[]>([]);
    const [filteredTerms, setFilteredTerms] = useState<GlossaryTerm[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const data = await getGlossaryTerms();
                setTerms(data);
                setFilteredTerms(data);
            } catch (error) {
                console.error("Error fetching glossary terms:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTerms();
    }, []);

    useEffect(() => {
        const results = terms.filter(term => {
            const matchesSearch = term.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                term.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'Todos' || term.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
        setFilteredTerms(results);
    }, [searchTerm, terms, activeCategory]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <Loader2 className="animate-spin text-garfield-500 mx-auto mb-4" size={48} />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando Diccionario...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            <SEO
                title="Glosario Digital | SEO, IA y Marketing Digital"
                description="Domina los conceptos clave de SEO, Inteligencia Artificial y Marketing Digital con nuestro glosario ordenado y actualizado."
            />

            {/* Hero Section */}
            <section className="bg-slate-50 border-b border-slate-100 py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-24 -mr-24 h-96 w-96 bg-garfield-500/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-96 w-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-slate-200 text-garfield-600 text-[0.7rem] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
                            <Book size={14} /> Diccionario Digital Exponencial
                        </span>
                        <h1 className="text-5xl lg:text-8xl font-black text-slate-900 mb-8 tracking-tight leading-[0.9]">
                            Glosario <br /><span className="text-garfield-500">Multimedia</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
                            Domina el lenguaje de la era digital. Desde fundamentales de <span className="text-slate-900 font-bold">SEO</span> hasta lo último en <span className="text-slate-900 font-bold">Inteligencia Artificial</span> y Estrategia.
                        </p>

                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-garfield-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Busca un término (ej: ChatGPT, Backlink, ROI...)"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white border border-slate-200 rounded-[2rem] px-16 py-6 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-garfield-500/10 focus:border-garfield-500 outline-none shadow-2xl shadow-slate-200/50 transition-all font-bold text-lg"
                                />
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-garfield-500 transition-colors" size={28} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter Bar */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 active:scale-95 ${activeCategory === cat
                                        ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20'
                                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Terms Grid */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                {filteredTerms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTerms.map((term, idx) => (
                            <motion.div
                                key={term.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                            >
                                <Link
                                    to={`/glosario/${term.slug}`}
                                    className="group flex flex-col h-full p-10 rounded-[3rem] bg-white border border-slate-100 hover:border-garfield-200 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ArrowRight className="text-garfield-500 translate-x-4 group-hover:translate-x-0 transition-transform duration-500" size={24} />
                                    </div>

                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-2xl group-hover:bg-garfield-500 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                                            {term.title.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="px-3 py-1 rounded-lg bg-slate-50 text-[0.6rem] font-black uppercase tracking-widest text-slate-400 group-hover:text-garfield-600 group-hover:bg-garfield-50 transition-colors">
                                            {term.category || 'SEO'}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-garfield-600 transition-colors tracking-tight">
                                        {term.title}
                                    </h3>
                                    <p className="text-slate-500 text-[0.95rem] leading-relaxed line-clamp-3 font-medium mb-8">
                                        {term.excerpt}
                                    </p>

                                    <div className="mt-auto flex items-center gap-2 text-garfield-500 font-black uppercase tracking-widest text-[0.65rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        Leer definición completa <ChevronRight size={14} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-slate-50 rounded-[4rem] border border-dashed border-slate-200">
                        <div className="h-24 w-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200 shadow-sm">
                            <Search size={40} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">No encontramos nada...</h3>
                        <p className="text-slate-500 font-bold max-w-sm mx-auto">Prueba con otros términos o cambia la categoría de búsqueda.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setActiveCategory('Todos') }}
                            className="mt-8 text-garfield-500 font-black uppercase tracking-widest text-xs border-b-2 border-garfield-200 hover:border-garfield-500 transition-all"
                        >
                            Ver todo el glosario
                        </button>
                    </div>
                )}
            </section>

            {/* Newsletter CTA */}
            <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 bg-garfield-500 rounded-full opacity-10 blur-[100px] transition-all group-hover:opacity-20 group-hover:scale-110"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 bg-indigo-500 rounded-full opacity-10 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="text-center lg:text-left">
                            <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight leading-none">Únete a la <span className="text-garfield-500">vanguardia</span> digital</h2>
                            <p className="text-slate-400 text-lg font-medium max-w-xl">Recibe semanalmente análisis de IA, hacks de SEO y marketing que sí funcionan directamente en tu inbox.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <Link to="/contact" className="bg-garfield-500 hover:bg-white hover:text-slate-900 text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-garfield-500/20 active:scale-95 text-center">
                                Suscribirme ahora
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Glossary;
