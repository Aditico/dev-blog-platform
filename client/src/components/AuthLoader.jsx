import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../features/auth/authSlice";

import { getCurrentUser } from "../api/authApi";

const AuthLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await getCurrentUser();

        dispatch(setUser(data.user));
      } catch (error) {
        console.log("No user logged in");
      }
    };

    loadUser();
  }, [dispatch]);

  return null;
};

export default AuthLoader;