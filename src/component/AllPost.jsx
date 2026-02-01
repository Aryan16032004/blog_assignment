import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Post from './Post';
function AllPost() {
  const { posts, currentCategory } = useSelector((state) => state.blog)

  const filteredPosts = posts.filter(
    (post) =>
      !currentCategory ||
      currentCategory === 'all' ||
      post.category === currentCategory
  )

  if (posts.length === 0) {
    return (
      <p className="text-center text-2xl uppercase mt-14">
        No posts yet! Create the first one ✌️
      </p>
    )
  }

  if (filteredPosts.length === 0) {
    return (
      <p className="text-center text-2xl uppercase mt-14">
        No posts in this category yet!
      </p>
    )
  }

  return (
    <section className="w-full">
      <ul >
        {filteredPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </section>
  )
}

export default AllPost