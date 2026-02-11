import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Linkedin,
    Mail,
    Twitter,
    Instagram,
    ExternalLink,
    ArrowRight,
    FileText,
    Loader2
} from 'lucide-react';
import SEO from '../components/SEO';
import ArticleCard from '../components/ArticleCard';
import { Article } from '../types';
import { Author, getAuthorBySlug } from '../services/authorService';
import { getArticles } from '../services/articleService';
import { PortableText } from '@portabletext/react';

const AuthorDetail: React.FC = () => {
    const { slug } = useParams();
    const [author, setAuthor] = useState<Author | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            setLoading(true);
            try {
                const authorData = await getAuthorBySlug(slug);
                setAuthor(authorData);

                if (authorData) {
                    const allArticles = await getArticles();
                    setArticles(allArticles.filter(a => a.author === authorData.name));
                }
            } catch (error) {
                console.error("Error fetching author data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-garfield-500" size={48} />
            </div>
        );
    }

    if (!author) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Autor no encontrado</h2>
                    <Link to="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[0.6rem] font-black uppercase tracking-widest hover:bg-garfield-600 transition-all">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            <SEO
                title={author.seoTitle || `Sobre ${author.name}`}
                description={author.seoDescription || author.description}
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "ProfilePage",
                    "mainEntity": {
                        "@type": "Person",
                        "name": author.name,
                        "jobTitle": author.role,
                        "description": author.description || '',
                        "url": window.location.href,
                        "image": author.image || '',
                        "sameAs": [
                            author.socials?.linkedin,
                            author.socials?.twitter,
                            author.socials?.instagram
                        ].filter(Boolean)
                    }
                }}
            />

            {/* --- HERO SECTION --- */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-16 text-white shadow-2xl">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-garfield-500/10 blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="relative mb-8">
                            <div className="h-40 w-40 md:h-48 md:w-48 overflow-hidden rounded-full border-4 border-white shadow-2xl bg-garfield-500 flex items-center justify-center">
                                {author.image ? (
                                    <img
                                        src={author.image}
                                        alt={author.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-6xl font-black text-white">
                                        {author.name.charAt(0)}
                                    </span>
                                )}
                            </div>
                            <div className="mt-6 flex justify-center gap-4">
                                {author.socials?.linkedin && (
                                    <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10">
                                        <Linkedin size={20} />
                                    </a>
                                )}
                                {author.socials?.email && (
                                    <a href={`mailto:${author.socials.email}`} className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10">
                                        <Mail size={20} />
                                    </a>
                                )}
                                {author.socials?.instagram && (
                                    <a href={author.socials.instagram} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10">
                                        <Instagram size={20} />
                                    </a>
                                )}
                                {author.socials?.twitter && (
                                    <a href={author.socials.twitter} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10">
                                        <Twitter size={20} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{author.name}</h1>
                        <p className="text-xl md:text-2xl font-medium text-slate-300 mb-8 max-w-2xl">
                            {author.role}{author.description ? `. ${author.description}` : ''}
                        </p>

                        {author.skills && author.skills.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-3">
                                {author.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-slate-200 backdrop-blur-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* --- BIOGRAPHY --- */}
            {author.biography && (
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-12">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-4xl font-bold text-slate-900 font-serif">Biografía</h2>
                                <div className="h-1 w-24 bg-garfield-500 rounded-full"></div>
                            </div>
                            <div className="prose prose-xl prose-slate max-w-none text-slate-600 leading-relaxed">
                                <PortableText value={author.biography} />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* --- ARTICLES GRID --- */}
            {articles.length > 0 && (
                <section className="bg-slate-50 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <h2 className="text-4xl font-bold text-slate-900">Artículos de {author.name.split(' ')[0]}</h2>
                                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                                        {articles.length}
                                    </span>
                                </div>
                                <p className="text-lg text-slate-500">Perspectivas y análisis sobre el mundo digital.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {articles.map((article) => (
                                <ArticleCard key={article.id} article={article} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- EXTERNAL PUBLICATIONS --- */}
            {author.externalPublications && author.externalPublications.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 border-t border-slate-50">
                    <h2 className="text-3xl font-black text-slate-900 mb-12 tracking-tight">Otras publicaciones externas</h2>

                    <div className="grid gap-4 max-w-5xl">
                        {author.externalPublications.map((pub, i) => (
                            <a
                                key={i}
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between p-4 px-6 rounded-2xl bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:border-garfield-200 hover:shadow-xl hover:shadow-garfield-500/5 transition-all duration-300"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-lg group-hover:bg-garfield-500 transition-colors shadow-lg">
                                        {pub.medium.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-slate-900 transition-colors">{pub.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400 group-hover:text-garfield-500 transition-colors">{pub.medium}</span>
                                            {pub.date && (
                                                <>
                                                    <span className="text-slate-200">•</span>
                                                    <span className="text-[0.65rem] font-bold text-slate-400">{pub.date}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-slate-300 group-hover:text-garfield-500 transition-colors">
                                    <ExternalLink size={20} />
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* --- CONTACT CARDS --- */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {author.socials?.linkedin && (
                        <a
                            href={author.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-[2rem] bg-[#0077B5] p-10 text-white transition-transform hover:-translate-y-1 shadow-xl"
                        >
                            <div className="relative z-10">
                                <Linkedin size={48} className="mb-6 opacity-30" />
                                <h3 className="text-3xl font-bold mb-2">Conecta en LinkedIn</h3>
                                <p className="text-blue-100 mb-8 max-w-xs">Sígueme para ver actualizaciones diarias sobre estrategia digital y SEO.</p>
                                <span className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm">
                                    Seguir perfil <ArrowRight size={18} />
                                </span>
                            </div>
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-[60px]"></div>
                        </a>
                    )}

                    {author.socials?.instagram && (
                        <a
                            href={author.socials.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-10 text-white transition-transform hover:-translate-y-1 shadow-xl"
                        >
                            <div className="relative z-10">
                                <Instagram size={48} className="mb-6 opacity-30" />
                                <h3 className="text-3xl font-bold mb-2">Sígueme en Instagram</h3>
                                <p className="text-white/80 mb-8 max-w-xs">Un vistazo detrás de cámaras en proyectos y nomadismo digital.</p>
                                <span className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm">
                                    Seguir perfil <ArrowRight size={18} />
                                </span>
                            </div>
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-[60px]"></div>
                        </a>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AuthorDetail;
