import { useState, useRef, useContext } from "react";
import { useHistory } from 'react-router-dom';

import AuthContext  from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    // Prevent send request automativcally
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation
    setIsLoading(true);
    // Send different http to different url
    let url;
    if (isLogin) {
      // Send different http to different url
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-S4X373j9cM_32IiWjJa2u6MIySEymb4';
    } else {
      // Send Request
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-S4X373j9cM_32IiWjJa2u6MIySEymb4';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          // Get data that's coming back with response
          // Syntax return a promise -> use then to get access to actual response data
          return res.json().then((data) => {
            // Show an error modal
            let errorMessage = "Authentication failed";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }
            // alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
        authCtx.login(data.idToken, expirationTime.toISOString());
        // Redirect user to different page & replace (cant backto previous place);
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >            
            {isLogin ?  "Create new account" : "Login with existing account"}            
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
