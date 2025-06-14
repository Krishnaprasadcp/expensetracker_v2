"use client";
import { useAppSelector } from "@/store/hooks";
import React, { ChangeEvent, FormEvent, useState } from "react";

const AddExpense: React.FC = () => {
  const userData = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({
    expenseName: "",
    price: "",
    category: "",
    date: "",
  });

  const [expenseData, setExpenseData] = useState({
    expenseName: "",
    price: "",
    category: "",
    isMonthlyExpense: false,
    isIncluded: false,
    date: "",
  });
  const handleFocus = () => {
    setIsOpen(true);
  };
  const handleCategorySelect = (selectedCategory: string) => {
    setExpenseData((prevData) => ({
      ...prevData,
      category: selectedCategory,
    }));
    setIsOpen(false); // Close dropdown after selection
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
    setExpenseData((prevData) => ({
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
    if (name === "category") {
      setTimeout(() => setIsOpen(false), 200); // Delay to allow clicking dropdown options
    }
  };

  // Handle form submission
  const handleAddExpense = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before submitting
    let newErrors = {
      expenseName: expenseData.expenseName ? "" : "Expense name is required",
      price: expenseData.price ? "" : "Price is required",
      category: expenseData.category ? "" : "Category is required",
      date: expenseData.isMonthlyExpense
        ? expenseData.date
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
    const newData = { ...expenseData, userId: userData.userID };
    // console.log(newData);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/addExpense`,
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
                    ADD YOUR <span className="block mt-4">EXPENSES HERE</span>
                  </p>
                </div>
                <div className="mt-10">
                  <form
                    className="grid grid-cols-1 gap-6"
                    onSubmit={handleAddExpense}
                  >
                    {/* Expense Name */}
                    <div>
                      <input
                        className="addexpenseinput p-1"
                        type="text"
                        name="expenseName"
                        placeholder="Enter your expense name"
                        value={expenseData.expenseName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.expenseName && (
                        <p className="text-red-500">{errors.expenseName}</p>
                      )}
                    </div>

                    {/* Category */}
                    <div className="relative text-blue-50">
                      <input
                        type="text"
                        name="category"
                        className="addexpenseinput"
                        placeholder="Enter your category"
                        autoComplete="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        value={expenseData.category}
                      />
                      {isOpen && (
                        <div className="absolute bg-blue-950 w-full text-center py-2 rounded-xl">
                          {userData.user.categories
                            .filter(({ option }) =>
                              option
                                .toLowerCase()
                                .includes(expenseData.category.toLowerCase())
                            )
                            .map(({ option, value }) => (
                              <p
                                className="hover:bg-gray-400 cursor-pointer p-1"
                                key={value}
                                onMouseDown={() => handleCategorySelect(option)} // Prevents blur issue
                              >
                                {option}
                              </p>
                            ))}
                        </div>
                      )}
                      {errors.category && (
                        <p className="text-red-500">{errors.category}</p>
                      )}
                    </div>

                    {/* Price */}
                    <div>
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
                    <div>
                      <p className="inline pr-2 text-white">
                        Include to Monthly Expense
                      </p>
                      <input
                        type="checkbox"
                        name="isMonthlyExpense"
                        checked={expenseData.isMonthlyExpense}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Date */}
                    {expenseData.isMonthlyExpense && (
                      <div>
                        <input
                          className="addexpenseinput p-1"
                          type="date"
                          name="date"
                          value={expenseData.date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.date && (
                          <p className="text-red-500">{errors.date}</p>
                        )}
                      </div>
                    )}
                    {expenseData.isMonthlyExpense && (
                      <div>
                        <p className="inline pr-2 text-white">
                          Include to current Month
                        </p>
                        <input
                          type="checkbox"
                          name="isIncluded"
                          checked={expenseData.isIncluded}
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

export default AddExpense;
