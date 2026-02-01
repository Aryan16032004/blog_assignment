import React, { useState } from 'react'
import CreatePost from './component/CreatePost';
import AllPost from './component/AllPost';
import Category from './component/Category';
import Header from './component/Header';

function App() {
  const [showForm, setShowForm] = useState(false);
  const appTitle = 'Blogify';

  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-12 items-start">
        <Category />
        <AllPost />
      </main>
            

    </>
  )
}

export default App
