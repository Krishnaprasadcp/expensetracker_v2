"use client";
import { useAppSelector } from "@/store/hooks";
import React, { ChangeEvent, FormEvent, useState } from "react";

const AddIncome: React.FC = () => {
  const userData = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    incomeName: "",
    income: "",
    date: "",
  });

  const [incomeData, setIncomeData] = useState({
    incomeName: "",
    income: "",
    isMonthlyIncome: false,
    isIncluded: false,
    date: "",
  });
  const handleFocus = () => {
    setIsOpen(true);
  };
  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;
    setIncomeData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    // Remove error message when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  // console.log(expenseData.isMonthlyExpense);

  // Handle validation on blur
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name.replace(/([A-Z])/g, " $1")} is required`,
      }));
    }
  };

  // Handle form submission
  const handleAddIncome = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before submitting
    let newErrors = {
      incomeName: incomeData.incomeName ? "" : "Income name is required",
      income: incomeData.income ? "" : "Income is required",
      date: incomeData.isMonthlyIncome
        ? incomeData.date
          ? ""
          : "Date is required"
        : "",
    };

    setErrors(newErrors);

    // Check if any field has an error
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    // Submit form data
    const newData = { ...incomeData, userId: userData.userID };
    // console.log(newData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/income/addIncome`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
            <p className="text-4xl text-gray-200 ml-8">
              {`Welcome ${userData.user.firstName}`}
            </p>
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
                  <p className="text-4xl text-gray-200">
                    ADD YOUR <span className="block mt-4">INCOMES HERE</span>
                  </p>
                </div>
                <div className="mt-10">
                  <form
                    className="grid grid-cols-1 gap-6"
                    onSubmit={handleAddIncome}
                  >
                    {/* Expense Name */}
                    <div>
                      <input
                        className="addexpenseinput p-1"
                        type="text"
                        name="incomeName"
                        placeholder="Enter your Income name"
                        value={incomeData.incomeName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.incomeName && (
                        <p className="text-red-500">{errors.incomeName}</p>
                      )}
                    </div>

                    {/* Income */}
                    <div>
                      <input
                        className="addexpenseinput p-1"
                        type="text"
                        name="income"
                        placeholder="Enter the income"
                        value={incomeData.income}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.income && (
                        <p className="text-red-500">{errors.income}</p>
                      )}
                    </div>
                    <div>
                      <p className="inline pr-2 text-white">
                        Include to Monthly Income
                      </p>
                      <input
                        type="checkbox"
                        name="isMonthlyIncome"
                        checked={incomeData.isMonthlyIncome}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Date */}
                    {incomeData.isMonthlyIncome && (
                      <div>
                        <input
                          className="addexpenseinput p-1"
                          type="date"
                          name="date"
                          value={incomeData.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.date && (
                          <p className="text-red-500">{errors.date}</p>
                        )}
                      </div>
                    )}
                    {incomeData.isMonthlyIncome && (
                      <div>
                        <p className="inline pr-2 text-white">
                          Include to current Month
                        </p>
                        <input
                          type="checkbox"
                          name="isIncluded"
                          checked={incomeData.isIncluded}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                    {/* Submit Button */}
                    <button className="p-2 rounded text-white" type="submit">
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

export default AddIncome;
