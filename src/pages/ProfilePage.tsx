import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  username: string;
  email: string;
  bio: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the JWT token
        const response = await axios.get("http://localhost:5000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          color: "red",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {user && (
        <div style={{ marginTop: "20px" }}>
          <h2>{user.username}</h2>
          <p>
            <strong>Email:</strong> {user.email ? user.email : "Not specified"}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio ? user.bio : "Not specified"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
