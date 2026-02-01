import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentCategory } from '../redux/slices/blogSlice';

function Category() {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    <aside className="w-full md:w-64 md:pr-8">
      <ul className="space-y-2">
        <li>
          <button
            className="w-full text-center px-5 py-3 rounded-lg bg-stone-700 hover:bg-stone-600 transition-all duration-300 font-semibold hover:scale-110 hover:-rotate-2 ease-out"
            onClick={() => dispatch(setCurrentCategory('all'))}
          >
            All
          </button>
        </li>
        <div className="md:hidden relative">
          <button
            className="w-full mt-2 text-center px-5 py-3 rounded-lg bg-stone-700 hover:bg-stone-600 transition-all duration-300 font-semibold"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Categories
          </button>
          {isDropdownOpen && (
            <ul className="absolute z-10 w-full mt-2 bg-stone-800 rounded-lg shadow-lg">
              {CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <button
                    className="w-full text-left px-5 py-3 font-semibold text-white transition-all duration-300"
                    style={{ backgroundColor: cat.color }}
                    onClick={() => {
                      dispatch(setCurrentCategory(cat.name));
                      setIsDropdownOpen(false);
                    }}
                  >
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="hidden md:block">
          {CATEGORIES.map((cat) => (
            <li key={cat.name}>
              <button
                className="w-full mt-2 text-center px-5 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-110 hover:-rotate-2 ease-out "
                style={{ backgroundColor: cat.color }}
                onClick={() => dispatch(setCurrentCategory(cat.name))}
              >
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </button>
            </li>
          ))}
        </div>
      </ul>
    </aside>
  );
}

export default Category;