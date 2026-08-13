import React from 'react';
import { Hero } from '../components/home/Hero';
import { EditorialStatement } from '../components/home/EditorialStatement';
import { EditorialGallery } from '../components/home/EditorialGallery';
import { ServicesSection } from '../components/home/ServicesSection';
import { HeritageMathura } from '../components/home/HeritageMathura';
import { FeaturedStory } from '../components/home/FeaturedStory';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { InstagramSection } from '../components/home/InstagramSection';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <EditorialStatement />
      <EditorialGallery />
      <ServicesSection />
      <HeritageMathura />
      <FeaturedStory />
      <TestimonialSection />
      <InstagramSection />
      <FinalCTA />
    </>
  );
};

export default HomePage;
