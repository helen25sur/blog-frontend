import Header from "../components/Header";
import Posts from "../components/Posts";

export default function Home({ posts }) {
  return (
    <>
      <Header />
      <Posts posts={posts} />
    </>
  );
}