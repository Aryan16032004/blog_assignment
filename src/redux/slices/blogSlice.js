import { createSlice, nanoid } from "@reduxjs/toolkit";

const BLOG_KEY = "blog_posts";

const loadPosts = () => {
  try {
    return JSON.parse(localStorage.getItem(BLOG_KEY)) || [];
  } catch {
    return [];
  }
};

const savePosts = (posts) => {
  localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
};

const initialState = {
  posts: loadPosts(),
  currentCategory: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {

    addPost(state, action) {
      const { title, content, author, authorId, category, imageUrl } =
        action.payload;

      const newPost = {
        id: nanoid(),
        title,
        content,
        category,
        author,
        authorId,
        imageUrl,
        likes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      state.posts.push(newPost);
      state.currentPost = newPost;
      savePosts(state.posts);
    },

    updatePost(state, action) {
      const { id, title, content, category, imageUrl } = action.payload;
      const post = state.posts.find((p) => p.id === id);

      if (post) {
        post.title = title;
        post.content = content;
        post.category = category;
        if (imageUrl) {
          post.imageUrl = imageUrl;
        }
        post.updatedAt = new Date().toISOString();
        savePosts(state.posts);
      }
    },

    deletePost(state, action) {
      const id = action.payload;

      state.posts = state.posts.filter((p) => p.id !== id);

      if (state.currentPost?.id === id) {
        state.currentPost = null;
      }

      savePosts(state.posts);
    },

    likePost(state, action) {
      const { postId, userId } = action.payload;
      const post = state.posts.find((p) => p.id === postId);

      if (post) {
        const index = post.likes.indexOf(userId);

        if (index === -1) {
          post.likes.push(userId);
        } else {
          post.likes.splice(index, 1);
        }
        savePosts(state.posts);
      }
    },

    setCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
  likePost,
  setCurrentPost,
  clearCurrentPost,
  setCurrentCategory,
} = blogSlice.actions;

export default blogSlice.reducer;
