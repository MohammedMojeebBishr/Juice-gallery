document.addEventListener('DOMContentLoaded', () => {
    
    // شريط التنقل عند التمرير (Navbar Scroll Effect)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // القائمة للموبايل (Mobile Menu Toggle)
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // منع التمرير في الخلفية عند فتح القائمة
        if(navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // إغلاق القائمة عند النقر على أي رابط
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // التنقل السلس وتسليط الضوء على القسم الحالي (Smooth Scrolling & Active Link)
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}` || (current === 'home' && item.getAttribute('href') === '#')) {
                item.classList.add('active');
            }
        });
    });

    // تأثيرات الظهور عند التمرير (Scroll Reveal Animation)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور لمرة واحدة
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-right, .slide-in-left');
    animatedElements.forEach(el => observer.observe(el));

    // معالجة نموذج الاتصال (Contact Form Submission)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // هنا يمكن ربط النموذج بالخادم مستقبلاً
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.textContent = 'جاري الإرسال...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // محاكاة عملية الإرسال
            setTimeout(() => {
                alert('شكراً لتواصلك معنا! تم استلام رسالتك بنجاح وسنرد عليك قريباً.');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }, 1500);
        });
    }

});
