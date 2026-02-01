import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, likePost } from '../redux/slices/blogSlice';

function MyPosts() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.blog);

  if (!currentUser) {
    return (
      <div className="text-center text-white text-2xl mt-10">
        Please log in to see your posts.
      </div>
    );
  }

  const myPosts = posts.filter((post) => post.authorId === currentUser.id);

  const truncateContent = (text, maxLength = 70) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const CATEGORY_COLORS = {
    technology: '#3b82f6',
    science: '#16a34a',
    finance: '#ef4444',
    society: '#eab308',
    entertainment: '#db2777',
    health: '#14b8a6',
    history: '#f97316',
    news: '#8b5cf6',
  };

  if (myPosts.length === 0) {
    return (
      <div className="text-center text-2xl uppercase mt-14">
        You haven't created any posts yet!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">My Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myPosts.map((post) => {
          const isLiked = currentUser && post.likes.includes(currentUser.id);
          return (
            <div
              key={post.id}
              className="bg-stone-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col"
            >
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-52 object-cover"
                />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-sm font-semibold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: post.category
                        ? CATEGORY_COLORS[post.category]
                        : '#888',
                    }}
                  >
                    {post.category ? post.category.toUpperCase() : 'UNCATEGORIZED'}
                  </span>
                  <p className="text-sm text-stone-400">by {post.author}</p>
                </div>
                <Link to={`/post/${post.id}`} className="block flex-grow">
                  <h2 className="text-2xl font-bold mb-2 hover:text-blue-500 transition duration-300">
                    {post.title}
                  </h2>
                  <p className="text-stone-300 mb-4">
                    {truncateContent(post.content)}
                    {post.content && post.content.length > 100 && (
                      <Link
                        to={`/post/${post.id}`}
                        className="text-blue-400 hover:text-blue-300 ml-2"
                      >
                        See More
                      </Link>
                    )}
                  </p>
                </Link>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={() => dispatch(likePost({ postId: post.id, userId: currentUser.id }))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
                      isLiked
                        ? 'bg-red-500 text-white'
                        : 'bg-stone-700 hover:bg-stone-600'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.66l1.318-1.342a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                      />
                    </svg>
                    {post.likes.length}
                  </button>
                  <div className="flex gap-2">
                    <Link
                      to={`/edit-post/${post.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => dispatch(deletePost(post.id))}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyPosts;