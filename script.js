// Enhanced Theme Management with System Preference Detection
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Theme management
function initTheme() {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    // Use saved preference
    applyTheme(savedTheme === 'dark');
  } else {
    // Use system preference
    applyTheme(systemPrefersDark);
    localStorage.setItem('theme', systemPrefersDark ? 'dark' : 'light');
  }
  
  // Update theme icon
  updateThemeIcon(html.classList.contains('dark'));
  
  // Listen for system theme changes
  watchSystemThemeChanges();
}

// Apply theme
function applyTheme(isDark) {
  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
}

// Update theme icon
function updateThemeIcon(isDark) {
  if (themeIcon) {
    if (isDark) {
      themeIcon.className = 'fas fa-sun theme-icon';
      themeIcon.title = 'Switch to light mode';
    } else {
      themeIcon.className = 'fas fa-moon theme-icon';
      themeIcon.title = 'Switch to dark mode';
    }
  }
}

// Toggle theme manually
function toggleTheme() {
  const isDark = html.classList.toggle('dark');
  const newTheme = isDark ? 'dark' : 'light';
  
  // Save manual preference
  localStorage.setItem('theme', newTheme);
  localStorage.setItem('theme-manual', 'true'); // Mark as manually set
  
  updateThemeIcon(isDark);
  
  // Show theme change notification
  showThemeChangeNotification(newTheme);
}

// Watch for system theme changes
function watchSystemThemeChanges() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  mediaQuery.addEventListener('change', (e) => {
    // Only follow system changes if user hasn't manually set preference
    const isManual = localStorage.getItem('theme-manual') === 'true';
    
    if (!isManual) {
      const systemPrefersDark = e.matches;
      applyTheme(systemPrefersDark);
      localStorage.setItem('theme', systemPrefersDark ? 'dark' : 'light');
      updateThemeIcon(systemPrefersDark);
      
      // Show system theme change notification
      showSystemThemeChangeNotification(systemPrefersDark ? 'dark' : 'light');
    }
  });
}

// Reset to system preference
function resetToSystemTheme() {
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  applyTheme(systemPrefersDark);
  localStorage.setItem('theme', systemPrefersDark ? 'dark' : 'light');
  localStorage.removeItem('theme-manual'); // Remove manual flag
  
  updateThemeIcon(systemPrefersDark);
  
  // Show reset notification
  showThemeResetNotification();
}

// Theme change notifications
function showThemeChangeNotification(theme) {
  // Remove existing notification
  const existingNotification = document.getElementById('theme-notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.id = 'theme-notification';
  notification.className = 'theme-notification';
  notification.innerHTML = `
    <span>Switched to ${theme} mode</span>
    <button class="theme-undo-btn" onclick="resetToSystemTheme()">
      <i class="fas fa-undo"></i> Reset to system
    </button>
  `;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // Hide after 4 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

function showSystemThemeChangeNotification(theme) {
  const notification = document.createElement('div');
  notification.id = 'theme-notification';
  notification.className = 'theme-notification system-theme';
  notification.innerHTML = `
    <span>Following system preference: ${theme} mode</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

function showThemeResetNotification() {
  const notification = document.createElement('div');
  notification.id = 'theme-notification';
  notification.className = 'theme-notification';
  notification.innerHTML = `
    <span>Reset to system theme preference</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Get current theme info
function getThemeInfo() {
  const isDark = html.classList.contains('dark');
  const isManual = localStorage.getItem('theme-manual') === 'true';
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  return {
    current: isDark ? 'dark' : 'light',
    isManual,
    system: systemPrefersDark ? 'dark' : 'light',
    isFollowingSystem: !isManual
  };
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

// Initialize ScrollReveal Animations
function initScrollReveal() {
  // Common reveal configuration
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '30px',
    duration: 800,
    delay: 200,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    reset: false,
    mobile: true
  });

  // Hero section animations
  sr.reveal('.hero-title', { 
    origin: 'top',
    distance: '50px',
    delay: 300
  });
  
  sr.reveal('.hero-subtitle', { 
    delay: 500 
  });
  
  sr.reveal('.hero-cta', { 
    delay: 700 
  });

  // Skills section animations
  sr.reveal('.section-title', { 
    origin: 'top',
    distance: '40px'
  });
  
  sr.reveal('.skill-card', { 
    interval: 200 
  });

  // Project cards animations
  sr.reveal('.project-card', { 
    interval: 150 
  });

  // About page animations
  sr.reveal('.about-text p', { 
    interval: 150 
  });
  
  sr.reveal('.skill-tag', { 
    interval: 100,
    distance: '20px'
  });

  // Contact page animations
  sr.reveal('.contact-card', { 
    origin: 'top',
    distance: '40px'
  });
  
  sr.reveal('.info-item', { 
    interval: 150 
  });

  // Page title animations
  sr.reveal('.page-title', { 
    origin: 'top',
    distance: '40px'
  });
  
  sr.reveal('.page-subtitle', { 
    delay: 300 
  });
}

// Fade-in animation on scroll (fallback)
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

// Loading Animation Elements
const loadingAnimation = document.getElementById('loading-animation');

// Hide Loading Animation
function hideLoadingAnimation() {
  if (loadingAnimation) {
    // Add a small delay to ensure content is ready
    setTimeout(() => {
      loadingAnimation.classList.add('hidden');
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        if (loadingAnimation.parentNode) {
          loadingAnimation.parentNode.removeChild(loadingAnimation);
        }
      }, 500);
    }, 800); // Minimum display time
  }
}

// Show Loading Animation (for page transitions)
function showLoadingAnimation() {
  if (loadingAnimation) {
    loadingAnimation.classList.remove('hidden');
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

// Handle page navigation with loading animation
function handlePageNavigation() {
  const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto:"])');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Only show loading for internal navigation
      if (link.href && link.href.startsWith(window.location.origin)) {
        e.preventDefault();
        showLoadingAnimation();
        
        // Navigate after showing loading animation
        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      }
    });
  });
}

// Set active nav links based on current URL
function setActiveNavLinks() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();

    if (linkFile === currentFile) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme with system preference detection
  initTheme();

  // Initialize ScrollReveal animations
  initScrollReveal();

   // Initialize page navigation handling
  handlePageNavigation();
  // Update active state for nav links
  setActiveNavLinks();

   // Hide loading animation when page is fully loaded
  window.addEventListener('load', () => {
    // Add a minimum display time for better UX
    setTimeout(hideLoadingAnimation, 1000);
  });

  // Fallback: hide loading animation if page takes too long
  setTimeout(hideLoadingAnimation, 3000);
  
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
