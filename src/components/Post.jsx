import { Link } from "react-router-dom";

export default function Post({ post }) {
  const isEdited =
    post.updatedAt &&
    (!post.createdAt || post.createdAt !== post.updatedAt);

  console.log(isEdited, post.createdAt, '8');
  console.log(post._id, post.updatedAt, '9');

  const dateToShow = isEdited
    ? post.updatedAt
    : post.createdAt || post.updatedAt;

  return <div className="post-container flex gap-6">
    <div className="post-image-container">
      {post.imageURL ? <img src={post.imageURL} alt={post.title} /> : null}
    </div>
    <div className="post-content-container">
      <h3 className="post-title">
        <Link to={`/posts/${post._id}`}>
          {post.title}</Link>
      </h3>
      <h4 className="flex">
        {post.userId?.userName}</h4>

      {dateToShow && (
        <span className="post-date">
          {isEdited ? 'Edited: ' : 'Published: '}
          {new Date(dateToShow).toLocaleString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      )}

      <p>{post.content}</p>
    </div>
  </div>
}