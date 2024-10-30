import { useEffect, useState } from "react";
import { Post, PostContext, PostData } from "../contexts/PostContext";
import axios from "axios";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function PostProvider({ children }: ThemeProviderProps) {
  const [post, setPost] = useState<Post>();
  const [posts, setPosts] = useState<Post[]>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>();

  const fetchPost = async (id: string) => {
    setPost(undefined);
    setError(undefined);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch(`/api/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setPost(data);
      } else {
        setError(data as string);
      }
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setPosts(undefined);
    setError(undefined);
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch("/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setPosts(data as Post[]);
      } else {
        setError(data as string);
      }
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (
    id: string,
    token: string,
    updatePostData: PostData,
  ) => {
    setError("");
    setSuccess("");
    setPending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(token, updatePostData);

      const res = await fetch(
        `/api/posts/${id}/update`,

        {
          method: "PUT",
          body: JSON.stringify(updatePostData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include", // This enables cookie handling
        },
      );
      const data = await res.json();

      if (res.ok) {
        setSuccess((data as { success: string }).success);
      } else {
        setError((data as { error: string }).error);
      }
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const value = {
    post,
    posts,
    success,
    error,
    loading,
    pending,
    fetchPost,
    updatePost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
