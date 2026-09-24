import { hydrateIcons } from "./icons.js";

const HYVOR_WEBSITE_ID = "16128";
const MARKS_KEY = "lde-q-marks-v1";
const PREF_KEY = "lde-q-pref-v1";

const ui = {
  "pt-BR": {
    book: "O Livro dos Espíritos",
    start: "Começar",
    resume: "Continuar",
    jump: "Saltar…",
    emptyFav: "Ainda sem favoritas. Toca na estrela.",
    emptyMarks: "Ainda sem destaques nem notas.",
    qs: "questões",
    sections: "secções",
    jumpPh: "22 ou 22a",
    study: "Leia · Comente · Compartilhe",
    theme: "Tema",
    langOff: "EN-US quando o catálogo inglês existir",
    spirit: "Espíritos",
    kardec: "Kardec",
    note: "Nota pessoal (fica no teu ficheiro)",
    notePh: "Escreve uma nota só tua…",
    fav: "Favoritas",
    marks: "Destaques",
    home: "Início",
    q: "Questão",
    all: "Todas",
    emptyFav: "Ainda sem favoritas. Toca na estrela.",
    emptyMarks: "Ainda sem destaques nem notas.",
    comments: "Discussão pública (Hyvor Talk)",
    shareFail: "Copia o endereço da questão para partilhar.",
    copied: "Ligação copiada",
    export: "Exportar caderno",
    import: "Importar caderno",
    highlightHint: "Seleciona texto e toca em Destacar",
    highlight: "Destacar",
    bookCrumb: "Livro",
    filter: "Filtrar…",
    showAnswers: "Mostrar respostas",
    hideAnswers: "Ocultar respostas",
    answersHidden: "Respostas ocultas — estuda a pergunta primeiro.",
  },
  "en-US": {
    book: "The Spirits’ Book",
    start: "Start",
    resume: "Continue",
    jump: "Jump…",
    emptyFav: "No favorites yet. Tap the star.",
    emptyMarks: "No highlights or notes yet.",
    qs: "questions",
    sections: "sections",
    jumpPh: "22 or 22a",
    study: "Read · Comment · Share",
    theme: "Theme",
    langOff: "EN-US when the English catalog exists",
    spirit: "Spirits",
    kardec: "Kardec",
    note: "Personal note (stays in your file)",
    notePh: "Write a note only you hold…",
    fav: "Favorites",
    marks: "Highlights",
    home: "Home",
    q: "Question",
    all: "All",
    emptyFav: "No favorites yet. Tap the star.",
    emptyMarks: "No highlights or notes yet.",
    comments: "Public discussion (Hyvor Talk)",
    shareFail: "Copy the question URL to share.",
    copied: "Link copied",
    export: "Export notebook",
    import: "Import notebook",
    highlightHint: "Select text, then tap Highlight",
    highlight: "Highlight",
    bookCrumb: "Book",
    filter: "Filter…",
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
  sel: "",
};

function loadPref() {
  try {
    return { theme: "system", locale: "pt-BR", showAnswers: false, ...JSON.parse(localStorage.getItem(PREF_KEY) || "{}") };
  } catch {
    return { theme: "system", locale: "pt-BR", showAnswers: false };
  }
}
function savePref() {
  localStorage.setItem(PREF_KEY, JSON.stringify(state.pref));
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
function t(key) {
  const loc = state.pref.locale === "en-US" ? "en-US" : "pt-BR";
  return (ui[loc] && ui[loc][key]) || ui["pt-BR"][key] || key;
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
  if (parts[0] === "fav") return { name: "fav" };
  if (parts[0] === "marks") return { name: "marks" };
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
  const enOn = !!(state.data && state.data.enReady);
  return `<header class="top">
    <div class="grow">${extra}</div>
    <div class="tools">
      <button class="iconbtn" data-act="theme" title="${t("theme")}"><i data-icon="${document.documentElement.dataset.theme === "dark" ? "moon" : "sun"}"></i></button>
      <button class="lang" data-act="lang" data-off="${enOn ? "0" : "1"}" ${enOn ? "" : "disabled"} title="${t("langOff")}"><i data-icon="lang-pt" data-icon-size="16"></i><span>/</span><i data-icon="lang-en" data-icon-size="16"></i></button>
    </div>
  </header>`;
}

function tabBar(active) {
  return `<nav class="tabbar">
    <button data-go="#/" class="${active === "home" ? "on" : ""}"><i data-icon="house"></i><span>${t("home")}</span></button>
    <button data-go="#/q/${state.lastQ || "1"}" class="${active === "q" ? "on" : ""}"><i data-icon="book"></i><span>${t("q")}</span></button>
    <button data-go="#/fav" class="${active === "fav" ? "on" : ""}"><i data-icon="star"></i><span>${t("fav")}</span></button>
    <button data-go="#/marks" class="${active === "marks" ? "on" : ""}"><i data-icon="highlighter"></i><span>${t("marks")}</span></button>
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
  const last = state.lastQ && state.byN.has(state.lastQ) ? state.lastQ : "1";
  const resume = last !== "1";
  const groups = indexByParte();
  return `${topBar(`<strong>LDE</strong>`)}
    <main class="page index">
      <div class="index-head">
        <div class="kicker"><i data-icon="sparkles" data-icon-size="16" class="brand"></i> ${t("book")}</div>
        <p class="tagline">${t("study")}</p>
        <div class="index-actions">
          <button class="chip on" data-go="#/q/${last}">${resume ? t("resume") : t("start")} Q.${pretty(last)}</button>
          <button class="chip" data-act="toggle-jump">${t("jump")}</button>
          <button class="chip" data-act="export">${t("export")}</button>
          <label class="chip"><input type="file" accept="application/json" hidden data-act="import" />${t("import")}</label>
        </div>
        <input class="jump" id="jump" inputmode="text" placeholder="${t("jumpPh")}" />
      </div>
      ${groups
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
        .join("")}
    </main>
    ${tabBar("home")}`;
}

function applyHighlights(text, spans) {
  if (!spans || !spans.length) return esc(text);
  let out = esc(text);
  for (const s of spans) {
    const needle = esc(s.text || "");
    if (!needle) continue;
    out = out.replace(needle, `<mark class="mark">${needle}</mark>`);
  }
  return out;
}

function paintQ(n) {
  const q = state.byN.get(n);
  if (!q) return paintHome();
  state.lastQ = n;
  const c = contentOf(q);
  const fav = state.marks.favs.includes(n);
  const hs = state.marks.highlights[n] || [];
  const note = state.marks.notes[n] || "";
  const spirit = (c.spirit || []).map((p) => `<p>${applyHighlights(p, hs)}</p>`).join("");
  const kardec = (c.kardec || []).map((p) => `<p>${applyHighlights(p, hs)}</p>`).join("");
  const shown = !!state.pref.showAnswers;
  return `${topBar(crumbsFor(q))}
    <main class="page">
      <div class="qhead">
        <div class="qnum">${esc(q.label)}</div>
        <div class="tools">
          <button class="iconbtn star ${fav ? "on" : ""}" data-act="fav" title="${t("fav")}">${iconStar(fav)}</button>
          <button class="iconbtn" data-act="answers" title="${shown ? t("hideAnswers") : t("showAnswers")}">
            <i data-icon="${shown ? "eye" : "eye-off"}"></i>
          </button>
          <button class="iconbtn" data-act="share" title="Share"><i data-icon="share-2"></i></button>
        </div>
      </div>
      <h1 class="prompt">${esc(c.prompt || "")}</h1>
      ${
        shown
          ? `${spirit ? `<section class="block"><h2>${t("spirit")}</h2>${spirit}</section>` : ""}
      ${kardec ? `<section class="block"><h2>${t("kardec")}</h2>${kardec}</section>` : ""}
      <p class="hint">${t("highlightHint")}</p>
      <button class="chip" data-act="highlight"><i data-icon="highlighter"></i> ${t("highlight")}</button>`
          : ``
      }
      <div class="qnav">
        <button data-go="${q.prev ? `#/q/${q.prev}` : ""}" ${q.prev ? "" : "disabled"}><i data-icon="chevron-left"></i>${q.prev ? " Q." + pretty(q.prev) : ""}</button>
        <button data-go="${q.next ? `#/q/${q.next}` : ""}" ${q.next ? "" : "disabled"}>Q.${q.next ? pretty(q.next) : ""} <i data-icon="chevron-right"></i></button>
      </div>
      <label class="hint" for="note">${t("note")}</label>
      <textarea class="note" id="note" data-act="note" placeholder="${t("notePh")}">${esc(note)}</textarea>
      <aside class="comments" id="talk"></aside>
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

function paintList(kind) {
  const qAll = state.data.questions;
  let rows = qAll;
  if (kind === "fav") rows = qAll.filter((q) => state.marks.favs.includes(q.n));
  if (kind === "marks") {
    rows = qAll.filter((q) => (state.marks.highlights[q.n] || []).length || String(state.marks.notes[q.n] || "").trim());
  }
  const title = kind === "fav" ? t("fav") : t("marks");
  const empty = kind === "fav" ? t("emptyFav") : t("emptyMarks");
  return `${topBar(`<strong>${esc(title)}</strong>`)}
    <main class="page">
      <input class="search" data-act="filter" placeholder="${t("filter")}" />
      <div class="list" data-list="${kind}">
        ${rows.length ? rows.map((q) => rowHTML(q, { starToggle: true })).join("") : `<p class="empty">${empty}</p>`}
      </div>
    </main>
    ${tabBar(kind)}`;
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
}

function render() {
  applyTheme();
  const r = parseHash();
  const root = document.getElementById("app");
  root.className = "app";
  destroyTalk();
  let html = "";
  if (r.name === "q") html = paintQ(r.n);
  else if (r.name === "fav") html = paintList("fav");
  else if (r.name === "marks") html = paintList("marks");
  else if (r.name === "parte") html = paintParte(r.parte);
  else if (r.name === "cap") html = paintCap(r.cap);
  else if (r.name === "sec") html = paintSec(r.sec);
  else html = paintHome();
  root.innerHTML = html;
  hydrateIcons(root);
  if (r.name === "q") mountTalk(r.n);
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
  if (actEl && actEl.dataset.act === "fav-toggle") {
    e.preventDefault();
    e.stopPropagation();
    toggleFav(actEl.dataset.n);
    return;
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
    if (!arr.some((h) => h.text === text)) arr.push({ text });
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
  if (e.target.dataset.act === "filter") {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll("[data-list] .row").forEach((row) => {
      row.style.display = !q || row.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  }
}

function onKey(e) {
  if (e.target.id === "jump" && e.key === "Enter") {
    const n = normalizeN(e.target.value);
    if (state.byN.has(n)) go(`#/q/${n}`);
  }
}

async function boot() {
  applyTheme();
  const root = document.getElementById("app");
  root.className = "app";
  root.innerHTML = "<main class='home'><p class='sub'>A carregar…</p></main>";
  try {
    const res = await fetch("data/questions.json");
    if (!res.ok) throw new Error("catalog " + res.status);
    state.data = await res.json();
    for (const q of state.data.questions) state.byN.set(q.n, q);
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
    root.innerHTML = "<main class='home'><p>Falha a carregar o catálogo.</p><p class='sub'>" + String(err) + "</p></main>";
  }
}

boot();
