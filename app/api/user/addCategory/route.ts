import { connectDB } from "@/libs/database/mongo";
import { ResponseSender } from "../../utils/responseSender";
import USER from "@/libs/database/models/userSchema";

export async function POST(req: Request) {
  try {
    const data: { category: string; userID: string } = await req.json();
    if (data.category === "") {
      return ResponseSender("category should not be empty", 400);
    }
    console.log(data);

    await connectDB();
    const userCategories = await USER.findByIdAndUpdate(
      data.userID,
      {
        $push: {
          categories: {
            option:
              data.category.trim().charAt(0).toUpperCase() +
              data.category.trim().slice(1).toLowerCase(),

            value: data.category.trim().toLowerCase(),
          },
        },
      },
      { new: true }
    );

    return ResponseSender("Sucess", 200, userCategories.categories);
  } catch (error) {
    return ResponseSender("Internal Server Error", 500);
  }
}
