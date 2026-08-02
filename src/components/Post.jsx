import { Link } from "react-router-dom";

export default function Post({ post, variant }) {
  const isEdited =
    post.updatedAt &&
    (!post.createdAt || post.createdAt !== post.updatedAt);

  const dateToShow = isEdited
    ? post.updatedAt
    : post.createdAt || post.updatedAt;

  const dateLabel = dateToShow && (
    <span className="text-sm text-gray-500">
      {isEdited ? 'Edited: ' : 'Published: '}
      {new Date(dateToShow).toLocaleString('uk-UA', {
        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
      })}
    </span>
  );

  if (variant === "featured") {
    return (
      <div className="post-container flex flex-col p-4 hover:shadow-md transition-shadow rounded-sm">
        <div className="post-image-container">
          {post.imageURL && (
            <img src={post.imageURL} alt={post.title} className="w-full aspect-video object-cover mb-5" />
          )}
        </div>
        <div className="post-content-container">
          <h3 className="post-title text-3xl font-medium mb-1 pr-4">
            <Link to={`/posts/${post._id}`} className="block w-full">{post.title}</Link>
          </h3>
          <p className="text-gray-600 mb-1">{post.userId?.userName}</p>
          {dateLabel}
          <p className="mt-3 text-gray-700 line-clamp-3">
            {String(post.content).slice(0, 160)}...
          </p>
        </div>

      </div>
    );
  }

  return <div className="post-container flex flex-col h-full gap-6 p-4 hover:shadow-md transition-shadow rounded-sm">
    <div className="post-image-container">
      {post.imageURL ? <img className="w-full aspect-4/3 object-cover mb-4" src={post.imageURL} alt={post.title} /> : null}
    </div>
    <div className="post-content-container">
      <h3 className="post-title text-lg font-medium mb-1 line-clamp-2 pr-4">
        <Link to={`/posts/${post._id}`} className="block w-full">
          {post.title}</Link>
      </h3>
      <p className="text-gray-600 text-sm mb-1">{post.userId?.userName}</p>
      {dateLabel}

      <p className="line-clamp-3">{String(post.content).slice(0, 100)}...</p>
    </div>
  </div>
}