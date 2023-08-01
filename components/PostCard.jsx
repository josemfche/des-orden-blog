/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

/* import { grpahCMSImageLoader } from '../util'; */

const PostCard = ({ post }) => (
  <div className="h-2/4">
    <div className="relative overflow-hidden pb-80">
      <Image src={post.featuredImage.url} layout="fill" alt="" className="object-top absolute h-80 w-full object-cover rounded-t-lg" />
    </div>
    <div className="flex flex-col h-full bg-white rounded-b-lg p-0 lg:p-6 md:p-6 pb-1 mb-8 h-600 px-4">
      <div className="mb-4 w-full">
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
        <div className="font-medium text-gray-700 flex flex-row justify-center lg:justify-start">
          <div className="text-gray-700 font-normal flex lg:mr-2 my-4">
            <ul className="flex flex-wrap lg:mx-0 mx-2">
              {post.categories?.map((category) => (
                <li key={category.slug} className="mr-1 mb-1 bg-black text-white rounded-sm px-2 py-1">
                  <Link href={`/category/${category.slug}`}>
                    <a>{category.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex lg:text-left lg:items-left lg:justify-left text-center items-center justify-center">
            {/*             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-black-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg> */}
            <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          </div>
        </div>
      </div>
      <div style={{ minHeight: '60px' }} className="mb-1 lg:text-left lg:items-left lg:justify-left text-center items-center justify-center px-4 mb-4">
        <h1 className="mb-2transition duration-700 lg:text-left text-center cursor-pointer hover:text-thegray text-2xl font-normal lg:truncate">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h1>
      </div>
      <p style={{ minHeight: '100px' }} className="px-4 lg:text-left lg:items-left lg:justify-left text-center items-center justify-center text-md text-gray-700 font-normal my-4 text-ellipsis overflow-hidden">
        {post.excerpt}
      </p>
      <div className="lg:text-left lg:items-left lg:justify-left text-center items-center justify-center flex-col justify-self-end">
        <Link href={`/post/${post.slug}`}>
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-white text-black border border-black text-lg font-medium rounded-md w-4/3 px-8 py-3 cursor-pointer">{'Leer más  >' }</span>
        </Link>
      </div>
    </div>
  </div>

);
export default PostCard;
