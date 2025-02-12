// login.js

// Función para cifrar la contraseña y enviar el formulario
function doLogin() {
    document.sendin.username.value = document.login.username.value;
    document.sendin.password.value = hexMD5('$(chap-id)' + document.login.password.value + '$(chap-challenge)');
    document.sendin.submit();
    return false;
}

// Función para validar el formulario antes de enviarlo
function submitForm(event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    // Recopilar los datos del formulario
    const edad = document.getElementById('edad').value;
    const sexo = document.getElementById('sexo').value;
    const especialidad = document.getElementById('especialidad').value;
    const macAddress = document.getElementById('macAddress').value;

    // Validar que los campos no estén vacíos
    if (!edad || !sexo || !especialidad) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    // Redirigir al usuario a status.html
    window.location.href = 'status.html';
}