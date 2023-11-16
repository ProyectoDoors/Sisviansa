$(document).ready(function () {

  $("#btnaceptar").click(function () {
    let email = $("#mail").val();
    let password = $("#contraseña").val();

    if (email === "" || password === "") {
      if (email === "") {
        $("#mensaje1").html("Campo vacío");
      } else {
        $("#mensaje1").html("");
      }

      if (password === "") {
        $("#mensaje2").html("Campo vacío");
      } else {
        $("#mensaje2").html("");
      }
    } else {
      if (!email.includes("@") && (password.length < 8 || !/\d/.test(password))) {

        if (email.includes("@")) {
          $("#mensaje1").html("");
        } else {
          $("#mensaje1").html("No contiene un '@' ");
        }
        if (password.length >= 8 && /\d/.test(password)) {
          $("#mensaje2").html("");

        } else {
          $("#mensaje2").html("Se requieren 8 caracteres y un numero al menos");

        }

      } else {

        $.ajax({
          type: 'POST',
          url: '../PHP/login.php',
          data: {
            email: email,
            password: password
          },
          success: function (response) {

            let data = JSON.parse(response);

            if (data.success) {
              localStorage.setItem('userRole', data.user.role);
              localStorage.setItem('userLoggedIn', 'true');
              window.location.href = "../HTML/Homepage.html";
            } else {
              $("#mensaje3").html("No existe un usuario con esa contraseña");
            }
          },
          error: function (xhr, status, error) {
            console.error("Error en la solicitud AJAX:", status, error);
          }
        });
      }
    }
  });
});
