// Variables globales
let googleUserData = null;

// Función para obtener parámetros de la URL
function getQueryParams() {
    const params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (match, key, value) => {
        params[key] = decodeURIComponent(value);
    });
    return params;
}

// Módulo para Google Sign-In
const GoogleAuth = {
    init() {
        google.accounts.id.initialize({
            client_id: '228052556473-jsjbhk5cjipbnqd5a03319ina2rtv39u.apps.googleusercontent.com',
            callback: this.handleCredentialResponse,
            scope: 'profile email'
        });
        google.accounts.id.renderButton(document.getElementById('google-login-container'), {
            theme: 'outline',
            size: 'large'
        });
    },

    handleCredentialResponse(response) {
        const idToken = response.credential;
        fetch('https://infosaludsystems.com/save_data.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_token: idToken })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            window.location.href = 'alogin.html';
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            alert('Ocurrió un error al autenticar con Google.');
        });
    }
};

// Inicializar Google Auth al cargar la página
window.onload = () => {
    GoogleAuth.init();
};