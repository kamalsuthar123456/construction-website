export const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (!section) return;

  // Detect navbar height automatically
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 100;

  const top =
    section.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};
