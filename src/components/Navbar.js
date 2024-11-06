import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

const Navbar = () => {
  const { loginSuccess } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <nav className="w-full bg-blue-600 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Books</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline py-2">
          Home
        </Link>
        {!loginSuccess ? (
          <>
            <Link to="/login" className="hover:underline py-2">
              Login
            </Link>
            <Link to="/signup" className="hover:underline py-2">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/book" className="hover:underline py-2">
            Books
            </Link>
            <Link to="/create" className="hover:underline py-2">
              Create
            </Link>

            <button
              onClick={() => dispatch(logout())}
              className="px-2 py-2 bg-inherit rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
