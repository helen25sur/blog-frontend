export default function Error({ children }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 mb-5 bg-red-50 border border-red-200 border-l-4 border-l-red-600 text-red-700 text-sm font-medium" role="alert">
      <svg className="w-5 h-5 shrink-0 text-red-600" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="13.5" r="0.75" fill="currentColor" />
      </svg>
      {children}
    </div>
  )
}