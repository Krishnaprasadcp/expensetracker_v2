"use client";
import { useReducer, useRef } from "react";

interface INITIALARGS {
  firstName: boolean;
  secondName: boolean;
  dateOfBirth: boolean;
  email: boolean;
  password: boolean;
  rePassword: boolean;
  address: boolean;
  phoneNumber: boolean;
  genderSelection: string;
  gender: boolean;
}
interface Action {
  type: string;
  gender?: string;
}
const initialArgs: INITIALARGS = {
  firstName: true,
  secondName: true,
  dateOfBirth: true,
  email: true,
  password: true,
  rePassword: true,
  address: true,
  phoneNumber: true,
  genderSelection: "",
  gender: true,
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
    case "dateofbirth":
      return { ...state, dateOfBirth: false };
    case "removeDateOfBirth":
      return { ...state, dateOfBirth: true };
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
    case "phoneNumber":
      return { ...state, phoneNumber: false };
    case "removePhoneNumber":
      return { ...state, phoneNumber: true };
    case "genderSelection":
      return { ...state, genderSelection: action.gender! };
    case "gender":
      return { ...state, gender: false };
    case "removeGender":
      return { ...state, gender: true };
    default:
      return state;
  }
}

const SignupForm = () => {
  const [state, dispatch] = useReducer(reducer, initialArgs);

  const firstNameInput = useRef<HTMLInputElement>(null);
  const secondNameInput = useRef<HTMLInputElement>(null);
  const dobInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const rePasswordInput = useRef<HTMLInputElement>(null);
  const addressInput = useRef<HTMLInputElement>(null);
  const phoneNumberInput = useRef<HTMLInputElement>(null);

  const firstNameFocusHandler = () => {
    dispatch({ type: "firstName" });
  };
  const firstNameBlurHandler = () => {
    if (firstNameInput.current?.value === "") {
      dispatch({ type: "removeFirstName" });
    }
  };

  const secondNameFocusHandler = () => {
    dispatch({ type: "secondName" });
  };
  const secondNameBlurHandler = () => {
    if (secondNameInput.current?.value === "") {
      dispatch({ type: "removeSecondName" });
    }
  };
  const dobFocusHandler = () => {
    dispatch({ type: "dateofbirth" });
  };
  const dobBlurHandler = () => {
    if (dobInput.current?.value === "") {
      dispatch({ type: "removeDateOfBirth" });
    }
  };

  const emailFocusHandler = () => {
    dispatch({ type: "email" });
  };
  const emailBlurHandler = () => {
    if (emailInput.current?.value === "") {
      dispatch({ type: "removeEmail" });
    }
  };

  const addressFocusHandler = () => {
    dispatch({ type: "address" });
  };
  const addressBlurHandler = () => {
    if (addressInput.current?.value === "") {
      dispatch({ type: "removeAddress" });
    }
  };

  const phoneNumberFocusHandler = () => {
    dispatch({ type: "phoneNumber" });
  };
  const phoneNumberBlurHandler = () => {
    if (phoneNumberInput.current?.value === "") {
      dispatch({ type: "removePhoneNumber" });
    }
  };

  const passwordFocusHandler = () => {
    dispatch({ type: "password" });
  };

  const passwordBlurHandler = () => {
    if (passwordInput.current?.value === "") {
      dispatch({ type: "removePassword" });
    }
  };
  const rePasswordFocusHandler = () => {
    dispatch({ type: "rePassword" });
  };
  const rePasswordBlurHandler = () => {
    if (rePasswordInput.current?.value === "") {
      dispatch({ type: "removeRePassword" });
    }
  };

  const genderSelctionFocusHandler = () => {
    dispatch({ type: "gender" });
  };

  const genderSelectionBlurHandler = () => {
    if (state.genderSelection === "") {
      dispatch({ type: "removeGender" });
    }
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
                <p className="signupinputelementlabel">Your first name</p>
              )}

              <input
                className="loginInput "
                id="firstName"
                type="text"
                onFocus={firstNameFocusHandler}
                onBlur={firstNameBlurHandler}
                ref={firstNameInput}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.secondName && (
                <p className="signupinputelementlabel">Your second name</p>
              )}

              <input
                className="loginInput"
                id="secondName"
                type="text"
                onFocus={secondNameFocusHandler}
                onBlur={secondNameBlurHandler}
                ref={secondNameInput}
              />
            </div>
            <div className=" flex relative justify-between   mx-8 mt-10 border-4 border-b-gray-200 border-t-0 border-r-0 border-l-0">
              {state.dateOfBirth && (
                <p className="signupinputelementlabel -ml-3">Date of Birth</p>
              )}

              <input
                type="date"
                className={` bg-inherit  w-full border-0 border-t-0 ${
                  state.dateOfBirth
                    ? "text-gray-500 text-opacity-0"
                    : "text-gray-200"
                } `}
                placeholder="Enter a date"
                onFocus={dobFocusHandler}
                onBlur={dobBlurHandler}
                ref={dobInput}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.email && (
                <p className="signupinputelementlabel">Your Email</p>
              )}

              <input
                className="loginInput"
                id="email"
                type="email"
                onFocus={emailFocusHandler}
                onBlur={emailBlurHandler}
                ref={emailInput}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.password && (
                <p className="signupinputelementlabel">Enter a password</p>
              )}

              <input
                className="loginInput"
                id="password"
                type="password"
                onFocus={passwordFocusHandler}
                onBlur={passwordBlurHandler}
                ref={passwordInput}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.rePassword && (
                <p className="signupinputelementlabel">Re enter the password</p>
              )}

              <input
                className="loginInput"
                id="repassword"
                type="text"
                onFocus={rePasswordFocusHandler}
                onBlur={rePasswordBlurHandler}
                ref={rePasswordInput}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.address && (
                <p className="signupinputelementlabel">Address</p>
              )}

              <input
                className="loginInput"
                id="address"
                type="text"
                onFocus={addressFocusHandler}
                onBlur={addressBlurHandler}
                ref={addressInput}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.phoneNumber && (
                <p className="signupinputelementlabel">Your Phone number</p>
              )}

              <input
                className="loginInput"
                id="phoneNumber"
                type="tel"
                onFocus={phoneNumberFocusHandler}
                onBlur={phoneNumberBlurHandler}
                ref={phoneNumberInput}
              />
            </div>
            <div className="relative  mx-3 mt-10">
              {state.gender && (
                <p className="absolute text-xl bottom-2 left-6 text-gray-100 text-opacity-100">
                  Your Gender
                </p>
              )}

              <select
                name=""
                className="loginInput"
                onFocus={genderSelctionFocusHandler}
                onBlur={genderSelectionBlurHandler}
                onChange={(e) => {
                  dispatch({ type: "genderSelection", gender: e.target.value });
                }}
              >
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
