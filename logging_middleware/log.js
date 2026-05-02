function Log(stack, level, packageName, message) {
  const allowedStacks = ["backend"];
  const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
  const allowedPackages = ["controller", "service", "route", "utils"];

  const safeStack = allowedStacks.includes(stack) ? stack : "backend";
  const safeLevel = allowedLevels.includes(level) ? level : "info";
  const safePackage = allowedPackages.includes(packageName) ? packageName : "utils";
  const time = new Date().toISOString();

  process.stdout.write(
    `[${time}] [${safeStack}] [${safeLevel}] [${safePackage}] ${message}\n`
  );
}

module.exports = { Log };

