import React, { useState } from "react";
import DragDrop from "./ui/DragDrop";
import Button from "./ui/Button";

const AddTrailer = ({
  className,
  handleUpload,
}: {
  className?: string;
  handleUpload: (title: string, videoFile: File) => void;
}) => {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState<File | null>(null);

  return (
    <form
      id="add-trailer"
      className={`border border-gray-600 rounded-xl py-4 px-2 ${
        className ? className : ""
      }`}
      onSubmit={(e) => {
        e.preventDefault();

        if (!title || !video) {
          window.alert("Please enter a title and select a video file");
          return;
        }

        handleUpload(title, video);
        setTitle("");
        setVideo(null);
      }}
    >
      <h2 className="text-lg font-bold mb-4 text-center">Upload a Trailer</h2>
      <div className="flex flex-col select-none mb-2">
        {/* <label htmlFor="title" className="px-4 py-1">
          Title:
        </label> */}
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="bg-transparent outline-none border border-gray-800 rounded-xl px-4 py-2 text-lg focus:border-red-500 transition-all text-center"
          placeholder="Enter a Title"
        />
      </div>
      <DragDrop file={video} setFile={setVideo} />
      <Button type="gray" className="w-full" buttonType="submit">
        UPLOAD
      </Button>
    </form>
  );
};

export default AddTrailer;
