import { defineType, defineField } from 'sanity';

export const film = defineType({
  name: 'film',
  title: '4K Cinema Films',
  type: 'document',
  fields: [
    defineField({
      name: 'kind',
      title: 'Film Format Category',
      type: 'string',
      options: {
        list: [
          { title: 'Instacuts (Under 60s Vertical 9:16)', value: 'instacut' },
          { title: 'Trailers (3–5 Min Widescreen 16:9)', value: 'trailer' },
          { title: 'Compilations & Showreels (16:9)', value: 'compilation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'couple',
      title: 'Couple Names',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location (e.g. "Jaipur, Rajasthan")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'runtime',
      title: 'Runtime Display (e.g. "0:52" or "4:18")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'provider',
      title: 'Video Streaming Provider',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
        ],
      },
      initialValue: 'youtube',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoId',
      title: 'Video ID (YouTube or Vimeo ID string)',
      type: 'string',
      description: 'e.g. "dQw4w9WgXcQ" for YouTube, or "76979871" for Vimeo.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Video Poster Frame Thumbnail',
      type: 'galleryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'storySlug',
      title: 'Linked Story Slug (Optional Cross-Link)',
      type: 'string',
      description: 'Slug of the matching wedding story if published (e.g. "ananya-rohan").',
    }),
  ],
  preview: {
    select: {
      title: 'couple',
      subtitle: 'kind',
      media: 'poster',
    },
  },
});
