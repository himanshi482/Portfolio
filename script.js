document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Single Sun / Moon Theme Toggle System
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    function applyTheme(themeName) {
        htmlElement.setAttribute('data-theme', themeName);
        localStorage.setItem('portfolio_theme', themeName);

        if (themeToggleBtn) {
            const icon = themeToggleBtn.querySelector('i');
            if (icon) {
                if (themeName === 'dark') {
                    // Dark theme is active -> show Sun icon (clicking switches to light theme)
                    icon.className = 'bx bx-sun';
                    themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
                    themeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
                } else {
                    // Light/Emerald theme is active -> show Moon icon (clicking switches to dark theme)
                    icon.className = 'bx bx-moon';
                    themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
                    themeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
                }
            }
        }
    }

    // Load saved theme or default to dark mode
    const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'emerald' : 'dark';
            applyTheme(newTheme);
            showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode!`, 'success');
        });
    }

    // ----------------------------------------------------
    // 2. Custom Interactive Cursor
    // ----------------------------------------------------
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Cursor hover states for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .service-card, .project-card, .skill-card, .cert-card, .stat-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('custom-cursor-hover-dot');
                cursorOutline.classList.add('custom-cursor-hover-outline');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('custom-cursor-hover-dot');
                cursorOutline.classList.remove('custom-cursor-hover-outline');
            });
        });
    }

    // ----------------------------------------------------
    // 3. Mobile Navigation Toggle
    // ----------------------------------------------------
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');
    const menuBtn = document.createElement('div');
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = '<i class="bx bx-menu"></i>';
    header.insertBefore(menuBtn, document.querySelector('.nav-actions'));

    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.className = 'bx bx-x';
        } else {
            icon.className = 'bx bx-menu';
        }
    });

    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            if (menuBtn.querySelector('i')) {
                menuBtn.querySelector('i').className = 'bx bx-menu';
            }
        });
    });

    const heroProjectsBtn = document.getElementById('heroViewProjectsBtn');
    if (heroProjectsBtn) {
        heroProjectsBtn.addEventListener('click', (e) => {
            const projectsSec = document.getElementById('projects');
            if (projectsSec) {
                e.preventDefault();
                projectsSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ----------------------------------------------------
    // 4. Dynamic Role Typing Effect
    // ----------------------------------------------------
    const typingSpan = document.querySelector('.typing-text');
    if (typingSpan) {
        const roles = ['Data Analyst', 'AWS Cloud Architect', 'DevOps Enthusiast', 'Problem Solver'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingSpan.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typingSpan.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 90;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2200; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400; // Pause before starting next word
            }

            setTimeout(type, typingSpeed);
        }
        setTimeout(type, 800);
    }

    // ----------------------------------------------------
    // 5. Scroll Header Shadow & Active Nav Link Listener
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        header.classList.toggle('header-scrolled', window.scrollY > 40);

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 180)) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 6. Scroll Reveal Observer
    // ----------------------------------------------------
    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealElements = document.querySelectorAll('.home-content, .img-box, .about-img, .about-content, .service-card, .skill-card, .project-card, .cert-card, .timeline-item, .contact-card');
    
    revealElements.forEach(el => el.classList.add('reveal-hidden'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------------------
    // 7. Quick Copy to Clipboard Handler
    // ----------------------------------------------------
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied to clipboard: ${textToCopy}`, 'success');
                }).catch(() => {
                    showToast('Failed to copy text.', 'error');
                });
            }
        });
    });

    // ----------------------------------------------------
    // 8. Contact Form Handler
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all required fields.', 'error');
                return;
            }

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalVal = submitBtn.value;
            submitBtn.disabled = true;
            submitBtn.value = 'Sending Message...';

            setTimeout(() => {
                showToast(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.value = originalVal;
            }, 1200);
        });
    }

    // ----------------------------------------------------
    // 9. Toast Notification System
    // ----------------------------------------------------
    function showToast(message, type = 'success') {
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(t => t.remove());

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 50);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // ----------------------------------------------------
    // 10. Staggered Stat Counter Animation
    // ----------------------------------------------------
    const statItems = document.querySelectorAll('.hero-stat-item');
    if (statItems.length > 0) {
        let statsAnimated = false;
        
        function animateStats() {
            if (statsAnimated) return;
            statsAnimated = true;
            
            statItems.forEach((item, index) => {
                const statNumber = item.querySelector('.hero-stat-number');
                if (!statNumber) return;
                
                const targetVal = parseInt(statNumber.getAttribute('data-target') || '0', 10);
                const fullText = statNumber.textContent.trim();
                const suffix = fullText.replace(/[0-9]/g, '');
                
                setTimeout(() => {
                    let startTime = null;
                    const duration = 1200;
                    
                    function step(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeOut * targetVal);
                        
                        statNumber.textContent = current + suffix;
                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            statNumber.textContent = targetVal + suffix;
                        }
                    }
                    requestAnimationFrame(step);
                }, index * 350); // Staggered count-up delay: Stat 1 at 0ms, Stat 2 at 350ms, Stat 3 at 700ms
            });
        }

        const statsRow = document.querySelector('.hero-stats-row');
        if (statsRow) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateStats();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            statsObserver.observe(statsRow);
        }
    }

    // ----------------------------------------------------
    // 11. 3D Perspective Hover-Tilt on Cards
    // ----------------------------------------------------
    const tiltCards = document.querySelectorAll('.project-card, .cert-card, .service-card, .skill-card');
    tiltCards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const rotateX = - (y / (rect.height / 2)) * 8;
            const rotateY = (x / (rect.width / 2)) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });

    // ----------------------------------------------------
    // 12. Certificate Verification Modal Controller
    // ----------------------------------------------------
    const certModal = document.getElementById('certModal');
    const certModalClose = document.getElementById('certModalClose');
    const certModalBackdrop = document.getElementById('certModalBackdrop');
    const certViewBtns = document.querySelectorAll('.cert-view-btn');

    const modalTitle = document.getElementById('modalTitle');
    const modalIssuer = document.getElementById('modalIssuer');
    const modalDate = document.getElementById('modalDate');
    const modalId = document.getElementById('modalId');
    const modalDesc = document.getElementById('modalDesc');
    const modalSkills = document.getElementById('modalSkills');
    const modalBadge = document.getElementById('modalBadge');
    const modalVerifyBtn = document.getElementById('modalVerifyBtn');
    const modalCertImg = document.getElementById('modalCertImg');

    function openCertModal(btn) {
        if (!certModal) return;

        const title = btn.getAttribute('data-cert-title') || 'Certificate';
        const issuer = btn.getAttribute('data-issuer') || 'Issuer';
        const date = btn.getAttribute('data-date') || '2026';
        const certId = btn.getAttribute('data-id') || 'N/A';
        const desc = btn.getAttribute('data-desc') || '';
        const skills = (btn.getAttribute('data-skills') || '').split(',');
        const iconClass = btn.getAttribute('data-icon') || 'bx-award';
        const imgSrc = btn.getAttribute('data-img') || '';
        const verifyUrl = btn.getAttribute('data-verify-url');

        if (modalTitle) modalTitle.textContent = title;
        if (modalIssuer) modalIssuer.textContent = `Issued by ${issuer}`;
        if (modalDate) modalDate.textContent = date;
        if (modalId) modalId.textContent = certId;
        if (modalDesc) modalDesc.textContent = desc;

        if (modalCertImg && imgSrc) {
            modalCertImg.src = imgSrc;
            modalCertImg.alt = title;
        }

        if (modalBadge) {
            modalBadge.innerHTML = `<i class="bx ${iconClass}"></i>`;
        }

        if (modalSkills) {
            modalSkills.innerHTML = skills.map(skill => `<span>${skill.trim()}</span>`).join('');
        }

        if (modalVerifyBtn) {
            modalVerifyBtn.onclick = () => {
                if (verifyUrl) {
                    window.open(verifyUrl, '_blank', 'noopener,noreferrer');
                    showToast(`Opening Verification Portal for Certificate ID: ${certId}`, 'success');
                } else {
                    showToast(`Verified Credential: ${title} (${certId})`, 'success');
                }
            };
        }

        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    certViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openCertModal(btn);
        });
    });

    document.querySelectorAll('.cert-card').forEach(card => {
        const imgBox = card.querySelector('.cert-img-box');
        const viewBtn = card.querySelector('.cert-view-btn');
        if (imgBox && viewBtn) {
            imgBox.addEventListener('click', (e) => {
                e.stopPropagation();
                openCertModal(viewBtn);
            });
        }
    });

    if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
    if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);

    // ----------------------------------------------------
    // 13. Interactive Resume Modal Controller
    // ----------------------------------------------------
    const resumeModal = document.getElementById('resumeModal');
    const resumeModalBackdrop = document.getElementById('resumeModalBackdrop');
    const resumeModalClose = document.getElementById('resumeModalClose');
    const resumeFooterClose = document.getElementById('resumeFooterClose');
    const openResumeBtn = document.getElementById('openResumeBtn');
    const resumePrintBtn = document.getElementById('resumePrintBtn');
    const resumeDownloadBtnTop = document.getElementById('resumeDownloadBtnTop');
    const resumeDownloadBtnBottom = document.getElementById('resumeDownloadBtnBottom');

    function openResume() {
        if (!resumeModal) return;
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeResume() {
        if (!resumeModal) return;
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (openResumeBtn) {
        openResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openResume();
        });
    }

    if (resumeModalClose) resumeModalClose.addEventListener('click', closeResume);
    if (resumeFooterClose) resumeFooterClose.addEventListener('click', closeResume);
    if (resumeModalBackdrop) resumeModalBackdrop.addEventListener('click', closeResume);

    if (resumePrintBtn) {
        resumePrintBtn.addEventListener('click', () => {
            window.print();
        });
    }

    [resumeDownloadBtnTop, resumeDownloadBtnBottom].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                showToast('Downloading Himanshi Bawne Resume (PDF)...', 'success');
            });
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (resumeModal && resumeModal.classList.contains('active')) {
                closeResume();
            } else if (certModal && certModal.classList.contains('active')) {
                closeCertModal();
            }
        }
    });
});


