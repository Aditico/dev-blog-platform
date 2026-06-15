import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../features/auth/authSlice";
import { logoutUserApi } from "../api/authApi";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUserApi();

      dispatch(logoutUser());

      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <nav className="bg-white shadow">
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">        
        {/* Logo */}
        <Link
          to="/"
        //   className="text-2xl font-bold text-blue-600"
        className="text-3xl font-extrabold text-blue-600"
        >
          DevBlog
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          {user ? (
  <>
    <Link
      to="/profile"
      className="hover:text-blue-600 transition"
    >
      Profile
    </Link>

    <Link
      to="/my-posts"
      className="hover:text-blue-600 transition"
    >
      My Posts
    </Link>

    <Link
      to="/create-post"
      className="hover:text-blue-600 transition"
    >
      Write
    </Link>

    <div className="flex items-center gap-2">
      {user.avatar && (
        <img
          src={user.avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      )}

      <span className="font-medium">
        Hi, {user.name}
      </span>
    </div>

    <button
      onClick={handleLogout}
      className="text-red-500 hover:text-red-700 font-medium"
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link
      to="/login"
      className="hover:text-blue-600 transition"
    >
      Login
    </Link>

    <Link
      to="/register"
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
    >
      Register
    </Link>
  </>
)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;