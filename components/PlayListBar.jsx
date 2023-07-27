import React, { useState } from 'react';
/* import Link from 'next/link'; */

const PlayListBar = ({ setCurrentPage, classNames, itemslist }) => {
  const [selectedSeason, setSelectedSeason] = useState({ slug: 'all' });

  const handleSeasonClick = (Season) => {
    setSelectedSeason(Season);
    setCurrentPage(1);
  };

  return (
    <div className={`${classNames} flex justify-center`}>
      <div className="bg-white rounded-lg mb-8 border shadow-sm">
        <div className="flex flex-wrap gap-2 px-3 py-2 bg-white">
          <button
            type="button"
            key="view-all"
            className={`buttonBar px-4 py-2 rounded-md font-normal ${selectedSeason?.slug === 'all'
              ? 'bg-red-500 text-white'
              : 'text-black-800'
            } `}
            onClick={() => handleSeasonClick({ name: 'all', slug: 'all' })}
          >
            Ver todos
          </button>
          {itemslist.map((season) => (
            <button
              type="button"
              key={season.etag}
              className={`buttonBar px-4 py-2 rounded-md font-normal ${selectedSeason?.etag === season.etag
                ? 'bg-red-500 text-white'
                : 'text-black-800'
              } `}
              onClick={() => handleSeasonClick(season)}
            >
              {season.snippet.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayListBar;
