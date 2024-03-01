import React from "react";
const Home: React.FC = () => {
  return (
    <>
      <div>
        <div className="mt-16 mx-8 flex justify-between">
          <p className="ml-5 text-5xl text-gray-200">WELCOME KRISHNAPRASAD!</p>
          <div className="flex items-start mr-8 mt-6">
            <p className="text-2xl text-gray-200 py-14 mr-11">Your Spent:</p>
            <div className=" h-44 w-44 grid grid-cols-1 content-center rounded-full  border border-sky-700 border-x-4 border-y-2 text-2xl text-gray-200 text-center">
              <p className="p-4">Rs 100000</p>
            </div>
          </div>
        </div>

        <div className="text-gray-200 text-xl bg-slate-400 bg-opacity-70 rounded-2xl w-fit ml-12 py-8 px-16">
          <p className="">Today:Rs.50</p>
          <p className="">Yesterday:Rs.150</p>
        </div>
        <div className="text-gray-200 text-xl bg-slate-400 bg-opacity-70 rounded-2xl w-11/12 ml-12 py-7 px-12 mt-7">
          <div>
            <p>Groceries:</p>
          </div>
          <div className="flex justify-between">
            <p>Past Average:64.5</p>
            <p>This Month:55.5</p>
            <p>Spent Extra:80</p>
          </div>
        </div>
        <div className="text-gray-200 text-xl bg-slate-400 bg-opacity-70 rounded-2xl w-11/12 ml-12 py-7 px-12 mt-7">
          <div>
            <p>Groceries:</p>
          </div>
          <div className="flex justify-between">
            <p>Past Average:64.5</p>
            <p>This Month:55.5</p>
            <p>Spent Extra:80</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
