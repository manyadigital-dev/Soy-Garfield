import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ContentBlock } from '../types';
import ArticleCard from '../components/ArticleCard';
import { ARTICLES, getArticleById } from '../data/articles';
import { Clock, Calendar, Linkedin, Twitter, Facebook, Bookmark, ArrowRight, List, Download, CheckCircle2, ChevronRight, MessageSquare, Quote } from 'lucide-react';
import pietroPhoto from '../assets/pietro.png';
import SEO from '../components/SEO';

const ContentRenderer: React.FC<{ blocks: ContentBlock[] }> = ({ blocks }) => {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={index} className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">{block.text}</p>;

          case 'heading':
            if (block.level === 2) {
              return <h2 key={index} className="text-2xl lg:text-3xl font-black text-slate-900 mt-12 mb-6 tracking-tight">{block.text}</h2>;
            }
            return <h3 key={index} className="text-xl lg:text-2xl font-black text-slate-900 mt-10 mb-4 tracking-tight">{block.text}</h3>;

          case 'quote':
            return (
              <blockquote key={index} className="my-16 px-8 sm:px-12 py-14 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group">
                {/* Decorative background glass elements */}
                <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 bg-garfield-500 rounded-full opacity-20 blur-[60px] transition-all group-hover:opacity-30 group-hover:scale-110"></div>
                <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-40 w-40 bg-indigo-500 rounded-full opacity-10 blur-[60px]"></div>

                {/* Large decorative quotation mark */}
                <span className="absolute -top-6 -left-2 text-[12rem] font-serif leading-none text-white/5 select-none pointer-events-none">“</span>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-garfield-500/10 border border-garfield-500/20 flex items-center justify-center text-garfield-500 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                      <Quote size={24} fill="currentColor" />
                    </div>
                    <div className="h-px flex-grow bg-white/10"></div>
                  </div>

                  <p className="text-lg sm:text-xl font-bold italic leading-relaxed mb-6 text-slate-100/90 tracking-tight">
                    "{block.text}"
                  </p>

                  {block.author && (
                    <footer className="flex items-center gap-4">
                      <div className="h-0.5 w-8 bg-garfield-500 rounded-full"></div>
                      <cite className="text-garfield-400 font-black uppercase tracking-[0.3em] text-[0.65rem] not-italic">
                        {block.author}
                      </cite>
                    </footer>
                  )}
                </div>
              </blockquote>
            );

          case 'list':
            return (
              <ul key={index} className="space-y-4 my-8 list-none">
                {block.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="h-2 w-2 rounded-full bg-garfield-500 mt-2 flex-shrink-0" />
                    <span className="text-lg text-slate-600 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'table':
            return (
              <div key={index} className="my-10 bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-slate-200">
                        {block.headers.map((header, i) => (
                          <th key={i} className="py-3 font-black uppercase tracking-widest text-[0.6rem]">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, i) => (
                        <tr key={i} className="border-b border-slate-100 last:border-0">
                          {row.map((cell, j) => (
                            <td key={j} className={`py-4 font-bold ${j === 1 && cell.includes('-') ? 'text-red-500' : j === 1 && cell.includes('+') ? 'text-green-500' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case 'checklist':
            return (
              <div key={index} className="space-y-4 my-8">
                {block.items.map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 items-center transition-all hover:bg-white hover:shadow-lg">
                    <div className="h-8 w-8 rounded-full bg-garfield-500 flex items-center justify-center shadow-lg text-white">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            );

          case 'code':
            return (
              <div key={index} className="my-8 bg-slate-900 rounded-3xl p-8 font-mono text-sm text-garfield-400 overflow-x-auto shadow-2xl">
                <pre><code>{block.code}</code></pre>
              </div>
            );

          case 'image':
            return (
              <figure key={index} className="my-12">
                <img src={block.url} alt={block.caption || ''} className="w-full rounded-[2.5rem] shadow-xl" />
                {block.caption && <figcaption className="mt-4 text-center text-sm text-slate-400 font-medium italic">{block.caption}</figcaption>}
              </figure>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

const ArticleDetail: React.FC = () => {
  const { id } = useParams();
  const articleData = getArticleById(id);

  const relatedArticles = ARTICLES.filter(a => a.category === articleData?.category && a.id !== id).slice(0, 2);
  const sidebarArticles = ARTICLES.filter(a => a.id !== id).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!articleData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Artículo no encontrado</h2>
          <Link to="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[0.6rem] font-black uppercase tracking-widest hover:bg-garfield-600 transition-all">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const baseUrl = 'https://soygarfield.com';
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": articleData.title,
    "image": articleData.imageUrl.startsWith('http') ? articleData.imageUrl : `${baseUrl}${articleData.imageUrl}`,
    "author": {
      "@type": "Person",
      "name": articleData.author,
      "url": "https://soygarfield.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Soy Garfield",
      "logo": {
        "@type": "ImageObject",
        "url": "https://soygarfield.com/assets/pietro.png"
      }
    },
    "datePublished": articleData.date,
    "description": articleData.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://soygarfield.com/article/${articleData.id}`
    }
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(articleData.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <SEO
        title={articleData.title}
        description={articleData.excerpt}
        image={articleData.imageUrl}
        article={true}
        date={articleData.date}
        category={articleData.category}
        schemaData={articleSchema}
      />
      <div className="fixed top-0 left-0 w-full h-1.5 z-[150] bg-slate-100">
        <div className="h-full bg-garfield-500 w-1/3 transition-all duration-300 shadow-[0_0_10px_rgb(249,115,22,0.5)]"></div>
      </div>

      <div className="bg-slate-50/50 border-b border-slate-100 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link to="/" className="hover:text-garfield-600 transition-colors">Inicio</Link>
            <ChevronRight size={14} className="mx-3 opacity-30" />
            <Link to={`/category/${articleData.category.toLowerCase()}`} className="hover:text-garfield-600 transition-colors">{articleData.category}</Link>
            <ChevronRight size={14} className="mx-3 opacity-30 hidden sm:block" />
            <span className="text-slate-900 truncate max-w-[200px] hidden sm:block">{articleData.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          <div className="lg:col-span-8">
            <header className="mb-12 lg:mb-16">
              <div className="flex items-center gap-4 mb-8">
                <span className="inline-flex items-center rounded-full bg-garfield-500 px-5 py-2 text-[0.6rem] font-black text-white uppercase tracking-[0.2em] shadow-lg shadow-garfield-500/20">
                  {articleData.category}
                </span>
                <div className="flex items-center gap-2 text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <Clock size={16} />
                  <span>{articleData.readTime}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] mb-8 lg:mb-10 tracking-tight">
                {articleData.title}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-y border-slate-100 py-6">
                <Link to="/about" className="flex items-center gap-5 group">
                  <div className="h-12 w-12 rounded-2xl bg-garfield-100 overflow-hidden ring-4 ring-slate-50 shadow-inner transition-transform group-hover:scale-110">
                    <img src={pietroPhoto} alt={articleData.author} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 uppercase tracking-[0.1em] leading-none mb-1.5 group-hover:text-garfield-600 transition-colors">{articleData.author}</div>
                    <div className="flex items-center gap-2 text-[0.6rem] text-slate-400 font-black uppercase tracking-widest">
                      <Calendar size={12} />
                      <span>{articleData.date}</span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  <button onClick={shareOnTwitter} className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all border border-slate-100"><Twitter size={18} /></button>
                  <button onClick={shareOnLinkedIn} className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all border border-slate-100"><Linkedin size={18} /></button>
                  <button className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all border border-slate-100"><Facebook size={18} /></button>
                  <div className="h-6 w-px bg-slate-100 mx-2"></div>
                  <button className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-garfield-600 hover:bg-garfield-50 rounded-xl transition-all border border-slate-100"><Bookmark size={18} /></button>
                </div>
              </div>
            </header>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2.5rem] mb-12 shadow-2xl">
              <img
                src={articleData.imageUrl}
                alt={articleData.title}
                className="h-full w-full object-cover"
              />
            </div>

            <article className="max-w-none">
              <ContentRenderer blocks={articleData.content} />

              <div className="my-16 flex flex-col sm:flex-row items-center justify-center gap-4 py-12 border-y border-slate-100">
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest text-center sm:text-left">¿Te ha gustado este artículo?</span>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={shareOnLinkedIn}
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900 text-white text-[0.65rem] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                  >
                    <Linkedin size={16} />
                    Compartir en LinkedIn
                  </button>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 border-slate-900 text-slate-900 text-[0.65rem] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-95"
                  >
                    <MessageSquare size={16} />
                    Consultoría Pro
                  </Link>
                </div>
              </div>
            </article>

            {relatedArticles.length > 0 && (
              <div className="mt-24 pt-16 border-t border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-10 uppercase tracking-widest">Sigue leyendo sobre {articleData.category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {relatedArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-24 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 bg-garfield-500 rounded-full opacity-10 blur-3xl transition-all group-hover:opacity-20"></div>
              <div className="relative z-10 flex flex-col sm:flex-row gap-10 items-center text-center sm:text-left">
                <Link to="/about" className="h-32 w-32 rounded-[2.5rem] bg-white/10 p-2 flex-shrink-0 transition-transform group-hover:rotate-6 overflow-hidden block">
                  <img
                    src={pietroPhoto}
                    alt="Pietro Fiorillo"
                    className="h-full w-full rounded-[2rem] object-cover"
                  />
                </Link>
                <div>
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-garfield-400 mb-3 block">Experto en Marketing Digital e IA</span>
                  <Link to="/about" className="text-3xl font-black mb-4 leading-none block hover:text-garfield-500 transition-colors">Pietro Fiorillo</Link>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-xl">
                    Consultor estratégico ayudando a empresas a navegar la transición hacia un futuro impulsado por la inteligencia artificial. Especialista en SEO técnico y automatización inteligente.
                  </p>
                  <Link to="/about" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-white hover:text-garfield-500 transition-all">
                    Descubre mi trayectoria <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          <aside className="lg:col-span-4 space-y-12">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 bg-garfield-500 rounded-full opacity-20 blur-2xl"></div>
              <h4 className="text-2xl font-black mb-6 leading-tight">Impulsa tu negocio con IA</h4>
              <p className="text-sm text-slate-400 font-medium mb-10">Implementamos sistemas de agentes para dominar tu nicho de mercado.</p>
              <Link to="/contact" className="flex items-center justify-center gap-3 w-full bg-garfield-500 hover:bg-white hover:text-slate-900 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-garfield-500/20">
                <MessageSquare size={18} />
                Consultoría Pro
              </Link>
            </div>

            <div className="sticky top-32 space-y-12">
              <div>
                <h4 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                  <div className="h-1 w-12 bg-garfield-500"></div>
                  Destacados
                </h4>
                <div className="flex flex-col gap-3">
                  {sidebarArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="compact" />
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                <h4 className="text-lg font-black text-slate-900 mb-4">Estrategia Semanal</h4>
                <p className="text-xs text-slate-500 font-bold mb-8 uppercase tracking-widest">Únete a +75,000 lectores</p>
                <form className="space-y-4">
                  <input type="email" placeholder="Email profesional" className="w-full bg-white border-transparent rounded-2xl px-6 py-4 text-xs font-bold focus:ring-2 focus:ring-garfield-500 outline-none shadow-sm" />
                  <button className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[0.6rem] font-black uppercase tracking-[0.2em] hover:bg-garfield-600 transition-colors shadow-xl">Suscribirse</button>
                </form>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
