import { Link } from "@tanstack/react-router";

type Props = {
  children: React.ReactNode;
  to: string;
};

function NavLink({ children, to }: Props) {
  return (
    <li className="hover:scale-105">
      <Link
        className="hover:text-emerald-600 [&.active]:font-bold [&.active]:text-violet-600"
        to={to}>
        {children}
      </Link>
    </li>
  );
}

export default NavLink;
