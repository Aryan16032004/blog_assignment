import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

function PostById() {
  const { id } = useParams();
  const post = useSelector((state) =>
    state.blog.posts.find((p) => p.id === id)
  );

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

  if (!post) {
    return (
      <div className="text-center text-white text-2xl mt-10">
        Post not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-stone-800 rounded-lg shadow-xl">
      <Link to="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
        &larr; Back to all posts
      </Link>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
      )}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-sm font-semibold px-3 py-1 rounded-full text-white"
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
      <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
      <p className="text-stone-300 text-lg leading-relaxed break-words">{post.content}</p>
    </div>
  );
}

export default PostById;