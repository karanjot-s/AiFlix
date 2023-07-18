"use client";

import UserInterface from "@/app/types/@user";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UserContext = createContext<{
  user: UserInterface | null | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<UserInterface | null | undefined>
  >;
  refreshUser: (token: string) => Promise<void>;
  removeUser: () => void;
}>({
  user: null,
  setUser: () => {},
  refreshUser: async () => {},
  removeUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null | undefined>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }
    refreshUser(token);
  }, []);

  const refreshUser = async (token: string) => {
    try {
      const res = await axios.get(`${API_URL}/auth/get`, {
        headers: { Authorization: "Bearer " + token },
      });
      console.log(res.data);
      setUser({ ...res.data, token });
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } catch (err) {
      console.log(err);
      setUser(null);
    }
  };

  const removeUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
