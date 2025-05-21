"use client";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import useSWR, { mutate } from "swr";
interface incomeData {
  createdAt: string;
  incomeName: string;
  income: number;
  userId: string;
  _id: string;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Income: React.FC = () => {
  const userDatas = useAppSelector((state) => state.user);
  const dataURL = userDatas.userID
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/income/getAllIncome/${userDatas.userID}`
    : null;

  const [isEditable, setIsEditable] = useState<string | null>(null);
  const { data, error, isLoading } = useSWR(dataURL, fetcher, {
    revalidateOnFocus: false,
  });
  const [inputData, setInputData] = useState({
    incomeName: "",
    income: "",
    id: "",
  });
  const deleteIncomeHandler = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteData/deleteOneIncome/${id}`,
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
  const editIncomeHandler = async () => {
    if (!inputData.incomeName || !inputData.income) {
      return;
    }
    const bodyData = {
      incomeName: inputData.incomeName,
      income: inputData.income,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/editData/editOneIncome/${inputData.id}`,
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
  const incomes: incomeData[] = data?.data;
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="text-white text-3xl pt-12 flex justify-center">
            <span>Your Income</span>
          </div>
          <div className="text-gray-100 flex h-screen items-start  ">
            <div className="max-h-[500px] overflow-y-auto w-full opacity-70 rounded-2xl p-12">
              <table className="  mx-auto  bg-slate-500  rounded-lg p-3">
                <thead className="text-white">
                  <tr>
                    <th className="expenseTableTd pt-5 pb-2">No</th>
                    <th className="expenseTableTd pt-5 pb-2">Income Name</th>
                    <th className="expenseTableTd pt-5 pb-2">Amount</th>
                    <th className="expenseTableTd pt-5 pb-2">Date</th>
                    <th className="expenseTableTd pt-5 pb-2">Delete</th>
                    <th className="expenseTableTd pt-5 -pb-10 ">Edit</th>
                  </tr>
                </thead>
                <tbody className="">
                  {incomes?.map((income, index) => {
                    const isRowEditable = isEditable === income._id;

                    return (
                      <tr className="expenseTableTr" key={income._id}>
                        <td className="expenseTableTd">{index + 1}</td>
                        <td className="expenseTableTd">
                          {isRowEditable ? (
                            <input
                              className="text-black"
                              type="text"
                              name="incomeName"
                              value={inputData.incomeName}
                              onChange={changeHandler}
                            />
                          ) : (
                            income.incomeName
                          )}
                        </td>

                        <td className="expenseTableTd">
                          {isRowEditable ? (
                            <input
                              className="text-black"
                              type="text"
                              name="income"
                              onChange={changeHandler}
                              value={inputData.income}
                            />
                          ) : (
                            income.income
                          )}
                        </td>
                        <td className="expenseTableTd">
                          {new Date(income.createdAt).toLocaleDateString(
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
                            onClick={() => deleteIncomeHandler(income._id)}
                          >
                            🗑️
                          </button>
                        </td>
                        <td className="expenseTableTd">
                          {isRowEditable ? (
                            <button onClick={editIncomeHandler}>✅</button>
                          ) : (
                            <button
                              onClick={() => {
                                setIsEditable(income._id);
                                setInputData({
                                  incomeName: income.incomeName,

                                  income: income.income.toString(),
                                  id: income._id,
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
export default Income;
