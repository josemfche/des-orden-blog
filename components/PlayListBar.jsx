import React, { useState, useEffect } from 'react';
/* import Link from 'next/link'; */

const PlayListBar = ({ setCurrentPage, classNames, itemslist }) => {
  const [seasons, setseasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState({ slug: 'all' });

  useEffect(() => {
    setseasons(itemslist);
  }, []);

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
          {seasons.map((Season) => (
            <button
              type="button"
              key={Season.etag}
              className={`buttonBar px-4 py-2 rounded-md font-normal ${selectedSeason?.etag === Season.etag
                ? 'bg-red-500 text-white'
                : 'text-black-800'
              } `}
              onClick={() => handleSeasonClick(Season)}
            >
              {Season.snippet.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayListBar;
