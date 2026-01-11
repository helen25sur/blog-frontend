
import Post from './Post.jsx';

export default function Posts({ posts }) {
  
  return (
    <div>
      <h2 className='text-4xl mb-8 font-medium'>Recent blog posts</h2>
      <ul className='posts-list grid grid-rows-3 gap-8'>
        {posts.map(post => (
          <li className='post-item' key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
