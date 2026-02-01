import { createSlice,nanoid} from "@reduxjs/toolkit";

const USERS_KEY = "blog_users";
const AUTH_KEY = "blog_current_user";

const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const loadCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch {
    return null;
  }
};

const initialState = {
  users: loadUsers(),
  currentUser: loadCurrentUser(),
  isAuthenticated: !!loadCurrentUser(),
  role: loadCurrentUser()?.role || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { username, password } = action.payload;
      if (state.users.find((user) => user.username === username)) {
        throw new Error("Username already exists");
      }
      const newUser = {
        id: nanoid(),
        username,
        password,
        role: username === "admin" ? "admin" : "user", // Assign admin role
      };
      state.users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(state.users));
    },
    loginUser: (state, action) => {
      const { username, password } = action.payload;
      const existingUser = state.users.find(
        (user) => user.username === username && user.password === password
      );

      if (existingUser) {
        state.currentUser = existingUser;
        state.isAuthenticated = true;
        state.role = existingUser.role;
        localStorage.setItem(AUTH_KEY, JSON.stringify(existingUser));
      } else {
        throw new Error("Invalid username or password");
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.role = null;
      localStorage.removeItem(AUTH_KEY);
    },
  },
});

export const {registerUser, loginUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;