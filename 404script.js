// Показываем неверный URL
document.getElementById('urlPath').textContent = 
    `Вы искали: ${window.location.pathname}`;

// Кнопка "Назад"
document.getElementById('backBtn').addEventListener('click', () => {
    history.back();
});

// Дополнительная анимация для кнопок
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Функция создания падающей звезды
function createShootingStar(e) {
    const spaceArea = document.getElementById('spaceArea');
    const star = document.createElement('div');
    
    // Позиционируем звезду по клику
    const rect = spaceArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    star.className = 'shooting-star';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    
    // Случайный цвет звезды
    const colors = ['#fff', '#ff6b6b', '#4ecdc4', '#ffd166'];
    star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Случайный размер
    const size = 2 + Math.random() * 4;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Анимация
    star.style.animation = `shooting-star ${0.5 + Math.random() * 1}s linear forwards`;
    
    spaceArea.appendChild(star);
    
    // Удаляем звезду после анимации
    setTimeout(() => {
        star.remove();
    }, 2000);
}

// Вешаем обработчик на область космоса
document.getElementById('spaceArea').addEventListener('click', createShootingStar);