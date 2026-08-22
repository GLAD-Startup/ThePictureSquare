import { defineType, defineField } from 'sanity';

export const preWedding = defineType({
  name: 'preWedding',
  title: 'Pre-Wedding Lookbooks',
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
      name: 'location',
      title: 'Location (e.g. "Lake Pichola, Udaipur, India")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Session Date (ISO)',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayDate',
      title: 'Display Date (e.g. "OCTOBER 2026")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Editorial Excerpt (150–160 chars for SEO meta)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'cover',
      title: 'Cover Photograph (4:5 Ratio)',
      type: 'galleryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'banner',
      title: 'Hero Banner Photograph (82vh)',
      type: 'galleryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Narrative Body Paragraphs',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'images',
      title: 'Flat Masonry Gallery Images',
      type: 'array',
      of: [{ type: 'galleryImage' }],
      description: 'Single flat collection of stills for this pre-wedding lookbook session.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'filmUrl',
      title: 'Cinema Lookbook Teaser URL (YouTube/Vimeo)',
      type: 'url',
    }),
    defineField({
      name: 'credits',
      title: 'Styling & Location Credits',
      type: 'array',
      of: [{ type: 'vendorCredit' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Aesthetic Filters',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'published',
      title: 'Published (Visible on Site)',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'couple',
      subtitle: 'location',
      media: 'cover',
    },
  },
});
