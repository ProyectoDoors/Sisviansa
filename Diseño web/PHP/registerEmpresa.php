<?php
session_start();
include 'conexion.php';

$errorMSG = array();

if (
    isset($_POST['id']) &&
    isset($_POST['nombre']) &&
    isset($_POST['rut']) &&
    isset($_POST['calle']) &&
    isset($_POST['numero']) &&
    isset($_POST['esquina']) &&
    isset($_POST['barrio']) &&
    isset($_POST['telefono']) &&
    isset($_POST['email']) &&
    isset($_POST['password'])
) {
    $tipo_id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $rut = $_POST['rut'];
    $calle = $_POST['calle'];
    $numero_direccion = $_POST['numero'];
    $esquina = $_POST['esquina'];
    $barrio = $_POST['barrio'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $Contrasena = $_POST['password'];


    try {
        // Consulta para verificar si el email ya está registrado
        $select_email_stmt = $db->prepare("SELECT `E-mail` FROM usuario WHERE `E-mail` = :email");
        $select_email_stmt->bindParam(":email", $email);
        $select_email_stmt->execute();

        if ($select_email_stmt->rowCount() > 0) {
            $errorMSG[] = "El email ya está registrado";
            echo implode("<br>", $errorMSG);
            exit;
        } else {
            // Consulta de inserción en la tabla 'cliente'
            $insert_cliente_stmt = $db->prepare("INSERT INTO `cliente` (`Primer_Nombre`, `Telefono`, `Numero_Documento`, `Numero_Dirección`, `Calle`, `Esquina`, `Barrio`, `Autorizacion`, `RUT`) VALUES (:nombre, :telefono, :tipo_id, :numero_direccion, :calle, :esquina, :barrio, 1, :rut)");
            $insert_cliente_stmt->bindParam(":nombre", $nombre);
            $insert_cliente_stmt->bindParam(":rut", $rut);
            $insert_cliente_stmt->bindParam(":telefono", $telefono);
            $insert_cliente_stmt->bindParam(":tipo_id", $tipo_id);
            $insert_cliente_stmt->bindParam(":numero_direccion", $numero_direccion);
            $insert_cliente_stmt->bindParam(":calle", $calle);
            $insert_cliente_stmt->bindParam(":esquina", $esquina);
            $insert_cliente_stmt->bindParam(":barrio", $barrio);
            $insert_cliente_stmt->execute();

            // Obtener el ID_Cliente recién insertado
            $nuevo_id_cliente = $db->lastInsertId();

            // Consulta de inserción en la tabla 'usuario'
            $insert_user_stmt = $db->prepare("INSERT INTO `usuario` (ID_Usuario, `E-mail`, Contraseña, Rol) VALUES (:nuevo_id_cliente, :email, :Contrasena, 'Cliente Empresa')");
            $insert_user_stmt->bindParam(":nuevo_id_cliente", $nuevo_id_cliente);
            $insert_user_stmt->bindParam(":email", $email);
            $hashed_password = password_hash($Contrasena, PASSWORD_DEFAULT);
            $insert_user_stmt->bindParam(":Contrasena", $hashed_password);
            $insert_user_stmt->execute();

            $insert_user_stmt = $db->prepare("INSERT INTO `cliente_empresa`(`ID_Empresa`, `Cantidad_Clientes_Empresa`, `Nombre_Empresa`) VALUES (:nuevo_id_cliente, 1, :nombre)");
            $insert_user_stmt->bindParam("nuevo_id_cliente", $nuevo_id_cliente);
            $insert_user_stmt->bindParam(":nombre", $nombre);
            $insert_user_stmt->execute();


            // Actualizar el ID_Cliente en la tabla 'usuario'
            $update_user_stmt = $db->prepare("UPDATE `usuario` SET `ID_Usuario` = :nuevo_id_cliente WHERE ID_Usuario = :nuevo_id_cliente");
            $update_user_stmt->bindParam(":nuevo_id_cliente", $nuevo_id_cliente);
            $update_user_stmt->execute();


            exit; // Detiene la ejecución del script después de redirigir
        }
    } catch (PDOException $e) {
        $errorMSG[] = "Error: " . $e->getMessage();
    }

} else {
    // Manejar el caso en que no se reciben los campos esperados
    $errorMSG[] = "No se han recibido los campos esperados en la solicitud.";
}

// Manejar los errores (si los hay)
if (!empty($errorMSG)) {
    foreach ($errorMSG as $error) {
        echo $error . "<br>";
    }
}
?>