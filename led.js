(function () {
  const KEY = "lde-q-drive-ok";
  function on() {
    return localStorage.getItem(KEY) === "1";
  }
  function wrap(btn) {
    if (btn.querySelector(".led")) return;
    btn.classList.add("has-led");
    const led = document.createElement("span");
    led.className = "led";
    led.title = on() ? "Drive ligado" : "Drive desligado";
    btn.appendChild(led);
  }
  function paint() {
    document.querySelectorAll('[data-act="open-settings"]').forEach(wrap);
    const lit = on();
    document.querySelectorAll(".led").forEach((el) => {
      el.classList.toggle("on", lit);
      el.title = lit ? "Drive ligado" : "Drive desligado";
    });
  }
  new MutationObserver(paint).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("storage", paint);
  paint();
})();
