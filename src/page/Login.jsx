import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { useNotification } from "../context/NotificationContext";
import { Link } from "react-router-dom";
function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const validate = () => {
    const newErrors = {};
    if (!form.username) {
      newErrors.username = "Username is required";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        dispatch(loginUser(form));
        showNotification("Login successful!", "success");
        navigate("/");
      } catch (error) {
        showNotification(error.message || "Invalid username or password", "error");
      }
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-stone-800 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 bg-stone-700 text-white border border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 bg-stone-700 text-white border border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition-colors">
          Login
        </button>
      </form>
      <p className="text-center text-stone-400 mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-400 hover:text-blue-300">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default Login;
