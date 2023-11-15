<?php
include 'conexion.php';

$errorMSG = array();
$deleteMSG = "";

if (isset($_POST['eliminarID'])) {
    $eliminarID = $_POST['eliminarID'];

    try {
        // Consulta para verificar si el menú ya está registrado
        $select_menu_stmt = $db->prepare("SELECT ID_Menu FROM Menu WHERE ID_Menu = :eliminarID");
        $select_menu_stmt->bindParam(":eliminarID", $eliminarID);
        $select_menu_stmt->execute();

        if ($select_menu_stmt->rowCount() === 0) {
            $errorMSG[] = "El menú con este ID no está registrado";
        } else {
            // Consulta de eliminación en la tabla 'Menu'
            $delete_menu_stmt = $db->prepare("DELETE FROM Menu WHERE ID_Menu = :eliminarID");
            $delete_menu_stmt->bindParam(":eliminarID", $eliminarID);
            $delete_menu_stmt->execute();

            $deleteMSG = "Menú eliminado con éxito";

            // Puedes redirigir o realizar otras acciones después de la eliminación

            exit; // Detiene la ejecución del script después de redirigir
        }
    } catch (PDOException $e) {
        $errorMSG[] = "Error de base de datos: " . $e->getMessage();
        error_log("Error de base de datos: " . $e->getMessage());
    }
} else {
    $errorMSG[] = "No se ha recibido el campo esperado en la solicitud.";
}

// Imprimir errores (si los hay)
if (!empty($errorMSG)) {
    foreach ($errorMSG as $error) {
        echo $error . "<br>";
    }
}

// Imprimir mensaje de eliminación exitosa
echo $deleteMSG;
?>
