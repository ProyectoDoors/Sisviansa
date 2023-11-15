$(document).ready(function () {
  $("#btnaceptar").click(function () {
    let id = $("#ID").val();
    let nombre = $("#Nombre").val();
    let nombre2 = $("#Nombre2").val();
    let apellido = $("#Apellido").val();
    let apellido2 = $("#Apellido2").val();
    let calle = $("#Calle").val();
    let numero = $("#Numero").val();
    let esquina = $("#Esquina").val();
    let barrio = $("#Barrio").val();
    let telefono = $("#Telefono").val();
    let email = $("#Email").val();
    let password = $("#Contra").val();

    if (id === "" || nombre === "" || apellido === "" || calle === "" || numero === "" || esquina === "" || barrio === "" || telefono === "" || email === "" || password === "") {


      if (id === "") {
        $("#mensaje1").html("Campo vacío");
      } else {
        $("#mensaje1").html("");
      }

      if (nombre === "") {
        $("#mensaje2").html("Campo vacío");
      } else {
        $("#mensaje2").html("");
      }

      if (apellido === "") {
        $("#mensaje4").html("Campo vacío");
      } else {
        $("#mensaje4").html("");
      }

      if (calle === "") {
        $("#mensaje6").html("Campo vacío");
      } else {
        $("#mensaje6").html("");
      }

      if (numero === "") {
        $("#mensaje7").html("Campo vacío");
      } else {
        $("#mensaje7").html("");
      }

      if (esquina === "") {
        $("#mensaje8").html("Campo vacío");
      } else {
        $("#mensaje8").html("");
      }

      if (barrio === "") {
        $("#mensaje9").html("Campo vacío");
      } else {
        $("#mensaje9").html("");
      }

      if (telefono === "") {
        $("#mensaje10").html("Campo vacío");
      } else {
        $("#mensaje10").html("");
      }

      if (email === "") {
        $("#mensaje11").html("Campo vacío");
      } else {
        $("#mensaje11").html("");
      }

      if (password === "") {
        $("#mensaje12").html("Campo vacío");
      } else {
        $("#mensaje12").html("");
      }




    } else {

      $("#mensaje1").html("");
      $("#mensaje2").html("");
      $("#mensaje3").html("");
      $("#mensaje4").html("");
      $("#mensaje5").html("");
      $("#mensaje6").html("");
      $("#mensaje7").html("");
      $("#mensaje8").html("");
      $("#mensaje9").html("");
      $("#mensaje10").html("");
      $("#mensaje11").html("");
      $("#mensaje12").html("");

      if (id.length < 8 || telefono.length < 9 || !email.includes("@") || password.length < 8 && !/\d/.test(password)) {

        if (id.length >= 8) {
          $("#mensaje1").html("");
        } else {
          $("#mensaje1").html("Se requieren minimo 8 caracteres");
        }

        if (telefono.length >= 9) {
          $("#mensaje10").html("");
        } else {
          $("#mensaje10").html("Se requieren minimo 9 caracteres");
        }

        if (email.includes("@")) {
          $("#mensaje11").html("");
        } else {
          $("#mensaje11").html("No contiene un '@' ");
        }

        if (password.length >= 8 && /\d/.test(password)) {
          $("#mensaje12").html("");
        } else {
          $("#mensaje12").html("Se requieren 8 caracteres y un numero al menos");
        }
      } else {
        $.ajax({
          type: 'POST',
          url: '../PHP/register.php',
          data: {
            id: id,
            nombre: nombre,
            nombre2: nombre2,
            apellido: apellido,
            apellido2: apellido2,
            calle: calle,
            numero: numero,
            esquina: esquina,
            barrio: barrio,
            telefono: telefono,
            email: email,
            password: password
          },
          success: function (response) {
            console.log(response);
        
            if (response.includes("El email ya está registrado")) {
                // Si el email ya está registrado, muestra el mensaje en #mensaje13
                $("#mensaje13").html(response);
            } else {
                // Si no hay errores, realiza las operaciones de inicio de sesión y redirige
                $("#mensaje13").html(""); // Limpia el mensaje de error si no hay
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('nombredelusuario', nombre);
                window.location.href = "../HTML/Homepage.html";
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
