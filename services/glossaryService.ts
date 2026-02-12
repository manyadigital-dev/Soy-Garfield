import { client } from './sanity';

export interface GlossaryTerm {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: any;
  seoTitle?: string;
  seoDescription?: string;
}

export const getGlossaryTerms = async (): Promise<GlossaryTerm[]> => {
  const query = `*[_type == "glossaryTerm"] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    category,
    excerpt
  }`;
  return client.fetch(query);
};

export const getGlossaryTermBySlug = async (slug: string): Promise<GlossaryTerm | null> => {
  const query = `*[_type == "glossaryTerm" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    category,
    excerpt,
    content,
    seoTitle,
    seoDescription
  }`;
  return client.fetch(query, { slug });
};
