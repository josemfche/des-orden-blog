import { useState } from 'react';
import { FeaturedPosts } from '../sections/index';
import { PostCard, Categories, PostWidget, Banner, CategoriesBar } from '../components';
import { getPosts } from '../services';

export default function Home({ posts }) {
  const [categorySlug, setCategorySlug] = useState('all');

  // eslint-disable-next-line no-nested-ternary
  const filteredPosts = categorySlug === 'all'
    ? posts
    : posts.filter((post) => post.node.categories.some(
      (category) => category.slug === categorySlug,
    ));

  return (
    <div className="container mx-auto px-1 mb-8">
      <Banner />
      <CategoriesBar setCategorySlug={setCategorySlug} />
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {filteredPosts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
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

