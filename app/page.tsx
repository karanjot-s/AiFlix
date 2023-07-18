"use client";
import Navbar from "./components/Navbar";
import AddTrailer from "./components/AddTrailer";
import TrailerCard from "./components/ui/TrailerCard";
import { useContext, useEffect, useState } from "react";
import TrailerInterface from "./types/@trailer";
import axios from "axios";
import UserContext from "./components/context/UserContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [trailers, setTrailers] = useState<TrailerInterface[]>();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_URL}/videos`);
      setTrailers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleVote = async (vidId: string, voteType: string) => {
    if (!user) {
      window.alert("Login first");
      return;
    }

    try {
      await axios.put(`${API_URL}/videos/${vidId}/${voteType}`);
      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async (title: string, videoFile: File) => {
    const formData = new FormData();
    console.log(videoFile);
    formData.append("title", title);
    formData.append("video", videoFile);

    try {
      await axios.post(`${API_URL}/videos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      fetchVideos();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {user && <AddTrailer className="mb-6" handleUpload={handleUpload} />}

      {trailers &&
        trailers.map((trailer, i) => (
          <TrailerCard
            key={i}
            className="my-2"
            video={{
              id: trailer._id,
              title: trailer.title,
              link: `${API_URL}/public/${trailer.filename}`,
              upvotes: trailer.upvotes,
              downvotes: trailer.downvotes,
            }}
            handleVote={handleVote}
          />
        ))}
    </>
  );
}
