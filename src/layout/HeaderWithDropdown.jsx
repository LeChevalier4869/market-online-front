import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const guestNav = [
  { to: "/login", text: "Login" },
  { to: "/register", text: "Register" },
];

const userNav = [
  { to: "/favorite", text: "Favorite" },
  { to: "/cart", text: "Cart" },
];

const adminNav = [
  { to: "/myproduct", text: "My Product" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = user?.id ? user?.role === 'ADMIN' ? adminNav: userNav : guestNav;

  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-200 flex justify-around">
      <div className="flex-0 absolute top-3 left-3">
        <Link to='/' className="btn btn-ghost text-xl">AKA</Link>
      </div>
      <div className="absolute">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
      </div>
      <div className="flex absolute top-3 right-10">
        <ul className="menu menu-horizontal px-1">
        { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id && (
          <li>
            <details>
              <summary className="box box-border">
                {user?.id ? user.username : "Guest"}
              </summary>
              <ul className="p-2 bg-base-200 rounded-t-none">
              
            <li>
              <Link to='#' onClick={hdlLogout}>Logout</Link>
            </li>
          
              </ul>
            </details>
          </li>
          ) }
        </ul>
      </div>
    </div>
  );
}
