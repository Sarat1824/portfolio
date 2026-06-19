document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Theme Switcher Logic
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'dark';
        if (theme === 'dark') {
            newTheme = 'light';
        }
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ----------------------------------------------------
    // Mobile Navbar Menu Toggle
    // ----------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon active states if we had any
    });

    // Close menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // ----------------------------------------------------
    // Scroll Spy & Header Effect
    // ----------------------------------------------------
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        // Navbar scrolled background shadow
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Spy active nav linking
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 180)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // Reveal On Scroll (Intersection Observer)
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Specific behavior for skills section
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ----------------------------------------------------
    // Skill Bar Animation
    // ----------------------------------------------------
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level;
        });
    }

    // ----------------------------------------------------
    // Copy to Clipboard (Email, Phone)
    // ----------------------------------------------------
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.innerHTML;
                button.innerHTML = `
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Copied!
                `;
                button.style.color = '#10b981';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // ----------------------------------------------------
    // Mock Contact Form Submission
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const submitSuccess = document.getElementById('submit-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;
            
            // Simulate API request
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Show success
                submitSuccess.innerText = `Thank you, ${name}! Your message has been sent successfully.`;
                submitSuccess.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide success after 5 seconds
                setTimeout(() => {
                    submitSuccess.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // ----------------------------------------------------
    // Resume Modal Open/Close & Print Logic
    // ----------------------------------------------------
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtnHero = document.getElementById('btn-resume');
    const openResumeBtnNav = document.getElementById('nav-resume');
    const closeResumeBtn = document.getElementById('resume-close');
    const resumeOverlay = document.getElementById('resume-modal-overlay');
    const printResumeBtn = document.getElementById('resume-print');

    function openModal() {
        if (resumeModal) {
            resumeModal.classList.add('active');
            resumeModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        }
    }

    function closeModal() {
        if (resumeModal) {
            resumeModal.classList.remove('active');
            resumeModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
        }
    }

    if (openResumeBtnHero) {
        openResumeBtnHero.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    if (openResumeBtnNav) {
        openResumeBtnNav.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }

    if (closeResumeBtn) {
        closeResumeBtn.addEventListener('click', closeModal);
    }

    if (resumeOverlay) {
        resumeOverlay.addEventListener('click', closeModal);
    }

    // Close modal with Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Print / PDF download trigger
    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', () => {
            window.print();
        });
    }
});
