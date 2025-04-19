const express = require("express");

const { protect } = require("../middlewares/authMiddleware");

const {
  getAllReport,
  downloadReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/", protect, getAllReport);
router.get("/download", protect, downloadReport);

module.exports = router;
