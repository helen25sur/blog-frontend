export default function FormAddPost({ title, setTitle, imageURL, setImageURL, content, setContent, addPost }) {
  const inputStyle = "py-3 px-4 text-base font-[inherit] text-[#101828] bg-white border border-[#D0D5DD] rounded-lg focus:outline-none focus:border focus:border-[#4C1D95] focus:ring-4 focus:ring-[#4C1D951a]";
  const labelStyle = "text-sm text-[#344054] font-semibold";
  const buttonDarkStyle = "py-3 px-4 bg-[#4C1D95] text-white rounded-lg text-sm font-semibold hover:bg-[#3B0764] cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#4C1D95]/20 transition-colors";

  const handleSubmit = (event) => {
    console.log(event)
    event.preventDefault();
    addPost();
  }

  return (
    <>
      <h1 className='font-[Inter] lg:text-[96px] lg:leading-30 md:text-7xl md:leading-20 text-5xl leading-16 font-bold mt-5 mb-8 tracking-[-2px]'>Add New Post</h1>
      <div className="form-container max-w-220 mb-15">
        <form className="font-[Inter] text-2xl mb-10 flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="title">Post Title</label>
            <input className={inputStyle} value={title} id="title" name="title" onChange={e => setTitle(e.target.value)} placeholder="Enter Post Title" required />
          </div>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="imageURL">Image URL</label>
            <input className={inputStyle} value={imageURL} id="imageURL" name="imageURL" onChange={e => setImageURL(e.target.value)} placeholder="Image URL" required />
            <span className="hint-text text-[13px] text-[#667085]">Provide a high-quality direct link to an image (Unsplash recommended)</span>
          </div>
          <div className="form-group mb-4 flex flex-col gap-2">
            <label className={labelStyle} htmlFor="content">Content</label>
            <textarea className={`min-h-45 ${inputStyle}`} name="content" value={content} onChange={e => setContent(e.target.value)} placeholder="Write your post content here... Markdown is supported." required />
          </div>
          <button type="submit" className={buttonDarkStyle}>
            Add Post
          </button>
        </form>
      </div>
    </>

  );
} 