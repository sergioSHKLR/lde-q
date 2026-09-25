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
        '<i data-icon="scale" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg></i> ' +
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
