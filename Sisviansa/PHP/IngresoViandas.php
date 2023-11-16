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

                if ($select_vianda_stmt->rowCount() > 0) {
                    $errorMSG[] = "Ya existe una vianda con ese ID";
                } else {
                    // Consulta de inserción en la tabla viandas
                    $insert_menu_stmt = $db->prepare("INSERT INTO `viandas`(`ID_Vianda`, `Tiempo_Produccion`, `Comida`, `ID_Menu`) VALUES (:ID_Vianda, :Tiempo_Produccion, :Comida, :ID_Menu)");
                    $insert_menu_stmt->bindParam(":ID_Vianda", $ID_Vianda);
                    $insert_menu_stmt->bindParam(":Tiempo_Produccion", $Tiempo_Produccion);
                    $insert_menu_stmt->bindParam(":Comida", $Comida);
                    $insert_menu_stmt->bindParam(":ID_Menu", $ID_Menu);
                    $insert_menu_stmt->execute();

                    $registerMSG = "Vianda ingresada con éxito";

                   

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

// Imprimir mensaje de registro exitoso
echo $registerMSG;
?>
