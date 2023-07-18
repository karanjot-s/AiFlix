import React, { useState } from "react";
import Dialog from "./ui/Dialog";
import Input from "./ui/Input";
import Button from "./ui/Button";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const SignupModal = ({
  open,
  onClose,
  switchLogin,
}: {
  open: boolean;
  onClose: () => void;
  switchLogin: () => void;
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [page, setPage] = useState(0);

  const page1Next = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/auth/register?username=${username}&email=${email}`
      );

      console.log(res);

      if (res.data.unique) {
        setPage(1);
        return;
      }

      if (res.data.reason === "username")
        window.alert("Username is already taken.");

      if (res.data.reason === "email")
        window.alert("Email is already registered.");
    } catch (err) {
      console.log(err);
    }
  };

  const onLogin = async (username: string, password: string) => {
    console.log(username, password);

    if (!password || !cpassword || password !== cpassword) {
      window.alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });

      console.log(res);
      reset();
      onClose();
      switchLogin();
    } catch (err) {
      console.log(err);
    }
  };

  const reset = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setCPassword("");
    setPage(0);
  };

  if (page === 0)
    return (
      <Dialog
        title="Signup"
        onClose={() => {
          reset();
          onClose();
        }}
        open={open}
      >
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            page1Next();
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
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="mb-4"
              required={true}
            />
          </div>
          <Button type="primary" buttonType="submit" className="w-full mb-2">
            Next
          </Button>
          <p
            onClick={switchLogin}
            className="text-gray-400 underline text-center cursor-pointer hover:text-gray-300"
          >
            Not a user? Signup instead
          </p>
        </form>
      </Dialog>
    );

  return (
    <Dialog title="Signup" onClose={onClose} open={open}>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          onLogin(username, password);
        }}
      >
        <div>
          <Input
            type="password"
            placeholder="Create password"
            className="mb-2"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required={true}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Confirm password"
            value={cpassword}
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
            className="mb-4"
            required={true}
          />
        </div>
        <Button type="primary" buttonType="submit" className="w-full mb-2">
          Create Account
        </Button>
        <p
          onClick={() => {
            reset();
            switchLogin();
          }}
          className="text-gray-400 underline text-center cursor-pointer hover:text-gray-300"
        >
          Already a user? Login instead
        </p>
      </form>
    </Dialog>
  );
};

export default SignupModal;
