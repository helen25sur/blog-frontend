import { useNavigate } from 'react-router-dom';

import ProfileCard from '../components/ProfileCard';
import Loader from '../components/Loader/Loader';
import PostsGrid from '../components/PostsGrid';

export default function Profile({ user, posts }) {

  const navigate = useNavigate();

  if (!user) {
    return <Loader />;
  }


  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  const handleCreatePost = () => {
    navigate('/posts/add-post');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans px-6 md:px-20 py-8 max-w-7xl mx-auto">

      <div className="h-px bg-gray-200 mb-10" />

      <h1 className="font-[Inter] text-5xl sm:text-8xl md:text-[110px] font-bold tracking-tighter leading-none uppercase text-center my-6 md:my-10 text-black">
        THE BLOG
      </h1>

      <div className="h-px bg-gray-200 mb-10" />

      <ProfileCard
        user={user}
        countPost={posts.length}
        onEditProfile={handleEditProfile}
        onCreatePost={handleCreatePost}
      />

      <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
        <h3 className="text-xl font-bold text-gray-900">
          Recent Posts ({posts.length})
        </h3>
      </div>

      <PostsGrid posts={posts} authorName={user?.userName} />
    </div>
  );
}
