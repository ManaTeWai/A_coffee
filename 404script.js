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