const express = require("express");
const { optimizeDepot } = require("./schedulerController");
const { Log } = require("../../../logging_middleware/log");

const router = express.Router();

router.get("/health", (req, res) => {
  Log("backend", "info", "route", "Health check requested");
  res.json({ status: "ok" });
});

router.get("/optimize/:depotId", optimizeDepot);

module.exports = router;

