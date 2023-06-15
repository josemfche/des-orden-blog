import React from 'react';
import { ContactForm, NewsLetterBanner } from '../components';

function contacto() {
  return (
    <div className="flex flex-col justify-center container px-4">
      <ContactForm />
      <NewsLetterBanner />
    </div>
  );
}

export default contacto;
