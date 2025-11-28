//Espera a que todo esté cargado
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('profile-name')) {
        loadUserProfile();
    }
});

function loadUserProfile() {
    // Obtener datos del localStorage
    const name = localStorage.getItem('name') || 'Usuario';
    const lastName = localStorage.getItem('lastName') || '';
    const email = localStorage.getItem('email') || 'correo@ejemplo.com';
    
    // Verificar si el usuario está logueado
    if (!email || email === 'correo@ejemplo.com') {
        Swal.fire({
            icon: 'warning',
            title: 'Sesión no iniciada',
            text: 'Por favor inicia sesión para ver tu perfil',
            confirmButtonColor: '#7a2b36'
        }).then(() => {
            window.location.href = 'Inicio.html';
        });
        return;
    }
      
    // Mostrar información en la página
    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-lastname').textContent = lastName || 'No especificado';
    document.getElementById('profile-email').textContent = email;
    document.getElementById('profile-email-small').textContent = email;
    document.getElementById('profile-fullname').textContent = `${name} ${lastName}`.trim();
    
    // Fecha de registro
    const currentDate = new Date();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    document.getElementById('profile-date').textContent = 
        `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}