    function navigateTo(moduleId) {
      // Hide all sections
      document.querySelectorAll('.module-section').forEach(s => s.classList.remove('active'));

      // Show target section
      const target = document.getElementById(moduleId);
      if (target) target.classList.add('active');

      // Update sidebar active state
      document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
      const navLink = document.querySelector(`.sidebar-nav a[data-module="${moduleId}"]`);
      if (navLink) navLink.classList.add('active');

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Close mobile sidebar
      document.querySelector('.sidebar').classList.remove('open');
    }

    // Sidebar navigation click handlers
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const moduleId = link.dataset.module;
        navigateTo(moduleId);
      });
    });

    // Copy code functionality
    function copyCode(btn) {
      const codeBlock = btn.closest('.code-block');
      const pre = codeBlock.querySelector('pre');
      // Get text content without line numbers
      let text = pre.innerText;
      // Remove line numbers (digits followed by spaces at start of lines)
      text = text.replace(/^\s*\d+\s*/gm, '');
      navigator.clipboard.writeText(text.trim()).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z"/></svg> Copied!';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
      });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      const sidebar = document.querySelector('.sidebar');
      const toggle = document.querySelector('.sidebar-toggle');
      if (window.innerWidth <= 900 && sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) && !toggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
