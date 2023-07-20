import React, { useState, useEffect } from 'react';
/* import Link from 'next/link'; */

import { getCategories } from '../services';

const CategoriesBar = ({ setCategorySlug, setCurrentPage, classNames }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ slug: 'all' });

  useEffect(() => {
    getCategories().then((newCategories) => {
      setCategories(newCategories);
    });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCategorySlug(category.slug);
    setCurrentPage(1);
  };

  return (
    <div className={`${classNames} flex justify-center`}>
      <div className="bg-white rounded-lg mb-8 border shadow-sm">
        <div className="flex flex-wrap gap-2 px-3 py-2 bg-white">
          <button
            type="button"
            key="view-all"
            className={`buttonBar px-4 py-2 rounded-md font-normal ${selectedCategory?.slug === 'all'
              ? 'bg-red-500 text-white'
              : 'text-black-800'
            } `}
            onClick={() => handleCategoryClick({ name: 'all', slug: 'all' })}
          >
            Ver todos
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.slug}
              className={`buttonBar px-4 py-2 rounded-md font-normal ${selectedCategory?.slug === category.slug
                ? 'bg-red-500 text-white'
                : 'text-black-800'
              } `}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;
