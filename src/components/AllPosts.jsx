
import Post from './Post.jsx';

export default function AllPosts({ posts }) {

  return (
    <div>
      <h2 className='lg:text-4xl text-2xl mb-8 font-medium'>All posts</h2>
      <ul className='all-posts-list posts-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
        {posts.map(post => (
          <li key={post._id} className='all-post-item post-item' >
            <Post post={post} variant="compact" />
          </li>
        ))}
      </ul>
    </div >
  );
}
