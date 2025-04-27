const Income = require("../models/incomeModel.js");

exports.addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { category, amount, date, note } = req.body;

    if (!category)
      return res.status(400).json({ message: "Please fill in category" });

    if (!amount)
      return res.status(400).json({ message: "Please fill in amount" });

    if (!date) return res.status(400).json({ message: "Please fill in date" });

    const newIncome = new Income({
      userId,
      category,
      amount,
      date: new Date(date),
      note,
    });

    await newIncome.save();

    res.status(201).json(newIncome);
  } catch (e) {
    console.error("Add Income Error:", e);
    res.status(500).json({ message: "Error adding income" });
  }
};

exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });

    res.status(200).json(income);
  } catch (e) {
    console.error("Get Income Error:", e);
    res.status(500).json({ message: "Error getting income" });
  }
};

exports.deleteIncome = async (req, res) => {
  try {
    const deleted = await Income.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (e) {
    console.error("Delete Income Error:", e);
    res.status(500).json({ message: "Error deleting income" });
  }
};

exports.editIncome = async (req, res) => {
  try {
    const { category, amount, date, note } = req.body;

    if (!category && !amount && !date && !note) {
      return res.status(400).json({
        message: "At least one field needs to be updated",
      });
    }

    const id = req.params.id;

    const updateIncome = await Income.findByIdAndUpdate(
      id,
      {
        ...(category && { category }),
        ...(amount && { amount }),
        ...(date && { date: new Date(date) }),
        ...(note && { note }),
      },
      { new: true }
    );

    if (!updateIncome) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json(updateIncome);
  } catch (e) {
    console.error("Edit Income Error:", e);
    res.status(500).json({ message: "Error updating income" });
  }
};
