import React from 'react';

const Hero = () => (
  <div className="flex bg-white p-0 lg:p-8 pb-12 mb-8">
    <div className="w-1/2">
      <div className="mt-4">
        <h1 className="text-2xl font-bold">Título</h1>
        <p className="text-gray-700">Subtítulo</p>
      </div>
    </div>
    <div className="w-1/2">
      <div className="h-64">
        <img src="https://images.pexels.com/photos/15185102/pexels-photo-15185102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="imagen ejemplo" />
      </div>
    </div>
  </div>
);

export default Hero;
