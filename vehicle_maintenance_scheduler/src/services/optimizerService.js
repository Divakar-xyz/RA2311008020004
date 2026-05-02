const { Log } = require("../../../logging_middleware/log");

function optimizeTasks(vehicles, capacity) {
  Log("backend", "info", "service", "Optimization started");

  if (!Number.isFinite(capacity) || capacity <= 0) {
    Log("backend", "warn", "service", "Invalid mechanic hours capacity");
    return { selectedTasks: [], totalImpact: 0, totalDuration: 0 };
  }

  const validVehicles = vehicles.filter((vehicle) => {
    return (
      vehicle &&
      Number.isFinite(Number(vehicle.Duration)) &&
      Number.isFinite(Number(vehicle.Impact)) &&
      Number(vehicle.Duration) > 0
    );
  });

  const taskCount = validVehicles.length;
  const maxHours = Math.floor(capacity);
  const dp = Array.from({ length: taskCount + 1 }, () =>
    Array(maxHours + 1).fill(0)
  );

  for (let i = 1; i <= taskCount; i += 1) {
    const vehicle = validVehicles[i - 1];
    const duration = Math.ceil(Number(vehicle.Duration));
    const impact = Number(vehicle.Impact);

    for (let hours = 0; hours <= maxHours; hours += 1) {
      if (duration <= hours) {
        const includeTask = impact + dp[i - 1][hours - duration];
        const skipTask = dp[i - 1][hours];
        dp[i][hours] = Math.max(includeTask, skipTask);
      } else {
        dp[i][hours] = dp[i - 1][hours];
      }
    }
  }

  const selectedTasks = [];
  let remainingHours = maxHours;

  for (let i = taskCount; i > 0; i -= 1) {
    if (dp[i][remainingHours] !== dp[i - 1][remainingHours]) {
      const vehicle = validVehicles[i - 1];
      selectedTasks.push(vehicle);
      remainingHours -= Math.ceil(Number(vehicle.Duration));
    }
  }

  selectedTasks.reverse();

  const totalDuration = selectedTasks.reduce(
    (sum, task) => sum + Number(task.Duration),
    0
  );
  const totalImpact = selectedTasks.reduce(
    (sum, task) => sum + Number(task.Impact),
    0
  );

  Log("backend", "info", "service", "Optimization result computed");
  return { selectedTasks, totalImpact, totalDuration };
}

module.exports = { optimizeTasks };
