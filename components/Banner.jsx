import React from 'react';

const Hero = () => (
  <div className="container mx-auto my-10 ">
    <div className="px-6 lg:px-16 py-10 rounded-3xl">
      <div className="flex flex-col lg:flex-row justify-center  lg:justify-between items-center gap-5">
        <div className="flex flex-col gap-5 lg:gap-10">
          <p className=" text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-left">
            Economía, política e inversiones desde otra perspectiva.
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-gray-500">
            Soy venezolano, médico psiquiatra dedicado a las finanzas, intentando dar explicaciones al des-orden que vivimos.
          </p>
        </div>
        <img className="max-w-md h-1/4 rounded-lg" src="https://github.com/AbelinCoin/Blog-Des-orden/blob/main/Frame%2049.png?raw=true" alt="img" />
      </div>
    </div>
  </div>
);

export default Hero;
