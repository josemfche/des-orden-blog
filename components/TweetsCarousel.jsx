import TweetEmbed from 'react-tweet-embed';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Circles } from 'react-loader-spinner';

const TweetsCarousel = ({ tweetIds }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      swipeable
      draggable
      ssr={false}
      infinite
      autoPlay
      autoPlaySpeed={10000}
      keyBoardControl
      showDots
      customTransition="all .5s ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      className="shadown-lg align-middle min-h-32"
    >
      {tweetIds.map((tweetId) => (
        <div className="px-3" key={tweetId}>
          <TweetEmbed
            tweetId={tweetId}
            options={{ cards: 'hidden', align: 'center' }}
            className="h-full flex-1"
            placeholder={(
              <div className="flex w-full justify-center">
                <Circles
                  height="80"
                  width="80"
                  radius="9"
                  color="green"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              </div>
)}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default TweetsCarousel;
