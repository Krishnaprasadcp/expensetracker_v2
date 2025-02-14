"use client";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";
function LayoutThing() {
  const isLoginValue = useAppSelector((state) => state.user.isLogin);
  console.log(isLoginValue);

  const [time, setTime] = useState(() =>
    typeof window !== "undefined" ? new Date() : null
  );
  const [isLoggin, setIsLoggin] = useState(true);
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);
  const logoutHandler = () => {
    setIsLoggin(false);
  };
  return (
    <>
      <div className="flex justify-between mx-8 mt-4">
        <div>
          {!isLoggin && (
            <nav className="topnavbar">
              <Link className="mr-8" href={"#"}>
                SignIn
              </Link>
              <Link href={"#"}>SignUp</Link>
            </nav>
          )}
          {isLoggin && (
            <nav className="topnavbar grid grid-flow-col gap-4">
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
        <div className="text-gray-200 text-xl">
          <h4>
            {/* Time:{time?.getHours()}:{time?.getMinutes()}:{time?.getSeconds()} */}
          </h4>
          <div>
            <p>
              {/* Date:{time?.getDate()}-{time?.getMonth()}-{time?.getFullYear()} */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default LayoutThing;
