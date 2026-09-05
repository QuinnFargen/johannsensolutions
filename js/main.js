(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Web3Forms quote form submission
  var form = document.getElementById("quote-form");
  var statusEl = document.getElementById("form-status");
  var submitBtn = document.getElementById("quote-submit");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Honeypot: if filled in, silently drop (bot)
      var honeypot = form.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) {
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      setStatus("", "");

      var formData = new FormData(form);
      var payload = Object.fromEntries(formData.entries());

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (data.success) {
            setStatus("Thanks! Your quote request is in — we'll be in touch soon.", "is-success");
            form.reset();
          } else {
            setStatus("Something went wrong sending your request. Please call us at (507) 227-9939 instead.", "is-error");
          }
        })
        .catch(function () {
          setStatus("Something went wrong sending your request. Please call us at (507) 227-9939 instead.", "is-error");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        });
    });
  }

  function setStatus(message, className) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = "form-status" + (className ? " " + className : "");
  }
})();
