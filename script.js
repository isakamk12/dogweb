document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  const yearElement = document.getElementById("y");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Terminal Logic
  const terminal = document.getElementById('pup-terminal');
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');

  window.toggleTerminal = () => {
    if (!terminal) return;
    const isVisible = terminal.style.display === 'block';
    terminal.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) termInput.focus();
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === '`') {
      e.preventDefault();
      toggleTerminal();
    }
  });

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = termInput.value.trim().toLowerCase();
        processCommand(cmd);
        termInput.value = '';
      }
    });
  }

  function processCommand(cmd) {
    const line = document.createElement('div');
    line.className = 'line';

    if (cmd === 'help') {
      line.innerHTML = '> 使えるよ: help, status, scan, clear';
    } else if (cmd === 'status') {
      line.innerHTML = '> 健康状態: 100% | 可愛さ: 制限突破';
    } else if (cmd === 'scan') {
      line.innerHTML = '> スキャン中... 16個のふわふわなデータが見つかりました。';
    } else if (cmd === 'clear') {
      termOutput.innerHTML = '';
      return;
    } else {
      line.innerHTML = `> おっと、わからないな: ${cmd}`;
    }

    termOutput.appendChild(line);
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Staggered gallery animations
  const galleryItems = document.querySelectorAll('.gallery .tile');
  galleryItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.05}s`;
  });

  // Enhanced Lightbox
  const modal = document.createElement("dialog");
  const modalImg = document.createElement("img");
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  // Close when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach(btn => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-full") || btn.querySelector('img').src;
      modalImg.src = src;
      modalImg.alt = "拡大画像";

      modal.showModal();

      // Animation for opening
      modal.animate([
        { opacity: 0, transform: 'scale(0.9) translateY(20px)' },
        { opacity: 1, transform: 'scale(1) translateY(0)' }
      ], {
        duration: 400,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      });
    });
  });

  // Mouse Trail Effect
  document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  });

  // Scanner Logic
  const hudLabels = ['CUTE_RADAR: SCANNING...', 'FLUFF_LEVEL: 100%', 'PUP_ID: POPO_01', 'STATUS: HEART_STOLEN'];
  const hudElement = document.querySelector('.hud-data');
  if (hudElement) {
    let i = 0;
    setInterval(() => {
      hudElement.textContent = hudLabels[i];
      i = (i + 1) % hudLabels.length;
    }, 2000);
  }

  // Smooth scroll for nav links
  document.querySelectorAll('nav.mini a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });
});
