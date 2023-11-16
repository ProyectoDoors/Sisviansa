<?php
include 'conexion.php';

$errorMSG = array();
$successMSG = "";

if (isset($_POST['id_Vianda_Eliminar'])) {
    $id_Vianda_Eliminar = $_POST['id_Vianda_Eliminar'];

    try {
        // Consulta para verificar si la vianda está registrada
        $select_vianda_stmt = $db->prepare("SELECT ID_Vianda FROM viandas WHERE ID_Vianda = :ID_Vianda");
        $select_vianda_stmt->bindParam(":ID_Vianda", $id_Vianda_Eliminar);
        $select_vianda_stmt->execute();

        if ($select_vianda_stmt->rowCount() < 1) {
            $errorMSG[] = "La vianda con este ID no está registrada";
        } else {
            // Consulta de eliminación en la tabla viandas
            $delete_vianda_stmt = $db->prepare("DELETE FROM viandas WHERE ID_Vianda = :ID_Vianda");
            $delete_vianda_stmt->bindParam(":ID_Vianda", $id_Vianda_Eliminar);
            $delete_vianda_stmt->execute();

            $successMSG = "Vianda eliminada con éxito";
        }
    } catch (PDOException $e) {
        $errorMSG[] = "Error de base de datos: " . $e->getMessage();
        error_log("Error de base de datos: " . $e->getMessage());
    }
} else {
    $errorMSG[] = "No se ha recibido el ID de vianda a eliminar.";
}

// Imprimir errores (si los hay)
if (!empty($errorMSG)) {
    foreach ($errorMSG as $error) {
        echo $error . "<br>";
    }
}

// Imprimir mensaje de eliminación exitosa
echo $successMSG;
?>
