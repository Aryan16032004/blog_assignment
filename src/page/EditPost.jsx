import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePost } from '../redux/slices/blogSlice';
import { useNotification } from '../context/NotificationContext';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showNotification } = useNotification();

  const post = useSelector((state) =>
    state.blog.posts.find((p) => p.id === id)
  );

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
  });

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title,
        content: post.content,
        category: post.category,
      });
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id, ...form }));
    showNotification('Post updated successfully!', 'success');
    navigate('/myposts');
  };

  if (!post) {
    return (
      <div className="text-center text-white text-2xl mt-10">
        Post not found.
      </div>
    );
  }

  const CATEGORIES = [
    { name: 'technology', color: '#3b82f6' },
    { name: 'science', color: '#16a34a' },
    { name: 'finance', color: '#ef4444' },
    { name: 'society', color: '#eab308' },
    { name: 'entertainment', color: '#db2777' },
    { name: 'health', color: '#14b8a6' },
    { name: 'history', color: '#f97316' },
    { name: 'news', color: '#8b5cf6' },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-stone-800 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-white mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-white mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-3 bg-stone-700 text-white border border-stone-600 rounded-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-white mb-2">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={form.content}
            onChange={handleChange}
            className="w-full p-3 bg-stone-700 text-white border border-stone-600 rounded-lg"
            rows="6"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-white mb-2">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 bg-stone-700 text-white border border-stone-600 rounded-lg"
            required
          >
            <option value="">Choose category:</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
