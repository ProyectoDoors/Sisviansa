$(document).ready(function () {
    obtenerViandas();

    function obtenerViandas() {
        $.ajax({
            url: '../PHP/listarViandas.php', // Asegúrate de tener un archivo PHP para obtener las viandas
            type: 'GET',
            dataType: 'json',
            success: function (viandas) {
                console.log(viandas);

                if (Array.isArray(viandas) && viandas.length > 0) {
                    mostrarViandas(viandas);
                } else {
                    $("#viandas-container").html("<p>No hay viandas registradas.</p>");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al obtener viandas:", error);
                $("#viandas-container").html("<p>Error al obtener viandas.</p>");
            }
        });
    }

    function mostrarViandas(viandas) {
        var viandasContainer = $("#viandas-container");
        viandasContainer.empty();

        // Verifica que viandas sea un array antes de usar forEach
        if (Array.isArray(viandas) && viandas.length > 0) {
            // Crear la tabla
            var table = $('<table class="table"></table>');

            // Crear el encabezado de la tabla
            var header = '<thead><tr><th>ID Vianda</th><th>Tiempo Producción</th><th>Comida</th><th>ID Menu</th></tr></thead>';
            table.append(header);

            // Crear el cuerpo de la tabla
            var tbody = $('<tbody></tbody>');
            viandas.forEach(vianda => {
                var row = `<tr><td>${vianda.ID_Vianda}</td><td>${vianda.Tiempo_Produccion}</td><td>${vianda.Comida}</td><td>${vianda.ID_Menu}</td></tr>`;
                tbody.append(row);
            });

            table.append(tbody);

            // Agregar la tabla al contenedor
            viandasContainer.append(table);
        } else {
            console.error('Los datos recibidos no son un array de viandas o el array está vacío.');
        }
    }
});
