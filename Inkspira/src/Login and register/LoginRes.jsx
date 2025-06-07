import React, { useState } from 'react';
import './LoginRes.css';

const LoginRes = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-up-container">
        <form>
          <h1>Create Account</h1>
          <input type="text" placeholder="Username" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Register</button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form>
          <h1>Sign in</h1>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details and start your journey with us</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRes;
