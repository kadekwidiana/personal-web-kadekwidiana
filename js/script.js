/*==================== MULTI LANGUAGE ====================*/
// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    });
}

// Function to change language
async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    const flagImg = document.querySelector('.dropbtn img');
    const multipleTextEn = document.getElementById('multiple-text-en');
    const multipleTextId = document.getElementById('multiple-text-id');
    const formInputEn = document.getElementById('form_input_contact_en');
    const formInputId = document.getElementById('form_input_contact_id');

    if (userPreferredLanguage === 'en') {
        flagImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png';
        flagImg.alt = 'English Flag';
        multipleTextEn.style.display = 'block';
        multipleTextId.style.display = 'none';
        formInputEn.style.display = 'block';
        formInputId.style.display = 'none';
    } else if (userPreferredLanguage === 'id') {
        flagImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/2560px-Flag_of_Indonesia.svg.png';
        flagImg.alt = 'Indonesian Flag';
        multipleTextEn.style.display = 'none';
        multipleTextId.style.display = 'block';
        formInputEn.style.display = 'none';
        formInputId.style.display = 'block';
    }
});

/*==================== TOGGLE ICON NAVBAR ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100)

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}


/*==================== SCROLL REVERAL ====================*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*==================== TYPED JS ====================*/
const typed = new Typed('.multiple-text-en', {
    strings: ['Student', 'Programmer', 'Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 100,
    loop: true
})

const typedId = new Typed('.multiple-text-id', {
    strings: ['Mahasiswa', 'Programmer', 'Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 100,
    loop: true
})

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

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
    skillsHeader = document.querySelectorAll(".skills__header")

function toggleSkills() {
    let itemClass = this.parentNode.className

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills__content skills__close"
    }
    if (itemClass === "skills__content skills__close") {
        this.parentNode.className = "skills__content skills__open"
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener("click", toggleSkills)
});

/*==================== TAB PERSONAL JOURNEY ====================*/
function showContent(contentId, activeBtnId, inactiveBtnId) {
    // Mengambil semua elemen dengan class qualification__content
    var contentElements = document.querySelectorAll('.qualification__content');
    var btnActive = document.getElementById(activeBtnId);
    var btnInactive = document.getElementById(inactiveBtnId);

    // Menggunakan forEach untuk menyembunyikan semua elemen konten
    contentElements.forEach(function (contentElement) {
        contentElement.style.display = 'none';
    });

    // Menampilkan elemen konten yang sesuai dengan contentId
    var selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';
    }

    // Menambah kelas qualification__active pada tombol aktif
    if (btnActive) {
        btnActive.classList.add('qualification__active');
    }

    // Menghapus kelas qualification__active pada tombol tidak aktif
    if (btnInactive) {
        btnInactive.classList.remove('qualification__active');
    }
}


/*==================== SERVICES MODAL ====================*/
const modalBtns = document.querySelectorAll(".services__button");
const modalCloses = document.querySelectorAll(".services__modal-close");

let modal = function (modalId) {
    const modalView = document.getElementById(modalId);
    if (modalView) {
        modalView.classList.add("active-modal");
    }
};

modalBtns.forEach((modalBtn) => {
    modalBtn.addEventListener("click", () => {
        const modalId = modalBtn.getAttribute("data-modal-id");
        modal(modalId);
    });
});

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        const modalId = modalClose.closest(".services__modal").id;
        const modalView = document.getElementById(modalId);
        if (modalView) {
            modalView.classList.remove("active-modal");
        }
    });
});

/*==================== SERVICES READ MORE ====================*/
function toggleText(service) {
    var textContainer = document.getElementById(service).getElementsByClassName('text-container')[0];
    var shortText = textContainer.querySelector('.short-text');
    var fullText = textContainer.querySelector('.full-text');

    const readMoreText = localStorage.getItem('language') === 'en' ? 'Read More' : "Baca Selengkapnya";
    const showLessText = localStorage.getItem('language') === 'en' ? 'Show Less' : "Tampilkan Lebih Sedikit";

    if (shortText && fullText) {
        shortText.style.display = shortText.style.display === 'none' ? 'block' : 'none';
        fullText.style.display = fullText.style.display === 'none' ? 'block' : 'none';
        document.querySelector(`#${service} .read-more`).textContent = shortText.style.display === 'none' ? showLessText : readMoreText;
    }
}

// RECAPTCHA
/*==================== RECAPTCHA ====================*/
var buttonSend = document.getElementById("buttonSend")
function disableButton() {
    buttonSend.setAttribute("disabled", "disabled");
    buttonSend.classList.add('btn-not-validate');
    buttonSend.classList.remove('btn');
}

function enableButton() {
    buttonSend.removeAttribute("disabled");
    buttonSend.classList.remove('btn-not-validate');
    buttonSend.classList.add('btn');
}

function onRecaptchaSuccess() {
    enableButton();
}

function onRecaptchaResponseExpiry() {
    disableButton();
}

function onRecaptchaError() {
    disableButton();
}

/*==================== HISTATS ANALITIC ====================*/
// <!-- Histats.com   (aync)-->
var _Hasync = _Hasync || [];
_Hasync.push(['Histats.start', '1,4843723,4,107,170,20,00001010']);
_Hasync.push(['Histats.fasi', '1']);
_Hasync.push(['Histats.track_hits', '']);
(function () {
    var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
    hs.src = ('//s10.histats.com/js15_as.js');
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
})();

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
