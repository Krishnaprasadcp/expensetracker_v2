import { NextResponse } from "next/server";

interface MonthlyDataObject {
  category: string;
  amount: string;
  date: string;
}
interface FormDataObject {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  rePassword: string;
  phoneNumber: string;
}

interface DataType {
  monthlyExpenseDatas: MonthlyDataObject[];
  formData: FormDataObject;
}
export async function SignUpFormSubmissionAction(data: DataType) {
  try {
    const response = await fetch(
      "http://localhost:3000/api/authentication/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      return { success: false, message: responseData };
    }
    console.log(responseData);
    return { success: true, message: responseData };
  } catch (error) {
    console.error("Network Error:", error);

    // Handle different types of network errors
    if (error instanceof TypeError) {
      return { success: false, error: "Network error or invalid API URL." };
    }

    return { success: false, error: "An unexpected error occurred." };
  }
}
