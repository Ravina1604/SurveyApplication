import React, { useState } from "react";
import "./Login.scss";
import LoginForm from "./LoginForm";
// import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from '../../store/actions/authActions';
import { Redirect } from "react-router-dom";


const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const authError = useSelector(state => state.auth.authError);
  const dispatch = useDispatch();

  if (isAuthenticated) {
    return <Redirect to="/forms" />;
  }
  return (
    <div className="login-container">
      <div className="login-container-form">
        <ul className="nav justify-content-center">
          <li
            className={`nav-item ${!showSignup ? "active" : ""}`}
            onClick={() => setShowSignup(false)}
          >
            <label>Login</label>
          </li>
          <li
            className={`nav-item ${showSignup ? "active" : ""}`}
            onClick={() => setShowSignup(true)}
          >
            <label>Sign Up</label>
          </li>
        </ul>
        <div className="tab-content">
          <LoginForm 
            showSignup={showSignup} 
            login={(user)=> dispatch(login(user))}
            signup={(user)=> dispatch(signup(user))}
            authError={authError}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
