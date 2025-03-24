'use client';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Cases from './components/Cases';
import Profile from './components/Profile';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Services />
      <Cases />
      <Profile />
      <FAQ />
      <ContactForm />
    </>
  );
}
