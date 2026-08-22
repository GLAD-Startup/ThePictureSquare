import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Studio Settings & Global Config',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Studio Wordmark',
      type: 'string',
      initialValue: 'THE PICTURE SQUARE',
    }),
    defineField({
      name: 'email',
      title: 'Studio Email',
      type: 'string',
      initialValue: 'inquiries@thepicturesquare.com',
    }),
    defineField({
      name: 'phone',
      title: 'Studio Phone / WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle URL',
      type: 'url',
      initialValue: 'https://www.instagram.com/thepicturesquarephotography/',
    }),
    defineField({
      name: 'annualCap',
      title: 'Annual Commission Cap',
      type: 'string',
      initialValue: '25',
    }),
    defineField({
      name: 'founderName',
      title: 'Founder Display Name',
      type: 'string',
      initialValue: 'Deepanshu',
    }),
  ],
});
