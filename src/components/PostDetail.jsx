import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FormAddPost from './FormAddPost';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImageURL, setEditImageURL] = useState('')

  useEffect(() => {
    // const link = import.meta.env.VITE_LINK_API_URL;
    const linkLocal = import.meta.env.VITE_LINK_API_URL_LOCAL;
    fetch(`${linkLocal}/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);
        setEditImageURL(data.imageURL || '');
      });
  }, [id]);

  const handleSaveClick = (event) => {
    event.preventDefault();
    // const link = import.meta.env.VITE_LINK_API_URL;
    const linkLocal = import.meta.env.VITE_LINK_API_URL_LOCAL;
    fetch(`${linkLocal}/post-edit/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editTitle,
        content: editContent,
        imageURL: editImageURL
      })
    })
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setIsEditing(false);
      })
      .catch(err => console.error("Error:", err));
  };

 const navigate = useNavigate();

const deletePost = () => {
  // const link = import.meta.env.VITE_LINK_API_URL;
    const linkLocal = import.meta.env.VITE_LINK_API_URL_LOCAL;
  fetch(`${linkLocal}/post-delete/${id}`, {
    method: 'DELETE',
  })
  .then(res => {
    if (res.ok) {
      navigate('/'); 
      window.location.reload();
    } else {
      console.error("Помилка на сервері");
    }
  })
  .catch(err => console.error("Error:", err));  
};

  if (!post) return <div>Loading...</div>;

  if (isEditing) {
    return (
      <>
      <h1 className='font-[Inter] text-[100px] leading-30 font-bold mb-10'>Edit Post</h1>
      <form className="font-[Inter] text-2xl mb-10 flex flex-col gap-5 ">
        <input className="border p-2" value={editTitle} name="title" onChange={e => setEditTitle(e.target.value)} placeholder="Title" required />
        <input className="border p-2" value={editImageURL} name="imageURL" onChange={e => setEditImageURL(e.target.value)} placeholder="Image URL" required />
        <textarea className="border p-2" name="content" value={editContent} onChange={e => setEditContent(e.target.value)} placeholder="Content" required />
        <button className="border p-1.5" onClick={handleSaveClick}>Save</button>
      </form> 
    </>
    );
  }
  return (
    <div>
      <header>
        <h1 className='font-[Inter] text-[100px] leading-30 font-bold mb-10'>{post.title}</h1>
      </header>
      <div className="image-container">
        {post.imageURL ? <img src={post.imageURL} alt={post.title} /> : null}
      </div>
      <p className='text-4xl my-10'>{post.content}</p>
      <div className="action-block">
        <button onClick={() => setIsEditing(true)} className="border p-2 mr-5">Edit Post</button>
        <button onClick={() => deletePost()} className="border p-2">Delete Post</button>
      </div>
    </div>
  );
}