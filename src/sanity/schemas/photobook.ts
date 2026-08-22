import { defineType, defineField } from 'sanity';

export const photobook = defineType({
  name: 'photobook',
  title: 'Heirloom Photobooks & Monographs',
  type: 'document',
  fields: [
    defineField({
      name: 'couple',
      title: 'Couple Names',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL Identifier)',
      type: 'slug',
      options: {
        source: 'couple',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Monograph Date (ISO)',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageCount',
      title: 'Page Count',
      type: 'number',
      initialValue: 80,
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'binding',
      title: 'Binding Specification (e.g. "Full-Grain Italian Calfskin Leather")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Trim Dimensions (e.g. "12 × 16 in (30 × 40 cm)")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paper',
      title: 'Paper Stock (e.g. "Museum-Grade Archival Cotton Rag 310gsm")',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Monograph Narrative Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cover',
      title: 'Book Object Cover Shot',
      type: 'galleryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spreads',
      title: 'Panoramic 2:1 Lay-Flat Spreads',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'caption', type: 'string', title: 'Spread Caption / Ritual Name' },
            { name: 'image', type: 'galleryImage', title: '2:1 Panoramic Spread Image' },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'couple',
      subtitle: 'binding',
      media: 'cover',
    },
  },
});
