import { defineType, defineField } from 'sanity'

export const glossaryTerm = defineType({
    name: 'glossaryTerm',
    title: 'Glosario Digital',
    type: 'document',
    groups: [
        { name: 'content', title: 'Contenido' },
        { name: 'seo', title: 'SEO / Metadatos' },
    ],
    fields: [
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            group: 'content',
            options: {
                list: [
                    { title: 'SEO', value: 'SEO' },
                    { title: 'Inteligencia Artificial', value: 'IA' },
                    { title: 'Marketing Digital', value: 'Marketing Digital' },
                    { title: 'Desarrollo Web', value: 'Desarrollo Web' },
                    { title: 'E-commerce', value: 'E-commerce' },
                    { title: 'Social Media', value: 'Social Media' },
                    { title: 'Publicidad Online', value: 'Publicidad Online' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Término',
            type: 'string',
            group: 'content',
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Definición corta',
            type: 'text',
            group: 'content',
            rows: 3,
            description: 'Se usará en la lista general del glosario.',
            validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
            name: 'content',
            title: 'Definición detallada',
            type: 'array',
            group: 'content',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', type: 'string', title: 'Texto alternativo' },
                        { name: 'caption', type: 'string', title: 'Leyenda' }
                    ]
                },
                {
                    type: 'object',
                    name: 'codeBlock',
                    title: 'Bloque de código',
                    fields: [
                        { name: 'code', title: 'Código', type: 'text' },
                        { name: 'language', title: 'Lenguaje', type: 'string' }
                    ]
                },
                {
                    type: 'object',
                    name: 'quote',
                    title: 'Cita',
                    fields: [
                        { name: 'text', title: 'Texto', type: 'text' },
                        { name: 'author', title: 'Autor', type: 'string' }
                    ]
                },
                {
                    type: 'object',
                    name: 'checklist',
                    title: 'Lista de verificación',
                    fields: [
                        { name: 'items', title: 'Elementos', type: 'array', of: [{ type: 'string' }] }
                    ]
                }
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seoTitle',
            title: 'Título SEO',
            type: 'string',
            group: 'seo',
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Descripción',
            type: 'text',
            group: 'seo',
            rows: 3,
        }),
    ],
})
