import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Pagination from './Pagination';
import CategoriesBar from './CategoriesBar';

const YoutubeGrid = () => {
  const [videos, setVideos] = useState([]);

  const [seasonSlug, setSeasonSlug] = useState('all');

  // eslint-disable-next-line no-nested-ternary
  /*   const filteredVideos = seasonSlug === 'all'
      ? videos
      : videos.filter((post) => post.node.categories.some(
        (season) => season.slug === seasonSlug,
      )); */

  const postsPerPage = videos.length <= 6 ? videos.length : 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentVideos = videos.slice(indexOfFirstPost, indexOfLastPost);

  /*   const totalPages = Math.ceil(posts.length / postsPerPage); */

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              key: process.env.NEXT_PUBLIC_YT_KEY,
              part: 'snippet',
              channelId: process.env.NEXT_PUBLIC_CHANNEL_ID,
              maxResults: 10,
            },
          },
        );
        setVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);
  const youtubeOptions = {
    width: '100%',
    height: '200px',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="container mx-auto px-4">
      {/* Refactor to render a series of elements */}
      <CategoriesBar classNames="mb-4" setCategorySlug={setSeasonSlug} seasonSlug={seasonSlug} setCurrentPage={setCurrentPage} />
      <div className="flex flex-wrap mx-4">
        {currentVideos.map((video) => (
          <div
            key={video.id.videoId}
            className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8"
          >
            <div className="max-w-sm rounded overflow-hidden border border-zinc-800">
              <YouTube videoId={video.id.videoId} opts={youtubeOptions} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 line-clamp-2">{video.snippet.title}</div>
                <p className="text-gray-700 text-base line-clamp-3">{video.snippet.description}</p>
              </div>
            </div>
          </div>
        ))}
        <Pagination
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          elements={videos}
          elementsPerPage={postsPerPage}
        />
      </div>
    </div>
  );
};

export default YoutubeGrid;
