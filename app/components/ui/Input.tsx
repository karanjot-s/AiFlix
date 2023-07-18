import { on } from "events";
import React from "react";

const Input = ({
  value,
  onChange,
  className,
  id,
  type,
  placeholder,
  required,
}: {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={
        "bg-transparent outline-none border border-gray-800 rounded-xl px-4 py-2 text-lg focus:border-red-500 transition-all text-center text-gray-300 " +
        className
      }
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
