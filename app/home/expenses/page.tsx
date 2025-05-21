"use client";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import useSWR, { mutate } from "swr";
interface expenseData {
  category: string;
  createdAt: string;
  expenseName: string;
  price: number;
  userId: string;
  _id: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Expense: React.FC = () => {
  const userDatas = useAppSelector((state) => state.user);
  const dataURL = userDatas.userID
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/getAllExpense/${userDatas.userID}`
    : null;

  const [isEditable, setIsEditable] = useState<string | null>(null);
  const { data, error, isLoading } = useSWR(dataURL, fetcher, {
    revalidateOnFocus: false,
  });
  const [inputData, setInputData] = useState({
    expenseName: "",
    category: "",
    price: "",
    id: "",
  });
  const deleteExpenseHandler = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteData/deleteOneExpense/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log(response);
      return;
    }
    const data = await response.json();
    mutate(dataURL);

    console.log(data);
  };
  const editExpenseHandler = async () => {
    if (!inputData.expenseName || !inputData.category || !inputData.price) {
      return;
    }
    const bodyData = {
      expenseName: inputData.expenseName,
      category: inputData.category,
      price: inputData.price,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/editData/editOneExpense/${inputData.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }
    );
    if (!response.ok) {
      console.log(response);
      return;
    }
    const data = await response.json();
    mutate(dataURL);
    setIsEditable(null);
    console.log(inputData);
  };
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };
  const expenses: expenseData[] = data?.data;
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="text-white text-3xl pt-12 flex justify-center">
            <span>Your Expenses</span>
          </div>
          <div className="text-gray-100 flex h-screen items-start pt-12 ">
            <div className="max-h-[500px] overflow-y-auto w-full ">
              <table className="  mx-auto bg-slate-500  rounded-lg p-3 opacity-70 ">
                <thead>
                  <tr>
                    <th className="expenseTableTd pt-5 pb-2">No</th>
                    <th className="expenseTableTd pt-5 pb-2">Expense Name</th>
                    <th className="expenseTableTd pt-5 pb-2">Category</th>
                    <th className="expenseTableTd pt-5 pb-2">Amount</th>
                    <th className="expenseTableTd pt-5 pb-2">Date</th>
                    <th className="expenseTableTd pt-5 pb-2">Delete</th>
                    <th className="expenseTableTd pt-5 -pb-10 ">Edit</th>
                  </tr>
                </thead>
                <tbody className="">
                  {expenses?.map((expense, index) => {
                    const isRowEditable = isEditable === expense._id;

                    return (
                      <tr className="expenseTableTr" key={expense._id}>
                        <td className="expenseTableTd">{index + 1}</td>
                        <td className="expenseTableTd">
                          {isRowEditable ? (
                            <input
                              className="text-black"
                              type="text"
                              name="expenseName"
                              value={inputData.expenseName}
                              onChange={changeHandler}
                            />
                          ) : (
                            expense.expenseName
                          )}
                        </td>
                        <td className="expenseTableTd">
                          {isRowEditable ? (
                            <input
                              className="text-black"
                              type="text"
                              name="category"
                              onChange={changeHandler}
                              value={inputData.category}
                            />
                          ) : (
                            expense.category
                          )}
                        </td>
                        <td className="expenseTableTd">
                          {isRowEditable ? (
                            <input
                              className="text-black"
                              type="text"
                              name="price"
                              onChange={changeHandler}
                              value={inputData.price}
                            />
                          ) : (
                            expense.price
                          )}
                        </td>
                        <td className="expenseTableTd">
                          {new Date(expense.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="expenseTableTd">
                          <button
                            onClick={() => deleteExpenseHandler(expense._id)}
                          >
                            🗑️
                          </button>
                        </td>
                        <td className="expenseTableTd">
                          {isRowEditable ? (
                            <button onClick={editExpenseHandler}>✅</button>
                          ) : (
                            <button
                              onClick={() => {
                                setIsEditable(expense._id);
                                setInputData({
                                  expenseName: expense.expenseName,
                                  category: expense.category,
                                  price: expense.price.toString(),
                                  id: expense._id,
                                });
                              }}
                            >
                              ✏️
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Expense;
