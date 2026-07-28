import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Posts from './components/Posts.jsx';
import AllPosts from './components/AllPosts.jsx';
import FormAddPost from './components/FormAddPost.jsx';
import PostDetail from './components/PostDetail.jsx';
import Navigation from './components/Navigation.jsx';
import Home from './view/Home.jsx';
import Login from './view/Login.jsx';
import Signup from './view/Signup.jsx';
import { checkLoginStatus } from './utils/auth.js';

// const link = import.meta.env.VITE_LINK_API_URL;
const link = import.meta.env.VITE_LINK_API_URL_LOCAL;

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${link}all`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  useEffect(() => {
    checkLoginStatus(link, setIsLoggedIn);
  }, []);

  const addPost = (event) => {
    event.preventDefault();
    fetch(`${link}posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, content, imageURL })
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error('Unauthorized: Please log in');
        }

        if (!res.ok) {
          throw new Error('Server error');
        }

        return res.json();
      })
      .then(newPost => setPosts([...posts, newPost]))
      .then(() => {
        navigate('/posts');
      })
      .catch(err => console.error("Error:", err));

    setTitle('');
    setContent('');
    setImageURL('');
  };

  const recentPosts = [...posts].slice(-4);
  const allPosts = [...posts].reverse();

  return (
    <div className='container max-w-355 px-8 py-12.5  md:px-8 md:py-15 lg:px-28 lg:py-7.5 mx-auto'>
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} link={link} />
      <Routes>
        <Route path="/posts" element={<AllPosts posts={allPosts} />} />
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
        <Route path="/posts/:id" element={<PostDetail link={link} isLoggedIn={isLoggedIn} />} />
        <Route path="/" element={<Home posts={recentPosts} />} />
        <Route path="/login" element={<Login link={link} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup link={link} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  )
}

export default App;
