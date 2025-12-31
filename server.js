const express = require("express");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Data paths
const dataDir = path.join(__dirname, "data");
const equipmentFile = path.join(dataDir, "equipment.json");
const operatorsFile = path.join(dataDir, "operators.json");
const fuelFile = path.join(dataDir, "fuel_entries.json");

// Ensure data files exist
fs.ensureDirSync(dataDir);
fs.ensureFileSync(equipmentFile);
fs.ensureFileSync(operatorsFile);
fs.ensureFileSync(fuelFile);

const readJSON = (file) => fs.readJsonSync(file, { throws: false }) || [];
const writeJSON = (file, data) => fs.writeJsonSync(file, data, { spaces: 2 });

// -------------------- Equipment --------------------
app.get("/api/equipment", (req, res) => {
  res.json(readJSON(equipmentFile));
});

app.post("/api/equipment", (req, res) => {
  const equipment = readJSON(equipmentFile);
  equipment.push({ id: Date.now(), ...req.body });
  writeJSON(equipmentFile, equipment);
  res.json({ success: true });
});

// -------------------- Operators --------------------
app.get("/api/operators", (req, res) => {
  res.json(readJSON(operatorsFile));
});

app.post("/api/operators", (req, res) => {
  const operators = readJSON(operatorsFile);
  operators.push({ id: Date.now(), ...req.body });
  writeJSON(operatorsFile, operators);
  res.json({ success: true });
});

// -------------------- Fuel Entries --------------------
app.get("/api/fuel", (req, res) => {
  res.json(readJSON(fuelFile));
});

app.post("/api/fuel", (req, res) => {
  const fuel = readJSON(fuelFile);
  fuel.push({
    id: Date.now(),
    date: new Date().toISOString(),
    ...req.body
  });
  writeJSON(fuelFile, fuel);
  res.json({ success: true });
});

// -------------------- Server --------------------
app.listen(PORT, () => {
  console.log(`Fuel Tracker running on port ${PORT}`);
});
