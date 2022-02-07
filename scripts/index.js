//Section fade in animations related, experimental feature
const fadeInAnimation = (function () {
  const fadeInSections = document.querySelectorAll('.section--fade-in');
  const revealSection = (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  };
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
  });
  fadeInSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  });
})();
