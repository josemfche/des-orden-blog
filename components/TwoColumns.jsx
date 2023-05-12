import React from 'react';

const TwoColumnImageAndText = ({ image, title, description, reverse }) => {
  const imageColumnClasses = 'w-full md:w-1/2 lg:w-5/12';
  const textColumnClasses = 'w-full md:w-1/2 lg:w-7/12 px-12';

  const content = (
    <>
      <div className={imageColumnClasses}>
        <img src={image} alt={title} className="w-full h-full object-cover object-center" />
      </div>
      <div className={textColumnClasses}>
        <h2 className="text-2xl lg:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
      </div>
    </>
  );

  return (
    <div className={`flex flex-wrap px-8 mx-8 ${reverse ? 'flex-row-reverse' : 'flex-row'} items-center`}>
      {content}
    </div>
  );
};

export default TwoColumnImageAndText;
