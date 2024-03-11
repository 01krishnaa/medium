import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <>
      <div className="flex justify-between px-5 py-3 border-b border-slate-300">
        <div className="flex flex-col justify-center font-semibold text-2xl">
          Medium
        </div>
        <div>
          <Avatar size="big" author="Random" />
        </div>
      </div>
    </>
  );
};

export default Appbar;
