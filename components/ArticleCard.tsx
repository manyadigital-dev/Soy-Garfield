import React from 'react';
import { Article } from '../types';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <Link
        to={`/article/${article.slug}`}
        className="group flex gap-4 items-center py-5 border-b border-gray-100 last:border-0 active:bg-slate-50 transition-colors px-2 rounded-xl -mx-2"
      >
        <div className="flex-1 min-w-0">
          <span className="text-[0.65rem] font-black text-garfield-600 uppercase tracking-widest mb-1 block">
            {article.category}
          </span>
          <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-garfield-600 transition-colors line-clamp-2 mb-1">
            {article.title}
          </h3>
          <div className="flex items-center gap-2 text-[0.7rem] text-slate-400 font-medium">
            <span>{article.date}</span>
          </div>
        </div>
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
          <img
            src={article.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=500'}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/article/${article.slug}`}
      className="group flex flex-col bg-white h-full rounded-3xl overflow-hidden border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={article.imageUrl || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000'}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[0.65rem] font-black text-slate-900 shadow-lg uppercase tracking-widest">
            {article.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="mb-3 flex items-center gap-2 text-[0.7rem] text-slate-400 font-bold uppercase tracking-widest">
          <span className="text-garfield-600">{article.category}</span>
          <span className="w-1 h-1 rounded-full bg-slate-200"></span>
          <span>{article.date}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-tight group-hover:text-garfield-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-medium">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-garfield-500 overflow-hidden ring-2 ring-white flex items-center justify-center font-black text-[0.5rem]">
              {article.authorImage ? (
                <img src={article.authorImage} alt={article.author} className="h-full w-full object-cover" />
              ) : (
                <span className="text-white">{article.author?.charAt(0)}</span>
              )}
            </div>
            <span className="text-xs font-bold text-slate-900">{article.author}</span>
          </div>
          <div className="flex items-center gap-1.5 text-garfield-600 text-[0.7rem] font-black uppercase tracking-widest bg-garfield-50 px-3 py-1.5 rounded-full group-hover:bg-garfield-500 group-hover:text-white transition-all">
            <Clock size={14} />
            <span>{article.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;