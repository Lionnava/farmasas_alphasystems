// Lista de imágenes (rutas actualizadas)
const images = [
    "recursos/imagen1.jpg",
    "recursos/imagen2.jpg",
    "recursos/imagen3.jpg",
    "recursos/imagen4.jpg",
    "recursos/imagen5.jpg",
    "recursos/imagen6.jpg",
    "recursos/imagen7.jpg",
    "recursos/imagen8.jpg",
    "recursos/imagen9.jpg",
    "recursos/imagen10.jpg"
];

// Función para mezclar el array de imágenes aleatoriamente
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Variables globales
let currentIndex = 0;
let shuffledImages = [...images];
let completedImages = []; // Para rastrear qué imágenes ya se han mostrado
let carouselInterval; // Variable para almacenar el intervalo del carrusel

// Mezclar imágenes al cargar la página
shuffleArray(shuffledImages);

// Función para verificar si una imagen existe
function checkImageExists(url, callback) {
    const img = new Image();
    img.onload = () => callback(true); // La imagen existe
    img.onerror = () => callback(false); // La imagen no existe
    img.src = url;
}

// Función para mostrar la siguiente imagen
function showNextImage() {
    const imageElement = document.getElementById("carouselImage");
    const progressBarFill = document.getElementById("progressBarFill");

    // Verificar si la imagen actual existe
    checkImageExists(shuffledImages[currentIndex], (exists) => {
        if (exists) {
            // Mostrar la siguiente imagen
            imageElement.src = shuffledImages[currentIndex];
            imageElement.style.opacity = 0; // Efecto de transición
            setTimeout(() => {
                imageElement.style.opacity = 1;
            }, 100);

            // Reiniciar la barra de progreso
            progressBarFill.style.width = "0";
            setTimeout(() => {
                progressBarFill.style.width = "100%";
            }, 100);

            // Marcar la imagen como mostrada
            completedImages.push(shuffledImages[currentIndex]);

            // Incrementar el índice o reiniciar el ciclo
            currentIndex++;
            if (currentIndex >= shuffledImages.length) {
                currentIndex = 0;

                // Si se completó el lote, detener el carrusel y redirigir
                if (completedImages.length === images.length) {
                    clearInterval(carouselInterval); // Detener el intervalo
                    redirectToRadvert(); // Redirigir después de completar el lote
                } else {
                    // Mezclar nuevamente para el siguiente ciclo
                    shuffleArray(shuffledImages);
                }
            }
        } else {
            console.warn(`La imagen ${shuffledImages[currentIndex]} no existe. Saltando...`);
            // Si la imagen no existe, saltar a la siguiente
            currentIndex++;
            if (currentIndex >= shuffledImages.length) {
                currentIndex = 0;
                shuffleArray(shuffledImages); // Mezclar nuevamente
            }
            showNextImage(); // Mostrar la siguiente imagen inmediatamente
        }
    });
}

// Ciclo principal
function startCarousel() {
    carouselInterval = setInterval(() => {
        showNextImage();
    }, 3000); // Cambiar imagen cada 3 segundos (3000 ms)

    // Iniciar la primera imagen inmediatamente
    showNextImage();
}

// Redirigir al archivo radvert.html después de completar el ciclo
function redirectToRadvert() {
    console.log("Redirigiendo a radvert.html...");
    setTimeout(() => {
        window.location.href = 'radvert.html'; // Redirigir a radvert.html
    }, 1000); // Redirigir después de 1 segundo
}

// Iniciar el carrusel y la redirección
document.addEventListener("DOMContentLoaded", () => {
    startCarousel();
});