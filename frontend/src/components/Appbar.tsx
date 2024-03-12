import { useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between px-5 py-3 border-b border-slate-300">
        <div className="flex flex-col justify-center font-semibold text-2xl">
          Medium
        </div>
        <div className="flex">
          <button
            //@ts-ignore
            onClick={() => navigate("/publish")}
            className="mr-12 bg-green-700 px-4 hover:bg-green-800 text-white rounded-full"
          >
            Create Blog
          </button>
          <Avatar size="big" author="Random" />
        </div>
      </div>
    </>
  );
};

export default Appbar;
