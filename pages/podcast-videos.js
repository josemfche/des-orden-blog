import React from 'react';
import { YoutubeGrid } from '../components';

const Layout = () => (
  <div className="bg-gray-100 min-h-screen">
    <header className="bg-white py-4">
      <div className="container mx-auto px-8 mb-8">
        <h1 className="text-2xl font-bold">Los últimos videos</h1>
      </div>
    </header>
    <main className="container mx-auto px-4 py-8">
      <YoutubeGrid />
    </main>
  </div>
);

export default Layout;
