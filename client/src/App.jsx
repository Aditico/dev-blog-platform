import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MyPosts from "./pages/MyPosts";
import MainLayout from "./layouts/MainLayout";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLoader from "./components/AuthLoader";

import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
      <AuthLoader />
      <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
    }}
  />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={<Login />}
          />
          <Route
  path="/create-post"
  element={
    <ProtectedRoute>
      <CreatePost />
    </ProtectedRoute>
  }
/>
<Route
  path="/posts/:id"
  element={<PostDetails />}
/>
          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
  path="/my-posts"
  element={
    <ProtectedRoute>
      <MyPosts />
    </ProtectedRoute>
  }
/>
<Route
  path="/edit-post/:id"
  element={
    <ProtectedRoute>
      <EditPost />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;