import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    article?: boolean;
    author?: string;
    date?: string;
    category?: string;
    schemaData?: any;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image,
    article,
    author = 'Pietro Fiorillo',
    date,
    category,
    schemaData
}) => {
    const { pathname } = useLocation();
    const siteName = 'Soy Garfield';
    const baseUrl = 'https://soygarfield.com'; // Change this to your actual domain
    const fullUrl = `${baseUrl}${pathname}`;

    const defaultDescription = 'Consultoría estratégica de SEO e Inteligencia Artificial. Domina el futuro digital con Pietro Fiorillo.';
    const defaultImage = `${baseUrl}/pietro-og.png`; // Fallback image

    const seoTitle = title ? `${title} | ${siteName}` : `${siteName} | SEO & IA Expert`;
    const seoDescription = description || defaultDescription;

    // Ensure image is an absolute URL
    let seoImage = image || defaultImage;
    if (seoImage.startsWith('/')) {
        seoImage = `${baseUrl}${seoImage}`;
    }

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="image" content={seoImage} />
            <link rel="canonical" href={fullUrl} />

            {/* Google Discover & News Optimization */}
            <meta name="robots" content="max-image-preview:large, index, follow" />
            <meta name="googlebot" content="max-image-preview:large" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:image:alt" content={seoTitle} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@pietrofiorillo" />
            <meta name="twitter:creator" content="@pietrofiorillo" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />
            <meta name="twitter:image:alt" content={seoTitle} />

            {/* Article Specific Tags */}
            {article && (
                <>
                    {author && <meta property="article:author" content={author} />}
                    {date && <meta property="article:published_time" content={date} />}
                    {category && <meta property="article:section" content={category} />}
                </>
            )}

            {/* Structured Data */}
            {schemaData ? (
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            ) : (
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": siteName,
                        "url": baseUrl,
                        "description": defaultDescription,
                        "publisher": {
                            "@type": "Person",
                            "name": "Pietro Fiorillo",
                            "jobTitle": "SEO & AI Architect",
                            "url": `${baseUrl}/about`,
                            "image": {
                                "@type": "ImageObject",
                                "url": `${baseUrl}/assets/pietro.png`
                            }
                        }
                    })}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
