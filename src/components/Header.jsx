export default function Header({ size = "big" }) {
  return (
    <header>
      <hr className="border border-gray-300" />
      {size === "big" ?
        <h1 className="font-[Inter] xl:text-[200px] font-bold xl:leading-73.75 md:text-[132px] md:leading-48.75 text-[66px] leading-22">THE BLOG</h1>
        :
        <h1 className="font-[Inter] xl:text-[140px] font-bold xl:leading-55 md:text-[100px] md:leading-37.5 text-[66px] leading-22">THE BLOG</h1>
      }
      <hr className="border border-gray-300 mb-10" />
    </header>
  )
}