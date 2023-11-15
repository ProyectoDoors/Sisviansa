$(document).ready(function() {

$("#Eliminar").click(function () {
  let id_Vianda_Eliminar = $("#eliminarID").val();
  
  if (id_Vianda_Eliminar === "") {
    $("#mensaje0").html("Campo vacío");
  } else {
    // Muestra una alerta de confirmación
    if (confirm("¿Seguro que quieres eliminar esta vianda?")) {
      $("#mensaje0").html("");

      $.ajax({
        type: 'POST',
        url: '../PHP/EliminarVianda.php',
        data: {
          id_Vianda_Eliminar: id_Vianda_Eliminar
        },
        success: function (response) {
          if (response.includes("La vianda con este ID no está registrada")) {
            $("#mensaje1").html(response);
          } else {
            $("#mensaje1").html("");
            alert("Vianda eliminada");
          }
        },
        error: function (xhr, status, error) {
          alert("Error, " + error + xhr + status);
        }
      });
    }
  }
});
});