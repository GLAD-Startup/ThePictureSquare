import { defineType, defineField } from 'sanity';

export const planner = defineType({
  name: 'planner',
  title: 'Planners & Industry Partners',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Partner / Studio Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Planners & Producers', value: 'PLANNERS' },
          { title: 'Décor & Spatial Design', value: 'DÉCOR' },
          { title: 'Heritage Venues & Palaces', value: 'VENUES' },
          { title: 'Bridal Hair & Makeup', value: 'MAKEUP' },
          { title: 'Couture & Bridalwear', value: 'OUTFITS' },
          { title: 'Culinary Curators & Banquets', value: 'CATERING' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'Base City / Region',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website Link',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle URL',
      type: 'url',
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo (Where Provided)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo',
    },
  },
});
