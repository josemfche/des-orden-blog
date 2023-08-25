import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { PostCard, /* Categories, PostWidget, */ Banner, CategoriesBar, Pagination } from '../../components';
import { getPosts } from '../../services';
import { usePostStore } from '../../stores/globalStore';
import NewsletterBanner from '../../components/NewsLetterBanner';

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

  const postsPerPage = filteredPosts.length <= 6 ? filteredPosts.length : 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  /*   const totalPages = Math.ceil(globalPosts.length / postsPerPage); */

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const bannerText = {
    title: 'Nuestros artículos',
    subTitle: 'Blog dedicado al estudio de las finanzas, la economia y la politica',
  };

  const NoDataToShow = () => (
    <div className="w-full flex flex-row justify-center align-center py-8">
      <div className="">
        <h3 className="text-center font-normal text-3xl">No hay artículos para mostrar...</h3>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-1 mb-8">
      <Banner bannerText={bannerText} isSearch />
      <CategoriesBar setCategorySlug={setCategorySlug} setCurrentPage={setCurrentPage} />
      <div className="flex gap-4">
        <div ref={scrollReference} className="flex flex-wrap w-full gap-3">
          {currentPosts.length === 0 ? <NoDataToShow />
            : currentPosts.map((post) => (
              <div key={post.node.title} className="w-full md:w-1/2 lg:w-trecol mb-4 border border-thirdthegray rounded-lg">
                <PostCard post={post.node} />
              </div>
            ))}
          <Pagination
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            elements={filteredPosts}
            elementsPage={postsPerPage}
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

