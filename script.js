document.addEventListener('DOMContentLoaded', () => {
  // Set current year
  const yearElement = document.getElementById("y");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

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

      // Wait for image load to show modal for smoother experience
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
