import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import CreatePost from '../component/CreatePost';
import { useState } from 'react';
function Layout() {
    const [showForm, setShowForm] = useState(false);
    const appTitle = 'Blogify';
  return (
    <>
    <Header appTitle={appTitle} setShowForm={setShowForm} showForm={showForm} />
    {showForm && <CreatePost setShowForm={setShowForm} />}
    <main>
      <Outlet/>
    </main>
    </>
  )
}

export default Layout