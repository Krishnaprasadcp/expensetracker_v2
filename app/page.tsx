"use client";
import LoginForm from "@/components/Login/LoginForm";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Login() {
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const router = useRouter();
  useEffect(() => {
    function checkIsLogin() {
      if (isLogin) {
        router.push("/home");
      }
    }
    checkIsLogin();
  }, [isLogin]);
  return (
    <div className="flex flex-col items-center sm:flex-row w-11/12 mx-auto sm:mx-16 ">
      <div className="w-2/3 sm:w-1/2 lg:w-2/5 xl:w-2/6 2xl:w-3/12 xl:ml-52">
        <LoginForm />
      </div>
      <div className="w-3/4 sm:w-1/3 md:w-2/5 lg:w-2/5 xl:w-2/6 mt-12 sm:mt-24 sm:ml-9 lg:ml-16 xl:ml-32">
        <img
          src="/images/signinimage.png"
          alt="login image"
          className=" w-full object-cover bg-center"
        />
      </div>
    </div>
  );
}
