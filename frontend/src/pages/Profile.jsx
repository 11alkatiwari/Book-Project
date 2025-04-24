import React, { useState } from "react";
import "./Profile.css"; // ✅ Import custom CSS

const Profile = () => {
  const [user, setUser] = useState({
    fullName: "harry Doe",
    email: "harry@example.com",
    mobile: "+91 987654321000",
    gender: "Male",
  });

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* User Image */}
        <img src="https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg" alt="User" className="profile-img" height={100}/>

        {/* User Details */}
        <h2 className="text-warning">{user.fullName}</h2>
        <p>Email: <span className="text-light">{user.email}</span></p>
        <p>Mobile: <span className="text-light">{user.mobile}</span></p>
        <p>Gender: <span className="text-light">{user.gender}</span></p>

        {/* Edit Profile Button */}
        <button className="btn btn-warning">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
