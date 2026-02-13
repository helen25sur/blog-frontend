import Header from "../components/Header";
import Loader from "../components/Loader/Loader";
import Posts from "../components/Posts";

export default function Home({ posts }) {
  return (
    <>
      <Header />
      {posts.length > 0 ? <Posts posts={posts} /> : <Loader />}

    </>
  );
}