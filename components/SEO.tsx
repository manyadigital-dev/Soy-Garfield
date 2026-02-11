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
    modifiedDate?: string;
    category?: string;
    schemaData?: any;
    keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    image,
    article,
    author = 'Pietro Fiorillo',
    date,
    modifiedDate,
    category,
    schemaData,
    keywords
}) => {
    const { pathname } = useLocation();
    const siteName = 'Soy Garfield';
    const siteSuffix = 'Divulgador SEO & IA';
    const fullBrandName = `${siteName} | ${siteSuffix}`;
    const baseUrl = 'https://soygarfield.com';
    const fullUrl = `${baseUrl}${pathname}`;

    const defaultDescription = 'Consultoría estratégica de SEO e Inteligencia Artificial. Domina el futuro digital con Pietro Fiorillo.';
    const defaultImage = `${baseUrl}/pietro-og.png`;

    // Branding logic:
    // 1. Home / No Title -> "Soy Garfield | Divulgador SEO & IA"
    // 2. Other pages -> "Title | Soy Garfield | Divulgador SEO & IA"
    const seoTitle = !title || title === siteName || title === fullBrandName
        ? fullBrandName
        : `${title} | ${fullBrandName}`;
    const seoDescription = description || defaultDescription;

    let seoImage = image || defaultImage;
    if (seoImage.startsWith('/')) {
        seoImage = `${baseUrl}${seoImage}`;
    } else if (!seoImage.startsWith('http')) {
        // Handle images that might be relative but not starting with /
        seoImage = `${baseUrl}/${seoImage}`;
    }

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="author" content={author} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="image" content={seoImage} />
            <link rel="canonical" href={fullUrl} />

            {/* Google Discover & News Optimization */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-image-preview:large" />
            <meta name="bingbot" content="index, follow, max-image-preview:large" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />
            <meta property="og:image:secure_url" content={seoImage} />
            <meta property="og:image:alt" content={seoTitle} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="es_ES" />

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
                    <meta property="article:author" content={author} />
                    {date && <meta property="article:published_time" content={date} />}
                    {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
                    {category && <meta property="article:section" content={category} />}
                    <meta property="og:type" content="article" />
                </>
            )}

            {/* Performance Hints */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="preconnect" href="https://images.unsplash.com" />

            {/* Preload hero image if it exists */}
            {seoImage && <link rel="preload" as="image" href={seoImage} />}

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
