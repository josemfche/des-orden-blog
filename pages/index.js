/* eslint-disable max-len */
import { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { usePostStore } from '../stores/globalStore';
import { PostCard, PostBanner, /* Categories, PostWidget, */ BannerWithImage, CategoriesBar, Pagination, TwoColumns, TweetsCarousel } from '../components';
import { getPosts } from '../services';
import NewsletterBanner from '../components/NewsLetterBanner';

const data = [
  {
    image: '/oscar-silla.png',
    title: 'Economía, social y política',
    // description: 'Buy and sell popular digital currencies, keep track of them in the one place. Has a variety of features that make it the best place to start trading',
    buttonText: 'Ver mas',
    url: '/blog',
  },
  {
    image: '/grupo-work.png',
    title: 'Des-orden Podcast',
    // description: 'The Exchange supports USD, EUR, and GBP. Invest in cryptocurrency slowly over time by scheduling buys daily, weekly, or monthly.',
    buttonText: 'Ver mas',
    url: '/podcast-videos',
  },
  {
    image: '/oscar-profile.png',
    title: 'Sobre nosotros',
    // description: 'The Exchange supports USD, EUR, and GBP. Invest in cryptocurrency slowly over time by scheduling buys daily, weekly, or monthly.',
    buttonText: 'Ver mas',
    url: '/sobre-nosotros',
  },
];

export default function Home({ posts }) {
  const [categorySlug, setCategorySlug] = useState('all');

  const [globalPosts, scrollView, updatePosts] = usePostStore(
    (state) => [state.globalPosts, state.scrollView, state.updatePosts],
  );

  const scrollReference = useRef(null);

  useEffect(() => {
    updatePosts(posts);
  }, [posts]);

  useLayoutEffect(() => {
    scrollReference.current?.scrollIntoView({ behavior: 'smooth' });
  }, [scrollView]);

  // eslint-disable-next-line no-nested-ternary
  const filteredPosts = categorySlug === 'all'
    ? globalPosts
    : globalPosts.filter((post) => post.node.categories.some(
      (category) => category.slug === categorySlug,
    ));

  const postsPerPage = filteredPosts.length <= 6 ? filteredPosts.length : 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  /*   const totalPages = Math.ceil(globalPosts.length / postsPerPage); */

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const NoDataToShow = () => (
    <div className="w-full flex flex-row justify-center align-center py-8">
      <div className="">
        <h3 className="text-center font-normal text-3xl">No hay artículos para mostrar...</h3>
      </div>
    </div>
  );

  return (
    <div className="px-1 mb-8 mx-2 sm:mx-24">
      <BannerWithImage isHome />
      <CategoriesBar setCategorySlug={setCategorySlug} setCurrentPage={setCurrentPage} />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-wrap w-full gap-3 mb-12 justify-center">
          {currentPosts.length === 0 ? <NoDataToShow />
            : currentPosts.map((post, index) => {
              if (index === 0) {
                return (
                  <div ref={scrollReference} key={post.node.title} className="w-full md:w-full lg:w-full border border-thirdthegray lg:rounded-lg rounded-lg">
                    <PostBanner post={post.node} />
                  </div>
                );
              }
              return (
                <div key={post.node.title} className="w-full md:w-1/2 lg:w-trecol mb-4 border border-thirdthegray rounded-lg">
                  <PostCard post={post.node} />
                </div>
              );
            })}
          <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            elements={filteredPosts}
            elementsPerPage={postsPerPage}
          />
        </div>
      </div>
      <div className="bg-transparent">
        <div className="container mx-auto px-4">
          {data.map((item, index) => (
            <TwoColumns
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              url={item.url}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
      <div className="container mx-auto py-4">
        {/* <h1 className="text-4xl font-bold mb-4 px-6">Latest Tweets</h1> */}
        <div className="w-full px-4">
          <TweetsCarousel tweetIds={['1664840287586271232', '1663694592833736706', '1658148915219247117', '1658092377800679425', '1648715591069442049']} />
        </div>
      </div>
      <NewsletterBanner />
    </div>
  );
}

// Fetch data at build time
export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
}

