const DAY_MS = 86_400_000;

export const PHASE_TYPES = Object.freeze([
  "data-release", "registration", "application", "development", "validation",
  "sanity-check", "test", "final-submission", "paper", "results", "event", "leaderboard"
]);

export const ACTIONABLE_PHASE_TYPES = new Set([
  "registration", "application", "development", "validation", "sanity-check",
  "test", "final-submission", "paper"
]);

const JOIN_PHASE_TYPES = new Set(["registration", "application"]);
const SUBMISSION_PHASE_TYPES = new Set([
  "development", "validation", "sanity-check", "test", "final-submission"
]);
const FINAL_PHASE_TYPES = new Set(["test", "final-submission"]);
const STATUS_ORDER = Object.freeze({ live: 0, open: 1, upcoming: 2, closed: 3 });
const SHORTLIST_KEY = "medicalChallengeShortlist:v1";
let memoryShortlist = [];

export function localTodayISO(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function isoDayNumber(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return null;
  const [y, m, d] = iso.split("-").map(Number);
  const value = Date.UTC(y, m - 1, d) / DAY_MS;
  const check = new Date(value * DAY_MS);
  return check.getUTCFullYear() === y && check.getUTCMonth() === m - 1 && check.getUTCDate() === d
    ? value : null;
}

export function daysBetween(fromISO, toISO) {
  const from = isoDayNumber(fromISO);
  const to = isoDayNumber(toISO);
  return from === null || to === null ? null : to - from;
}

export function formatDate(iso, options = {}) {
  const day = isoDayNumber(iso);
  if (day === null) return "TBA";
  const date = new Date(day * DAY_MS);
  return new Intl.DateTimeFormat(options.locale || "en", {
    day: "numeric", month: "short", year: options.year === false ? undefined : "numeric",
    timeZone: "UTC"
  }).format(date);
}

function isCancelled(phase) {
  return phase.state === "cancelled";
}

function isPostponed(phase) {
  return phase.state === "postponed";
}

export function isPhaseActive(phase, todayISO = localTodayISO()) {
  if (!phase || isCancelled(phase) || isPostponed(phase)) return false;
  const today = isoDayNumber(todayISO);
  const start = isoDayNumber(phase.startISO);
  const end = isoDayNumber(phase.endISO);
  if (phase.state === "completed") return false;
  if (phase.state === "upcoming" && start === null) return false;
  if (phase.state === "active" && start === null && end === null) return true;
  if (today === null) return false;
  if (start !== null && today < start) return false;
  if (end !== null && today > end) return false;
  return start !== null || end !== null;
}

export function isPhaseFuture(phase, todayISO = localTodayISO()) {
  if (!phase || isCancelled(phase) || phase.state === "completed") return false;
  if (isPostponed(phase)) return true;
  const today = isoDayNumber(todayISO);
  const start = isoDayNumber(phase.startISO);
  if (phase.state === "upcoming" && start === null) return true;
  return today !== null && start !== null && start > today;
}

export function derivePhaseStatus(phase, todayISO = localTodayISO()) {
  if (!phase || phase.state === "cancelled" || phase.state === "completed") return "closed";
  if (phase.state === "postponed" || isPhaseFuture(phase, todayISO)) return "upcoming";
  if (isPhaseActive(phase, todayISO)) return phase.rolling && !phase.endISO ? "live" : "open";
  const today = isoDayNumber(todayISO);
  const end = isoDayNumber(phase.endISO);
  return today !== null && end !== null && end < today ? "closed" : "upcoming";
}

function earliestPhase(phases, dateField = "endISO") {
  return phases
    .filter((phase) => isoDayNumber(phase[dateField]) !== null)
    .sort((a, b) => isoDayNumber(a[dateField]) - isoDayNumber(b[dateField]))[0] || null;
}

export function deriveChallengeState(challenge, todayISO = localTodayISO()) {
  const phases = Array.isArray(challenge?.phases) ? challenge.phases : [];
  const participation = phases.filter((phase) => phase.participation && !isCancelled(phase));
  const currentPhases = participation.filter((phase) => isPhaseActive(phase, todayISO));
  const futurePhases = participation.filter((phase) => isPhaseFuture(phase, todayISO));
  const rolling = currentPhases.some((phase) => phase.rolling && !phase.endISO);
  const status = rolling ? "live" : currentPhases.length ? "open" : futurePhases.length ? "upcoming" : "closed";
  const canJoinNow = currentPhases.some((phase) => phase.acceptingNewTeams);
  const joinCandidates = [...currentPhases, ...futurePhases].filter((phase) => JOIN_PHASE_TYPES.has(phase.type));
  const submissionCandidates = [...currentPhases, ...futurePhases].filter((phase) => SUBMISSION_PHASE_TYPES.has(phase.type));
  const finalCandidates = phases.filter((phase) => FINAL_PHASE_TYPES.has(phase.type) && !phase.endEstimated && !isCancelled(phase));
  const nextJoinPhase = earliestPhase(joinCandidates);
  const nextSubmissionPhase = earliestPhase(submissionCandidates);
  const finalSubmissionPhase = finalCandidates
    .filter((phase) => isoDayNumber(phase.endISO) !== null)
    .sort((a, b) => isoDayNumber(b.endISO) - isoDayNumber(a.endISO))[0] || null;
  const currentPhaseLabel = currentPhases.map((phase) => phase.label).join(" · ") ||
    (futurePhases[0]?.state === "postponed" ? `${futurePhases[0].label} postponed` : futurePhases[0]?.label) ||
    (status === "closed" ? "Completed" : "Schedule TBA");

  return {
    status, statusRank: STATUS_ORDER[status], currentPhases, futurePhases, canJoinNow,
    currentPhaseLabel,
    nextJoinDeadline: nextJoinPhase?.endISO || null,
    nextJoinPhase,
    nextSubmissionDeadline: nextSubmissionPhase?.endISO || null,
    nextSubmissionPhase,
    finalSubmissionDeadline: finalSubmissionPhase?.endISO || null,
    finalSubmissionPhase
  };
}

export function getFreshness(challengeOrISO, todayISO = localTodayISO()) {
  const verifiedISO = typeof challengeOrISO === "string" ? challengeOrISO : challengeOrISO?.lastVerifiedISO;
  if (isoDayNumber(verifiedISO) === null) {
    return { key: "unverified", label: "Verification date unavailable", days: null, verifiedISO: null };
  }
  const days = daysBetween(verifiedISO, todayISO);
  if (days === null) return { key: "unverified", label: "Verification date unavailable", days: null, verifiedISO };
  if (days < 0) return { key: "unverified", label: "Verification date is in the future", days, verifiedISO };
  if (days <= 14) return { key: "fresh", label: `Verified ${formatDate(verifiedISO)}`, days, verifiedISO };
  if (days <= 28) return { key: "reviewDue", label: `Review due · checked ${formatDate(verifiedISO)}`, days, verifiedISO };
  return { key: "stale", label: `Stale · checked ${formatDate(verifiedISO)}`, days, verifiedISO };
}

export function getNextAction(challenge, todayISO = localTodayISO()) {
  const state = deriveChallengeState(challenge, todayISO);
  const today = isoDayNumber(todayISO);
  const activeWithEnd = state.currentPhases.filter((phase) => isoDayNumber(phase.endISO) !== null);
  let phase = earliestPhase(activeWithEnd);
  let kind = "deadline";
  let dateISO = phase?.endISO || null;
  if (!phase) {
    phase = state.futurePhases
      .filter((item) => !isPostponed(item) && isoDayNumber(item.startISO) !== null)
      .sort((a, b) => isoDayNumber(a.startISO) - isoDayNumber(b.startISO))[0] || null;
    kind = "opens";
    dateISO = phase?.startISO || null;
  }
  if (!phase && state.currentPhases.some((item) => item.rolling)) {
    phase = state.currentPhases.find((item) => item.rolling);
    kind = "rolling";
  }
  if (!phase && state.futurePhases.some(isPostponed)) {
    phase = state.futurePhases.find(isPostponed);
    kind = "postponed";
  }
  return {
    phase,
    label: phase?.label || (state.status === "closed" ? "Challenge completed" : "Schedule TBA"),
    kind,
    dateISO,
    days: dateISO && today !== null ? isoDayNumber(dateISO) - today : null,
    estimated: Boolean(phase?.endEstimated || (kind === "opens" && phase?.startEstimated))
  };
}

export function estimateCompute(challenge) {
  const text = [challenge?.name, challenge?.overview, challenge?.shortName, ...(challenge?.taskType || []), ...(challenge?.modality || [])]
    .join(" ").toLowerCase();
  const foundation = challenge?.scale === "foundation" || /foundation model|pretrain/.test(text);
  const wsi = /wsi|histopath|patholog|slide|cytolog|microscop|smear/.test((challenge?.modality || []).join(" ").toLowerCase());
  let tier = "mid", vram = "16–24 GB", note = "General single-GPU starting point.";
  if (foundation) {
    tier = "multi-GPU"; vram = "80 GB+ across GPUs"; note = "Foundation-model pretraining usually needs several high-memory GPUs.";
  } else if (challenge?.dimensionality === "3D" || challenge?.dimensionality === "mixed") {
    const multimodal = /pet|whole-body|registration|reconstruction|4d|angiograph/.test(text);
    tier = "high"; vram = multimodal ? "40–48 GB" : "24–48 GB";
    note = multimodal ? "Multimodal or whole-body 3D inputs raise memory demand." : "Patch-based 3D training often starts around 24 GB.";
  } else if (wsi) {
    tier = "mid"; vram = "16–24 GB"; note = "Whole-slide workflows are normally patch-based.";
  } else {
    tier = "entry"; vram = "8–16 GB"; note = "Typical 2D training can start on one consumer GPU.";
  }
  const confidence = Number.isFinite(challenge?.datasetSizeGB) && challenge?.dimensionality ? "medium" : "low";
  return { tier, vram, note, confidence };
}

function monthShiftSafe(iso, delta) {
  const [year, month] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1 + delta, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-01`;
}

function endOfMonthISO(iso) {
  const [year, month] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month, 0));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

export function getAxisBounds(challenges, todayISO = localTodayISO(), leadingMonths = 1, trailingMonths = 2) {
  const dates = [todayISO];
  for (const challenge of challenges || []) {
    for (const phase of challenge.phases || []) {
      if (isoDayNumber(phase.startISO) !== null) dates.push(phase.startISO);
      if (isoDayNumber(phase.endISO) !== null) dates.push(phase.endISO);
    }
  }
  dates.sort((a, b) => isoDayNumber(a) - isoDayNumber(b));
  const startMonth = `${dates[0].slice(0, 7)}-01`;
  const endMonth = `${dates.at(-1).slice(0, 7)}-01`;
  const startISO = monthShiftSafe(startMonth, -leadingMonths);
  const endISO = endOfMonthISO(monthShiftSafe(endMonth, trailingMonths));
  return { startISO, endISO, totalDays: daysBetween(startISO, endISO) + 1 };
}

function icsEscape(value) {
  return String(value || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function nextDayCompact(iso) {
  const day = isoDayNumber(iso);
  return new Date((day + 1) * DAY_MS).toISOString().slice(0, 10).replaceAll("-", "");
}

export function createCalendarText(challenges) {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Medical Image Challenge Compilations//EN", "CALSCALE:GREGORIAN"];
  for (const challenge of challenges || []) {
    if (!challenge.lastVerifiedISO) continue;
    for (const phase of challenge.phases || []) {
      if (!ACTIONABLE_PHASE_TYPES.has(phase.type) || !phase.endISO || phase.endEstimated || phase.state === "cancelled" || !phase.sourceIds?.length || isoDayNumber(phase.endISO) === null) continue;
      const date = phase.endISO.replaceAll("-", "");
      lines.push(
        "BEGIN:VEVENT",
        `UID:${icsEscape(challenge.id)}-${icsEscape(phase.id)}@medical-image-challenges`,
        `DTSTART;VALUE=DATE:${date}`,
        `DTEND;VALUE=DATE:${nextDayCompact(phase.endISO)}`,
        `SUMMARY:${icsEscape(challenge.shortName || challenge.name)} — ${icsEscape(phase.label)}`,
        `DESCRIPTION:${icsEscape(`Official page: ${challenge.url}\nVerified: ${challenge.lastVerifiedISO || "unknown"}`)}`,
        `URL:${challenge.url}`,
        "END:VEVENT"
      );
    }
  }
  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}

export function createCalendarBlob(challenges) {
  return new Blob([createCalendarText(challenges)], { type: "text/calendar;charset=utf-8" });
}

export function loadShortlist(validIds, storage = globalThis.localStorage) {
  const allowed = new Set(validIds || []);
  try {
    const parsed = JSON.parse(storage?.getItem(SHORTLIST_KEY) || "[]");
    memoryShortlist = Array.isArray(parsed) ? parsed.filter((id) => allowed.has(id)).slice(0, 4) : [];
    return { ids: [...memoryShortlist], persistent: true };
  } catch {
    memoryShortlist = memoryShortlist.filter((id) => allowed.has(id)).slice(0, 4);
    return { ids: [...memoryShortlist], persistent: false };
  }
}

export function saveShortlist(ids, storage = globalThis.localStorage) {
  memoryShortlist = [...new Set(ids || [])].slice(0, 4);
  try {
    storage?.setItem(SHORTLIST_KEY, JSON.stringify(memoryShortlist));
    return true;
  } catch {
    return false;
  }
}
