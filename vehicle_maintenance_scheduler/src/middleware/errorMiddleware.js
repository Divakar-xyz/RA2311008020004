const { Log } = require("../../../logging_middleware/log");

function errorMiddleware(err, req, res, next) {
  Log("backend", "error", "route", err.message);
  res.status(500).json({ error: "Internal server error" });
}

module.exports = errorMiddleware;

