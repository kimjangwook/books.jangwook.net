import { novelsData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('novels-container');

    // Render cards
    novelsData.forEach(novel => {
        const card = document.createElement('novel-card');
        card.setAttribute('title', novel.title);
        card.setAttribute('cover', novel.image);
        card.setAttribute('desc', novel.description);
        card.setAttribute('status', novel.status);
        card.setAttribute('tags', JSON.stringify(novel.tags));

        container.appendChild(card);
    });

    // Intersection Observer for fade-in animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all novel cards
    const cards = document.querySelectorAll('novel-card');
    cards.forEach((card, index) => {
        // Add staggered delay for nice effect
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
});
