import { defineType, defineField } from 'sanity'

export const contactPage = defineType({
    name: 'contactPage',
    title: 'Página de Contacto',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título Hero',
            type: 'string',
            initialValue: 'Comencemos una conversación',
        }),
        defineField({
            name: 'description',
            title: 'Descripción Hero',
            type: 'text',
            rows: 3,
            initialValue: '¿Tienes alguna pregunta sobre SEO, una propuesta de colaboración o simplemente quieres saludar? Nos encantaría saber de ti.',
        }),
        defineField({
            name: 'email',
            title: 'Email de contacto',
            type: 'string',
            initialValue: 'marketing@manyadigital.com.ar',
        }),
        defineField({
            name: 'phone',
            title: 'WhatsApp / Teléfono',
            type: 'string',
            initialValue: '+54 11 5857-8004',
        }),
        defineField({
            name: 'location',
            title: 'Ubicación actual',
            type: 'string',
            initialValue: 'Madrid, España',
        }),
        defineField({
            name: 'seoTitle',
            title: 'Título SEO',
            type: 'string',
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Descripción SEO',
            type: 'text',
            rows: 3,
        }),
    ],
})
