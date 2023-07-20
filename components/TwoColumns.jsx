/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';

const TwoColumnImageAndText = ({ image, title, description, reverse, url, buttonText }) => {
  const content = (
    <div className={`flex ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} w-full flex-col mb-8 items-center`}>
      <div className="w-full md:w-1/2 lg:w-[80%] mb-8">
        <img src={image} alt={title} className="w-full h-full object-cover object-center rounded-xl" />
      </div>
      <div className="flex flex-col w-full md:w-1/2 lg:w-7/12 px-12 text-center items-center justify-center">
        <h2 className="text-2xl lg:text-8xl text-secondthegray mb-8">{title}</h2>
        {
          description && <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
        }
        <div className="lg:w-1/2 w-full">
          {
          url && (
          <Link className="w-full" href={url}>
            <a className="lg:w-1/2 w-full font-bold bg-secondthegray px-5 py-3 rounded-lg text-white hover:bg-red-500 transition-colors">
              {buttonText}
            </a>
          </Link>
          )
        }
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-row lg:px-8 px-2 lg:mx-8 items-center justify-center">
      {content}
    </div>
  );
};

export default TwoColumnImageAndText;
