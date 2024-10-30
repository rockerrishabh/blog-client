import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useUser } from "../hooks/useUser";

export const Route = createLazyFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, success, pending, token } = useUser();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email && !password) return;
    await login({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8 shadow-lg dark:bg-neutral-800">
        <h2 className="mb-6 text-center text-2xl font-bold text-violet-600">
          Login
        </h2>

        <form
          onSubmit={onSubmit}
          className="space-y-4 text-gray-700 dark:text-white"
        >
          <div>
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="mt-1 w-full rounded-md border border-emerald-600 bg-transparent p-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-700"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="mt-1 w-full rounded-md border border-emerald-600 bg-transparent p-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-700"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Link className="text-violet-700 hover:text-violet-600">
              Forgot Password ?
            </Link>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}
          {token && <p className="text-sm text-green-500">{token}</p>}

          <div>
            <button
              type="submit"
              disabled={pending}
              className={`${pending && "cursor-not-allowed disabled:bg-neutral-700"} w-full rounded-md bg-violet-700 px-4 py-2 text-white hover:bg-violet-600 focus:ring-4 focus:ring-violet-600 focus:ring-opacity-50`}
            >
              {pending ? "Logging in...." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
