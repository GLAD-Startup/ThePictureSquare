import { defineType, defineField } from 'sanity';

export const story = defineType({
  name: 'story',
  title: 'Wedding Stories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Story Title',
      type: 'string',
      description: 'e.g. "THE PALACE CHRONICLE" or "SHADOWS ON SANDSTONE"',
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
      name: 'couple',
      title: 'Couple Names',
      type: 'string',
      description: 'e.g. "Ananya & Rohan"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Palace Venue',
      type: 'string',
      description: 'e.g. "Rambagh Palace, Jaipur, India"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date (ISO)',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayDate',
      title: 'Display Date (e.g. "NOVEMBER 2026")',
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
      title: 'Cover Photograph (4:5 Grid Aspect Ratio)',
      type: 'galleryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'banner',
      title: 'Hero Banner Photograph (Full-Bleed 82vh)',
      type: 'galleryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Narrative Body Paragraphs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Add body paragraphs in chronological sequence.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'events',
      title: 'Chapter Events (Drag to Reorder — Drives Chapter Rail)',
      type: 'array',
      of: [{ type: 'chapterEvent' }],
      description: 'The sequence of chapters here directly determines the left chapter navigation rail on the wedding story page.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'credits',
      title: 'Vendor Credits (Planners, Designers, Makeup, Venues)',
      type: 'array',
      of: [{ type: 'vendorCredit' }],
      description: 'Vendors entered here automatically populate the /planners directory.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Categories (e.g. "Jaipur", "Palace", "4K Cinema", "Architecture")',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'track',
      title: 'Inline Audio Soundtrack Credit',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Track Title' },
        { name: 'artist', type: 'string', title: 'Artist / Ensemble' },
      ],
    }),
    defineField({
      name: 'filmUrl',
      title: 'Associated 4K Film Stream URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Homepage & Editorial Spotlights',
      type: 'boolean',
      initialValue: false,
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
