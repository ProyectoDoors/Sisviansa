$(document).ready(function () {

  //ALTA
  $("#Ingresar").click(function () {
    let ID = $("#ID").val();
    let titulo = $("#titulo").val();
    let descripcion = $("#descripcion").val();
    let precio = $("#precio").val();
    let clasificacion = $("#Tipo").val();
    let imagenInput = $("#imagen-file")[0];


    if (ID === "" || titulo === "" || descripcion === "" || precio === "" || clasificacion === "") {

      if (ID === "") {
        $("#mensaje0").html("Campo vacío");
      } else {
        $("#mensaje0").html("");
      }

      if (titulo === "") {
        $("#mensaje1").html("Campo vacío");
      } else {
        $("#mensaje1").html("");
      }

      if (descripcion === "") {
        $("#mensaje2").html("Campo vacío");
      } else {
        $("#mensaje2").html("");
      }

      if (precio === "") {
        $("#mensaje3").html("Campo vacío");
      } else {
        $("#mensaje3").html("");
      }

      if (clasificacion === "") {
        $("#mensaje4").html("Campo vacío");
      } else {
        $("#mensaje4").html("");
      }



    } else {

      $("#mensaje1").html("");
      $("#mensaje2").html("");
      $("#mensaje3").html("");
      $("#mensaje4").html("");



      // Crear una URL temporal para la imagen 
      if (imagenInput.files.length > 0) {
        let imagen = imagenInput.files[0];
        let imagenURL = URL.createObjectURL(imagen);
        
        $.ajax({
          type: 'POST',
          url: '../PHP/IngresarMenu.php',
          data: {
            ID: ID,
            titulo: titulo,
            descripcion: descripcion,
            precio: precio,
            clasificacion: clasificacion,
            imagenURL: imagenURL
            
            
          },
          success: function (response) {
          if (response.includes("El menú con ID ya está registrado")) {

            $("#mensaje6").html(response);
          } else {
            $("#mensaje6").html("");
            alert("Menu ingresado");
          }
            
        },
          error: function (xhr, status, error) {
            alert("Error, " + error + xhr + status);
          }
        });

        

      } else {

        $("#mensaje5").html("Campo vacío");
      }
    }
  });
});
