/*==================== PRELOADER ====================*/
const preloader = document.querySelector('#preloader');
if (preloader) {
    window.addEventListener('load', () => {
        preloader.remove();
    });
}

/*==================== TOGGLE ICON NAVBAR ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

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
    header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


/*==================== SCROLL REVERAL ====================*/
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200,
});

const isMobile = window.matchMedia('(max-width: 768px)').matches;

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .qualification__container, .skills__container', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img, .contact-info', { origin: isMobile ? 'bottom' : 'left' });
ScrollReveal().reveal('.home-content p, .about-content, .contact form', { origin: isMobile ? 'bottom' : 'right' });


/*==================== TYPED JS ====================*/
const typed = new Typed('.multiple-text', {
    strings: [
        'Software Developer',
        'Frontend Developer',
        'Backend Developer',
        'Fullstack Developer',
        'Mobile Developer',
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 100,
    loop: true
});

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
    skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills__content skills__close";
    }
    if (itemClass === "skills__content skills__close") {
        this.parentNode.className = "skills__content skills__open";
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener("click", toggleSkills);
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

    if (shortText && fullText) {
        shortText.style.display = shortText.style.display === 'none' ? 'block' : 'none';
        fullText.style.display = fullText.style.display === 'none' ? 'block' : 'none';
        document.querySelector(`#${service} .read-more`).textContent = shortText.style.display === 'none' ? 'Show Less' : 'Read More';
    }
}

// RECAPTCHA
/*==================== RECAPTCHA ====================*/
var buttonSend = document.getElementById("buttonSend");

// State untuk ReCAPTCHA
var isRecaptchaValid = false;

// Fungsi untuk men-disable tombol
function disableButton() {
    if (buttonSend) {
        buttonSend.setAttribute("disabled", "disabled"); // Tambahkan atribut disabled
        buttonSend.classList.add("btn-not-validate");
        buttonSend.classList.remove("btn");
    }
}

// Fungsi untuk men-enable tombol
function enableButton() {
    if (buttonSend) {
        buttonSend.removeAttribute("disabled"); // Hapus atribut disabled
        buttonSend.classList.remove("btn-not-validate");
        buttonSend.classList.add("btn");
    }
}

// Callback untuk reCAPTCHA sukses
function onRecaptchaSuccess() {
    console.log("ReCAPTCHA success");
    isRecaptchaValid = true; // Tandai state valid
    enableButton();
}

// Callback untuk ReCAPTCHA kadaluarsa
function onRecaptchaResponseExpiry() {
    console.log("ReCAPTCHA expired");
    isRecaptchaValid = false; // Tandai state tidak valid
    disableButton();
}

// Callback untuk ReCAPTCHA error
function onRecaptchaError() {
    console.error("ReCAPTCHA error");
    isRecaptchaValid = false; // Tandai state tidak valid
    disableButton();
}

// Awalnya, tombol di-disable
disableButton();


/*==================== HISTATS ANALITIC ====================*/
// <!-- Histats.com   (aync)-->
var _Hasync = _Hasync || [];
_Hasync.push(['Histats.start', '1,4917336,4,107,170,20,00001010']);
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


/*==================== HANDLE SEND FORM CONTACT ====================*/
const scriptURL = 'https://script.google.com/macros/s/AKfycby7U0euOFbEzMXVcRLMjV2NFHUm699ljKrfgrE3FMthtK7FXzjq4rhDk1_ikBgNEzRX/exec';
const form = document.forms['form-contact'];

const btnSend = document.getElementById('buttonSend');
const btnLoading = document.getElementById('buttonLoading');

form.addEventListener('submit', e => {
    e.preventDefault();

    btnLoading.style.display = 'block';
    btnSend.style.display = 'none';

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            Swal.fire({
                title: "Thank You!",
                text: "Your message has been sent successfully.",
                icon: "success",
                customClass: {
                    popup: 'swal2-popup',
                    confirmButton: 'confirm-button-swal2',
                }
            });

            form.reset();
            // console.log('Success', response);
        })
        .catch(error => {
            Swal.fire({
                title: "Oops!",
                text: "An error occurred while sending the message. Please try again.",
                icon: "error",
                customClass: {
                    popup: 'swal2-popup',
                    confirmButton: 'confirm-button-swal2',
                }
            });

            console.error('Error!', error.message);
        }).finally(() => {
            btnLoading.style.display = 'none';
            btnSend.style.display = 'block';
        });
});