import ProfileStats from './ProfileStats';

export default function ProfileCard({ user, onEditProfile, onCreatePost, countPost }) {
  // if (!user) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-10 mb-14 flex flex-col md:flex-row gap-8 items-start">
      <img
        src={user.avatarUrl || '/default-avatar.png'}
        alt={user.userName}
        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md shrink-0"
      />

      <div className="grow w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{user.userName}</h2>
            <p className="text-sm text-[#667085] mt-1">{user.email}</p>
          </div>
          <div className="mr-auto flex gap-3 flex-wrap">
            <button
              onClick={onEditProfile}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={onCreatePost}
              className="px-4 py-2 bg-[#4C1D95] text-white rounded-lg text-sm font-semibold hover:bg-[#3B0764] cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#4C1D95]/20 transition-colors flex items-center gap-2"
            >
              <span>+</span> New Post
            </button>
          </div>
        </div>

        {user.bio && (
          <p className="text-sm md:text-base text-[#475467] leading-relaxed max-w-2xl mb-6">
            {user.bio}
          </p>
        )}

        <ProfileStats countPost={countPost} joinedDate={new Date(user.createdAt).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })} />
      </div>
    </div>
  );
}