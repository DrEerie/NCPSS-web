"use strict";
// Load components dynamically and handle errors gracefully
function loadComponent(id, url, callback) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to load component: ${url} (${response.status} ${response.statusText})`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById(id).innerHTML = data;
        if (callback) callback();
      })
      .catch(error => {
        console.error(`Error loading component ${url}:`, error);
        // Fallback content for critical components
        if (id === 'navbar') {
          document.getElementById(id).innerHTML = `
            <header class="bg-white shadow-sm">
              <div class="container mx-auto py-4 px-6">
                <a href="index.html" class="text-2xl font-bold text-blue-800">NCPSS</a>
              </div>
            </header>
          `;
        } else if (id === 'footer') {
          document.getElementById(id).innerHTML = `
            <footer class="bg-blue-900 text-white p-4 text-center">
              &copy; 2025 NCPSS. All rights reserved.
            </footer>
          `;
        }
      });
  }
  
  window.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar', '/components/navbar.html', initNavbar); 
    loadComponent('footer', '/components/footer.html');
  });
  
// Initialize the navbar functionality
// This function handles the mobile menu toggle, dropdowns, and sticky behavior.
  function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
  
    if (navToggle && mobileMenu) {
      navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  
    // Mobile dropdown toggles
    document.querySelectorAll('.toggle-submenu').forEach(button => {
      button.addEventListener('click', (e) => {
        const submenu = button.nextElementSibling;
        if (submenu) submenu.classList.toggle('hidden');
        e.stopPropagation();
      });
    });
  
    // Desktop dropdowns
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      const button = dropdown.querySelector('button');
      const menu = dropdown.querySelector('.dropdown-menu');
  
      if (button && menu) {
        // Toggle on click (mobile or fallback)
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          closeAllDropdownsExcept(menu);
          menu.classList.toggle('hidden');
        });
      }
    });
  
    // Click anywhere else closes dropdowns
    document.addEventListener('click', () => {
      closeAllDropdowns();
    });
  
    // Highlight current nav link
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === 'index.html' && href === '/')) {
        link.classList.add('text-blue-700', 'font-semibold');
        link.style.setProperty('--tw-text-opacity', '1');
      }
    });
  
    // Sticky navbar scroll behavior
    const header = document.querySelector('header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
          header.classList.add('shadow-md');
        } else {
          header.classList.remove('shadow-md');
        }
      });
    }
  }
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.add('hidden');
    });
  }
  function closeAllDropdownsExcept(except) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      if (menu !== except) {
        menu.classList.add('hidden');
      }
    });
  }
  
  // HERO CAROUSEL SCRIPT
  document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.getElementById('hero-carousel');
    if (!carouselContainer) return; // Skip if no carousel on page
    
    const images = carouselContainer.querySelectorAll('img');
    let current = 0;
    const intervalTime = 5000;
    let autoSlide;
  
    // Create indicator container if it doesn't exist
    let indicatorContainer = document.querySelector('.absolute.bottom-4');
    if (!indicatorContainer) {
      indicatorContainer = document.createElement('div');
      indicatorContainer.className = 'absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2';
      carouselContainer.parentNode.appendChild(indicatorContainer);
    }
  
    // Create indicators
    images.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('carousel-indicator');
      indicator.addEventListener('click', () => {
        stopAutoSlide();
        current = index;
        showImage(current);
        startAutoSlide();
      });
      indicatorContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.carousel-indicator');
  
    function showImage(index) {
      images.forEach(img => img.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
      
      images[index].classList.add('active');
      indicators[index].classList.add('active');
    }
  
    function nextImage() {
      current = (current + 1) % images.length;
      showImage(current);
    }
  
    function prevImage() {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    }
  
    function startAutoSlide() {
      autoSlide = setInterval(nextImage, intervalTime);
    }
  
    function stopAutoSlide() {
      clearInterval(autoSlide);
    }
    
    carouselContainer.addEventListener("mouseenter", stopAutoSlide);
    carouselContainer.addEventListener("mouseleave", startAutoSlide);
    
    // Initial setup
    showImage(current);
    startAutoSlide();
  
    // Add event listeners to navigation buttons if they exist
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        stopAutoSlide();
        nextImage();
        startAutoSlide();
      });
    }
    if (prevButton) {
      prevButton.addEventListener("click", () => {
        stopAutoSlide();
        prevImage();
        startAutoSlide();
      });
    }
  });

  // For Welcome/About Us section
  document.addEventListener('DOMContentLoaded', () => {
    // Get existing animation controller or create a new one
    const animationController = window.animationController || {
      elements: document.querySelectorAll('[data-animation]'),
      
      reset(element) {
        const animationType = element.getAttribute('data-animation');
        
        element.style.opacity = '0';
        
        if (animationType === 'slide-up') {
          element.style.transform = 'translateY(30px)';
        } else if (animationType === 'reveal-welcome') {
          element.style.transform = 'translateY(20px)';
        } else if (animationType === 'pop-in') {
          element.style.transform = 'scale(0)';
        }
        
        element.classList.remove(
          'animate-reveal-welcome', 
          'animate-slide-up', 
          'animate-pop-in'
        );
      },
      
      animate(element) {
        const animationType = element.getAttribute('data-animation');
        const delay = element.getAttribute('data-delay') || 0;
        
        // Apply delay if specified
        element.style.transitionDelay = `${delay}ms`;
        element.style.animationDelay = `${delay}ms`;
        
        setTimeout(() => {
          element.style.opacity = '1';
          
          if (animationType === 'reveal-welcome') {
            element.classList.add('animate-reveal-welcome');
            element.style.transform = 'translateY(0)';
          } else if (animationType === 'slide-up') {
            element.style.transform = 'translateY(0)';
          } else if (animationType === 'pop-in') {
            element.classList.add('animate-pop-in');
          }
        }, 50);
      },
      
      init() {
        // Initialize all elements to their starting state
        this.elements.forEach(element => {
          this.reset(element);
        });
        
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.animate(entry.target);
            } else {
              // Reset when scrolling back up and element is out of view
              this.reset(entry.target);
            }
          });
        }, { 
          threshold: 0.15,
          rootMargin: '0px 0px -100px 0px'
        });
        
        // Start observing all elements
        this.elements.forEach(element => {
          observer.observe(element);
        });
      }
    };
    
    // Initialize animations if not already done
    if (!window.animationController) {
      animationController.init();
      window.animationController = animationController;
    } else {
      // Refresh the elements list to include welcome section
      window.animationController.elements = document.querySelectorAll('[data-animation]');
      window.animationController.init();
    }
    
    // Button hover effect
    const learnMoreBtn = document.querySelector('#welcome-section a');
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener('mouseenter', () => {
        learnMoreBtn.classList.add('scale-105');
      });
      
      learnMoreBtn.addEventListener('mouseleave', () => {
        learnMoreBtn.classList.remove('scale-105');
      });
    }
  });

  //For Programs offered section & Why Choose Us section
  
  document.addEventListener('DOMContentLoaded', () => {
    // Animation controller
    const animationController = {
      elements: document.querySelectorAll('[data-animation]'),
      
      // Reset animation state when element leaves viewport
      reset(element) {
        const animationType = element.getAttribute('data-animation');
        const direction = element.getAttribute('data-direction');
        
        element.style.opacity = '0';
        
        if (animationType === 'fade-slide') {
          switch(direction) {
            case 'right':
              element.style.transform = 'translateX(30px)';
              break;
            case 'left':
              element.style.transform = 'translateX(-30px)';
              break;
            case 'up':
              element.style.transform = 'translateY(30px)';
              break;
          }
        } else if (animationType === 'zoom-in') {
          element.style.transform = 'scale(0.9)';
        }
        
        // Remove animation classes
        element.classList.remove('animate-fade-in', 'animate-slide-right', 'animate-slide-left', 'animate-slide-up', 'animate-zoom-in');
      },
      
      // Apply animation when element enters viewport
      animate(element) {
        const animationType = element.getAttribute('data-animation');
        const direction = element.getAttribute('data-direction');
        const delay = element.getAttribute('data-delay') || 0;
        
        // Apply delay if specified
        element.style.transitionDelay = `${delay}ms`;
        
        setTimeout(() => {
          element.style.opacity = '1';
          
          if (animationType === 'fade-in') {
            element.classList.add('animate-fade-in');
          } else if (animationType === 'fade-slide') {
            switch(direction) {
              case 'right':
                element.classList.add('animate-slide-right');
                break;
              case 'left':
                element.classList.add('animate-slide-left');
                break;
              case 'up':
                element.classList.add('animate-slide-up');
                break;
            }
            element.style.transform = 'translate(0)';
          } else if (animationType === 'zoom-in') {
            element.classList.add('animate-zoom-in');
            element.style.transform = 'scale(1)';
          }
        }, 50); // Small delay to ensure CSS transitions work properly
      },
      
      init() {
        // Initialize all elements to their starting state
        this.elements.forEach(element => {
          this.reset(element);
        });
        
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.animate(entry.target);
            } else {
              // Reset when scrolling back up and element is out of view
              this.reset(entry.target);
            }
          });
        }, { 
          threshold: 0.15, // Trigger when at least 15% of the element is visible
          rootMargin: '0px 0px -100px 0px' // Adjust rootMargin to trigger slightly before element is in view
        });
        
        // Start observing all elements
        this.elements.forEach(element => {
          observer.observe(element);
        });
      }
    };
    
    // Initialize animations
    animationController.init();
    
    // Add floating effect to cards on hover
    const programCards = document.querySelectorAll('#programs-section .bg-white');
    programCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.animation = 'float 3s ease-in-out infinite';
      });
      card.addEventListener('mouseleave', () => {
        card.style.animation = 'none';
      });
    });
  
    // Add interactive effects to feature icons
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
      const iconContainer = card.querySelector('.icon-container');
      
      // Random rotation on hover for more playful interaction
      card.addEventListener('mouseenter', () => {
        const randomRotation = Math.random() < 0.5 ? -5 : 5;
        iconContainer.style.transform = `rotate(${randomRotation}deg) scale(1.15)`;
      });
      
      card.addEventListener('mouseleave', () => {
        iconContainer.style.transform = 'rotate(0) scale(1)';
      });
    });
  });

  //Shows one testimonial at a time in the testimonial section and allows transition.
  document.addEventListener('DOMContentLoaded', () => {
    const testimonialItems = document.querySelectorAll('#testimonial-container .testimonial-item');
    let currentTestimonial = 0;
  
    function showTestimonial(index) {
      testimonialItems.forEach((item, i) => {
        if (i === index) {
          item.classList.remove('opacity-0', 'translate-x-full', '-translate-x-full');
          item.classList.add('opacity-100', 'translate-x-0');
        } else if (i < index) {
          item.classList.remove('opacity-100', 'translate-x-0');
          item.classList.add('opacity-0', '-translate-x-full');
        } else {
          item.classList.remove('opacity-100', 'translate-x-0');
          item.classList.add('opacity-0', 'translate-x-full');
        }
      });
    }
  
    function nextTestimonial() {
      currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
      showTestimonial(currentTestimonial);
    }
  
    // Auto-transition every 5 seconds
    setInterval(nextTestimonial, 5000);  
  
    // Initialize the first testimonial
    showTestimonial(currentTestimonial);
  });

  //Script for the gallery section to show/filter images etc.
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize animation controller if it doesn't exist
    const animationController = window.animationController || {
      elements: document.querySelectorAll('[data-animation]'),
      
      reset(element) {
        const animationType = element.getAttribute('data-animation');
        const direction = element.getAttribute('data-direction');
        
        element.style.opacity = '0';
        
        if (animationType === 'fade-in') {
          element.style.transform = 'translateY(20px)';
        } else if (animationType === 'title-reveal') {
          element.style.transform = 'translateY(20px)';
        } else if (animationType === 'slide-recognition') {
          if (direction === 'right') {
            element.style.transform = 'translateX(50px)';
          } else if (direction === 'left') {
            element.style.transform = 'translateX(-50px)';
          }
        }
        
        element.classList.remove(
          'animate-title-reveal', 
          'animate-slide-recognition-right',
          'animate-slide-recognition-left'
        );
      },
      
      animate(element) {
        const animationType = element.getAttribute('data-animation');
        const direction = element.getAttribute('data-direction');
        const delay = element.getAttribute('data-delay') || 0;
        
        // Apply delay if specified
        element.style.transitionDelay = `${delay}ms`;
        element.style.animationDelay = `${delay}ms`;
        
        setTimeout(() => {
          element.style.opacity = '1';
          
          if (animationType === 'fade-in') {
            element.style.transform = 'translateY(0)';
          } else if (animationType === 'title-reveal') {
            element.classList.add('animate-title-reveal');
          } else if (animationType === 'slide-recognition') {
            if (direction === 'right') {
              element.classList.add('animate-slide-recognition-right');
            } else if (direction === 'left') {
              element.classList.add('animate-slide-recognition-left');
            }
          }
        }, 50);
      },
      
      init() {
        // Initialize all elements to their starting state
        this.elements.forEach(element => {
          this.reset(element);
        });
        
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.animate(entry.target);
            } else {
              // Reset when scrolling back up and element is out of view
              this.reset(entry.target);
            }
          });
        }, { 
          threshold: 0.15,
          rootMargin: '0px 0px -100px 0px'
        });
        
        // Start observing all elements
        this.elements.forEach(element => {
          observer.observe(element);
        });
      }
    };
    
    // Initialize or refresh animation controller
    if (!window.animationController) {
      animationController.init();
      window.animationController = animationController;
    } else {
      // Refresh elements list to include new sections
      window.animationController.elements = document.querySelectorAll('[data-animation]');
      window.animationController.init();
    }
  
    // Gallery functionality
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const viewMoreButton = document.getElementById('view-more-gallery');
    const hiddenItems = document.querySelectorAll('.hidden-item');
    let isExpanded = false;
    
    // Filter functionality
    galleryFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Update active state
        galleryFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const category = filter.getAttribute('data-category');
        
        // Show/hide gallery items based on category
        galleryItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // View more functionality
    viewMoreButton.addEventListener('click', () => {
      if (!isExpanded) {
        hiddenItems.forEach(item => {
          item.classList.remove('hidden-item');
          // Apply fade-in animation
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        });
        viewMoreButton.querySelector('span').textContent = 'View Less';
        isExpanded = true;
      } else {
        hiddenItems.forEach(item => {
          item.classList.add('hidden-item');
        });
        viewMoreButton.querySelector('span').textContent = 'View Full Gallery';
        isExpanded = false;
        
        // Scroll back to gallery section if needed
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    // Lightbox functionality
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    let currentImageIndex = 0;
    
    function showLightbox(index) {
      const visibleItems = Array.from(galleryItems).filter(item => 
        window.getComputedStyle(item).display !== 'none'
      );
      
      if (visibleItems.length === 0) return;
      
      currentImageIndex = Math.max(0, Math.min(index, visibleItems.length - 1));
      const item = visibleItems[currentImageIndex];
      const img = item.querySelector('img');
      const title = item.querySelector('h4')?.textContent || '';
      const description = item.querySelector('p')?.textContent || '';
      
      lightboxImage.src = img.src;
      lightboxTitle.textContent = title;
      lightboxDescription.textContent = description;
      lightbox.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
    
    function hideLightbox() {
      lightbox.classList.add('hidden');
      document.body.style.overflow = '';
    }
    
    function navigateLightbox(direction) {
      const visibleItems = Array.from(galleryItems).filter(item => 
        window.getComputedStyle(item).display !== 'none'
      );
      
      if (visibleItems.length === 0) return;
      
      currentImageIndex = (currentImageIndex + direction + visibleItems.length) % visibleItems.length;
      showLightbox(currentImageIndex);
    }
    
    // Attach lightbox events
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => showLightbox(index));
    });
    
    lightboxClose.addEventListener('click', hideLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) hideLightbox();
    });
    
    lightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(-1);
    });
    
    lightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateLightbox(1);
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('hidden')) return;
      
      if (e.key === 'Escape') hideLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  });

  // scroller button to go to top.
  document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.getElementById('scroll-top-btn');
    
    if (scrollButton) {
      // Show/hide button based on scroll position
      window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
          scrollButton.classList.add('visible');
        } else {
          scrollButton.classList.remove('visible');
        }
      });
      if (scrollButton) {
        scrollButton.addEventListener('click', function() {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('announcement-modal');
    const modalBox = document.getElementById('announcement-box');
    const closeBtn = document.getElementById('close-modal');
    const contentArea = document.getElementById('announcement-content');
    const prevBtn = document.getElementById('prev-announcement');
    const nextBtn = document.getElementById('next-announcement');
  
    const announcements = [
      {
        title: "Admissions Open",
        text: "Apply before 30th April to secure your seat.",
        image: "{{url_for('static', filename='assets/IMG-20250410-WA0076.jpg')}}"
      },
      {
        title: "Eid Holidays",
        text: "School will remain closed from 10 to 14 April.",
        image: "add image path later"
      },
      {
        title: "Science Fair 2025",
        text: "Join us on 5th May for our Annual Science Exhibition.",
        image: "add image path later"
      }
      // Add more announcements as needed
    ];
  
    let current = 0;
    let autoRotateInterval;
  
    function renderAnnouncement(index) {
      const { title, text, image } = announcements[index];
      contentArea.innerHTML = `
        <span class="text-4xl">📢</span>
        <h2 class="text-xl font-semibold text-blue-900 dark:text-blue-300">${title}</h2>
        <p class="text-gray-700 dark:text-gray-300 text-sm">${text}</p>
        <img src="${image}" alt="${title}" class="rounded-lg mt-3 shadow-md w-full max-h-[300px] object-contain">
      `;
    }
  
    function showModal() {
      modal.classList.remove('hidden');
      renderAnnouncement(current);
      startAutoRotate();
    }
  
    function hideModal() {
      modal.classList.add('hidden');
      sessionStorage.setItem('announcementDismissed', 'true');
      stopAutoRotate();
    }
  
    function nextSlide() {
      current = (current + 1) % announcements.length;
      renderAnnouncement(current);
    }
  
    function prevSlide() {
      current = (current - 1 + announcements.length) % announcements.length;
      renderAnnouncement(current);
    }
  
    function startAutoRotate() {
      autoRotateInterval = setInterval(() => {
        nextSlide();
      }, 3000);
    }
  
    function stopAutoRotate() {
      clearInterval(autoRotateInterval);
    }
  
    // Show modal only once per session
    if (!sessionStorage.getItem('announcementDismissed')) {
      showModal();
    }
  
    closeBtn.addEventListener('click', hideModal);
  
    // Dismiss on double-click outside
    modal.addEventListener('dblclick', (e) => {
      if (!modalBox.contains(e.target)) {
        hideModal();
      }
    });
  
    // Pause auto-rotate on interaction, then resume
    [prevBtn, nextBtn, modalBox].forEach(el => {
      el.addEventListener('mouseenter', stopAutoRotate);
      el.addEventListener('mouseleave', startAutoRotate);
    });
  
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });
  
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  });

  // Service Worker Registration
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/pwa/service-worker.js')
      .then(reg => console.log('✅ Service Worker Registered:', reg))
      .catch(err => console.error('❌ Service Worker Failed:', err));
  }


// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // You can tie this to a custom "Install App" button if needed
  const installBtn = document.createElement('button');
  installBtn.innerText = "Install NCPSS App";
  installBtn.style.cssText = "position:fixed;bottom:10px;right:10px;padding:10px;background:#1e40af;color:#fff;border:none;border-radius:8px;z-index:9999;";
  document.body.appendChild(installBtn);

  installBtn.addEventListener('click', () => {
    installBtn.remove();
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      console.log('User choice:', choice.outcome);
      deferredPrompt = null;
    });
  });
});
window.addEventListener('appinstalled', () => {
  console.log('App installed successfully!');
});

  
// handle the fade-in and slide effect for the "Our Other Institutes" section
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator-wrapper");
  let currentSlide = 0;
  let slideInterval;
  
  // Calculate the circumference for SVG progress
  const progressRings = document.querySelectorAll('.progress-ring-circle');
  const radius = progressRings[0].getAttribute('r');
  const circumference = radius * 2 * Math.PI;
  
  // Set initial state
  progressRings.forEach(ring => {
    ring.style.strokeDasharray = `${circumference} ${circumference}`;
    ring.style.strokeDashoffset = circumference;
  });

  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove("active");
      slide.classList.add("hidden");
    });
    
    // Show active slide
    slides[index].classList.remove("hidden");
    slides[index].classList.add("active");
  
    // Reset all indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.remove("active");
      const ring = indicator.querySelector('.progress-ring-circle');
      if (ring) {
        ring.style.strokeDashoffset = circumference;
      }
    });
    
    // Activate current indicator
    indicators[index].classList.add("active");
    
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function startAutoPlay(interval = 4000) {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
    slideInterval = setInterval(nextSlide, interval);
  }

  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }

  // Add click event listeners to indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
      // Restart the timer after manual navigation
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Initialize
  showSlide(0);
  startAutoPlay(4000);
});
