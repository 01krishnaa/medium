interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="w-1/2 mx-auto p-4">
      <div className="flex">
        <Avatar author={authorName} />
        <div className="mx-4"> {authorName} </div>
        <div className="text-gray-500">{publishedDate}</div>
      </div>
      <div className="font-semibold text-3xl">{title}</div>
      <div>{content.slice(0, 180) + "..."}</div>
      <div className="border-b border-slate-300 py-3">
        {Math.ceil(content.length / 100) + " minute(s) read"}
      </div>
    </div>
  );
};

export function Avatar({
  author,
  size = "small",
}: {
  author: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`bg-slate-300 ${
        size === "small" ? "w-6" : "w-10"
      } text-center rounded-full ${size === "big" && "py-2"}`}
    >
      {author[0]}
    </div>
  );
}

export default BlogCard;
