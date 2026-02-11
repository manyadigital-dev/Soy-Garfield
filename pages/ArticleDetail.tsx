import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../types';
import ArticleCard from '../components/ArticleCard';
import { getArticleBySlug, getArticles } from '../services/articleService';
import { Clock, Calendar, Linkedin, Twitter, Facebook, Bookmark, ArrowRight, List, Download, CheckCircle2, ChevronRight, MessageSquare, Quote, Loader2, Tag } from 'lucide-react';
import pietroPhoto from '../assets/pietro.png';
import SEO from '../components/SEO';
import { PortableText } from '@portabletext/react';
import { urlFor } from '../services/sanity';

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mt-12 mb-6 tracking-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl lg:text-2xl font-black text-slate-900 mt-10 mb-4 tracking-tight">{children}</h3>,
    normal: ({ children }: any) => <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">{children}</p>,
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
      <blockquote className="my-16 px-8 sm:px-12 py-14 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] group">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 bg-garfield-500 rounded-full opacity-20 blur-[60px] transition-all group-hover:opacity-30 group-hover:scale-110"></div>
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-40 w-40 bg-indigo-500 rounded-full opacity-10 blur-[60px]"></div>
        <span className="absolute -top-6 -left-2 text-[12rem] font-serif leading-none text-white/5 select-none pointer-events-none">“</span>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-garfield-500/10 border border-garfield-500/20 flex items-center justify-center text-garfield-500 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
              <Quote size={24} fill="currentColor" />
            </div>
            <div className="h-px flex-grow bg-white/10"></div>
          </div>
          <p className="text-lg sm:text-xl font-bold italic leading-relaxed mb-6 text-slate-100/90 tracking-tight">"{value.text}"</p>
          {value.author && (
            <footer className="flex items-center gap-4">
              <div className="h-0.5 w-8 bg-garfield-500 rounded-full"></div>
              <cite className="text-garfield-400 font-black uppercase tracking-[0.3em] text-[0.65rem] not-italic">{value.author}</cite>
            </footer>
          )}
        </div>
      </blockquote>
    ),
    checklist: ({ value }: any) => (
      <div className="space-y-4 my-8">
        {value.items.map((item: string, i: number) => (
          <div key={i} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 items-center transition-all hover:bg-white hover:shadow-lg">
            <div className="h-8 w-8 rounded-full bg-garfield-500 flex items-center justify-center shadow-lg text-white">
              <CheckCircle2 size={18} />
            </div>
            <span className="text-sm font-bold text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    ),
    codeBlock: ({ value }: any) => (
      <div className="my-8 bg-slate-900 rounded-3xl p-8 font-mono text-sm text-garfield-400 overflow-x-auto shadow-2xl">
        <pre><code>{value.code}</code></pre>
      </div>
    ),
    table: ({ value }: any) => (
      <div className="my-12 overflow-hidden border border-slate-100 rounded-[2.5rem] shadow-xl">
        <table className="w-full text-left border-collapse">
          <tbody>
            {value.rows.map((row: any, i: number) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                {row.cells.map((cell: string, j: number) => (
                  row.isHeader ? (
                    <th key={j} className="p-5 text-[0.65rem] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                      {cell}
                    </th>
                  ) : (
                    <td key={j} className="p-5 text-sm font-bold text-slate-700 border-b border-slate-100">
                      {cell}
                    </td>
                  )
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
    cta: ({ value }: any) => (
      <div className="my-16 bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 bg-garfield-500 rounded-full opacity-10 blur-3xl transition-all group-hover:opacity-20"></div>
        <div className="relative z-10">
          <h4 className="text-3xl font-black mb-4 leading-tight">{value.title}</h4>
          <p className="text-slate-400 font-medium mb-10 max-w-xl">{value.text}</p>
          <a
            href={value.url}
            className="inline-flex items-center gap-3 bg-garfield-500 hover:bg-white hover:text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-garfield-500/20 active:scale-95"
          >
            {value.buttonText} <ArrowRight size={18} />
          </a>
        </div>
      </div>
    ),
    newsletter: ({ value }: any) => (
      <div className="my-12 bg-garfield-50 rounded-[2.5rem] p-10 border border-garfield-100">
        <h4 className="text-xl font-black text-slate-900 mb-2">{value.title || 'Estrategia Semanal'}</h4>
        <p className="text-xs text-garfield-600 font-bold mb-8 uppercase tracking-widest">{value.description || 'Únete a +75,000 lectores'}</p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input type="email" placeholder="Email profesional" className="flex-grow bg-white border-transparent rounded-2xl px-6 py-4 text-xs font-bold focus:ring-2 focus:ring-garfield-500 outline-none shadow-sm" />
          <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-[0.6rem] font-black uppercase tracking-[0.2em] hover:bg-garfield-600 transition-colors shadow-xl">Suscribirse</button>
        </form>
      </div>
    ),
    youtube: ({ value }: any) => {
      const url = value.url;
      const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
      };
      const id = getYouTubeId(url);
      if (!id) return null;
      return (
        <div className="my-12 aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    },
    divider: ({ value }: any) => {
      if (value.style === 'dots') {
        return <div className="my-16 flex justify-center gap-3 text-slate-200"><div className="h-1.5 w-1.5 rounded-full bg-current"></div><div className="h-1.5 w-1.5 rounded-full bg-current"></div><div className="h-1.5 w-1.5 rounded-full bg-current"></div></div>;
      }
      if (value.style === 'gradient') {
        return <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-garfield-500/30 to-transparent"></div>;
      }
      return <div className="my-16 h-px w-full bg-slate-100"></div>;
    }
  }
};

const calculateReadTime = (content: any[]): string => {
  if (!content || !Array.isArray(content)) return '3 min de lectura';

  // Count words in normal text blocks
  let wordCount = 0;
  content.forEach(block => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((span: any) => {
        if (span.text) {
          wordCount += span.text.split(/\s+/).length;
        }
      });
    }
  });

  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min de lectura`;
};

const ArticleDetail: React.FC = () => {
  const { id } = useParams(); // URL param is 'id' but it's the slug
  const [articleData, setArticleData] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [sidebarArticles, setSidebarArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getArticleBySlug(id);
        setArticleData(data);

        if (data) {
          const allArticles = await getArticles();
          setRelatedArticles(allArticles.filter(a => a.category === data.category && a.slug !== id).slice(0, 2));
          setSidebarArticles(allArticles.filter(a => a.slug !== id).slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-garfield-500" size={48} />
      </div>
    );
  }

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
  const isoDate = articleData.date; // Sanity returns YYYY-MM-DD
  const displayReadTime = articleData.readTime || calculateReadTime(articleData.content as any[]);
  const authorLink = articleData.authorSlug ? `/author/${articleData.authorSlug}` : '/about';

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": articleData.category,
        "item": `${baseUrl}/category/${articleData.category.toLowerCase()}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": articleData.title,
        "item": `${baseUrl}/article/${articleData.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": articleData.seoTitle || articleData.title,
    "image": articleData.imageUrl,
    "author": {
      "@type": "Person",
      "name": articleData.author,
      "url": `${baseUrl}${authorLink}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Soy Garfield",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/assets/pietro.png`
      }
    },
    "datePublished": isoDate,
    "dateModified": articleData.modifiedDate || isoDate,
    "description": articleData.seoDescription || articleData.excerpt,
    "isAccessibleForFree": "True",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/article/${articleData.slug}`
    }
  };

  const combinedSchema = [articleSchema, breadcrumbSchema];

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const shareOnX = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(articleData.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(articleData.title);
    window.open(`https://api.whatsapp.com/send?text=${text}%20${url}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <SEO
        title={articleData.seoTitle || articleData.title}
        description={articleData.seoDescription || articleData.excerpt}
        image={articleData.imageUrl}
        article={true}
        author={articleData.author}
        date={isoDate}
        modifiedDate={isoDate}
        category={articleData.category}
        schemaData={combinedSchema}
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
                  <span>{displayReadTime}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.15] mb-8 lg:mb-10 tracking-tight">
                {articleData.title}
              </h1>

              {articleData.tags && articleData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {articleData.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-[0.6rem] font-black text-slate-500 uppercase tracking-widest border border-slate-200">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-y border-slate-100 py-6">
                <Link to={authorLink} className="flex items-center gap-5 group">
                  <div className="h-12 w-12 rounded-2xl bg-garfield-100 overflow-hidden ring-4 ring-slate-50 shadow-inner transition-transform group-hover:scale-110">
                    <img src={articleData.authorImage || pietroPhoto} alt={articleData.author} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-900 uppercase tracking-[0.1em] leading-none mb-1.5 group-hover:text-garfield-600 transition-colors">{articleData.author}</div>
                    <div className="flex items-center gap-2 text-[0.6rem] text-slate-400 font-black uppercase tracking-widest">
                      <Calendar size={12} />
                      <span>{articleData.date}</span>
                    </div>
                  </div>
                </Link>

                <div className="flex items-center gap-2 p-1.5 bg-slate-50/50 rounded-2xl border border-slate-100">
                  <button onClick={shareOnFacebook} className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#1877F2] rounded-xl transition-all" title="Compartir en Facebook">
                    <Facebook size={16} />
                  </button>
                  <button onClick={shareOnLinkedIn} className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0A66C2] rounded-xl transition-all" title="Compartir en LinkedIn">
                    <Linkedin size={16} />
                  </button>
                  <button
                    onClick={shareOnWhatsApp}
                    className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#25D366] rounded-xl transition-all"
                    title="Compartir en WhatsApp"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={shareOnX}
                    className="h-9 w-9 flex items-center justify-center text-slate-400 hover:text-white hover:bg-black rounded-xl transition-all"
                    title="Compartir en X"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </button>
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
              <PortableText value={articleData.content as any} components={portableTextComponents} />

              <div className="my-16 py-12 border-y border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Feedback</span>
                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">¿Te ha gustado este artículo?</h4>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  {/* Share Group */}
                  <div className="flex items-center bg-slate-50 border border-slate-100 p-1.5 rounded-2xl shadow-sm">
                    <button
                      onClick={shareOnX}
                      className="h-11 w-11 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-black transition-all"
                      title="Compartir en X"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </button>
                    <button
                      onClick={shareOnLinkedIn}
                      className="h-11 w-11 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-[#0A66C2] transition-all"
                      title="Compartir en LinkedIn"
                    >
                      <Linkedin size={18} />
                    </button>
                    <button
                      onClick={shareOnWhatsApp}
                      className="h-11 w-11 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-[#25D366] transition-all"
                      title="Compartir en WhatsApp"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    </button>
                  </div>

                  {/* CTA Group */}
                  <Link
                    to="/contact"
                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-slate-900 text-white text-[0.65rem] font-black uppercase tracking-widest hover:bg-garfield-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
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
                <Link to={authorLink} className="h-32 w-32 rounded-[2.5rem] bg-white/10 p-2 flex-shrink-0 transition-transform group-hover:rotate-6 overflow-hidden block">
                  <img
                    src={articleData.authorImage || pietroPhoto}
                    alt={articleData.author}
                    className="h-full w-full rounded-[2rem] object-cover"
                  />
                </Link>
                <div>
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-garfield-400 mb-3 block">{articleData.authorRole || 'Experto en Marketing Digital e IA'}</span>
                  <Link to={authorLink} className="text-3xl font-black mb-4 leading-none block hover:text-garfield-500 transition-colors">{articleData.author}</Link>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-xl">
                    {articleData.authorBio || 'Consultor estratégico ayudando a empresas a navegar la transición hacia un futuro impulsado por la inteligencia artificial. Especialista en SEO técnico y automatización inteligente.'}
                  </p>
                  <Link to={authorLink} className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-white hover:text-garfield-500 transition-all">
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
