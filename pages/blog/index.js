import { useState } from 'react';
import { PostCard, /* Categories, PostWidget, */ Banner, CategoriesBar, Pagination } from '../../components';
import { getPosts } from '../../services';
import NewsletterBanner from '../../components/NewsLetterBanner';

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

  const bannerText = {
    title: 'Nuestros artículos',
    subTitle: 'Blog dedicado al estudio de las finanzas, la economia y la politica',
  };

  return (
    <div className="container mx-auto px-1 mb-8">
      <Banner bannerText={bannerText} isSearch />
      <CategoriesBar setCategorySlug={setCategorySlug} setCurrentPage={setCurrentPage} />
      <div className="flex gap-4">
        <div className="flex flex-wrap w-full gap-3">
          {currentPosts.map((post) => (
            <div key={post.node.title} className="w-full md:w-1/3 lg:w-trecol px-3">
              <PostCard post={post.node} />
            </div>
          ))}
          <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            filteredPosts={filteredPosts}
            postsPerPage={postsPerPage}
          />
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

