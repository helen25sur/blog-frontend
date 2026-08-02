import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';

import ErrorMessage from './Error.jsx';
import { form } from '../styles/formStyles.jsx';

export default function PostDetail({ link, isLoggedIn, setPosts }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImageURL, setEditImageURL] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch(`${link}posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);
        setEditImageURL(data.imageURL || '');
      });
  }, [id, link]);

  const handleSaveClick = async (event) => {
    event.preventDefault();

    try {
      const res = await apiFetch(`${link}posts/post-edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: editTitle,
          content: editContent,
          imageURL: editImageURL
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update post");
      }

      setPost(data);

      setPosts(prev =>
        prev.map(item =>
          item._id === data._id ? data : item
        )
      );

      setIsEditing(false);

    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    }
  };

  const navigate = useNavigate();

  const handleDeletePost = async () => {
    try {
      if (confirm('Do you want to delete this post?')) {
        const response = await apiFetch(`${link}posts/post-delete/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Delete failed");
        }

        navigate('/posts');
        window.location.reload(); // Refresh the page to update the list of posts
      }
    } catch (err) {
      console.error("Delete Error:", err);
      setError(err.message);
    }

  }

  const inputStyle = form.input;
  const labelStyle = form.label;
  const buttonLightStyle = form.buttonLight;
  const buttonDarkStyle = form.buttonDark;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveClick(event);
  }

  if (!post) return <div>Loading...</div>;

  if (isEditing) {
    return (
      <>
        <h1 className='font-[Inter] lg:text-[98px] lg:leading-30 md:text-7xl md:leading-20 text-5xl leading-16 font-bold mb-10'>Edit Post</h1>
        <form className="font-[Inter] text-2xl mb-10 flex flex-col gap-5 " onSubmit={handleSubmit}>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="title">Post Title</label>
            <input className={inputStyle} value={editTitle} id="title" name="title" onChange={e => setEditTitle(e.target.value)} placeholder="Edit Post Title" required />
          </div>

          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="imageURL">Image URL</label>
            <input className={inputStyle} value={editImageURL} id="imageURL" name="imageURL" onChange={e => setEditImageURL(e.target.value)} placeholder="Image URL" required />
            <span className="hint-text text-sm text-gray-500">Provide a high-quality direct link to an image (Unsplash recommended)</span>
          </div>

          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="content">Content</label>
            <textarea className={`min-h-45 ${inputStyle}`} name="content" value={editContent} onChange={e => setEditContent(e.target.value)} placeholder="Write your post content here... Markdown is supported." required />
          </div>

          <div className="form-group mb-4 flex gap-2">
            <button type="submit" className={`w-full ${buttonDarkStyle}`}>
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={`min-w-60 ${buttonLightStyle}`}
            >
              Cancel
            </button>

          </div>
        </form>
        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}
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
      <h2>{post.userName}</h2>
      <p className='lg:text-4xl text-2xl my-10'>{post.content}</p>
      {isLoggedIn && (
        <div className="action-block flex gap-3">
          <button
            onClick={() => setIsEditing(true)}
            className="border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition cursor-pointer"
          >
            Edit Post
          </button>
          <button
            onClick={() => handleDeletePost()}
            className="border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
          >
            Delete Post
          </button>
        </div>

      )}
      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}
    </div>
  );
}