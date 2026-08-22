import { defineType, defineField } from 'sanity';

export const chapterEvent = defineType({
  name: 'chapterEvent',
  title: 'Chapter Event (Chronicle Section)',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Chapter ID (Slug-friendly, e.g. "haldi", "sangeet", "pheras")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Display Title (e.g. "I. THE HALDI & TURMERIC BATHS")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Chapter Photographs',
      type: 'array',
      of: [{ type: 'galleryImage' }],
      validation: (Rule) => Rule.required().min(1).error('At least one photograph is required per chapter.'),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      images: 'images',
    },
    prepare({ title, images }) {
      const count = images ? images.length : 0;
      return {
        title: title || 'Untitled Chapter',
        subtitle: `${count} photograph${count === 1 ? '' : 's'} in chapter`,
      };
    },
  },
});
