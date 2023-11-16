<?php
include 'conexion.php';

$errorMSG = array();
$registerMSG = "";

if (
    isset($_POST['modificarID']) &&
    isset($_POST['titulo2']) &&
    isset($_POST['descripcion2']) &&
    isset($_POST['precio2']) &&
    isset($_POST['clasificacion2']) &&
    isset($_POST['imagenURL2'])
) {
    $modificarID = $_POST['modificarID'];
    $titulo2 = $_POST['titulo2'];
    $descripcion2 = $_POST['descripcion2'];
    $precio2 = $_POST['precio2'];
    $clasificacion2 = $_POST['clasificacion2'];
    $imagenURL2 = $_POST['imagenURL2'];

    try {
        // Consulta para verificar si el menú ya está registrado
        $select_menu_stmt = $db->prepare("SELECT ID_Menu FROM Menu WHERE ID_Menu = :modificarID");
        $select_menu_stmt->bindParam(":modificarID", $modificarID);
        $select_menu_stmt->execute();

        if ($select_menu_stmt->rowCount() === 0) {
            $errorMSG[] = "El menú con este ID no está registrado";
        } else {
            // Consulta de actualización en la tabla 'Menu'
            $update_menu_stmt = $db->prepare("UPDATE Menu SET Nombre = :titulo, Descripcion = :descripcion, Precio = :precio, Tipo_Menu = :clasificacion, Imagen = :imagenURL WHERE ID_Menu = :modificarID");
            $update_menu_stmt->bindParam(":modificarID", $modificarID);
            $update_menu_stmt->bindParam(":titulo", $titulo2);
            $update_menu_stmt->bindParam(":descripcion", $descripcion2);
            $update_menu_stmt->bindParam(":precio", $precio2);
            $update_menu_stmt->bindParam(":clasificacion", $clasificacion2);
            $update_menu_stmt->bindParam(":imagenURL", $imagenURL2);
            $update_menu_stmt->execute();

            $registerMSG = "Menú modificado con éxito";

            

            exit;
        }
    } catch (PDOException $e) {
        $errorMSG[] = "Error de base de datos: " . $e->getMessage();
        error_log("Error de base de datos: " . $e->getMessage());
    }
} else {
    $errorMSG[] = "No se han recibido los campos esperados en la solicitud.";
}

// Imprimir errores (si los hay)
if (!empty($errorMSG)) {
    foreach ($errorMSG as $error) {
        echo $error . "<br>";
    }
}

// Imprimir mensaje de modificación exitosa
echo $registerMSG;
?>
