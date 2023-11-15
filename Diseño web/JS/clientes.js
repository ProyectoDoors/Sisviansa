$(document).ready(function () {
    obtenerClientesHoy();

    function obtenerClientesHoy() {
        $.ajax({
            url: '../PHP/clientes.php',
            type: 'GET',
            dataType: 'json',
            success: function (clientes) {
                console.log(clientes);
               
                if (Array.isArray(clientes) && clientes.length > 0) {
                    mostrarClientesHoy(clientes);
                } else {
                    $("#clientes-container").html("<p>No hay clientes registrados.</p>");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al obtener clientes:", error);
                $("#clientes-container").html("<p>Error al obtener clientes.</p>");
            }
        });
    }

    function mostrarClientesHoy(clientes) {
        var clienteContainer = $("#clientes-container");
        clienteContainer.empty();
    
        // Verifica que clientes sea un array antes de usar forEach
        if (Array.isArray(clientes) && clientes.length > 0) {
            // Crear la tabla
            var table = $('<table class="table"></table>');
    
            // Crear el encabezado de la tabla
            var header = '<thead><tr><th>ID</th><th>E-mail</th><th>Rol</th><th>Tiempo de Conexión</th></tr></thead>';
            table.append(header);
    
            // Crear el cuerpo de la tabla
            var tbody = $('<tbody></tbody>');
            clientes.forEach(cliente => {
                var row = `<tr><td>${cliente.ID_Usuario}</td><td>${cliente['E-mail']}</td><td>${cliente.Rol}</td><td>${cliente.Tiempo_Conexion}</td></tr>`;
                tbody.append(row);
            });
    
            table.append(tbody);
    
            // Agregar la tabla al contenedor
            clienteContainer.append(table);
        } else {
            console.error('Los datos recibidos no son un array de clientes o el array está vacío.');
        }
    }
});