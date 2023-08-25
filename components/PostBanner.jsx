/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

const PostBanner = ({ post }) => (
  <div className="flex flex-col xl:flex-row lg:flex-row sm:flex-col">
    <div className="relative overflow-hidden lg:w-7/12 md:w-full h-100 p-40 rounded-t-lg">
      <Image
        className="lg:rounded-l-lg lg:rounded-tr-none md:rounded-t-lg"
        src={post.featuredImage.url}
        layout="fill"
        alt=""
      />
    </div>
    <div className="flex flex-col justify-between justify-center w-full lg:h-fit lg:w-2/5 bg-white md:py-32 py-8 xl:rounded-r-lg lg:px-6 px-8 rounded-b-lg">
      <div className="flex mb-4 lg:justify-start justify-center">
        <div className="text-center text-gray-700 font-normal lg:justify-center">
          <ul className="flex lg:justify-left flex-wrap">
            {post.categories.map((category) => (
              <li key={category.slug} className="mr-2 my-1 bg-black text-white rounded-sm px-2 py-1">
                <Link href={`/category/${category.slug}`}>
                  <a>{category.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex text-left items-left justify-self-center items-center">
          <div className="font-medium text-gray-700">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg> */}
            <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
        </div>
      </div>
      <h1 className="transition duration-700 lg:text-left text-center mb-4 cursor-pointer hover:text-pink-600 text-3xl font-normal">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <p className="lg:text-left text-center text-lg text-gray-700 font-normal mb-8 ">
        {post.excerpt}
      </p>
      <div className="text-left flex lg:justify-start md:justify-left justify-center">
        <Link href={`/post/${post.slug}`}>
          <span className="md:justify-center transition duration-500 border-black ease transform hover:-translate-y-1 bg-white text-black border text-lg font-medium rounded-md w-4/3 px-8 py-3 cursor-pointer">Leer más</span>
        </Link>
      </div>
    </div>
  </div>
);

export default PostBanner;
