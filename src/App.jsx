import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import Posts from './components/Posts.jsx';
import AllPosts from './components/AllPosts.jsx';
import FormAddPost from './components/FormAddPost.jsx';
import PostDetail from './components/PostDetail.jsx';
import Navigation from './components/Navigation.jsx';
import Home from './view/Home.jsx';
import Login from './view/Login.jsx';
import Signup from './view/Signup.jsx';
import Profile from './view/Profile.jsx';
import FormEditProfile from './components/FormEditProfile.jsx';
import { checkLoginStatus } from './services/auth.js';
import { apiFetch } from './utils/api.js';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// const link = import.meta.env.VITE_LINK_API_URL;
const link = import.meta.env.VITE_LINK_API_URL_LOCAL;

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [content, setContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    apiFetch(`${link}`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Error fetching posts:", err));
  }, []);

  useEffect(() => {
    apiFetch(`${link}current-user`)
      .then(res => {
        if (res.status === 401) {
          setCurrentUser(null);
          return;
        }

        if (!res.ok) {
          throw new Error("Server error");
        }

        return res.json();
      })
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => {
        console.error("Error fetching current user:", err);
      });
  }, []);

  // console.log('Current posts in App.jsx:', posts);

  useEffect(() => {
    checkLoginStatus(link, setIsLoggedIn);
  }, []);

  const addPost = () => {
    apiFetch(`${link}posts`, {
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

  const handleEditProfile = (updatedUser) => {
    // console.log('Updated user data:', updatedUser);

    apiFetch(`${link}current-user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(updatedUser)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update profile');
        }
        return res.json();
      })
      .then(data => {
        setCurrentUser(data);
        navigate('/profile');
      })
      .catch(err => console.error("Error updating profile:", err));
  };

  const recentPosts = [...posts].slice(-4).reverse();
  const allPosts = [...posts].reverse();
  const postsCurrentUser = [...posts].filter(post => post.userId?._id === currentUser?._id);

  return (
    <div className='container max-w-355 px-8 py-12.5  md:px-8 md:py-15 lg:px-28 lg:py-7.5 mx-auto'>
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} link={link} />
      <ScrollToTop />
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
        <Route path="/posts/:id" element={<PostDetail link={link} isLoggedIn={isLoggedIn} setPosts={setPosts} />} />
        <Route path="/" element={<Home posts={recentPosts} />} />
        <Route path="/profile" element={currentUser ? <Profile user={currentUser} posts={postsCurrentUser} /> : <Navigate to="/login" />} />
        <Route path="/profile/edit" element={<FormEditProfile user={currentUser} editProfile={handleEditProfile} />} />
        <Route path="/login" element={<Login link={link} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<Signup link={link} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/logout' element={<Login link={link} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
