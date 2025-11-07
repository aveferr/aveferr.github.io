// Универсальная инициализация для всех страниц
function initAll() {
    console.log('Initializing all components...');
    
    // Мобильное меню
    const burger = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav');
    
    if (burger && menu) {
        burger.addEventListener('click', function() {
            console.log('Toggle menu');
            burger.classList.toggle('active');
            menu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }
    
    // Слайдеры
    if (typeof initSlider === 'function') {
        if (document.getElementById('slides-music')) initSlider('slides-music');
        if (document.getElementById('slides-art')) initSlider('slides-art');
    }
}

// Запуск когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}