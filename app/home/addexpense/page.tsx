import React from "react";
const AddExpense: React.FC = () => {
  return (
    <>
      <div className="mt-9">
        <p className="text-4xl text-gray-200 ml-8">WELCOME KRISHNAPRASAD!</p>
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
              <p className="text-4xl text-gray-200 ">
                ADD YOUR <span className="block mt-4">EXPENSES HERE</span>
              </p>
            </div>
            <div className="mt-10">
              <form className="grid grid-cols-1 gap-6">
                <div className="">
                  <input
                    className="addexpenseinput p-1"
                    type="text"
                    placeholder="Enter your expense Name"
                  />
                </div>
                <div className="">
                  <input
                    className="addexpenseinput p-1"
                    type="text"
                    placeholder="Enter your category"
                  />
                </div>
                <div className="">
                  <input
                    className="addexpenseinput p-1"
                    type="text"
                    name=""
                    placeholder="Enter the price"
                  />
                </div>
                <div className="">
                  <input
                    className="addexpenseinput p-1"
                    type="text"
                    placeholder="Enter the date (dd-mm-yy)"
                  />
                </div>
                <button>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddExpense;
