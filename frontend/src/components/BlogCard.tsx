import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <div className="w-1/2 mx-auto p-4">
      <Link to={`/blog/${id}`}>
        <div className="flex">
          <Avatar author={authorName} />
          <div className="mx-4"> {authorName} </div>
          <div className="text-gray-500">{publishedDate}</div>
        </div>
        <div className="font-semibold text-3xl">{title}</div>
        <div className="hidden md:block">
          <div>{content.slice(0, 180) + "..."}</div>
        </div>

        <div className="border-b border-slate-300 py-3">
          {Math.ceil(content.length / 100) + " minute(s) read"}
        </div>
      </Link>
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
      {author[0].toUpperCase()}
    </div>
  );
}

export default BlogCard;
