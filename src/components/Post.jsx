export default function Post({post}) {
  return <>
    <b>{post.title}</b>: {post.content}
  </>
}