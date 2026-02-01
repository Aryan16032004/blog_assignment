import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header({ appTitle, setShowForm, showForm }) {
  const user = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogout() {
    dispatch(logoutUser())
    navigate('/login')
  }
  return (
    <header className="mb-8 flex items-center justify-between">
      <Link to="/" className='flex justify-center items-center gap-3'>
        <img
          src={Logo}
          height="68"
          width="68"
          alt="Today I Learned Logo"
          className="w-12 h-12 md:w-16 md:h-16"
        />
        <h1 className="text-3xl md:text-5xl uppercase font-bold text-white">{appTitle}</h1>
      </Link>

      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <>
            <button
              className="border-0 uppercase leading-none text-[20px] px-8 py-4 rounded-full cursor-pointer transition-all duration-300 bg-[linear-gradient(135deg,#3b82f6,#ef4444,#16a34a,#eab308)] text-white font-bold hover:scale-110 hover:-rotate-2 ease-out"
              onClick={() => setShowForm((show) => !show)}
            >
              {showForm ? 'Close' : 'Create Post'}
            </button>

            <button
              onClick={() => navigate('/myposts')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-110 hover:-rotate-2 ease-out"
            >
              My Posts
            </button>
            <button
              onClick={() => handleLogout()}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-110 hover:-rotate-2 ease-out"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-32 py-3 px-6 rounded-full transition-all duration-300 hover:scale-110 hover:-rotate-2 ease-out"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold w-36 py-3 px-6 rounded-full transition-all duration-300 hover:scale-110 hover:-rotate-2 ease-out"
            >
              Get Started
            </button>
          </>
        )}
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="z-50 absolute top-24 right-8 bg-stone-800 p-4 rounded-md shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <button
                  className="border-0 uppercase leading-none text-[16px] px-4 py-2 rounded-full cursor-pointer transition-all duration-300 bg-[linear-gradient(135deg,#3b82f6,#ef4444,#16a34a,#eab308)] text-white font-bold"
                  onClick={() => {
                    setShowForm((show) => !show);
                    setIsMenuOpen(false);
                  }}
                >
                  {showForm ? 'Close' : 'Create Post'}
                </button>

                <button
                  onClick={() => {
                    navigate('/myposts');
                    setIsMenuOpen(false);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                >
                  My Posts
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header