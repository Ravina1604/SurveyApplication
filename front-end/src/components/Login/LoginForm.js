import React, { useState, useEffect } from "react";

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(props.authError);

  useEffect(() => {
    setError("");
    setName("");
    setPassword("");
    setEmail("");
  }, [props.showSignup]);

  useEffect(() => {
    setError(props.authError);
  }, [props.authError]);

  const submitForm = (e) => {
        e.preventDefault();
        if (email === "" || password === "" || (props.showSignup && name === "")) {
          setError("Fields are required");
          return;
        }
        if(!props.showSignup) {
          props.login({email,password});
        } else {
          props.signup({email,password,name});
        }
  };

  return (
    <form>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      {props.showSignup ? (
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter User Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
      ) : null}

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      {error && (
          <label style={{color:'red'}}>{error}</label>
      )}
      <br/>

      <button type="submit" className="btn" onClick={submitForm}>
        {props.showSignup ? "Register" : "Sign In"}
      </button>
    </form>
  );
}
