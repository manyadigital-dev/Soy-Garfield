const fs = require('fs');

const terms = [
    {
        id: 'seo',
        title: '¿Qué es el SEO?',
        slug: 'seo',
        excerpt: 'El SEO (Search Engine Optimization) es la práctica de optimizar un sitio web para mejorar su visibilidad y posicionamiento en los resultados orgánicos de buscadores como Google.',
        content: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'El posicionamiento SEO es el proceso de aumentar la cantidad y la calidad del tráfico de un sitio web a través de resultados de motores de búsqueda no pagados. A diferencia del SEM, el SEO se enfoca en el crecimiento orgánico y la autoridad a largo plazo.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Para qué sirve el SEO' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Sirve para que tu negocio aparezca ante las personas que están buscando exactamente lo que ofreces. Incrementa la confianza de los usuarios, reduce los costes de adquisición de clientes y genera un flujo constante de visitas sin depender de la publicidad pagada.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Ejemplo práctico' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Si tienes una tienda de café de especialidad en Madrid, el SEO sirve para que cuando alguien busque "mejor café especialidad Madrid", tu web aparezca en la primera posición de Google.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Errores comunes' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Comprar enlaces de baja calidad, sobreoptimizar las palabras clave (keyword stuffing) o ignorar la experiencia de usuario en dispositivos móviles.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Relación con otros conceptos' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'El SEO está estrechamente ligado al SEO On-Page, SEO Off-Page y al SEO Técnico. También se diferencia del SEM, que se basa en publicidad de pago.' }] }
        ]
    },
    {
        id: 'seo-on-page',
        title: '¿Qué es el SEO On-Page?',
        slug: 'seo-on-page',
        excerpt: 'El SEO On-Page comprende todas las acciones de optimización que realizas dentro de tu propia página web para ayudar a los buscadores a entender tu contenido.',
        content: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Consiste en optimizar elementos internos como las etiquetas de título, las meta descripciones, los encabezados (H1, H2, H3), las imágenes y la estructura de las URLs. Todo esto con el fin de mejorar relevancia para ciertas palabras clave.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Para qué sirve el SEO On-Page' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Sirve para comunicarle a Google de qué trata exactamente cada página de tu sitio. Sin una buena optimización interna, el buscador podría no indexar correctamente tu contenido por los términos que te interesan.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Ejemplo práctico' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Asegurarte de que tu palabra clave principal esté en el H1 y en los primeros párrafos de tu artículo, además de optimizar el atributo ALT de tus imágenes.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Errores comunes' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'No tener etiquetas H1, tener títulos duplicados en varias páginas o usar imágenes demasiado pesadas que ralentizan la carga.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Relación con otros conceptos' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Es el complemento directo del SEO Off-Page. Mientras el On-Page prepara la casa, el Off-Page atrae a los invitados.' }] }
        ]
    },
    {
        id: 'seo-off-page',
        title: '¿Qué es el SEO Off-Page?',
        slug: 'seo-off-page',
        excerpt: 'El SEO Off-Page es el conjunto de técnicas que se aplican fuera de tu propio sitio web para mejorar su autoridad y relevancia en los buscadores.',
        content: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Se centra principalmente en la obtención de enlaces externos (backlinks), menciones en redes sociales y la construcción de marca. El objetivo es demostrar a Google que otros sitios confían en el tuyo.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Para qué sirve el SEO Off-Page' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Sirve para aumentar la autoridad de dominio de tu web. Cuantos más enlaces de calidad apunten hacia tu sitio, más "votos de confianza" recibes, lo que ayuda a superar a la competencia en las SERPs.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Ejemplo práctico' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Escribir un artículo como invitado en un blog de referencia de tu sector que incluya un enlace hacia tu página de servicios.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Errores comunes' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Comprar enlaces masivos de sitios de spam o granjas de enlaces, lo cual puede derivar en una penalización de Google.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Relación con otros conceptos' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Se asocia directamente con el Link Building y la autoridad de dominio.' }] }
        ]
    },
    {
        id: 'seo-tecnico',
        title: '¿Qué es el SEO Técnico?',
        slug: 'seo-tecnico',
        excerpt: 'El SEO Técnico se encarga de optimizar la infraestructura de un sitio web para que los buscadores puedan rastrearlo e indexarlo sin problemas.',
        content: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'A diferencia del contenido, el SEO técnico se enfoca en el servidor, la velocidad de carga, la estructura de datos, el archivo robots.txt y el sitemap XML. Es el cimiento sobre el cual se construye todo lo demás.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Para qué sirve el SEO Técnico' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Sirve para facilitar el trabajo a las arañas de Google (crawlers). Si tu web es técnicamente perfecta, Google no perderá presupuesto de rastreo y podrá encontrar y clasificar tu contenido mucho más rápido.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Ejemplo práctico' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Optimizar el código de tu web para que pase los Core Web Vitals y cargue en menos de 2 segundos.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Errores comunes' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Bloquear por error el acceso a Googlebot mediante el archivo robots.txt o tener bucles de redirección infinitos.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Relación con otros conceptos' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Está vinculado con el Sitemap, Robots.txt, Canonical y la velocidad de carga.' }] }
        ]
    },
    {
        id: 'backlink',
        title: '¿Qué es un Backlink?',
        slug: 'backlink',
        excerpt: 'Un backlink es un enlace que un sitio web externo coloca hacia tu página. Son considerados "votos de confianza" en el mundo del SEO.',
        content: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Los backlinks son uno de los factores de posicionamiento más importantes para Google. Cuanto más prestigioso sea el sitio que te enlaza, mayor valor tendrá ese voto para tu SEO.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Para qué sirve un Backlink' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Sirven para transferir autoridad (Link Juice) desde un sitio a otro. Ayudan a que Google descubra tu contenido y a que lo considere una fuente fiable y autorizada sobre un tema específico.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Ejemplo práctico' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Si un periódico como El País menciona tu blog con un enlace, estás recibiendo un backlink de altísima autoridad.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Errores comunes' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Obsesionarse con la cantidad en lugar de la calidad, u obtener enlaces de sitios que no tienen ninguna relación temática con el tuyo.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Relación con otros conceptos' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Es el elemento fundamental del Link Building y el SEO Off-Page.' }] }
        ]
    },
    {
        id: 'link-building',
        title: '¿Qué es el Link Building?',
        slug: 'link-building',
        excerpt: 'El Link Building es la estrategia de SEO Off-Page que consiste en conseguir enlaces externos (backlinks) de calidad hacia tu sitio web.',
        content: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'No se trata solo de conseguir muchos enlaces, sino de que estos sean naturales, relevantes y provengan de sitios con autoridad. Es una de las tareas más complejas y determinantes del SEO.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Para qué sirve el Link Building' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Sirve para acelerar el crecimiento de tu autoridad de dominio. Un buen perfil de enlaces permite que tus contenidos rankeen mejor incluso si tu competencia tiene más contenido que tú.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Ejemplo práctico' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Realizar un estudio original con datos de tu sector para que otros blogs lo citen y enlacen como fuente primaria.' }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Errores comunes' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Utilizar patrones de enlazado poco naturales o comprar reseñas en sitios que claramente venden enlaces a cualquiera.' }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Relación con otros conceptos' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Está ligado a los Backlinks, Anchor Text y Autoridad de Dominio.' }] }
        ]
    }
];

// Simplified adding more terms to save script size but still providing variety
const remainingTerms = [
    ['anchor-text', 'Anchor Text', 'El texto visible de un enlace sobre el que se puede hacer clic.'],
    ['keyword-research', 'Keyword Research', 'El proceso de investigación para encontrar los términos que los usuarios buscan en Google.'],
    ['intencion-de-busqueda', 'Intención de Búsqueda', 'El "por qué" detrás de una búsqueda en Google.'],
    ['canibalizacion-seo', 'Canibalización SEO', 'Cuando varias páginas de tu sitio compiten entre sí por la misma palabra clave.'],
    ['serp', 'SERP', 'Las páginas de resultados de los buscadores (Search Engine Results Pages).'],
    ['canonical', 'Canonical', 'Una etiqueta HTML que indica a Google cuál es la versión maestra de una página.'],
    ['sitemap', 'Sitemap', 'Un archivo XML que lista todas las URLs importantes de tu sitio web.'],
    ['ctr', 'CTR', 'El porcentaje de clics respecto al número total de impresiones.'],
    ['sem', 'SEM', 'El marketing en motores de búsqueda basado en anuncios de pago por clic.'],
    ['core-web-vitals', 'Core Web Vitals', 'Métricas de Google que miden la experiencia de usuario y el rendimiento de carga.'],
    ['robots-txt', 'Robots.txt', 'Un archivo de texto que da instrucciones a los rastreadores sobre qué páginas visitar.'],
    ['domain-authority', 'Domain Authority', 'Una métrica que predice la probabilidad de que un sitio web posicione en las SERPs.'],
    ['rich-snippet', 'Rich Snippet', 'Resultados de búsqueda enriquecidos con datos adicionales (estrellas, precios, etc.).'],
    ['meta-description', 'Meta Description', 'Un breve resumen del contenido de una página que aparece en los resultados de búsqueda.'],
    ['title-seo', 'Title SEO', 'La etiqueta de título que se muestra como enlace azul en las SERPs.']
];

remainingTerms.forEach(([slug, name, excerpt]) => {
    terms.push({
        id: slug,
        title: `¿Qué es ${name}?`,
        slug: slug,
        excerpt: excerpt,
        content: [
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: `La definición de ${name} es fundamental para cualquier estrategia de marketing digital. ${excerpt}` }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: `Para qué sirve ${name}` }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: `Este concepto sirve para optimizar la visibilidad y mejorar el rendimiento de tu sitio web en los buscadores. Sin dominar ${name}, es difícil escalar posiciones de forma consistente.` }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Ejemplo práctico' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: `Imagina que estás optimizando un sitio de e-commerce; aplicar correctamente ${name} marcaría la diferencia entre aparecer en la página 1 o en la 10.` }] },
            { _type: 'block', style: 'h3', children: [{ _type: 'span', text: 'Errores comunes' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: `Ignorar las actualizaciones del algoritmo o usar técnicas "black hat" para manipular ${name}.` }] },
            { _type: 'block', style: 'h2', children: [{ _type: 'span', text: 'Relación con otros conceptos' }] },
            { _type: 'block', style: 'normal', children: [{ _type: 'span', text: `Se relaciona directamente con la estrategia global de SEO y visibilidad orgánica.` }] }
        ]
    });
});

const ndjson = terms.map(term => JSON.stringify({
    _type: 'glossaryTerm',
    _id: `glossary-${term.id}`,
    title: term.title,
    slug: { _type: 'slug', current: term.slug },
    excerpt: term.excerpt,
    content: term.content,
    seoTitle: `${term.title} | Glosario SEO Garfield`,
    seoDescription: term.excerpt
})).join('\n');

fs.writeFileSync('glossary_terms.ndjson', ndjson);
console.log('NDJSON generated with 21 terms.');
