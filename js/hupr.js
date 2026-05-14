// js/hupr.js — HUPR compensation calculator
// Standalone page: no estimation state required.
// Load order: i18n.js → jsPDF CDN → hupr.js

(function () {
  "use strict";

  // ── Constants ────────────────────────────────────────────────────────────────
  const STORAGE_LANG          = "feeToolLanguage";
  const STORAGE_SERVICE_INFO  = "huprServiceInfo";
  const STORAGE_COMPENSATIONS = "huprCompensations";
  const STORAGE_WORKLOAD      = "huprWorkload";

  // ── Language & formatting ────────────────────────────────────────────────────
  let currentLang = localStorage.getItem(STORAGE_LANG) || "fr";
  if (!window.translations[currentLang]) currentLang = "fr";

  let moneyFormatter = buildFormatter(currentLang);

  function buildFormatter(lang) {
    return new Intl.NumberFormat(lang === "fr" ? "fr-CA" : "en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    });
  }

  function money(value) {
    return moneyFormatter.format(value);
  }

  function t() {
    return window.translations[currentLang];
  }

  function setTextById(id, text) {
    const node = document.getElementById(id);
    if (node) node.textContent = text;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // ── DOM refs ─────────────────────────────────────────────────────────────────
  const langFrBtn        = document.getElementById("lang-fr");
  const langEnBtn        = document.getElementById("lang-en");
  const languageSwitcher = document.getElementById("language-switcher");

  const offerTitle            = document.getElementById("offer-title");
  const offerInfoTitle        = document.getElementById("offer-info-title");
  const offerNumberLabel      = document.getElementById("offer-number-label");
  const offerNumberInput      = document.getElementById("offer-number");
  const offerRecipientLabel   = document.getElementById("offer-recipient-label");
  const offerRecipientInput   = document.getElementById("offer-recipient");
  const offerEventLabel       = document.getElementById("offer-event-label");
  const offerEventInput       = document.getElementById("offer-event");
  const offerProviderLabel    = document.getElementById("offer-provider-label");
  const offerProviderInput    = document.getElementById("offer-provider");

  const projectTitle          = document.getElementById("project-title");
  const projectDescriptionLabel = document.getElementById("project-description-label");
  const projectDescriptionInput = document.getElementById("project-description");
  const projectTasksTitle     = document.getElementById("project-tasks-title");
  const projectTasksHint      = document.getElementById("project-tasks-hint");
  const projectAddTaskBtn     = document.getElementById("project-add-task-btn");
  const projectTasksItems     = document.getElementById("project-tasks-items");

  const workloadTitle        = document.getElementById("workload-title");
  const workloadHint         = document.getElementById("workload-hint");
  const workloadAddPersonBtn = document.getElementById("workload-add-person-btn");
  const workloadPeople       = document.getElementById("workload-people");
  const workloadTotalOutput  = document.getElementById("workload-total-output");

  const compTotalOutput = document.getElementById("comp-total-output");
  const generateBtn     = document.getElementById("generate-btn");

  const compResourcesYes            = document.querySelector('input[name="comp-resources-applies"][value="yes"]');
  const compResourcesNo             = document.querySelector('input[name="comp-resources-applies"][value="no"]');
  const compResourcesFields         = document.getElementById("comp-resources-fields");
  const compResourcesItems          = document.getElementById("comp-resources-items");
  const compResourcesAddMaterialBtn = document.getElementById("comp-resources-add-material-btn");
  const compResourcesAddHumanBtn    = document.getElementById("comp-resources-add-human-btn");

  const compAdminYes     = document.querySelector('input[name="comp-admin-applies"][value="yes"]');
  const compAdminNo      = document.querySelector('input[name="comp-admin-applies"][value="no"]');
  const compAdminFields  = document.getElementById("comp-admin-fields");
  const compAdminDetails = document.getElementById("comp-admin-details");
  const compAdminAmount  = document.getElementById("comp-admin-amount");

  const transportLongEnabled  = document.getElementById("transport-long-enabled");
  const transportShortEnabled = document.getElementById("transport-short-enabled");
  const transportTaxiEnabled  = document.getElementById("transport-taxi-enabled");
  const transportCarEnabled   = document.getElementById("transport-car-enabled");
  const transportLongFields   = document.getElementById("transport-long-fields");
  const transportShortFields  = document.getElementById("transport-short-fields");
  const transportTaxiFields   = document.getElementById("transport-taxi-fields");
  const transportCarFields    = document.getElementById("transport-car-fields");

  const transportLongClientYes   = document.querySelector('input[name="transport-long-client"][value="yes"]');
  const transportLongClientNo    = document.querySelector('input[name="transport-long-client"][value="no"]');
  const transportLongReimbWrap   = document.getElementById("transport-long-reimb-wrap");
  const transportLongReimbYes    = document.querySelector('input[name="transport-long-reimb"][value="yes"]');
  const transportLongReimbNo     = document.querySelector('input[name="transport-long-reimb"][value="no"]');
  const transportLongDetails     = document.getElementById("transport-long-details");
  const transportLongAmountWrap  = document.getElementById("transport-long-amount-wrap");
  const transportLongAmount      = document.getElementById("transport-long-amount");

  const transportShortReimbYes   = document.querySelector('input[name="transport-short-reimb"][value="yes"]');
  const transportShortReimbNo    = document.querySelector('input[name="transport-short-reimb"][value="no"]');
  const transportShortDetails    = document.getElementById("transport-short-details");
  const transportShortAmountWrap = document.getElementById("transport-short-amount-wrap");
  const transportShortAmount     = document.getElementById("transport-short-amount");

  const transportTaxiReimbYes    = document.querySelector('input[name="transport-taxi-reimb"][value="yes"]');
  const transportTaxiReimbNo     = document.querySelector('input[name="transport-taxi-reimb"][value="no"]');
  const transportTaxiDetails     = document.getElementById("transport-taxi-details");
  const transportTaxiAmountWrap  = document.getElementById("transport-taxi-amount-wrap");
  const transportTaxiAmount      = document.getElementById("transport-taxi-amount");

  const transportCarAmountWrap  = document.getElementById("transport-car-amount-wrap");
  const transportCarDistance    = document.getElementById("transport-car-distance");
  const transportCarRateWrap    = document.getElementById("transport-car-rate-wrap");
  const transportCarRate        = document.getElementById("transport-car-rate");
  const transportCarTotalOutput = document.getElementById("transport-car-total-output");

  const transportMaterialEnabled    = document.getElementById("transport-material-enabled");
  const transportMaterialFields     = document.getElementById("transport-material-fields");
  const transportMaterialClientYes  = document.querySelector('input[name="transport-material-client"][value="yes"]');
  const transportMaterialClientNo   = document.querySelector('input[name="transport-material-client"][value="no"]');
  const transportMaterialReimbWrap  = document.getElementById("transport-material-reimb-wrap");
  const transportMaterialReimbYes   = document.querySelector('input[name="transport-material-reimb"][value="yes"]');
  const transportMaterialReimbNo    = document.querySelector('input[name="transport-material-reimb"][value="no"]');
  const transportMaterialDetails    = document.getElementById("transport-material-details");
  const transportMaterialAmountWrap = document.getElementById("transport-material-amount-wrap");
  const transportMaterialAmount     = document.getElementById("transport-material-amount");

  const lodgingExpensesYes = document.querySelector('input[name="lodging-expenses"][value="yes"]');
  const lodgingExpensesNo  = document.querySelector('input[name="lodging-expenses"][value="no"]');
  const lodgingClientWrap  = document.getElementById("lodging-client-wrap");
  const lodgingClientYes   = document.querySelector('input[name="lodging-client"][value="yes"]');
  const lodgingClientNo    = document.querySelector('input[name="lodging-client"][value="no"]');
  const lodgingDetailsWrap = document.getElementById("lodging-details-wrap");
  const lodgingDetails     = document.getElementById("lodging-details");
  const lodgingReimbWrap   = document.getElementById("lodging-reimb-wrap");
  const lodgingReimbYes    = document.querySelector('input[name="lodging-reimb"][value="yes"]');
  const lodgingReimbNo     = document.querySelector('input[name="lodging-reimb"][value="no"]');
  const lodgingAmountWrap  = document.getElementById("lodging-amount-wrap");
  const lodgingAmount      = document.getElementById("lodging-amount");

  const mealsExpensesYes   = document.querySelector('input[name="meals-expenses"][value="yes"]');
  const mealsExpensesNo    = document.querySelector('input[name="meals-expenses"][value="no"]');
  const mealsZoneSelect    = document.getElementById("meals-zone");
  const mealsWrap          = document.getElementById("meals-wrap");
  const mealBreakfastQty   = document.getElementById("meal-breakfast-qty");
  const mealBreakfastUnitOutput  = document.getElementById("meal-breakfast-unit");
  const mealBreakfastTotal = document.getElementById("meal-breakfast-total");
  const mealLunchQty       = document.getElementById("meal-lunch-qty");
  const mealLunchUnitOutput      = document.getElementById("meal-lunch-unit");
  const mealLunchTotal     = document.getElementById("meal-lunch-total");
  const mealDinnerQty      = document.getElementById("meal-dinner-qty");
  const mealDinnerUnitOutput     = document.getElementById("meal-dinner-unit");
  const mealDinnerTotal    = document.getElementById("meal-dinner-total");
  const mealGrandTotal     = document.getElementById("meal-grand-total");

  // ── Service info state ────────────────────────────────────────────────────────
  function createProjectTaskId() {
    return `project-task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function getProjectTaskDefaults() {
    return { id: createProjectTaskId(), title: "", description: "" };
  }

  function sanitizeProjectTask(task) {
    if (!task || typeof task !== "object") return getProjectTaskDefaults();
    return {
      id: typeof task.id === "string" && task.id.trim() ? task.id : createProjectTaskId(),
      title: typeof task.title === "string" ? task.title : "",
      description: typeof task.description === "string" ? task.description : "",
    };
  }

  function loadServiceInfoState() {
    const defaults = { offerNumber: "", recipient: "", eventName: "", provider: "", projectDescription: "", projectTasks: [] };
    try {
      const raw = localStorage.getItem(STORAGE_SERVICE_INFO);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return {
        offerNumber: typeof parsed.offerNumber === "string" ? parsed.offerNumber : "",
        recipient:   typeof parsed.recipient   === "string" ? parsed.recipient   : "",
        eventName:   typeof parsed.eventName   === "string" ? parsed.eventName   : "",
        provider:    typeof parsed.provider    === "string" ? parsed.provider    : "",
        projectDescription: typeof parsed.projectDescription === "string"
          ? parsed.projectDescription
          : typeof parsed.description === "string" ? parsed.description : "",
        projectTasks: Array.isArray(parsed.projectTasks) ? parsed.projectTasks.map(sanitizeProjectTask) : [],
      };
    } catch (_) { return defaults; }
  }

  function saveServiceInfoState() {
    localStorage.setItem(STORAGE_SERVICE_INFO, JSON.stringify(serviceInfoState));
  }

  function syncServiceInfoForm() {
    offerNumberInput.value      = serviceInfoState.offerNumber;
    offerRecipientInput.value   = serviceInfoState.recipient;
    offerEventInput.value       = serviceInfoState.eventName;
    offerProviderInput.value    = serviceInfoState.provider;
    projectDescriptionInput.value = serviceInfoState.projectDescription;
  }

  function getProjectTaskById(taskId) {
    return (serviceInfoState.projectTasks || []).find((task) => task.id === taskId) || null;
  }

  function syncWorkloadTaskSelections() {
    const validIds = new Set((serviceInfoState.projectTasks || []).map((task) => task.id));
    for (const person of workloadState.people) {
      for (const task of person.tasks) {
        if (!validIds.has(task.selectedProjectTaskId)) task.selectedProjectTaskId = "";
      }
    }
  }

  function renderProjectTasks() {
    const tt = t();
    const tasks = serviceInfoState.projectTasks || [];
    if (!tasks.length) {
      projectTasksItems.innerHTML = `<p class="project-task-empty">${tt.offer.projectTaskEmpty}</p>`;
      return;
    }

    projectTasksItems.innerHTML = tasks.map((task, index) => `
      <article class="project-task-item" data-project-task-id="${task.id}">
        <div class="task-head">
          <strong>${tt.offer.projectTaskCardTitle} ${index + 1}</strong>
          <button type="button" class="btn-resource-remove" data-project-task-remove="${task.id}">${tt.offer.projectTaskRemoveBtn}</button>
        </div>
        <div class="project-task-fields">
          <label>
            <span>${tt.offer.projectTaskTitleLabel}</span>
            <input type="text" value="${escapeHtml(task.title)}" placeholder="${tt.offer.projectTaskTitlePlaceholder}" data-project-task-field="title" data-project-task-id="${task.id}" />
          </label>
          <label>
            <span>${tt.offer.projectTaskDescriptionLabel}</span>
            <textarea data-project-task-field="description" data-project-task-id="${task.id}" placeholder="${tt.offer.projectTaskDescriptionPlaceholder}">${escapeHtml(task.description)}</textarea>
          </label>
        </div>
      </article>
    `).join("");
  }

  function sanitizeMealsZone(value) {
    return value === "bc" || value === "on" ? value : "qc";
  }

  function getMealRatesTable() {
    const fallback = {
      qc: { breakfast: 18, lunch: 24, dinner: 32 },
      bc: { breakfast: 22, lunch: 29, dinner: 39 },
      on: { breakfast: 20, lunch: 27, dinner: 36 },
    };
    return window.mealUnitRates && typeof window.mealUnitRates === "object"
      ? window.mealUnitRates
      : fallback;
  }

  function getMealUnitRatesForZone(zone) {
    const rates = getMealRatesTable();
    const key = sanitizeMealsZone(zone);
    const row = rates[key] || rates.qc;
    return {
      breakfast: Number.isFinite(Number(row?.breakfast)) ? Math.max(0, Number(row.breakfast)) : 0,
      lunch: Number.isFinite(Number(row?.lunch)) ? Math.max(0, Number(row.lunch)) : 0,
      dinner: Number.isFinite(Number(row?.dinner)) ? Math.max(0, Number(row.dinner)) : 0,
    };
  }

  function applyMealsUnitRatesFromZone() {
    const zone = sanitizeMealsZone(compensationState?.travel?.meals?.zone);
    compensationState.travel.meals.zone = zone;
    const units = getMealUnitRatesForZone(zone);
    compensationState.travel.meals.breakfast.unit = units.breakfast;
    compensationState.travel.meals.lunch.unit = units.lunch;
    compensationState.travel.meals.dinner.unit = units.dinner;
    mealBreakfastUnitOutput.textContent = money(units.breakfast);
    mealLunchUnitOutput.textContent = money(units.lunch);
    mealDinnerUnitOutput.textContent = money(units.dinner);
  }

  function getMealsZoneLabel(zone, comp) {
    if (zone === "bc") return comp.mealsZoneBc;
    if (zone === "on") return comp.mealsZoneOn;
    return comp.mealsZoneQc;
  }

  let serviceInfoState = loadServiceInfoState();

  // ── Workload rates & state ──────────────────────────────────────────────────
  function getRatesTable() {
    const fallback = {
      maitrise: { min: 65, max: 95 },
      phd: { min: 80, max: 120 },
      oiq: { min: 90, max: 140 },
    };
    return window.hourlyRateBounds && typeof window.hourlyRateBounds === "object"
      ? window.hourlyRateBounds
      : fallback;
  }

  function getDegreeBounds(degreeKey) {
    const rates = getRatesTable();
    const key = Object.prototype.hasOwnProperty.call(rates, degreeKey) ? degreeKey : "maitrise";
    const row = rates[key] || rates.maitrise;
    const min = Number.isFinite(Number(row?.min)) ? Math.max(0, Number(row.min)) : 0;
    const maxBase = Number.isFinite(Number(row?.max)) ? Math.max(0, Number(row.max)) : min;
    const max = Math.max(min, maxBase);
    return { min, max, key };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getTaskDefaults(degreeKey = "maitrise") {
    const bounds = getDegreeBounds(degreeKey);
    return {
      degreeKey: bounds.key,
      selectedProjectTaskId: "",
      hours: 0,
      hourlyRate: bounds.min,
    };
  }

  function sanitizeTask(task) {
    const fallback = getTaskDefaults("maitrise");
    if (!task || typeof task !== "object") return fallback;
    const bounds = getDegreeBounds(task.degreeKey);
    const hours = Number.isFinite(Number(task.hours)) ? Math.max(0, Math.round(Number(task.hours))) : 0;
    const rateRaw = Number.isFinite(Number(task.hourlyRate)) ? Number(task.hourlyRate) : bounds.min;
    return {
      degreeKey: bounds.key,
      selectedProjectTaskId: typeof task.selectedProjectTaskId === "string" ? task.selectedProjectTaskId : "",
      hours,
      hourlyRate: clamp(Math.round(rateRaw), bounds.min, bounds.max),
    };
  }

  function sanitizePerson(person) {
    return {
      name: typeof person?.name === "string" ? person.name : "",
      tasks: Array.isArray(person?.tasks) ? person.tasks.map(sanitizeTask) : [],
    };
  }

  function loadWorkloadState() {
    const defaults = { people: [] };
    try {
      const raw = localStorage.getItem(STORAGE_WORKLOAD);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return {
        people: Array.isArray(parsed?.people) ? parsed.people.map(sanitizePerson) : [],
      };
    } catch (_) {
      return defaults;
    }
  }

  function saveWorkloadState() {
    localStorage.setItem(STORAGE_WORKLOAD, JSON.stringify(workloadState));
  }

  let workloadState = loadWorkloadState();

  function getTaskTotal(task) {
    return (Math.max(0, Number(task.hours) || 0) * Math.max(0, Number(task.hourlyRate) || 0));
  }

  function getWorkloadTotal() {
    return workloadState.people.reduce((sum, person) => {
      return sum + person.tasks.reduce((taskSum, task) => taskSum + getTaskTotal(task), 0);
    }, 0);
  }

  function getDegreeLabel(degreeKey, comp) {
    if (degreeKey === "phd") return comp.workloadDegreePhd;
    if (degreeKey === "oiq") return comp.workloadDegreeOiq;
    return comp.workloadDegreeMaitrise;
  }

  function renderWorkloadTotals() {
    workloadTotalOutput.textContent = money(getWorkloadTotal());
  }

  function updateSliderFill(slider) {
    if (!(slider instanceof HTMLInputElement)) return;
    const min = Number(slider.min || 0);
    const max = Number(slider.max || 0);
    const value = Number(slider.value || 0);
    const span = max - min;
    const pct = span > 0 ? ((value - min) / span) * 100 : 0;
    slider.style.setProperty("--slider-pct", `${Math.max(0, Math.min(100, pct))}%`);
  }

  function applyTaskRateVisualState(taskRow, task, bounds) {
    if (!(taskRow instanceof HTMLElement)) return;
    const slider = taskRow.querySelector('input[data-field="hourlyRate"].fee-slider');
    const manualInput = taskRow.querySelector('input[data-field="hourlyRateManual"].task-rate-manual');
    const isOutOfRange = task.hourlyRate < bounds.min || task.hourlyRate > bounds.max;
    const clampedValue = clamp(task.hourlyRate, bounds.min, bounds.max);

    if (slider instanceof HTMLInputElement) {
      slider.min = String(bounds.min);
      slider.max = String(bounds.max);
      slider.value = String(clampedValue);
      slider.classList.toggle("is-out-of-range", isOutOfRange);
      updateSliderFill(slider);
    }

    if (manualInput instanceof HTMLInputElement) {
      manualInput.value = String(task.hourlyRate);
      manualInput.classList.toggle("is-out-of-range", isOutOfRange);
    }

    const currentRate = taskRow.querySelector(".task-rate-current");
    if (currentRate instanceof HTMLElement) currentRate.classList.toggle("is-out-of-range", isOutOfRange);
  }

  function renderWorkloadPeople() {
    const comp = t().offer.compensation;
    const projectTasks = serviceInfoState.projectTasks || [];
    workloadPeople.innerHTML = workloadState.people.map((person, personIndex) => {
      const tasksMarkup = person.tasks.length
        ? person.tasks.map((task, taskIndex) => {
            const bounds = getDegreeBounds(task.degreeKey);
            const sliderRateValue = clamp(task.hourlyRate, bounds.min, bounds.max);
            const isRateOutOfRange = task.hourlyRate < bounds.min || task.hourlyRate > bounds.max;
            const taskTotal = getTaskTotal(task);
            const taskOptions = projectTasks.length
              ? [`<option value="">${comp.workloadTaskSelectPlaceholder}</option>`].concat(projectTasks.map((projectTask) => {
                  const selected = projectTask.id === task.selectedProjectTaskId ? "selected" : "";
                  return `<option value="${projectTask.id}" ${selected}>${escapeHtml(projectTask.title || comp.workloadTaskSelectPlaceholder)}</option>`;
                })).join("")
              : `<option value="" selected>${comp.workloadTaskSelectEmpty}</option>`;
            return `
              <article class="task-item" data-person-index="${personIndex}" data-task-index="${taskIndex}">
                <div class="task-head">
                  <button type="button" class="btn-resource-remove" data-action="remove-task" data-person-index="${personIndex}" data-task-index="${taskIndex}">${comp.workloadRemoveTaskBtn}</button>
                </div>
                <div class="task-fields">
                  <div class="task-grid">
                    <label class="task-field task-field-full">
                      <span>${comp.workloadTaskSelectLabel}</span>
                      <select data-field="selectedProjectTaskId" data-person-index="${personIndex}" data-task-index="${taskIndex}" ${projectTasks.length ? "" : "disabled"}>
                        ${taskOptions}
                      </select>
                    </label>
                    <label class="task-field">
                      <span>${comp.workloadDegreeLabel}</span>
                      <select data-field="degree" data-person-index="${personIndex}" data-task-index="${taskIndex}">
                        <option value="maitrise" ${task.degreeKey === "maitrise" ? "selected" : ""}>${comp.workloadDegreeMaitrise}</option>
                        <option value="phd" ${task.degreeKey === "phd" ? "selected" : ""}>${comp.workloadDegreePhd}</option>
                        <option value="oiq" ${task.degreeKey === "oiq" ? "selected" : ""}>${comp.workloadDegreeOiq}</option>
                      </select>
                    </label>
                    <label class="task-field">
                      <span>${comp.workloadHoursLabel}</span>
                      <input type="number" min="0" step="1" value="${task.hours}" data-field="hours" data-person-index="${personIndex}" data-task-index="${taskIndex}" />
                    </label>
                  </div>
                  <label class="task-field task-field-full">
                    <span>${comp.workloadRateLabel}</span>
                    <div class="task-rate-controls">
                      <input class="fee-slider ${isRateOutOfRange ? "is-out-of-range" : ""}" type="range" min="${bounds.min}" max="${bounds.max}" step="1" value="${sliderRateValue}" data-field="hourlyRate" data-person-index="${personIndex}" data-task-index="${taskIndex}" />
                      <input class="task-rate-manual ${isRateOutOfRange ? "is-out-of-range" : ""}" type="number" min="0" step="1" value="${task.hourlyRate}" aria-label="${escapeHtml(comp.workloadRateManualLabel)}" title="${escapeHtml(comp.workloadRateManualLabel)}" data-field="hourlyRateManual" data-person-index="${personIndex}" data-task-index="${taskIndex}" />
                    </div>
                    <div class="task-rate-range"><span>${money(bounds.min)}</span><span>${money(bounds.max)}</span></div>
                    <p class="task-rate-current ${isRateOutOfRange ? "is-out-of-range" : ""}">${comp.workloadRateCurrentLabel} <strong>${money(task.hourlyRate)}</strong></p>
                  </label>
                  <p class="task-total-line">${comp.workloadTaskTotalLabel}: <strong>${money(taskTotal)}</strong></p>
                </div>
              </article>
            `;
          }).join("")
        : `<p class="task-empty">${comp.workloadNoTask}</p>`;

      return `
        <article class="person-card" data-person-index="${personIndex}">
          <div class="person-head">
            <button type="button" class="btn-resource-remove" data-action="remove-person" data-person-index="${personIndex}">${comp.workloadRemovePersonBtn}</button>
          </div>
          <label class="person-name">
            <span>${comp.workloadPersonLabel}</span>
            <input type="text" value="${escapeHtml(person.name)}" placeholder="${comp.workloadPersonPlaceholder}" data-field="personName" data-person-index="${personIndex}" />
          </label>
          <div class="person-tasks">${tasksMarkup}</div>
          <button type="button" class="btn-resource-add" data-action="add-task" data-person-index="${personIndex}">${comp.workloadAddTaskBtn}</button>
        </article>
      `;
    }).join("");

    for (const taskRow of workloadPeople.querySelectorAll(".task-item")) {
      if (!(taskRow instanceof HTMLElement)) continue;
      const personIndex = Number(taskRow.getAttribute("data-person-index"));
      const taskIndex = Number(taskRow.getAttribute("data-task-index"));
      const person = workloadState.people[personIndex];
      const task = person?.tasks?.[taskIndex];
      if (!task) continue;
      applyTaskRateVisualState(taskRow, task, getDegreeBounds(task.degreeKey));
    }
  }

  function updateWorkloadTaskRowOutputs(target, task, bounds = getDegreeBounds(task.degreeKey)) {
    const taskRow = target.closest(".task-item");
    if (!(taskRow instanceof HTMLElement)) return;
    const rateStrong = taskRow.querySelector(".task-rate-current strong");
    if (rateStrong) rateStrong.textContent = money(task.hourlyRate);
    const totalStrong = taskRow.querySelector(".task-total-line strong");
    if (totalStrong) totalStrong.textContent = money(getTaskTotal(task));
    applyTaskRateVisualState(taskRow, task, bounds);
  }

  workloadAddPersonBtn.addEventListener("click", () => {
    workloadState.people.push({ name: "", tasks: [getTaskDefaults("maitrise")] });
    saveWorkloadState();
    renderWorkloadPeople();
    renderWorkloadTotals();
  });

  projectAddTaskBtn.addEventListener("click", () => {
    serviceInfoState.projectTasks.push(getProjectTaskDefaults());
    saveServiceInfoState();
    renderProjectTasks();
    syncWorkloadTaskSelections();
    saveWorkloadState();
    renderWorkloadPeople();
  });

  projectTasksItems.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const taskId = target.getAttribute("data-project-task-remove");
    if (!taskId) return;
    serviceInfoState.projectTasks = (serviceInfoState.projectTasks || []).filter((task) => task.id !== taskId);
    syncWorkloadTaskSelections();
    saveServiceInfoState();
    saveWorkloadState();
    renderProjectTasks();
    renderWorkloadPeople();
  });

  projectTasksItems.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const taskId = target.getAttribute("data-project-task-id");
    const field = target.getAttribute("data-project-task-field");
    if (!taskId || !field) return;
    const task = getProjectTaskById(taskId);
    if (!task) return;
    if (field === "title" && target instanceof HTMLInputElement) task.title = target.value.trim();
    if (field === "description" && target instanceof HTMLTextAreaElement) task.description = target.value.trim();
    saveServiceInfoState();
    renderWorkloadPeople();
  });

  workloadPeople.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.getAttribute("data-action");
    if (!action) return;
    const personIndex = Number(target.getAttribute("data-person-index"));
    if (!Number.isInteger(personIndex) || personIndex < 0 || personIndex >= workloadState.people.length) return;

    if (action === "remove-person") {
      workloadState.people.splice(personIndex, 1);
      saveWorkloadState();
      renderWorkloadPeople();
      renderWorkloadTotals();
      return;
    }

    if (action === "add-task") {
      workloadState.people[personIndex].tasks.push(getTaskDefaults("maitrise"));
      saveWorkloadState();
      renderWorkloadPeople();
      renderWorkloadTotals();
      return;
    }

    if (action === "remove-task") {
      const taskIndex = Number(target.getAttribute("data-task-index"));
      const tasks = workloadState.people[personIndex].tasks;
      if (!Number.isInteger(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) return;
      tasks.splice(taskIndex, 1);
      saveWorkloadState();
      renderWorkloadPeople();
      renderWorkloadTotals();
    }
  });

  workloadPeople.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const field = target.getAttribute("data-field");
    if (!field) return;
    const personIndex = Number(target.getAttribute("data-person-index"));
    if (!Number.isInteger(personIndex) || personIndex < 0 || personIndex >= workloadState.people.length) return;

    if (field === "personName" && target instanceof HTMLInputElement) {
      workloadState.people[personIndex].name = target.value;
      saveWorkloadState();
      return;
    }

    const taskIndex = Number(target.getAttribute("data-task-index"));
    const tasks = workloadState.people[personIndex].tasks;
    if (!Number.isInteger(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) return;
    const task = tasks[taskIndex];

    if (field === "hours" && target instanceof HTMLInputElement) {
      task.hours = Math.max(0, Math.round(Number(target.value) || 0));
      saveWorkloadState();
      renderWorkloadTotals();
      updateWorkloadTaskRowOutputs(target, task, getDegreeBounds(task.degreeKey));
      return;
    }
    if ((field === "hourlyRate" || field === "hourlyRateManual") && target instanceof HTMLInputElement) {
      task.hourlyRate = Math.max(0, Math.round(Number(target.value) || 0));
      const bounds = getDegreeBounds(task.degreeKey);
      saveWorkloadState();
      renderWorkloadTotals();
      updateWorkloadTaskRowOutputs(target, task, bounds);
      return;
    }
  });

  workloadPeople.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    const field = target.getAttribute("data-field");
    const personIndex = Number(target.getAttribute("data-person-index"));
    const taskIndex = Number(target.getAttribute("data-task-index"));
    if (!Number.isInteger(personIndex) || personIndex < 0 || personIndex >= workloadState.people.length) return;
    const tasks = workloadState.people[personIndex].tasks;
    if (!Number.isInteger(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) return;
    const task = tasks[taskIndex];
    if (field === "degree") {
      const bounds = getDegreeBounds(target.value);
      task.degreeKey = bounds.key;
    }
    if (field === "selectedProjectTaskId") task.selectedProjectTaskId = target.value;
    saveWorkloadState();
    renderWorkloadPeople();
    renderWorkloadTotals();
  });

  // ── Resource helpers ──────────────────────────────────────────────────────────
  function normalizeResourceKind(value) {
    return value === "human" ? "human" : "material";
  }

  function getResourceItemDefaults(kind) {
    return { kind, details: "", amount: 0, clientProvides: "yes", reimbursed: "yes" };
  }

  function sanitizeResourceItem(item) {
    if (!item || typeof item !== "object") return getResourceItemDefaults("material");
    const kind   = normalizeResourceKind(item.kind);
    const amount = Number.isFinite(Number(item.amount)) ? Math.max(0, Number(item.amount)) : 0;
    const hasFlowState = item.clientProvides === "yes" || item.clientProvides === "no"
                      || item.reimbursed === "yes"     || item.reimbursed === "no";
    const flowFallback = !hasFlowState && amount > 0 ? "no" : "yes";
    return {
      kind,
      details:        typeof item.details === "string" ? item.details : "",
      amount,
      clientProvides: item.clientProvides === "no"  ? "no"  : item.clientProvides === "yes" ? "yes" : flowFallback,
      reimbursed:     item.reimbursed     === "no"  ? "no"  : item.reimbursed     === "yes" ? "yes" : flowFallback,
    };
  }

  function resourceNeedsReimbursement(item) { return item.clientProvides !== "yes"; }
  function resourceHasCharge(item)          { return resourceNeedsReimbursement(item) && item.reimbursed !== "yes"; }

  // ── Compensation state ────────────────────────────────────────────────────────
  function loadCompensationState() {
    const defaults = {
      resources: { applies: "no", items: [] },
      admin: { applies: "no", details: "", amount: 0 },
      travel: {
        transport: {
          long:     { enabled: false, clientCovers: "no", reimbursed: "no", details: "", amount: 0 },
          short:    { enabled: false, reimbursed: "no", details: "", amount: 0 },
          taxi:     { enabled: false, reimbursed: "no", details: "", amount: 0 },
          car:      { enabled: false, distanceKm: 0, centsPerKm: 0, amount: 0 },
          material: { enabled: false, clientCovers: "no", reimbursed: "no", details: "", amount: 0 },
        },
        lodging: { hasExpenses: "no", clientCovers: "yes", reimbursed: "yes", details: "", amount: 0 },
        meals: {
          hasExpenses: "no",
          zone: "qc",
          breakfast: { qty: 0, unit: 0 },
          lunch:     { qty: 0, unit: 0 },
          dinner:    { qty: 0, unit: 0 },
        },
      },
    };

    try {
      const raw = localStorage.getItem(STORAGE_COMPENSATIONS);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);

      const parsedResourceItems = Array.isArray(parsed?.resources?.items)
        ? parsed.resources.items.map(sanitizeResourceItem) : [];
      const legacyHasResourceValues =
        typeof parsed?.resources?.details === "string"
        || Number.isFinite(Number(parsed?.resources?.amount));
      const migratedResourceItems = parsedResourceItems.length
        ? parsedResourceItems
        : legacyHasResourceValues
          ? [{ kind: "material",
               details: typeof parsed?.resources?.details === "string" ? parsed.resources.details : "",
               amount:  Number.isFinite(Number(parsed?.resources?.amount)) ? Math.max(0, Number(parsed.resources.amount)) : 0,
             }]
          : [];

      return {
        resources: {
          applies: parsed?.resources?.applies === "yes" ? "yes" : "no",
          items: migratedResourceItems,
        },
        admin: {
          applies: parsed?.admin?.applies === "yes" ? "yes" : "no",
          details: typeof parsed?.admin?.details === "string" ? parsed.admin.details : "",
          amount:  Number.isFinite(Number(parsed?.admin?.amount)) ? Math.max(0, Number(parsed.admin.amount)) : 0,
        },
        travel: {
          transport: {
            long: {
              enabled:     !!parsed?.travel?.transport?.long?.enabled,
              clientCovers: parsed?.travel?.transport?.long?.clientCovers === "yes" ? "yes" : "no",
              reimbursed:   parsed?.travel?.transport?.long?.reimbursed   === "yes" ? "yes" : "no",
              details: typeof parsed?.travel?.transport?.long?.details === "string" ? parsed.travel.transport.long.details : "",
              amount:  Number.isFinite(Number(parsed?.travel?.transport?.long?.amount)) ? Math.max(0, Number(parsed.travel.transport.long.amount)) : 0,
            },
            short: {
              enabled:    !!parsed?.travel?.transport?.short?.enabled,
              reimbursed:  parsed?.travel?.transport?.short?.reimbursed === "yes" ? "yes" : "no",
              details: typeof parsed?.travel?.transport?.short?.details === "string" ? parsed.travel.transport.short.details : "",
              amount:  Number.isFinite(Number(parsed?.travel?.transport?.short?.amount)) ? Math.max(0, Number(parsed.travel.transport.short.amount)) : 0,
            },
            taxi: {
              enabled:    !!parsed?.travel?.transport?.taxi?.enabled,
              reimbursed:  parsed?.travel?.transport?.taxi?.reimbursed === "yes" ? "yes" : "no",
              details: typeof parsed?.travel?.transport?.taxi?.details === "string" ? parsed.travel.transport.taxi.details : "",
              amount:  Number.isFinite(Number(parsed?.travel?.transport?.taxi?.amount)) ? Math.max(0, Number(parsed.travel.transport.taxi.amount)) : 0,
            },
            car: {
              enabled:    !!parsed?.travel?.transport?.car?.enabled,
              distanceKm: Number.isFinite(Number(parsed?.travel?.transport?.car?.distanceKm)) ? Math.max(0, Number(parsed.travel.transport.car.distanceKm)) : 0,
              centsPerKm: Number.isFinite(Number(parsed?.travel?.transport?.car?.centsPerKm)) ? Math.max(0, Number(parsed.travel.transport.car.centsPerKm)) : 0,
              amount:     Number.isFinite(Number(parsed?.travel?.transport?.car?.amount))     ? Math.max(0, Number(parsed.travel.transport.car.amount))     : 0,
            },
            material: {
              enabled:     !!parsed?.travel?.transport?.material?.enabled,
              clientCovers: parsed?.travel?.transport?.material?.clientCovers === "yes" ? "yes" : "no",
              reimbursed:   parsed?.travel?.transport?.material?.reimbursed   === "yes" ? "yes" : "no",
              details: typeof parsed?.travel?.transport?.material?.details === "string" ? parsed.travel.transport.material.details : "",
              amount:  Number.isFinite(Number(parsed?.travel?.transport?.material?.amount)) ? Math.max(0, Number(parsed.travel.transport.material.amount)) : 0,
            },
          },
          lodging: {
            hasExpenses:  parsed?.travel?.lodging?.hasExpenses  === "yes" ? "yes" : "no",
            clientCovers: parsed?.travel?.lodging?.clientCovers === "yes" ? "yes" : "no",
            reimbursed:   parsed?.travel?.lodging?.reimbursed   === "yes" ? "yes" : "no",
            details: typeof parsed?.travel?.lodging?.details === "string" ? parsed.travel.lodging.details : "",
            amount:  Number.isFinite(Number(parsed?.travel?.lodging?.amount)) ? Math.max(0, Number(parsed.travel.lodging.amount)) : 0,
          },
          meals: {
            hasExpenses: parsed?.travel?.meals?.hasExpenses === "yes" ? "yes" : "no",
            zone: sanitizeMealsZone(parsed?.travel?.meals?.zone),
            breakfast: {
              qty:  Number.isFinite(Number(parsed?.travel?.meals?.breakfast?.qty))  ? Math.max(0, Number(parsed.travel.meals.breakfast.qty))  : 0,
              unit: Number.isFinite(Number(parsed?.travel?.meals?.breakfast?.unit)) ? Math.max(0, Number(parsed.travel.meals.breakfast.unit)) : 0,
            },
            lunch: {
              qty:  Number.isFinite(Number(parsed?.travel?.meals?.lunch?.qty))  ? Math.max(0, Number(parsed.travel.meals.lunch.qty))  : 0,
              unit: Number.isFinite(Number(parsed?.travel?.meals?.lunch?.unit)) ? Math.max(0, Number(parsed.travel.meals.lunch.unit)) : 0,
            },
            dinner: {
              qty:  Number.isFinite(Number(parsed?.travel?.meals?.dinner?.qty))  ? Math.max(0, Number(parsed.travel.meals.dinner.qty))  : 0,
              unit: Number.isFinite(Number(parsed?.travel?.meals?.dinner?.unit)) ? Math.max(0, Number(parsed.travel.meals.dinner.unit)) : 0,
            },
          },
        },
      };
    } catch (_) { return defaults; }
  }

  function saveCompensationState() {
    localStorage.setItem(STORAGE_COMPENSATIONS, JSON.stringify(compensationState));
  }

  let compensationState = loadCompensationState();
  applyMealsUnitRatesFromZone();

  // ── Render resource items ─────────────────────────────────────────────────────
  function renderResourcesItems() {
    const comp  = t().offer.compensation;
    const items = compensationState.resources.items || [];

    compResourcesItems.innerHTML = items.map((item, index) => {
      const typeLabel      = item.kind === "human" ? comp.resourcesHumanLabel           : comp.resourcesMaterialLabel;
      const clientQuestion = item.kind === "human" ? comp.resourcesHumanClientQuestion  : comp.resourcesMaterialClientQuestion;
      const reimbQuestion  = item.kind === "human" ? comp.resourcesHumanReimbQuestion   : comp.resourcesMaterialReimbQuestion;
      const amountQuestion = item.kind === "human" ? comp.resourcesHumanAmountQuestion  : comp.resourcesMaterialAmountQuestion;
      const clientName = `resource-${item.kind}-client-${index}`;
      const reimbName  = `resource-${item.kind}-reimb-${index}`;
      const reimbVisible  = resourceNeedsReimbursement(item);
      const amountVisible = resourceHasCharge(item);

      return `
        <article class="resource-item" data-resource-index="${index}">
          <div class="resource-item-head">
            <strong>${typeLabel}</strong>
            <button type="button" class="btn-resource-remove" data-resource-remove="${index}">${comp.resourcesRemoveBtn}</button>
          </div>
          <label>
            <span>${t().offer.detailsLabel}</span>
            <textarea data-resource-field="details" data-resource-index="${index}">${item.details}</textarea>
          </label>
          <div class="yesno-row resource-yesno-row">
            <span>${clientQuestion}</span>
            <label><input type="radio" name="${clientName}" value="yes" data-resource-field="clientProvides" data-resource-index="${index}" ${item.clientProvides === "yes" ? "checked" : ""} /> ${t().offer.yes}</label>
            <label><input type="radio" name="${clientName}" value="no"  data-resource-field="clientProvides" data-resource-index="${index}" ${item.clientProvides !== "yes" ? "checked" : ""} /> ${t().offer.no}</label>
          </div>
          <div class="yesno-row resource-yesno-row" ${reimbVisible ? "" : "hidden"}>
            <span>${reimbQuestion}</span>
            <label><input type="radio" name="${reimbName}" value="yes" data-resource-field="reimbursed" data-resource-index="${index}" ${item.reimbursed === "yes" ? "checked" : ""} /> ${t().offer.yes}</label>
            <label><input type="radio" name="${reimbName}" value="no"  data-resource-field="reimbursed" data-resource-index="${index}" ${item.reimbursed !== "yes" ? "checked" : ""} /> ${t().offer.no}</label>
          </div>
          <label ${amountVisible ? "" : "hidden"}>
            <span>${amountQuestion}</span>
            <input type="number" min="0" step="1" value="${item.amount}" data-resource-field="amount" data-resource-index="${index}" />
          </label>
        </article>
      `;
    }).join("");
  }

  // ── Sync form from state ──────────────────────────────────────────────────────
  function syncCompensationForm() {
    compResourcesYes.checked = compensationState.resources.applies === "yes";
    compResourcesNo.checked  = compensationState.resources.applies !== "yes";
    compensationState.resources.items = (compensationState.resources.items || []).map(sanitizeResourceItem);
    renderResourcesItems();

    compAdminYes.checked   = compensationState.admin.applies === "yes";
    compAdminNo.checked    = compensationState.admin.applies !== "yes";
    compAdminDetails.value = compensationState.admin.details;
    compAdminAmount.value  = compensationState.admin.amount;

    transportLongEnabled.checked  = compensationState.travel.transport.long.enabled;
    transportShortEnabled.checked = compensationState.travel.transport.short.enabled;
    transportTaxiEnabled.checked  = compensationState.travel.transport.taxi.enabled;
    transportCarEnabled.checked   = compensationState.travel.transport.car.enabled;

    transportLongClientYes.checked = compensationState.travel.transport.long.clientCovers === "yes";
    transportLongClientNo.checked  = compensationState.travel.transport.long.clientCovers !== "yes";
    transportLongReimbYes.checked  = compensationState.travel.transport.long.reimbursed === "yes";
    transportLongReimbNo.checked   = compensationState.travel.transport.long.reimbursed !== "yes";
    transportLongDetails.value     = compensationState.travel.transport.long.details;
    transportLongAmount.value      = compensationState.travel.transport.long.amount;

    transportShortReimbYes.checked = compensationState.travel.transport.short.reimbursed === "yes";
    transportShortReimbNo.checked  = compensationState.travel.transport.short.reimbursed !== "yes";
    transportShortDetails.value    = compensationState.travel.transport.short.details;
    transportShortAmount.value     = compensationState.travel.transport.short.amount;

    transportTaxiReimbYes.checked = compensationState.travel.transport.taxi.reimbursed === "yes";
    transportTaxiReimbNo.checked  = compensationState.travel.transport.taxi.reimbursed !== "yes";
    transportTaxiDetails.value    = compensationState.travel.transport.taxi.details;
    transportTaxiAmount.value     = compensationState.travel.transport.taxi.amount;

    transportCarDistance.value = compensationState.travel.transport.car.distanceKm;
    transportCarRate.value     = compensationState.travel.transport.car.centsPerKm;

    transportMaterialEnabled.checked   = compensationState.travel.transport.material.enabled;
    transportMaterialClientYes.checked = compensationState.travel.transport.material.clientCovers === "yes";
    transportMaterialClientNo.checked  = compensationState.travel.transport.material.clientCovers !== "yes";
    transportMaterialReimbYes.checked  = compensationState.travel.transport.material.reimbursed === "yes";
    transportMaterialReimbNo.checked   = compensationState.travel.transport.material.reimbursed !== "yes";
    transportMaterialDetails.value     = compensationState.travel.transport.material.details;
    transportMaterialAmount.value      = compensationState.travel.transport.material.amount;

    lodgingExpensesYes.checked = compensationState.travel.lodging.hasExpenses === "yes";
    lodgingExpensesNo.checked  = compensationState.travel.lodging.hasExpenses !== "yes";
    lodgingClientYes.checked   = compensationState.travel.lodging.clientCovers === "yes";
    lodgingClientNo.checked    = compensationState.travel.lodging.clientCovers !== "yes";
    lodgingDetails.value       = compensationState.travel.lodging.details;
    lodgingReimbYes.checked    = compensationState.travel.lodging.reimbursed === "yes";
    lodgingReimbNo.checked     = compensationState.travel.lodging.reimbursed !== "yes";
    lodgingAmount.value        = compensationState.travel.lodging.amount;

    mealsExpensesYes.checked = compensationState.travel.meals.hasExpenses === "yes";
    mealsExpensesNo.checked  = compensationState.travel.meals.hasExpenses !== "yes";
    mealsZoneSelect.value    = sanitizeMealsZone(compensationState.travel.meals.zone);
    mealBreakfastQty.value   = compensationState.travel.meals.breakfast.qty;
    mealLunchQty.value       = compensationState.travel.meals.lunch.qty;
    mealDinnerQty.value      = compensationState.travel.meals.dinner.qty;
    applyMealsUnitRatesFromZone();

    renderCompensationVisibility();
    renderCompensationTotals();
  }

  // ── Visibility ────────────────────────────────────────────────────────────────
  function renderCompensationVisibility() {
    compResourcesFields.hidden = compensationState.resources.applies !== "yes";
    compAdminFields.hidden     = compensationState.admin.applies !== "yes";

    transportLongFields.hidden  = !compensationState.travel.transport.long.enabled;
    transportShortFields.hidden = !compensationState.travel.transport.short.enabled;
    transportTaxiFields.hidden  = !compensationState.travel.transport.taxi.enabled;
    transportCarFields.hidden   = !compensationState.travel.transport.car.enabled;

    const longNeedsReimb = compensationState.travel.transport.long.enabled
      && compensationState.travel.transport.long.clientCovers !== "yes";
    transportLongReimbWrap.hidden  = !longNeedsReimb;
    transportLongAmountWrap.hidden = !(longNeedsReimb && compensationState.travel.transport.long.reimbursed !== "yes");

    transportShortAmountWrap.hidden = !(compensationState.travel.transport.short.enabled && compensationState.travel.transport.short.reimbursed !== "yes");
    transportTaxiAmountWrap.hidden  = !(compensationState.travel.transport.taxi.enabled  && compensationState.travel.transport.taxi.reimbursed  !== "yes");
    transportCarAmountWrap.hidden   = !compensationState.travel.transport.car.enabled;
    transportCarRateWrap.hidden     = !compensationState.travel.transport.car.enabled;

    transportMaterialFields.hidden = !compensationState.travel.transport.material.enabled;
    const materialNeedsReimb = compensationState.travel.transport.material.enabled
      && compensationState.travel.transport.material.clientCovers !== "yes";
    transportMaterialReimbWrap.hidden  = !materialNeedsReimb;
    transportMaterialAmountWrap.hidden = !(materialNeedsReimb && compensationState.travel.transport.material.reimbursed !== "yes");

    const lodgingHasExpenses = compensationState.travel.lodging.hasExpenses === "yes";
    lodgingClientWrap.hidden  = !lodgingHasExpenses;
    lodgingDetailsWrap.hidden = !lodgingHasExpenses;
    lodgingReimbWrap.hidden   = !(lodgingHasExpenses && compensationState.travel.lodging.clientCovers !== "yes");
    lodgingAmountWrap.hidden  = !(lodgingHasExpenses && compensationState.travel.lodging.clientCovers !== "yes" && compensationState.travel.lodging.reimbursed !== "yes");

    mealsWrap.hidden = compensationState.travel.meals.hasExpenses !== "yes";
  }

  // ── Totals ────────────────────────────────────────────────────────────────────
  function getCompensationTotal() {
    let total = 0;
    if (compensationState.resources.applies === "yes") {
      total += (compensationState.resources.items || []).reduce((sum, item) => {
        const amount = Number.isFinite(Number(item.amount)) ? Math.max(0, Number(item.amount)) : 0;
        return resourceHasCharge(item) ? sum + amount : sum;
      }, 0);
    }
    if (compensationState.admin.applies === "yes") total += compensationState.admin.amount;
    if (compensationState.travel.transport.long.enabled && compensationState.travel.transport.long.clientCovers !== "yes" && compensationState.travel.transport.long.reimbursed !== "yes") total += compensationState.travel.transport.long.amount;
    if (compensationState.travel.transport.short.enabled && compensationState.travel.transport.short.reimbursed !== "yes") total += compensationState.travel.transport.short.amount;
    if (compensationState.travel.transport.taxi.enabled  && compensationState.travel.transport.taxi.reimbursed  !== "yes") total += compensationState.travel.transport.taxi.amount;
    if (compensationState.travel.transport.car.enabled) total += compensationState.travel.transport.car.amount;
    if (compensationState.travel.transport.material.enabled && compensationState.travel.transport.material.clientCovers !== "yes" && compensationState.travel.transport.material.reimbursed !== "yes") total += compensationState.travel.transport.material.amount;
    if (compensationState.travel.lodging.hasExpenses === "yes" && compensationState.travel.lodging.clientCovers !== "yes" && compensationState.travel.lodging.reimbursed !== "yes") total += compensationState.travel.lodging.amount;
    if (compensationState.travel.meals.hasExpenses === "yes") {
      total += compensationState.travel.meals.breakfast.qty * compensationState.travel.meals.breakfast.unit
             + compensationState.travel.meals.lunch.qty     * compensationState.travel.meals.lunch.unit
             + compensationState.travel.meals.dinner.qty    * compensationState.travel.meals.dinner.unit;
    }
    return total;
  }

  function renderCompensationTotals() {
    const breakfast = compensationState.travel.meals.breakfast.qty * compensationState.travel.meals.breakfast.unit;
    const lunch     = compensationState.travel.meals.lunch.qty     * compensationState.travel.meals.lunch.unit;
    const dinner    = compensationState.travel.meals.dinner.qty    * compensationState.travel.meals.dinner.unit;
    mealBreakfastTotal.textContent = money(breakfast);
    mealLunchTotal.textContent     = money(lunch);
    mealDinnerTotal.textContent    = money(dinner);
    mealGrandTotal.textContent     = money(breakfast + lunch + dinner);

    const carTotal = compensationState.travel.transport.car.enabled
      ? (compensationState.travel.transport.car.distanceKm * compensationState.travel.transport.car.centsPerKm) / 100 : 0;
    transportCarTotalOutput.textContent = money(carTotal);
    compTotalOutput.textContent         = money(getCompensationTotal());
  }

  // ── Normalize form → state ────────────────────────────────────────────────────
  function normalizeCompensationStateFromForm() {
    compensationState.resources.applies = compResourcesYes.checked ? "yes" : "no";
    compensationState.admin.applies  = compAdminYes.checked ? "yes" : "no";
    compensationState.admin.details  = compAdminDetails.value.trim();
    compensationState.admin.amount   = Math.max(0, Number(compAdminAmount.value) || 0);

    compensationState.travel.transport.long.enabled     = transportLongEnabled.checked;
    compensationState.travel.transport.short.enabled    = transportShortEnabled.checked;
    compensationState.travel.transport.taxi.enabled     = transportTaxiEnabled.checked;
    compensationState.travel.transport.car.enabled      = transportCarEnabled.checked;
    compensationState.travel.transport.material.enabled = transportMaterialEnabled.checked;

    compensationState.travel.transport.long.clientCovers = transportLongClientYes.checked ? "yes" : "no";
    compensationState.travel.transport.long.reimbursed   = transportLongReimbYes.checked  ? "yes" : "no";
    compensationState.travel.transport.long.details      = transportLongDetails.value.trim();
    compensationState.travel.transport.long.amount       = Math.max(0, Number(transportLongAmount.value) || 0);

    compensationState.travel.transport.short.reimbursed = transportShortReimbYes.checked ? "yes" : "no";
    compensationState.travel.transport.short.details    = transportShortDetails.value.trim();
    compensationState.travel.transport.short.amount     = Math.max(0, Number(transportShortAmount.value) || 0);

    compensationState.travel.transport.taxi.reimbursed = transportTaxiReimbYes.checked ? "yes" : "no";
    compensationState.travel.transport.taxi.details    = transportTaxiDetails.value.trim();
    compensationState.travel.transport.taxi.amount     = Math.max(0, Number(transportTaxiAmount.value) || 0);

    compensationState.travel.transport.car.distanceKm = Math.max(0, Number(transportCarDistance.value) || 0);
    compensationState.travel.transport.car.centsPerKm = Math.max(0, Number(transportCarRate.value)     || 0);
    compensationState.travel.transport.car.amount     = (compensationState.travel.transport.car.distanceKm * compensationState.travel.transport.car.centsPerKm) / 100;

    compensationState.travel.transport.material.clientCovers = transportMaterialClientYes.checked ? "yes" : "no";
    compensationState.travel.transport.material.reimbursed   = transportMaterialReimbYes.checked  ? "yes" : "no";
    compensationState.travel.transport.material.details      = transportMaterialDetails.value.trim();
    compensationState.travel.transport.material.amount       = Math.max(0, Number(transportMaterialAmount.value) || 0);

    compensationState.travel.lodging.hasExpenses  = lodgingExpensesYes.checked ? "yes" : "no";
    compensationState.travel.lodging.clientCovers = lodgingClientYes.checked   ? "yes" : "no";
    compensationState.travel.lodging.details      = lodgingDetails.value.trim();
    compensationState.travel.lodging.reimbursed   = lodgingReimbYes.checked    ? "yes" : "no";
    compensationState.travel.lodging.amount       = Math.max(0, Number(lodgingAmount.value) || 0);

    compensationState.travel.meals.hasExpenses       = mealsExpensesYes.checked ? "yes" : "no";
    compensationState.travel.meals.zone           = sanitizeMealsZone(mealsZoneSelect.value);
    compensationState.travel.meals.breakfast.qty  = Math.max(0, Number(mealBreakfastQty.value)  || 0);
    compensationState.travel.meals.lunch.qty      = Math.max(0, Number(mealLunchQty.value)      || 0);
    compensationState.travel.meals.dinner.qty     = Math.max(0, Number(mealDinnerQty.value)     || 0);
    applyMealsUnitRatesFromZone();
  }

  function onCompensationFormChange() {
    normalizeCompensationStateFromForm();
    saveCompensationState();
    renderCompensationVisibility();
    renderCompensationTotals();
  }

  // ── Resource item events ──────────────────────────────────────────────────────
  compResourcesAddMaterialBtn.addEventListener("click", () => addResourceItem("material"));
  compResourcesAddHumanBtn.addEventListener("click",    () => addResourceItem("human"));

  function addResourceItem(kind) {
    compensationState.resources.items.push(getResourceItemDefaults(normalizeResourceKind(kind)));
    saveCompensationState();
    renderResourcesItems();
    renderCompensationTotals();
  }

  compResourcesItems.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const removeIndex = target.getAttribute("data-resource-remove");
    if (removeIndex === null) return;
    const index = Number(removeIndex);
    if (!Number.isInteger(index) || index < 0 || index >= compensationState.resources.items.length) return;
    compensationState.resources.items.splice(index, 1);
    saveCompensationState();
    renderResourcesItems();
    renderCompensationTotals();
  });

  compResourcesItems.addEventListener("input", (event) => {
    const target   = event.target;
    if (!(target instanceof HTMLElement)) return;
    const indexRaw = target.getAttribute("data-resource-index");
    const field    = target.getAttribute("data-resource-field");
    const index    = Number(indexRaw);
    if (!Number.isInteger(index) || index < 0 || index >= compensationState.resources.items.length) return;
    if (!field) return;
    if (field === "details" && target instanceof HTMLTextAreaElement) compensationState.resources.items[index].details = target.value.trim();
    if (field === "amount"  && target instanceof HTMLInputElement)    compensationState.resources.items[index].amount  = Math.max(0, Number(target.value) || 0);
    saveCompensationState();
    renderCompensationTotals();
  });

  compResourcesItems.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    const indexRaw = target.getAttribute("data-resource-index");
    const field    = target.getAttribute("data-resource-field");
    const index    = Number(indexRaw);
    if (!Number.isInteger(index) || index < 0 || index >= compensationState.resources.items.length) return;
    if (!field) return;
    const item = compensationState.resources.items[index];
    if (!item) return;
    if (field === "clientProvides") item.clientProvides = target.value === "yes" ? "yes" : "no";
    if (field === "reimbursed")     item.reimbursed     = target.value === "yes" ? "yes" : "no";
    saveCompensationState();
    renderResourcesItems();
    renderCompensationTotals();
  });

  // ── Wire all compensation inputs ──────────────────────────────────────────────
  const compInputs = [
    compResourcesYes, compResourcesNo,
    compAdminYes, compAdminNo, compAdminDetails, compAdminAmount,
    transportLongEnabled, transportShortEnabled, transportTaxiEnabled, transportCarEnabled,
    transportLongClientYes, transportLongClientNo, transportLongReimbYes, transportLongReimbNo, transportLongDetails, transportLongAmount,
    transportShortReimbYes, transportShortReimbNo, transportShortDetails, transportShortAmount,
    transportTaxiReimbYes, transportTaxiReimbNo, transportTaxiDetails, transportTaxiAmount,
    transportCarDistance, transportCarRate,
    transportMaterialEnabled, transportMaterialClientYes, transportMaterialClientNo, transportMaterialReimbYes, transportMaterialReimbNo, transportMaterialDetails, transportMaterialAmount,
    lodgingExpensesYes, lodgingExpensesNo, lodgingClientYes, lodgingClientNo, lodgingDetails, lodgingReimbYes, lodgingReimbNo, lodgingAmount,
    mealsExpensesYes, mealsExpensesNo, mealsZoneSelect, mealBreakfastQty, mealLunchQty, mealDinnerQty,
  ];

  for (const input of compInputs) {
    if (!input) continue;
    input.addEventListener("input",  onCompensationFormChange);
    input.addEventListener("change", onCompensationFormChange);
  }

  // ── Help bubbles ──────────────────────────────────────────────────────────────
  function initHelpBubbles() {
    for (const btn of document.querySelectorAll(".help")) {
      if (btn.dataset.helpBound === "true") continue;
      const targetId = btn.getAttribute("data-help");
      const bubble   = document.getElementById(targetId);
      if (!bubble) continue;
      btn.dataset.helpBound = "true";
      btn.addEventListener("mouseenter", () => bubble.classList.add("active"));
      btn.addEventListener("mouseleave", () => bubble.classList.remove("active"));
      btn.addEventListener("focus",      () => bubble.classList.add("active"));
      btn.addEventListener("blur",       () => bubble.classList.remove("active"));
      btn.addEventListener("click",      () => bubble.classList.toggle("active"));
    }
  }

  // ── Language switching ────────────────────────────────────────────────────────
  function updateLanguageButtons() {
    langFrBtn.classList.toggle("active", currentLang === "fr");
    langEnBtn.classList.toggle("active", currentLang === "en");
  }

  function setLanguage(lang) {
    if (!window.translations[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_LANG, lang);
    moneyFormatter = buildFormatter(lang);
    updateLanguageButtons();
    applyTranslations();
    renderWorkloadTotals();
    renderCompensationTotals();
  }

  langFrBtn.addEventListener("click", () => setLanguage("fr"));
  langEnBtn.addEventListener("click", () => setLanguage("en"));

  // ── Service info events ───────────────────────────────────────────────────────
  for (const input of [offerNumberInput, offerRecipientInput, offerEventInput, offerProviderInput, projectDescriptionInput]) {
    input.addEventListener("input", () => {
      serviceInfoState = {
        offerNumber: offerNumberInput.value.trim(),
        recipient:   offerRecipientInput.value.trim(),
        eventName:   offerEventInput.value.trim(),
        provider:    offerProviderInput.value.trim(),
        projectDescription: projectDescriptionInput.value.trim(),
        projectTasks: serviceInfoState.projectTasks,
      };
      saveServiceInfoState();
    });
  }

  // ── Translations ──────────────────────────────────────────────────────────────
  function applyTranslations() {
    const tt   = t();
    const comp = tt.offer.compensation;

    document.documentElement.lang = tt.htmlLang;
    document.title = currentLang === "fr" ? "Calculateur HUPR" : "HUPR Calculator";
    languageSwitcher.setAttribute("aria-label", tt.languageSwitcherAria);

    offerTitle.textContent            = tt.offer.title;
    offerInfoTitle.textContent        = tt.offer.infoTitle;
    offerNumberLabel.textContent      = tt.offer.offerNumberLabel;
    offerNumberInput.placeholder      = tt.offer.offerNumberPlaceholder;
    offerRecipientLabel.textContent   = tt.offer.recipientLabel;
    offerRecipientInput.placeholder   = tt.offer.recipientPlaceholder;
    offerEventLabel.textContent       = tt.offer.eventLabel;
    offerEventInput.placeholder       = tt.offer.eventPlaceholder;
    offerProviderLabel.textContent    = tt.offer.providerLabel;
    offerProviderInput.placeholder    = tt.offer.providerPlaceholder;
    projectTitle.textContent          = tt.offer.projectTitle;
    projectDescriptionLabel.textContent = tt.offer.projectDescriptionLabel;
    projectDescriptionInput.placeholder = tt.offer.projectDescriptionPlaceholder;
    projectTasksTitle.textContent     = tt.offer.projectTasksTitle;
    projectTasksHint.textContent      = tt.offer.projectTasksHint;
    projectAddTaskBtn.textContent     = tt.offer.projectAddTaskBtn;
    renderProjectTasks();

    workloadTitle.textContent = comp.workloadTitle;
    workloadHint.textContent = comp.workloadHint;
    setTextById("workload-add-person-btn", comp.workloadAddPersonBtn);
    setTextById("workload-total-line-label", comp.workloadSectionTotalLabel);
    syncWorkloadTaskSelections();
    renderWorkloadPeople();

    setTextById("comp-title", comp.title);
    setTextById("comp-hint",  comp.hint);
    setTextById("comp-resources-title-text",       comp.resourcesTitle);
    setTextById("help-comp-resources",             comp.resourcesHelpText);
    document.getElementById("comp-resources-help-btn")?.setAttribute("aria-label", comp.resourcesHelpAria);
    setTextById("comp-resources-question",         comp.resourcesQuestion);
    setTextById("comp-resources-transport-note",   comp.resourcesTransportNote);
    setTextById("comp-resources-add-material-btn", comp.resourcesAddMaterialBtn);
    setTextById("comp-resources-add-human-btn",    comp.resourcesAddHumanBtn);
    setTextById("comp-resources-yes-label", tt.offer.yes);
    setTextById("comp-resources-no-label",  tt.offer.no);
    renderResourcesItems();

    setTextById("comp-admin-title-text",    comp.adminTitle);
    setTextById("comp-admin-question",      comp.adminQuestion);
    setTextById("help-comp-admin",          comp.adminHelpText);
    document.getElementById("comp-admin-help-btn")?.setAttribute("aria-label", comp.adminHelpAria);
    setTextById("comp-admin-yes-label",     tt.offer.yes);
    setTextById("comp-admin-no-label",      tt.offer.no);
    setTextById("comp-admin-details-label", tt.offer.detailsLabel);
    setTextById("comp-admin-amount-label",  comp.amountLabel);

    setTextById("comp-travel-title",  comp.travelTitle);
    setTextById("transport-title",    comp.transportTitle);
    setTextById("transport-question", comp.transportQuestion);
    setTextById("transport-long-label",     comp.transportLongLabel);
    setTextById("transport-short-label",    comp.transportShortLabel);
    setTextById("transport-taxi-label",     comp.transportTaxiLabel);
    setTextById("transport-car-label",      comp.transportCarLabel);
    setTextById("transport-material-label", comp.transportMaterialLabel);
    setTextById("transport-long-subtitle",     comp.transportLongSubtitle);
    setTextById("transport-short-subtitle",    comp.transportShortSubtitle);
    setTextById("transport-taxi-subtitle",     comp.transportTaxiSubtitle);
    setTextById("transport-car-subtitle",      comp.transportCarSubtitle);
    setTextById("transport-material-subtitle", comp.transportMaterialSubtitle);
    setTextById("transport-material-intro",    comp.transportMaterialIntro);

    setTextById("transport-long-client-question",   comp.clientCoversQuestion);
    setTextById("transport-long-client-yes-label",  tt.offer.yes);
    setTextById("transport-long-client-no-label",   tt.offer.no);
    setTextById("transport-long-reimb-question",    comp.reimbFactureQuestion);
    setTextById("transport-long-reimb-yes-label",   tt.offer.yes);
    setTextById("transport-long-reimb-no-label",    tt.offer.no);
    setTextById("transport-long-details-label",     comp.detailsFieldLabel);
    transportLongDetails.placeholder  = comp.transportLongDetailsPlaceholder;
    setTextById("transport-long-amount-label",      comp.chargeAmountQuestion);

    setTextById("transport-short-reimb-question",   comp.reimbFactureQuestion);
    setTextById("transport-short-reimb-yes-label",  tt.offer.yes);
    setTextById("transport-short-reimb-no-label",   tt.offer.no);
    setTextById("transport-short-details-label",    comp.detailsFieldLabel);
    transportShortDetails.placeholder = comp.transportShortDetailsPlaceholder;
    setTextById("transport-short-amount-label",     comp.chargeAmountQuestion);

    setTextById("transport-taxi-reimb-question",    comp.reimbFactureQuestion);
    setTextById("transport-taxi-reimb-yes-label",   tt.offer.yes);
    setTextById("transport-taxi-reimb-no-label",    tt.offer.no);
    setTextById("transport-taxi-details-label",     comp.detailsFieldLabel);
    transportTaxiDetails.placeholder  = comp.transportTaxiDetailsPlaceholder;
    setTextById("transport-taxi-amount-label",      comp.chargeAmountQuestion);

    setTextById("transport-car-distance-label", comp.carDistanceQuestion);
    setTextById("transport-car-rate-label",     comp.carRateQuestion);
    setTextById("transport-car-total-label",    comp.carTotalLabel);

    setTextById("transport-material-details-label",    comp.detailsFieldLabel);
    transportMaterialDetails.placeholder = comp.transportMaterialDetailsPlaceholder;
    setTextById("transport-material-client-question",  comp.clientCoversQuestion);
    setTextById("transport-material-client-yes-label", tt.offer.yes);
    setTextById("transport-material-client-no-label",  tt.offer.no);
    setTextById("transport-material-reimb-question",   comp.reimbFactureQuestion);
    setTextById("transport-material-reimb-yes-label",  tt.offer.yes);
    setTextById("transport-material-reimb-no-label",   tt.offer.no);
    setTextById("transport-material-amount-label",     comp.chargeAmountQuestion);

    setTextById("lodging-title",              comp.lodgingTitle);
    setTextById("lodging-expenses-question",  comp.lodgingExpensesQuestion);
    setTextById("lodging-expenses-yes-label", tt.offer.yes);
    setTextById("lodging-expenses-no-label",  tt.offer.no);
    setTextById("lodging-client-question",    comp.lodgingClientQuestion);
    setTextById("lodging-client-yes-label",   tt.offer.yes);
    setTextById("lodging-client-no-label",    tt.offer.no);
    setTextById("lodging-details-label",      comp.detailsFieldLabel);
    lodgingDetails.placeholder = comp.lodgingDetailsPlaceholder;
    setTextById("lodging-reimb-question",     comp.reimbNoteQuestion);
    setTextById("lodging-reimb-yes-label",    tt.offer.yes);
    setTextById("lodging-reimb-no-label",     tt.offer.no);
    setTextById("lodging-amount-label",       comp.lodgingAmountQuestion);

    setTextById("meals-title",              comp.mealsTitle);
    setTextById("meals-expenses-question",  comp.mealsExpensesQuestion);
    setTextById("meals-expenses-yes-label", tt.offer.yes);
    setTextById("meals-expenses-no-label",  tt.offer.no);
    setTextById("meals-zone-label",         comp.mealsZoneLabel);
    setTextById("meals-zone-qc",            comp.mealsZoneQc);
    setTextById("meals-zone-bc",            comp.mealsZoneBc);
    setTextById("meals-zone-on",            comp.mealsZoneOn);
    setTextById("meals-col-name",           comp.mealsColName);
    setTextById("meals-col-qty",            comp.mealsColQty);
    setTextById("meals-col-unit",           comp.mealsColUnit);
    setTextById("meals-col-total",          comp.mealsColTotal);
    setTextById("meal-breakfast-label",     comp.mealBreakfast);
    setTextById("meal-lunch-label",         comp.mealLunch);
    setTextById("meal-dinner-label",        comp.mealDinner);
    setTextById("meal-grand-total-label",   comp.mealsGrandTotalLabel);
    setTextById("comp-total-line-label",    comp.totalLineLabel);

    generateBtn.textContent = tt.offer.generateBtn;

    initHelpBubbles();
  }

  // ── PDF generation ────────────────────────────────────────────────────────────
  generateBtn.addEventListener("click", generatePDF);

  function appendDescription(baseText, description) {
    const clean = (description || "").trim();
    return clean ? `${baseText} (${clean})` : baseText;
  }

  function getWorkloadPdfBlocks() {
    const tt = t();
    const comp = tt.offer.compensation;
    const details = [];
    for (const person of workloadState.people) {
      const personName = (person.name || "").trim() || tt.offer.pdfNotProvided;
      details.push(`${comp.pdfWorkloadPersonLabel}: ${personName}`);
      if (!person.tasks.length) {
        details.push(`  - ${comp.workloadNoTask}`);
        continue;
      }
      for (const task of person.tasks) {
        const linkedTask = getProjectTaskById(task.selectedProjectTaskId);
        const taskName = linkedTask?.title?.trim() || tt.offer.pdfNotProvided;
        const taskTotal = getTaskTotal(task);
        details.push(
          `  - ${comp.pdfWorkloadTaskLabel}: ${taskName} | ${comp.pdfWorkloadHoursLabel}: ${task.hours} | ${comp.pdfWorkloadRateLabel}: ${money(task.hourlyRate)} | ${comp.pdfWorkloadTaskTotalLabel}: ${money(taskTotal)}`
        );
      }
    }
    return details;
  }

  function getProjectPdfBlocks() {
    const tt = t();
    return {
      description: (serviceInfoState.projectDescription || "").trim() || tt.offer.pdfNotProvided,
      tasks: (serviceInfoState.projectTasks || []).map((task) => {
        const title = (task.title || "").trim() || tt.offer.pdfNotProvided;
        const description = (task.description || "").trim() || tt.offer.pdfNotProvided;
        return { title, description };
      }),
    };
  }

  function getCompensationPdfBlocks() {
    const tt         = t();
    const details    = [];
    const conditions = [];
    const addDetail = (label, amount, description = "") => {
      const cleanDescription = (description || "").trim();
      details.push({
        item: label,
        description: cleanDescription,
        amount: Math.max(0, Number(amount) || 0),
      });
    };

    if (compensationState.resources.applies === "yes") {
      for (const item of compensationState.resources.items || []) {
        const typeLabel          = item.kind === "human" ? tt.offer.compensation.pdfResourcesHumanLabel    : tt.offer.compensation.pdfResourcesMaterialLabel;
        const clientProvidesLabel = item.kind === "human" ? tt.offer.compensation.pdfClientProvidesHuman   : tt.offer.compensation.pdfClientProvidesMaterial;
        const reimbursedLabel    = item.kind === "human" ? tt.offer.compensation.pdfReimbursedHuman        : tt.offer.compensation.pdfReimbursedMaterial;
        if (item.clientProvides === "yes") { conditions.push(appendDescription(clientProvidesLabel, item.details)); continue; }
        if (item.reimbursed     === "yes") { conditions.push(appendDescription(reimbursedLabel, item.details)); continue; }
        if ((item.amount || 0)  > 0)       { addDetail(`${tt.offer.compensation.pdfResourcesLabel} (${typeLabel})`, item.amount, item.details); continue; }
        if (item.details) conditions.push(appendDescription(`${tt.offer.compensation.pdfResourcesLabel} (${typeLabel}).`, item.details));
      }
    }

    if (compensationState.admin.applies === "yes" && compensationState.admin.amount > 0) addDetail(tt.offer.compensation.pdfAdminLabel, compensationState.admin.amount);

    const longDesc = compensationState.travel.transport.long.details;
    if (compensationState.travel.transport.long.enabled) {
      if (compensationState.travel.transport.long.clientCovers === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfClientCoversTransportLong, longDesc));
      else if (compensationState.travel.transport.long.reimbursed === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfReimbursedTransportLong, longDesc));
      else if (compensationState.travel.transport.long.amount > 0) addDetail(tt.offer.compensation.pdfTransportLongLabel, compensationState.travel.transport.long.amount, longDesc);
      else if (longDesc) conditions.push(appendDescription(`${tt.offer.compensation.pdfTransportLongLabel}.`, longDesc));
    }

    const shortDesc = compensationState.travel.transport.short.details;
    if (compensationState.travel.transport.short.enabled) {
      if (compensationState.travel.transport.short.reimbursed === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfReimbursedTransportShort, shortDesc));
      else if (compensationState.travel.transport.short.amount > 0) addDetail(tt.offer.compensation.pdfTransportShortLabel, compensationState.travel.transport.short.amount, shortDesc);
      else if (shortDesc) conditions.push(appendDescription(`${tt.offer.compensation.pdfTransportShortLabel}.`, shortDesc));
    }

    const taxiDesc = compensationState.travel.transport.taxi.details;
    if (compensationState.travel.transport.taxi.enabled) {
      if (compensationState.travel.transport.taxi.reimbursed === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfReimbursedTaxi, taxiDesc));
      else if (compensationState.travel.transport.taxi.amount > 0) addDetail(tt.offer.compensation.pdfTaxiLabel, compensationState.travel.transport.taxi.amount, taxiDesc);
      else if (taxiDesc) conditions.push(appendDescription(`${tt.offer.compensation.pdfTaxiLabel}.`, taxiDesc));
    }

    if (compensationState.travel.transport.car.enabled && compensationState.travel.transport.car.amount > 0) {
      addDetail(tt.offer.compensation.pdfCarLabel, compensationState.travel.transport.car.amount);
    }

    const materialDesc = compensationState.travel.transport.material.details;
    if (compensationState.travel.transport.material.enabled) {
      if (compensationState.travel.transport.material.clientCovers === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfClientCoversTransportMaterial, materialDesc));
      else if (compensationState.travel.transport.material.reimbursed === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfReimbursedTransportMaterial, materialDesc));
      else if (compensationState.travel.transport.material.amount > 0) addDetail(tt.offer.compensation.pdfTransportMaterialLabel, compensationState.travel.transport.material.amount, materialDesc);
      else if (materialDesc) conditions.push(appendDescription(`${tt.offer.compensation.pdfTransportMaterialLabel}.`, materialDesc));
    }

    const lodgingDesc = compensationState.travel.lodging.details;
    if (compensationState.travel.lodging.hasExpenses === "yes") {
      if (compensationState.travel.lodging.clientCovers === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfClientCoversLodging, lodgingDesc));
      else if (compensationState.travel.lodging.reimbursed === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfReimbursedLodging, lodgingDesc));
      else if (compensationState.travel.lodging.amount > 0) addDetail(tt.offer.compensation.pdfLodgingLabel, compensationState.travel.lodging.amount, lodgingDesc);
      else if (lodgingDesc) conditions.push(appendDescription(`${tt.offer.compensation.pdfLodgingLabel}.`, lodgingDesc));
    }

    if (compensationState.travel.meals.hasExpenses === "yes") {
      const mealsZoneLabel = getMealsZoneLabel(compensationState.travel.meals.zone, tt.offer.compensation);
      const mealsTotal = compensationState.travel.meals.breakfast.qty * compensationState.travel.meals.breakfast.unit
                       + compensationState.travel.meals.lunch.qty     * compensationState.travel.meals.lunch.unit
                       + compensationState.travel.meals.dinner.qty    * compensationState.travel.meals.dinner.unit;
      if (mealsTotal > 0) addDetail(`${tt.offer.compensation.pdfMealsLabel} (${tt.offer.compensation.pdfMealsZoneLabel}: ${mealsZoneLabel})`, mealsTotal);
    }

    return { details, conditions };
  }

  function generatePDF() {
    if (!window.jspdf) { console.error("jsPDF not loaded."); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const tt  = t();
    const now = new Date();
    const dateText = new Intl.DateTimeFormat(currentLang === "fr" ? "fr-CA" : "en-CA", { dateStyle: "long" }).format(now);

    const pageW    = 210;
    const margin   = 20;
    const contentW = pageW - margin * 2;
    let y = 0;

    // Header bar
    doc.setFillColor(18, 84, 90);
    doc.rect(0, 0, pageW, 14, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(tt.offer.pdfHeaderTitle || "HUPR - Service Offer", margin, 9.5);

    // Title
    y = 25;
    const pdfEventTitle = (serviceInfoState.eventName || "").trim() || tt.offer.pdfNotProvided;
    doc.setTextColor(18, 84, 90);
    doc.setFontSize(17);
    doc.text(pdfEventTitle, margin, y);

    const rightColX = pageW - margin;
    const rightColW = 86;
    const rightColTopY = 33;
    let rightY = rightColTopY;

    doc.setTextColor(30, 27, 22);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Date: ${dateText}`, rightColX, rightY, { align: "right" });

    rightY += 5;

    const infoRows = [
      { label: tt.offer.offerNumberLabel, value: serviceInfoState.offerNumber || tt.offer.pdfNotProvided },
      { label: tt.offer.recipientLabel,   value: serviceInfoState.recipient   || tt.offer.pdfNotProvided },
      { label: tt.offer.providerLabel,    value: serviceInfoState.provider    || tt.offer.pdfNotProvided },
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(30, 27, 22);
    for (const row of infoRows) {
      const wrapped = doc.splitTextToSize(`${row.label}: ${row.value}`, rightColW);
      if (rightY + wrapped.length * 4.2 > 260) { doc.addPage(); rightY = 20; }
      for (const line of wrapped) {
        doc.text(line, rightColX, rightY, { align: "right" });
        rightY += 4.2;
      }
      rightY += 0.6;
    }

    const projectPdf = getProjectPdfBlocks();
    y = Math.max(y + 8, rightY + 6);
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(18, 84, 90);
    doc.text(tt.offer.pdfProjectTitle, margin, y);

    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 27, 22);
    const projectDescriptionLines = doc.splitTextToSize(`${tt.offer.pdfProjectDescriptionLabel}: ${projectPdf.description}`, contentW);
    if (y + projectDescriptionLines.length * 5 > 280) { doc.addPage(); y = 20; }
    doc.text(projectDescriptionLines, margin, y);
    y += projectDescriptionLines.length * 5 + 2;

    const projectTaskRows = projectPdf.tasks.length ? projectPdf.tasks : [{ title: tt.offer.projectTaskEmpty, description: "" }];
    const projectTasksTitleLines = doc.splitTextToSize(`${tt.offer.pdfProjectTasksLabel}:`, contentW);
    if (y + projectTasksTitleLines.length * 5 > 280) { doc.addPage(); y = 20; }
    doc.text(projectTasksTitleLines, margin, y);
    y += projectTasksTitleLines.length * 5 + 1;

    for (let index = 0; index < projectTaskRows.length; index += 1) {
      const task = projectTaskRows[index];
      const cardX = margin;
      const cardW = contentW;
      const cardPadX = 2.5;
      const cardPadY = 2.3;
      const titleText = `${index + 1}. ${task.title}`;
      const titleLines = doc.splitTextToSize(titleText, cardW - cardPadX * 2);
      const descriptionLines = task.description
        ? doc.splitTextToSize(task.description, cardW - cardPadX * 2)
        : [];
      const cardLineH = 4.2;
      const cardH = (titleLines.length + descriptionLines.length) * cardLineH + cardPadY * 2 + (descriptionLines.length ? 1 : 0);

      if (y + cardH > 285) { doc.addPage(); y = 20; }

      doc.setFillColor(248, 251, 252);
      doc.setDrawColor(205, 216, 220);
      doc.roundedRect(cardX, y, cardW, cardH, 1.5, 1.5, "FD");

      let textY = y + cardPadY + 3.2;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(24, 88, 96);
      doc.text(titleLines, cardX + cardPadX, textY);
      textY += titleLines.length * cardLineH;

      if (descriptionLines.length) {
        textY += 1;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.6);
        doc.setTextColor(30, 27, 22);
        doc.text(descriptionLines, cardX + cardPadX, textY);
      }

      y += cardH + 2.2;
    }

    // Team workload table
    const workloadTotal = getWorkloadTotal();
    y += 7;
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(18, 84, 90);
    doc.text(tt.offer.compensation.pdfWorkloadTitle, margin, y);

    // Team workload details section (table)
    const workloadTableRows = [];
    for (const person of workloadState.people) {
      const personName = (person.name || "").trim() || tt.offer.pdfNotProvided;
      if (!person.tasks.length) {
        workloadTableRows.push({
          person: personName,
          task: tt.offer.compensation.workloadNoTask,
          hours: "-",
          rate: "-",
          total: "-",
        });
        continue;
      }

      for (const task of person.tasks) {
        const linkedTask = getProjectTaskById(task.selectedProjectTaskId);
        const taskName = linkedTask?.title?.trim() || tt.offer.pdfNotProvided;
        workloadTableRows.push({
          person: personName,
          task: taskName,
          hours: String(task.hours),
          rate: money(task.hourlyRate),
          total: money(getTaskTotal(task)),
        });
      }
    }

    y += 12;
    const tableCols = [34, 52, 16, 28, 40];
    const tableHeaders = [
      tt.offer.compensation.pdfWorkloadPersonLabel,
      tt.offer.compensation.pdfWorkloadTaskLabel,
      tt.offer.compensation.pdfWorkloadHoursLabel,
      tt.offer.compensation.pdfWorkloadRateLabel,
      tt.offer.compensation.pdfWorkloadTaskTotalLabel,
    ];
    const tablePadX = 1.4;
    const tablePadY = 1.2;
    const tableLineH = 3.8;

    function drawWorkloadHeader() {
      const headerHeight = 8.2;
      if (y + headerHeight > 285) {
        doc.addPage();
        y = 20;
      }

      let x = margin;
      doc.setFillColor(239, 245, 247);
      doc.setDrawColor(188, 203, 208);
      doc.rect(margin, y, contentW, headerHeight, "FD");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.2);
      doc.setTextColor(24, 88, 96);
      for (let i = 0; i < tableHeaders.length; i += 1) {
        const lines = doc.splitTextToSize(tableHeaders[i], tableCols[i] - tablePadX * 2);
        doc.text(lines, x + tablePadX, y + tablePadY + 3);
        x += tableCols[i];
      }
      y += headerHeight;
    }

    function drawWorkloadRow(row, zebraIndex) {
      const cells = [row.person, row.task, row.hours, row.rate, row.total];
      const wrappedCells = cells.map((value, idx) => doc.splitTextToSize(String(value), tableCols[idx] - tablePadX * 2));
      const maxLines = wrappedCells.reduce((max, lines) => Math.max(max, lines.length), 1);
      const rowHeight = Math.max(7.5, maxLines * tableLineH + tablePadY * 2);

      if (y + rowHeight > 285) {
        doc.addPage();
        y = 20;
        drawWorkloadHeader();
      }

      doc.setFillColor(zebraIndex % 2 === 0 ? 255 : 249);
      doc.setDrawColor(212, 222, 226);
      doc.rect(margin, y, contentW, rowHeight, "FD");

      let x = margin;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.3);
      doc.setTextColor(30, 27, 22);
      for (let i = 0; i < wrappedCells.length; i += 1) {
        doc.text(wrappedCells[i], x + tablePadX, y + tablePadY + 3);
        if (i < wrappedCells.length - 1) doc.line(x + tableCols[i], y, x + tableCols[i], y + rowHeight);
        x += tableCols[i];
      }

      y += rowHeight;
    }

    function drawWorkloadTotalRow() {
      const row = {
        person: "",
        task: tt.offer.compensation.pdfWorkloadSectionTotalLabel,
        hours: "",
        rate: "",
        total: money(workloadTotal),
      };
      const cells = [row.person, row.task, row.hours, row.rate, row.total];
      const wrappedCells = cells.map((value, idx) => doc.splitTextToSize(String(value), tableCols[idx] - tablePadX * 2));
      const maxLines = wrappedCells.reduce((max, lines) => Math.max(max, lines.length), 1);
      const rowHeight = Math.max(7.8, maxLines * tableLineH + tablePadY * 2);

      if (y + rowHeight > 285) {
        doc.addPage();
        y = 20;
        drawWorkloadHeader();
      }

      doc.setFillColor(252, 245, 237);
      doc.setDrawColor(200, 210, 210);
      doc.rect(margin, y, contentW, rowHeight, "FD");

      let x = margin;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.4);
      doc.setTextColor(160, 98, 26);
      for (let i = 0; i < wrappedCells.length; i += 1) {
        if (i === wrappedCells.length - 1) {
          doc.text(wrappedCells[i], x + tableCols[i] - tablePadX, y + tablePadY + 3, { align: "right" });
        } else {
          doc.text(wrappedCells[i], x + tablePadX, y + tablePadY + 3);
        }
        if (i < wrappedCells.length - 1) doc.line(x + tableCols[i], y, x + tableCols[i], y + rowHeight);
        x += tableCols[i];
      }

      y += rowHeight;
    }

    drawWorkloadHeader();
    if (!workloadTableRows.length) {
      drawWorkloadRow({ person: tt.offer.pdfNoDetails, task: "", hours: "", rate: "", total: "" }, 0);
    } else {
      for (let i = 0; i < workloadTableRows.length; i += 1) {
        drawWorkloadRow(workloadTableRows[i], i);
      }
    }
    drawWorkloadTotalRow();

    const pdfBlocks = getCompensationPdfBlocks();
    const hasCompensations = pdfBlocks.details.length > 0;
    const compTotal = hasCompensations ? getCompensationTotal() : 0;

    if (hasCompensations) {
      // Compensations recap table
      y += 7;
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(18, 84, 90);
      doc.text(tt.offer.compensation.title, margin, y);

      y += 6;
      const compTableCols = [122, 38];
      const compTableHeaders = [tt.offer.pdfItemCol, tt.offer.pdfAmountCol];
      const compRows = pdfBlocks.details.map((entry) => ({ item: entry.item, amount: money(entry.amount) }));
      const compPadX = 1.8;
      const compPadY = 1.3;
      const compLineH = 4;

      function drawCompHeader() {
        const headerH = 8;
        if (y + headerH > 285) {
          doc.addPage();
          y = 20;
        }

        doc.setFillColor(239, 245, 247);
        doc.setDrawColor(188, 203, 208);
        doc.rect(margin, y, contentW, headerH, "FD");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.4);
        doc.setTextColor(24, 88, 96);
        doc.text(compTableHeaders[0], margin + compPadX, y + compPadY + 3);
        doc.text(compTableHeaders[1], margin + compTableCols[0] + compTableCols[1] - compPadX, y + compPadY + 3, { align: "right" });
        y += headerH;
      }

      function drawCompRow(row, zebraIndex, isTotal = false) {
        const itemLines = doc.splitTextToSize(String(row.item), compTableCols[0] - compPadX * 2);
        const amountLines = doc.splitTextToSize(String(row.amount), compTableCols[1] - compPadX * 2);
        const maxLines = Math.max(itemLines.length, amountLines.length, 1);
        const rowH = Math.max(7.4, maxLines * compLineH + compPadY * 2);

        if (y + rowH > 285) {
          doc.addPage();
          y = 20;
          drawCompHeader();
        }

        if (isTotal) {
          doc.setFillColor(252, 245, 237);
          doc.setDrawColor(200, 210, 210);
        } else {
          doc.setFillColor(zebraIndex % 2 === 0 ? 255 : 249);
          doc.setDrawColor(212, 222, 226);
        }
        doc.rect(margin, y, contentW, rowH, "FD");
        doc.line(margin + compTableCols[0], y, margin + compTableCols[0], y + rowH);

        doc.setFont("helvetica", isTotal ? "bold" : "normal");
        doc.setFontSize(9.4);
        doc.setTextColor(isTotal ? 160 : 30, isTotal ? 98 : 27, isTotal ? 26 : 22);
        doc.text(itemLines, margin + compPadX, y + compPadY + 3);
        doc.text(amountLines, margin + compTableCols[0] + compTableCols[1] - compPadX, y + compPadY + 3, { align: "right" });

        y += rowH;
      }

      drawCompHeader();
      for (let i = 0; i < compRows.length; i += 1) {
        drawCompRow(compRows[i], i, false);
      }
      drawCompRow({ item: tt.offer.compensation.totalLineLabel, amount: money(compTotal) }, compRows.length, true);

      // Details section (descriptions only)
      const descriptionLines = pdfBlocks.details
        .filter((entry) => entry.description)
        .map((entry) => `${entry.item}: ${entry.description}`);

      y += 6;
      if (y > 280) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(18, 84, 90);
      doc.text(tt.offer.pdfDetailsTitle, margin, y);

      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(30, 27, 22);
      const detailsLines = descriptionLines.length ? descriptionLines : [tt.offer.pdfNoDetails];
      for (const item of detailsLines) {
        const wrapped = doc.splitTextToSize(`- ${item}`, contentW);
        if (y + wrapped.length * 5 > 285) { doc.addPage(); y = 20; }
        doc.text(wrapped, margin, y);
        y += wrapped.length * 5 + 2;
      }

      // Conditions section
      y += 4;
      if (y > 280) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(18, 84, 90);
      doc.text(tt.offer.compensation.pdfConditionsTitle, margin, y);

      y += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(30, 27, 22);
      const conditionLines = pdfBlocks.conditions.length ? pdfBlocks.conditions : [tt.offer.compensation.pdfNoConditions];
      for (const item of conditionLines) {
        const wrapped = doc.splitTextToSize(`- ${item}`, contentW);
        if (y + wrapped.length * 5 > 285) { doc.addPage(); y = 20; }
        doc.text(wrapped, margin, y);
        y += wrapped.length * 5 + 2;
      }
    }

    // Balance table (team + compensations)
    y += 8;
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(18, 84, 90);
    doc.text(tt.offer.pdfBalanceTitle || "Summary", margin, y);

    y += 6;
    const balanceCols = [122, 38];
    const balancePadX = 1.8;
    const balancePadY = 1.3;
    const balanceLineH = 4;
    const balanceRows = [
      { item: tt.offer.pdfBalanceTeamSubtotalLabel || tt.offer.compensation.pdfWorkloadSectionTotalLabel, amount: money(workloadTotal), isTotal: false },
      { item: tt.offer.pdfBalanceCompSubtotalLabel || tt.offer.compensation.totalLineLabel, amount: money(compTotal), isTotal: false },
      { item: tt.offer.pdfBalanceGrandTotalLabel || tt.offer.finalTotalLabel, amount: money(workloadTotal + compTotal), isTotal: true },
    ];

    const drawBalanceHeader = () => {
      const headerH = 8;
      if (y + headerH > 285) {
        doc.addPage();
        y = 20;
      }
      doc.setFillColor(239, 245, 247);
      doc.setDrawColor(188, 203, 208);
      doc.rect(margin, y, contentW, headerH, "FD");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.4);
      doc.setTextColor(24, 88, 96);
      doc.text(tt.offer.pdfItemCol, margin + balancePadX, y + balancePadY + 3);
      doc.text(tt.offer.pdfAmountCol, margin + balanceCols[0] + balanceCols[1] - balancePadX, y + balancePadY + 3, { align: "right" });
      y += headerH;
    };

    const drawBalanceRow = (row, index) => {
      const itemLines = doc.splitTextToSize(String(row.item), balanceCols[0] - balancePadX * 2);
      const amountLines = doc.splitTextToSize(String(row.amount), balanceCols[1] - balancePadX * 2);
      const maxLines = Math.max(itemLines.length, amountLines.length, 1);
      const rowH = Math.max(7.4, maxLines * balanceLineH + balancePadY * 2);

      if (y + rowH > 285) {
        doc.addPage();
        y = 20;
        drawBalanceHeader();
      }

      if (row.isTotal) {
        doc.setFillColor(252, 245, 237);
        doc.setDrawColor(200, 210, 210);
      } else {
        doc.setFillColor(index % 2 === 0 ? 255 : 249);
        doc.setDrawColor(212, 222, 226);
      }
      doc.rect(margin, y, contentW, rowH, "FD");
      doc.line(margin + balanceCols[0], y, margin + balanceCols[0], y + rowH);

      doc.setFont("helvetica", row.isTotal ? "bold" : "normal");
      doc.setFontSize(9.4);
      doc.setTextColor(row.isTotal ? 160 : 30, row.isTotal ? 98 : 27, row.isTotal ? 26 : 22);
      doc.text(itemLines, margin + balancePadX, y + balancePadY + 3);
      doc.text(amountLines, margin + balanceCols[0] + balanceCols[1] - balancePadX, y + balancePadY + 3, { align: "right" });

      y += rowH;
    };

    drawBalanceHeader();
    for (let i = 0; i < balanceRows.length; i += 1) drawBalanceRow(balanceRows[i], i);

    y += 3;
    const balanceFootnote = tt.offer.pdfBalanceFootnote
      || "Tout travail ou toute heure supplementaire non prevu dans cette offre de service sera facture.";
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.6);
    doc.setTextColor(120, 120, 120);
    const footnoteLines = doc.splitTextToSize(balanceFootnote, contentW);
    if (y + footnoteLines.length * 4.2 > 285) { doc.addPage(); y = 20; }
    doc.text(footnoteLines, margin, y);
    y += footnoteLines.length * 4.2;

    // Signatures
    y += 8;
    if (y > 245) { doc.addPage(); y = 24; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(18, 84, 90);
    doc.text(tt.offer.pdfSignatureTitle, margin, y);

    const sigTop   = y + 8;
    const gap      = 10;
    const sigWidth = (contentW - gap) / 2;
    const leftX    = margin;
    const rightX   = margin + sigWidth + gap;

    doc.setDrawColor(110, 110, 110);
    doc.setLineWidth(0.5);
    doc.line(leftX,  sigTop + 16, leftX  + sigWidth, sigTop + 16);
    doc.line(rightX, sigTop + 16, rightX + sigWidth, sigTop + 16);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(30, 27, 22);
    doc.text(tt.offer.pdfSignatureClientLabel, leftX,  sigTop + 22);
    doc.text(tt.offer.pdfSignatureArtistLabel, rightX, sigTop + 22);
    doc.setFontSize(8.5);
    doc.setTextColor(90, 90, 90);
    doc.text(tt.offer.signatureMeta, leftX,  sigTop + 27);
    doc.text(tt.offer.signatureMeta, rightX, sigTop + 27);

    doc.save("offre-de-service-hupr.pdf");
  }

  // ── Init ──────────────────────────────────────────────────────────────────────
  updateLanguageButtons();
  applyTranslations();
  syncServiceInfoForm();
  renderProjectTasks();
  renderWorkloadTotals();
  syncCompensationForm();
  initHelpBubbles();
})();
