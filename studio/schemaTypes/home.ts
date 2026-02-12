import { defineType, defineField } from 'sanity'

export const homePage = defineType({
    name: 'homePage',
    title: 'Página de Inicio',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Título Hero (H1 oculto)',
            type: 'string',
            initialValue: 'Noticias de SEO & IA',
        }),
        defineField({
            name: 'newsletterTitle',
            title: 'Título Newsletter',
            type: 'string',
            initialValue: 'Domina el futuro con IA y SEO',
        }),
        defineField({
            name: 'newsletterDescription',
            title: 'Descripción Newsletter',
            type: 'text',
            rows: 3,
            initialValue: 'Recibe semanalmente estrategias avanzadas directamente en tu bandeja de entrada.',
        }),
        defineField({
            name: 'seoTitle',
            title: 'Título SEO',
            type: 'string',
            initialValue: 'Soy Garfield | Divulgador SEO & IA',
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Descripción',
            type: 'text',
            rows: 3,
            initialValue: 'El medio de referencia para dominar el futuro del marketing digital con noticias de última hora y estrategias avanzadas de IA.',
        }),
    ],
})
