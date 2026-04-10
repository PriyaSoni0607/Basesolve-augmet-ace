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
      if (link) {
        const textSpan = link.querySelector('.link-text');
        if (textSpan) {
          link.title = textSpan.textContent.trim();
        } else {
          link.title = link.innerText.trim();
        }
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

  /* =========================================
     CERTIFICATE ACCESS CONTROL 
  ========================================= */
  const certificateContainer = document.getElementById('certificate-container');
  const certificateBtn = document.getElementById('btn-my-certificate-main');
  const shareBtn = document.getElementById('btn-my-certificate-share');
  const feedbackBtn = document.getElementById('feedback-button');
  const divider = document.getElementById('certificate-divider');
  const modal = document.getElementById('customWarningModal');

  if (!certificateBtn) return;

  // Map course names → certificate URLs
  const courseCertMap = {
    "Germline Exome Analysis": "https://traindev.augmet.ai/course/section.php?id=222",
    "Somatic Exome Analysis": "https://traindev.augmet.ai/course/section.php?id=158",
    "Whole Exome Analysis": "https://traindev.augmet.ai/course/section.php?id=232"
  };

  /* =========================
     GET COURSE DATA (NAME + PROGRESS)
  ========================= */

  const getCourses = () => {
    const cards = document.querySelectorAll('.card.course-card');
    if (!cards.length) return [];

    return [...cards].map(card => {
      const titleSpan = card.querySelector('.coursename .multiline span[aria-hidden="true"]');
      let name = titleSpan ? titleSpan.textContent.trim() : 'Unnamed Course';

      const progressText = card.querySelector('.progress-text')?.innerText || '0';
      const match = progressText.match(/\d+/);
      const progress = match ? parseInt(match[0]) : 0;
      return { name, progress };
    });
  };

  const isAllCompleted = (courses) => courses.length > 0 && courses.every(c => c.progress >= 100);

  /* =========================
     UI UPDATE
  ========================= */

  const updateUI = () => {
    const courses = getCourses();
    if (!courses.length) return;

    const completed = isAllCompleted(courses);

    if (completed) {
      certificateContainer.style.display = 'flex';
      shareBtn.style.display = 'flex';
      feedbackBtn.style.display = 'flex';
      divider.style.display = 'block';
    } else {
      certificateContainer.style.display = 'flex';
      shareBtn.style.display = 'none';
      feedbackBtn.style.display = 'none';
      divider.style.display = 'none';
    }
  };

  const waitForCourses = () => {
    const courses = getCourses();
    if (courses.length > 0) updateUI();
    else requestAnimationFrame(waitForCourses);
  };
  waitForCourses();

  const observer = new MutationObserver(updateUI);
  observer.observe(document.body, { childList: true, subtree: true });

  /* =========================
     MODAL HANDLING 
  ========================= */

  const warnBtn = modal?.querySelector('.warn-btn');
  warnBtn?.addEventListener('click', () => modal.classList.remove('show'));
  modal?.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('show');
  });

  const showWarning = () => modal?.classList.add('show');

  /* =========================
     CLICK HANDLER FOR CERTIFICATE 
  ========================= */

  const handleClick = (e) => {
    e.preventDefault();

    const courses = getCourses();

    if (!courses.length) {
      alert("No assigned courses found.");
      return;
    }

    const isDashboardComplete = courses.every(c => c.progress >= 100);

    if (!isDashboardComplete) {
      showWarning();
      return;
    }

    const matchedCourse = courses.find(c => courseCertMap[c.name]);

    if (matchedCourse) {
      window.open(courseCertMap[matchedCourse.name], "_blank");
    } else {
      alert("No certificate mapping found for your courses.");
    }
  };

  certificateBtn.addEventListener('click', handleClick);

});
