import React from 'react';

const NewsletterBanner = () => (
  <div className="bg-white border border-gray-300 shadow-lg mx-6 my-12 p-4 rounded-lg py-12">
    <div className="flex flex-col md:flex-row justify-around items-center py-6">
      <div className="mb-2 md:mb-0">
        <div className="text-3xl font-normal mb-4">Suscribete al newsletter</div>
        <div>Suscribete al newsletter</div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="mr-2 mb-2 md:mr-4 text-gray-700">
          Sign up to our newsletter
        </label>
        <div className="flex">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="bg-gray-100 border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-salmon text-white px-4 py-1 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default NewsletterBanner;
