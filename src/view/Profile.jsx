import { useNavigate } from 'react-router-dom';

import ProfileCard from '../components/ProfileCard';
import Loader from '../components/Loader/Loader';
import PostsGrid from '../components/PostsGrid';
import Header from '../components/Header';

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
    <div className="min-h-screen bg-white text-gray-900 font-sans  max-w-7xl mx-auto">

      <Header size="small" />

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
