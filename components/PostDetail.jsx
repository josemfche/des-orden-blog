import React from 'react';

import moment from 'moment';

const PostDetail = ({ post }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <>
      <div className="rounded-lg lg:p-8 pb-12 mb-8">
        <div className="px-4 lg:px-0 border-b">
          <h1 className="mb-4 text-3xl text-gray-800 font-semibold text-center">{post.title}</h1>
          <p className="text-center mb-4 text-gray-600">{post.excerpt}</p>
          <div className="flex items-center justify-center mb-8 w-full">
            <div className="md:flex items-center justify-center lg:mb-0 lg:w-auto mr-4">
              <img
                alt={post.author.name}
                style={{ width: '60px', height: '60px' }}
                className="object-cover align-middle rounded-full"
                src={post.author.photo.url}
              />
            </div>
            <div className="flex flex-col font-medium text-gray-700">
              <p className="inline align-left text-gray-800 font-medium text-lg">{post.author.name}</p>
              <div>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg> */}
                <span className="align-middle text-gray-400">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden shadow-md mb-6">
            <img src={post.featuredImage.url} alt="" className="w-full shadow-lg rounded-t-lg lg:rounded-lg" />
          </div>
          {post.content.raw.children.map((typeObj, index) => {
            const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));
            return getContentFragment(index, children, typeObj, typeObj.type);
          })}
        </div>
      </div>

    </>
  );
};

export default PostDetail;
