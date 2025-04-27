const Income = require("../models/incomeModel.js");
const Expense = require("../models/expenseModel.js");
const xlsx = require("xlsx");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

// function get date range
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

// getAll report
exports.getAllReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type } = req.query;

    let dateFilter = {};

    if (type) {
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
      ...expenseData.map((e) => ({ ...e, type: "expense" })),
    ];

    report.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ report });
  } catch (err) {
    console.error("Get Report Error:", err);
    res.status(500).json({ message: "Error getting report", error: err });
  }
};

// Download report
exports.downloadReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, format } = req.query;

    let dateFilter = {};

    if (type) {
      const range = getDateRange(type);
      if (range) {
        dateFilter.date = { $gte: range.start, $lte: range.end };
      }
    }

    // get income and expense by dateFilter
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

    // Handle different formats
    if (format === "csv") {
      const ws = xlsx.utils.json_to_sheet(allData);
      const csvData = xlsx.utils.sheet_to_csv(ws);

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=report_details.csv"
      );
      res.setHeader("Content-Type", "text/csv");

      res.send(csvData);
    } else if (format === "pdf") {
      const doc = new PDFDocument({ margin: 50 });

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=transaction_report.pdf"
      );
      res.setHeader("Content-Type", "application/pdf");

      doc.pipe(res);

      // --- Top Logo ---
      const logoPath = path.join(__dirname, "../assets/img/big_logo.png");
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 50, 20, { width: 50 });
      }

      // Title with Rubik font
      doc
        .fontSize(24)
        .text("Transaction Report", 110, 30, { align: "left" });

      // --- Sub Title (Download Date) ---
      doc
        .moveDown(0.5)
        .fontSize(10)
        .text(`Downloaded on ${new Date().toLocaleDateString()}`, {
          align: "right",
        });

      doc.moveDown(1);

      // --- Draw line ---
      doc
        .moveTo(50, doc.y)
        .lineTo(doc.page.width - 50, doc.y)
        .stroke();

      doc.moveDown(1);

      // --- Table Config ---
      const tableTop = doc.y;
      const itemMargin = 20;

      const columnWidths = {
        date: 120,
        category: 200,
        amount: 100,
      };

      // --- Group Data ---
      const incomeEntries = allData.filter((item) => item.Type === "Income");
      const expenseEntries = allData.filter((item) => item.Type === "Expense");

      const drawSection = (title, entries) => {
        if (entries.length === 0) return;

        // Header background
        doc.rect(50, doc.y, doc.page.width - 100, 20).fill("#f8b195");

        doc
          .fillColor("black")
          .fontSize(12)
          .text(title, 55, doc.y + 5);

        doc.moveDown(1.2);

        // Table Headers
        const tableYStart = doc.y;

        doc
          .fillColor("black")
          .fontSize(10)
          .text("Date", 55, tableYStart)
          .text("Category", 55 + columnWidths.date + itemMargin, tableYStart)
          .text(
            "Amount",
            55 + columnWidths.date + columnWidths.category + itemMargin * 2,
            tableYStart,
            { align: "right" }
          );

        const rowHeight = 15;
        doc.moveDown(0.7);

        // Table rows
        entries.forEach((item, index) => {
          let y = doc.y;
          if (y > doc.page.height - 50) {
            doc.addPage();
            y = 50;
          }

          doc
            .fontSize(10)
            .fillColor("black")
            .text(new Date(item.Date).toLocaleDateString(), 55, y)
            .text(item.Category, 55 + columnWidths.date + itemMargin, y)
            .text(
              item.Amount.toFixed(2),
              55 + columnWidths.date + columnWidths.category + itemMargin * 2,
              y,
              { align: "right" }
            );

          doc
            .moveTo(50, y + 12)
            .lineTo(doc.page.width - 50, y + 12)
            .strokeColor("#e0e0e0")
            .stroke();

          doc.moveDown(0.5);
        });

        doc.moveDown(1.5);
      };

      // --- Draw Incomes ---
      drawSection("Income", incomeEntries);

      // --- Draw Expenses ---
      drawSection("Expense", expenseEntries);

      // --- Summary Total ---
      const totalIncome = incomeEntries.reduce(
        (sum, item) => sum + item.Amount,
        0
      );
      const totalExpense = expenseEntries.reduce(
        (sum, item) => sum + item.Amount,
        0
      );
      const balance = totalIncome + totalExpense;

      doc.rect(50, doc.y, doc.page.width - 100, 20).fill("#f8b195");

      doc
        .fillColor("black")
        .fontSize(12)
        .text("Final Balance", 60, doc.y + 5)
        .text(
          balance.toFixed(2),
          60 + columnWidths.date + columnWidths.category + itemMargin * 2,
          doc.y + 5,
          { align: "right" }
        );

      doc.end();
    } else {
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
    }
  } catch (err) {
    console.error("Download Report Error:", err);
    res.status(500).json({ message: "Error downloading report", error: err });
  }
};
