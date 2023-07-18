import React, { useContext, useState } from "react";
import Dialog from "./ui/Dialog";
import Input from "./ui/Input";
import Button from "./ui/Button";
import axios, { AxiosError } from "axios";
import UserContext from "./context/UserContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginModal = ({
  open,
  onClose,
  switchSignup,
}: {
  open: boolean;
  onClose: () => void;
  switchSignup: () => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { refreshUser } = useContext(UserContext);

  const onLogin = async (username: string, password: string) => {
    console.log(username, password);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      console.log(res.data.token);
      if (res.data.token) {
        refreshUser(res.data.token);
      }

      reset();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.status);
        window.alert(err.response?.data.error);
      } else {
        console.log(err);
      }
    }
  };

  const reset = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <Dialog title="Login" onClose={onClose} open={open}>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(username, password);
        }}
      >
        <div>
          <Input
            placeholder="Enter username"
            className="mb-2"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required={true}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="mb-4"
            required={true}
          />
        </div>
        <Button type="primary" buttonType="submit" className="w-full mb-2">
          Submit
        </Button>
        <p
          onClick={() => {
            reset();
            switchSignup();
          }}
          className="text-gray-400 underline text-center cursor-pointer hover:text-gray-300"
        >
          Not a user? Signup instead
        </p>
      </form>
    </Dialog>
  );
};

export default LoginModal;
