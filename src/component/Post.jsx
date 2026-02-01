import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { likePost, deletePost } from '../redux/slices/blogSlice'

function Post({ post }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.currentUser)

  const handleLike = () => {
    if (user) {
      dispatch(likePost({ postId: post.id, userId: user.id }))
    }
  }

  const navigate  = useNavigate();
  const isLiked = user && post.likes.includes(user.id)

  const CATEGORY_COLORS = {
    technology: '#3b82f6',
    science: '#16a34a',
    finance: '#ef4444',
    society: '#eab308',
    entertainment: '#db2777',
    health: '#14b8a6',
    history: '#f97316',
    news: '#8b5cf6',
  }

  const truncateContent = (text, maxLength = 70) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div  className="bg-stone-800 w-full mt-4 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-52 object-cover"
        />
      )}
      <div className="p-6">
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
        <div className="block" onClick={() => navigate(`/post/${post.id}`)}>
          <h2 className="text-2xl font-bold mb-2 hover:text-blue-500 transition duration-300">
            {post.title}
          </h2>
        </div>
        <p className="text-stone-300 mb-4">
          {truncateContent(post.content)}
          {post.content && post.content.length > 150 && (
            <Link
              to={`/post/${post.id}`}
              className="text-blue-400 hover:text-blue-300 ml-2"
            >
              See More
            </Link>
          )}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={handleLike}
            disabled={!user}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-stone-700 hover:bg-stone-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
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
          
        </div>
      </div>
    </div>
  )
}

export default Post

