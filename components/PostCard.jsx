/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

/* import { grpahCMSImageLoader } from '../util'; */

const PostCard = ({ post }) => (
  <div>
    <div className="relative overflow-hidden pb-80">
      <Image src={post.featuredImage.url} layout="fill" alt="" className="object-top absolute h-80 w-full object-cover border rounded-t-lg" />
    </div>
    <div className="bg-white border rounded-b-lg p-0 lg:p-6 pb-12 mb-8 h-600">
      <div className="block lg:flex text-left items-left justify-left mb-4 w-full">
        {/*       <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
        <Image
          unoptimized
          loader={grpahCMSImageLoader}
          alt={post.author.name}
          height="30px"
          width="30px"
          className="align-middle rounded-full"
          src={post.author.photo.url}
        />
        <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
      </div> */}
        <div className="font-medium text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
        </div>
      </div>
      <h1 className="transition duration-700 text-left mb-4 cursor-pointer hover:text-pink-600 text-3xl font-normal">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="text-center text-gray-700 font-normal mb-4">
        <ul className="flex justify-left flex-wrap">
          {post.categories.map((category) => (
            <li key={category.slug} className="mx-1 mb-1 border bg-black text-white rounded-sm px-2 py-1">
              <Link href={`/category/${category.slug}`}>
                <a>{category.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-left text-lg text-gray-700 font-normal mb-4">
        {post.excerpt}
      </p>
      <div className="text-left">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-white text-black border text-lg font-medium rounded-md w-4/3 px-8 py-3 cursor-pointer">Continue Reading</span>
        </Link>
      </div>
    </div>
  </div>

);
export default PostCard;
