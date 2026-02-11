import { client } from './sanity';
import { Article } from '../types';

export const getArticles = async (): Promise<Article[]> => {
  const query = `*[_type == "article"] | order(date desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "author": author->name,
    "authorSlug": author->slug.current,
    "authorRole": author->role,
    "authorImage": author->image.asset->url,
    "authorBio": author->description,
    date,
    category,
    readTime,
    tags,
    "imageUrl": mainImage.asset->url,
    isFeatured,
    content
  }`;

  try {
    const results = await client.fetch(query);
    console.log('Sanity Fetch (getArticles) result count:', results.length);
    if (results.length > 0) {
      console.log('Latest Article:', results[0].title);
    }
    return results;
  } catch (err) {
    console.error('Sanity Fetch Error (getArticles):', err);
    return [];
  }
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "author": author->name,
    "authorSlug": author->slug.current,
    "authorRole": author->role,
    "authorImage": author->image.asset->url,
    "authorBio": author->description,
    "authorLinkedIn": author->socials.linkedin,
    "authorTwitter": author->socials.twitter,
    date,
    category,
    readTime,
    tags,
    "imageUrl": mainImage.asset->url,
    "seoTitle": coalesce(seoTitle, title),
    "seoDescription": coalesce(seoDescription, excerpt),
    "modifiedDate": _updatedAt,
    isFeatured,
    content
  }`;

  try {
    const result = await client.fetch(query, { slug });
    console.log('Sanity Fetch (getArticleBySlug) for slug:', slug, result ? 'Found' : 'Not Found');
    return result;
  } catch (err) {
    console.error('Sanity Fetch Error (getArticleBySlug):', err);
    return null;
  }
};
