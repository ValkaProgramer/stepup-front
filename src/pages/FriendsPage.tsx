import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface Friend {
  id: number;
  username: string;
  photo?: string;
  email: string;
}

interface FriendRequest {
  id: number;
  userId1: number; // Sender
  userId2: number; // Receiver (current user)
  status: string;
  user1Details?: Friend; // Sender details
  user2Details?: Friend; // Receiver details
  senderDetails?: Friend;
}

interface DecodedToken {
  id: number;
}

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);
  const [receivedRequests, setReceivedRequests] = useState<FriendRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [friendRequest, setFriendRequest] = useState("");

  const token = localStorage.getItem("token");
  const decodedToken: DecodedToken | null = token
    ? jwtDecode<DecodedToken>(token)
    : null;
  const currentUserId = decodedToken?.id || null;

  const fetchFriends = async () => {
    try {
      const response = await axios.get<Friend[]>(
        "http://localhost:5000/api/friends",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFriends(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Failed to fetch friends:", err.response?.data);
        toast.error(err.response?.data?.message || "Failed to fetch friends.");
      } else {
        console.error("Unexpected error:", err);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get<FriendRequest[]>(
        "http://localhost:5000/api/friends/requests",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const requests = response.data;

      const requestsWithSenderDetails = await Promise.all(
        requests.map(async (request: FriendRequest) => {
          try {
            const senderResponse = await axios.get<Friend>(
              `http://localhost:5000/api/users/${request.userId1}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            return {
              ...request,
              senderDetails: senderResponse.data,
            };
          } catch (err: unknown) {
            console.error(
              `Failed to fetch sender details for userId1: ${request.userId1}`,
              err
            );
            return request;
          }
        })
      );

      setFriendRequests(requestsWithSenderDetails);

      const sent = requests.filter(
        (request: FriendRequest) => request.userId1 === currentUserId
      );
      const received = requests.filter(
        (request: FriendRequest) => request.userId2 === currentUserId
      );

      setSentRequests(sent);
      setReceivedRequests(received);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Failed to fetch friend requests:", err.response?.data);
        toast.error(
          err.response?.data?.message || "Failed to fetch friend requests."
        );
      } else {
        console.error("Unexpected error:", err);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (!currentUserId) {
      toast.error("Failed to identify the current user.");
      return;
    }

    fetchFriends();
    fetchFriendRequests();
  }, [currentUserId]);

  const handleSendRequest = async () => {
    try {
      const response = await axios.post<{ message: string }>(
        "http://localhost:5000/api/friends",
        { friendId: friendRequest },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchFriendRequests();
      toast.success(response.data.message);
      setFriendRequest("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Failed to send friend request:", err.response?.data);
        toast.error(err.response?.data?.message || "Failed to send request.");
      } else {
        console.error("Unexpected error:", err);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleAcceptRequest = async (requestId: number) => {
    try {
      const response = await axios.put<{ message: string }>(
        `http://localhost:5000/api/friends/${requestId}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      fetchFriends();
      fetchFriendRequests();
      setFriendRequests(friendRequests.filter((req) => req.id !== requestId));
      setReceivedRequests(
        receivedRequests.filter((req) => req.id !== requestId)
      );
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Failed to accept friend request:", err.response?.data);
        toast.error(err.response?.data?.message || "Failed to accept request.");
      } else {
        console.error("Unexpected error:", err);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleRejectRequest = async (requestId: number) => {
    try {
      const response = await axios.delete<{ message: string }>(
        `http://localhost:5000/api/friends/${requestId}/reject`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      fetchFriendRequests();
      setFriendRequests(friendRequests.filter((req) => req.id !== requestId));
      setReceivedRequests(
        receivedRequests.filter((req) => req.id !== requestId)
      );
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Failed to reject friend request:", err.response?.data);
        toast.error(err.response?.data?.message || "Failed to reject request.");
      } else {
        console.error("Unexpected error:", err);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleDeleteSentRequest = async (requestId: number) => {
    try {
      const response = await axios.delete<{ message: string }>(
        `http://localhost:5000/api/friends/${requestId}/reject`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchFriendRequests();
      toast.success(response.data.message);
      setSentRequests(sentRequests.filter((req) => req.id !== requestId));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Failed to delete sent request:", err.response?.data);
        toast.error(err.response?.data?.message || "Failed to delete request.");
      } else {
        console.error("Unexpected error:", err);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend?.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="text-black w-[70%] mx-auto mt-10">
      {/* Friend Request Section */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Enter Friend's ID"
          value={friendRequest}
          onChange={(e) => setFriendRequest(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-2xl mb-3"
        />
        <button
          onClick={handleSendRequest}
          className="w-full bg-[#FFDF2B] text-white font-bold py-2 px-4 rounded-2xl hover:bg-[#E5C700] transition"
        >
          Send a request
        </button>
      </div>

      {/* Sent Requests Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-5">Sent Requests</h2>
        {sentRequests.length > 0 ? (
          sentRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md mb-3"
            >
              <div className="flex items-center">
                {request.user2Details?.photo ? (
                  <img
                    src={`http://localhost:5000${request.user2Details.photo}`}
                    alt={request.user2Details.username}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">
                      {request.user2Details?.username[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {request.user2Details?.username || "Unknown User"}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => handleDeleteSentRequest(request.id)}
                className="bg-red-500 text-white font-bold py-1 px-3 rounded-2xl hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No sent requests.</p>
        )}
      </div>

      {/* Received Requests Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-5">Received Requests</h2>
        {receivedRequests.length > 0 ? (
          receivedRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md mb-3"
            >
              <div className="flex items-center">
                {request.user1Details?.photo ? (
                  <img
                    src={`http://localhost:5000${request.user1Details.photo}`}
                    alt={request.user1Details.username}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">
                      {request.user1Details?.username[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold">
                    {request.user1Details?.username || "Unknown User"}
                  </h3>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleAcceptRequest(request.id)}
                  className="bg-green-500 text-white font-bold py-1 px-3 rounded-2xl hover:bg-green-600 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRejectRequest(request.id)}
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded-2xl hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No received requests.</p>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-5">My Friends</h1>

      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-2xl"
        />
      </div>

      {/* Friends List */}
      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFriends.map((friend) => (
          <div
            key={friend?.id}
            className="flex items-center p-4 bg-white rounded-2xl shadow-md"
          >
            {friend?.photo ? (
              <img
                src={`http://localhost:5000${friend.photo}`}
                alt={friend.username}
                className="w-16 h-16 rounded-full mr-4"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-white">
                  {friend?.username[0].toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold">{friend?.username}</h2>
              <p className="text-sm text-gray-500">{friend?.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* No Friends Found */}
      {filteredFriends.length === 0 && (
        <p className="text-center text-gray-500 mt-5">
          No friends found. Try searching for someone else.
        </p>
      )}
    </div>
  );
};

export default FriendsPage;
