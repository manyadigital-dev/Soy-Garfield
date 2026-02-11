import { defineType, defineField } from 'sanity'

export const article = defineType({
    name: 'article',
    title: 'Artículos',
    type: 'document',
    groups: [
        { name: 'content', title: 'Contenido' },
        { name: 'seo', title: 'SEO / Metadatos' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Título',
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
            name: 'author',
            title: 'Autor',
            type: 'reference',
            to: [{ type: 'author' }],
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Fecha de publicación',
            type: 'date',
            group: 'content',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'string',
            group: 'content',
            options: {
                list: [
                    { title: 'SEO', value: 'SEO' },
                    { title: 'IA', value: 'IA' },
                    { title: 'Social Media', value: 'Social Media' },
                    { title: 'Analítica', value: 'Analítica' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'readTime',
            title: 'Tiempo de lectura',
            type: 'string',
            group: 'content',
            placeholder: 'ej: 10 min de lectura',
            description: 'Si se deja vacío, se calculará automáticamente.',
        }),
        defineField({
            name: 'tags',
            title: 'Etiquetas / Tags',
            type: 'array',
            group: 'content',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
            },
            validation: (Rule) => Rule.unique(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Imagen principal',
            type: 'image',
            group: 'content',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Texto alternativo',
                    description: 'Importante para SEO y accesibilidad.',
                }
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isFeatured',
            title: 'Destacado en Home',
            type: 'boolean',
            group: 'content',
            initialValue: false,
        }),
        defineField({
            name: 'excerpt',
            title: 'Extracto / Resumen para tarjetas',
            type: 'text',
            group: 'content',
            rows: 3,
            validation: (Rule) => Rule.required().max(500),
        }),
        defineField({
            name: 'content',
            title: 'Contenido del artículo',
            type: 'array',
            group: 'content',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Texto alternativo',
                        },
                        {
                            name: 'caption',
                            type: 'string',
                            title: 'Leyenda / Caption',
                        }
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
                },
                {
                    type: 'object',
                    name: 'table',
                    title: 'Tabla',
                    fields: [
                        {
                            name: 'rows',
                            title: 'Filas',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'row',
                                    fields: [
                                        {
                                            name: 'cells',
                                            title: 'Celdas',
                                            type: 'array',
                                            of: [{ type: 'string' }]
                                        },
                                        {
                                            name: 'isHeader',
                                            title: 'Es encabezado',
                                            type: 'boolean',
                                            initialValue: false
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'object',
                    name: 'cta',
                    title: 'Llamada a la acción (CTA)',
                    fields: [
                        { name: 'title', title: 'Título', type: 'string' },
                        { name: 'text', title: 'Texto', type: 'text' },
                        { name: 'buttonText', title: 'Texto del botón', type: 'string' },
                        { name: 'url', title: 'URL del botón', type: 'string' }
                    ]
                },
                {
                    type: 'object',
                    name: 'newsletter',
                    title: 'Bloque de Newsletter',
                    fields: [
                        { name: 'title', title: 'Título', type: 'string', initialValue: 'Estrategia Semanal' },
                        { name: 'description', title: 'Descripción', type: 'string', initialValue: 'Únete a +75,000 lectores' }
                    ]
                },
                {
                    type: 'object',
                    name: 'youtube',
                    title: 'Video de YouTube',
                    fields: [
                        { name: 'url', title: 'URL de YouTube', type: 'url' }
                    ]
                },
                {
                    type: 'object',
                    name: 'divider',
                    title: 'Separador',
                    fields: [
                        {
                            name: 'style',
                            title: 'Estilo',
                            type: 'string',
                            options: { list: ['line', 'dots', 'gradient'] },
                            initialValue: 'line'
                        }
                    ]
                }
            ],
        }),
        defineField({
            name: 'seoTitle',
            title: 'Título SEO',
            type: 'string',
            group: 'seo',
            description: 'Si se deja vacío, se usará el título principal.',
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Descripción',
            type: 'text',
            group: 'seo',
            rows: 3,
            description: 'Idealmente entre 150-160 caracteres.',
        }),
    ],
})
