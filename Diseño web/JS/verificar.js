$(document).ready(function () {

    actualizar();

    $('#usuario').click(function () {
        let userLoggedIn = localStorage.getItem('userLoggedIn');
        let userRol = localStorage.getItem('userRole');

       
        if (userRol === 'Gerente' || userRol === 'Atencion al publico' || userRol === 'Administracion' || userRol === 'Informatico' || userRol === 'Jefe de cocina') {
            $('#admin').modal('show');
        } else if (userLoggedIn === 'true') {
            // Si el usuario está logueado, abrir el modal "user"
            $('#user').modal('show');
        } else {
            // Si el usuario no está logueado, abrir el modal "nouser"
            $('#nouser').modal('show');
        }
    });

    $('#volver').click(function () {
        $('#nouser').modal('hide');
    });

    $('#volver1').click(function () {
        $('#user').modal('hide');
    });

    $('#volver2').click(function () {
        $('#admin').modal('hide');
    });

    // Usar delegación de eventos para el botón de cerrar sesión
    $(document).on('click', '#cerrarSesionBtn', function () {
        // Realiza una solicitud AJAX para cerrar la sesión en el servidor
        $.ajax({
            type: 'POST',
            url: '../PHP/cerrar_sesion.php', // Ruta al archivo PHP que cierra la sesión
            success: function (response) {
                // Restablece la variable que indica si el usuario está logueado
                localStorage.setItem('userLoggedIn', 'false');
                localStorage.setItem('userRole', '0');

                // Cierra el modal "user"
                $('#user').modal('hide');
                $('#admin').modal('hide');

                // Puedes mostrar un mensaje al usuario si lo deseas
                alert(response);
                
                // Redirige a la página de inicio de sesión u otra página deseada
                window.location.href = '../HTML/Homepage.html';
            },
            error: function (xhr, status, error) {
                // Maneja errores si es necesario
                alert("Error al cerrar la sesión: " + error);
            }
        });
    });

    function actualizar() {
        let userRol = localStorage.getItem('userRole');
    
        // Muestra el rol en el elemento con el id 'Usuario'
        $('#Usuario').text(userRol);
    
        // Verifica si userRol es nulo o si la sesión no está iniciada
        if (!userRol || userRol === '0') {
            // Si userRol es nulo o la sesión no está iniciada, muestra todos los botones
            $('.nav-link').removeClass('d-none');
        } else {
            // Oculta todos los botones
            $('.nav-link').addClass('d-none');
    
            // Muestra los botones específicos según el rol del usuario
            switch (userRol) {
                case 'Administracion':
                case 'Atencion al publico':
                    // Muestra solo el botón 'Clientes'
                    $('.nav-link').not('#ingresarMenuLink, #modificarMenuLink, #eliminarMenuLink, #ingresarViandaLink, #modificarViandaLink, #eliminarViandaLink, #stockLink, #listadoMenuLink, #personalLink').removeClass('d-none');
                    break;
                case 'Jefe de cocina':
                    // Muestra todos los botones excepto 'Clientes'
                    $('.nav-link').not('#clientesLink, #personalLink').removeClass('d-none');
                    break;
                case 'Gerente':
                case 'Informatico':
                    // Muestra todos los botones
                    $('.nav-link').removeClass('d-none');
                    break;
                // Agrega más casos según sea necesario
                default:
                    // Oculta todos los botones
                    $('.nav-link').addClass('d-none');
                    break;
            }
        }
    }
    
    
    
});
