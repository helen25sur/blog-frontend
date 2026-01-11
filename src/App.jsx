import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Posts from './components/Posts.jsx';
import FormAddPost from './components/FormAddPost.jsx';
import PostDetail from './components/PostDetail.jsx';
import Navigation from './components/Navigation.jsx';
import Home from './view/Home.jsx';

function App() {
  const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [content, setContent] = useState('');
  
    useEffect(() => {
      fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(data => setPosts(data));
    }, []);
  
    const addPost = (event) => {
      event.preventDefault();
      fetch('http://localhost:3000/', {
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



  return (
    <div className='container max-w-350 px-28 py-7.5 mx-auto'>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home posts={posts} />} /> 
        <Route path="/:id" element={<PostDetail />} /> 
        <Route path="/posts" element={<Posts posts={posts} />} />
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
      </Routes>
    </div>
  )
}

export default App;
