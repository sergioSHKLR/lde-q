(function () {
  async function forceUpdate() {
    try {
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      if (window.caches) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } catch (e) {}
    const url = new URL(location.href);
    url.searchParams.set("_up", String(Date.now()));
    location.replace(url.pathname + url.search + url.hash);
  }
  function label() {
    const lang = (document.documentElement.lang || "").toLowerCase();
    return lang.indexOf("en") === 0 ? "Update" : "Atualizar";
  }
  function paint() {
    document.querySelectorAll(".version-line").forEach((el) => {
      if (el.querySelector("[data-force-update]")) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip";
      btn.setAttribute("data-force-update", "1");
      btn.innerHTML =
        '<i data-icon="download" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg></i> ' +
        label();
      btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        btn.disabled = true;
        forceUpdate();
      });
      el.appendChild(btn);
    });
  }
  new MutationObserver(paint).observe(document.documentElement, { childList: true, subtree: true });
  paint();
})();
