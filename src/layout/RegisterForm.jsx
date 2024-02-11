import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      // validation
      if (input.password !== input.confirmPassword) {
        return alert("Please check confirm password");
      }

      const rs = await axios.post("http://127.0.0.1:8000/auth/register", input);
      console.log(rs);
      if (rs.status === 200) {
        alert("Register Successful");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-5 border w-3/6 min-w-[500px] mx-auto rounded mt-5 ">
      <div className="text-3xl mb-5 text-center">Register Form</div>
      <form className="flex flex-col gap-5" onSubmit={hdlSubmit}>
        <div className="name flex justify-center gap-20">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">First name</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Not required"
              name="firstName"
              value={input.firstName}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Last name</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              placeholder="Not required"
              name="lastName"
              value={input.lastName}
              onChange={hdlChange}
            />
          </label>
        </div>
        <div className="phone-email flex justify-center gap-20">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Phone</span>
            </div>
            <input
              type="tel"
              className="input input-bordered w-full max-w-xs"
              placeholder="Not required"
              name="phone"
              value={input.phone}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">E-mail</span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full max-w-xs"
              name="email"
              value={input.email}
              onChange={hdlChange}
            />
          </label>
        </div>
        <div className="uName-password mx-auto flex flex-col gap-5">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">username</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              name="username"
              value={input.username}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Confirm Password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={hdlChange}
            />
          </label>
        </div>
        <p className="text text-center">
          If you have accout. Go to <a className="login underline text-red-700" href="#">
          <Link to='/'>Login</Link>
          </a>
        </p>
        <div className="flex gap-10 justify-center">
          <button type="submit" className="btn btn-outline btn-info mt-1 w-[250px] max-w-xs">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
