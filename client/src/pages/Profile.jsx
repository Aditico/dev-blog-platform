import { uploadAvatarApi } from "../api/uploadApi";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setUser } from "../features/auth/authSlice";
import { updateProfile } from "../api/userApi";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] =
  useState(false);

  const handleAvatarUpload = async (
  e
) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    setUploading(true);

    const data =
      await uploadAvatarApi(file);

    dispatch(
      setUser({
        ...user,
        avatar: data.avatar,
      })
    );

    toast.success("Avatar uploaded successfully");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Upload failed"
    );
  } finally {
    setUploading(false);
  }
};
  if (!user) {
    return (
      <div className="text-center mt-10">
        Loading profile...
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await updateProfile({
        name,
        bio,
      });

      dispatch(setUser(data.user));

      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Profile
      </h1>

      {/* {user.avatar && (
        <img
          src={user.avatar}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
      )} */}
      <div className="mb-6">
  {user.avatar ? (
    <img
      src={user.avatar}
      alt="avatar"
      className="w-24 h-24 rounded-full object-cover mb-4"
    />
  ) : (
    <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
  )}

  <input
    type="file"
    accept="image/*"
    onChange={handleAvatarUpload}
  />

  {uploading && (
    <p className="mt-2 text-blue-600">
      Uploading...
    </p>
  )}
</div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Email
          </label>

          <input
            type="email"
            value={user.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Bio
          </label>

          <textarea
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
            rows="4"
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading
            ? "Saving..."
            : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;