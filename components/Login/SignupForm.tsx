"use client";
import { useReducer, useRef, useState } from "react";

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

interface MonthlyExpense {
  category: string;
  amount: string;
  date: string;
}

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
  const [nextSigninForm, setNextSigninForm] = useState(false); //set it to false after all done
  const [monthlyExpenseForm, setMonthlyExpenseForm] = useState(false);
  const [monthlyExpenseDatas, setMonthlyExpenseData] = useState<
    MonthlyExpense[]
  >([]);
  //Signup Form
  const firstNameInput = useRef<HTMLInputElement>(null);
  const secondNameInput = useRef<HTMLInputElement>(null);
  const dobInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const rePasswordInput = useRef<HTMLInputElement>(null);
  const addressInput = useRef<HTMLInputElement>(null);
  const phoneNumberInput = useRef<HTMLInputElement>(null);

  //Intial monthly expense
  const categoryInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const monthlyDateInput = useRef<HTMLInputElement>(null);

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

  const nextButtonHandler = () => {
    setNextSigninForm(true);
  };

  const prevButtonHandler = () => {
    setNextSigninForm(false);
  };

  const monthlyExpenseFormAddButtonHandler = () => {
    setMonthlyExpenseForm(true);
  };
  const monthlyExpenseFormCancelButtonHandler = () => {
    setMonthlyExpenseForm(false);
  };
  const addMonthlyExpense = () => {
    const monthlyExpense = {
      category: categoryInput.current!.value,
      amount: priceInput.current!.value,
      date: monthlyDateInput.current!.value,
    };
    const monthlyExpenseData = [...monthlyExpenseDatas, monthlyExpense];
    console.log(monthlyExpense);
    setMonthlyExpenseData(monthlyExpenseData);
  };
  console.log(monthlyExpenseDatas);

  return (
    <>
      <div className="w-full text-center">
        <p className="text-2xl text-gray-200 mt-2">EXPENSE TRACKER</p>
        <p className="text-xl mt-8 text-white mb-5">SIGN UP</p>
        <div className="flex justify-center ">
          {!nextSigninForm && (
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
                  <p className="signupinputelementlabel">
                    Re enter the password
                  </p>
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
                    dispatch({
                      type: "genderSelection",
                      gender: e.target.value,
                    });
                  }}
                >
                  <option value=""></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex justify-around mt-7 mb-10 text-gray-100 font-bold">
                <button className="border-2 border-white rounded-full py-1 px-3">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={nextButtonHandler}
                  className="border-2 border-white rounded-full py-1 px-3"
                >
                  Next
                </button>
              </div>
            </form>
          )}

          {nextSigninForm && (
            <div className="bg-slate-600 opacity-70 w-2/3 p-3 rounded-2xl">
              <div className="flex justify-between text-gray-100 text-xl">
                <p>ADD YOUR MONTHLY EXPENSE</p>
                <p>(If you add one click submit)</p>
              </div>
              <div>
                <table className="w-full mt-2">
                  <thead>
                    <tr>
                      <td className="bg-blue-950 rounded-full py-2 px-10">
                        Category
                      </td>
                      <td className="bg-blue-950 rounded-full py-2 px-10">
                        Amount
                      </td>
                      <td className="bg-blue-950 rounded-full py-2 px-10">
                        Date
                      </td>
                    </tr>
                  </thead>
                  <tbody className="">
                    {monthlyExpenseDatas.map((data) => (
                      <tr className="">
                        <td>{data.category}</td>
                        <td>{data.amount}</td>
                        <td>{data.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={monthlyExpenseFormAddButtonHandler}
                    className="rounded-full border-4 border-gray-100 py-1 px-16"
                  >
                    ADD+
                  </button>
                </div>
                {monthlyExpenseForm && (
                  <div>
                    <form className="flex flex-col ">
                      <div className="border-2 border-gray-100 rounded-full w-full py-2 px-7 mt-3">
                        <input
                          type="text"
                          placeholder="Enter your category"
                          ref={categoryInput}
                          className=" outline-0  bg-inherit w-full  text-gray-50"
                        />
                      </div>
                      <div className="border-2 border-gray-100 rounded-full w-full py-2 px-7 mt-3">
                        <input
                          type="text"
                          placeholder="Enter the price"
                          ref={priceInput}
                          className="outline-0  bg-inherit w-full  text-gray-50"
                        />
                      </div>
                      <div className="border-2 border-gray-100 rounded-full w-full py-2 px-7 mt-3">
                        <input
                          type="date"
                          placeholder="Enter the payment date"
                          ref={monthlyDateInput}
                          className="outline-0  bg-inherit w-full  text-gray-50"
                        />
                      </div>
                      <div className="flex justify-around  mx-4 mt-4 text-gray-50 mb-4">
                        <button
                          type="button"
                          onClick={addMonthlyExpense}
                          className="border-4 border-gray-100 rounded-full py-1 px-4"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          onClick={monthlyExpenseFormCancelButtonHandler}
                          className="border-4 border-gray-100 rounded-full py-1 px-4"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              <div className="flex justify-between mx-4">
                <button
                  className="rounded-full py-1 px-4 border-2 border-gray-200 text-gray-50"
                  type="button"
                  onClick={prevButtonHandler}
                >
                  Prev
                </button>
                <button className="rounded-full py-1 px-4 border-2 border-gray-200 text-gray-50">
                  SignUp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default SignupForm;
