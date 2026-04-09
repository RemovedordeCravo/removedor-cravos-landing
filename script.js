/* ============================================
   CONFIGURAÇÃO INICIAL
   ============================================ */

// ⚠️ IMPORTANTE: SUBSTITUA PELO SEU LINK SHOPEE!
const SHOPEE_LINK = 'https://s.shopee.com.br/8V4r763IDA';

// Estados globais
let cartCount = 0;

/* ============================================
   PRELOADER
   ============================================ */

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    }
});

/* ============================================
   COUNTDOWN TIMER
   ============================================ */

function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const countdownFinal = document.getElementById('countdown-final');
    
    let timeLeft = 24 * 60 * 60; // 24 horas
    
    function updateCountdown() {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        
        const formatted = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (countdownElement) countdownElement.textContent = formatted;
        if (countdownFinal) countdownFinal.textContent = formatted;
        
        timeLeft--;
        if (timeLeft < 0) timeLeft = 24 * 60 * 60;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/* ============================================
   STOCK COUNTER
   ============================================ */

function initStockCounter() {
    const stockElement = document.querySelector('.stock-count');
    if (!stockElement) return;
    
    let stock = 47;
    
    setInterval(() => {
        if (Math.random() < 0.25) {
            stock = Math.max(20, stock - 1);
            stockElement.textContent = stock;
            
            stockElement.style.color = '#EF4444';
            setTimeout(() => {
                stockElement.style.color = '#F59E0B';
            }, 500);
        }
    }, 8000);
}

/* ============================================
   FAQ ACCORDION
   ============================================ */

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Fechar outros
            faqItems.forEach((otherItem, otherIndex) => {
                if (otherIndex !== index && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle item atual
            item.classList.toggle('active');
        });
    });
    
    // Abrir primeira por padrão
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

/* ============================================
   NAVEGAÇÃO SUAVE
   ============================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80; // Altura do header
                const top = target.offsetTop - offset;
                
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   CARINHO (MODAL)
   ============================================ */

function initCart() {
    const cartBtn = document.getElementById('cart-btn');
    const modal = document.getElementById('cart-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            if (modal) modal.classList.add('active');
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
        });
    }
    
    // Fechar ao clicar fora
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

/* ============================================
   CTAs PRINCIPAIS
   ============================================ */

function initCTAs() {
    const ctaElements = [
        document.getElementById('cta-hero'),
        document.getElementById('cta-final'),
        document.getElementById('cta-floating')
    ];
    
    ctaElements.forEach(element => {
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                redirectToShopee();
            });
        }
    });
}

function redirectToShopee() {
    // Google Analytics (se disponível)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'CTA',
            'event_label': 'Shopee Redirect'
        });
    }
    
    // Pinterest Conversion (se disponível)
    if (typeof pintrk !== 'undefined') {
        pintrk('track', 'lead');
    }
    
    // Feedback visual
    const btn = event.target.closest('.btn-primary');
    if (btn) {
        btn.textContent = 'Redirecionando...';
        setTimeout(() => {
            window.open(SHOPEE_LINK, '_blank');
        }, 200);
    } else {
        window.open(SHOPEE_LINK, '_blank');
    }
}

/* ============================================
   FLOATING CTA MOBILE
   ============================================ */

function initFloatingCTA() {
    const floatingCta = document.getElementById('floating-cta');
    if (!floatingCta) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300 && window.innerWidth <= 768) {
            floatingCta.style.display = 'block';
        } else if (window.pageYOffset < 100) {
            floatingCta.style.display = 'none';
        }
    });
}

/* ============================================
   ANIMAÇÕES AO SCROLL
   ============================================ */

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const animateElements = document.querySelectorAll(
        '.step-item, .benefit-card, .testimonial-card, ' +
        '.guarantee-card, .comparison-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/* ============================================
   LAZY LOADING IMAGENS
   ============================================ */

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/* ============================================
   EFFECTS
   ============================================ */

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const gradients = document.querySelectorAll('.gradient-1, .gradient-2');
        
        gradients.forEach((gradient, index) => {
            gradient.style.transform = `translate(${scrollPosition * 0.1}px, ${scrollPosition * 0.1}px)`;
        });
    });
}

/* ============================================
   INIT TODOS OS RECURSOS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Landing Page Carregada!');
    
    // Inicializar tudo
    startCountdown();
    initStockCounter();
    initFAQ();
    initSmoothScroll();
    initCart();
    initCTAs();
    initFloatingCTA();
    initScrollAnimations();
    initLazyLoading();
    initParallax();
    
    // Verificar link Shopee
    if (SHOPEE_LINK.includes('SEU-LINK')) {
        console.warn('⚠️ AVISO: Substitua o link de afiliado Shopee no script.js!');
    }
});

/* ============================================
   ANALYTICS TIMING
   ============================================ */

let startTime = Date.now();

window.addEventListener('beforeunload', () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'timing_complete', {
            'name': 'page_view_time',
            'value': timeSpent,
            'event_category': 'Engagement'
        });
    }
});
