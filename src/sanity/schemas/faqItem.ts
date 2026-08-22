import { defineType, defineField } from 'sanity';

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Commission Questions',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Anchor ID (e.g. "coverage-areas-travel")',
      type: 'string',
      description: 'Used for deep linking via #anchor in URL.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section Group',
      type: 'string',
      options: {
        list: [
          { title: 'BEFORE YOU BOOK', value: 'BEFORE YOU BOOK' },
          { title: 'ON THE DAY', value: 'ON THE DAY' },
          { title: 'DELIVERABLES', value: 'DELIVERABLES' },
          { title: 'AFTER THE WEDDING', value: 'AFTER THE WEDDING' },
          { title: 'RIGHTS AND USAGE', value: 'RIGHTS AND USAGE' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Question Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer Body',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'section',
    },
  },
});
