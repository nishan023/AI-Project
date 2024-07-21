import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import React from "react";
import Editor from "../components/Editor/editor";
import InputTag from "../components/InputTag/inputTag";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function EditBlog() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const access_token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  const handleSave = async () => {
    const blogData = {
      title,
      tags,
      content,
    };
    console.log("Title:", title);
    console.log("Tags:", tags);
    console.log("Content:", content);
    try {
      const response = await axios.post(
        `http://localhost:5001/api/blog`,
        {
          title: title,
          tags: tags,
          content: content,
        },
        {
          headers: {
            Authorization: access_token,
          },
        }
      );
      Swal.fire({
        title: "Success ",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setContent("");
        setTitle("");
        setTags([]);
        navigate("/home");
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error ",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="focus:outline-none text-white bg-keppel-600 hover:bg-keppel-700 focus:ring-4 focus:ring-keppel-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Save
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Publish
        </button>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter the title"
            required
          />
        </div>
      </div>
      <div className="z-0 w-full mb-5 group">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Tags
        </label>
        <InputTag tags={tags} setTags={setTags} />
      </div>
      <div className="block w-full p-4 border border-gray-300 rounded-lg">
        <Editor setContent={setContent} />
      </div>
    </div>
  );
}
