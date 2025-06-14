import "dotenv/config"; // ✅ this works after installing dotenv
import cron from "node-cron";
import { connectDB } from "../libs/database/mongo";
import USER from "../libs/database/models/userSchema";
import EXPENSES from "../libs/database/models/expenseSchema";
import INCOME from "../libs/database/models/incomeSchema";

(async () => {
  try {
    await connectDB();
    console.log("✅ Mongo connected");

    cron.schedule("0 0 * * *", async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      console.log("🕒 Running cron job for date:", today.toISOString());
      // your job logic here
      const users = await USER.find();

      for (const user of users) {
        for (const expense of user.monthlyExpense || []) {
          if (
            expense.reccurenceDate &&
            new Date(expense.reccurenceDate).getDate() === today.getDate()
          ) {
            await EXPENSES.create({
              userId: user._id,
              expenseName: expense.expenseName,
              category: expense.category,
              price: expense.price,
              createdAt: new Date(),
            });
            console.log(`💸 Expense created for ${user.email}`);
          }
        }
        for (const income of user.monthlyIncome || []) {
          if (
            income.reccurenceDate &&
            new Date(income.reccurenceDate).getDate() === today.getDate()
          ) {
            await INCOME.create({
              userId: user._id,
              incomeName: income.incomeName,
              income: income.income,
              createdAt: new Date(),
            });
            console.log(`💰 Income created for ${user.email}`);
          }
        }
      }
    });

    console.log("✅ Cron job scheduled");
  } catch (err) {
    console.error("❌ Error starting cron job:", err);
  }
})();
