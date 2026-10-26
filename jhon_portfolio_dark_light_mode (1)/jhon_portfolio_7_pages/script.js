document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".year").forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  // Theme preference is shared by all pages in this portfolio.
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");
  const header = document.querySelector(".site-header");
  if (header) {
    const themeButton = document.createElement("button");
    themeButton.className = "theme-toggle";
    themeButton.type = "button";
    themeButton.setAttribute("aria-label", "Switch color theme");
    const updateThemeButton = () => {
      const dark = document.body.classList.contains("dark-mode");
      themeButton.textContent = dark ? "☀️ Light mode" : "🌙 Dark mode";
      themeButton.setAttribute("aria-pressed", String(dark));
    };
    themeButton.addEventListener("click", () => {
      const dark = document.body.classList.toggle("dark-mode");
      localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
      updateThemeButton();
    });
    const nav = header.querySelector(".nav-links");
    if (nav) header.insertBefore(themeButton, nav); else header.appendChild(themeButton);
    updateThemeButton();
  }

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
  }

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      const note = document.querySelector("#form-note");
      note.textContent = "Your email app will open with the message prepared. Add your email address in the mailto link if you want messages sent directly.";
      // This opens the visitor's email application; it does not send messages to a server.
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });
  }


  const workFilter = document.querySelector("#work-filter");
  const workCards = document.querySelectorAll(".gallery-item");
  if (workFilter && workCards.length) {
    workFilter.addEventListener("change", () => {
      workCards.forEach((card) => {
        card.hidden = workFilter.value !== "all" && card.dataset.category !== workFilter.value;
      });
    });
  }
});
