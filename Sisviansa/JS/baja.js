//BAJA
$("#Eliminar").click(function () {
  let eliminarID = $("#eliminarID").val();

  if (eliminarID === "") {
    $("#mensaje0").html("Campo vacío");
  } else {
    $("#mensaje0").html("");

    $.ajax({
      type: 'POST',
      url: '../PHP/EliminarMenu.php',
      data: {
        eliminarID: eliminarID

      },
      success: function (response) {

        if (response.includes("El menú con este ID no está registrado")) {

          $("#mensaje1").html(response);
        } else {
          $("#mensaje1").html("");
          alert("Menu eliminado");
        }

      },
      error: function (xhr, status, error) {
        alert("Error, " + error + xhr + status);
      }
    });
  }

});
