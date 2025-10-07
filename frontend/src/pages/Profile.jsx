import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg"
          alt="User"
          className="profile-img"
          height={100}
        />
        <h2 className="text-warning">{user.username}</h2>
        <p>Email: <span className="text-light">{user.email}</span></p>
        <p>Mobile: <span className="text-light">{user.mobile}</span></p>
        <p>Address: <span className="text-light">{user.address}</span></p>
        {user.gender && (
          <p>Gender: <span className="text-light">{user.gender}</span></p>
        )}
        <button className="btn btn-warning">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
