import axios from "axios";

import { toast } from "sonner";
import { useState } from "react";

import { useAuth } from "../hooks/use-auth";

import profileImage from "../assets/user-profile.jpg";

export const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { checkAuth } = useAuth();

  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");

      if (res.status === 200) {
        toast.success(res.data.message);
        checkAuth();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.error);
        return toast.error(error.response?.data.error);
      }
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button
        className="border rounded-full w-8 h-8"
        onClick={() => setIsOpen((prev) => !prev)}
        onBlur={() => {
          setTimeout(() => {
            setIsOpen(false);
          }, 150);
        }}
      >
        <img
          src={profileImage}
          alt="avatar"
          width={30}
          height={30}
          className="rounded-full"
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 bg-surface-container-low-light rounded-md dark:bg-surface-dark border border-on-surface-variant-light/20 p-3">
          <button onClick={logout}>SignOut</button>
        </div>
      )}
    </div>
  );
};
