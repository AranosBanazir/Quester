import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ME } from '../../utils/queries';
import Auth from '../../utils/auth'; // Import Auth for authentication

function Navbar() {
  const { data } = useQuery(ME);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const userType = data?.me?.__typename || "user";
  const userData = data?.me || {}; // Get user data from the query

  let navItems = [];
  if (userType === "Parent") {
    navItems = ["Rewards", "Tasks", "Kids", "View My Profile", "Logout"];
  } else if (userType === "Child") {
    navItems = ["Shop", "Tasks", "Inventory", "Logout"];
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md rounded-b-xl">
      <div className="container mx-auto flex flex-wrap items-center py-4 px-6">
        {/* Quester Title */}
        <div className="lg:hidden flex-grow flex justify-center items-center">
          <h1 className="text-3xl permanent-marker-regular">Quester</h1>
        </div>

        {/* Burger Menu for Small Screens */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white text-5xl focus:outline-none"
          >
            ☰
          </button>
          <div className={`absolute z-50 top-0 left-0 w-full bg-gray-900 text-white p-4 ${isMenuOpen ? 'block' : 'hidden'}`} ref={menuRef}>
            <button onClick={toggleMenu} className="text-white text-2xl absolute top-2 right-2 z-50">
              ✕
            </button>
            <ul className="flex flex-col items-center space-y-4 mt-8">
              {navItems.map((item) => (
                <li key={item} className="w-full text-center">
                  {item === "Logout" ? (
                    <button
                      className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble w-full"
                      onClick={(e) => { logout(e); handleMenuItemClick(); }}
                    >
                      <p className="mb-7">{item}</p>
                    </button>
                  ) : item === "View My Profile" ? (
                    <Link
                      to="/account"
                      className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble w-full"
                      onClick={handleMenuItemClick}
                    >
                      <p className="mb-7">{item}</p>
                    </Link>
                  ) : (
                    <Link
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble w-full"
                      onClick={handleMenuItemClick}
                    >
                      <p className="mb-7">{item}</p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation Links for Larger Screens */}
        <div className="hidden lg:flex lg:justify-between lg:items-center lg:w-full">
          <div className="flex-grow flex justify-start">
            <ul className="flex flex-row space-x-4">
              {navItems.filter(item => item !== "View My Profile" && item !== "Logout").map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble"
                  >
                    <p className="mb-7">{item}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-none flex items-center space-x-4">
            {userType === "Parent" && (
              <>
                <Link
                  to="/account"
                  className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble"
                >
                  <p className="mb-7">View My Profile</p>
                </Link>
              </>
            )}
            <button
              className="btn-sign text-white rounded-md px-4 py-2 nav-sign wobble"
              onClick={logout}
            >
              <p className="mb-7">Logout</p>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

{/* Auth Modal */}
              {/* <AuthModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
                userData={userData}
              /> */}
            
