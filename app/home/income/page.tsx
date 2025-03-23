"use client";
import { useAppSelector } from "@/store/hooks";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
interface INCOME_TYPE {
  name: string;
  income: number;
  dateAdded: string;
  _id: string;
}
interface INCOME_DATA {
  [key: string]: INCOME_TYPE | number;
  totalIncome: number;
}
const Income: React.FC = () => {
  const userId = useAppSelector((state) => state.user.userID);
  const [incomeData, setIncomeData] = useState<INCOME_DATA | null>(null);
  const fetchTotalIncome = useCallback(async () => {
    if (userId) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/income/getIncomeData/${userId}`
      );
      const parsRes = await response.json();
      console.log(parsRes);

      setIncomeData(parsRes.data);
    }
  }, [userId]);

  useEffect(() => {
    fetchTotalIncome();
  }, [fetchTotalIncome]);

  const [monthlyIncome, setMonthlyIncome] = useState({
    monthlyIncomeName: "",
    monthlyIncome: 0,
  });

  const [otherIncome, setOtherIncome] = useState({
    otherIncomeName: "",
    otherIncome: 0,
  });
  console.log(incomeData);
  const [errors, setErrors] = useState({
    monthlyIncome: "",
    otherIncome: "",
  });

  const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "monthlyIncome" || name === "otherIncome") {
      if (!/^\d*\.?\d*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Only numbers are allowed",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }

    if (name.startsWith("monthlyIncome")) {
      setMonthlyIncome((prev) => ({
        ...prev,
        [name]: name === "monthlyIncome" ? Number(value) || 0 : value,
      }));
    } else if (name.startsWith("otherIncome")) {
      setOtherIncome((prev) => ({
        ...prev,
        [name]: name === "otherIncome" ? Number(value) || 0 : value,
      }));
    }
  };

  const handleSubmitMontlhyIncome = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/income/addMonthlyIncome`
    );
  };
  const handleSubmitOtherIncome = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/income/addOtherIncome`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...otherIncome, userId }),
        }
      );
      const data = await response.json();
      fetchTotalIncome();
      setOtherIncome({
        otherIncome: 0,
        otherIncomeName: "",
      });
    },
    [fetchTotalIncome, userId, otherIncome]
  );

  return (
    <>
      <div className="flex justify-around pt-24">
        <div className="flex ">
          <form onSubmit={handleSubmitMontlhyIncome}>
            <div className="">
              <p className="text-gray-200 text-xl ">Add Your Monthly Income</p>
              <input
                type="text"
                name="monthlyIncomeName"
                onChange={handleChangeEvent}
                placeholder="Enter your Income Name"
                className="rounded-full outline-none w-2/3 h-8 px-3 mt-2"
              />
              <input
                type="text"
                name="monthlyIncome"
                onChange={handleChangeEvent}
                placeholder="Enter your Monthly Income"
                className="rounded-full outline-none w-2/3 h-8 px-3 mt-2"
              />
              {errors.monthlyIncome && (
                <p className="text-red-500 text-sm">{errors.monthlyIncome}</p>
              )}
              <div className="flex justify-center">
                <button
                  disabled={errors.otherIncome !== ""}
                  className="rounded-full mt-2 border-2 text-gray-100 border-gray-200 px-3 py-1 "
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="rounded-full aspect-square border-white border-2 flex justify-center items-center">
          <p className="text-gray-200 text-2xl text-center  p-2">
            Your Saving <span className="block">{incomeData?.totalIncome}</span>
          </p>
        </div>

        <div className="flex ">
          <form onSubmit={handleSubmitOtherIncome}>
            <div className="">
              <p className="text-gray-200 text-xl ">Add Your Other Income</p>
              <input
                type="text"
                name="otherIncomeName"
                onChange={handleChangeEvent}
                value={otherIncome.otherIncomeName}
                placeholder="Enter your Income Name"
                className="rounded-full outline-none w-2/3 h-8 px-3 mt-2"
              />
              <input
                type="text"
                name="otherIncome"
                onChange={handleChangeEvent}
                value={otherIncome.otherIncome}
                placeholder="Enter your Other Income"
                className="rounded-full outline-none w-2/3 h-8 px-3 mt-2"
              />
              {errors.otherIncome && (
                <p className="text-red-500 text-sm">{errors.otherIncome}</p>
              )}
              <div className="flex justify-center">
                <button
                  disabled={errors.otherIncome !== ""}
                  className="rounded-full mt-2 border-2 text-gray-100 border-gray-200 px-3 py-1 "
                >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <td>Date</td>
              <td>Added Money</td>
              <td>Source</td>
            </tr>
          </thead>
          <tbody>
            {incomeData &&
              Object.keys(incomeData)
                .filter((key) => key !== "totalIncome")
                .map((key) => {
                  const income = incomeData[key] as INCOME_TYPE;

                  // Ensure income is defined before rendering
                  if (!income || typeof income !== "object") return null;

                  return (
                    <tr key={income._id}>
                      <td>{income.name}</td>
                      <td>{income.income}</td>
                      <td>{income.dateAdded}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Income;
// <tr>
//   <td>28/10/2002</td>
//   <td>500</td>
//   <td>Uncle gave me</td>
// </tr>;
