
import Post from './Post.jsx';

export default function Posts({ posts }) {
  const [featured, ...rest] = posts;

  return (
    <div>
      <h2 className='lg:text-4xl text-2xl mb-8 font-medium'>Recent blog posts</h2>
      {featured && (
        <div className="post-item mb-10">
          <Post post={featured} variant="featured" />
        </div>
      )}
      <ul className='posts-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
        {rest.map(post => (
          <li className='post-item grid' key={post._id}>
            <Post post={post} variant="compact" />
          </li>
        ))}
      </ul>
    </div>
  );
}
