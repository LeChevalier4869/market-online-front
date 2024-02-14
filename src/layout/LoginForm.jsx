import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const hdlChange = e => {
    setInput( prv => ({ ...prv, [e.target.name] : e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();

      const result = await axios.post(
        'http://127.0.0.1:8000/auth/login',
        input
      );
      console.log(result.data.token);
      localStorage.setItem("token", result.data.token);
      const result1 = await axios.get('http://127.0.0.1:8000/auth/me', {
        headers: { Authorization : `Bearer ${result.data.token}` }
      });
      console.log(result1.data);
      setUser(result1.data);
      navigate('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-5 border w-2/6 min-w-[500px] mx-auto rounded mt-5 ">
      <div className="text-3xl mb-5 text-center">Login Form</div>
      <form className="flex flex-col gap-5" onSubmit={hdlSubmit}>
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
        </div>
        <p className="text text-center">
          If you have no accout. Go to{" "}
          <a className="login underline text-red-700" href="#">
          <Link to='/register'>Register</Link>
          </a>
        </p>
        <div className="flex gap-10 justify-center">
          <button
            type="submit"
            className="btn btn-outline btn-info mt-1 max-w-xs w-[250px]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
