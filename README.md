# Vehicle Maintenance Scheduler

Backend microservice for selecting vehicle maintenance tasks using the 0/1 knapsack algorithm.

## Project Location

Main source code is inside:

```text
vehicle_maintenance_scheduler/
```

Logging middleware is inside:

```text
logging_middleware/
```

## Run Project

```powershell
cd vehicle_maintenance_scheduler
$env:EVALUATION_SERVICE_TOKEN="your_token_here"
npm install
npm start
```

## API

```http
GET /optimize/:depotId
```

Example:

```text
http://localhost:3000/optimize/1
```

## Screenshots

### Depots API Response

![Depots API Response](vehicle_maintenance_scheduler/screenshots/depots-response.png)

### Vehicles API Response

![Vehicles API Response](vehicle_maintenance_scheduler/screenshots/vehicles-response.png)

