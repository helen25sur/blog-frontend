export default function PostCard({ post, authorName }) {
  return (
    <article className="post-item group cursor-pointer grid hover:shadow-md transition-shadow rounded-sm p-2">
      {post.imageURL && (
        <div className="overflow-hidden post-container flex flex-col">
          <img
            src={post.imageURL}
            alt={post.title}
            className="w-full aspect-video object-cover mb-5"
          />
        </div>
      )}

      <div className="text-xs font-semibold text-gray-500 mb-2">
        {authorName} • {new Date(post.createdAt).toLocaleDateString("Uk-ua")}
      </div>

      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="post-title w-full text-xl font-bold text-gray-900 leading-snug group-hover:text-gray-600 transition-colors">
          {post.title}
        </h3>
      </div>

      <p className="text-sm text-gray-500 leading-relaxed mb-4 grow line-clamp-2">
        {post.content && String(post.content).slice(0, 100)}...
      </p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <span
              key={tag.id || idx}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
            >
              {typeof tag === 'string' ? tag : tag.label}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}