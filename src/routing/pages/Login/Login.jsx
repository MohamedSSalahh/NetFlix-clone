import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/logo.png";
import "./login.css";
import { login, signup } from "../../../firebase";
 import netflix_spinner from "../../assets/netflix_spinner.gif"
function Login() {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 
  const navigate =useNavigate()



  const user_auth = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      // navigate('/browse'); // Redirect after successful auth
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isLoading  ? <div className='login-spinner'>
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className="login">
      <img src={logo} alt="Netflix Logo" className='logo'/>
      <div className="login-form">
        <h1>{signState}</h1>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={user_auth}>
          {signState === "Sign up" && (
            <input 
              value={name}
              type="text"
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
              minLength={2}
              required
            />
          )}
          
          <input 
            value={email}
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input 
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? 'Please wait...' : signState}
          </button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              Don't have an account?{' '}
              <span onClick={() => {
                setSignState("Sign up");
                setError("");
              }}>
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => {
                setSignState("Sign In");
                setError("");
              }}>
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;