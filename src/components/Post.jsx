import { Link } from "react-router-dom";

export default function Post({ post }) {
  return <div className="post-container flex gap-6">
    <div className="post-image-container">
      {post.imageURL ? <img src={post.imageURL} alt={post.title} /> : null}
    </div>
    <div className="post-content-container">
      <h3 className="post-title">
        <Link to={`/${post._id}`}>
          {post.title}</Link>
      </h3>
      <h4 className="flex">
        {post.userId?.userName}</h4>
      <p>{post.content}</p>
    </div>
  </div>
}