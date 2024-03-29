"use client";

import Link from "next/link";
import { useState } from "react";

const LoginForm: React.FC = () => {
  const [emailLabelFocus, setEmailLabelFocus] = useState(false);
  const [passwordLabelFocus, setPasswordLabelFocus] = useState(false);

  const emailBlurHandler = () => {
    setEmailLabelFocus(false);
  };
  const passwordBlurHandler = () => {
    setPasswordLabelFocus(false);
  };

  const emailFocusHandler = () => {
    setEmailLabelFocus(true);
  };
  const passwordFocusHandler = () => {
    setPasswordLabelFocus(true);
  };
  return (
    <>
      <div className=" bg-slate-400 bg-opacity-50 w-full rounded-3xl mt-28">
        <p className="text text-2xl  text-gray-100 text-center pt-20">
          LOG INTO YOUR ACCOUNT
        </p>
        <div className="mt-20">
          <div className="relative w-full mx-3">
            {!emailLabelFocus && (
              <p className="absolute text-xl bottom-2 text-gray-200">
                Your Email
              </p>
            )}
            <input
              className="loginInput"
              id="email"
              type="text"
              onFocus={emailFocusHandler}
              onBlur={emailBlurHandler}
            />
          </div>
          <div className="relative w-full mx-3 mt-24">
            {!passwordLabelFocus && (
              <p className="absolute text-xl bottom-2 text-gray-200">
                Your Password
              </p>
            )}
            <input
              className="loginInput"
              id="password"
              type="text"
              onFocus={passwordFocusHandler}
              onBlur={passwordBlurHandler}
            />
          </div>
        </div>
        <div className="text-gray-200 text-xl flex justify-around mt-28 pb-12  mx-4">
          <button>Login</button>
          <Link href="/signup">
            <button type="button">Create account</button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
