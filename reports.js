let currentLang = "en";
const langBtn = document.getElementById("langBtn");

const totalLitersEl = document.getElementById("totalLiters");
const totalEntriesEl = document.getElementById("totalEntries");
const tableBody = document.querySelector("#fuelTable tbody");

loadReports();
applyLanguage();

// -------------------- Load Reports --------------------
async function loadReports() {
  const res = await fetch("/api/fuel");
  const data = await res.json();

  let totalLiters = 0;
  tableBody.innerHTML = "";

  data.forEach(item => {
    totalLiters += Number(item.liters);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${new Date(item.date).toLocaleDateString()}</td>
      <td>${item.equipment}</td>
      <td>${item.operator}</td>
      <td>${item.liters}</td>
      <td>${item.notes || ""}</td>
    `;
    tableBody.appendChild(tr);
  });

  totalLitersEl.textContent = totalLiters.toFixed(2);
  totalEntriesEl.textContent = data.length;
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
