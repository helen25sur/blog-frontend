import { Link } from "react-router-dom";

export default function Navigation () {
  return (
    <nav className="flex justify-between width-full mb-10 items-center">
      <div className="logo">
        <h2 className="font-[Inter] text-2xl font-semibold leading-7">
          <Link to="/">Surilova</Link>
        </h2>
      </div>
        <ul className="flex gap-10">
          <li className="underline">
            <Link to="/">Home</Link>
          </li>
          <li className="underline">
            <Link to="/all">Posts</Link>  
          </li>
          <li className="underline">
            <Link to="/posts/add-post">Add Post</Link>  
          </li>
        </ul>
    </nav>
  )
}