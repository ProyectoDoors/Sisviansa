<?php
include 'conexion.php';

$errorMSG = array();
$registerMSG = "";

if (
    isset($_POST['ID_Vianda']) &&
    isset($_POST['Tiempo_Produccion']) &&
    isset($_POST['Comida']) &&
    isset($_POST['ID_Menu']) 
) {
    $ID_Vianda = $_POST['ID_Vianda'];
    $Tiempo_Produccion = $_POST['Tiempo_Produccion'];
    $Comida = $_POST['Comida'];
    $ID_Menu = $_POST['ID_Menu'];

    try {
        // Consulta para verificar si el menú ya está registrado
        $select_menu_stmt = $db->prepare("SELECT ID_Menu FROM Menu WHERE ID_Menu = :ID_Menu");
        $select_menu_stmt->bindParam(":ID_Menu", $ID_Menu);
        $select_menu_stmt->execute();

        if ($select_menu_stmt->rowCount() < 1) {
            $errorMSG[] = "El menú con el ID seleccionado no está registrado";
        } else {
            // Consulta para verificar si ya existe una vianda con el mismo ID
            $select_vianda_stmt = $db->prepare("SELECT ID_Vianda FROM viandas WHERE ID_Vianda = :ID_Vianda");
            $select_vianda_stmt->bindParam(":ID_Vianda", $ID_Vianda);
            $select_vianda_stmt->execute();

            if ($select_vianda_stmt->rowCount() < 1) {
                $errorMSG[] = "No existe una vianda con ese ID para modificar";
            } else {
                // Consulta de actualización en la tabla 'viandas'
                $update_vianda_stmt = $db->prepare("UPDATE `viandas` SET `Tiempo_Produccion` = :Tiempo_Produccion, `Comida` = :Comida, `ID_Menu` = :ID_Menu WHERE `ID_Vianda` = :ID_Vianda");
                $update_vianda_stmt->bindParam(":ID_Vianda", $ID_Vianda);
                $update_vianda_stmt->bindParam(":Tiempo_Produccion", $Tiempo_Produccion);
                $update_vianda_stmt->bindParam(":Comida", $Comida);
                $update_vianda_stmt->bindParam(":ID_Menu", $ID_Menu);
                $update_vianda_stmt->execute();

                $registerMSG = "Vianda modificada con éxito";
                exit; 
            }
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
