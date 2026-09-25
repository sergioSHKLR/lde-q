(function () {
  function fix(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      if (node.nodeValue && node.nodeValue.indexOf("secções") !== -1) {
        node.nodeValue = node.nodeValue.split("secções").join("seções");
      }
      return;
    }
    if (node.nodeType === 1 && node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
      for (var i = 0; i < node.childNodes.length; i++) fix(node.childNodes[i]);
    }
  }
  function paint() {
    fix(document.body);
  }
  new MutationObserver(paint).observe(document.documentElement, { childList: true, subtree: true });
  paint();
})();
