// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initParticles();
    initAOS();
    initNavbar();
    initThemeToggle();
    initTypingEffect();
    initScrollAnimation();
    initBackToTop();
    initProjectsFilter();
    initProjectsData();
    initContactForm();
    initHaptics();
    setCurrentYear();
});

// Initialize particles.js
function initParticles() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    if (document.getElementById('particles-js')) {
        const run = () => particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#4a6cf7'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#4a6cf7',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
        if ('requestIdleCallback' in window) {
            requestIdleCallback(run);
        } else {
            setTimeout(run, 0);
        }
    }
}

// Initialize AOS animation library
function initAOS() {
    const run = () => AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    if ('requestIdleCallback' in window) {
        requestIdleCallback(run);
    } else {
        setTimeout(run, 0);
    }
}

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('#mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const isOpen = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu with Escape key
        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle?.classList.remove('active');
            navMenu.classList.remove('active');
            menuToggle?.setAttribute('aria-expanded', 'false');
        });
    });

    // Add active class to nav links on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });

        // Navbar scroll effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = 'light';
        
        if (currentTheme !== 'dark') {
            newTheme = 'dark';
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const phrases = [
        'Machine Learning Engineer',
        'Deep Learning Enthusiast',
        'Problem Solver'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Scroll animations for elements
function initScrollAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Initialize progress bars at 0 width
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.progress-bar');
        const percentage = item.querySelector('.skill-percentage').textContent;
        progressBar.style.width = '0%';
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Function to animate elements when they come into view
    function animateOnScroll() {
        skillItems.forEach(item => {
            if (isInViewport(item)) {
                const progressBar = item.querySelector('.progress-bar');
                const percentage = item.querySelector('.skill-percentage').textContent;
                progressBar.style.width = percentage;
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
}

// Back to top button functionality
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Projects filter functionality
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            if (projectItems.length > 0) {
                if (filterValue === 'all') {
                    projectItems.forEach(item => {
                        item.style.display = 'block';
                    });
                } else {
                    projectItems.forEach(item => {
                        if (item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            }
        });
    });
}

// Dynamically populate projects
function initProjectsData() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    // Sample project data
    const projects = [
        {
            id: 1,
            title: "Adult Tooth Segmentation Using U-Net",
            description: "Made a tool to produce accurate masks of teeth from dental x-rays for segmentation purposes. Utilized U-Net architecture with TensorFlow and Keras, integrated with ZenML for MLOps and MLflow for experiment tracking.",
            image: "https://i.postimg.cc/85Md8RtZ/Adult-Tooth-Segmentation-Using-U-Net-Adult-Tooth-Segmentation-Using-U-Net.png",
            category: "Image Processing",
            tags: ['Python', 'Machine Learning', 'Keras', 'TensorFlow', 'Data Science', 'MLOps'],
            codeLink: "https://github.com/Atiar11/-Adult-Tooth-segmentation-using-U-Net"
        },
        {
            id: 2,
            title: 'Laptop Price Predictor',
            description: 'A price prediction model and application using machine learning algorithms such as Random Forest, Linear Regression, and Voting Regressor. Proper Data Processing and features were extracted from a dataset taken from a Kaggle website and then engineered.A price prediction model and application using machine learning algorithms such as Random Forest, Linear Regression, and Voting Regressor. Proper Data Processing and features were extracted from a dataset taken from a Kaggle website and then engineered.',
            image: 'https://i.postimg.cc/NM8kZ8jP/Laptop-Price-Predictor.png',
            category: 'AI',
            tags: ['Python','Machine Learning','Data Science','Flask','Random Forest'],
            codeLink: 'https://github.com/Atiar11/Laptop-Price-Predictor'
        },
        {
            id: 3,
            title: 'Parkinsons Disease Detection',
            description: 'Developed a Parkinsons disease detector using machine learning libraries such as Pandas, Sklearn, and Numpy to enable early diagnosis, offering significant value for healthcare providers by improving patient outcomes and providing scalable solutions in medical diagnostics.',
            image: 'https://i.postimg.cc/cHc5fGwd/Parkinson-s-Disease-Detection.png',
            category: 'AI',
            tags: ['Python', 'Machine Learning', 'Data Science', 'Pandas', 'Sklearn', 'Numpy'],
            codeLink: 'https://github.com/Atiar11/Parkinson-s-Disease-Detection'
        },

        {
            id: 4,
            title: 'Diabetes Detection',
            description: 'The project involved developing machine learning models for diabetes prediction using Python libraries such as Scikit-learn. Algorithms like K-Nearest Neighbors (KNN), Random Forest, and Naive Bayes were employed to classify whether individuals have diabetes based on various health indicators, with preprocessing steps including feature selection, data balancing, and dataset splitting.',
            image: 'https://i.postimg.cc/3RCxs1DT/Diabetes-Detection.png',
            category: 'ML',
            tags: ['Python', 'Machine Learning', 'Data Science', 'Scikit-learn', 'KNN', 'Random Forest'],
            codeLink: 'https://github.com/Atiar11/Diabetes-Detection'
        },
        {
            id: 5,
            title: 'Anime Stramming Website with Chat and Wishlist',
            description: 'In this project, we have created a website in which a registered user will be able to chat with each other, shop from the merch store and not just that a user can also create a wishlist of their favorite items. Along with this, one can watch the trailer, description, cast, synopsis, and rating of an anime.',
            image: 'https://i.postimg.cc/XvMgYNXX/Anime-Streaming.png',
            category: 'Web Development',
            tags: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
            codeLink: 'https://github.com/Atiar11/Anime-Streaming-Website'
        },

        {
            id: 6,
            title: 'Salary Management System',
            description: 'Created a basic database system to handle salary management in a small organization using PHP, CSS, and MySQL. The system allows for adding, updating, and deleting employee records, as well as generating salary slips and reports. Implemented user authentication to ensure data security and integrity.',
            image: 'https://i.postimg.cc/bwjcMBtb/Salary-Management-System.png',
            category: 'Web Development',
            tags: ['PHP', 'MySQL', 'CSS', 'Web Development'],
            codeLink: 'https://github.com/Atiar11/Salary-Management-System'
        },
        {
            id: 7,
            title: 'Online E-commerce Website',
            description: 'Created an e-commerce website using HTML, XAMPP, CSS, Bootstrap, and MySQL. The website features product listings, a shopping cart, user authentication, and an admin panel for managing products and orders. Implemented responsive design to ensure compatibility across devices.',
            image: 'https://i.postimg.cc/RCXL26Jj/Online-E-commerce-Website.png',
            category: 'Web Development',
            tags: ['HTML', 'CSS', 'Bootstrap', 'PHP', 'MySQL', 'Web Development'],
            codeLink: 'https://github.com/Atiar11/Online-E-commerce-Website'
        },
        {
            id: 8,
            title: 'Income Tax Calculator',
            description: 'Created a tool using MERN stack that calculates income tax based on user input, offering real-time results with a clean, responsive interface. The application includes user authentication, data validation, and stores calculation history for future reference.',
            image: 'https://i.postimg.cc/jj47NmzH/Income-Tax-Calculator.png',
            category: 'Web Development',
            tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript', 'Web Development'],
            codeLink: 'https://github.com/Atiar11/Income-Tax-Calculator'
        },
        {
            id: 9,
            title: 'Space Defender',
            description: 'A 2D game using OpenGL where players control a spaceship to defend against incoming asteroids. Features include multiple levels, power-ups, and score tracking. Implemented using C++ and OpenGL for graphics rendering.',
            image: 'https://i.postimg.cc/c47gPPzx/2D-Game.png',
            category: 'Game Development',
            tags: ['Python', 'OpenGL'],
            codeLink: 'https://github.com/Atiar11/423-Lab'
        },
        {
            id: 10,
            title: 'Unveiling Market Manipulation: Detection Strategies and Implications for Stock Markets',
            description: 'Work under progress ',
            image: 'https://i.postimg.cc/fyhpF33w/Unveiling-Market-Manipulation.png',
            category: 'ML',
            tags: ['Python', 'Machine Learning', 'Data Science', 'Pandas', 'Sklearn', 'Numpy'],
            DemoPaper: 'https://drive.google.com/file/d/14v6jkpu8FoeSvozHKXjR2mz34YQAbpaq/view'
        },
        {
            id: 11,
            title: 'BRAC University Undergraduate Thesis - Fire Brigade Response Enhancement Using Drone Swarms: Comparative Analysis and Byond',
            description: 'Journal Publication under progress ',
            image: 'https://i.postimg.cc/tT09q412/Thesis.png',
            category: 'ML',
            tags: ['Reinforcement Learning', 'Deep Learning', 'Computer Vision', 'Drone Technology', 'Artificial Potential Fields'],
            DemoPaper: ''
        },
    ];
    
    // Create project items
    projects.forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.className = `project-item ${project.category}`;
        projectItem.setAttribute('data-aos', 'fade-up');
        projectItem.setAttribute('data-aos-delay', (project.id * 100).toString());
        
        projectItem.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy" decoding="async">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.demoLink && project.demoLink !== '' ? `
                        <a href="${project.demoLink}" class="project-link" target="_blank" rel="noopener">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    ` : ''}
                    <a href="${project.codeLink}" class="project-link" target="_blank" rel="noopener">
                        <i class="fab fa-github"></i> Source Code
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectItem);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission (in a real project, you would send this to a server)
            setTimeout(() => {
                // Show success message
                formStatus.textContent = 'Your message has been sent successfully!';
                formStatus.className = 'success';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
}

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
}); 

// Gentle haptic feedback for key interactions (mobile/touch only)
function initHaptics() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const canVibrate = 'vibrate' in navigator;
    if (!isTouch || !canVibrate) return;

    const vibrateTap = () => navigator.vibrate?.(12);
    const vibrateStrong = () => navigator.vibrate?.([8, 12]);

    const tapSelectors = [
        '.btn',
        '.nav-link',
        '#theme-toggle',
        '.filter-btn',
        '#back-to-top',
        '.project-link',
        '.social-link'
    ];
    const elements = document.querySelectorAll(tapSelectors.join(','));
    elements.forEach(el => {
        el.addEventListener('click', vibrateTap, { passive: true });
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') vibrateTap();
        }, { passive: true });
    });

    // Stronger feedback for theme toggle and back-to-top
    document.getElementById('theme-toggle')?.addEventListener('click', vibrateStrong, { passive: true });
    document.getElementById('back-to-top')?.addEventListener('click', vibrateStrong, { passive: true });
}
