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
function createShootingStar(e) {
    const spaceArea = document.getElementById('spaceArea');
    const star = document.createElement('div');
    
    const rect = spaceArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    star.className = 'shooting-star';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    
    // Случайный цвет
    const colors = ['#fff', '#ff6b6b', '#4ecdc4', '#ffd166', '#a2d5f2', '#f7b801'];
    star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Случайный размер (от 2px до 8px)
    const size = 2 + Math.random() * 6;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Случайное направление (12 вариантов)
    const directions = [
        'top-left', 'top-right', 'bottom-left', 'bottom-right',
        'top-left-diag', 'top-right-diag', 'bottom-left-diag', 'bottom-right-diag',
        'left', 'right', 'top', 'bottom'
    ];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    star.classList.add(randomDirection);
    
    // Случайная длительность (0.3-1.5 секунды)
    const duration = 0.3 + Math.random() * 1.2;
    star.style.animationDuration = `${duration}s`;
    
    // Случайное мерцание
    if (Math.random() > 0.7) {
        star.style.animationName += ', twinkle';
        star.style.animationDuration = `${duration}s, ${duration/3}s`;
        star.style.animationIterationCount = '1, infinite';
    }
    
    spaceArea.appendChild(star);
    
    // Удаляем звезду после анимации
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, duration * 1000);
}

// Вешаем обработчик на область космоса
document.getElementById('spaceArea').addEventListener('click', createShootingStar);