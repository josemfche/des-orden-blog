import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import Modal from 'react-modal';
import Pagination from './Pagination';
import PlayListBar from './PlayListBar';

const YoutubeGrid = () => {
  const [videos, setVideos] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setSetIsOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0); // Track the index of the selected video

  const [errorLoading, setErrorLoading] = useState(false);

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

  const handleVideoOpen = (videoId, videoIndex) => { // Receive the index as well
    setSetIsOpen(true);
    setSelectedVideo(videoId);
    setSelectedVideoIndex(videoIndex); // Update the selected video's index
  };

  const handleNextVideo = () => {
    const nextIndex = selectedVideoIndex + 1;
    if (nextIndex < currentVideos.length) {
      setSelectedVideoIndex(nextIndex);
      setSelectedVideo(currentVideos[nextIndex].id.videoId);
    }
  };

  const handlePreviousVideo = () => {
    const prevIndex = selectedVideoIndex - 1;
    if (prevIndex >= 0) {
      setSelectedVideoIndex(prevIndex);
      setSelectedVideo(currentVideos[prevIndex].id.videoId);
    }
  };

  const handleVideoClose = () => {
    /* setSelectedVideo(); */
    setSetIsOpen(false);
  };

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
              order: 'date',
              channelId: process.env.NEXT_PUBLIC_CHANNEL_ID,
              maxResults: 100,
            },
          },
        );

        setVideos(response.data.items.filter((video) => video.id.kind !== 'youtube#playlist'));
        let seasonsData = [];
        seasonsData = response.data.items.filter((video) => video.id.kind === 'youtube#playlist');
        setSeasons(seasonsData);
        console.log(response.data.items.filter((video) => video.id.kind === 'youtube#playlist'));
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
    <div className="container mx-auto md:px-4 justify-center flex flex-col items-center">
      {/* Refactor to render a series of elements */}
      <PlayListBar
        classNames="mb-4"
        itemslist={seasons}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex flex-wrap lg:mx-4">
        {currentVideos.map((video, index) => { // Pass the index to the map function
          const { videoId } = video.id;
          return (
            <div
              key={videoId}
              className="w-full sm:w-1/2 md:w-1/3 md:px-4 mb-8"
            >
              <div className="max-w-sm rounded overflow-hidden border border-zinc-800 bg-white">
                <div
                  className="cursor-pointer"
                  onClick={() => handleVideoOpen(videoId, index)}
                >
                  <img
                    className="w-full"
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="font-normal text-xl mb-2 line-clamp-2">
                    <h5 className="text-[#111]">{video.snippet.title}</h5>
                  </div>
                  <p className="text-gray-600 text-base line-clamp-3">
                    {video.snippet.description === '' ? 'Descripción de prueba, colocar descripción al video' : video.snippet.description}
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
        className="Modal max-w-screen-xl"
        overlayClassName="Overlay"
      >
        <YouTube
          videoId={selectedVideo}
          opts={youtubeOptions}
          className="h-full flex justify-center items-center max-w-screen-xl"
        />
        <div className="flex flex-row justify-between my-2">
          <button className="bg-white rounded-md py-2 px-4" type="button" onClick={handlePreviousVideo}>{'< Capítulo anterior'}</button>
          <button className="bg-white rounded-md py-2 px-4" type="button" onClick={handleNextVideo}>{'Capítulo siguiente >'}</button>
        </div>
      </Modal>
    </div>
  );
};

export default YoutubeGrid;
