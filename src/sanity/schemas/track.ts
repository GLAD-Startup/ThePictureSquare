import { defineType, defineField } from 'sanity';

export const track = defineType({
  name: 'track',
  title: 'Music Soundtracks',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Track Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artists',
      title: 'Artists / Composers / Instrumentalists',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio Master Stream URL (MP3/AAC)',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artwork',
      title: 'Soundtrack Cover Artwork',
      type: 'galleryImage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'durationSec',
      title: 'Duration in Seconds',
      type: 'number',
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: 'downloadable',
      title: 'Allow Public Download',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artists.0',
      media: 'artwork',
    },
  },
});
