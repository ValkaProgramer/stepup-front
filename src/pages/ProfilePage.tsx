import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserRound } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface User {
  username: string;
  email: string;
  bio: string;
  photo: string;
}

const ProfilePage: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    bio: "",
    photo: null as File | null,
  });
  const [message, setMessage] = useState("");

  const currentUserId = jwtDecode<{ id: number }>(
    localStorage.getItem("token") || ""
  ).id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/users/${currentUserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setForm({
          email: response.data.email || "",
          bio: response.data.bio || "",
          photo: null,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUserId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, photo: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("bio", form.bio);
    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/users/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    }
  };

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
    <div
      className="text-black w-[70%] top-[20px]"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <h1 className="w-[50%] font-semibold text-left">My Profile</h1>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl font-semibold">Personal Details</p>
        <button
          className="cursor-pointer"
          onClick={() => setEditMode(!editMode)}
          style={{
            padding: "10px",
            color: "#FFDF2B",
          }}
        >
          Change
        </button>
      </div>
      {user && !editMode ? (
        <div
          className="flex bg-white rounded-2xl shadow-md"
          style={{ marginTop: "20px" }}
        >
          {user.photo ? (
            <img
              className="m-5"
              src={`http://localhost:5000${user.photo}`}
              alt="Profile"
              style={{ width: "20vw", height: "20vw", borderRadius: "50%" }}
            />
          ) : (
            <div className="flex justify-center items-center m-5 w-[20vw] h-[20vw] rounded-[50%] bg-[#FFDF2B]">
              <UserRound
                className="overlay-hidden w-[15vw] h-[15vw]"
                color="white"
              ></UserRound>
            </div>
          )}
          <div className="p-5 flex flex-col items-left">
            <h2 className="text-left">{user.username}</h2>
            <p className="text-left border-b-1 ">
              {" "}
              ID :{" "}
              {
                jwtDecode<{ id: number }>(localStorage.getItem("token") || "")
                  .id
              }
            </p>
            <div className="text-left border-b-1 ">
              {user.email ? (
                user.email
              ) : (
                <p className="opacity-50">email@email.com</p>
              )}
            </div>
            <div className="text-left">
              {user.bio ? user.bio : <p className="opacity-50">Bio</p>}
            </div>
          </div>
        </div>
      ) : (
        <form
          className="pt-7 flex flex-col items-center bg-white rounded-2xl"
          onSubmit={handleSubmit}
        >
          <div className="flex pl-5">
            <div className="flex flex-col items-center">
              <div className="">
                {user?.photo ? (
                  <img
                    className="m-5"
                    src={`http://localhost:5000${user.photo}`}
                    alt="Profile"
                    style={{
                      width: "20vw",
                      height: "20vw",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <div className="flex justify-center items-center m-5 w-[20vw] h-[20vw] rounded-[50%] bg-[#FFDF2B]">
                    <UserRound
                      className="overlay-hidden w-[15vw] h-[15vw]"
                      color="white"
                    ></UserRound>
                  </div>
                )}
              </div>
              <input className="p-5" type="file" onChange={handleFileChange} />
            </div>
            <div className="flex flex-col items-left p-5">
              <div className="">
                <label className="p-5">Email:</label>
                <input
                  className="bg-[#E7E7E3] p-1"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="flex items-center">
                <label className="p-5">Bio:</label>
                <textarea
                  className="bg-[#E7E7E3]"
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                />
              </div>
            </div>
          </div>
          <button
            className="max-w-[80%] cursor-pointer mt-4 mb-4 rounded-[100px] bg-[#FFDF2B]"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Update Profile
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfilePage;
