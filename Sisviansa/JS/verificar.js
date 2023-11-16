$(document).ready(function () {

    actualizar();

    $('#usuario').click(function () {
        let userLoggedIn = localStorage.getItem('userLoggedIn');
        let userRol = localStorage.getItem('userRole');


        if (userRol === 'Gerente' || userRol === 'Atencion al publico' || userRol === 'Administracion' || userRol === 'Informatico' || userRol === 'Jefe de cocina') {
            $('#admin').modal('show');
        } else if (userLoggedIn === 'true') {
            
            $('#user').modal('show');
        } else {
           
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

    
    $(document).on('click', '#cerrarSesionBtn', function () {
        
        $.ajax({
            type: 'POST',
            url: '../PHP/cerrar_sesion.php',
            success: function (response) {
                
                localStorage.setItem('userLoggedIn', 'false');
                localStorage.setItem('userRole', '0');

                
                $('#user').modal('hide');
                $('#admin').modal('hide');

                
                alert(response);

                window.location.href = '../HTML/Homepage.html';
            },
            error: function (xhr, status, error) {
                
                alert("Error al cerrar la sesión: " + error);
            }
        });
    });

    function actualizar() {
        let userRol = localStorage.getItem('userRole');

        
        $('#Usuario').text(userRol);

       
        if (!userRol || userRol === '0') {
            
            $('.nav-link').removeClass('d-none');
        } else {
            
            $('.nav-link').addClass('d-none');

            // Muestra los botones específicos según el rol del usuario
            switch (userRol) {
                case 'Administracion':
                case 'Atencion al publico':
                    
                    $('.nav-link').not('#ingresarMenuLink, #modificarMenuLink, #eliminarMenuLink, #ingresarViandaLink, #modificarViandaLink, #eliminarViandaLink, #stockLink, #listadoMenuLink, #personalLink').removeClass('d-none');
                    break;
                case 'Jefe de cocina':
                    
                    $('.nav-link').not('#clientesLink, #personalLink').removeClass('d-none');
                    break;
                case 'Gerente':
                case 'Informatico':
                case 'Cliente Web':
                    
                    $('.nav-link').removeClass('d-none');
                    break;
                
                default:
                    
                    $('.nav-link').addClass('d-none');
                    break;
            }
        }
    }



});
