import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState(``);
  const [content, setContent] = useState(``);
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div>
        <div>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title here ..."
            className="mx-auto my-10 block w-3/4 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
          />
        </div>
        <div>
          <textarea
            id="message"
            onChange={(e) => setContent(e.target.value)}
            className="block mx-auto h-80 p-3.5 w-3/4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write the blog content ..."
          ></textarea>
        </div>
        <div>
          <button
            onClick={async () => {
              const res = await axios.post(
                `${BACKEND_URL}/api/v1/blog/create`,
                {
                  title,
                  content,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/blog/${res.data.id}`);
            }}
            className="mt-12 mx-auto block bg-green-700 px-9 py-3 hover:bg-green-800 text-white rounded-full"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
