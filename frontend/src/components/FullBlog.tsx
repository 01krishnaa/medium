import { Blog } from "../hooks";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <Appbar />
      <div className="grid grid-cols-12 md:py-24 md:px-48 w-full">
        <div className="md:col-span-8 col-span-12 p-2">
          <div className="text-5xl font-bold">{blog.title}</div>
          <div className="my-4 text-slate-700">Posted on 2nd December 2024</div>
          <div className="text-xl">{blog.content}</div>
        </div>
        <div className="col-span-4 p-2 hidden md:block">
          <div>Author</div>
          <div className="flex mt-3 ">
            <div className="flex items-center">
              <Avatar size="big" author="Mean" />
            </div>
            <div className="pl-4 hidden md:block">
              <p className="text-2xl font-semibold ">{blog.authoe.name}</p>
              <p>
                Random catch phrase about author's ability to grab user's
                attention
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullBlog;
