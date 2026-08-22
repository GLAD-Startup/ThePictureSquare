import { defineType, defineField } from 'sanity';

export const vendorCredit = defineType({
  name: 'vendorCredit',
  title: 'Vendor Credit',
  type: 'object',
  fields: [
    defineField({
      name: 'role',
      title: 'Role / Category (e.g. Wedding Planner, Scenography, Bridal Makeup)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Vendor / Atelier Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website / Instagram URL',
      type: 'url',
    }),
  ],
});
