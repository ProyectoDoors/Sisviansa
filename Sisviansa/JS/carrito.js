$(document).ready(function () {

    var carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

    function actualizarCarrito() {
        var total = 0;
        var largo = 0;
        var $carritoLista = $("#carrito-lista");
        var $carritoListado = $("#carrito-listado");
        var $carritoContador = $("#carrito-contador");

        $carritoLista.empty();

        carrito.forEach(function (producto) {
            var { cantidad, nombre, precio, tipo } = producto;
            $carritoLista.append(`<li>${cantidad} x ${nombre} </li>`);
            $carritoListado.append(`<li>${cantidad} x ${nombre} - $${precio}, Tipo: ${tipo}</li>`);
            total += parseFloat(precio) * parseInt(cantidad);
            largo += parseInt(cantidad);
        });

        $carritoContador.text(largo);
        $("#carrito-total").text(total.toFixed(2));
    }


    $(document).on("click", ".agregar-al-carrito", function () {
        let userLoggedIn = localStorage.getItem('userLoggedIn');
        if (userLoggedIn === 'true') {
            var titulo = $(this).data("titulo");
            var precio = $(this).data("precio");
            var imagen = $(this).data("image");
            var cantidad = $(this).closest(".modal").find(".cantidad").val();
            var tipo = $(this).closest(".modal").find(".tipo").val();

            if (cantidad && tipo !== "Elegir opción") {
                var producto = { nombre: titulo, precio, cantidad, tipo, imagen };
                carrito.push(producto);
                sessionStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
                alert("Agregado al carrito exitosamente");

            } else {
                alert("Ingresar datos");
            }
        } else {
            alert("Debes iniciar sesion para agregar productos al carrito");
        }
    });



    function procederPago() {

        let userLoggedIn = localStorage.getItem('userLoggedIn');
        if (userLoggedIn === 'false') {
            alert("Debes iniciar sesion para poder pagar");

        } else if (carrito.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de proceder al pago.");

        } else {
            window.location.href = "../HTML/Pago.html";
        }
    }
    $("#pagar").click(procederPago);



    function borrarCarrito() {
        carrito = [];
        sessionStorage.removeItem("carrito");
        actualizarCarrito();
    }

    // Botónes para borrar el carrito
    $("#borrarCarritoModal").click(borrarCarrito);
    $("#Pagar").click(borrarCarrito);


    actualizarCarrito();
});


