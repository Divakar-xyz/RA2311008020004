const { getJson } = require("../utils/httpClient");
const { Log } = require("../../../logging_middleware/log");

const BASE_URL = process.env.EVALUATION_SERVICE_BASE_URL || "http://localhost:3000";

async function fetchDepots() {
  Log("backend", "info", "service", "Fetching depots started");

  try {
    const depots = await getJson(`${BASE_URL}/evaluation-service/depots`);
    Log("backend", "info", "service", "Fetched depots successfully");
    return depots;
  } catch (error) {
    Log("backend", "error", "service", `Failed to fetch depots: ${error.message}`);
    throw error;
  }
}

async function fetchVehicles() {
  Log("backend", "info", "service", "Fetching vehicles started");

  try {
    const vehicles = await getJson(`${BASE_URL}/evaluation-service/vehicles`);
    Log("backend", "info", "service", "Fetched vehicles successfully");
    return vehicles;
  } catch (error) {
    Log("backend", "error", "service", `Failed to fetch vehicles: ${error.message}`);
    throw error;
  }
}

module.exports = { fetchDepots, fetchVehicles };

