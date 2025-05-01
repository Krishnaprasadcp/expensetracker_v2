"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useReducer, useRef, useState } from "react";
import { z } from "zod";
import { useSetupUser } from "../utils/setupUser";

interface MonthlyExpense {
  expenseName: string;
  category: string;
  price: number;
  reccurenceDate: string;
  checkBox: boolean;
}

type State = {
  activeFields: Record<string, boolean>;
};

type Action =
  | { type: "SET_ACTIVE_FIELD"; field: string }
  | { type: "REMOVE_ACTIVE_FIELD"; field: string };

const initialArgs: State = {
  activeFields: {},
};

interface MonthlyDataObject {
  category: string;
  amount: string;
  reccurenceDate: string;
  checkBox: boolean;
}
interface MonthlyIncomeDataObject {
  incomeName: string;
  income: number;
  reccurenceDate: string;
  checkBox: boolean;
}
interface FormDataObject {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  rePassword: string;
  phoneNumber: string;
}

interface DataType {
  monthlyExpenseDatas: MonthlyDataObject[];
  monthlyIncomeDatas: MonthlyIncomeDataObject[];
  formData: FormDataObject;
}

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "Firstname must be at least 3 characters" }),
    secondName: z.string().min(2, {
      message: "Second name must contain at least 2 characters",
    }),
    email: z.string().email({ message: "Invalid format of email" }),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters" })
      .regex(/[A-Z]/, {
        message: "Must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Must contain at least one number" })
      .regex(/[\W_]/, {
        message: "Must contain at least one special character",
      }),
    rePassword: z.string(),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone Number must contain 10 digits" })
      .max(10, { message: "Phone number should not exceed 10 digits" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.rePassword) {
      ctx.addIssue({
        path: ["rePassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_ACTIVE_FIELD":
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

const SignupForm = () => {
  const [state, dispatch] = useReducer(reducer, initialArgs);
  const [showForms, setShowForms] = useState({
    userDetailsForm: true,
    monthlyExpenseForm: false,
    monthlyIncomeForm: false,
    monthlyExpenseFields: false,
    monthlyIncomeFields: false,
  });
  // const [monthlyExpenseForm, setMonthlyExpenseForm] = useState(false);
  const [monthlyExpenseDatas, setMonthlyExpenseData] = useState<
    MonthlyExpense[]
  >([]);
  const [monthlyIncomeData, setMonthlyIncomeData] = useState<
    MonthlyIncomeDataObject[]
  >([]);

  const [formError, setFormError] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
    rePassword: "",
    phoneNumber: "",
  });
  const router = useRouter();
  const setupUser = useSetupUser();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: string) => {
    dispatch({ type: "SET_ACTIVE_FIELD", field });
  };

  const handleBlur = (field: string, value: string) => {
    if (!value) {
      dispatch({ type: "REMOVE_ACTIVE_FIELD", field });
    }
  };

  //Intial monthly expense
  const expenseNameInput = useRef<HTMLInputElement>(null);
  const categoryInput = useRef<HTMLInputElement>(null);
  const priceInput = useRef<HTMLInputElement>(null);
  const monthlyDateInput = useRef<HTMLInputElement>(null);
  const addExpenseToCurrentMonth = useRef<HTMLInputElement>(null);

  const incomeNameInput = useRef<HTMLInputElement>(null);
  const incomeInput = useRef<HTMLInputElement>(null);
  const incomeDateInput = useRef<HTMLInputElement>(null);
  const addIncomeToCurrentMonth = useRef<HTMLInputElement>(null);

  const nextButtonHandler = () => {
    // const validityChecker = signUpSchema.safeParse(formData);
    // if (!validityChecker.success) {
    //   console.log(validityChecker.error.message);
    //   const formatedError: Record<string, string> = {};
    //   validityChecker.error.issues.forEach((issue) => {
    //     formatedError[issue.path[0]] = issue.message;
    //   });
    //   setFormError(formatedError);
    //   return;
    // }
    setFormError({});
    setShowForms((prev) => ({
      ...prev,
      userDetailsForm: false,
      monthlyExpenseForm: true,
      monthlyIncomeForm: false,
    }));
  };

  const prevButtonHandler = () => {
    setShowForms((prev) => ({
      ...prev,
      userDetailsForm: true,
      monthlyExpenseForm: false,
      monthlyIncomeForm: false,
    }));
  };

  const monthlyExpenseNextButtonHandler = () => {
    setShowForms((prev) => ({
      ...prev,
      userDetailsForm: false,
      monthlyExpenseForm: false,
      monthlyIncomeForm: true,
    }));
  };
  const monthlyIncomePrevButtonHandler = () => {
    setShowForms((prev) => ({
      ...prev,
      userDetailsForm: false,
      monthlyExpenseForm: true,
      monthlyIncomeForm: false,
    }));
  };

  const monthlyExpenseFormAddButtonHandler = () => {
    setShowForms((prev) => ({
      ...prev,
      monthlyExpenseFields: true,
      monthlyIncomeFields: false,
    }));
  };
  const monthlyExpenseFormCancelButtonHandler = () => {
    setShowForms((prev) => ({
      ...prev,
      monthlyExpenseFields: false,
    }));
  };
  const monthlyIncomeFormAddButtonHandler = () => {
    setShowForms((prev) => ({
      ...prev,
      monthlyExpenseFields: false,
      monthlyIncomeFields: true,
    }));
  };
  const monthlyIncomeFormCancelButtonHandler = () => {
    setShowForms((prev) => ({
      ...prev,
      monthlyIncomeFields: false,
    }));
  };
  const addMonthlyExpense = () => {
    const monthlyExpense = {
      expenseName: expenseNameInput.current!.value,
      category: categoryInput.current!.value,
      price: Number(priceInput.current!.value),
      reccurenceDate: monthlyDateInput.current!.value,
      checkBox: addExpenseToCurrentMonth.current!.checked,
    };
    const monthlyExpenseData = [...monthlyExpenseDatas, monthlyExpense];
    setMonthlyExpenseData(monthlyExpenseData);
  };
  const addMonthlyIncome = () => {
    const incomeValue = incomeInput.current?.value?.trim(); // Trim to remove spaces

    const monthlyIncome = {
      incomeName: incomeNameInput.current!.value,
      income: Number(incomeValue),
      reccurenceDate: incomeDateInput.current!.value,
      checkBox: addIncomeToCurrentMonth.current!.checked,
    };
    setMonthlyIncomeData([...monthlyIncomeData, monthlyIncome]);
  };

  const handleSignupButtonHandler = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      monthlyExpenseDatas,
      monthlyIncomeData,
      formData,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      console.log(responseData);
    }
    setupUser(responseData.user, responseData.user._id);
    router.push("/home");
  };

  return (
    <>
      <div className="w-full text-center">
        <p className="text-2xl text-gray-200 mt-2">EXPENSE TRACKER</p>
        <p className="text-xl mt-8 text-white mb-5">SIGN UP</p>
        <div className="flex justify-center ">
          {showForms.userDetailsForm && (
            <div className="w-1/3 bg-slate-500 opacity-80 rounded-2xl mb-8">
              <p className="text-gray-200 text-xl">Enter your details:</p>
              <div className="relative  mx-3 mt-10">
                {formError.firstName && (
                  <p className="-ml-4 text-red-700 font-semibold">
                    {formError.firstName}
                  </p>
                )}
                {!state.activeFields["firstName"] &&
                  formData.firstName.length === 0 && (
                    <p className="signupinputelementlabel">Your first name</p>
                  )}

                <input
                  className="loginInput "
                  id="firstName"
                  type="text"
                  required
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  onFocus={() => handleFocus("firstName")}
                  onBlur={(e) => handleBlur("firstName", e.target.value)}
                />
              </div>
              <div className="relative  mx-3 mt-10">
                {formError.secondName && (
                  <p className="-ml-4 text-red-700 font-semibold">
                    {formError.secondName}
                  </p>
                )}
                {!state.activeFields["secondName"] &&
                  formData.secondName.length === 0 && (
                    <p className="signupinputelementlabel">Your second name</p>
                  )}

                <input
                  className="loginInput"
                  id="secondName"
                  type="text"
                  name="secondName"
                  required
                  onChange={handleChange}
                  value={formData.secondName}
                  onFocus={() => handleFocus("secondName")}
                  onBlur={(e) => handleBlur("secondName", e.target.value)}
                />
              </div>

              <div className="relative  mx-3 mt-10">
                {formError.email && (
                  <p className="-ml-4 text-red-700 font-semibold">
                    {formError.email}
                  </p>
                )}
                {!state.activeFields["email"] &&
                  formData.email.length === 0 && (
                    <p className="signupinputelementlabel">Your Email</p>
                  )}

                <input
                  className="loginInput"
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                />
              </div>
              <div className="relative  mx-3 mt-10">
                {formError.password && (
                  <p className="-ml-4 text-red-700 font-semibold">
                    {formError.password}
                  </p>
                )}
                {!state.activeFields["password"] &&
                  formData.password.length === 0 && (
                    <p className="signupinputelementlabel">Enter a password</p>
                  )}

                <input
                  className="loginInput"
                  id="password"
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={(e) => handleBlur("password", e.target.value)}
                />
              </div>
              <div className="relative  mx-3 mt-10">
                {formError.rePassword && (
                  <p className="-ml-4 text-red-700 font-semibold">
                    {formError.rePassword}
                  </p>
                )}
                {!state.activeFields["rePassword"] &&
                  formData.rePassword.length === 0 && (
                    <p className="signupinputelementlabel">
                      Re enter the password
                    </p>
                  )}

                <input
                  className="loginInput"
                  id="repassword"
                  type="text"
                  name="rePassword"
                  required
                  value={formData.rePassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus("rePassword")}
                  onBlur={(e) => handleBlur("rePassword", e.target.value)}
                />
              </div>

              <div className="relative  mx-3 mt-10">
                {formError.phoneNumber && (
                  <p className="-ml-4 text-red-700 font-semibold">
                    {formError.phoneNumber}
                  </p>
                )}
                {!state.activeFields["phoneNumber"] &&
                  formData.phoneNumber.length === 0 && (
                    <p className="signupinputelementlabel">Your Phone number</p>
                  )}

                <input
                  className="loginInput"
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  required
                  onChange={handleChange}
                  onFocus={() => handleFocus("phoneNumber")}
                  onBlur={(e) => handleBlur("phoneNumber", e.target.value)}
                />
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
            </div>
          )}

          {showForms.monthlyExpenseForm && (
            <div className="bg-slate-600 opacity-70 w-2/3 p-3 rounded-2xl">
              <div>
                <div className="flex justify-between text-gray-100 text-xl">
                  <p>ADD YOUR MONTHLY EXPENSE</p>
                  <p>(If you add one click submit)</p>
                </div>
                <div>
                  <table className="w-full mt-2">
                    <thead>
                      <tr>
                        <td className="bg-blue-950 rounded-full py-2 px-10">
                          Expense Name
                        </td>
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
                      {monthlyExpenseDatas.map((data, index) => (
                        <tr className="" key={index}>
                          <td>{data.expenseName}</td>
                          <td>{data.category}</td>
                          <td>{data.price}</td>
                          <td>{data.reccurenceDate}</td>
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
                  {showForms.monthlyExpenseFields && (
                    <div>
                      <form className="flex flex-col ">
                        <div className="border-2 border-gray-100 rounded-full w-full py-2 px-7 mt-3">
                          <input
                            type="text"
                            placeholder="Enter your Expense Name"
                            ref={expenseNameInput}
                            className=" outline-0  bg-inherit w-full  text-gray-50"
                          />
                        </div>
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
                        <div className="flex justify-between mx-5 pt-4">
                          <p className="text-lg text-gray-50">
                            Add this expense to the current month ?
                          </p>
                          <input
                            className="w-5 h-5"
                            type="checkbox"
                            name="monthlyExpenseCheckBox"
                            ref={addExpenseToCurrentMonth}
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
                  <button
                    type="button"
                    className="rounded-full py-1 px-4 border-2 border-gray-200 text-gray-50"
                    onClick={monthlyExpenseNextButtonHandler}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {showForms.monthlyIncomeForm && (
            <div className="bg-slate-600 opacity-70 w-2/3 p-3 rounded-2xl">
              <div>
                <div className="flex justify-between text-gray-100 text-xl">
                  <p>ADD YOUR MONTHLY INCOME</p>
                  <p>(If you add one click submit)</p>
                </div>
                <div>
                  <table className="w-full mt-2">
                    <thead>
                      <tr>
                        <td className="bg-blue-950 rounded-full py-2 px-10">
                          Income Name
                        </td>
                        <td className="bg-blue-950 rounded-full py-2 px-10">
                          Income
                        </td>
                        <td className="bg-blue-950 rounded-full py-2 px-10">
                          Date
                        </td>
                      </tr>
                    </thead>
                    <tbody className="">
                      {monthlyIncomeData.map((data, index) => (
                        <tr className="" key={index}>
                          <td>{data.incomeName}</td>
                          <td>{data.income}</td>
                          <td>{data.reccurenceDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={monthlyIncomeFormAddButtonHandler}
                      className="rounded-full border-4 border-gray-100 py-1 px-16"
                    >
                      ADD+
                    </button>
                  </div>
                  {showForms.monthlyIncomeFields && (
                    <div>
                      <form className="flex flex-col ">
                        <div className="border-2 border-gray-100 rounded-full w-full py-2 px-7 mt-3">
                          <input
                            type="text"
                            placeholder="Enter your Income Name"
                            ref={incomeNameInput}
                            className=" outline-0  bg-inherit w-full  text-gray-50"
                          />
                        </div>
                        <div className="border-2 border-gray-100 rounded-full w-full py-2 px-7 mt-3">
                          <input
                            type="text"
                            placeholder="Enter the price"
                            ref={incomeInput}
                            className="outline-0  bg-inherit w-full  text-gray-50"
                          />
                        </div>
                        <div className="border-2 border-gray-100 rounded-full w-full py-2 px-7 mt-3">
                          <input
                            type="date"
                            placeholder="Enter the payment date"
                            ref={incomeDateInput}
                            className="outline-0  bg-inherit w-full  text-gray-50"
                          />
                        </div>
                        <div className="flex justify-between mx-5 pt-4">
                          <p className="text-lg text-gray-50">
                            Add this income to the current month ?
                          </p>
                          <input
                            className="w-5 h-5"
                            type="checkbox"
                            name="monthlyIncomeCheckBox"
                            ref={addIncomeToCurrentMonth}
                          />
                        </div>
                        <div className="flex justify-around  mx-4 mt-4 text-gray-50 mb-4">
                          <button
                            type="button"
                            onClick={addMonthlyIncome}
                            className="border-4 border-gray-100 rounded-full py-1 px-4"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={monthlyIncomeFormCancelButtonHandler}
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
                    onClick={monthlyIncomePrevButtonHandler}
                  >
                    Prev
                  </button>
                  <button
                    type="submit"
                    className="rounded-full py-1 px-4 border-2 border-gray-200 text-gray-50"
                    onClick={handleSignupButtonHandler}
                  >
                    Signup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default SignupForm;
