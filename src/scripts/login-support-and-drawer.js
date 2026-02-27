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
         target="_blank" rel="noopener">
        Need help? Contact Support
      </a>
    `;
    loginForm.appendChild(supportLink);
  }


  /* ===============================
     OPEN INDEX AFTER LOGOUT-LOGIN
     =============================== */

  const openDrawer = () => {
    const drawer = document.getElementById("theme_boost-drawers-courseindex");
    const button = document.querySelector(
      'button[data-target="theme_boost-drawers-courseindex"][data-action="toggle"]'
    );

    if (!drawer || !button) return;

    if (!drawer.classList.contains("show")) {
      button.click();
      drawerObserver.disconnect();
    }
  };

  const drawerObserver = new MutationObserver(openDrawer);
  drawerObserver.observe(document.body, { childList: true, subtree: true });

});
