export default function FormAddPost({title, setTitle, content, setContent, addPost}) {
  return (
    <form>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <button onClick={addPost}>Додати пост</button>
    </form>
  );
} 