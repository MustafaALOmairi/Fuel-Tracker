let currentLang = "en";

// Elements
const equipmentSelect = document.getElementById("equipment");
const operatorSelect = document.getElementById("operator");
const litersInput = document.getElementById("liters");
const notesInput = document.getElementById("notes");
const resultBox = document.getElementById("result");
const langBtn = document.getElementById("langBtn");

// Load initial data
loadEquipment();
loadOperators();
applyLanguage();

// -------------------- API Calls --------------------
async function loadEquipment() {
  const res = await fetch("/api/equipment");
  const data = await res.json();

  equipmentSelect.innerHTML = "";
  data.forEach(e => {
    const opt = document.createElement("option");
    opt.value = e.name;
    opt.textContent = `${e.name} (${e.type})`;
    equipmentSelect.appendChild(opt);
  });
}

async function loadOperators() {
  const res = await fetch("/api/operators");
  const data = await res.json();

  operatorSelect.innerHTML = "";
  data.forEach(o => {
    const opt = document.createElement("option");
    opt.value = o.name;
    opt.textContent = o.name;
    operatorSelect.appendChild(opt);
  });
}

// -------------------- Save Fuel --------------------
async function saveFuel() {
  const payload = {
    equipment: equipmentSelect.value,
    operator: operatorSelect.value,
    liters: litersInput.value,
    notes: notesInput.value
  };

  const res = await fetch("/api/fuel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  resultBox.textContent = JSON.stringify(data, null, 2);

  litersInput.value = "";
  notesInput.value = "";
}

// -------------------- Language Toggle --------------------
langBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  langBtn.textContent = currentLang === "en" ? "AR" : "EN";
  applyLanguage();
});

function applyLanguage() {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });

  document.body.dir = currentLang === "ar" ? "rtl" : "ltr";
}
