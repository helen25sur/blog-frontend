
import Post from './Post.jsx';

export default function Posts({ posts }) {
  
  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
