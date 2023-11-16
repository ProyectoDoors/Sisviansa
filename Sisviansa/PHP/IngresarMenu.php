<?php
include 'conexion.php';

$errorMSG = array();
$registerMSG = "";

if (
    isset($_POST['ID']) &&
    isset($_POST['titulo']) &&
    isset($_POST['descripcion']) &&
    isset($_POST['precio']) &&
    isset($_POST['clasificacion']) &&
    isset($_POST['imagenURL'])

) {
    $ID = $_POST['ID'];
    $titulo = $_POST['titulo'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $clasificacion = $_POST['clasificacion'];
    $imagenURL = $_POST['imagenURL'];


    try {
        // Consulta para verificar si el menú ya está registrado
        $select_menu_stmt = $db->prepare("SELECT ID_Menu FROM Menu WHERE ID_Menu = :ID");
        $select_menu_stmt->bindParam(":ID", $ID);
        $select_menu_stmt->execute();

        if ($select_menu_stmt->rowCount() > 0) {
            $errorMSG[] = "El menú con ID ya está registrado";
        } else {
            // Consulta de inserción en la tabla Menu
            $insert_menu_stmt = $db->prepare("INSERT INTO Menu (ID_Menu, Nombre, Descripcion, Precio, Tipo_Menu, Imagen) VALUES (:ID, :titulo, :descripcion, :precio, :clasificacion, :imagenURL)");
            $insert_menu_stmt->bindParam(":ID", $ID);
            $insert_menu_stmt->bindParam(":titulo", $titulo);
            $insert_menu_stmt->bindParam(":descripcion", $descripcion);
            $insert_menu_stmt->bindParam(":precio", $precio);
            $insert_menu_stmt->bindParam(":clasificacion", $clasificacion);
            $insert_menu_stmt->bindParam(":imagenURL", $imagenURL);
            $insert_menu_stmt->execute();

            $registerMSG = "Menú ingresado con éxito";

           

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

// Imprimir mensaje de registro exitoso
echo $registerMSG;
?>
