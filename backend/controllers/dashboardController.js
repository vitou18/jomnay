const Income = require("../models/incomeModel.js");
const Expense = require("../models/expenseModel.js");
const { Types } = require("mongoose");

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, totalExpenses: { $sum: "$amount" } } },
    ]);

    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ createdAt: -1 }).limit(5)).map(
        (txn) => ({ ...txn.toObject(), type: "income" })
      ),
      ...(await Expense.find({ userId }).sort({ createdAt: -1 }).limit(5)).map(
        (txn) => ({ ...txn.toObject(), type: "expense" })
      ),
    ].sort((a, b) => b.createdAt - a.createdAt);

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
