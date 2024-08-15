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
                  className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-200"
                  onClick={logout}
                >
                  {item}
                </button>
              ) : (
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-200"
                >
                  {item}
                </Link>
              )}
            </li>
          ))}
        </ul>
        
        <div className="flex items-center space-x-4">
          {Auth.loggedIn() ? (
            <>
              <Link
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-200"
                to="/me"
              >
                View My Profile
              </Link>
              <button
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-200"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-200"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-200"
                to="/signup"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;