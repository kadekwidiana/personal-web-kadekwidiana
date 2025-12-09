/*==================== TOGGLE ICON NAVBAR ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==================== SCROLL REVERAL ====================*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.portofolio-section', { origin: 'bottom' });


/*==================== DARK MODE ====================*/
const toggleModeButton = document.getElementById('toggle-mode');
const body = document.body;

toggleModeButton.addEventListener('click', () => {
    // Toggle dark mode class on body
    body.classList.toggle('dark-mode');

    // Change icon based on mode
    const isDarkMode = body.classList.contains('dark-mode');
    toggleModeButton.innerHTML = isDarkMode ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';

    // Save the user's preference in localStorage
    localStorage.setItem('darkMode', isDarkMode);
});

// Check user's preference in localStorage
const savedDarkMode = localStorage.getItem('darkMode');

if (savedDarkMode === 'true') {
    // If user prefers dark mode, add dark mode class to body
    body.classList.add('dark-mode');
    // Change icon to sun
    toggleModeButton.innerHTML = '<i class="bx bx-sun"></i>';
}

/*==================== MODAL POPUP PORTOFOLIO ====================*/
const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (const el of openEls) {
    el.addEventListener("click", function () {
        const modalId = this.dataset.open;
        const modal = document.getElementById(modalId);
        modal.classList.add(isVisible);
        // Tambahkan class pada html untuk menghilangkan scroll
        document.documentElement.classList.add("modal-open");
    });
}

for (const el of closeEls) {
    el.addEventListener("click", function () {
        const modal = this.parentElement.parentElement.parentElement;
        modal.classList.remove(isVisible);
        // Hapus class pada html untuk mengembalikan scroll
        document.documentElement.classList.remove("modal-open");
    });
}

document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modal.is-visible")) {
        const modal = document.querySelector(".modal.is-visible");
        modal.classList.remove(isVisible);
        // Hapus class pada html untuk mengembalikan scroll
        document.documentElement.classList.remove("modal-open");
    }
});

document.addEventListener("keyup", e => {
    // if we press the ESC
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
        const modal = document.querySelector(".modal.is-visible");
        modal.classList.remove(isVisible);
        // Hapus class pada html untuk mengembalikan scroll
        document.documentElement.classList.remove("modal-open");
    }
});