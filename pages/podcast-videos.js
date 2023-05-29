import React from 'react';
import { YoutubeGrid, Banner } from '../components';

const Layout = () => {
  const bannerText = {
    title: 'Nuestros Videos del canal',
    subTitle: 'Blog dedicado al estudio de las finanzas, la economia y la politica',
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner bannerText={bannerText} isSearch />
      <main className="container mx-auto px-4 py-8">
        <YoutubeGrid />
      </main>
    </div>
  );
};

export default Layout;
