import { createLazyFileRoute, Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { useUser } from "../hooks/useUser";

export const Route = createLazyFileRoute("/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { register, error, success, pending } = useUser();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name && !email && !password) return;
    await register({ name, email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg p-8 shadow-lg dark:bg-neutral-800">
        <h2 className="mb-6 text-center text-2xl font-bold text-emerald-600">
          Register
        </h2>

        <form
          onSubmit={onSubmit}
          className="space-y-4 text-gray-700 dark:text-white"
        >
          <div>
            <label className="block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="mt-1 w-full rounded-md border border-violet-600 bg-transparent p-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-violet-700"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="mt-1 w-full rounded-md border border-violet-600 bg-transparent p-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-violet-700"
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
              className="mt-1 w-full rounded-md border border-violet-600 bg-transparent p-2 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-violet-700"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="termsAccepted"
              type="checkbox"
              className="cursor-pointer rounded-md text-violet-700 outline-none focus:ring-1 focus:ring-violet-600"
            />
            <label htmlFor="termsAccepted">
              Please accept out{" "}
              <Link className="text-violet-700 hover:text-violet-600">
                terms
              </Link>{" "}
              and{" "}
              <Link className="text-violet-700 hover:text-violet-600">
                privacy policy.
              </Link>
            </label>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}

          <div>
            <button
              type="submit"
              disabled={pending}
              className={`${pending && "cursor-not-allowed disabled:bg-neutral-700"} w-full rounded-md bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-600 focus:ring-opacity-50`}
            >
              {pending ? "Registering...." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
