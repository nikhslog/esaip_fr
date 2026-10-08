/* ESAIP — MSc event landing page */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* Year in footer */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Toast helper */
  var toast = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 2600);
  }

  /* Download feedback (iOS opens PDFs in a viewer — tell people how to save) */
  var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
              (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  document.querySelectorAll("[data-download]").forEach(function (link) {
    link.addEventListener("click", function () {
      showToast(isIOS ? "Brochure opening — tap Share › Save to Files to keep it"
                      : "Your brochure is downloading…");
    });
  });

  /* Share button: native share sheet on phones, copy link elsewhere */
  var shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      var data = {
        title: "ESAIP Engineering School — MSc Programs",
        text: "Check out ESAIP's English-taught MSc programs in Angers, France.",
        url: window.location.href.split("#")[0]
      };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(data.url).then(
          function () { showToast("Link copied to clipboard"); },
          function () { showToast(data.url); }
        );
      } else {
        showToast(data.url);
      }
    });
  }

  /* Reveal on scroll */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
