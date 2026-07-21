// ===== script.js =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 IESTM وبلاگ رادمهر اصغری آماده‌ست!');

    // ===== ۱. دکمه‌ها و لینک‌ها با افکت =====
    const buttons = document.querySelectorAll('.btn, .nav__link, .social-link');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (!this.href || this.href.startsWith('#')) {
                e.preventDefault();
            }
            
            this.style.transition = 'transform 0.1s';
            this.style.transform = 'scale(0.94)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 120);

            let message = '';
            if (this.classList.contains('btn--primary')) {
                message = '📂 در حال باز کردن لیست پروژه‌ها...';
            } else if (this.classList.contains('nav__link')) {
                message = `📌 رفتن به بخش ${this.textContent.trim()}`;
            } else if (this.classList.contains('social-link')) {
                message = `🌐 دنبال کردن در ${this.textContent.trim()}`;
            } else {
                message = '⚡ در حال پردازش...';
            }
            showNotification(message);
        });
    });

    // ===== ۲. ناوبری: تغییر حالت فعال =====
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ===== ۳. افکت هاور روی کارت‌ها =====
    const cards = document.querySelectorAll('.product-card, .post.featured, .timeline__item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1)';
        });
    });

    // ===== ۴. دابل کلیک روی هدر برای اسکرول =====
    const header = document.querySelector('.header');
    if (header) {
        header.addEventListener('dblclick', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showNotification('⬆️ برگشت به بالای صفحه');
        });
    }

    // ===== ۵. انیمیشن نقل‌قول =====
    const quote = document.querySelector('.quote');
    if (quote) {
        quote.style.opacity = '0';
        quote.style.transform = 'translateY(20px)';
        quote.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            quote.style.opacity = '1';
            quote.style.transform = 'translateY(0)';
        }, 500);
    }

    // ===== ۶. تابع نوتیفیکیشن =====
    function showNotification(text) {
        const oldNote = document.querySelector('.custom-notif');
        if (oldNote) oldNote.remove();

        const notif = document.createElement('div');
        notif.className = 'custom-notif';
        notif.textContent = text;
        
        Object.assign(notif.style, {
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%) translateY(20px)',
            background: '#111624',
            color: '#e4e6eb',
            padding: '0.8rem 2.2rem',
            borderRadius: '60px',
            fontWeight: '700',
            fontSize: '0.95rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px #2d7aff44',
            zIndex: '9999',
            fontFamily: 'Vazirmatn, sans-serif',
            direction: 'rtl',
            opacity: '0',
            transition: 'all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1)',
            border: '1px solid #2d7aff33',
            letterSpacing: '0.3px',
            backdropFilter: 'blur(8px)',
            background: 'rgba(17, 22, 36, 0.92)',
        });
        document.body.appendChild(notif);

        requestAnimationFrame(() => {
            notif.style.opacity = '1';
            notif.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => notif.remove(), 400);
        }, 2500);
    }

    // ===== ۷. پیام خوش‌آمدگویی =====
    setTimeout(() => {
        showNotification('🚀 به وبلاگ رسمی IESTM خوش آمدید!');
    }, 800);

    // ===== ۸. نمایش تاریخ =====
    const now = new Date();
    console.log(`📅 تاریخ امروز: ${now.toLocaleDateString('fa-IR')}`);
});
