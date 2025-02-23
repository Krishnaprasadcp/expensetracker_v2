"use client";

import { useReducer, useState } from "react";
import { useRouter } from "next/navigation"; // To navigate after login
import Link from "next/link";
import { z } from "zod";
import LoadingScreen from "../LoadingScreen";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid format of email" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

interface formDataProps {
  email: string;
  password: string;
}

type State = {
  activeFields: Record<string, boolean>;
};
const initialArgs: State = {
  activeFields: {},
};
type Action =
  | { type: "SET_ACTIVE_FEILD"; field: string }
  | { type: "REMOVE_ACTIVE_FIELD"; field: string };
function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_ACTIVE_FEILD":
      return {
        ...state,
        activeFields: { ...state.activeFields, [action.field]: true },
      };
    case "REMOVE_ACTIVE_FIELD":
      return {
        ...state,
        activeFields: { ...state.activeFields, [action.field]: false },
      };
    default:
      return state;
  }
}
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<formDataProps>({
    email: "",
    password: "",
  });
  const [state, dispatch] = useReducer(reducer, initialArgs);
  const [formError, setFormError] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: string) => {
    dispatch({ type: "SET_ACTIVE_FEILD", field });
  };
  const handleBlur = (field: string, value: string) => {
    if (!value) {
      dispatch({ type: "REMOVE_ACTIVE_FIELD", field });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("hii");

    const validityChecker = signInSchema.safeParse(formData);
    if (!validityChecker.success) {
      const formatedError: Record<string, string> = {};
      validityChecker.error.issues.forEach((issue) => {
        formatedError[issue.path[0]] = issue.message;
      });
      setFormError(formatedError);
      return;
    }
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const isSuccess = await fetch(`${BASE_URL}/api/authentication/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (isSuccess) {
      router.push("/home");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-slate-400 bg-opacity-50 w-full rounded-3xl mt-28">
      {isLoading && <LoadingScreen />}
      <p className="text text-2xl text-gray-100 text-center pt-20">
        LOG INTO YOUR ACCOUNT
      </p>
      <form>
        <div className="mt-20">
          <div className="relative w-full mx-3">
            {formError.email && (
              <p className="-ml-4 text-red-700 font-semibold">
                {formError.email}
              </p>
            )}
            {!state.activeFields["email"] && formData.email.length === 0 && (
              <p className="absolute -z-50 text-xl bottom-2 text-gray-200">
                Your Email
              </p>
            )}
            <input
              className="loginInput"
              id="email"
              type="text"
              name="email"
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={(e) => handleBlur("email", e.target.value)}
            />
          </div>
          <div className="relative w-full mx-3 mt-24">
            {formError.password && (
              <p className="-ml-4 text-red-700 font-semibold">
                {formError.password}
              </p>
            )}
            {!state.activeFields["password"] && (
              <p className="absolute -z-50  text-xl bottom-2 text-gray-200">
                Your Password
              </p>
            )}
            <input
              className="loginInput"
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              onFocus={() => handleFocus("password")}
              onBlur={(e) => handleBlur("password", e.target.value)}
            />
          </div>
        </div>
        <div className="text-gray-200 text-xl flex justify-around mt-28 pb-12 mx-4">
          <button type="button" onClick={handleSubmit}>
            Login
          </button>
          <Link href="/signup">
            <button type="button">Create account</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
