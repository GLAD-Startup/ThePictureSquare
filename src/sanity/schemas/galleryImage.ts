import { defineType, defineField } from 'sanity';

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text (Mandatory for SEO & Accessibility)',
      type: 'string',
      description: 'Describe what is happening in the image. e.g. "Bride adjusting her lehenga before the varmala ceremony, Jaipur"',
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .error('Alt text is mandatory and must be at least 5 characters for accessibility and SEO.'),
    }),
    defineField({
      name: 'caption',
      title: 'Editorial Caption / Chapter Label',
      type: 'string',
      description: 'Optional display caption or event name.',
    }),
  ],
});
