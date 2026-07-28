export default function Footer({ year = new Date().getFullYear(), brandName = 'Surilova' }) {
  return (
    <footer className="pt-8 border-t border-gray-200 flex flex-wrap gap-6 items-center text-sm text-gray-500">
      <span>© {year} {brandName}</span>
      <a href="#" className="hover:text-gray-900 transition-colors">Twitter</a>
      <a href="#" className="hover:text-gray-900 transition-colors">LinkedIn</a>
      <a href="#" className="hover:text-gray-900 transition-colors">Email</a>
      <a href="#" className="hover:text-gray-900 transition-colors">RSS feed</a>
    </footer>
  );
}