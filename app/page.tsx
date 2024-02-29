import LoginForm from "@/components/Login/LoginForm";
import Image from "next/image";

export default function Login() {
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
