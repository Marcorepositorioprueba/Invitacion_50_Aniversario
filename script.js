// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Wrap each letter in a span for the letter-by-letter animation
    const textWrapper = document.querySelector('#portada h1');
    if (textWrapper) {
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        const letters = textWrapper.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.15}s`; // Stagger the delay for h1
        });
    }

    const fraseWrapper = document.querySelector('.frase-aniversario');
    if (fraseWrapper) {
        fraseWrapper.innerHTML = fraseWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
        const letters = fraseWrapper.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.08}s`; // Stagger the delay for frase-aniversario
        });
    }

    // --- Lógica para el Control de Audio ---
    const backgroundMusic = document.getElementById('background-music');
    const audioToggleBtn = document.getElementById('audio-toggle');

    if (backgroundMusic && audioToggleBtn) {
        const volumeIcon = audioToggleBtn.querySelector('i');

        // Autoplay with user interaction (common browser policy)
        // Try to play when the user first interacts with the page
        document.addEventListener('click', function playMusicOnce() {
            backgroundMusic.play().then(() => {
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
            }).catch(error => {
                console.log('Autoplay prevented:', error);
                // Show mute icon if autoplay fails
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
            });
            document.removeEventListener('click', playMusicOnce); // Play only once on first interaction
        });


        audioToggleBtn.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
            } else {
                backgroundMusic.pause();
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
            }
        });
    }

    // --- Lógica para el Formulario RSVP con WhatsApp ---
    const whatsappConfirmBtn = document.getElementById('whatsapp-confirm-btn');
    if (whatsappConfirmBtn) {
        whatsappConfirmBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir el comportamiento por defecto del botón

            const nombreInput = document.getElementById('nombre-rsvp');
            const emailInput = document.getElementById('email-rsvp');

            // Validar que los campos requeridos no estén vacíos
            if (!nombreInput.value.trim()) {
                alert('Por favor, ingresa tu nombre completo.');
                nombreInput.focus();
                return;
            }


            const nombre = encodeURIComponent(nombreInput.value.trim());
            const email = encodeURIComponent(emailInput.value.trim());

            // Mensaje predefinido para WhatsApp
            const message = `¡Hola! Me gustaría confirmar mi asistencia a las Bodas de Oro de Heri y Memo. Mi nombre es ${nombre} y mi correo es ${email}. ¡Nos vemos el 4 de Octubre!`;
            const whatsappUrl = `https://wa.link/s1z2co?text=${message}`;

            // Abrir WhatsApp en una nueva ventana/pestaña
            window.open(whatsappUrl, '_blank');

            alert('¡Gracias por confirmar! Se abrirá WhatsApp para enviar tu mensaje.');

            // Opcional: Resetear el formulario después de enviar
            nombreInput.value = '';
            emailInput.value = '';
        });
    }

    // --- Lógica para Animación de Scroll ---
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- Lógica para el Carrusel de Imágenes (Ahora con Swiper.js) ---
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });

    // --- Lógica para la animación de la línea de tiempo ---
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const timelineObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timeline.classList.add('draw-line');
                    timelineObserver.unobserve(timeline);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of the timeline is visible

        timelineObserver.observe(timeline);
    }


    // Iniciar todo

    
});