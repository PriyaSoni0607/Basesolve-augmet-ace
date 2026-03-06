document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     SUPPORT LINK ON LOGIN FORM
     ========================================= */

  const loginForm = document.querySelector(".loginform");

  if (loginForm && !loginForm.querySelector(".login-support-link")) {
    const supportLink = document.createElement("div");
    supportLink.className = "login-support-link";
    supportLink.innerHTML = `
      <a href="https://augmet.atlassian.net/servicedesk/customer/portal/1/group/515/create/1131"
         target="_blank" 
         rel="noopener">
        Need help? Contact Support
      </a>
    `;
    loginForm.appendChild(supportLink);
  }

  /* ===============================
     OPEN INDEX AFTER LOGOUT-LOGIN
     =============================== */

  const DRAWER_ID = "theme_boost-drawers-courseindex";
  const TOGGLE_SELECTOR = 'button[data-target="theme_boost-drawers-courseindex"][data-action="toggle"]';

  const cameFromLogin = document.referrer.includes('/login/index.php');

  if (cameFromLogin) {
    sessionStorage.setItem("justLoggedIn", "true");
  }

  const shouldOpen = sessionStorage.getItem("justLoggedIn") === "true";

  if (shouldOpen) {
    const tryOpenDrawer = () => {
      const drawer = document.getElementById(DRAWER_ID);
      const button = document.querySelector(TOGGLE_SELECTOR);

      if (!drawer || !button) return;

      if (!drawer.classList.contains("show")) {
        button.click();
      }

      sessionStorage.removeItem("justLoggedIn");
      observer.disconnect();
    };

    const observer = new MutationObserver(tryOpenDrawer);
    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(tryOpenDrawer, 800);
  }

  /* ========================================= 
     Hover + tooltip + highlight for course index 
     ========================================== */

  const attachDelegatedHover = () => {
    const container = document.getElementById("courseindex");
    if (!container || container.dataset.hoverReady) return;

    container.dataset.hoverReady = "true";

    container.addEventListener("mouseover", function (e) {
      const row = e.target.closest(".courseindex-item.d-flex");
      if (!row) return;

      const link = row.querySelector(".courseindex-link");
      if (link && !link.title) {
        link.title = link.innerText.trim();
      }

      row.style.backgroundColor = "rgba(13, 110, 253, 0.1)";
    });

    container.addEventListener("mouseout", function (e) {
      const row = e.target.closest(".courseindex-item.d-flex");
      if (!row) return;

      row.style.backgroundColor = "";
    });
  };

  const hoverObserver = new MutationObserver(attachDelegatedHover);
  hoverObserver.observe(document.body, { childList: true, subtree: true });

  attachDelegatedHover();

});
