import fs from 'fs';
import path from 'path';

const projectId = 'f3fmo00w';
const dataset = 'production';
const apiVersion = '2024-02-10';
const baseUrl = 'https://soygarfield.com';

async function generate() {
  console.log('Fetching dynamic content from Sanity for sitemap...');

  const query = encodeURIComponent(`{
    "articles": *[_type == "article"] | order(date desc) {
      "slug": slug.current,
      "lastmod": _updatedAt,
      title,
      "imageUrl": mainImage.asset->url
    },
    "authors": *[_type == "author"] {
      "slug": slug.current,
      "lastmod": _updatedAt
    },
    "glossary": *[_type == "glossaryTerm"] {
      "slug": slug.current,
      "lastmod": _updatedAt
    }
  }`);

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.result) {
      throw new Error('No result from Sanity API');
    }

    const { articles, authors, glossary } = data.result;

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Core Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/glosario</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/authors</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>2026-02-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/write</loc>
    <lastmod>2026-02-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Categories -->
  <url>
    <loc>${baseUrl}/category/seo</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/category/ia</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Dynamic Authors -->
  ${authors.map(author => `
  <url>
    <loc>${baseUrl}/author/${author.slug}</loc>
    <lastmod>${author.lastmod ? author.lastmod.split('T')[0] : '2026-02-11'}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}

  <!-- Dynamic Glossary from Sanity -->
  ${glossary.map(term => `
  <url>
    <loc>${baseUrl}/glosario/${term.slug}</loc>
    <lastmod>${term.lastmod ? term.lastmod.split('T')[0] : '2026-02-11'}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}

  <!-- Dynamic Articles from Sanity -->
  ${articles.map(article => `
  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${article.lastmod ? article.lastmod.split('T')[0] : '2026-02-11'}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    ${article.imageUrl ? `
    <image:image>
      <image:loc>${article.imageUrl}</image:loc>
      <image:title>${article.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>
    </image:image>` : ''}
  </url>`).join('')}

  <!-- Legal -->
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>2026-02-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>2026-02-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml);
    console.log('Sitemap.xml generated successfully:');
    console.log(`- ${articles.length} articles`);
    console.log(`- ${authors.length} authors`);
  } catch (error) {
    console.error('Error generating sitemap:', error.message);
    process.exit(1);
  }
}

generate();
