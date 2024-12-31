
const Profile = () => {
  const role = localStorage.getItem("role");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Profile</h1>
      {role === "customer" && <p>View your salon bookings and favorites.</p>}
      {role === "owner" && <p>Manage your salon details and bookings.</p>}
      {role === "admin" && <p>Oversee platform-wide user activities.</p>}
    </div>
  );
};

export default Profile;
