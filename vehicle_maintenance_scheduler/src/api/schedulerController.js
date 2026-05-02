const { fetchDepots, fetchVehicles } = require("../services/evaluationService");
const { optimizeTasks } = require("../services/optimizerService");
const { Log } = require("../../../logging_middleware/log");

async function optimizeDepot(req, res) {
  const depotId = req.params.depotId;
  Log("backend", "info", "controller", `Optimization requested for depot ${depotId}`);

  try {
    const depots = await fetchDepots();

    if (!Array.isArray(depots) || depots.length === 0) {
      Log("backend", "error", "controller", "Depot data is empty");
      return res.status(502).json({ error: "Depot data is empty" });
    }

    const depot = depots.find((item) => String(item.ID) === String(depotId));

    if (!depot) {
      Log("backend", "warn", "controller", `Invalid depotId received: ${depotId}`);
      return res.status(404).json({ error: "Invalid depotId" });
    }

    const vehicles = await fetchVehicles();

    if (!Array.isArray(vehicles) || vehicles.length === 0) {
      Log("backend", "error", "controller", "Vehicle data is empty");
      return res.status(502).json({ error: "Vehicle data is empty" });
    }

    const result = optimizeTasks(vehicles, Number(depot.MechanicHours));

    Log("backend", "info", "controller", `Optimization completed for depot ${depotId}`);
    return res.json({
      depotId: depot.ID,
      selectedTasks: result.selectedTasks,
      totalImpact: result.totalImpact,
      totalDuration: result.totalDuration
    });
  } catch (error) {
    Log("backend", "error", "controller", error.message);
    return res.status(500).json({ error: "Unable to optimize tasks" });
  }
}

module.exports = { optimizeDepot };

