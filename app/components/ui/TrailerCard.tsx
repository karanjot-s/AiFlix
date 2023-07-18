import React from "react";
import Button from "./Button";

const TrailerCard = ({
  video,
  className,
  handleVote,
}: {
  video: {
    id: string;
    title: string;
    link: string;
    upvotes: number;
    downvotes: number;
  };
  handleVote: (vidId: string, voteType: string) => void;
  className?: string;
}) => {
  return (
    <div
      className={`border border-gray-600 rounded-xl py-4 px-2 ${
        className ? className : ""
      }`}
    >
      <h3 className="text-xl font-bold mb-4 text-center">{video.title}</h3>
      <video controls src={video.link} className="w-full" />
      <div className="flex">
        <Button
          type="gray"
          className="flex-1 rounded-r-none hover:rounded-r-none"
          onClick={() => {
            handleVote(video.id, "upvote");
          }}
        >
          UPVOTE ({video.upvotes})
        </Button>
        <Button
          type="gray"
          className="flex-1 rounded-l-none hover:rounded-l-none"
          onClick={() => {
            handleVote(video.id, "downvote");
          }}
        >
          DOWNVOTE ({video.downvotes})
        </Button>
      </div>
    </div>
  );
};

export default TrailerCard;
