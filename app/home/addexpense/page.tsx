"use client";
import { useAppSelector } from "@/store/hooks";
import React, { ChangeEvent, FormEvent, useState } from "react";
const AddExpense: React.FC = () => {
  const userData = useAppSelector((state) => state.user);
  const [errors, setErrors] = useState({
    expenseName: "",
    price: "",
    category: "",
    date: "",
    hasError: false,
  });
  const [expenseData, setExpenseData] = useState({
    expenseName: "",
    price: "",
    category: "",
    date: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (value.trim() === "") {
      errorMessage = `${name} cannot be empty`;
    } else if (name === "price" && isNaN(Number(value))) {
      errorMessage = "Price must be a number";
    }

    const newErrors = { ...errors, [name]: errorMessage };

    // If no errors exist, reset `hasError`
    newErrors.hasError = Object.values(newErrors).some(
      (error) => error !== "" && typeof error === "string"
    );

    setErrors(newErrors);
  };

  const handleAddExpense = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: any = {};
    Object.keys(expenseData).forEach((key) => {
      if (!expenseData[key as keyof typeof expenseData].trim()) {
        newErrors[key] = `${key} cannot be empty`;
      }
    });

    if (isNaN(Number(expenseData.price))) {
      newErrors.price = "Price must be a number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...newErrors, hasError: true });
      return;
    }

    setErrors({
      expenseName: "",
      price: "",
      category: "",
      date: "",
      hasError: false,
    });

    const newData = { ...expenseData, userId: userData.userID };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/addExpense`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );

    if (!response.ok) {
      console.log("Something has happened");
      return;
    }

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div className="mt-9">
        {userData.user && (
          <>
            <p className="text-4xl text-gray-200 ml-8">{`Welcome ${userData.user.firstName}`}</p>
            <div className="flex justify-around h-fit">
              <div className="my-auto">
                <img
                  src="/images/signinimage.png"
                  alt="image"
                  width={500}
                  height={500}
                />
              </div>
              <div className="w-1/2 mt-10">
                <div className="ml-8">
                  <p className="text-4xl text-gray-200 ">
                    ADD YOUR <span className="block mt-4">EXPENSES HERE</span>
                  </p>
                </div>
                <div className="mt-10">
                  <form
                    className="grid grid-cols-1 gap-6"
                    onSubmit={handleAddExpense}
                  >
                    <div className="">
                      <input
                        className="addexpenseinput p-1"
                        type="text"
                        name="expenseName"
                        placeholder="Enter your expense Name"
                        value={expenseData.expenseName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.expenseName && (
                        <p className="text-red-500">{errors.expenseName}</p>
                      )}
                    </div>
                    <div className="">
                      <input
                        className="addexpenseinput p-1"
                        type="text"
                        name="category"
                        placeholder="Enter your category"
                        value={expenseData.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.category && (
                        <p className="text-red-500">{errors.category}</p>
                      )}
                    </div>
                    <div className="">
                      <input
                        className="addexpenseinput p-1"
                        type="text"
                        name="price"
                        placeholder="Enter the price"
                        value={expenseData.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.price && (
                        <p className="text-red-500">{errors.price}</p>
                      )}
                    </div>
                    <div className="">
                      <input
                        className="addexpenseinput p-1"
                        type="date"
                        name="date"
                        placeholder="Enter the date (dd-mm-yy)"
                        value={expenseData.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.date && (
                        <p className="text-red-500">{errors.date}</p>
                      )}
                    </div>
                    <button
                      disabled={errors.hasError}
                      className={`p-2 rounded text-white ${
                        errors.hasError
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-700"
                      }`}
                      type="submit"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default AddExpense;
