// Lista de imágenes (rutas actualizadas)
const images = [
    "recursos/imagen2.jpg",
    "recursos/imagen3.jpg",
    "recursos/imagen4.jpg",
    "recursos/imagen5.jpg",
    "recursos/imagen6.jpg",
    "recursos/imagen7.jpg",
    "recursos/imagen11.jpg",
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

// Mezclar imágenes al cargar la página
shuffleArray(shuffledImages);

// Función para mostrar la siguiente imagen
function showNextImage() {
    const imageElement = document.getElementById("carouselImage");
    const progressBarFill = document.getElementById("progressBarFill");

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

    // Incrementar el índice o reiniciar el ciclo
    currentIndex++;
    if (currentIndex >= shuffledImages.length) {
        currentIndex = 0;
        shuffleArray(shuffledImages); // Mezclar nuevamente
    }
}

// Ciclo principal
function startCarousel() {
    setInterval(() => {
        showNextImage();
    }, 3000); // Cambiar imagen cada 3 segundos (3000 ms)

    // Iniciar la primera imagen inmediatamente
    showNextImage();
}

// Redirigir al archivo google-auth-html después de completar el ciclo
function redirectToGoogleAuth() {
    setTimeout(() => {
        window.location.href = "google-auth.html"; // Reemplaza con la ruta real
    }, shuffledImages.length * 3000 + 1000); // Tiempo total del ciclo + 1 segundo extra
}

// Iniciar el carrusel y la redirección
document.addEventListener("DOMContentLoaded", () => {
    startCarousel();
    redirectToGoogleAuth();
});