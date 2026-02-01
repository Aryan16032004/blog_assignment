import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from '../redux/slices/blogSlice'
import { useNavigate } from 'react-router-dom'

function CreatePost({ setShowForm }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.currentUser)
  const navigate = useNavigate();
    
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
  })

  const [image, setImage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0] || null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const submitPost = (imageUrl = null) => {
      dispatch(
        addPost({
          title: form.title,
          content: form.content,
          category: form.category,
          imageUrl,
          author: user.username,
          authorId: user.id,
        })
      )

      // reset form
      setForm({ title: '', content: '', category: '' })
      setImage(null)
      setShowForm(false)
      navigate('/');

      
    }

    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => submitPost(reader.result)
      reader.readAsDataURL(image)
    } else {
      submitPost()
    }
  }

  const CATEGORIES = [
    { name: 'technology',  },
    { name: 'science',  },
    { name: 'finance',  },
    { name: 'society',  },
    { name: 'entertainment',  },
    { name: 'health',  },
    { name: 'history',  },
    { name: 'news',  },
  ]

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-stone-700 mb-10 py-6 px-8 rounded-2xl flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full bg-stone-500 border-none rounded-full p-4 text-lg text-inherit font-inherit placeholder:text-stone-400"
        />
        
        <textarea
          name="content"
          placeholder="Share your thoughts..."
          value={form.content}
          onChange={handleChange}
          required
          maxLength="300"
          className="w-full bg-stone-500 border-none rounded-lg p-4 text-lg text-inherit font-inherit placeholder:text-stone-400"
        />
        <p className="text-right text-stone-400 text-sm">{300 - form.content.length} characters remaining</p>
        
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full bg-stone-500 border-none rounded-full p-4 text-lg text-inherit font-inherit"
        >
          <option value="">Choose category:</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name.toUpperCase()}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full bg-stone-500 border-none rounded-full p-4 text-lg text-inherit font-inherit file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />

        <button
          type="submit"
          className="w-full border-0 uppercase leading-none text-[20px] px-8 py-4 rounded-full cursor-pointer transition-all duration-300 bg-[linear-gradient(135deg,#3b82f6,#ef4444,#16a34a,#eab308)] text-white font-bold hover:scale-105"
        >
          Post
        </button>
      </form>
    </div>  
  )
}

export default CreatePost
