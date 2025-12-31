let currentLang = "en";
const langBtn = document.getElementById("langBtn");
const resultBox = document.getElementById("result");

applyLanguage();

// -------------------- Equipment --------------------
async function addEquipment() {
  const payload = {
    name: document.getElementById("eqName").value,
    type: document.getElementById("eqType").value,
    number: document.getElementById("eqNumber").value
  };

  const res = await fetch("/api/equipment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  resultBox.textContent = JSON.stringify(await res.json(), null, 2);
  clearInputs();
}

// -------------------- Operator --------------------
async function addOperator() {
  const payload = {
    name: document.getElementById("opName").value
  };

  const res = await fetch("/api/operators", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  resultBox.textContent = JSON.stringify(await res.json(), null, 2);
  clearInputs();
}

// -------------------- Language --------------------
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

function clearInputs() {
  document.querySelectorAll("input").forEach(i => i.value = "");
}
