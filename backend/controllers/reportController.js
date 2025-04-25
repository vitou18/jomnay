const Income = require("../models/incomeModel.js");
const Expense = require("../models/expenseModel.js");
const xlsx = require("xlsx");

function getDateRange(type) {
  const now = new Date();
  let start, end;

  switch (type) {
    case "week":
      const day = now.getDay();
      start = new Date(now);
      start.setDate(now.getDate() - day);
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    case "month":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      break;
    case "year":
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
    default:
      return null;
  }

  return { start, end };
}

exports.getAllReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, from, to } = req.query;

    let dateFilter = {};

    if (from && to) {
      const start = new Date(from);
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      dateFilter.date = { $gte: start, $lte: end };
    } else if (type) {
      const range = getDateRange(type);
      if (range) {
        dateFilter.date = { $gte: range.start, $lte: range.end };
      }
    }

    const incomeData = await Income.find({ userId, ...dateFilter })
      .sort({ createdAt: -1 })
      .lean();
    const expenseData = await Expense.find({ userId, ...dateFilter })
      .sort({ createdAt: -1 })
      .lean();

    const report = [
      ...incomeData.map((i) => ({ ...i, type: "income" })),
      ...expenseData.map((e) => ({
        ...e,
        amount: -Math.abs(e.amount),
        type: "expense",
      })),
    ];

    report.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ report });
  } catch (err) {
    console.error("Get Report Error:", err);
    res.status(500).json({ message: "Error getting report", error: err });
  }
};

exports.downloadReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, from, to } = req.query;

    let dateFilter = {};

    if (from && to) {
      const start = new Date(from);
      const end = new Date(to);
      end.setHours(23, 59, 59, 999);
      dateFilter.date = { $gte: start, $lte: end };
    } else if (type) {
      const range = getDateRange(type);
      if (range) {
        dateFilter.date = { $gte: range.start, $lte: range.end };
      }
    }

    const incomeData = await Income.find({ userId, ...dateFilter })
      .sort({ date: -1 })
      .lean();
    const expenseData = await Expense.find({ userId, ...dateFilter })
      .sort({ date: -1 })
      .lean();

    const allData = [
      ...incomeData.map((i) => ({
        Category: i.category,
        Amount: i.amount,
        Date: i.date,
        Type: "Income",
      })),
      ...expenseData.map((e) => ({
        Category: e.category,
        Amount: -Math.abs(e.amount),
        Date: e.date,
        Type: "Expense",
      })),
    ];

    allData.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(allData);
    xlsx.utils.book_append_sheet(wb, ws, "Transactions");

    const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=report_details.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (err) {
    console.error("Download Report Error:", err);
    res.status(500).json({ message: "Error downloading report", error: err });
  }
};
