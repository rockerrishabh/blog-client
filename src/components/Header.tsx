import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle";
import { links } from "../constants/Links";
import NavLink from "./NavLink";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white px-5 py-3 shadow-md md:px-20 dark:bg-neutral-800">
      <Link
        to={"/"}
        className="text-2xl font-bold opacity-90 hover:scale-105 hover:opacity-100 text-violet-600">
        Blog <span className="text-emerald-600">App</span>
      </Link>
      <nav>
        <ul className="flex items-center gap-4">
          {links.map((link) => (
            <NavLink key={link.name} to={link.to}>
              {link.name}
            </NavLink>
          ))}
        </ul>
      </nav>
      <section className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          to="/login"
          className="rounded-md px-4 py-2 bg-violet-700 text-white hover:bg-violet-600">
          Login &rarr;
        </Link>
        <Link
          to="/register"
          className="rounded-md bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-600">
          Register
        </Link>
      </section>
    </header>
  );
}

export default Header;
