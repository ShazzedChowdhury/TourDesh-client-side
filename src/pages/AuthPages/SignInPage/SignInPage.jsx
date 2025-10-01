import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import './SignInPage.css'
import sweetMessage from '../../../Utils/sweetMessage';
import useAuth from '../../../hooks/useAuth';
import GoogleSignIn from '../../../shared/GoogleSignIn/GoogleSignIn';
const SignInPage = () => {
    const { signIn, setUser } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        //sign in with firebase
        signIn(email, password)
          .then((result) => {
            const currentUser = result.user;
            setUser(currentUser);
            sweetMessage("Logged in successfully.", "success");
            navigate(location?.state || "/");
          })
          .catch((error) => {
            if (
              error.message === "Firebase: Error (auth/invalid-credential)."
            ) {
              sweetMessage("Wrong password. try again.", "error");
            } else {
              sweetMessage("somethings went wrong. try again.", "error");
            }
          });
    }
    return (
      <div>
        <form className="fieldset" onSubmit={handleSignIn}>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-primary mt-4">
            Login
          </button>
        </form>
        <p className="text-sm">
          Don't have any account?
          <Link className="text-primary" to="/register">
            Register
          </Link>{" "}
          now.
        </p>
        <div className="divider">OR</div>
        <GoogleSignIn />
      </div>
    );
};

export default SignInPage;