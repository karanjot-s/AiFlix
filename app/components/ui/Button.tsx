import React from "react";

const Button = ({
  children,
  type,
  onClick,
  className,
  buttonType,
}: {
  children: React.ReactNode;
  type: "primary" | "secondary" | "gray";
  className?: string;
  onClick?: () => void;
  buttonType?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      className={`border ${
        type === "primary"
          ? "bg-red-700 border-red-700 text-red-50 hover:bg-red-800"
          : type === "gray"
          ? "text-gray-300 border-gray-300 bg-transparent hover:bg-red-700 hover:border-red-700 hover:text-red-50"
          : "text-red-700 border-red-700 bg-transparent hover:bg-red-700 hover:text-red-50"
      } font-bold  px-4 py-2 rounded-lg hover:rounded-2xl transition-all ${
        className ? className : ""
      }`}
      onClick={onClick}
      type={buttonType}
    >
      {children}
    </button>
  );
};

export default Button;
