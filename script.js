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
    // WORKS IMAGE LIGHTBOX
// WORKS IMAGE LIGHTBOX WITH NEXT AND PREVIOUS

const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeButton = document.querySelector("#lightboxClose");
const prevButton = document.querySelector("#prevImage");
const nextButton = document.querySelector("#nextImage");
const imageCounter = document.querySelector("#imageCounter");

const galleryImages = Array.from(
  document.querySelectorAll(".gallery-item img")
);

let currentImageIndex = 0;

if (
  lightbox &&
  lightboxImage &&
  closeButton &&
  prevButton &&
  nextButton &&
  galleryImages.length
) {

  // Display selected image
  function showImage(index) {
    currentImageIndex =
      (index + galleryImages.length) % galleryImages.length;

    const selectedImage = galleryImages[currentImageIndex];

    lightboxImage.style.opacity = "0";

    setTimeout(() => {
      lightboxImage.src = selectedImage.src;
      lightboxImage.alt = selectedImage.alt;
      lightboxImage.style.opacity = "1";
    }, 150);

    imageCounter.textContent =
      `${currentImageIndex + 1} / ${galleryImages.length}`;
  }

  // Open image
  galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      showImage(index);
      lightbox.classList.add("active");
      document.body.classList.add("lightbox-open");
    });
  });

  // Next image
  nextButton.addEventListener("click", () => {
    showImage(currentImageIndex + 1);
  });

  // Previous image
  prevButton.addEventListener("click", () => {
    showImage(currentImageIndex - 1);
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.classList.remove("lightbox-open");
  }

  closeButton.addEventListener("click", closeLightbox);

  // Close outside image
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard controls
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowRight") showImage(currentImageIndex + 1);
    if (event.key === "ArrowLeft") showImage(currentImageIndex - 1);
  });

}

});
// ========================================
// GLOBAL PORTFOLIO SEARCH
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("siteSearch");
    const searchResults = document.getElementById("searchResults");

    if (!searchInput || !searchResults) return;

    const portfolioPages = [
        {
            name: "Home",
            url: "index.html",
            keywords: "home welcome portfolio jhon job"
        },
        {
            name: "About Me",
            url: "about.html",
            keywords: "about myself introduction personal information"
        },
        {
            name: "Education",
            url: "education.html",
            keywords: "education elementary junior high senior high college nc ii"
        },
        {
            name: "Contact",
            url: "contact.html",
            keywords: "contact email telegram message"
        },
        {
            name: "Account",
            url: "account.html",
            keywords: "account login register"
        },
        {
            name: "Profile",
            url: "profile.html",
            keywords: "profile skills hobbies interests html css javascript c programming networking"
        },
        {
            name: "Works",
            url: "works.html",
            keywords: "works projects web design game development activities"
        },
        {
            name: "Experience",
            url: "experience.html",
            keywords: "experience projects activities achievements"
        }
    ];

    searchInput.addEventListener("input", function () {

        const query = this.value.toLowerCase().trim();

        searchResults.innerHTML = "";

        if (query === "") {
            searchResults.style.display = "none";
            return;
        }

        const matches = portfolioPages.filter(page => {
            const searchableText =
                (page.name + " " + page.keywords).toLowerCase();

            return searchableText.includes(query);
        });

        searchResults.style.display = "block";

        if (matches.length === 0) {
            searchResults.innerHTML = "<p>No results found.</p>";
            return;
        }

        matches.forEach(page => {

            const link = document.createElement("a");

            link.href = page.url;
            link.textContent = "🔍 " + page.name;

            searchResults.appendChild(link);

        });

    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".global-search")) {
            searchResults.style.display = "none";
        }
    });

});
// ========================================
// WORKS GALLERY LIGHTBOX WITH DESCRIPTION
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const galleryImages = document.querySelectorAll(
        ".gallery-item img"
    );

    const lightbox = document.getElementById("imageLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDescription = document.getElementById("lightboxDescription");
    const imageCounter = document.getElementById("imageCounter");

    const closeButton = document.getElementById("lightboxClose");
    const prevButton = document.getElementById("prevImage");
    const nextButton = document.getElementById("nextImage");

    if (
        !lightbox ||
        !lightboxImage ||
        !lightboxTitle ||
        !lightboxDescription ||
        !closeButton ||
        !prevButton ||
        !nextButton
    ) return;

    let currentImageIndex = 0;

    function showImage(index) {

        currentImageIndex =
            (index + galleryImages.length) % galleryImages.length;

        const selectedImage = galleryImages[currentImageIndex];

        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt;

        lightboxTitle.textContent =
            selectedImage.dataset.title || selectedImage.alt;

        lightboxDescription.textContent =
            selectedImage.dataset.description ||
            "No description available.";

        imageCounter.textContent =
            `${currentImageIndex + 1} / ${galleryImages.length}`;

    }

    // Open image
    galleryImages.forEach((image, index) => {

        image.addEventListener("click", function () {

            lightbox.style.display = "flex";
            showImage(index);

        });

    });

    // Previous image
    prevButton.addEventListener("click", function () {
        showImage(currentImageIndex - 1);
    });

    // Next image
    nextButton.addEventListener("click", function () {
        showImage(currentImageIndex + 1);
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.style.display = "none";
    }

    closeButton.addEventListener("click", closeLightbox);

    // Close when clicking outside the image and description
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (event) {

        if (lightbox.style.display !== "flex") return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showImage(currentImageIndex + 1);
        }

        if (event.key === "ArrowLeft") {
            showImage(currentImageIndex - 1);
        }

    });

});
