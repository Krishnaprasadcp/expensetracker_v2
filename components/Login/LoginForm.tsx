"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // To navigate after login
import Link from "next/link";
import { LoginFormSubmisionAction } from "@/app/actions/loginFormSubmission";

const LoginForm: React.FC = () => {
  const [emailLabelFocus, setEmailLabelFocus] = useState(false);
  const [passwordLabelFocus, setPasswordLabelFocus] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const isSuccess = await LoginFormSubmisionAction(formData);

    if (isSuccess) {
      // Only navigate if the login was successful
      router.push("/home");
    } else {
      // Handle failure (e.g., show an error message to the user)
      console.log("Login failed.");
      // You can also set a state to show an error message on the UI
    }
  };

  return (
    <div className="bg-slate-400 bg-opacity-50 w-full rounded-3xl mt-28">
      <p className="text text-2xl text-gray-100 text-center pt-20">
        LOG INTO YOUR ACCOUNT
      </p>
      <form onSubmit={handleSubmit}>
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
              name="email"
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
              type="password" // Change to "password" for better security
              name="password"
              onFocus={passwordFocusHandler}
              onBlur={passwordBlurHandler}
            />
          </div>
        </div>
        <div className="text-gray-200 text-xl flex justify-around mt-28 pb-12 mx-4">
          <button type="submit">Login</button>
          <Link href="/signup">
            <button type="button">Create account</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
