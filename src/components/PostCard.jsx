export default function PostCard({ post, authorName }) {
  return (
    <article className="group cursor-pointer flex flex-col">
      {post.imageURL && (
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src={post.imageURL}
            alt={post.title}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="text-xs font-semibold text-purple-600 mb-2">
        {authorName} • {new Date(post.createdAt).toLocaleDateString("Uk-ua")}
      </div>

      <div className="flex justify-between items-start gap-2 mb-2">
        <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-purple-600 transition-colors">
          {post.title}
        </h3>
        <span className="text-lg font-semibold text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
          ↗
        </span>
      </div>

      <p className="text-sm text-gray-500 leading-relaxed mb-4 grow line-clamp-2">
        {post.excerpt || post.description}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <span
              key={tag.id || idx}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700"
            >
              {typeof tag === 'string' ? tag : tag.label}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}