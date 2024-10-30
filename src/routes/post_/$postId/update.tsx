import { createFileRoute } from "@tanstack/react-router";
import { usePost } from "../../../hooks/usePost";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";

export const Route = createFileRoute("/post/$postId/update")({
  component: UpdateComponent,
});

export default function UpdateComponent() {
  const { postId } = Route.useParams();
  const { post, fetchPost, loading, error, updatePost, success, pending } =
    usePost();
  const { token } = useUser();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetchPost(postId);
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    if (!token) return;

    await updatePost(postId, token, {
      title,
      body,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Update Post
        </h2>

        {loading && (
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {post && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-200 p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-indigo-300 dark:focus:ring-indigo-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Body
              </label>
              <textarea
                defaultValue={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-200 p-2 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:border-indigo-300 dark:focus:ring-indigo-300"
                rows={5}
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={pending}
                className={`${pending && "cursor-not-allowed disabled:bg-neutral-700"} rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:ring focus:ring-indigo-300 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-400`}
              >
                {pending ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        )}
        {success && <p>{success}</p>}
      </div>
    </div>
  );
}
