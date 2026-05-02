const { Log } = require("../../../logging_middleware/log");

async function getJson(url, token) {
  Log("backend", "debug", "utils", `GET ${url}`);

  if (!token) {
    throw new Error("Evaluation service token is missing");
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

module.exports = { getJson };
