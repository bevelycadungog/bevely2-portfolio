document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. PRELOADER DISMISSAL RITUAL
    // ==========================================
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
        // Initialize AOS directly after page load completes
        setTimeout(() => {
            AOS.init({
                duration: 1000,
                once: true,
                mirror: false
            });
            runStatsCounter();
        }, 300);
    });

    // Fallback in case loading event is already completed
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader && preloader.style.opacity !== '0') {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            AOS.init({ duration: 1000, once: true });
            runStatsCounter();
        }
    }, 2500);


    // ==========================================
    // 2. MOBILE RESPONSIVE HAMBURGER SYSTEM
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    // ==========================================
    // 3. STICKY GLASSMORPHIC HEADER SCROLL EFFECT
    // ==========================================
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // ==========================================
    // 4. LIGHTWEIGHT TYPEWRITER ENGINE
    // ==========================================
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

            let typeSpeed = 80;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.wait;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                typeSpeed = 400;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }


    // ==========================================
    // 5. ANIMATED STATISTICS COUNTER ENGINE
    // ==========================================
    function runStatsCounter() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const increment = target / 100;
            
            const updateCounter = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = `${Math.ceil(count + increment)}`;
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target + (counter.parentElement.innerText.includes('%') || target === 100 || target === 99 ? '%' : '+');
                }
            };
            updateCounter();
        });
    }


    // ==========================================
    // 6. SCROLL SPY MECHANISM
    // ==========================================
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });


    // ==========================================
    // 7. CONTACT FORM SUBMISSION HOOK (MOCK)
    // ==========================================
    const contactForm = document.getElementById('portfolioContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Premium alert simulation overlay
            alert(`Thank you, ${name}! Your inquiry concerning "${subject}" has been successfully logged. Bevely will connect with you via ${email} shortly.`);
            
            contactForm.reset();
        });
    }
});
