// js/hupr.js — HUPR compensation calculator
// Standalone page: no estimation state required.
// Load order: i18n.js → jsPDF CDN → hupr.js

(function () {
  "use strict";

  // ── Constants ────────────────────────────────────────────────────────────────
  const STORAGE_LANG          = "feeToolLanguage";
  const STORAGE_SERVICE_INFO  = "huprServiceInfo";
  const STORAGE_COMPENSATIONS = "huprCompensations";

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

  // ── DOM refs ─────────────────────────────────────────────────────────────────
  const langFrBtn        = document.getElementById("lang-fr");
  const langEnBtn        = document.getElementById("lang-en");
  const languageSwitcher = document.getElementById("language-switcher");

  const offerTitle            = document.getElementById("offer-title");
  const offerInfoTitle        = document.getElementById("offer-info-title");
  const offerRecipientLabel   = document.getElementById("offer-recipient-label");
  const offerRecipientInput   = document.getElementById("offer-recipient");
  const offerEventLabel       = document.getElementById("offer-event-label");
  const offerEventInput       = document.getElementById("offer-event");
  const offerProviderLabel    = document.getElementById("offer-provider-label");
  const offerProviderInput    = document.getElementById("offer-provider");
  const offerDescriptionLabel = document.getElementById("offer-description-label");
  const offerDescriptionInput = document.getElementById("offer-description");

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
  const mealsWrap          = document.getElementById("meals-wrap");
  const mealBreakfastQty   = document.getElementById("meal-breakfast-qty");
  const mealBreakfastUnit  = document.getElementById("meal-breakfast-unit");
  const mealBreakfastTotal = document.getElementById("meal-breakfast-total");
  const mealLunchQty       = document.getElementById("meal-lunch-qty");
  const mealLunchUnit      = document.getElementById("meal-lunch-unit");
  const mealLunchTotal     = document.getElementById("meal-lunch-total");
  const mealDinnerQty      = document.getElementById("meal-dinner-qty");
  const mealDinnerUnit     = document.getElementById("meal-dinner-unit");
  const mealDinnerTotal    = document.getElementById("meal-dinner-total");
  const mealGrandTotal     = document.getElementById("meal-grand-total");

  // ── Service info state ────────────────────────────────────────────────────────
  function loadServiceInfoState() {
    const defaults = { recipient: "", eventName: "", provider: "", description: "" };
    try {
      const raw = localStorage.getItem(STORAGE_SERVICE_INFO);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw);
      return {
        recipient:   typeof parsed.recipient   === "string" ? parsed.recipient   : "",
        eventName:   typeof parsed.eventName   === "string" ? parsed.eventName   : "",
        provider:    typeof parsed.provider    === "string" ? parsed.provider    : "",
        description: typeof parsed.description === "string" ? parsed.description : "",
      };
    } catch (_) { return defaults; }
  }

  function saveServiceInfoState() {
    localStorage.setItem(STORAGE_SERVICE_INFO, JSON.stringify(serviceInfoState));
  }

  function syncServiceInfoForm() {
    offerRecipientInput.value   = serviceInfoState.recipient;
    offerEventInput.value       = serviceInfoState.eventName;
    offerProviderInput.value    = serviceInfoState.provider;
    offerDescriptionInput.value = serviceInfoState.description;
  }

  let serviceInfoState = loadServiceInfoState();

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
    mealBreakfastQty.value   = compensationState.travel.meals.breakfast.qty;
    mealBreakfastUnit.value  = compensationState.travel.meals.breakfast.unit;
    mealLunchQty.value       = compensationState.travel.meals.lunch.qty;
    mealLunchUnit.value      = compensationState.travel.meals.lunch.unit;
    mealDinnerQty.value      = compensationState.travel.meals.dinner.qty;
    mealDinnerUnit.value     = compensationState.travel.meals.dinner.unit;

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
    compensationState.travel.meals.breakfast.qty  = Math.max(0, Number(mealBreakfastQty.value)  || 0);
    compensationState.travel.meals.breakfast.unit = Math.max(0, Number(mealBreakfastUnit.value) || 0);
    compensationState.travel.meals.lunch.qty      = Math.max(0, Number(mealLunchQty.value)      || 0);
    compensationState.travel.meals.lunch.unit     = Math.max(0, Number(mealLunchUnit.value)     || 0);
    compensationState.travel.meals.dinner.qty     = Math.max(0, Number(mealDinnerQty.value)     || 0);
    compensationState.travel.meals.dinner.unit    = Math.max(0, Number(mealDinnerUnit.value)    || 0);
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
    mealsExpensesYes, mealsExpensesNo, mealBreakfastQty, mealBreakfastUnit, mealLunchQty, mealLunchUnit, mealDinnerQty, mealDinnerUnit,
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
    renderCompensationTotals();
  }

  langFrBtn.addEventListener("click", () => setLanguage("fr"));
  langEnBtn.addEventListener("click", () => setLanguage("en"));

  // ── Service info events ───────────────────────────────────────────────────────
  for (const input of [offerRecipientInput, offerEventInput, offerProviderInput, offerDescriptionInput]) {
    input.addEventListener("input", () => {
      serviceInfoState = {
        recipient:   offerRecipientInput.value.trim(),
        eventName:   offerEventInput.value.trim(),
        provider:    offerProviderInput.value.trim(),
        description: offerDescriptionInput.value.trim(),
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
    offerRecipientLabel.textContent   = tt.offer.recipientLabel;
    offerRecipientInput.placeholder   = tt.offer.recipientPlaceholder;
    offerEventLabel.textContent       = tt.offer.eventLabel;
    offerEventInput.placeholder       = tt.offer.eventPlaceholder;
    offerProviderLabel.textContent    = tt.offer.providerLabel;
    offerProviderInput.placeholder    = tt.offer.providerPlaceholder;
    offerDescriptionLabel.textContent = tt.offer.descriptionLabel;
    offerDescriptionInput.placeholder = tt.offer.descriptionPlaceholder;

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

  function getCompensationPdfBlocks() {
    const tt         = t();
    const details    = [];
    const conditions = [];

    if (compensationState.resources.applies === "yes") {
      for (const item of compensationState.resources.items || []) {
        const typeLabel          = item.kind === "human" ? tt.offer.compensation.pdfResourcesHumanLabel    : tt.offer.compensation.pdfResourcesMaterialLabel;
        const clientProvidesLabel = item.kind === "human" ? tt.offer.compensation.pdfClientProvidesHuman   : tt.offer.compensation.pdfClientProvidesMaterial;
        const reimbursedLabel    = item.kind === "human" ? tt.offer.compensation.pdfReimbursedHuman        : tt.offer.compensation.pdfReimbursedMaterial;
        if (item.clientProvides === "yes") { conditions.push(appendDescription(clientProvidesLabel, item.details)); continue; }
        if (item.reimbursed     === "yes") { conditions.push(appendDescription(reimbursedLabel, item.details)); continue; }
        if ((item.amount || 0)  > 0)       { details.push(appendDescription(`${tt.offer.compensation.pdfResourcesLabel} (${typeLabel}): +${money(item.amount)}`, item.details)); continue; }
        if (item.details) conditions.push(appendDescription(`${tt.offer.compensation.pdfResourcesLabel} (${typeLabel}).`, item.details));
      }
    }

    if (compensationState.admin.applies === "yes" && compensationState.admin.amount > 0) details.push(`${tt.offer.compensation.pdfAdminLabel}: +${money(compensationState.admin.amount)}`);

    const longDesc = compensationState.travel.transport.long.details;
    if (compensationState.travel.transport.long.enabled) {
      if (compensationState.travel.transport.long.clientCovers === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfClientCoversTransportLong, longDesc));
      else if (compensationState.travel.transport.long.reimbursed === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfReimbursedTransportLong, longDesc));
      else if (compensationState.travel.transport.long.amount > 0) details.push(appendDescription(`${tt.offer.compensation.pdfTransportLongLabel}: +${money(compensationState.travel.transport.long.amount)}`, longDesc));
      else if (longDesc) conditions.push(appendDescription(`${tt.offer.compensation.pdfTransportLongLabel}.`, longDesc));
    }

    const shortDesc = compensationState.travel.transport.short.details;
    if (compensationState.travel.transport.short.enabled) {
      if (compensationState.travel.transport.short.reimbursed === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfReimbursedTransportShort, shortDesc));
      else if (compensationState.travel.transport.short.amount > 0) details.push(appendDescription(`${tt.offer.compensation.pdfTransportShortLabel}: +${money(compensationState.travel.transport.short.amount)}`, shortDesc));
      else if (shortDesc) conditions.push(appendDescription(`${tt.offer.compensation.pdfTransportShortLabel}.`, shortDesc));
    }

    const taxiDesc = compensationState.travel.transport.taxi.details;
    if (compensationState.travel.transport.taxi.enabled) {
      if (compensationState.travel.transport.taxi.reimbursed === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfReimbursedTaxi, taxiDesc));
      else if (compensationState.travel.transport.taxi.amount > 0) details.push(appendDescription(`${tt.offer.compensation.pdfTaxiLabel}: +${money(compensationState.travel.transport.taxi.amount)}`, taxiDesc));
      else if (taxiDesc) conditions.push(appendDescription(`${tt.offer.compensation.pdfTaxiLabel}.`, taxiDesc));
    }

    if (compensationState.travel.transport.car.enabled) details.push(`${tt.offer.compensation.pdfCarLabel}: +${money(compensationState.travel.transport.car.amount)}`);

    const materialDesc = compensationState.travel.transport.material.details;
    if (compensationState.travel.transport.material.enabled) {
      if (compensationState.travel.transport.material.clientCovers === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfClientCoversTransportMaterial, materialDesc));
      else if (compensationState.travel.transport.material.reimbursed === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfReimbursedTransportMaterial, materialDesc));
      else if (compensationState.travel.transport.material.amount > 0) details.push(appendDescription(`${tt.offer.compensation.pdfTransportMaterialLabel}: +${money(compensationState.travel.transport.material.amount)}`, materialDesc));
      else if (materialDesc) conditions.push(appendDescription(`${tt.offer.compensation.pdfTransportMaterialLabel}.`, materialDesc));
    }

    const lodgingDesc = compensationState.travel.lodging.details;
    if (compensationState.travel.lodging.hasExpenses === "yes") {
      if (compensationState.travel.lodging.clientCovers === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfClientCoversLodging, lodgingDesc));
      else if (compensationState.travel.lodging.reimbursed === "yes") conditions.push(appendDescription(tt.offer.compensation.pdfReimbursedLodging, lodgingDesc));
      else if (compensationState.travel.lodging.amount > 0) details.push(appendDescription(`${tt.offer.compensation.pdfLodgingLabel}: +${money(compensationState.travel.lodging.amount)}`, lodgingDesc));
      else if (lodgingDesc) conditions.push(appendDescription(`${tt.offer.compensation.pdfLodgingLabel}.`, lodgingDesc));
    }

    if (compensationState.travel.meals.hasExpenses === "yes") {
      const mealsTotal = compensationState.travel.meals.breakfast.qty * compensationState.travel.meals.breakfast.unit
                       + compensationState.travel.meals.lunch.qty     * compensationState.travel.meals.lunch.unit
                       + compensationState.travel.meals.dinner.qty    * compensationState.travel.meals.dinner.unit;
      if (mealsTotal > 0) details.push(`${tt.offer.compensation.pdfMealsLabel}: +${money(mealsTotal)}`);
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
    doc.text("HUPR - Calculateur de frais / Fee Calculator", margin, 9.5);

    // Title
    y = 25;
    doc.setTextColor(18, 84, 90);
    doc.setFontSize(17);
    doc.text(tt.offer.title, margin, y);

    y += 8;
    doc.setTextColor(30, 27, 22);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Date: ${dateText}`, margin, y);

    // Offer info block
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(18, 84, 90);
    doc.text(tt.offer.pdfInfoTitle, margin, y);

    const infoRows = [
      { label: tt.offer.recipientLabel,   value: serviceInfoState.recipient   || tt.offer.pdfNotProvided },
      { label: tt.offer.eventLabel,       value: serviceInfoState.eventName   || tt.offer.pdfNotProvided },
      { label: tt.offer.providerLabel,    value: serviceInfoState.provider    || tt.offer.pdfNotProvided },
      { label: tt.offer.descriptionLabel, value: serviceInfoState.description || tt.offer.pdfNotProvided },
    ];

    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 27, 22);
    for (const row of infoRows) {
      const wrapped = doc.splitTextToSize(`${row.label}: ${row.value}`, contentW);
      if (y + wrapped.length * 5 > 260) { doc.addPage(); y = 20; }
      doc.text(wrapped, margin, y);
      y += wrapped.length * 5 + 1;
    }

    // Compensations total box
    const compTotal = getCompensationTotal();
    y += 7;
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(18, 84, 90);
    doc.text(tt.offer.compensation.title, margin, y);

    y += 7;
    doc.setFillColor(252, 245, 237);
    doc.rect(margin, y - 5, contentW, 10, "F");
    doc.setDrawColor(200, 210, 210);
    doc.rect(margin, y - 5, contentW, 10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(160, 98, 26);
    doc.text(`${tt.offer.compensation.totalLineLabel}: ${money(compTotal)}`, margin + 3, y + 1.5);

    // Details section
    const pdfBlocks = getCompensationPdfBlocks();
    y += 12;
    if (y > 270) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(18, 84, 90);
    doc.text(tt.offer.pdfDetailsTitle, margin, y);

    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(30, 27, 22);
    const detailLines = pdfBlocks.details.length ? pdfBlocks.details : [tt.offer.pdfNoDetails];
    for (const item of detailLines) {
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

    // Support note
    y += 4;
    if (y > 285) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(70, 70, 70);
    const supportLines = doc.splitTextToSize(tt.offer.supportNote, contentW);
    doc.text(supportLines, margin, y);

    // Signatures
    y += supportLines.length * 4 + 8;
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
  syncCompensationForm();
  initHelpBubbles();
})();
