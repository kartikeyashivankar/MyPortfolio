/* ===================================================
   script.js — Neo-Brutalist Tabs & Contributions Grid
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // =====================================================
  // 1. Interactive Tabs Toggling
  // =====================================================
  const navPills = document.querySelectorAll('#hero-nav .nav-pill');
  const tabContents = document.querySelectorAll('.tab-content');

  navPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const targetId = pill.getAttribute('data-target');

      // Remove active class from all pills and contents
      navPills.forEach((p) => p.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      // Add active class to clicked pill and matching target content
      pill.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');

        // Scroll slightly down to make the section title visible on mobile/desktop
        const sectionsWrapper = document.querySelector('.sections-wrapper');
        if (sectionsWrapper) {
          sectionsWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // =====================================================
  // 2. Resume Download Toast Notification
  // =====================================================
  const resumeBtn = document.getElementById('resume-download-link');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      // Create toast container if it doesn't exist
      let container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      // Create toast element
      const toast = document.createElement('div');
      toast.className = 'toast downloading';
      toast.innerHTML = `
        <div class="toast-spinner"></div>
        <span class="toast-message">Resume downloading...</span>
      `;
      container.appendChild(toast);

      // Force reflow and show
      setTimeout(() => {
        toast.classList.add('show');
      }, 10);

      // Simulate downloaded state after 1.5s
      setTimeout(() => {
        toast.classList.remove('downloading');
        toast.classList.add('downloaded');
        toast.innerHTML = `
          <div class="toast-checkmark">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span class="toast-message">Resume downloaded!</span>
        `;

        // Fade out and remove after 2 more seconds
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => {
            toast.remove();
          }, 300);
        }, 2000);
      }, 1500);
    });
  }

  // =====================================================
  // 3. Certificate Modal Interactivity
  // =====================================================
  const certButtons = document.querySelectorAll('.cert-btn');
  const certModal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  if (certModal && modalImg && modalClose) {
    // Open modal on click
    certButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const certSrc = btn.getAttribute('data-cert');
        modalImg.src = certSrc;
        certModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Disable background scrolling
      });
    });

    // Close modal function
    const closeModal = () => {
      certModal.classList.remove('show');
      document.body.style.overflow = ''; // Restore background scrolling
      // Clear image source after transition
      setTimeout(() => {
        if (!certModal.classList.contains('show')) {
          modalImg.src = '';
        }
      }, 250);
    };

    // Close modal on clicking the close button
    modalClose.addEventListener('click', closeModal);

    // Close modal on clicking outside the modal content
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeModal();
      }
    });

    // Close modal on pressing escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.classList.contains('show')) {
        closeModal();
      }
    });
  }

});
