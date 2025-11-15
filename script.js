// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Load saved theme preference
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    html.classList.remove('dark');
    updateThemeIcon(false);
  } else {
    html.classList.add('dark');
    updateThemeIcon(true);
  }
}

// Update theme icon
function updateThemeIcon(isDark) {
  if (themeIcon) {
    if (isDark) {
      themeIcon.className = 'fas fa-sun theme-icon';
    } else {
      themeIcon.className = 'fas fa-moon theme-icon';
    }
  }
}

// Toggle theme
function toggleTheme() {
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark);
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
  // Always set display first
  if (!mobileMenu.classList.contains('active')) {
    mobileMenu.style.display = 'flex';
    // Force reflow
    mobileMenu.offsetHeight;
  }
  
  mobileMenu.classList.toggle('active');
  
  // Remove display after animation if closing
  if (!mobileMenu.classList.contains('active')) {
    setTimeout(() => {
      mobileMenu.style.display = 'none';
    }, 300);
  }
  
  // Animate hamburger menu
  const spans = mobileMenuToggle.querySelectorAll('span');
  if (mobileMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
  if (mobileMenu.classList.contains('active')) {
    toggleMobileMenu();
  }
}

// Fade-in animation on scroll
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight - 50) {
      element.classList.add('visible');
    }
  });
}

// Initialize fade-in for elements already in view
function initFadeIn() {
  handleScrollAnimation();
}

// Hide/Show Header on Scroll
let lastScrollTop = 0;
const header = document.querySelector('.header');
const scrollThreshold = 100;

function handleHeaderScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > scrollThreshold) {
    if (scrollTop > lastScrollTop) {
      // Scrolling down
      header.classList.add('hidden');
      header.classList.remove('visible');
    } else {
      // Scrolling up
      header.classList.remove('hidden');
      header.classList.add('visible');
    }
  } else {
    // At the top
    header.classList.remove('hidden');
    header.classList.add('visible');
  }
  
  lastScrollTop = scrollTop;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Load theme
  loadTheme();
  
  // Initialize fade-in animations
  initFadeIn();
  
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Close mobile menu on link click
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Scroll animations
  window.addEventListener('scroll', handleScrollAnimation);
  
  // Header hide/show on scroll
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});