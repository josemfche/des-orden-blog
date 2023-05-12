/* eslint-disable max-len */
import { useState } from 'react';
import { PostCard, PostBanner, /* Categories, PostWidget, */ BannerWithImage, CategoriesBar, Pagination, TwoColumns } from '../components';
import { getPosts } from '../services';
import NewsletterBanner from '../components/NewsLetterBanner';

const data = [
  {
    image: '/iphone.webp',
    title: 'Economía y Política',
    description: 'Buy and sell popular digital currencies, keep track of them in the one place. Has a variety of features that make it the best place to start trading',
  },
  {
    image: '/iphone.webp',
    title: 'Nuestro Podcast',
    description: 'The Exchange supports USD, EUR, and GBP. Invest in cryptocurrency slowly over time by scheduling buys daily, weekly, or monthly.',
  },
];

export default function Home({ posts }) {
  const [categorySlug, setCategorySlug] = useState('all');

  // eslint-disable-next-line no-nested-ternary
  const filteredPosts = categorySlug === 'all'
    ? posts
    : posts.filter((post) => post.node.categories.some(
      (category) => category.slug === categorySlug,
    ));

  const postsPerPage = filteredPosts.length <= 6 ? filteredPosts.length : 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  /*   const totalPages = Math.ceil(posts.length / postsPerPage); */

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto px-1 mb-8">
      <BannerWithImage isHome />
      <CategoriesBar setCategorySlug={setCategorySlug} setCurrentPage={setCurrentPage} />
      <div className="flex gap-4">
        <div className="flex flex-wrap w-full gap-3">
          {currentPosts.map((post, index) => {
            if (index === 0) {
              return (
                <div key={post.node.title} className="w-full md:w-100 lg:w-100 px-3">
                  <PostBanner post={post.node} />;
                </div>
              );
            }
            return (
              <div key={post.node.title} className="w-full md:w-1/3 lg:w-trecol px-3">
                <PostCard post={post.node} />
              </div>
            );
          })}
          <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            filteredPosts={filteredPosts}
            postsPerPage={postsPerPage}
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
              reverse={index % 2 !== 0}
            />
          ))}
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

