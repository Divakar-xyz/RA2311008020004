const express = require("express");
const optimizeRoutes = require("./api/routes");
const errorMiddleware = require("./middleware/errorMiddleware");
const { Log } = require("../../logging_middleware/log");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(optimizeRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  Log("backend", "info", "route", `Server started on port ${PORT}`);
});
