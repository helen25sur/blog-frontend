export default function ProfileStats({ stats }) {
  if (!stats) return null;

  const statItems = [
    { label: 'Published Posts', value: stats.postsCount },
    { label: 'Total Views', value: stats.totalViews },
    { label: 'Member Since', value: stats.joinedDate },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-5 border-t border-gray-200">
      {statItems.map((item, index) => (
        <div key={index}>
          <span className="block text-xl font-bold text-gray-900">{item.value ?? 0}</span>
          <span className="text-xs text-gray-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}