$(document).ready(function () {
  $('#paso1 button').click(function () {
    let tarjeta = $("#numeroTarjeta").val();
    let nombre = $("#nombreTitular").val();
    let fecha = $("#fechaExpiracion").val();
    let CVV = $("#codigoSeguridad").val();

    if (tarjeta === "" || nombre === "" || fecha === "" || CVV === "") {
      if (tarjeta === "") {
        $("#mensaje1").html("Campo vacío");
      } else {
        $("#mensaje1").html("");
      }

      if (nombre === "") {
        $("#mensaje2").html("Campo vacío");
      } else {
        $("#mensaje2").html("");
      }

      if (fecha === "") {
        $("#mensaje3").html("Campo vacío");
      } else {
        $("#mensaje3").html("");
      }

      if (CVV === "") {
        $("#mensaje4").html("Campo vacío");
      } else {
        $("#mensaje4").html("");
      }
    } else {
      $("#mensaje1").html("");
      $("#mensaje2").html("");
      $("#mensaje3").html("");
      $("#mensaje4").html("");
      if (!/^[a-zA-Z\s]+$/.test(nombre) || !/^\d{16}$/.test(tarjeta)) {

        if (/^[a-zA-Z\s]+$/.test(nombre)) {
          $("#mensaje2").html("");
        } else {
          $("#mensaje2").html("El nombre del titular solo debe contener letras y espacios.");
        }
        if (/^\d{16}$/.test(tarjeta)) {
          $("#mensaje1").html("");

        } else {
          $("#mensaje1").html("El número de tarjeta debe contener 16 dígitos numéricos.");
        }
      } else {
        $('#paso1').hide();
        $('#paso2').show();
        $('.progress-bar').css('width', '50%');
      }
    }



  });

  $('#paso2 button').click(function () {
    let direccion = $("#direccion").val();
    let esquina = $("#esquina").val();


    if (direccion === "" || esquina === "") {
      if (direccion === "") {
        $("#mensaje5").html("Campo vacío");
      } else {
        $("#mensaje5").html("");
      }

      if (esquina === "") {
        $("#mensaje6").html("Campo vacío");
      } else {
        $("#mensaje6").html("");
      }

    } else {
      $("#mensaje5").html("");
      $("#mensaje6").html("");

      $('#cargando').show();

      setTimeout(function () {
        $('#paso2').hide();
        $('#cargando').hide();
        $('#paso3').show();
        $('.progress-bar').css('width', '100%');
      }, 2000);
    }


  });
});