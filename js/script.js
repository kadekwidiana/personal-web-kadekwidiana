/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/*==================== scroll sections active link ====================*/
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


/*==================== scroll reveal ====================*/
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

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['Student', 'Programmer', 'Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 100,
    loop: true
})

// Dark mode
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

/*==================== PERSONAL JOURNEY ====================*/
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

// data json
// Get the container element
const portfolioContainer = document.getElementById("portfolio-container");
// Get the loading and failed elements
const loadingElement = document.querySelector(".loading");
const failedElement = document.querySelector(".failed");
fetch('js/data-port.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // console.log(data[0].image);

        // Hapus loading element dan tampilkan data
        loadingElement.style.display = 'none';

        data.forEach(portfolio => {
            // console.log(portfolio.title)

            // Menambahkan konten untuk setiap portofolio
            var content = `
                <div class="portfolio-box">
                    <img src="${portfolio.image}" alt="${portfolio.title}">
                    <div class="portfolio-layer">
                        <h4>${portfolio.title}</h4>
                        <p>${portfolio.description}</p>
                        <a href="${portfolio.link}"><i class="bx bx-link-external"></i></a>
                    </div>
                </div>`;

            portfolioContainer.innerHTML += content;
        })
    })
    .catch(error => {
        loadingElement.style.display = 'block';

        console.error('Error fetching portfolio data:', error);
    });
