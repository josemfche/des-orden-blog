import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Modal from 'react-modal';
import Pagination from './Pagination';
import CategoriesBar from './CategoriesBar';

const YoutubeGrid = () => {
  const [videos, setVideos] = useState([]);
  const [seasonSlug, setSeasonSlug] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setSetIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [errorLoading, setErrorLoading] = useState(false);

  const handleVideoOpen = (videoId) => {
    setSetIsOpen(true);
    setSelectedVideo(videoId);
  };

  const handleVideoClose = () => {
    /* setSelectedVideo(); */
    setSetIsOpen(false);
  };

  // eslint-disable-next-line no-nested-ternary
  /*   const filteredVideos = seasonSlug === 'all'
      ? videos
      : videos.filter((post) => post.node.categories.some(
        (season) => season.slug === seasonSlug,
      )); */

  const postsPerPage = videos.length <= 6 ? videos.length : 6;

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
        setVideos(response.data.items.filter((video) => video.id.kind !== 'youtube#channel'));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching videos:', error);
        setErrorLoading(true);
      }
    };

    fetchVideos();
  }, []);

  const youtubeOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  if (errorLoading) return (<h1>Error loading videos</h1>);

  return (
    <div className="container mx-auto px-4 justify-center flex flex-col items-center">
      {/* Refactor to render a series of elements */}
      <CategoriesBar
        classNames="mb-4"
        setCategorySlug={setSeasonSlug}
        seasonSlug={seasonSlug}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex flex-wrap mx-4">
        {currentVideos.map((video) => {
          const { videoId } = video.id;
          return (
            <div
              key={videoId}
              className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8"
            >
              <div className="max-w-sm rounded overflow-hidden border border-zinc-800 bg-white">
                <div
                  className="cursor-pointer"
                  onClick={() => handleVideoOpen(videoId)}
                >
                  <img
                    className="w-full"
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 line-clamp-2">
                    {video.snippet.title}
                  </div>
                  <p className="text-gray-700 text-base line-clamp-3">
                    {video.snippet.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <Pagination
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          elements={videos}
          elementsPerPage={postsPerPage}
        />
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleVideoClose}
        ariaHideApp={false}
        className="Modal"
        overlayClassName="Overlay"
      >
        <YouTube
          videoId={selectedVideo}
          opts={youtubeOptions}
          className="h-full flex justify-center items-center"
        />
      </Modal>
    </div>
  );
};

export default YoutubeGrid;
