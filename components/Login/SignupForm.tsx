"use client";
import { useReducer } from "react";

interface INITIALARGS {
  firstName: boolean;
  secondName: boolean;
  email: boolean;
  password: boolean;
  rePassword: boolean;
  address: boolean;
}
interface Action {
  type: string;
}
const initialArgs: INITIALARGS = {
  firstName: true,
  secondName: true,
  email: true,
  password: true,
  rePassword: true,
  address: true,
};
function reducer(state: INITIALARGS, action: Action) {
  switch (action.type) {
    case "firstName":
      return { ...state, firstName: false };
    case "removeFirstName":
      return { ...state, firstName: true };
    case "secondName":
      return { ...state, secondName: false };
    case "removeSecondName":
      return { ...state, secondName: true };
    case "email":
      return { ...state, email: false };
    case "removeEmail":
      return { ...state, email: true };
    case "password":
      return { ...state, password: false };
    case "removePassword":
      return { ...state, password: true };
    case "rePassword":
      return { ...state, rePassword: false };
    case "removeRePassword":
      return { ...state, rePassword: true };
    case "address":
      return { ...state, address: false };
    case "removeAddress":
      return { ...state, address: true };

    default:
      return state;
  }
}

const SignupForm = () => {
  const [state, dispatch] = useReducer(reducer, initialArgs);

  const firstNameFocusHandler = () => {
    dispatch({ type: "firstName" });
  };
  const firstNameBlurHandler = () => {
    dispatch({ type: "removeFirstName" });
  };

  const secondNameFocusHandler = () => {
    dispatch({ type: "secondName" });
  };
  const secondNameBlurHandler = () => {
    dispatch({ type: "removeSecondName" });
  };

  const emailFocusHandler = () => {
    dispatch({ type: "email" });
  };
  const emailBlurHandler = () => {
    dispatch({ type: "removeEmail" });
  };

  const addressFocusHandler = () => {
    dispatch({ type: "address" });
  };
  const addressBlurHandler = () => {
    dispatch({ type: "removeAddress" });
  };
  const passwordFocusHandler = () => {
    dispatch({ type: "password" });
  };
  console.log(state.firstName);

  const passwordBlurHandler = () => {
    dispatch({ type: "removePassword" });
  };
  const rePasswordFocusHandler = () => {
    dispatch({ type: "rePassword" });
  };
  console.log(state.firstName);

  const rePasswordBlurHandler = () => {
    dispatch({ type: "removeRePassword" });
  };
  return (
    <>
      <div className="w-full text-center">
        <p className="text-2xl text-gray-200 mt-2">EXPENSE TRACKER</p>
        <p className="text-xl mt-8 text-white mb-5">SIGN UP</p>
        <div className="flex justify-center ">
          <form className="w-1/3 bg-slate-500 opacity-80 rounded-2xl mb-8">
            <p className="text-gray-200 text-xl">Enter your details:</p>
            <div className="relative  mx-3 mt-10">
              {state.firstName && (
                <p className="absolute -z-50 text-xl bottom-2 left-6 text-gray-100 text-opacity-100">
                  Your first name
                </p>
              )}

              <input
                className="loginInput "
                id="password"
                type="text"
                onFocus={firstNameFocusHandler}
                onBlur={firstNameBlurHandler}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.secondName && (
                <p className="absolute text-xl bottom-2 left-6 text-gray-100 text-opacity-100">
                  Your second name
                </p>
              )}

              <input
                className="loginInput"
                id="password"
                type="text"
                onFocus={secondNameFocusHandler}
                onBlur={secondNameBlurHandler}
              />
            </div>
            <div className=" flex relative justify-between   mx-9 mt-10 border-4 border-b-gray-200 border-t-0 border-r-0 border-l-0">
              <p className="absolute text-xl bottom-2 left-2 text-gray-100 text-opacity-100">
                Date of Birth
              </p>

              <input
                type="date"
                className=" bg-inherit text-gray-500 w-full border-0 border-t-0"
                placeholder="Enter a date"
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.email && (
                <p className="absolute text-xl bottom-2 left-6 text-gray-100 text-opacity-100">
                  Your Email
                </p>
              )}

              <input
                className="loginInput"
                id="password"
                type="email"
                onFocus={emailFocusHandler}
                onBlur={emailBlurHandler}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.password && (
                <p className="absolute text-xl bottom-2 left-6 text-gray-100 text-opacity-100">
                  Enter a password
                </p>
              )}

              <input
                className="loginInput"
                id="password"
                type="password"
                onFocus={passwordFocusHandler}
                onBlur={passwordBlurHandler}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.rePassword && (
                <p className="absolute text-xl bottom-2 left-6 text-gray-100 text-opacity-100">
                  Re enter the password
                </p>
              )}

              <input
                className="loginInput"
                id="password"
                type="text"
                onFocus={rePasswordFocusHandler}
                onBlur={rePasswordBlurHandler}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.address && (
                <p className="absolute text-xl bottom-2 left-6 text-gray-100 text-opacity-100">
                  Address
                </p>
              )}

              <input
                className="loginInput"
                id="password"
                type="text"
                onFocus={addressFocusHandler}
                onBlur={addressBlurHandler}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              <p className="absolute text-xl bottom-2 left-6 text-gray-100 text-opacity-100">
                Your Phone number
              </p>

              <input
                className="loginInput"
                id="password"
                type="tel"
                //   onFocus={passwordFocusHandler}
                //   onBlur={passwordBlurHandler}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              <p className="absolute text-xl bottom-2 left-6 text-gray-100 text-opacity-100">
                Your Gender
              </p>

              <select name="" className="loginInput">
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {/* <input
                  className="loginInput"
                  id="password"
                  type="text"
                  //   onFocus={passwordFocusHandler}
                  //   onBlur={passwordBlurHandler}
                /> */}
            </div>
            <div className="flex justify-around mt-7 mb-10 text-gray-100 font-bold">
              <button className="border-2 border-white rounded-full py-1 px-3">
                Submit
              </button>
              <button className="border-2 border-white rounded-full py-1 px-3">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignupForm;
