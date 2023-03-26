import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Router from "next/router";
import { Form, Button } from "react-bootstrap";

export default function SignUp({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    console.log(`${email}, ${password}`);
    onSubmit({ email, password, username });

    // TODO: Implement the authentication method here
    // Once the user is authenticated, set the token in the auth context
    // const token = await signIn(email, password); // some authentication method that returns a token
    // Redirect the user to the home page

    // Router.push('/');
  };

  return (
    <div className="jumbotron d-flex align-items-center min-vh-100">
      <div className="container-md text-center w-25 p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="75"
          fill="currentColor"
          className="bi bi-book-half"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
        </svg>
        <br></br>
        <br></br>

        <form onSubmit={handleSignUp}>
          <h1 className="h3 mb-3 fw-normal">Sign up!</h1>
          <br></br>

          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br></br>

          <input
            type="text"
            placeholder="Enter username"
            className="form-control"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <br></br>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br></br>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>

    // your sign-in form JSX here
  );
}
