import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { usePost } from "../hooks/usePost";

export const Route = createLazyFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const { posts, loading, error } = usePost();
  return (
    <div className="bg-white p-4 text-gray-800 sm:p-6 md:p-8 lg:p-10 xl:p-12 dark:bg-gray-900 dark:text-gray-200">
      {posts &&
        posts.map((post) => (
          <article
            key={post.id}
            className="mb-6 rounded-md bg-gray-100 p-4 shadow-md dark:bg-gray-800"
          >
            <Link
              to={`/post/${post.id}`}
              className="mb-2 text-xl font-semibold sm:text-2xl"
            >
              {post.title}
            </Link>
            <p className="text-base sm:text-lg">{post.body}</p>
          </article>
        ))}

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
  );
}
