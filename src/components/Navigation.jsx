import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="flex justify-between width-full mb-10 items-center">
      <div className="logo">
        <h2 className="font-[Inter] text-2xl font-semibold leading-7">
          <Link to="/">Surilova</Link>
        </h2>
      </div>
      <ul className="flex items-center gap-10">
        <li className="underline">
          <Link to="/">Home</Link>
        </li>
        <li className="underline">
          <Link to="/all">Posts</Link>
        </li>
        <li className="underline">
          <Link to="/posts/add-post">Add Post</Link>
        </li>
        <li className="border border-solid rounded-lg px-4 py-1">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  )
}