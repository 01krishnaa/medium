import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import Skeleton from "../components/Skeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading)
    return (
      <div>
        <Appbar />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );

  return (
    <div>
      <Appbar />
      <div>
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            authorName={blog.authoe.name}
            title={blog.title}
            content={blog.content}
            publishedDate="2nd June 2043"
          />
        ))}
      </div>

      <div></div>
    </div>
  );
};

export default Blogs;
