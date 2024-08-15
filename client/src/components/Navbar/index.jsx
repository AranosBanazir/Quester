import React from "react";
import { Link } from "react-router-dom";
import { ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from "../../utils/auth"; // Import Auth for authentication

function Navbar() {
  const { loading, error, data } = useQuery(ME);
  const userType = data?.me.__typename || "user";

  // Determine navItems based on user type
  let navItems = [];
  if (userType === "Parent") {
    navItems = ["Rewards", "Tasks", "Kids"];
  } else if (userType === "Child") {
    navItems = ["Rewards", "Tasks"];
  }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md rounded-b-xl">
      <div className="container mx-auto flex flex-wrap justify-between items-center py-4 px-6">
      <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item}>
              {item === "Logout" ? (
                <button
                  className="btn-sign text-white rounded-md px-4 py-2 nav-sign "
                  onClick={logout}
                >
                  <p className="mb-7">
                  {item}
                  </p>
                </button>
              ) : (
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="btn-sign text-white rounded-md px-4 py-2 nav-sign"
                >
                  <p className="mb-7">
                  {item}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        <div className="flex items-center space-x-4">
          {Auth.loggedIn() && userType === 'Parent' ? (
            <>
              <Link
                className="btn-sign text-white rounded-md px-4 py-2 nav-sign"
                to="/me"
              >
                <p className="mb-7">
                View My Profile
               </p>
              </Link>
              <button
                className="btn-sign text-white rounded-md px-4 py-2 nav-sign"
                onClick={logout}
              >
              <p className="mb-7">
                Logout
              </p>
              </button>
            </>
          ) : Auth.loggedIn() && userType === 'Child' ? (
            <>
            <button
              className="btn-sign text-white rounded-md px-4 py-2 nav-sign"
              onClick={logout}
            >
              <p className="mb-7">
                Logout
              </p>
            </button>
          </>
          ):          
          (
            <>
              <Link
                className="btn-sign text-white rounded-md px-4 py-2 nav-sign"
                to="/login"
              >
                <p className="mb-7">
                  Login
                </p>
              </Link>
              <Link
                className="btn-sign text-white rounded-md px-4 py-2 nav-sign"
                to="/signup"
              >
              <p className="mb-7">
                  Signup
                </p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;