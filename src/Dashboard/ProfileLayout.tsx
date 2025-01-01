// ProfileLayout.tsx (New file)
import { Outlet } from 'react-router-dom';

const ProfileLayout = () => {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-full p-10">
        {/* Profile content will go here */}
        <Outlet /> {/* This will render Profile component */}
      </div>
    </div>
  );
};

export default ProfileLayout;
