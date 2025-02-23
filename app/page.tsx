"use client";
import LoginForm from "@/components/Login/LoginForm";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    const isValidUser = async () => {
      try {
        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/authentication/protectedRoute`,
        //   { credentials: "include" }
        // );
        // const data = await res.json();
        // console.log(data);
      } catch (error) {
        console.error("Failed to refresh token", error);
      }
    };
    isValidUser();
  }, []);
  return (
    <div className="flex justify-around w-11/12 mx-16 ">
      <div className="w-1/3">
        <LoginForm />
      </div>
      <div className="w-1/3 mt-24">
        <img
          src="/images/signinimage.png"
          alt="login image"
          className="mt-24 w-full object-cover"
        />
      </div>
    </div>
  );
}
