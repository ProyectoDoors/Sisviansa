// MODIFICACION
$("#ModificarMenu").click(function () {

  let modificarID = $("#modificarID").val();
  let titulo2 = $("#titulo").val();
  let descripcion2 = $("#descripcion").val();
  let precio2 = $("#precio").val();
  let clasificacion2 = $("#Tipo").val();
  let imagenInput = $("#imagen-file")[0];


  if (modificarID === "" || titulo2 === "" || descripcion2 === "" || precio2 === "" || clasificacion2 === "") {

    if (modificarID === "") {
      $("#mensaje0").html("Campo vacío");
    } else {
      $("#mensaje0").html("");
    }

    if (titulo2 === "") {
      $("#mensaje1").html("Campo vacío");
    } else {
      $("#mensaje1").html("");
    }

    if (descripcion2 === "") {
      $("#mensaje2").html("Campo vacío");
    } else {
      $("#mensaje2").html("");
    }

    if (precio2 === "") {
      $("#mensaje3").html("Campo vacío");
    } else {
      $("#mensaje3").html("");
    }

    if (clasificacion2 === "") {
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
      let imagenURL2 = URL.createObjectURL(imagen);

      $.ajax({
        type: 'POST',
        url: '../PHP/ModificarMenu.php',
        data: {
          modificarID: modificarID,
          titulo2: titulo2,
          descripcion2: descripcion2,
          precio2: precio2,
          clasificacion2: clasificacion2,
          imagenURL2: imagenURL2


        },
        success: function (response) {
          console.log(response);
          if (response.includes("El menú con este ID no está registrado")) {

            $("#mensaje6").html(response);
          } else {
            $("#mensaje6").html("");
            alert("Menu modificado");
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