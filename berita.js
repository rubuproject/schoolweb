// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// News carousel functionality
const newsContainer = document.querySelector('.news-container');
const newsItems = document.querySelectorAll('.news-item');
const itemsPerPage = 3; // Jumlah item yang ditampilkan per halaman
let currentPage = 0;
const totalPages = Math.ceil(newsItems.length / itemsPerPage);

const paginationContainer = document.createElement('div');
paginationContainer.className = 'pagination';
for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToPage(i));
    paginationContainer.appendChild(dot);
}
function goToPage(pageNumber) {
    currentPage = pageNumber;
    updateDisplay();
}

function scrollLeft() {
    if (currentPage > 0) {
        currentPage--;
        updateDisplay();
    }
}

function scrollRight() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateDisplay();
    }
}

function updateNavigationButtons() {
    const leftButton = document.querySelector('.fa-chevron-left').parentElement;
    const rightButton = document.querySelector('.fa-chevron-right').parentElement;
    
    leftButton.disabled = currentPage <= 0;
    rightButton.disabled = currentPage >= totalPages - 1;
}

// Touch functionality
let touchStartX = 0;
let touchEndX = 0;

newsContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

newsContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX - touchEndX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0 && currentPage < totalPages - 1) {
            scrollRight();
        } else if (swipeDistance < 0 && currentPage > 0) {
            scrollLeft();
        }
    }
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateDisplay();
    }, 250);
});

// Initialize navigation buttons state
updateNavigationButtons();

// Add touch effect for mobile devices
newsItems.forEach(item => {
    item.addEventListener('touchstart', () => {
        item.classList.add('touched');
    });
    
    item.addEventListener('touchend', () => {
        item.classList.remove('touched');
    });
});