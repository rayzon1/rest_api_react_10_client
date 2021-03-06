import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserName, setUserPassword } from "../actions/SignInActions";
import Jump from "react-reveal/Jump";

function UserSignIn({

  history,
 
  coursesPropsObj
}) {
  const dispatch = useDispatch();
  const { signIn, signedInUser, failedSignIn, setFailedSignIn } = coursesPropsObj;

  const validationErrors = () => {
    return (
      <Jump>
        <h2 class="validation--errors--label">Validation errors</h2>
        <div class="validation-errors">
          <ul>
            <li style={{ color: "red" }}>
              Email address and/or password is incorrect.
            </li>
          </ul>
        </div>
      </Jump>
    );
  };

  return (
    <>
      <hr />
      <div className="bounds">
        <div className="grid-33 centered signin">
          {failedSignIn && validationErrors()}

          <h1>Sign In</h1>
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                signIn(history);
              }}
            >
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  style={failedSignIn ? { border: "1px solid red" } : null}
                  onChange={e => {
                    setFailedSignIn(false);
                    dispatch(setUserName(e.target.value));
                  }}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  style={failedSignIn ? { border: "1px solid red" } : null}
                  onChange={e => {
                    setFailedSignIn(false);
                    dispatch(setUserPassword(e.target.value));
                  }}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign In
                </button>

                <Link
                  className="button button-secondary"
                  to="/"
                  onClick={() => setFailedSignIn(false)}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Don't have a user account?{" "}
            <Link to="/signup" onClick={() => setFailedSignIn(false)}>
              Click here
            </Link>{" "}
            to sign up!
          </p>
        </div>
      </div>
    </>
  );
}

export default withRouter(UserSignIn);
