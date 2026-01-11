export default function FormAddPost({ title, setTitle, imageURL, setImageURL, content, setContent, addPost }) {
  return (
    <>
      <h1 className='font-[Inter] text-[100px] leading-30 font-bold mb-10'>Add New Post</h1>
      <form className="font-[Inter] text-2xl mb-10 flex flex-col gap-5 ">
        <input className="border p-2" value={title} name="title" onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <input className="border p-2" value={imageURL} name="imageURL" onChange={e => setImageURL(e.target.value)} placeholder="Image URL" required />
        <textarea className="border p-2" name="content" value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
        <button className="border p-1.5" onClick={addPost}>Add Post</button>
      </form>
    </>

  );
} 