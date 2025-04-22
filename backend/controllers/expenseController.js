const Expense = require("../models/expenseModel.js");

exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  const { amount, date, category, note } = req.body;

  if (!category)
    return res.status(400).json({ message: "Please fill in category" });

  if (!amount)
    return res.status(400).json({ message: "Please fill in amount" });

  if (!date) return res.status(400).json({ message: "Please fill in date" });

  try {
    const newExpense = new Expense({
      userId,
      category,
      amount,
      date: new Date(date),
      note,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ message: "Error adding expense" });
  }
};

exports.getAllExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (e) {
    console.error("Get Expenses Error:", e);
    res.status(500).json({ message: "Error getting expenses" });
  }
};

exports.deleteExpense = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await Expense.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (e) {
    console.error("Delete Expense Error:", e);
    res.status(500).json({ message: "Error deleting expense" });
  }
};

exports.editExpense = async (req, res) => {
  const id = req.params.id;
  const { amount, date, category, note } = req.body;

  if (!amount && !date && !category && !note) {
    return res.status(400).json({ message: "At least one field required" });
  }

  try {
    const expense = await Expense.findById(id);
    if (!expense || expense.userId.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ message: "Expense not found or unauthorized" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        ...(category && { category }),
        ...(amount && { amount }),
        ...(date && { date: new Date(date) }),
        ...(note && { note }),
      },
      { new: true }
    );

    res.status(200).json(updatedExpense);
  } catch (e) {
    console.error("Edit Expense Error:", e);
    res.status(500).json({ message: "Error updating expense" });
  }
};
