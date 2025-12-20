// ============================================
// Portfolio Website JavaScript
// ============================================

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.getElementById('contactForm');

// ============================================
// Dark/Light Mode Toggle
// ============================================

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Toggle theme function
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Event listener for theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// ============================================
// Mobile Menu Toggle
// ============================================

// Open mobile menu
function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close mobile menu
function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Event listeners for mobile menu
menuToggle.addEventListener('click', openMobileMenu);
closeMenu.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Calculate header height for offset
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Scroll to Top Button
// ============================================

// Show/hide scroll to top button based on scroll position
function toggleScrollTopButton() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listeners for scroll to top
window.addEventListener('scroll', toggleScrollTopButton);
scrollTopBtn.addEventListener('click', scrollToTop);

// ============================================
// Contact Form Handling (Frontend Only)
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    
    // Reset form
    contactForm.reset();
}

// Add event listener to contact form
contactForm.addEventListener('submit', handleFormSubmit);

// ============================================
// Sticky Header on Scroll
// ============================================

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove sticky class based on scroll position
    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// ============================================
// Page Load Animation
// ============================================

// Add fade-in animation to elements on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ============================================
// Current Year in Footer Copyright
// ============================================

// Update copyright year automatically
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
    copyrightElement.textContent = copyrightElement.textContent.replace('2025', currentYear);
}

// ============================================
// Profile Photo Fallback
// ============================================

// Check if profile photo exists, otherwise show placeholder
window.addEventListener('load', function() {
    const profilePhoto = document.querySelector('.profile-photo');
    const photoPlaceholder = document.querySelector('.photo-placeholder');
    
    if (profilePhoto) {
        // Check if image loaded successfully
        profilePhoto.onerror = function() {
            // Hide the broken image
            this.style.display = 'none';
            // Show the placeholder
            if (photoPlaceholder) {
                photoPlaceholder.style.zIndex = '1';
            }
        };
        
        // If image loads successfully, hide placeholder
        profilePhoto.onload = function() {
            if (photoPlaceholder) {
                photoPlaceholder.style.display = 'none';
            }
        };
        
        // Trigger load check
        if (profilePhoto.complete) {
            profilePhoto.onload();
        }
    }
});