import * as Core from "../assets/challenge-core.js";

const $ = id => document.getElementById(id);
const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const normalize = value => String(value).toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
const titleCase = value => String(value).replace(/[-_]/g, " ").replace(/\b\w/g, char => char.toUpperCase());
let today = Core.localTodayISO();
const challenges = Array.isArray(window.CHALLENGES) ? window.CHALLENGES : [];
const records = challenges.map(challenge => ({ challenge, state: Core.deriveChallengeState(challenge, today), action: Core.getNextAction(challenge, today) }));
const byId = new Map(records.map(record => [record.challenge.id, record]));
function refreshDay() {
  const currentDay = Core.localTodayISO();
  if (currentDay === today) return;
  today = currentDay;
  for (const record of records) {
    record.state = Core.deriveChallengeState(record.challenge, today);
    record.action = Core.getNextAction(record.challenge, today);
  }
  updateCoverage();
}
let storage = null;
try { storage = window.localStorage; } catch {}
const loaded = Core.loadShortlist([...byId.keys()], storage);
let shortlist = loaded.ids;
let persistent = Boolean(storage) && loaded.persistent;

function httpsURL(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

function officialURL(challenge) {
  const sources = challenge.sources || [];
  return [sources.find(source => source.type === "official")?.url, challenge.url, ...sources.map(source => source.url)].map(httpsURL).find(Boolean);
}

function options(field, property, format) {
  const values = new Map();
  for (const challenge of challenges) for (const value of challenge[property] || []) {
    const key = normalize(value);
    if (!values.has(key)) values.set(key, format(value));
  }
  field.innerHTML = `<option value="">All ${property === "taskType" ? "tasks" : "modalities"}</option>` + [...values].sort((a, b) => a[1].localeCompare(b[1])).map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join("");
  return new Set(values.keys());
}

const tasks = options($("taskFilter"), "taskType", titleCase);
const modalities = options($("modalityFilter"), "modality", value => String(value).replace(/[-_]/g, " "));
let state;
function readURL() {
  const params = new URLSearchParams(location.search);
  state = {
    view: ["browse", "schedule", "saved"].includes(params.get("view")) ? params.get("view") : "browse",
    scope: ["join", "upcoming", "all"].includes(params.get("scope")) ? params.get("scope") : "join",
    search: (params.get("search") || "").slice(0, 200),
    task: tasks.has(params.get("task")) ? params.get("task") : "",
    modality: modalities.has(params.get("modality")) ? params.get("modality") : ""
  };
}
function syncURL(push = false) {
  const params = new URLSearchParams();
  if (state.view !== "browse") params.set("view", state.view);
  if (state.scope !== "join") params.set("scope", state.scope);
  for (const key of ["search", "task", "modality"]) if (state[key]) params.set(key, state[key]);
  const url = location.pathname + (params.size ? `?${params}` : "") + location.hash;
  if (url !== location.pathname + location.search + location.hash) history[push ? "pushState" : "replaceState"](null, "", url);
}

function eligibility(record) {
  if (record.state.canJoinNow) return "Accepting new teams";
  if (record.state.status === "open" || record.state.status === "live") return "Registered teams only";
  return record.state.status === "upcoming" ? "Upcoming" : "Closed";
}
function dateLabel(record) {
  if (record.action.kind === "opens") return "Opens";
  if (record.action.phase?.type === "leaderboard") return "Benchmark window ends";
  if (["registration", "application"].includes(record.action.phase?.type)) return "Join by";
  return "Submissions due";
}
function dateText(record) {
  if (record.action.dateISO) return Core.formatDate(record.action.dateISO, { year: record.action.dateISO.slice(0, 4) !== today.slice(0, 4) });
  if (record.state.status === "closed") return "Completed";
  if (record.state.status === "live") return "No fixed deadline";
  if (record.action.kind === "postponed") return "Postponed";
  return "Date to be confirmed";
}
function actionNote(record) {
  if (!record.action.dateISO) return record.state.status === "live" ? "Rolling benchmark" : record.action.label;
  return `${dateLabel(record)}${record.action.estimated ? " · estimated" : ""}`;
}
function rowMarkup(record) {
  const { challenge: c, state: d } = record;
  const saved = shortlist.includes(c.id);
  const stale = Core.getFreshness(c, today).key !== "fresh";
  const metadata = [...(c.taskType || []).map(titleCase), ...(c.modality || [])];
  return `<article class="challenge-row challenge-card" data-id="${esc(c.id)}" data-status="${d.status}" data-joinable="${d.canJoinNow}">
    <div class="row-main"><div class="row-meta"><span class="status-label ${d.status}">${esc(eligibility(record))}</span>${d.status === "live" ? '<span class="tag">Rolling benchmark</span>' : d.currentPhases.some(phase => phase.type === "leaderboard") ? '<span class="tag">Post-challenge benchmark</span>' : ""}${stale ? '<span class="tag">Source review due</span>' : ""}</div>
      <h2><button class="row-title" type="button" data-detail="${esc(c.id)}" aria-haspopup="dialog">${esc(c.name)}<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.7"/></svg></button></h2>
      <p class="card-venue">${esc(c.venueFamily || "Standalone")}</p>
      <div class="card-tags">${metadata.map(value => `<span class="tag">${esc(value)}</span>`).join("")}</div>
      <p class="row-description">${esc(c.overview || c.name)}</p>
      <dl class="card-facts">${fact("Data access", titleCase(c.dataAvailable || "Unknown"))}${fact("Checked", c.lastVerifiedISO ? Core.formatDate(c.lastVerifiedISO, { year: false }) : "Not verified")}</dl>
      <button class="card-details-button" type="button" data-detail="${esc(c.id)}" aria-haspopup="dialog">View details <span aria-hidden="true">→</span></button>
      ${d.status === "upcoming" ? '<p class="date-note">Entry is not confirmed open. Check the official schedule.</p>' : ""}
    </div><div class="row-side"><div><p class="date-note">${esc(actionNote(record))}</p><p class="deadline">${esc(dateText(record))}</p></div>
      <button class="save-button" type="button" data-save="${esc(c.id)}" aria-pressed="${saved}" aria-label="${esc(saved ? `Remove ${c.shortName || c.name} from saved` : `Save ${c.shortName || c.name}`)}"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 4h12v17l-6-4-6 4z" fill="${saved ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg><span class="save-label">${saved ? "Saved" : "Save"}</span></button>
    </div></article>`;
}

function filteredRecords() {
  const query = normalize(state.search);
  return records.filter(record => {
    const { challenge: c, state: d } = record;
    if (state.view === "saved") { if (!shortlist.includes(c.id)) return false; }
    else if (state.scope === "join" ? !d.canJoinNow : state.scope === "upcoming" && d.status !== "upcoming") return false;
    if (state.task && !(c.taskType || []).some(value => normalize(value) === state.task)) return false;
    if (state.modality && !(c.modality || []).some(value => normalize(value) === state.modality)) return false;
    if (state.view === "schedule" && (d.status === "closed" || record.action.dateISO && Core.daysBetween(today, record.action.dateISO) < 0)) return false;
    return !query || normalize([c.name, c.shortName, c.overview, c.anatomy, c.venue, c.venueFamily, ...(c.taskType || []), ...(c.modality || [])].join(" ")).includes(query);
  }).sort((a, b) => Number(a.state.status === "closed") - Number(b.state.status === "closed") || (Core.isoDayNumber(a.action.dateISO) ?? Infinity) - (Core.isoDayNumber(b.action.dateISO) ?? Infinity) || a.challenge.name.localeCompare(b.challenge.name));
}

function calendarText() {
  refreshDay();
  const selected = shortlist.map(id => byId.get(id)?.challenge).filter(Boolean).map(challenge => ({ ...challenge, phases: (challenge.phases || []).filter(phase => phase.endISO && Core.daysBetween(today, phase.endISO) >= 0) }));
  return Core.createCalendarText(selected);
}

function render() {
  refreshDay();
  $("search").value = state.search;
  $("taskFilter").value = state.task;
  $("modalityFilter").value = state.modality;
  $("scopeNav").hidden = state.view === "saved";
  document.querySelectorAll("[data-view]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.view === state.view)));
  document.querySelectorAll("[data-scope]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.scope === state.scope)));
  $("savedLabel").textContent = String(shortlist.length);
  $("savedTools").hidden = state.view !== "saved";
  $("compareSaved").disabled = shortlist.length < 2;
  $("exportSaved").hidden = !calendarText().includes("BEGIN:VEVENT");
  $("savedHint").textContent = `${persistent ? "Saved on this device" : "Saved for this visit; device storage is unavailable"} · up to 4 challenges.`;
  const filterCount = Number(Boolean(state.task)) + Number(Boolean(state.modality));
  if ($("filterCount")) $("filterCount").textContent = filterCount ? ` (${filterCount})` : "";
  $("resetFilters").hidden = !state.search && !state.task && !state.modality;
  const list = filteredRecords();
  $("resultCount").textContent = `${list.length} ${list.length === 1 ? "challenge" : "challenges"}${state.view === "saved" ? " saved" : state.scope === "join" ? " accepting new teams" : state.scope === "upcoming" ? " upcoming" : " in the directory"}`;
  $("emptyState").hidden = list.length > 0;
  $("results").className = state.view === "schedule" ? "schedule-list" : "challenge-grid";
  if (state.view === "schedule") {
    const groups = new Map();
    for (const record of list) {
      const group = record.action.dateISO || (record.state.status === "live" ? "rolling" : "tba");
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(record);
    }
    $("results").innerHTML = [...groups].map(([group, items]) => `<section class="schedule-group"><h2 class="group-title">${esc(group === "rolling" ? "Rolling benchmarks" : group === "tba" ? "Dates to be confirmed" : Core.formatDate(group))}</h2>${items.map(rowMarkup).join("")}</section>`).join("");
  } else $("results").innerHTML = list.map(rowMarkup).join("");
}

let noticeTimer;
function notice(message) {
  clearTimeout(noticeTimer);
  $("notice").textContent = message;
  noticeTimer = setTimeout(() => { $("notice").textContent = ""; }, 5000);
}
function saveChallenge(id) {
  if (!byId.has(id)) return;
  const existing = shortlist.includes(id);
  if (!existing && shortlist.length >= 4) { notice("You can save up to four challenges. Remove one in Saved to add another."); return; }
  shortlist = existing ? shortlist.filter(saved => saved !== id) : [...shortlist, id];
  persistent = Core.saveShortlist(shortlist, storage) && Boolean(storage);
  render();
  const replacement = [...document.querySelectorAll("[data-save]")].find(button => button.dataset.save === id);
  (replacement || document.querySelector(`[data-view="${state.view}"]`))?.focus({ preventScroll: true });
  notice(existing ? "Removed from saved." : persistent ? "Saved on this device." : "Saved for this visit. Device storage is unavailable.");
}

function fact(label, value) { return `<dt>${esc(label)}</dt><dd>${esc(value || "Not verified")}</dd>`; }
function detailFacts(record) {
  refreshDay();
  const c = record.challenge;
  return `<dl class="detail-grid">${fact("Entry", eligibility(record))}${fact("Next action", `${actionNote(record)} · ${dateText(record)}`)}${fact("Task", (c.taskType || []).map(titleCase).join(", "))}${fact("Modality", (c.modality || []).join(", "))}${fact("Data access", titleCase(c.dataAvailable || "Unknown"))}${fact("Dataset", c.numCases)}${fact("Dataset size", Number.isFinite(c.datasetSizeGB) ? `${c.datasetSizeGB} GB` : null)}${fact("Prize", c.prizes)}${fact("Source checked", Core.getFreshness(c, today).label)}</dl>`;
}
function openDialog(title, html) {
  $("dialogTitle").textContent = title;
  $("dialogBody").innerHTML = html;
  $("detailDialog").showModal();
}
function showDetails(id) {
  const record = byId.get(id);
  if (!record) return;
  const c = record.challenge, official = officialURL(c), compute = Core.estimateCompute(c);
  const links = (c.sources || []).filter(source => httpsURL(source.url));
  const phases = (c.phases || []).filter(phase => phase.state !== "cancelled");
  const phaseDate = (date, estimated) => date ? `${Core.formatDate(date)}${estimated ? " (estimated)" : ""}` : "TBA";
  openDialog(c.name, `<p>${esc(c.overview)}</p>${c.statusNote ? `<p class="detail-warning">${esc(c.statusNote)}</p>` : ""}${detailFacts(record)}
    <section class="detail-section"><h3>Schedule</h3><ul class="source-list">${phases.map(phase => `<li><strong>${esc(phase.label)}</strong><br>${esc(phaseDate(phase.startISO, phase.startEstimated))} → ${esc(phase.rolling && !phase.endISO ? "Rolling" : phaseDate(phase.endISO, phase.endEstimated))}</li>`).join("")}</ul></section>
    <section class="detail-section"><h3>Compute estimate</h3><p>${esc(compute.vram)} · ${esc(compute.confidence)} confidence. ${esc(compute.note)} Actual requirements depend on the model and preprocessing.</p></section>
    <section class="detail-section"><h3>Official sources</h3><ul class="source-list">${links.map(source => `<li><a href="${esc(httpsURL(source.url))}" target="_blank" rel="noopener noreferrer">${esc(source.label || "Official source")}</a>${source.lastCheckedISO ? ` · checked ${esc(Core.formatDate(source.lastCheckedISO))}` : ""}</li>`).join("")}</ul><p>Confirm eligibility and deadlines on the official page before entering.</p>${official ? `<a class="primary-link" href="${esc(official)}" target="_blank" rel="noopener noreferrer">Open official page <span aria-hidden="true">↗</span></a>` : "<p>An official HTTPS link is unavailable.</p>"}</section>`);
}

$("viewNav").addEventListener("click", event => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  state.view = button.dataset.view;
  syncURL(true); render();
});
$("scopeNav").addEventListener("click", event => {
  const button = event.target.closest("[data-scope]");
  if (!button) return;
  state.scope = button.dataset.scope;
  syncURL(); render();
});
$("search").addEventListener("input", event => { state.search = event.target.value.slice(0, 200); syncURL(); render(); });
for (const [id, key] of [["taskFilter", "task"], ["modalityFilter", "modality"]]) $(id).addEventListener("change", event => { state[key] = event.target.value; syncURL(); render(); });
function reset() { Object.assign(state, { scope: "join", search: "", task: "", modality: "" }); syncURL(); render(); $("search").focus(); }
$("resetFilters").addEventListener("click", reset);
$("emptyReset").addEventListener("click", reset);
$("results").addEventListener("click", event => {
  const save = event.target.closest("[data-save]");
  const details = event.target.closest("[data-detail]");
  if (save) saveChallenge(save.dataset.save);
  else if (details) showDetails(details.dataset.detail);
});
$("closeDialog").addEventListener("click", () => $("detailDialog").close());
$("compareSaved").addEventListener("click", () => {
  openDialog("Compare saved challenges", `<div class="compare-grid">${shortlist.map(id => byId.get(id)).filter(Boolean).map(record => `<section class="compare-item"><h3>${esc(record.challenge.shortName || record.challenge.name)}</h3>${record.challenge.statusNote ? `<p class="detail-warning">${esc(record.challenge.statusNote)}</p>` : ""}${detailFacts(record)}</section>`).join("")}</div>`);
});
$("exportSaved").addEventListener("click", () => {
  const contents = calendarText();
  if (!contents.includes("BEGIN:VEVENT")) { notice("No future verified exact deadlines are available to export."); return; }
  const url = URL.createObjectURL(new Blob([contents], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url; link.download = "medical-image-challenge-deadlines.ics";
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  notice("Calendar download started. Estimated and unconfirmed deadlines are omitted.");
});

let theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
try { const storedTheme = storage?.getItem("imagingPreviewTheme"); if (["light", "dark"].includes(storedTheme)) theme = storedTheme; } catch {}
function applyTheme() {
  document.documentElement.dataset.theme = theme;
  $("themeButton").setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  $("themeButton").setAttribute("title", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
}
$("themeButton").addEventListener("click", () => { theme = theme === "dark" ? "light" : "dark"; try { storage?.setItem("imagingPreviewTheme", theme); } catch {} applyTheme(); });
window.addEventListener("popstate", () => { readURL(); render(); });
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && Core.localTodayISO() !== today) render();
});
window.addEventListener("storage", event => {
  if (event.key !== "medicalChallengeShortlist:v1" && event.key !== null) return;
  if (!persistent) return;
  const saved = Core.loadShortlist([...byId.keys()], storage);
  shortlist = saved.ids; persistent = Boolean(storage) && saved.persistent; render();
});
function updateCoverage() {
  const freshCount = challenges.filter(challenge => Core.getFreshness(challenge, today).key === "fresh").length;
  $("coverage").textContent = `${challenges.length} challenges · ${freshCount} checked in the past 14 days`;
  $("sourceNote").textContent = `Status as of ${Core.formatDate(today)}. ${challenges.length - freshCount} listings need source review. Always confirm dates with organizers.`;
}
updateCoverage();
readURL(); applyTheme(); render(); syncURL();
if (!challenges.length) notice("Challenge data could not be loaded. Reload the page to try again.");
