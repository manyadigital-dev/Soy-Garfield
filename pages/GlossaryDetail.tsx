import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlossaryTerm, getGlossaryTermBySlug } from '../services/glossaryService';
import { urlFor } from '../services/sanity';
import { PortableText } from '@portabletext/react';
import { ChevronLeft, Share2, Book, Clock, Quote, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const portableTextComponents = {
    block: {
        h2: ({ children }: any) => <h2 className="text-3xl font-black text-slate-900 mt-16 mb-8 tracking-tight">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl font-black text-slate-800 mt-12 mb-6 tracking-tight">{children}</h3>,
        normal: ({ children }: any) => <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">{children}</p>,
    },
    list: {
        bullet: ({ children }: any) => <ul className="my-10 space-y-4 list-none">{children}</ul>,
        number: ({ children }: any) => <ol className="my-10 space-y-6 list-none [counter-reset:section]">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }: any) => (
            <li className="flex gap-4 text-xl text-slate-600 font-medium leading-relaxed group">
                <div className="flex-shrink-0 mt-2.5 h-2 w-2 rounded-full bg-garfield-500 shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-transform group-hover:scale-125"></div>
                <span>{children}</span>
            </li>
        ),
        number: ({ children }: any) => (
            <li className="flex gap-5 text-xl text-slate-600 font-medium leading-relaxed group [counter-increment:section]">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-garfield-50 text-garfield-500 font-black text-sm border border-garfield-100 shadow-sm transition-all group-hover:bg-garfield-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-garfield-500/20 group-hover:-translate-y-0.5">
                    <span className="before:content-[counter(section)]"></span>
                </div>
                <div className="pt-1">{children}</div>
            </li>
        ),
    },
    marks: {
        code: ({ children }: any) => (
            <code className="px-2 py-0.5 rounded-lg bg-orange-50 text-garfield-600 font-bold border border-orange-100/50 text-[0.9em]">
                {children}
            </code>
        ),
        link: ({ value, children }: any) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
            return (
                <a
                    href={value?.href}
                    target={target}
                    rel={target === '_blank' ? 'noindex nofollow' : undefined}
                    className="text-slate-900 font-bold underline decoration-garfield-500/30 underline-offset-4 hover:decoration-garfield-500 hover:text-garfield-600 transition-all"
                >
                    {children}
                </a>
            );
        },
    },
    types: {
        image: ({ value }: any) => {
            const imageUrl = urlFor(value)?.url();
            if (!imageUrl) return null;
            return (
                <figure className="my-12">
                    <img src={imageUrl} alt={value.alt || ''} className="w-full rounded-[2.5rem] shadow-xl" />
                    {value.caption && <figcaption className="mt-4 text-center text-sm text-slate-400 font-medium italic">{value.caption}</figcaption>}
                </figure>
            );
        },
        quote: ({ value }: any) => (
            <blockquote className="my-16 px-8 sm:px-12 py-14 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative shadow-[0_30px_60_rgba(0,0,0,0.3)] group">
                <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 bg-garfield-500 rounded-full opacity-20 blur-[60px] transition-all group-hover:opacity-30 group-hover:scale-110"></div>
                <span className="absolute -top-6 -left-2 text-[12rem] font-serif leading-none text-white/5 select-none pointer-events-none">“</span>
                <div className="relative z-10">
                    <p className="text-xl sm:text-2xl font-bold italic leading-relaxed mb-6 text-slate-100/90 tracking-tight">"{value.text}"</p>
                    {value.author && <cite className="text-garfield-400 font-black uppercase tracking-[0.3em] text-[0.65rem] not-italic text-right block">— {value.author}</cite>}
                </div>
            </blockquote>
        ),
        checklist: ({ value }: any) => (
            <div className="space-y-4 my-10">
                {value.items.map((item: string, i: number) => (
                    <div key={i} className="flex gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100 items-center transition-all hover:bg-white hover:shadow-xl">
                        <div className="h-10 w-10 rounded-full bg-garfield-500 flex items-center justify-center shadow-lg text-white">
                            <CheckCircle2 size={24} />
                        </div>
                        <span className="text-lg font-bold text-slate-700">{item}</span>
                    </div>
                ))}
            </div>
        ),
        codeBlock: ({ value }: any) => (
            <div className="my-12 relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-garfield-500/10 to-indigo-500/10 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="relative bg-[#0d1117] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                    <div className="flex items-center justify-between px-8 py-5 bg-white/5 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        {value.language && <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500">{value.language}</span>}
                    </div>
                    <div className="p-10 font-mono text-sm leading-relaxed text-slate-300 overflow-x-auto">
                        <pre><code>{value.code}</code></pre>
                    </div>
                </div>
            </div>
        ),
    }
};

const GlossaryDetail: React.FC = () => {
    const { slug } = useParams();
    const [term, setTerm] = useState<GlossaryTerm | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTerm = async () => {
            if (!slug) return;
            try {
                const data = await getGlossaryTermBySlug(slug);
                setTerm(data);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error fetching glossary term:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTerm();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-garfield-500" size={48} />
            </div>
        );
    }

    if (!term) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Término no encontrado</h2>
                    <Link to="/glosario" className="text-garfield-600 font-bold hover:underline">Volver al glosario</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-white">
            <SEO
                title={term.seoTitle || `${term.title} | Glosario Digital Soy Garfield`}
                description={term.seoDescription || term.excerpt}
                article={true}
            />

            {/* Sticky Share Bar Placeholder (Mirroring ArticleDetail UX) */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 md:hidden">
                <div className="flex items-center justify-between p-4">
                    <Link to="/glosario" className="flex items-center gap-2 text-sm font-black uppercase text-slate-900">
                        <ChevronLeft size={20} /> Diccionario
                    </Link>
                    <button className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>

            <header className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-24 pb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link
                        to="/glosario"
                        className="hidden md:inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-garfield-500 transition-colors mb-12"
                    >
                        <ChevronLeft size={16} /> Volver al Diccionario
                    </Link>

                    <div className="flex justify-center mb-8">
                        <div className="h-20 w-20 rounded-3xl bg-garfield-500 text-white flex items-center justify-center text-4xl font-black shadow-2xl shadow-garfield-500/40">
                            {term.title.charAt(0).toUpperCase()}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                        {term.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-2 bg-slate-50 text-slate-600 px-4 py-2 rounded-xl border border-slate-100">
                            <Book size={16} className="text-garfield-500" /> {term.category || 'SEO'}
                        </span>
                        <span className="flex items-center gap-2">
                            Diccionario Técnico
                        </span>
                    </div>
                </motion.div>
            </header>

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-24">
                <div className="prose-container">
                    <div className="mb-12 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 border-l-8 border-l-garfield-500 italic">
                        <p className="text-xl text-slate-700 font-bold leading-relaxed">
                            {term.excerpt}
                        </p>
                    </div>

                    <PortableText value={term.content} components={portableTextComponents} />
                </div>

                <div className="mt-20 pt-16 border-t border-slate-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-12 rounded-[3.5rem] bg-slate-900 text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 bg-garfield-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                        <div className="relative z-10 max-w-lg">
                            <h4 className="text-3xl font-black mb-4">¿Tienes dudas sobre SEO?</h4>
                            <p className="text-slate-400 font-medium">Contáctanos y te ayudaremos a escalar tus posiciones con estrategias de impacto real.</p>
                        </div>
                        <Link to="/contact" className="relative z-10 bg-garfield-500 hover:bg-white hover:text-slate-900 text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95 group/btn">
                            Hablemos <ArrowRight size={18} className="inline ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default GlossaryDetail;
