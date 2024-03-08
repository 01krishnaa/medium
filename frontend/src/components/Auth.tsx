import { SignupInput } from "@kronymous/medium-common2";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const resp = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = resp.data.token;

      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      alert("error while signin");
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen flex-col">
        <div className="text-4xl font-bold">Create an account</div>
        <div className="text-slate-500">
          {type === "signin"
            ? "Don't have an account"
            : "Already have an account?"}
          <Link
            className="underline pl-2"
            to={type == "signup" ? "/signin" : "/signup"}
          >
            {type == "signup" ? "Login" : "Signup"}
          </Link>
        </div>
        {type == "signup" && (
          <InputBox
            type="text"
            label="Name"
            placeholder="Krishna"
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, name: e.target.value }));
            }}
          />
        )}
        <InputBox
          type="text"
          label="Email"
          placeholder="krishna@gmail.com"
          onChange={(e) => {
            setPostInputs((c) => ({ ...c, email: e.target.value }));
          }}
        />
        <InputBox
          type="password"
          label="Password"
          placeholder="123456"
          onChange={(e) => {
            setPostInputs((c) => ({ ...c, password: e.target.value }));
          }}
        />
        <button
          onClick={sendRequest}
          type="button"
          className="text-white w-1/2 mt-9 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          {type == "signup" ? "Sign Up" : "Login"}
        </button>
      </div>
    </>
  );
};

interface InputBoxTypes {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({ label, placeholder, type, onChange }: InputBoxTypes) => {
  return (
    <div className="mt-6 w-1/2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>

      <input
        onChange={onChange}
        type={type}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
};
