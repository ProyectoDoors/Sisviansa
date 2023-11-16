$(document).ready(function () {

    //ALTA
    $("#Modificar").click(function () {
        let ID_Vianda = $("#ID").val();
        let Tiempo_Produccion = $("#Tiempo").val();
        let Comida = $("#comida").val();
        let ID_Menu = $("#IDmenu").val();


        if (ID_Vianda === "" || ID_Menu === "" || comida === "" || Tiempo_Produccion === "") {

            if (ID_Vianda === "") {
                $("#mensaje0").html("Campo vacío");
            } else {
                $("#mensaje0").html("");
            }

            if (Tiempo_Produccion === "") {
                $("#mensaje3").html("Campo vacío");
            } else {
                $("#mensaje3").html("");
            }

            if (Comida === "") {
                $("#mensaje2").html("Campo vacío");
            } else {
                $("#mensaje2").html("");
            }

            if (ID_Menu === "") {
                $("#mensaje1").html("Campo vacío");
            } else {
                $("#mensaje1").html("");
            }





        } else {

            $("#mensaje0").html("");
            $("#mensaje1").html("");
            $("#mensaje2").html("");
            $("#mensaje3").html("");


            $.ajax({
                type: 'POST',
                url: '../PHP/EditarViandas.php',
                data: {
                    ID_Vianda: ID_Vianda,
                    Tiempo_Produccion: Tiempo_Produccion,
                    Comida: Comida,
                    ID_Menu: ID_Menu,

                },
                success: function (response) {
                    if (response.includes("El menú con el ID seleccionado no está registrado")) {
                        
                        $("#mensaje4").html(response);
                    } else if (response.includes("No existe una vianda con ese ID para modificar")) {
                        $("#mensaje4").html(response);

                    } else {
                        $("#mensaje4").html("");
                        alert("Vianda modificada");
                    }


                },
                error: function (xhr, status, error) {
                    alert("Error, " + error + xhr + status);
                }
            });

        }
    });
});