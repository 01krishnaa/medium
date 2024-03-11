import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) return <div>loading ...</div>;

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
