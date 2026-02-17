import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Posts from './components/Posts.jsx';
import AllPosts from './components/AllPosts.jsx';
import FormAddPost from './components/FormAddPost.jsx';
import PostDetail from './components/PostDetail.jsx';
import Navigation from './components/Navigation.jsx';
import Home from './view/Home.jsx';
import Login from './view/Login.jsx';

const link = import.meta.env.VITE_LINK_API_URL;
// const link = import.meta.env.VITE_LINK_API_URL_LOCAL;



function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${link}all`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const addPost = (event) => {
    event.preventDefault();
    fetch(`${link}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, imageURL })
    })
      .then(res => res.json())
      .then(newPost => setPosts([...posts, newPost]))
      .then(() => {
        window.location.href = '/';
      });

    setTitle('');
    setContent('');
    setImageURL('');
  };

  const recentPosts = [...posts].slice(-4);

  return (
    <div className='container max-w-355 px-8 py-12.5  md:px-8 md:py-15 lg:px-28 lg:py-7.5 mx-auto'>
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/all" element={<AllPosts posts={posts} />} />
        <Route path="/posts/add-post" element={
          <FormAddPost
            title={title}
            setTitle={setTitle}
            imageURL={imageURL}
            setImageURL={setImageURL}
            content={content}
            setContent={setContent}
            addPost={addPost}
          />
        } />
        <Route path="/:id" element={<PostDetail link={link} />} />
        <Route path="/" element={<Home posts={recentPosts} />} />
        <Route path="/login" element={<Login link={link} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  )
}

export default App;
