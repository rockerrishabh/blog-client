import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { usePost } from "../../hooks/usePost";

export const Route = createFileRoute("/post/$postId")({
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();

  const { post, fetchPost, loading, error } = usePost();

  useEffect(() => {
    fetchPost(postId);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow overflow-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        {post && (
          <article className="mb-6 rounded-md bg-gray-100 p-4 shadow-md dark:bg-gray-800">
            <h2 className="mb-2 text-xl font-semibold sm:text-2xl">
              {post.title}
            </h2>
            <p className="text-base sm:text-lg">{post.body}</p>
            <Link to={`/post/${post.id}/update`}>Update</Link>
          </article>
        )}

        {error && (
          <p className="text-base text-red-500 sm:text-lg dark:text-red-300">
            {error}
          </p>
        )}

        {loading && (
          <p className="text-center text-base text-blue-500 sm:text-lg dark:text-blue-300">
            Loading...
          </p>
        )}
      </div>
    </div>
  );
}
