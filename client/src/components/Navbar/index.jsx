import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import Auth from '../../utils/auth'; // Import Auth for authentication
import AuthModal from '../AuthModal/index'; // Import AuthModal

function Navbar() {
  const { loading, error, data } = useQuery(ME);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userType = data?.me?.__typename || "user";
  const userData = data?.me || {}; // Get user data from the query

  let navItems = [];
  if (userType === "Parent") {
    navItems = ["Rewards", "Tasks", "Kids"];
  } else if (userType === "Child") {
    navItems = ["Shop", "Tasks", "Inventory"];
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleModalSubmit = (formData) => {
    console.log('Submitted data:', formData);
    console.log('Current User Info:', userData); // Log current user info
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md rounded-b-xl">
      <div className="container mx-auto flex flex-wrap justify-between items-center py-4 px-6">
        <ul className="flex space-x-4 flex-wrap">
          {navItems.map((item) => (
            <li key={item}>
              {item === "Logout" ? (
                <button
                  className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble"
                  onClick={logout}
                >
                  <p className="mb-7">{item}</p>
                </button>
              ) : (
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble"
                >
                  <p className="mb-7">{item}</p>
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        <div className="flex items-center space-x-4">
          {Auth.loggedIn() && userType === 'Parent' ? (
            <>
              <Link
                className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble"
                to="/account"
              >
                <p className="mb-7">View My Profile</p>
              </Link>
              <button
                className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble"
                onClick={logout}
              >
                <p className="mb-7">Logout</p>
              </button>
              {/* TODO Figuure out what is going on with this modal */}
              <AuthModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
                userData={userData} // Pass user data to the modal
              />
            </>
          ) : Auth.loggedIn() && userType === 'Child' ? (
            <>
              <button
                className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble"
                onClick={logout}
              >
                <p className="mb-7">Logout</p>
              </button>
            </>
          ) : (
            <>
              <Link
                className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble"
                to="/login"
              >
                <p className="mb-7">Login</p>
              </Link>
              <Link
                className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble"
                to="/signup"
              >
                <p className="mb-7">Signup</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
