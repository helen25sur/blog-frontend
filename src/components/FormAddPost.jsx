export default function FormAddPost({ title, setTitle, imageURL, setImageURL, content, setContent, addPost }) {
  return (
    <>
      <h1 className='font-[Inter] lg:text-[96px] lg:leading-30 md:text-7xl md:leading-20 text-5xl leading-16 font-bold mt-5 mb-8 tracking-[-2px]'>Add New Post</h1>
      <div className="form-container max-w-220 mb-15">
        <form className="font-[Inter] text-2xl mb-10 flex flex-col ">
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className="text-sm text-[#344054] font-semibold" htmlFor="title">Post Title</label>
            <input className="py-3 px-4 text-base font-[inherit] text-[#101828] bg-white border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-800" value={title} id="title" name="title" onChange={e => setTitle(e.target.value)} placeholder="Enter Post Title" required />
          </div>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className="text-sm text-[#344054] font-semibold" htmlFor="imageURL">Image URL</label>
            <input className="py-3 px-4 text-base font-[inherit] text-[#101828] bg-white border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-800" value={imageURL} id="imageURL" name="imageURL" onChange={e => setImageURL(e.target.value)} placeholder="Image URL" required />
            <span className="hint-text text-[13px] text-[#667085]">Provide a high-quality direct link to an image (Unsplash recommended)</span>
          </div>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className="text-sm text-[#344054] font-semibold" htmlFor="content">Content</label>
            <textarea className="min-h-45 py-3 px-4 text-base font-[inherit] text-[#101828] bg-white border border-[#D0D5DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-800" name="content" value={content} onChange={e => setContent(e.target.value)} placeholder="Write your post content here... Markdown is supported." required />
          </div>
          <button className="py-3 px-4 bg-[#4C1D95] text-white rounded-lg text-sm font-semibold hover:bg-[#3B0764] cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#4C1D95]/20 transition-colors" onClick={addPost}>
            Add Post
          </button>
        </form>
      </div>
    </>

  );
} 