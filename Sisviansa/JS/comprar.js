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
                    alert("No hay menús registrados.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error al obtener menús:", error);
                alert("Error al obtener menús.");
            }
        });
    }

    
    function mostrarMenus(menus) {
        var menusVegetariano = $("#PVegetarianos");
        var menusOvolacteovegetariano = $("#POvolacteovegetarianos");
        var menusOvovegetariano = $("#POvovegetarianos");
        var menusVegano = $("#PVeganos");
        var menusCeliaco = $("#PCeliacos");
        var menusCaloria = $("#PCalorias");
        var menusCarne = $("#PCarne");
        var menusPollo = $("#PPollo");
        var menusAcompañamiento = $("#PAcompañamientos");
        var menusSopa = $("#PSopas");
        var menusBebida = $("#PBebidas");
        var menusPostre = $("#PPostres");
        var modales = $("#PModales");


        if (Array.isArray(menus) && menus.length > 0) {
            menus.forEach(menu => {

                if (menu.Tipo_Menu === "Vegetariano") {
                    var botonMenu0 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusVegetariano.append(botonMenu0);

                } else if (menu.Tipo_Menu === "Ovolacteovegetariano") {
                    var botonMenu1 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusOvolacteovegetariano.append(botonMenu1);

                } else if (menu.Tipo_Menu === "Ovovegetariano") {
                    var botonMenu2 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusOvovegetariano.append(botonMenu2);

                } else if (menu.Tipo_Menu === "Vegano") {
                    var botonMenu3 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusVegano.append(botonMenu3);

                } else if (menu.Tipo_Menu === "Celiaco") {
                    var botonMenu4 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusCeliaco.append(botonMenu4);

                } else if (menu.Tipo_Menu === "Bajacalorias") {
                    var botonMenu5 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusCaloria.append(botonMenu5);

                } else if (menu.Tipo_Menu === "Carne") {
                    var botonMenu6 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusCarne.append(botonMenu6);

                } else if (menu.Tipo_Menu === "Pollo") {
                    var botonMenu7 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusPollo.append(botonMenu7);

                } else if (menu.Tipo_Menu === "Acompañamiento") {
                    var botonMenu8 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusAcompañamiento.append(botonMenu8);

                } else if (menu.Tipo_Menu === "Sopa") {
                    var botonMenu9 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusSopa.append(botonMenu9);

                } else if (menu.Tipo_Menu === "Bebida") {
                    var botonMenu10 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusBebida.append(botonMenu10);

                } else if (menu.Tipo_Menu === "Postre") {
                    var botonMenu11 = $('<section class="col-12 col-sm-12 col-md-3 col-lg-3 col"><button type="button" class="btn btn-success" data-toggle="modal" data-target="#Menu' + menu.ID_Menu + '">' + menu.Nombre + '</button></section>');
                    menusPostre.append(botonMenu11);

                }

                var modalnuevo = '<section class="modal fade" id="Menu' + menu.ID_Menu + '" tabindex="-1" role="dialog" aria-labelledby="' + menu.Nombre + '" aria-hidden="true"><section class="modal-dialog" role="document"><section class="modal-content"><section class="modal-header"><img src="../src/menu1.png" class="modalimg" alt="Imagen Modal"></section><section class="modal-body"><h1 class="modal-title" id="' + menu.Tipo_Menu + '"> ' + menu.Nombre + '</h1><h5> ' + menu.descripcion + '</h5><form><section class="form-group"><label>Cantidad:</label><input type="number" class="form-control cantidad" placeholder="Número"></section><section class="form-group"><label>Tipo:</label><select class="form-control tipo"><option>Elegir opción</option><option>Semanal</option><option>Quincenal</option><option>Mensual</option></select></section></form></section><section class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button><button type="button" class="btn btn-warning agregar-al-carrito" data-titulo="' + menu.Nombre + '"data-precio="' + menu.Precio + '" data-image="../src/menu1.png">Agregar al carrito</button></section></section></section></section>'

                modales.append(modalnuevo)

            });
        } else {
            console.error('Los datos recibidos no son un array de menús o el array está vacío.');
        }
    }


});