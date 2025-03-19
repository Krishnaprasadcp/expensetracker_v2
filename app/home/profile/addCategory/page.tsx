"use client";

import { userSliceActions } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FormEvent, useState } from "react";

export default function AddCategory() {
  const userData = useAppSelector((state) => state.user);
  const dispacth = useAppDispatch();
  const [category, setCategory] = useState({ category: "" });
  const [searchedCategory, setSearchedCategory] = useState("");
  const handleChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "category") {
      setCategory((prev) => ({ ...prev, category: value }));
    } else if (name === "searchCategory") {
      setSearchedCategory(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const categoryExists = userData.user.categories.some(
      (userCategory) =>
        userCategory.value === category.category.trim().toLowerCase()
    );

    if (categoryExists) {
      console.log("Category already exists");
      return;
    }
    const newCategory = { ...category, userID: userData.userID };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/addCategory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      }
    );
    const parsedRes = await response.json();
    dispacth(
      userSliceActions.setUserData({
        ...userData.user,
        categories: parsedRes.data,
      })
    );
    setCategory({ category: "" });
  };

  return (
    <div className="w-full h-screen">
      <div className="flex justify-around pt-10 w-full">
        <div className="text-blue-50  ">
          <p className="text-2xl mb-3">Add Your Own Category</p>
          <form
            onSubmit={handleSubmit}
            className="border border-blue-100 p-2  text-center"
          >
            <div className="py-2">
              <p className="text-xl mb-2">category name</p>
              <input
                className="text-black"
                type="text"
                name="category"
                placeholder="Enter the category"
                value={category.category}
                onChange={handleChangeEventHandler}
              />
            </div>
            <button type="submit" className="my-2">
              Add Category
            </button>
          </form>
        </div>
        <div className="text-blue-50 ">
          <p className="text-xl">Your Existing Category</p>
          <div>
            <input
              type="text"
              className="text-black"
              name="searchCategory"
              onChange={handleChangeEventHandler}
              value={searchedCategory}
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {userData.user.categories
              .filter((category) =>
                category.option
                  .toLowerCase()
                  .includes(searchedCategory.toLowerCase())
              )
              .sort((a, b) => {
                const startsWithA = a.option
                  .toLowerCase()
                  .startsWith(searchedCategory.toLowerCase());
                const startsWithB = b.option
                  .toLowerCase()
                  .startsWith(searchedCategory.toLowerCase());

                if (startsWithA && !startsWithB) return -1; // `a` should come first
                if (!startsWithA && startsWithB) return 1; // `b` should come first
                return 0;
              })
              .map((category) => (
                <p key={category.value}>{category.option}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
