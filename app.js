import { hydrateIcons } from "./icons.js";

const HYVOR_WEBSITE_ID = "16128";
const APP_VERSION = "0.2.0";
const REPO_URL = "https://github.com/sergioSHKLR/lde-q";
const LEGAL_URL = "https://shklr.org/";
const GRIFO = [
  { id: "gold", hex: "#f3e08a", labelPt: "Ouro", labelEn: "Gold" },
  { id: "green", hex: "#b7e0b4", labelPt: "Verde", labelEn: "Green" },
  { id: "blue", hex: "#b4d4f0", labelPt: "Azul", labelEn: "Blue" },
  { id: "rose", hex: "#f0c0c8", labelPt: "Rosa", labelEn: "Rose" },
];
const GRIFO_IDS = GRIFO.map((c) => c.id);
const MARKS_KEY = "lde-q-marks-v1";
const HISTORY_KEY = "lde-q-history-v1";
const ONBOARD_KEY = "lde-q-seen-onboard";

const ui = {
  "pt-BR": {
    book: "O Livro dos Espíritos",
    start: "Começar",
    resume: "Continuar",
    jump: "Ir para questão…",
    history: "Histórico",
    emptyHistory: "Ainda sem histórico.",
    emptyFav: "Ainda sem favoritas. Toca na estrela.",
    emptyMarks: "Ainda sem grifos.",
    qs: "questões",
    sections: "secções",
    jumpPh: "22 ou 22a",
    study: "Anote · Comente · Compartilhe",
    settings: "Ajustes",
    theme: "Tema",
    themeSystem: "Sistema",
    themeLight: "Claro",
    themeDark: "Escuro",
    langLabel: "Idioma",
    repo: "Repositório",
    legal: "Aviso",
    legalFoot: "Texto em domínio público. Aviso legal",
    commentPublic: "Ao comentar, o texto fica público.",
    onboardStart: "Começar",
    onboardAnote: "Anote fica neste aparelho.",
    onboardComente: "Comente é público (Hyvor).",
    onboardShare: "Compartilhar envia o endereço da questão.",
    onboardEye: "Respostas começam ocultas. O olho mostra.",
    version: "Versão",
    hyvorAccount: "Perfil Hyvor",
    hyvorOff: "Abre uma questão e entra no Hyvor para ver o perfil aqui.",
    hyvorOut: "Sair do Hyvor",
    close: "Fechar",
    langOff: "EN-US quando o catálogo inglês existir",
    spirit: "Espíritos",
    kardec: "Kardec",
    note: "Anote",
    noteScope: "privada",
    notePh: "",
    notebook: "Caderno",
    fav: "Favoritas",
    allMarks: "Tudo",
    marks: "Grifos",
    home: "Início",
    q: "Questão",
    allMarks: "Tudo",
    emptyFav: "Ainda sem favoritas. Toca na estrela.",
    emptyMarks: "Ainda sem grifos.",
    emptyAll: "O caderno está vazio.",
    comments: "Comente",
    commentsScope: "público",
    shareFail: "Copia o endereço da questão para partilhar.",
    copied: "Ligação copiada",
    share: "Compartilhe",
    export: "Exportar caderno",
    import: "Importar caderno",
    highlightHint: "Selecione texto, escolha cor e clique Grifar",
    highlight: "Grifar",
    grifoColors: "Cores do grifo",
    bookCrumb: "LDE",
    filter: "Filtrar…",
    search: "Buscar questões…",
    searchBtn: "Buscar",
    searchEmpty: "Nada encontrado.",
    searchHits: "questões",
    prev: "Anterior",
    next: "Seguinte",
    showAnswers: "Mostrar respostas",
    hideAnswers: "Ocultar respostas",
    answersDefault: "Respostas",
    answersHidden: "Respostas ocultas — estuda a pergunta primeiro.",
  },
  "en-US": {
    book: "The Spirits’ Book",
    start: "Start",
    resume: "Continue",
    jump: "Go to question…",
    history: "History",
    emptyHistory: "No history yet.",
    emptyFav: "No favorites yet. Tap the star.",
    emptyMarks: "No highlights yet.",
    qs: "questions",
    sections: "sections",
    jumpPh: "22 or 22a",
    study: "Note · Comment · Share",
    settings: "Settings",
    theme: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    langLabel: "Language",
    repo: "Repository",
    legal: "Notice",
    legalFoot: "Public-domain text. Legal notice",
    commentPublic: "Comments are public.",
    onboardStart: "Start",
    onboardAnote: "Notes stay on this device.",
    onboardComente: "Comments are public (Hyvor).",
    onboardShare: "Share sends the question URL.",
    onboardEye: "Answers start hidden. The eye reveals them.",
    version: "Version",
    hyvorAccount: "Hyvor profile",
    hyvorOff: "Open a question and sign in to Hyvor to see the profile here.",
    hyvorOut: "Sign out of Hyvor",
    close: "Close",
    langOff: "EN-US when the English catalog exists",
    spirit: "Spirits",
    kardec: "Kardec",
    note: "Note",
    noteScope: "private",
    notePh: "",
    comments: "Comment",
    commentsScope: "public",
    notebook: "Notebook",
    fav: "Favorites",
    allMarks: "All",
    marks: "Highlights",
    home: "Home",
    q: "Question",
    allMarks: "All",
    emptyFav: "No favorites yet. Tap the star.",
    emptyMarks: "No highlights yet.",
    emptyAll: "The notebook is empty.",
    comments: "Comment",
    commentsScope: "public",
    shareFail: "Copy the question URL to share.",
    copied: "Link copied",
    share: "Share",
    export: "Export notebook",
    import: "Import notebook",
    highlightHint: "Select text, pick a color, then tap Highlight",
    highlight: "Highlight",
    grifoColors: "Highlight colors",
    bookCrumb: "LDE",
    filter: "Filter…",
    searchBtn: "Search",
    searchEmpty: "Nothing found.",
    searchHits: "questions",
    prev: "Previous",
    next: "Next",
    answersDefault: "Answers",
    showAnswers: "Show answers",
    hideAnswers: "Hide answers",
    answersHidden: "Answers hidden — sit with the question first.",
  },
};

const state = {
  data: null,
  byN: new Map(),
  marks: loadMarks(),
  pref: loadPref(),
  qSearch: "",
  histFilter: "",
  history: loadHistory(),
  panel: null,
  showSettings: false,
  hyvorUser: null,
  noteOpen: false,
  showOnboard: !localStorage.getItem(ONBOARD_KEY),
};

function loadPref() {
  try {
    return { theme: "system", locale: "pt-BR", showAnswers: false, grifoColor: "gold", colorLabels: {}, ...JSON.parse(localStorage.getItem(PREF_KEY) || "{}") };
  } catch {
    return { theme: "system", locale: "pt-BR", showAnswers: false, grifoColor: "gold", colorLabels: {} };
  }
}
function savePref() {
  try {
    localStorage.setItem(PREF_KEY, JSON.stringify(state.pref));
  } catch {}
  applyTheme();
}
function loadMarks() {
  try {
    const m = JSON.parse(localStorage.getItem(MARKS_KEY) || "{}");
    return { v: 1, favs: [], highlights: {}, notes: {}, ...m };
  } catch {
    return { v: 1, favs: [], highlights: {}, notes: {} };
  }
}
function saveMarks() {
  localStorage.setItem(MARKS_KEY, JSON.stringify(state.marks));
}
function loadHistory() {
  try {
    const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(raw) ? raw.map(String).filter(Boolean).slice(0, 20) : [];
  } catch {
    return [];
  }
}
function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(state.history.slice(0, 20)));
}
function rememberQ(n) {
  if (!n) return;
  state.history = [n, ...state.history.filter((x) => x !== n)].slice(0, 20);
  saveHistory();
}
function colorId(id) {
  return GRIFO_IDS.includes(id) ? id : "gold";
}
function colorLabel(id) {
  const c = GRIFO.find((x) => x.id === id);
  const custom = state.pref.colorLabels && state.pref.colorLabels[id];
  if (custom && String(custom).trim()) return String(custom).trim();
  if (!c) return id;
  return state.pref.locale === "en-US" ? c.labelEn : c.labelPt;
}
function t(key) {
  const loc = state.pref.locale === "en-US" ? "en-US" : "pt-BR";
  const bag = ui[loc] || ui["pt-BR"];
  if (Object.prototype.hasOwnProperty.call(bag, key)) return bag[key];
  if (Object.prototype.hasOwnProperty.call(ui["pt-BR"], key)) return ui["pt-BR"][key];
  return key;
}
function applyTheme() {
  const pref = state.pref.theme || "system";
  const dark = pref === "dark" || (pref === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.documentElement.lang = state.pref.locale === "en-US" ? "en-US" : "pt-BR";
}

function parseHash() {
  const raw = (location.hash || "#/").replace(/^#/, "");
  const parts = raw.split("/").filter(Boolean);
  if (!parts.length) return { name: "home" };
  if (parts[0] === "q" && parts[1]) return { name: "q", n: normalizeN(parts[1]) };
  if (parts[0] === "caderno") {
    const f = parts[1] || "all";
    if (f === "fav" || f === "marks" || f === "all" || GRIFO_IDS.includes(f)) return { name: "caderno", filter: f };
    return { name: "caderno", filter: "all" };
  }
  if (parts[0] === "fav") return { name: "caderno", filter: "fav" };
  if (parts[0] === "marks") return { name: "caderno", filter: "marks" };
  if (parts[0] === "parte") return { name: "parte", parte: decodeURIComponent(parts.slice(1).join("/")) };
  if (parts[0] === "cap") return { name: "cap", cap: decodeURIComponent(parts.slice(1).join("/")) };
  if (parts[0] === "sec") return { name: "sec", sec: decodeURIComponent(parts.slice(1).join("/")) };
  return { name: "home" };
}
function go(path) {
  location.hash = path.startsWith("#") ? path : `#${path}`;
}
function normalizeN(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/^q\.?/i, "")
    .replace(/\./g, "");
}

function contentOf(q) {
  // EN-US slot: when data.enReady and q.en exist, use it. Today always PT-BR.
  if (state.data?.enReady && state.pref.locale === "en-US" && q.en) return q.en;
  return { prompt: q.prompt, spirit: q.spirit, kardec: q.kardec };
}

function iconStar(on) {
  return `<i data-icon="star" data-icon-size="18"${on ? ' class="filled"' : ""}></i>`;
}

function topBar(extra = "") {
  return `<header class="top">
    <div class="grow">${extra}</div>
    <button class="iconbtn" data-act="open-settings" title="${t("settings")}"><i data-icon="settings"></i></button>
  </header>`;
}

function tabBar(active) {
  return `<nav class="tabbar">
    <button data-go="#/" class="${active === "home" ? "on" : ""}"><i data-icon="sparkles"></i><span>${t("home")}</span></button>
    <button data-go="#/q/${state.lastQ || "1"}" class="${active === "q" ? "on" : ""}"><i data-icon="book"></i><span>${t("q")}</span></button>
    <button data-go="#/caderno" class="${active === "caderno" ? "on" : ""}"><i data-icon="sticky-note"></i><span>${t("notebook")}</span></button>
  </nav>`;
}

function crumbsFor(q) {
  const cap = encodeURIComponent(q.cap || "");
  const sec = encodeURIComponent(q.sec || "");
  return `<nav class="crumbs" aria-label="breadcrumb">
    <button class="pill" data-go="#/">${t("bookCrumb")}</button>
    ${q.cap ? `<button class="pill" data-go="#/cap/${cap}">${esc(short(q.cap))}</button>` : ""}
    ${q.sec ? `<button class="pill" data-go="#/sec/${sec}">${esc(short(q.sec))}</button>` : ""}
  </nav>`;
}

function short(s) {
  return String(s).replace(/^\d+[.\d]*\s*/, "");
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, (ch) => {
    if (ch === "&") return "&" + "amp;";
    if (ch === "<") return "&" + "lt;";
    if (ch === ">") return "&" + "gt;";
    if (ch === '"') return "&" + "quot;";
    return "&" + "#39;";
  });
}

function fold(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

function haystack(q) {
  const c = contentOf(q);
  return fold(
    [q.n, q.label, c.prompt, q.parte, q.cap, q.sec, ...(c.spirit || []), ...(c.kardec || [])].join(" ")
  );
}

function searchQuestions(raw) {
  const qstr = fold(raw).trim();
  if (!qstr) return [];
  const tokens = qstr.split(/\s+/).filter(Boolean);
  const exact = normalizeN(raw);
  const out = [];
  for (const q of state.data.questions) {
    if (q.n === exact) {
      out.unshift(q);
      continue;
    }
    const hay = haystack(q);
    if (tokens.every((tok) => hay.includes(tok))) out.push(q);
    if (out.length >= 80) break;
  }
  return out;
}

function capBits(cap) {
  const raw = String(cap || "");
  const m = raw.match(/^(\d+\.\d+)\.\s*(.*)$/) || raw.match(/^(\d+)\.\s*(.*)$/);
  return { num: m ? m[1] : "", title: short(raw) };
}

function indexByParte() {
  const parteOrder = [];
  const byParte = new Map();
  for (const q of state.data.questions) {
    const parte = q.parte || "";
    if (!byParte.has(parte)) {
      byParte.set(parte, { parte, caps: new Map() });
      parteOrder.push(parte);
    }
    const g = byParte.get(parte);
    if (!g.caps.has(q.cap)) {
      g.caps.set(q.cap, { cap: q.cap, count: 0, secs: new Set() });
    }
    const c = g.caps.get(q.cap);
    c.count += 1;
    if (q.sec) c.secs.add(q.sec);
  }
  return parteOrder.map((parte) => {
    const g = byParte.get(parte);
    return {
      parte,
      caps: [...g.caps.values()].map((c) => {
        const bits = capBits(c.cap);
        return { cap: c.cap, num: bits.num, title: bits.title, count: c.count, secCount: c.secs.size || 1 };
      }),
    };
  });
}

function paintHome() {
  const groups = indexByParte();
  const hist = state.history.map((n) => state.byN.get(n)).filter(Boolean);
  return `${topBar()}
    <main class="page index">
      <div class="index-head">
        <div class="kicker"><i data-icon="sparkles" data-icon-size="22" class="brand"></i></div>
        <h1 class="book-title">${t("book")}</h1>
        <p class="tagline">${t("study")}</p>
        <div class="index-actions">
          <button class="chip ${state.panel === "search" ? "on" : ""}" data-act="panel-search"><i data-icon="search"></i> ${t("searchBtn")}</button>
          <button class="chip ${state.panel === "history" ? "on" : ""}" data-act="panel-history"><i data-icon="history"></i> ${t("history")}</button>
        </div>
        ${
          state.panel === "history"
            ? `<label class="search-wrap">
          <input class="search" data-act="hist-filter" value="${esc(state.histFilter)}" placeholder="${t("filter")}" />
          ${state.histFilter ? `<button class="clear" type="button" data-act="clear-hist" aria-label="Limpar">×</button>` : ""}
        </label>
        <div class="history">${
          hist.filter((q) => !state.histFilter.trim() || fold(contentOf(q).prompt + " " + q.n + " " + q.label).includes(fold(state.histFilter))).length
            ? hist
                .filter((q) => !state.histFilter.trim() || fold(contentOf(q).prompt + " " + q.n + " " + q.label).includes(fold(state.histFilter)))
                .map(
                  (q) => `<button class="row" data-go="#/q/${q.n}">
            <span class="n">${esc(pretty(q.n))}</span>
            <span><strong>${esc(contentOf(q).prompt || q.label)}</strong></span>
          </button>`
                )
                .join("")
            : `<p class="empty">${t("emptyHistory")}</p>`
        }</div>`
            : state.panel === "search"
              ? `<label class="search-wrap">
          <input class="search" data-act="search" value="${esc(state.qSearch)}" placeholder="${t("search")}" />
          ${state.qSearch ? `<button class="clear" type="button" data-act="clear-search" aria-label="Limpar">×</button>` : ""}
          <i data-icon="search"></i>
        </label>`
              : ""
        }
      </div>
      ${
        (() => {
          const qstr = state.panel === "search" ? state.qSearch.trim() : "";
          if (!qstr) {
            return groups
              .map(
                (g) => `<section class="index-parte">
        <h2>${esc(short(g.parte))}</h2>
        <div class="list">
          ${g.caps
            .map(
              (c) => `<button class="row" data-go="#/cap/${encodeURIComponent(c.cap)}">
            <span class="n">${esc(c.num)}</span>
            <span><strong>${esc(c.title)}</strong>
              <small>${c.secCount} ${t("sections")} · ${c.count} ${t("qs")}</small>
            </span>
          </button>`
            )
            .join("")}
        </div>
      </section>`
              )
              .join("");
          }
          const hits = searchQuestions(state.qSearch);
          return `<p class="hint">${hits.length} ${t("searchHits")}</p>
        <div class="list" data-list="search">${
          hits.length ? hits.map((q) => rowHTML(q, { starToggle: true })).join("") : `<p class="empty">${t("searchEmpty")}</p>`
        }</div>`;
        })()
      }
    </main>
    <p class="legal-foot"><a href="${LEGAL_URL}" target="_blank" rel="noopener">${t("legalFoot")}</a></p>
    ${tabBar("home")}`;
}

function formatText(text, spans) {
  let out = applyHighlights(text, spans);
  out = out.replace(/\n/g, "<br>");
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  return out;
}

function applyHighlights(text, spans) {
  if (!spans || !spans.length) return esc(text);
  let out = esc(text);
  for (const s of spans) {
    const needle = esc(s.text || "");
    if (!needle) continue;
    const col = colorId(s.color);
    out = out.replace(needle, `<mark class="mark mark-${col}">${needle}</mark>`);
  }
  return out;
}

function paintQ(n) {
  const q = state.byN.get(n);
  if (!q) return paintHome();
  state.lastQ = n;
  rememberQ(n);
  const c = contentOf(q);
  const fav = state.marks.favs.includes(n);
  const hs = state.marks.highlights[n] || [];
  const note = state.marks.notes[n] || "";
  const spirit = (c.spirit || []).map((p) => `<p>${formatText(p, hs)}</p>`).join("");
  const kardec = (c.kardec || []).map((p) => `<p>${formatText(p, hs)}</p>`).join("");
  const shown = !!state.pref.showAnswers;
  return `${topBar(crumbsFor(q))}
    <main class="page">
      <div class="qhead">
        <button class="iconbtn" data-go="${q.prev ? `#/q/${q.prev}` : ""}" ${q.prev ? "" : "disabled"} title="${t("prev")}">
          <i data-icon="chevron-left"></i>
        </button>
        <div class="qnum">${esc(q.label)}</div>
        <div class="tools">
          <button class="iconbtn" data-act="answers" title="${shown ? t("hideAnswers") : t("showAnswers")}">
            <i data-icon="${shown ? "eye" : "eye-off"}"></i>
          </button>
          <button class="iconbtn star ${fav ? "on" : ""}" data-act="fav" title="${t("fav")}">${iconStar(fav)}</button>
        </div>
        <button class="iconbtn" data-go="${q.next ? `#/q/${q.next}` : ""}" ${q.next ? "" : "disabled"} title="${t("next")}">
          <i data-icon="chevron-right"></i>
        </button>
      </div>
      <h1 class="prompt">${esc(c.prompt || "")}</h1>
      ${
        shown
          ? `${spirit ? `<section class="block"><h2>${t("spirit")}</h2>${spirit}</section>` : ""}
      ${kardec ? `<section class="block"><h2>${t("kardec")}</h2>${kardec}</section>` : ""}
      <p class="hint">${t("highlightHint")}</p>
      <div class="grifo-row">
        ${GRIFO.map((c) => `<button class="swatch ${colorId(state.pref.grifoColor) === c.id ? "on" : ""}" data-act="grifo-color" data-color="${c.id}" title="${esc(colorLabel(c.id))}" style="--sw:${c.hex}"></button>`).join("")}
        <button class="chip" data-act="highlight"><i data-icon="highlighter"></i> ${t("highlight")}</button>
      </div>`
          : ``
      }
      <div class="grifo-row">
        <button class="chip ${state.noteOpen ? "on" : ""}" data-act="toggle-note"><i data-icon="pencil"></i> ${t("note")}${note && !state.noteOpen ? " ·" : ""}</button>
        <span class="chip-side">${t("noteScope")}</span>
      </div>
      ${
        state.noteOpen
          ? `<textarea class="note" id="note" data-act="note"${t("notePh") ? ` placeholder="${esc(t("notePh"))}"` : ""}>${esc(note)}</textarea>`
          : ""
      }
      <aside class="comments" id="talk">
        <div class="comments-head">
          <button class="chip" data-act="comente"><i data-icon="message-circle"></i> ${t("comments")}</button>
          <span class="chip-side">${t("commentsScope")}</span>
          <button class="chip" data-act="share" title="${t("share")}"><i data-icon="share-2"></i> ${t("share")}</button>
        </div>
      </aside>
    </main>
    ${tabBar("q")}`;
}

function shareUrl(n) {
  return `https://lde.doutrina.org/${n ? `#/q/${n}` : ""}`;
}

function toast(msg) {
  document.querySelectorAll(".toast").forEach((el) => el.remove());
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

async function shareQuestion() {
  const r = parseHash();
  const q = r.name === "q" ? state.byN.get(r.n) : null;
  const c = q ? contentOf(q) : null;
  const url = q ? shareUrl(q.n) : shareUrl();
  const title = q ? `${q.label} — ${c.prompt || ""}` : document.title;
  const text = c?.prompt ? `${title}\n${url}` : url;
  try {
    if (navigator.share) {
      await navigator.share({ title, text: c?.prompt || title, url });
      return;
    }
  } catch (err) {
    if (err && err.name === "AbortError") return;
  }
  try {
    await navigator.clipboard.writeText(text);
    toast(t("copied"));
  } catch {
    window.prompt(t("shareFail"), url);
  }
}

function pretty(n) {
  const m = String(n).match(/^(\d+)([a-z]*)$/);
  if (!m) return n;
  return m[2] ? `${m[1]}.${m[2]}` : m[1];
}

function paintList(filter) {
  const qAll = state.data.questions;
  const isFav = (q) => state.marks.favs.includes(q.n);
  const isMark = (q) => (state.marks.highlights[q.n] || []).length;
  const isColor = (q) => (state.marks.highlights[q.n] || []).some((h) => colorId(h.color) === filter);
  const isNote = (q) => String(state.marks.notes[q.n] || "").trim();
  let rows = qAll.filter((q) => isFav(q) || isMark(q) || isNote(q));
  if (filter === "fav") rows = qAll.filter(isFav);
  if (filter === "marks") rows = qAll.filter(isMark);
  if (GRIFO_IDS.includes(filter)) rows = qAll.filter(isColor);
  const empty = filter === "fav" ? t("emptyFav") : filter === "marks" || GRIFO_IDS.includes(filter) ? t("emptyMarks") : t("emptyAll");
  return `${topBar(`<strong>${esc(t("notebook"))}</strong>`)}
    <main class="page">
      <div class="filters">
        <button class="chip ${filter === "all" ? "on" : ""}" data-go="#/caderno">${t("allMarks")}</button>
        <button class="chip ${filter === "fav" ? "on" : ""}" data-go="#/caderno/fav">${t("fav")}</button>
        <button class="chip ${filter === "marks" || GRIFO_IDS.includes(filter) ? "on" : ""}" data-go="#/caderno/marks">${t("marks")}</button>
      </div>
      ${
        filter === "marks" || GRIFO_IDS.includes(filter)
          ? `<div class="filters">${GRIFO.map(
              (c) =>
                `<button class="chip swatch-chip ${filter === c.id ? "on" : ""}" data-go="#/caderno/${c.id}" title="${esc(colorLabel(c.id))}"><span class="swatch" style="--sw:${c.hex}"></span>${esc(colorLabel(c.id))}</button>`
            ).join("")}</div>`
          : ""
      }
      <label class="search-wrap">
        <input class="search" data-act="filter" placeholder="${t("filter")}" />
        <button class="clear" type="button" data-act="clear-filter" hidden aria-label="Limpar">×</button>
      </label>
      <div class="index-actions">
        <button class="chip" data-act="export">${t("export")}</button>
        <label class="chip"><input type="file" accept="application/json" hidden data-act="import" />${t("import")}</label>
      </div>
      <div class="list" data-list="caderno">
        ${rows.length ? rows.map((q) => rowHTML(q, { starToggle: true })).join("") : `<p class="empty">${empty}</p>`}
      </div>
    </main>
    ${tabBar("caderno")}`;
}

function rowHTML(q, opts = {}) {
  const c = contentOf(q);
  const excerpt =
    (state.marks.highlights[q.n] || []).map((h) => h.text).filter(Boolean)[0] ||
    String(state.marks.notes[q.n] || "").trim();
  const fav = state.marks.favs.includes(q.n);
  const star = opts.starToggle
    ? `<button class="iconbtn star ${fav ? "on" : ""}" data-act="fav-toggle" data-n="${esc(q.n)}">${iconStar(fav)}</button>`
    : fav
      ? `<span class="star on">${iconStar(true)}</span>`
      : `<span></span>`;
  return `<div class="row">
    <button class="row-main" data-go="#/q/${q.n}">
      <span class="n">${esc(pretty(q.n))}</span>
      <span><strong>${esc(c.prompt || q.label)}</strong>
        <small>${esc(short(q.cap || ""))}${q.sec ? " · " + esc(short(q.sec)) : ""}</small>
        ${excerpt ? `<small>“${esc(excerpt)}”</small>` : ""}
      </span>
    </button>
    ${star}
  </div>`;
}

function paintParte(name) {
  const rows = state.data.questions.filter((q) => q.parte === name);
  return `${topBar(`<div class="crumbs"><button class="pill" data-go="#/">${t("bookCrumb")}</button></div>`)}
    <main class="page">
      <h1>${esc(name)}</h1>
      <div class="list">${rows.map(rowHTML).join("")}</div>
    </main>
    ${tabBar("home")}`;
}
function paintCap(name) {
  const rows = state.data.questions.filter((q) => q.cap === name);
  const order = [];
  const counts = new Map();
  for (const q of rows) {
    const key = q.sec || q.cap;
    if (!counts.has(key)) {
      counts.set(key, { sec: q.sec, title: short(q.sec || q.cap), count: 0 });
      order.push(key);
    }
    counts.get(key).count += 1;
  }
  return `${topBar(`<nav class="crumbs">
      <button class="pill" data-go="#/">${t("bookCrumb")}</button>
      <button class="pill">${esc(short(name))}</button>
    </nav>`)}
    <main class="page">
      <h1 class="prompt">${esc(short(name))}</h1>
      <div class="list">
        ${order
          .map((key) => {
            const s = counts.get(key);
            const href = s.sec ? `#/sec/${encodeURIComponent(s.sec)}` : `#/q/${rows[0].n}`;
            return `<button class="row" data-go="${href}">
          <span><strong>${esc(s.title)}</strong>
            <small>${s.count} ${t("qs")}</small>
          </span>
        </button>`;
          })
          .join("")}
      </div>
    </main>
    ${tabBar("home")}`;
}

function paintSec(name) {
  const rows = state.data.questions.filter((q) => q.sec === name);
  const cap = rows[0]?.cap;
  return `${topBar(`<nav class="crumbs">
      <button class="pill" data-go="#/">${t("bookCrumb")}</button>
      ${cap ? `<button class="pill" data-go="#/cap/${encodeURIComponent(cap)}">${esc(short(cap))}</button>` : ""}
      <button class="pill">${esc(short(name))}</button>
    </nav>`)}
    <main class="page">
      <h1>${esc(short(name))}</h1>
      <div class="list">${rows.map(rowHTML).join("")}</div>
    </main>
    ${tabBar("home")}`;
}

function readHyvorUser() {
  const el = document.querySelector("hyvor-talk-comments");
  try {
    const user = el && el.api && el.api.auth && el.api.auth.user ? el.api.auth.user() : null;
    if (user) state.hyvorUser = user;
  } catch {}
}

function settingsModal() {
  if (!state.showSettings) return "";
  const theme = state.pref.theme || "system";
  const enOn = !!(state.data && state.data.enReady);
  const user = state.hyvorUser;
  const pic = user && user.picture_url ? `<img class="avatar" src="${esc(user.picture_url)}" alt="" />` : "";
  const profile = user
    ? `<div class="hyvor-row">
        ${pic}
        <div>
          <strong>${esc(user.name || user.username || "")}</strong>
          <small>${esc(user.username ? "@" + user.username : user.type || "hyvor")}</small>
        </div>
        ${user.username ? `<a class="chip" href="https://hyvor.com/@${encodeURIComponent(user.username)}" target="_blank" rel="noopener">Hyvor</a>` : ""}
        <button class="chip" data-act="hyvor-out">${t("hyvorOut")}</button>
      </div>`
    : `<p class="hint">${t("hyvorOff")}</p>`;
  return `<div class="modal-back" data-act="close-settings">
    <div class="modal" role="dialog" aria-label="${t("settings")}" data-act="modal-box">
      <div class="modal-head">
        <strong>${t("settings")}</strong>
        <button class="iconbtn" data-act="close-settings" title="${t("close")}">×</button>
      </div>
      <p class="hint">${t("theme")}</p>
      <div class="filters">
        <button class="chip ${theme === "system" ? "on" : ""}" data-act="theme-set" data-theme="system">${t("themeSystem")}</button>
        <button class="chip ${theme === "light" ? "on" : ""}" data-act="theme-set" data-theme="light">${t("themeLight")}</button>
        <button class="chip ${theme === "dark" ? "on" : ""}" data-act="theme-set" data-theme="dark">${t("themeDark")}</button>
      </div>
      <p class="hint">${t("langLabel")}</p>
      <div class="filters">
        <button class="chip ${state.pref.locale === "en-US" ? "" : "on"}" data-act="lang-set" data-lang="pt-BR">PT-BR</button>
        <button class="chip ${state.pref.locale === "en-US" ? "on" : ""}" data-act="lang-set" data-lang="en-US" ${enOn ? "" : "disabled"} title="${t("langOff")}">EN-US</button>
      </div>
      <p class="hint">${t("answersDefault")}</p>
      <div class="filters">
        <button class="chip ${state.pref.showAnswers ? "on" : ""}" data-act="answers-set" data-on="1">${t("showAnswers")}</button>
        <button class="chip ${state.pref.showAnswers ? "" : "on"}" data-act="answers-set" data-on="0">${t("hideAnswers")}</button>
      </div>
      <p class="hint">${t("grifoColors")}</p>
      <div class="color-labels">
        ${GRIFO.map((c) => `<label class="color-label"><span class="swatch" style="--sw:${c.hex}"></span><input data-act="color-label" data-color="${c.id}" value="${esc(colorLabel(c.id))}" /></label>`).join("")}
      </div>
      <p class="hint">${t("hyvorAccount")}</p>
      ${profile}
      <p class="hint">${t("legal")}</p>
      <a class="chip" href="${LEGAL_URL}" target="_blank" rel="noopener">shklr.org</a>
      <p class="hint">${t("repo")}</p>
      <a class="chip" href="${REPO_URL}" target="_blank" rel="noopener">github.com/sergioSHKLR/lde-q</a>
      <p class="hint">${t("version")}</p>
      <p class="version">${APP_VERSION}</p>
    </div>
  </div>`;
}

function dismissOnboard(goFirst) {
  try {
    localStorage.setItem(ONBOARD_KEY, "1");
  } catch {}
  state.showOnboard = false;
  if (goFirst) go("#/q/1");
  else render();
}

function onboardCard() {
  if (!state.showOnboard) return "";
  return `<div class="modal-back" data-act="onboard-skip">
    <div class="modal" role="dialog" aria-label="${t("study")}" data-act="modal-box">
      <div class="kicker"><i data-icon="sparkles" data-icon-size="22" class="brand"></i></div>
      <p class="tagline onboard-slogan">${t("study")}</p>
      <ul class="onboard-list">
        <li>${t("onboardAnote")}</li>
        <li>${t("onboardComente")}</li>
        <li>${t("onboardShare")}</li>
        <li>${t("onboardEye")}</li>
      </ul>
      <button class="chip on" data-act="onboard-start">${t("onboardStart")}</button>
      <p class="legal-foot"><a href="${LEGAL_URL}" target="_blank" rel="noopener">${t("legalFoot")}</a></p>
    </div>
  </div>`;
}

function destroyTalk() {
  document.querySelectorAll("hyvor-talk-comments").forEach((el) => el.remove());
}

function mountTalk(n) {
  destroyTalk();
  const host = document.getElementById("talk");
  if (!host || !n) return;
  const el = document.createElement("hyvor-talk-comments");
  el.setAttribute("website-id", HYVOR_WEBSITE_ID);
  el.setAttribute("page-id", "lde:" + n);
  el.setAttribute("page-language", state.pref.locale === "en-US" ? "en-US" : "pt-BR");
  el.setAttribute("colors", document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  host.appendChild(el);
  setTimeout(readHyvorUser, 1200);
  setTimeout(readHyvorUser, 4000);
}

function render() {
  applyTheme();
  const r = parseHash();
  const root = document.getElementById("app");
  root.className = "app";
  destroyTalk();
  let html = "";
  if (r.name === "q") html = paintQ(r.n);
  else if (r.name === "caderno") html = paintList(r.filter || "all");
  else if (r.name === "parte") html = paintParte(r.parte);
  else if (r.name === "cap") html = paintCap(r.cap);
  else if (r.name === "sec") html = paintSec(r.sec);
  else html = paintHome();
  root.innerHTML = html + settingsModal() + onboardCard();
  hydrateIcons(root);
  if (r.name === "q") mountTalk(r.n);
  if (state.showSettings) readHyvorUser();
  if (r.name === "home" && state.focusSearch) {
    state.focusSearch = false;
    const el = document.querySelector("[data-act=search]");
    if (el) el.focus();
  }
}

function toggleFav(n) {
  if (!n) return;
  const set = new Set(state.marks.favs);
  if (set.has(n)) set.delete(n);
  else set.add(n);
  state.marks.favs = [...set];
  saveMarks();
  render();
}

function onClick(e) {
  const actEl = e.target.closest("[data-act]");
  if (actEl) {
    const a = actEl.dataset.act;
    if (a === "fav-toggle") {
      e.preventDefault();
      e.stopPropagation();
      toggleFav(actEl.dataset.n);
      return;
    }
    if (a === "answers") {
      e.preventDefault();
      e.stopPropagation();
      state.pref.showAnswers = !state.pref.showAnswers;
      savePref();
      render();
      return;
    }
    if (a === "modal-box") {
      e.stopPropagation();
      return;
    }
    if (a === "onboard-start") {
      e.preventDefault();
      dismissOnboard(true);
      return;
    }
    if (a === "onboard-skip") {
      e.preventDefault();
      dismissOnboard(false);
      return;
    }
    if (a === "open-settings") {
      e.preventDefault();
      state.showSettings = true;
      render();
      return;
    }
    if (a === "close-settings") {
      e.preventDefault();
      state.showSettings = false;
      render();
      return;
    }
    if (a === "clear-search") {
      e.preventDefault();
      state.qSearch = "";
      render();
      const el = document.querySelector("[data-act=search]");
      if (el) el.focus();
      return;
    }
    if (a === "clear-hist") {
      e.preventDefault();
      state.histFilter = "";
      render();
      const el = document.querySelector("[data-act=hist-filter]");
      if (el) el.focus();
      return;
    }
    if (a === "clear-filter") {
      e.preventDefault();
      const input = document.querySelector("[data-act=filter]");
      if (input) {
        input.value = "";
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
      const x = actEl;
      if (x) x.hidden = true;
      return;
    }
    if (a === "comente") {
      e.preventDefault();
      const host = document.getElementById("talk");
      if (host) host.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (a === "toggle-note") {
      e.preventDefault();
      state.noteOpen = !state.noteOpen;
      render();
      const el = document.getElementById("note");
      if (el) el.focus();
      return;
    }
    if (a === "answers-set") {
      e.preventDefault();
      state.pref.showAnswers = actEl.dataset.on === "1";
      savePref();
      render();
      return;
    }
    if (a === "grifo-color") {
      e.preventDefault();
      state.pref.grifoColor = colorId(actEl.dataset.color);
      savePref();
      render();
      return;
    }
    if (a === "lang-set") {
      e.preventDefault();
      if (actEl.disabled || actEl.getAttribute("disabled") !== null) return;
      const lang = actEl.dataset.lang;
      if (lang === "en-US" && !state.data?.enReady) return;
      state.pref.locale = lang === "en-US" ? "en-US" : "pt-BR";
      savePref();
      render();
      return;
    }
    if (a === "theme-set") {
      e.preventDefault();
      state.pref.theme = actEl.dataset.theme || "system";
      savePref();
      render();
      return;
    }
    if (a === "hyvor-out") {
      e.preventDefault();
      try {
        const el = document.querySelector("hyvor-talk-comments");
        if (el && el.api && el.api.auth && el.api.auth.logout) el.api.auth.logout();
      } catch {}
      state.hyvorUser = null;
      render();
      return;
    }
  }
  const goEl = e.target.closest("[data-go]");
  if (goEl && goEl.dataset.go) {
    e.preventDefault();
    go(goEl.dataset.go);
    return;
  }
  const act = e.target.closest("[data-act]");
  if (!act) return;
  const a = act.dataset.act;
  if (a === "theme") {
    const order = ["system", "light", "dark"];
    const i = order.indexOf(state.pref.theme);
    state.pref.theme = order[(i + 1) % order.length];
    savePref();
    render();
  }
  if (a === "lang") {
    if (!state.data?.enReady) return;
    state.pref.locale = state.pref.locale === "en-US" ? "pt-BR" : "en-US";
    savePref();
    render();
  }
  if (a === "open-search") {
    state.panel = "search";
    state.focusSearch = true;
    go("#/");
    return;
  }
  if (a === "panel-history") {
    state.panel = state.panel === "history" ? null : "history";
    render();
    const el = document.querySelector("[data-act=hist-filter]");
    if (el) el.focus();
    return;
  }
  if (a === "panel-search") {
    state.panel = state.panel === "search" ? null : "search";
    render();
    const el = document.querySelector("[data-act=search]");
    if (el) el.focus();
    return;
  }
  if (a === "toggle-jump") {
    const el = document.getElementById("jump");
    if (!el) return;
    el.style.display = el.style.display === "block" ? "none" : "block";
    el.focus();
  }
  if (a === "fav") {
    const r = parseHash();
    if (r.name !== "q") return;
    toggleFav(r.n);
  }
  if (a === "answers") {
    state.pref.showAnswers = !state.pref.showAnswers;
    savePref();
    render();
  }
  if (a === "share") {
    shareQuestion();
    return;
  }
  if (a === "highlight") {
    const r = parseHash();
    const sel = (window.getSelection && String(window.getSelection())) || "";
    const text = sel.trim();
    if (!text || r.name !== "q") return;
    const arr = state.marks.highlights[r.n] || [];
    if (!arr.some((h) => h.text === text)) arr.push({ text, color: colorId(state.pref.grifoColor) });
    state.marks.highlights[r.n] = arr;
    saveMarks();
    render();
  }
  if (a === "export") {
    const blob = new Blob([JSON.stringify(state.marks, null, 2)], { type: "application/json" });
    const aEl = document.createElement("a");
    aEl.href = URL.createObjectURL(blob);
    aEl.download = "lde-q-marks.json";
    aEl.click();
  }
}

function onChange(e) {
  if (e.target.dataset.act === "import" && e.target.files?.[0]) {
    const f = e.target.files[0];
    f.text().then((txt) => {
      const data = JSON.parse(txt);
      state.marks = { v: 1, favs: [], highlights: {}, notes: {}, ...data };
      saveMarks();
      render();
    });
  }
}

function onInput(e) {
  if (e.target.dataset.act === "note") {
    const r = parseHash();
    if (r.name !== "q") return;
    state.marks.notes[r.n] = e.target.value;
    saveMarks();
  }
  if (e.target.dataset.act === "search") {
    state.qSearch = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const el = document.querySelector("[data-act=search]");
    if (el) {
      el.focus();
      try {
        el.setSelectionRange(pos, pos);
      } catch {}
    }
  }
  if (e.target.dataset.act === "hist-filter") {
    state.histFilter = e.target.value;
    const pos = e.target.selectionStart;
    render();
    const el = document.querySelector("[data-act=hist-filter]");
    if (el) {
      el.focus();
      try {
        el.setSelectionRange(pos, pos);
      } catch {}
    }
  }
  if (e.target.dataset.act === "color-label") {
    const id = e.target.dataset.color;
    if (!GRIFO_IDS.includes(id)) return;
    state.pref.colorLabels = { ...(state.pref.colorLabels || {}), [id]: e.target.value };
    savePref();
  }
  if (e.target.dataset.act === "filter") {
    const q = fold(e.target.value).trim();
    const x = e.target.parentElement && e.target.parentElement.querySelector(".clear");
    if (x) x.hidden = !e.target.value;
    document.querySelectorAll("[data-list] .row").forEach((row) => {
      row.style.display = !q || fold(row.textContent).includes(q) ? "" : "none";
    });
  }
}

function onKey(e) {
  if (e.target.id === "jump" && e.key === "Enter") {
    const n = normalizeN(e.target.value);
    if (state.byN.has(n)) go(`#/q/${n}`);
  }
  if (e.target.dataset.act === "search" && e.key === "Enter") {
    const n = normalizeN(e.target.value);
    if (state.byN.has(n)) go(`#/q/${n}`);
  }
}

async function boot() {
  applyTheme();
  const root = document.getElementById("app");
  root.className = "app";
  root.innerHTML = "<main class='home'><p class='sub'>Carregando…</p></main>";
  try {
    const res = await fetch("data/questions.json");
    if (!res.ok) throw new Error("catalog " + res.status);
    state.data = await res.json();
    for (const q of state.data.questions) state.byN.set(q.n, q);
    state.lastQ = state.history.find((n) => state.byN.has(n)) || "1";
    root.addEventListener("click", onClick);
    root.addEventListener("change", onChange);
    root.addEventListener("input", onInput);
    root.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", render);
    render();
    if (location.protocol === "https:" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  } catch (err) {
    root.innerHTML = "<main class='home'><p>Falha ao carregar o catálogo.</p><p class='sub'>" + String(err) + "</p></main>";
  }
}

boot();

