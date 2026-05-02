const { getJson } = require("../utils/httpClient");
const { Log } = require("../../../logging_middleware/log");

const BASE_URL = process.env.EVALUATION_SERVICE_BASE_URL || "http://20.207.122.201";
const TOKEN = process.env.EVALUATION_SERVICE_TOKEN;

async function fetchDepots() {
  Log("backend", "info", "service", "Fetching depots started");

  try {
    const data = await getJson(`${BASE_URL}/evaluation-service/depots`, TOKEN);
    const depots = Array.isArray(data) ? data : data.depots;
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
    const data = await getJson(`${BASE_URL}/evaluation-service/vehicles`, TOKEN);
    const vehicles = Array.isArray(data) ? data : data.vehicles;
    Log("backend", "info", "service", "Fetched vehicles successfully");
    return vehicles;
  } catch (error) {
    Log("backend", "error", "service", `Failed to fetch vehicles: ${error.message}`);
    throw error;
  }
}

module.exports = { fetchDepots, fetchVehicles };
