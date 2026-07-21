// ===== script.js =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 IESTM وبلاگ رادمهر اصغری آماده‌ست!');

    // ===== کنترل‌های ویدیو =====
    const video = document.getElementById('customVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressFill = document.getElementById('progressFill');
    const progressHandle = document.getElementById('progressHandle');
    const timeDisplay = document.getElementById('timeDisplay');
    const volumeBtn = document.getElementById('volumeBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const videoWrapper = document.querySelector('.video-wrapper');
    const progressBar = document.querySelector('.progress-bar');

    let isDragging = false;

    // ===== دکمه پلی/مکث =====
    function togglePlay() {
        if (video.paused) {
            video.play();
            playPauseBtn.querySelector('#playIcon').style.display = 'none';
            playPauseBtn.querySelector('#pauseIconLeft').style.display = 'block';
            playPauseBtn.querySelector('#pauseIconRight').style.display = 'block';
        } else {
            video.pause();
            playPauseBtn.querySelector('#playIcon').style.display = 'block';
            playPauseBtn.querySelector('#pauseIconLeft').style.display = 'none';
            playPauseBtn.querySelector('#pauseIconRight').style.display = 'none';
        }
    }

    playPauseBtn.addEventListener('click', togglePlay);

    // ===== کلیک روی ویدیو برای پلی/مکث =====
    video.addEventListener('click', togglePlay);

    // ===== بروزرسانی نوار پیشرفت =====
    function updateProgress() {
        if (!isDragging) {
            const percent = (video.currentTime / video.duration) * 100;
            progressFill.style.width = percent + '%';
            progressHandle.style.left = percent + '%';
        }
        // بروزرسانی زمان
        const current = formatTime(video.currentTime);
        const total = formatTime(video.duration);
        timeDisplay.textContent = `${current} / ${total}`;
    }

    video.addEventListener('timeupdate', updateProgress);

    // ===== فرمت زمان =====
    function formatTime(seconds) {
        if (isNaN(seconds) || !isFinite(seconds)) return '۰:۰۰';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // ===== نوار پیشرفت قابل کلیک =====
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    });

    // ===== کشیدن نوار پیشرفت =====
    progressBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const rect = progressBar.getBoundingClientRect();
            let percent = (e.clientX - rect.left) / rect.width;
            percent = Math.max(0, Math.min(1, percent));
            progressFill.style.width = percent * 100 + '%';
            progressHandle.style.left = percent * 100 + '%';
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
        }
    });

    // ===== دکمه صدا =====
    let isMuted = false;
    volumeBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        isMuted = video.muted;
        if (isMuted) {
            volumeBtn.querySelector('#volumeHigh').style.display = 'none';
            volumeBtn.querySelector('#volumeLow').style.display = 'block';
        } else {
            volumeBtn.querySelector('#volumeHigh').style.display = 'block';
            volumeBtn.querySelector('#volumeLow').style.display = 'none';
        }
    });

    // ===== دکمه تمام صفحه =====
    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            videoWrapper.requestFullscreen().catch(err => {
                // اگر خطا داد، سعی می‌کنیم کل صفحه رو به حالت تمام صفحه ببریم
                document.documentElement.requestFullscreen();
            });
        } else {
            document.exitFullscreen();
        }
    });

    // ===== نمایش کنترل‌ها با حرکت موس =====
    let controlsTimeout;
    videoWrapper.addEventListener('mousemove', () => {
        const controls = document.querySelector('.video-controls');
        controls.classList.add('show');
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            if (!video.paused) {
                controls.classList.remove('show');
            }
        }, 3000);
    });

    videoWrapper.addEventListener('mouseleave', () => {
        const controls = document.querySelector('.video-controls');
        if (!video.paused) {
            controls.classList.remove('show');
        }
    });

    // ===== نمایش کنترل‌ها هنگام مکث =====
    video.addEventListener('pause', () => {
        document.querySelector('.video-controls').classList.add('show');
    });

    video.addEventListener('play', () => {
        const controls = document.querySelector('.video-controls');
        controls.classList.add('show');
        setTimeout(() => {
            controls.classList.remove('show');
        }, 3000);
    });

    // ===== دکمه‌ها و لینک‌ها با افکت =====
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

    // ===== ناوبری: تغییر حالت فعال =====
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // ===== افکت هاور روی کارت‌ها =====
    const cards = document.querySelectorAll('.product-card, .post.featured, .timeline__item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1)';
        });
    });

    // ===== دابل کلیک روی هدر برای اسکرول =====
    const header = document.querySelector('.header');
    if (header) {
        header.addEventListener('dblclick', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showNotification('⬆️ برگشت به بالای صفحه');
        });
    }

    // ===== انیمیشن نقل‌قول =====
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

    // ===== تابع نوتیفیکیشن =====
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

    // ===== پیام خوش‌آمدگویی =====
    setTimeout(() => {
        showNotification('🚀 به وبلاگ رسمی IESTM خوش آمدید!');
    }, 800);

    // ===== نمایش تاریخ =====
    const now = new Date();
    console.log(`📅 تاریخ امروز: ${now.toLocaleDateString('fa-IR')}`);
});
