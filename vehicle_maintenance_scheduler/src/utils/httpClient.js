const { Log } = require("../../../logging_middleware/log");

async function getJson(url) {
  Log("backend", "debug", "utils", `GET ${url}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

module.exports = { getJson };

