import React from 'react';
import { YoutubeGrid, Banner, NewsLetterBanner } from '../components';

const Layout = () => {
  const bannerText = {
    title: 'Nuestros Videos del canal',
    subTitle: 'Blog dedicado al estudio de las finanzas, la economia y la politica. Un espacio donde hablaremos sobre pasión, poder y dinero en Venezuela y en toda la región. Temas y elementos que mueven al mundo.',
  };

  return (
    <div className="min-h-screen">
      <Banner bannerText={bannerText} isSearch />
      <main className="container mx-auto px-4 py-8">
        <YoutubeGrid />
      </main>
      <NewsLetterBanner />
    </div>
  );
};

export default Layout;
