import { Article, Category } from '../types';

export const ARTICLES: Article[] = [
    {
        id: 'sge-google-2025',
        title: 'SGE y el fin de los 10 enlaces azules: Guía de supervivencia para 2025',
        excerpt: 'Google Search Generative Experience ha cambiado las reglas. Descubre cómo mantener tu visibilidad cuando la IA responde directamente a las consultas de tus usuarios.',
        author: 'Pietro Fiorillo',
        date: '28 Ene, 2024',
        category: Category.SEO,
        readTime: '12 min de lectura',
        imageUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop',
        isFeatured: true,
        content: [
            { type: 'paragraph', text: 'El buscador de Google está sufriendo su transformación más radical desde su nacimiento. Con el despliegue masivo de SGE (Search Generative Experience), el objetivo de Google ha pasado de ser un "intermediario de tráfico" a ser un "motor de respuestas".' },
            { type: 'heading', level: 2, text: '¿Qué es realmente SGE y por qué importa?' },
            { type: 'paragraph', text: 'SGE utiliza modelos de lenguaje avanzados para generar una respuesta sintética en la parte superior de los resultados de búsqueda. Esto significa que para muchas consultas informativas, el usuario ya no necesita hacer clic en ningún enlace externo.' },
            { type: 'quote', text: 'No estamos ante una actualización de algoritmo más. Estamos ante un cambio de paradigma en el comportamiento del consumidor digital.' },
            {
                type: 'table',
                headers: ['Sector', 'Impacto Estimado', 'Estrategia'],
                rows: [
                    ['Informativo', '-60% Tráfico', 'Contenido Opinativo/Deep-dive'],
                    ['E-commerce', '-25% Tráfico', 'Optimización de Merchant Center'],
                    ['Servicios Locales', '+10% Visibilidad', 'SEO Local y Reseñas']
                ]
            },
            { type: 'heading', level: 2, text: 'Cómo optimizar para el "Generative Snapshot"' },
            {
                type: 'checklist',
                items: [
                    'Aporta datos propietarios y estadísticas propias.',
                    'Utiliza un tono de voz humano y opiniones expertas claras.',
                    'Optimiza los encabezados para responder preguntas directas.',
                    'Asegura que tu Schema Markup esté impecable.'
                ]
            }
        ]
    },
    {
        id: 'agentes-ia-marketing',
        title: 'Agentes de IA: Más allá de los Chatbots y la automatización tradicional',
        excerpt: 'Los agentes inteligentes no solo responden preguntas, ejecutan tareas. Cómo integrar agentes autónomos en tu estrategia de marketing para escalar tu producción x10.',
        author: 'Pietro Fiorillo',
        date: '25 Ene, 2024',
        category: Category.IA,
        readTime: '15 min de lectura',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
        content: [
            { type: 'paragraph', text: 'Si el 2023 fue el año de los LLMs, el 2024 y 2025 son los años de los Agentes. Ya no se trata de chatear con una IA, sino de dejar que la IA ejecute flujos de trabajo completos de forma autónoma.' },
            { type: 'heading', level: 2, text: 'De la consulta a la ejecución' },
            { type: 'paragraph', text: 'Un agente de IA se diferencia de un chatbot tradicional en su capacidad de razonar, planificar y utilizar herramientas externas (APIs, navegadores, bases de datos) para lograr un objetivo complejo.' },
            { type: 'quote', text: 'El futuro del marketing no es gestionar herramientas, es gestionar una flota de agentes inteligentes que optimizan tus campañas mientras duermes.', author: 'Pietro Fiorillo' },
            { type: 'heading', level: 2, text: 'Casos de uso reales en Marketing' },
            {
                type: 'list', items: [
                    'Auditorías Automáticas: Agentes que escanean tu web y ejecutan correcciones técnicas vía API.',
                    'Curación de Contenidos: Sistemas que monitorizan tendencias y redactan borradores basados en noticias de última hora.',
                    'Análisis de Sentimiento Proactivo: Agentes que intervienen en redes sociales cuando detectan una crisis potencial.'
                ]
            }
        ]
    },
    {
        id: 'eeat-branding-personal',
        title: 'E-E-A-T: Por qué tu marca personal es tu mejor defensa contra el contenido de IA',
        excerpt: 'En un mar de contenido generado automáticamente, la experiencia real y la autoridad humana son más valiosas que nunca. Aprende a potenciar tu perfil de autor.',
        author: 'Pietro Fiorillo',
        date: '22 Ene, 2024',
        category: Category.SEO,
        readTime: '10 min de lectura',
        imageUrl: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1200&auto=format&fit=crop&q=80',
        content: [
            { type: 'paragraph', text: 'Google ha añadido una "E" extra a su acrónimo E-A-T: Experience. Hoy en día, la experiencia de primera mano es lo único que la IA generativa no puede replicar (todavía).' },
            { type: 'heading', level: 2, text: 'La ventaja injusta del humano' },
            { type: 'paragraph', text: 'En un ecosistema digital inundado de "contenido basura" generado por IA, los usuarios buscan señales de confianza. Quieren saber que la persona que escribe ha estado en las trincheras, ha cometido errores y ha aprendido de ellos.' },
            {
                type: 'checklist', items: [
                    'Experiencia: Demuestra que has usado el producto o has vivido la situación.',
                    'Expertise: Tus credenciales y trayectoria profesional.',
                    'Autoridad: Lo que otros dicen de ti en el sector.',
                    'Confianza: Integridad y transparencia en tus análisis.'
                ]
            }
        ]
    },
    {
        id: 'prompt-engineering-seo',
        title: 'Prompt Engineering Avanzado: Cómo hablar con la IA para obtener resultados SEO reales',
        excerpt: 'No basta con pedir un artículo. Aprende técnicas de Chain-of-Thought y Few-Shot prompting para generar contenido que posicione y convierta.',
        author: 'Pietro Fiorillo',
        date: '19 Ene, 2024',
        category: Category.IA,
        readTime: '8 min de lectura',
        imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1200&auto=format&fit=crop&q=80',
        content: [
            { type: 'paragraph', text: 'El prompt engineering es el nuevo lenguaje de programación del siglo XXI. Para un SEO, dominar esta habilidad significa pasar de ser un "copista" a ser un "arquitecto de contenido".' },
            { type: 'heading', level: 2, text: 'Técnicas que marcan la diferencia' },
            { type: 'paragraph', text: 'La mayoría utiliza prompts simples como "Escribe un artículo sobre...". Un profesional utiliza técnicas de condicionamiento para obligar al modelo a razonar antes de escribir.' },
            { type: 'code', code: '# Prompt de Alta Fidelidad\nActúa como un experto en SEO semántico.\nTAREA: Analiza la intención de búsqueda de "[KEYWORD]".\nPASOS:\n1. Identifica las LSI keywords.\n2. Crea una estructura de silos.\n3. Escribe siguiendo el tono de [MARCA].\nRESTRICCIÓN: No uses adverbios terminados en -mente.', language: 'markdown' }
        ]
    }
];

export const getArticleById = (id: string | undefined): Article | undefined => {
    return ARTICLES.find(a => a.id === id);
};

export const getLatestArticles = (count: number = 3): Article[] => {
    const sorted = [...ARTICLES].sort((a, b) => {
        const dateA = new Date(a.date.replace(/(\d+) (\w+), (\d+)/, '$2 $1 $3'));
        const dateB = new Date(b.date.replace(/(\d+) (\w+), (\d+)/, '$2 $1 $3'));
        return dateB.getTime() - dateA.getTime();
    });
    return sorted.slice(0, count);
};

export const getArticlesByCategory = (category: Category): Article[] => {
    return ARTICLES.filter(a => a.category === category);
};
