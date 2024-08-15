import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../../utils/mutations"; // Import the mutation
import { QUERY_SINGLE_USER, ME } from "../../utils/queries";

const AuthModal = ({ isOpen, onClose, userData }) => {
  const { loading, data } = useQuery(ME);
  const userType = data?.me?.__typename || "user";
  const userInfo = useQuery(QUERY_SINGLE_USER, {
    variables: {
      userId: data?.me?._id,
    },
  });
  const [username, setUsername] = useState(userData.username || "");
  const [email, setEmail] = useState(userData.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [updateUser] = useMutation(UPDATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const creds = { username: userData.username, password: password };
      const updatedUserInfo = { username, email, password: password || null };

      console.log("Sending variables:", { creds, updatedUserInfo });

      const { data } = await updateUser({
        variables: { creds, updatedUserInfo },
      });

      console.log("User updated:", data.updateUser);
      onClose(); // Close the modal on success
    } catch (err) {
      console.error("Error updating user:", err);
      setError("An error occurred while updating user data.");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
      onClick={onClose}
    >
      <div
        className="relative bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-white">Change User Info</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-white"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
