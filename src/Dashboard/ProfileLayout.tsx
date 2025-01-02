// ProfileLayout.tsx (New file)
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-full p-10">
        {/* Profile content will go here */}
        <h1>This ie profile section </h1>
        <Outlet /> {/* This will render Profile component */}
      </div>
    </div>
  );
};

export default ProfileLayout;
