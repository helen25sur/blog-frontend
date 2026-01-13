import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PostDetail({link}) {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImageURL, setEditImageURL] = useState('')

  useEffect(() => {
    fetch(`${link}${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);
        setEditImageURL(data.imageURL || '');
      });
  }, [id, link]);

  const handleSaveClick = (event) => {
    event.preventDefault();
    fetch(`${link}post-edit/${id}`, {
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
    fetch(`${link}post-delete/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          navigate('/');
          window.location.reload();
        } else {
          console.error("Server Error");
        }
      })
      .catch(err => console.error("Error:", err));
  };

  if (!post) return <div>Loading...</div>;

  if (isEditing) {
    return (
      <>
        <h1 className='font-[Inter] lg:text-[98px] lg:leading-30 md:text-7xl md:leading-20 text-5xl leading-16 font-bold mb-10'>Edit Post</h1>
        <form className="font-[Inter] text-2xl mb-10 flex flex-col gap-5 ">
          <input className="border p-2" value={editTitle} name="title" onChange={e =>                 setEditTitle(e.target.value)} placeholder="Title" required />
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
        <h1 className='font-[Inter] lg:text-[98px] lg:leading-30 md:text-7xl md:leading-20 text-5xl leading-16 font-bold mb-10'>{post.title}</h1>
      </header>
      <div className="image-container">
        {post.imageURL ? <img src={post.imageURL} alt={post.title} /> : null}
      </div>
      <p className='lg:text-4xl text-2xl my-10'>{post.content}</p>
      <div className="action-block">
        <button onClick={() => setIsEditing(true)} className="border p-2 mr-5">Edit Post</button>
        <button onClick={() => deletePost()} className="border p-2">Delete Post</button>
      </div>
    </div>
  );
}