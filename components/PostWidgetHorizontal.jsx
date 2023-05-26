import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PostCard from './PostCard';
import { getSimilarPosts, getRecentPosts } from '../services';

const PostWidgetHorizontal = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  console.log(relatedPosts);

  return (
    <div className="rounded-lg lg:p-8 p-2 pb-12 mb-8">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-2xl font-semibold pb-4">{slug ? 'Artículos relacionados' : 'Artículos recientes'}</h3>
        <p className="mb-2transition cursor-pointer hover:text-thegray font-normal border-b">
          <Link href="/blog">Ver todos los artículos</Link>
        </p>
      </div>

      <div className="flex lg:flex-row flex-col">
        {relatedPosts.map((post, index) => (
          <div className="lg:w-1/3 w-full px-2 min-h-600">
            <PostCard key={index} post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostWidgetHorizontal;
