    $(document).ready(function () {
        obtenerMenus();

        function obtenerMenus() {
            $.ajax({
                url: '../PHP/listarMenus.php', // Asegúrate de tener un archivo PHP para obtener los menús
                type: 'GET',
                dataType: 'json',
                success: function (menus) {
                    console.log(menus);

                    if (Array.isArray(menus) && menus.length > 0) {
                        mostrarMenus(menus);
                    } else {
                        $("#menus-container").html("<p>No hay menús registrados.</p>");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error al obtener menús:", error);
                    $("#menus-container").html("<p>Error al obtener menús.</p>");
                }
            });
        }

        // ...

    function mostrarMenus(menus) {
        var menusContainer = $("#menus-container");

        if (Array.isArray(menus) && menus.length > 0) {
            menus.forEach(menu => {
                // Crear el botón para cada menú
                var botonMenu = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                

                // Crear el modal para cada menú
                var modalMenu = $('<div class="modal fade" id="Menu' + menu.ID_Menu + '" tabindex="-1" role="dialog" aria-labelledby="' + menu.Nombre + '" aria-hidden="true"></div>');

                // Contenido del modal
                var modalContent = '<div class="modal-dialog" role="document">' +
                                    '<div class="modal-content">' +
                                        '<div class="modal-header">' +
                                            '<img src="../src/menu1.png" class="modalimg" alt="Imagen Modal">' +
                                        '</div>' +
                                        '<div class="modal-body">' +
                                            '<h1 class="modal-title">' + menu.Nombre + '</h1>' +
                                            '<h5>' + menu.descripcion + '</h5>' +
                                            '<form>' +
                                                '<div class="form-group">' +
                                                    '<label>Cantidad:</label>' +
                                                    '<input type="number" class="form-control cantidad" placeholder="Número">' +
                                                '</div>' +
                                                '<div class="form-group">' +
                                                    '<label>Tipo:</label>' +
                                                    '<select class="form-control tipo">' +
                                                        '<option>Elegir opción</option>' +
                                                        '<option>Semanal</option>' +
                                                        '<option>Quincenal</option>' +
                                                        '<option>Mensual</option>' +
                                                    '</select>' +
                                                '</div>' +
                                            '</form>' +
                                        '</div>' +
                                        '<div class="modal-footer">' +
                                            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>' +
                                            '<button type="button" class="btn btn-warning agregar-al-carrito" data-titulo="' + menu.Nombre + '" data-precio="' + menu.Precio + '" data-image="../src/menu1.png">Agregar al carrito</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

                modalMenu.append(modalContent);

                // Agregar el botón y el modal al contenedor
                menusContainer.append(botonMenu);
                menusContainer.append(modalMenu);
            });
        } else {
            console.error('Los datos recibidos no son un array de menús o el array está vacío.');
        }
    }


        

    });