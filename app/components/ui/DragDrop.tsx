import React, {
  ChangeEventHandler,
  Dispatch,
  DragEventHandler,
  SetStateAction,
  useRef,
  useState,
} from "react";

const DragDrop = ({
  className,
  file,
  setFile,
}: {
  className?: string;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const validateAndSetFile = (file: File) => {
    if (file.type.split("/")[0] !== "video") {
      window.alert("Please upload a video file");
      return;
    }

    setFile(file);
  };

  const handleDrag: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // console.log(e.dataTransfer.files);
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // console.log(e.target.files);
      validateAndSetFile(e.target.files[0]);
    }
  };

  return (
    <div
      id="form-file-upload"
      className={`h-64 relative border ${
        dragActive ? "border-red-500" : "border-gray-800"
      }  rounded-xl px-4 py-2 text-lg text-gray-500 ${
        className ? className : ""
      }`}
      onDragEnter={handleDrag}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        onChange={handleChange}
        className="hidden"
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={`h-full flex justify-center items-center cursor-pointer ${
          dragActive ? "drag-active" : ""
        }`}
      >
        <div>
          {file ? (
            <p>{file.name}</p>
          ) : (
            <p className="text-center">
              Drag and drop your file here <br /> or click to upload
            </p>
          )}
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  );
};

export default DragDrop;
