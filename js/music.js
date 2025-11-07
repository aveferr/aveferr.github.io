// art.js - Функциональность для страницы стрит-арта

document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации
    const artistLinks = document.querySelectorAll('.art-nav a, nav a[href^="#"]');
    
    artistLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 140;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Подсветка активного раздела при скролле
    const sections = document.querySelectorAll('.artist-full, .city-section');
    const navLinks = document.querySelectorAll('.art-nav a');
    
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.background = '';
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.background = '#ff6b00';
                link.style.color = 'white';
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Анимация появления секций
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Применяем анимацию к секциям
    const allSections = document.querySelectorAll('.artist-full, .city-section');
    allSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Анимация для изображений в галерее
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.3 });
    
    galleryImages.forEach(img => imageObserver.observe(img));
});

// Функция для увеличения изображений (можно добавить модальное окно)
function openImageModal(src) {
    // Здесь можно реализовать модальное окно для просмотра изображений
    console.log('Открыть изображение:', src);
}