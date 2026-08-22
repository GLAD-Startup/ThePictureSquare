import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';
import { projectId, dataset } from './client';

const imageClient = createClient({
  projectId,
  dataset,
  apiVersion: '2026-02-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(imageClient);

export function urlForImage(source: any) {
  return builder.image(source);
}
