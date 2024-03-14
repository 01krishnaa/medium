import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";
import Appbar from "../components/Appbar";

const Blog = () => {
  const { id } = useParams();
  //@ts-ignore
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading || !blog)
    return (
      <>
        <Appbar />
        <div className="flex justify-center ">
          <div className="my-80">
            <Spinner />
          </div>
        </div>
      </>
    );
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};

export default Blog;
