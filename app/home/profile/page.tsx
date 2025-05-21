"use client";

import { useAppSelector } from "@/store/hooks";


const Profile: React.FC = () => {
  const userDatas = useAppSelector((state) => state.user.user);
  let normalDate = null;
  if (userDatas.createdAt) {
    normalDate = new Date(userDatas.createdAt).toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }
  return (
    <>
      <div className="flex flex-col items-center justify-between pt-12">
        <div className="text-4xl text-gray-200 ">
          <p>
            WELCOME {userDatas.firstName.toUpperCase()}{" "}
            {userDatas.secondName.toUpperCase()}!
          </p>
        </div>
        <div className=" flex flex-col items-center justify-between pt-10">
          <div className="border border-gray-200 flex justify-center items-center rounded-full w-80 h-80">
            <img src="/images/signinimage.png" alt="images" />
          </div>
          <div className="text-gray-200 flex text-xl mt-16">
            <div>
              <p>
                {userDatas.firstName} {userDatas.secondName}
              </p>
              <p>Email: {userDatas.email}</p>
              <p>phone no: {userDatas.phoneNumber}</p>
              <p>created: {normalDate ? normalDate : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
