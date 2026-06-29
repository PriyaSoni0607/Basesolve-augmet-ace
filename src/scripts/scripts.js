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

  if (document.referrer.includes('/login/index.php')) {
    sessionStorage.setItem("justLoggedIn", "true");
  }

  if (sessionStorage.getItem("justLoggedIn") === "true") {
    const tryOpenDrawer = () => {
      const drawer = document.getElementById(DRAWER_ID);
      const button = document.querySelector(TOGGLE_SELECTOR);

      if (!drawer || !button) return;

      if (!drawer.classList.contains("show")) {
        button.click();
      }

      sessionStorage.removeItem("justLoggedIn");
      drawerObserver.disconnect();
    };

    const drawerObserver = new MutationObserver(tryOpenDrawer);
    drawerObserver.observe(document.body, { childList: true, subtree: true });
    setTimeout(tryOpenDrawer, 800);
  }

  /* ========================================= 
     HOVER + HIGHLIGHT FOR COURSE INDEX 
     ========================================== */
  const attachDelegatedHover = () => {
    const container = document.getElementById("courseindex");
    if (!container || container.dataset.hoverReady) return;

    container.dataset.hoverReady = "true";

    container.addEventListener("mouseover", function (e) {
      const row = e.target.closest(".courseindex-item.d-flex");
      if (!row) return;

      const link = row.querySelector(".courseindex-link");
      if (link) {
        const textSpan = link.querySelector('.link-text');
        link.title = textSpan ? textSpan.textContent.trim() : link.innerText.trim();
      }
      row.style.backgroundColor = "rgba(13, 110, 253, 0.1)";
    });

    container.addEventListener("mouseout", function (e) {
      const row = e.target.closest(".courseindex-item.d-flex");
      if (row) row.style.backgroundColor = "";
    });
  };

  const hoverObserver = new MutationObserver(attachDelegatedHover);
  hoverObserver.observe(document.body, { childList: true, subtree: true });

  attachDelegatedHover();

  /* =========================================
     CERTIFICATE ACCESS CONTROL 
  ========================================= */

  const certificateBtn = document.getElementById('btn-my-certificate-main');
  if (certificateBtn) {
    const certificateContainer = document.getElementById('certificate-container');
    const shareBtn = document.getElementById('btn-my-certificate-share');
    const feedbackBtn = document.getElementById('feedback-button');
    const divider = document.getElementById('certificate-divider');
    const modal = document.getElementById('customWarningModal');

    //ADDED the Support Portal to the map
    const courseCertMap = {
      "Germline Exome Analysis": "https://ace.augmet.ai/course/section.php?id=437",
      "Somatic Exome Analysis": "https://ace.augmet.ai/course/section.php?id=430",
      "Whole Exome Analysis": "https://ace.augmet.ai/course/section.php?id=438",
      "Non-Invasive Prenatal Screening (NIPS)": "https://ace.augmet.ai/course/section.php?id=439",
      "AUGMET Support Portal": "https://ace.augmet.ai/course/section.php?id=525"
    };

    const getCourses = () => {
      const cards = document.querySelectorAll('.card.course-card');
      if (!cards.length) return [];
      return [...cards].map(card => {
        const titleSpan = card.querySelector('.coursename .multiline span[aria-hidden="true"]');
        const progressText = card.querySelector('.progress-text')?.innerText || '0';
        return {
          name: titleSpan ? titleSpan.textContent.trim() : 'Unnamed Course',
          progress: parseInt(progressText.match(/\d+/) || 0)
        };
      });
    };

    const updateUI = () => {
      const courses = getCourses();
      if (!courses.length) return;
      const completed = courses.every(c => c.progress >= 100);
      if (certificateContainer) certificateContainer.style.display = 'flex';
      if (shareBtn) shareBtn.style.display = completed ? 'flex' : 'none';
      if (feedbackBtn) feedbackBtn.style.display = completed ? 'flex' : 'none';
      if (divider) divider.style.display = completed ? 'block' : 'none';
    };

    const uiObserver = new MutationObserver(updateUI);
    uiObserver.observe(document.body, { childList: true, subtree: true });
    updateUI();

    modal?.querySelector('.warn-btn')?.addEventListener('click', () => modal.classList.remove('show'));
    modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('show'); });

    certificateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const courses = getCourses();
      if (!courses.length) { alert("No assigned courses found."); return; }
      if (!courses.every(c => c.progress >= 100)) {
        modal?.classList.add('show');
      } else {
        const courseNames = courses.map(c => c.name);

        const mainCourses = [
          "Germline Exome Analysis",
          "Somatic Exome Analysis",
          "Whole Exome Analysis",
          "Non-Invasive Prenatal Screening (NIPS)"
        ];

        const hasNIPS = courseNames.includes("Non-Invasive Prenatal Screening (NIPS)");
        const hasWholeExome = courseNames.includes("Whole Exome Analysis");
        const hasSupportPortal = courseNames.includes("AUGMET Support Portal");
        const hasAnyMainCourse = courseNames.some(name => mainCourses.includes(name));

        if (hasNIPS && hasWholeExome) {
          window.open(courseCertMap["Whole Exome Analysis"], "_blank");
        }
        else if (hasSupportPortal && !hasAnyMainCourse) {
          window.open(courseCertMap["AUGMET Support Portal"], "_blank");
        }
        else {
          const matched = courses.find(c => courseCertMap[c.name]);
          if (matched) {
            window.open(courseCertMap[matched.name], "_blank");
          } else {
            alert("No certificate mapping found.");
          }
        }
      }
    });
  }
});
