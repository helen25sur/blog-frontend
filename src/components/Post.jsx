export default function Post({post}) {
  return <div className="post-container flex gap-6">
    <div className="post-image-container">
      { post.imageURL ? <img src={post.imageURL} alt={post.title} /> : null }
    </div>
    <div className="post-content-container">
      <h3 className="post-title">{post.title}</h3>
      <p>{post.content}</p>
    </div>
  </div>
}