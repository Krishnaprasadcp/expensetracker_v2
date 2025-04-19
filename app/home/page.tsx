"use client";
import { useAppSelector } from "@/store/hooks";
import React, { useEffect, useState } from "react";

interface OTHEREXPENSES {
  expenseName: string;
  category: string;
  _id: string;
  createdAt: string;
}
interface EXPENSE_DATA {
  totalExpens: number;

  otherExpense: OTHEREXPENSES[];
  todayExpense: number;
  yesterdayExpense: number;
}
const Home: React.FC = () => {
  const [expenseData, setExpenseData] = useState<EXPENSE_DATA | null>(null);
  const userDatas = useAppSelector((state) => state.user);
  useEffect(() => {
    if (userDatas.userID) {
      async function getAllExpense() {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/getAllExpense/${userDatas.userID}`
        );
        const { data } = await response.json();

        setExpenseData(data.totalExpense?.[0] || null);
      }
      getAllExpense();
    }
  }, [userDatas.userID]);

  return (
    <>
      {userDatas && (
        <div>
          <div className="mt-16 mx-8 flex justify-between">
            <p className="ml-5 text-5xl text-gray-200">
              {`Welcome ${userDatas.user.firstName}`}
            </p>
            <div className="flex items-start mr-8 mt-6">
              <p className="text-2xl text-gray-200 py-14 mr-11">Your Spent:</p>
              <div className=" h-44 w-44 grid grid-cols-1 content-center rounded-full  border border-sky-700 border-x-4 border-y-2 text-2xl text-gray-200 text-center">
                <p className="p-4">Rs {expenseData?.totalExpens ?? 0}</p>
              </div>
            </div>
          </div>

          <div className="text-gray-200 text-xl bg-slate-400 bg-opacity-70 rounded-2xl w-fit ml-12 py-8 px-16">
            <p className="">Today:Rs.{expenseData?.todayExpense ?? 0}</p>
            <p className="">
              Yesterday:Rs.
              {expenseData?.yesterdayExpense ?? 0}
            </p>
          </div>
          {/* {expenseData?.?.map((expense) => (
            <div
              key={expense._id || Math.random()}
              className="text-gray-200 text-xl bg-slate-400 bg-opacity-70 rounded-2xl w-11/12 ml-12 py-7 px-12 mt-7"
            >
              <div>
                <p>{expense._id}:</p>
              </div>
              <div className="flex justify-between">
                <p>
                  Past Month Expense:
                  {expense?.expenses?.previousMonth?.totalExpense ?? 0}
                </p>
                <p>
                  Current Month Expense :
                  {expense.expenses.currentMonth.totalExpense ?? 0}
                </p>
                <p>
                  {expense.extraSpent > 0 ? (
                    <>
                      Spent Extra: <span>{`${expense.extraSpent} Rs`}</span>
                    </>
                  ) : expense.extraSpent < 0 ? (
                    <>
                      Saved: <span>{`${Math.abs(expense.extraSpent)} Rs`}</span>
                    </>
                  ) : (
                    <>No Change</>
                  )}
                </p>
              </div>
            </div>
          ))} */}
        </div>
      )}
    </>
  );
};
export default Home;
