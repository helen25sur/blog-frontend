import { useState, useEffect } from 'react';

import './App.css';
import Posts from './components/Posts.jsx';
import FormAddPost from './components/FormAddPost.jsx';
import Header from './components/Header.jsx';

function App() {
  const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    useEffect(() => {
      fetch('http://localhost:3000/')
        .then(res => res.json())
        .then(data => setPosts(data));
    }, []);
  
    const addPost = () => {
      fetch('http://localhost:3000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      })
        .then(res => res.json())
        .then(newPost => setPosts([...posts, newPost]));
  
      setTitle('');
      setContent('');
    };



  return (
    <>
      <Header />
      <FormAddPost
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              addPost={addPost}
            />
      <Posts posts={ posts }/>
    </>
  )
}

export default App
