// import { useEffect, useState } from "react";
interface expenseData {
  category: string;
  date: string;
  expenseName: string;
  price: number;
  _id: string;
}
const Expense: React.FC = () => {
  // const [expenseData, setExpenseData] = useState<expenseData[] | null>(null);
  // useEffect(() => {
  //   if (userDatas.userID) {
  //     async function getExpense() {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_URL}/api/expenses/getAllExpense/${userDatas.userID}`
  //       );
  //       if (!response.ok) {
  //         console.log("error");
  //         return;
  //       }
  //       const data = await response.json();
  //       setExpenseData(data.data);
  //       console.log(data);
  //     }
  //     getExpense();
  //   }
  // }, [userDatas]);
  return <>Expense</>;
};
export default Expense;
