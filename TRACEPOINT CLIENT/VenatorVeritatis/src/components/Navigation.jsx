import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/case", label: "Case" },
  { to: "/suspects", label: "Suspects" },
  { to: "/evidence", label: "Evidence" },
  { to: "/investigation", label: "Investigation" },
];

export default function Navigation() {
  return (
    <header className="nav">
      <span className="nav-brand">TracePoint</span>
      <nav aria-label="Main">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}