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
    <div className="w-1/2 mx-auto p-5">
      <div className="flex">
        <Avatar author={authorName} />
        <div className="mx-4"> {authorName} </div>
        <div className="text-gray-500">{publishedDate}</div>
      </div>
      <div className="font-bold text-3xl">{title}</div>
      <div>{content.slice(0, 180) + "..."}</div>
      <div className="border-b border-slate-300 py-3">
        {Math.ceil(content.length / 100) + " minute(s) read"}
      </div>
    </div>
  );
};

function Avatar({ author }: { author: string }) {
  return (
    <div className="bg-slate-400 w-6 text-center rounded-full">{author[0]}</div>
  );
}

export default BlogCard;
