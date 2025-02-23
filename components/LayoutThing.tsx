"use client";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import React, { useState } from "react";
function LayoutThing() {
  const isLoginValue = useAppSelector((state) => state.user.isLogin);
  console.log(isLoginValue);

  const [time, setTime] = useState(() =>
    typeof window !== "undefined" ? new Date() : null
  );
  const [isLoggin, setIsLoggin] = useState(true);
  const logoutHandler = () => {
    setIsLoggin(false);
  };
  return (
    <>
      <div className="flex justify-between mx-8 mt-4">
        {!isLoggin && (
          <nav className="topnavbar">
            <Link className="mr-8" href={"#"}>
              SignIn
            </Link>
            <Link href={"#"}>SignUp</Link>
          </nav>
        )}
        {isLoggin && (
          <nav className="topnavbar ">
            <Link href="/home">Home</Link>
            <Link href="/home/expenses">Expenses</Link>
            <Link href="/home/income">Income</Link>
            <Link href="/home/addexpense">Add Expense</Link>
            <Link href="/home/profile">My Profile</Link>
            <Link onClick={logoutHandler} href="/">
              Sign out
            </Link>
          </nav>
        )}
      </div>
    </>
  );
}
export default LayoutThing;
