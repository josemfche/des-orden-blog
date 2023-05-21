import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';

const YoutubeGrid = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/search',
          {
            params: {
              key: 'AIzaSyCy9RfJsNt47PdSB8yig6Hu_XZNvhl58ak',
              part: 'snippet',
              channelId: 'UC0wbMIqsfZgNbZV75RWcFNw',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id.videoId} className="max-w-sm rounded overflow-hidden border border-zinc-800">
            <YouTube videoId={video.id.videoId} opts={youtubeOptions} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 line-clamp-2">{video.snippet.title}</div>
              <p className="text-gray-700 text-base line-clamp-3">{video.snippet.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeGrid;
