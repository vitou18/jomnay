const Income = require("../models/incomeModel.js");
const Expense = require("../models/expenseModel.js");
const { Types } = require("mongoose");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total Income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    // Total Expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalExpenses: { $sum: "$amount" } } },
    ]);

    // Fetch all incomes and expenses first (no limit yet)
    const incomeTransactions = await Income.find({ userId }).sort({ date: -1 });
    const expenseTransactions = await Expense.find({ userId }).sort({
      date: -1,
    });

    // Merge and sort by date, then limit 5
    const lastTransactions = [
      ...incomeTransactions.map((txn) => ({
        ...txn.toObject(),
        type: "income",
      })),
      ...expenseTransactions.map((txn) => ({
        ...txn.toObject(),
        type: "expense",
      })),
    ]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5); // Limit after sorting

    res.json({
      totalBalance:
        (totalIncome[0]?.totalIncome || 0) -
        (totalExpense[0]?.totalExpenses || 0),
      totalIncome: totalIncome[0]?.totalIncome || 0,
      totalExpense: totalExpense[0]?.totalExpenses || 0,
      recentTransactions: lastTransactions,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Error getting dashboard" });
  }
};
