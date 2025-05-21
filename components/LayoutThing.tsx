"use client";
import { userSliceActions } from "@/store/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
function LayoutThing() {
  const isLoginValue = useAppSelector((state) => state.user.isLogin);

  const [isOpen, setIsOpen] = useState(false);
  const [delayedClose, setDelayedClose] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDelayedClose(true);
    } else {
      setTimeout(() => setDelayedClose(false), 500); // Total delay before hiding container
    }
  }, [isOpen]);
  const handleMouseEnter = () => {
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  const dispatch = useAppDispatch();
  const router = useRouter();
  const logoutHandler = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/logout`
    );
    dispatch(userSliceActions.setIsLogin(false));
    router.push("/");
  };
  return (
    <>
      <div className="flex justify-between mx-8 mt-4">
        {!isLoginValue && (
          <nav className="topnavbar">
            <Link className="mr-8" href={"/"}>
              SignIn
            </Link>
            <Link href={"/signup"}>SignUp</Link>
          </nav>
        )}
        {isLoginValue && (
          <nav className="topnavbar ">
            <Link href="/home">Home</Link>
            <Link href="/home/expenses">Expenses</Link>
            <Link href="/home/income">Income</Link>
            <Link href="/home/addexpense">Add Expense</Link>
            <Link href="/home/addIncome">Add Income</Link>

            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <button>Settings</button>
              <div
                className={`absolute flex flex-col  p-3 transition-all duration-200 ease-in-out ${
                  delayedClose ? "opacity-100 visible" : "opacity-0 invisible"
                }  border border-blue-50 text-lg whitespace-nowrap`}
              >
                <Link
                  className={`transition-all transform ${
                    isOpen
                      ? "translate-y-0 opacity-100 delay-100"
                      : "-translate-y-2 opacity-0 delay-500"
                  }`}
                  href="/home/profile"
                >
                  Profile
                </Link>
                <Link
                  className={`transition-all transform ${
                    isOpen
                      ? "translate-y-0 opacity-100 delay-200"
                      : "-translate-y-2 opacity-0 delay-[400ms]"
                  }`}
                  href="/home/profile/addCategory"
                >
                  Add Category
                </Link>
                <Link
                  className={`transition-all transform ${
                    isOpen
                      ? "translate-y-0 opacity-100 delay-300"
                      : "-translate-y-2 opacity-0 delay-300"
                  }`}
                  href="#"
                >
                  dUMMY
                </Link>
                <Link
                  className={`transition-all transform ${
                    isOpen
                      ? "translate-y-0 opacity-100 delay-[400]"
                      : "-translate-y-2 opacity-0 delay-200"
                  }`}
                  href="#"
                >
                  dUMMY
                </Link>
                <Link
                  className={`transition-all transform ${
                    isOpen
                      ? "translate-y-0 opacity-100 delay-500"
                      : "-translate-y-2 opacity-0 delay-100"
                  }`}
                  href="#"
                >
                  dUMMY
                </Link>
              </div>
            </div>

            {/* <Link href="/home/profile"></Link> */}
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
