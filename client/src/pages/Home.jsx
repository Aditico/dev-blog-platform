import { useEffect, useState } from "react";

import { getPosts } from "../api/postApi";

import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();

        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <h2>Loading posts...</h2>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        Latest Posts
      </h1>

      <div className="grid gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;