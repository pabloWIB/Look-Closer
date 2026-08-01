/* ==========================================================================
   main.js — the only script on the page.
   Drives the full-screen week panel shown below 1024px.
   Classic deferred script (no ES module) so index.html also works when
   opened straight from the file system.
   ========================================================================== */

(function () {
  "use strict";

  const toggle = document.querySelector(".week-toggle");
  const panel = document.getElementById("week-panel");

  if (!toggle || !panel) {
    return;
  }

  const desktop = window.matchMedia("(min-width: 1024px)");

  // Kept out of the tab order and the accessibility tree while the panel
  // covers them.
  const behind = [document.querySelector("main"), document.querySelector(".site-footer")]
    .filter(Boolean);

  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  function setBehindInert(state) {
    behind.forEach(function (element) {
      element.inert = state;
    });
  }

  function open() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Hide the week");
    panel.hidden = false;
    document.documentElement.classList.add("is-panel-open");
    setBehindInert(true);
    panel.focus();
  }

  function close(returnFocus) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Show the week");
    panel.hidden = true;
    document.documentElement.classList.remove("is-panel-open");
    setBehindInert(false);

    if (returnFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener("click", function () {
    if (isOpen()) {
      close(false);
    } else {
      open();
    }
  });

  panel.addEventListener("click", function (event) {
    if (event.target === panel) {
      close(true);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) {
      close(true);
    }
  });

  // The toggle is hidden from 1024px up; leaving the panel open there would
  // strand the page behind an overlay with no way out.
  desktop.addEventListener("change", function (event) {
    if (event.matches && isOpen()) {
      close(false);
    }
  });
})();
