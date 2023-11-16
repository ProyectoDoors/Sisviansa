$(document).ready(function () {
    obtenerMenus();

    function obtenerMenus() {
        $.ajax({
            url: '../PHP/listarMenus.php', 
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

    function mostrarMenus(menus) {
        var menusContainer = $("#menus-container");
        menusContainer.empty();

        if (Array.isArray(menus) && menus.length > 0) {
            // Crear la tabla
            var table = $('<table class="table"></table>');


            var header = '<thead><tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Tipo de menu</th><th>Fecha de creacion</th><th>Imagen</th></tr></thead>';
            table.append(header);

            var tbody = $('<tbody></tbody>');
            menus.forEach(menu => {

                var row = `<tr><td>${menu.ID_Menu}</td><td>${menu.Nombre}</td><td>${menu.Precio}</td><td>${menu.Tipo_Menu}</td><td>${menu.fecha_creacion}</td><td><img height="70px" src="../src/menu1.png" alt="Imagen del menú"></td></tr>`;
                tbody.append(row);
            });

            table.append(tbody);

            // Agregar la tabla al contenedor
            menusContainer.append(table);
        } else {
            console.error('Los datos recibidos no son un array de menús o el array está vacío.');
        }



    }

});