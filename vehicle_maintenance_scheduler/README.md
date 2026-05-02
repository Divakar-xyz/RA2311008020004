# Vehicle Maintenance Scheduler

Simple Node.js microservice for selecting vehicle maintenance tasks using the 0/1 knapsack algorithm.

## Setup

```bash
cd vehicle_maintenance_scheduler
npm install
npm start
```

## Environment

Set `EVALUATION_SERVICE_BASE_URL` if the evaluation service is not running on `http://localhost:3000`.

```bash
EVALUATION_SERVICE_BASE_URL=http://example.com npm start
```

## Endpoint

```http
GET /optimize/:depotId
```

Example response:

```json
{
  "depotId": "D1",
  "selectedTasks": [],
  "totalImpact": 0,
  "totalDuration": 0
}
```

