document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     SUPPORT LINK ON LOGIN FORM
     ========================================= */

  const loginForm = document.querySelector(".loginform");

  if (loginForm && !loginForm.querySelector(".login-support-link")) {
    const supportLink = document.createElement("div");
    supportLink.className = "login-support-link";
    supportLink.innerHTML = `
      <a href="https://traindev.augmet.ai/user/contactsitesupport.php" 
         target="_blank" 
         rel="noopener">
        Need help? Contact Support
      </a>
    `;
    loginForm.appendChild(supportLink);
  }

  /* =========================================
     SUPPORT PAGE LOGIC
     ========================================= */

  if (window.location.pathname.includes("/user/contactsitesupport.php")) {

    const header = document.querySelector(".page-header-headings");

    if (header && !header.querySelector(".custom-support-subtitle")) {
      const subtitle = document.createElement("h2");
      subtitle.className = "h4 mb-1 custom-support-subtitle";
      subtitle.textContent = "We're here to help";
      header.prepend(subtitle);
    }

    const defaultText =
      "I would like to register on the ACE Learning Hub. Can you please help me?";

    const tryPrefill = setInterval(function () {

      const messageField =
        document.querySelector('textarea[name="message"]') ||
        document.querySelector('textarea[name="body"]') ||
        document.querySelector("form textarea");

      if (!messageField) return;

      clearInterval(tryPrefill);

      if (!messageField.value.trim()) {
        messageField.value = defaultText;
        messageField.dispatchEvent(new Event("input", { bubbles: true }));
        messageField.dispatchEvent(new Event("change", { bubbles: true }));
      }

      messageField.addEventListener("keydown", function () {
        if (this.value === defaultText) {
          this.value = "";
        }
      });

      messageField.addEventListener("focus", function () {
        const link = document.querySelector(".login-support-link");
        if (link) link.style.display = "none";
      });

    }, 300);
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
