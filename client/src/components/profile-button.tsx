import { useState } from "react";

import profileImage from "../assets/user-profile.jpg";

export const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          <button>SignOut</button>
        </div>
      )}
    </div>
  );
};
