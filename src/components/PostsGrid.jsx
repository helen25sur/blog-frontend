import PostCard from './PostCard';

export default function PostsGrid({ posts = [], authorName }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl mb-16">
        <p className="text-gray-500 text-sm">У вас ще немає опублікованих дописів.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {posts.map((post) => (
        <PostCard key={post.id || post._id} post={post} authorName={authorName} />
      ))}
    </div>
  );
}