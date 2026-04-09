/* CONFIG */
const SHOPEE_LINK = 'https://s.shopee.com.br/7ppAMUAiZA';

/* PRELOADER */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    }
});

/* COUNTDOWN */
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    const countdownFinal = document.getElementById('countdown-final');
    
    let timeLeft = 24 * 60 * 60;
    
    function update() {
        const h = Math.floor(timeLeft / 3600);
        const m = Math.floor((timeLeft % 3600) / 60);
        const s = timeLeft % 60;
        
        const formatted = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        
        if (countdownEl) countdownEl.textContent = formatted;
        if (countdownFinal) countdownFinal.textContent = formatted;
        
        timeLeft--;
        if (timeLeft < 0) timeLeft = 24 * 60 * 60;
    }
    
    update();
    setInterval(update, 1000);
}

/* STOCK */
function initStock() {
    const stockEl = document.querySelector('.stock-num');
    if (!stockEl) return;
    
    let stock = 47;
    
    setInterval(() => {
        if (Math.random() < 0.25) {
            stock = Math.max(20, stock - 1);
            stockEl.textContent = stock;
            stockEl.style.color = '#EF4444';
            setTimeout(() => {
                stockEl.style.color = '#F59E0B';
            }, 500);
        }
    }, 8000);
}

/* FAQ */
function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    
    items.forEach((item, idx) => {
        const q = item.querySelector('.faq-q');
        
        q.addEventListener('click', () => {
            items.forEach((i, i_idx) => {
                if (i_idx !== idx) i.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });
    
    if (items.length > 0) items[0].classList.add('active');
}

/* CTA */
function initCTAs() {
    const ctas = [
        document.getElementById('cta-hero'),
        document.getElementById('cta-final'),
        document.getElementById('cta-floating')
    ];
    
    ctas.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.open(SHOPEE_LINK, '_blank');
            });
        }
    });
}

/* FLOATING */
function initFloating() {
    const floating = document.getElementById('floating');
    if (!floating) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300 && window.innerWidth <= 768) {
            floating.style.display = 'block';
        } else if (window.pageYOffset < 100) {
            floating.style.display = 'none';
        }
    });
}

/* SMOOTH SCROLL */
function initScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 50;
                const top = target.offsetTop - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

/* INIT */
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    initStock();
    initFAQ();
    initCTAs();
    initFloating();
    initScroll();
    console.log('✅ Landing Page Ativa!');
});
