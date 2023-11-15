<?php
// Configuración de conexión a la base de datos
include 'conexion.php';

try {
    // Consulta para obtener todas las viandas registradas
    $select_viandas_stmt = $db->prepare("SELECT ID_Vianda, Tiempo_Produccion, Comida, ID_Menu FROM viandas");
    $select_viandas_stmt->execute();

    if ($select_viandas_stmt->rowCount() > 0) {
        $viandas = array();

        while ($row = $select_viandas_stmt->fetch(PDO::FETCH_ASSOC)) {
            $viandas[] = $row;
        }

        // Devolver resultados como JSON
        echo json_encode($viandas);
    } else {
        echo json_encode(array('message' => 'No hay viandas registradas.'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Error en la consulta SQL: ' . $e->getMessage()));
} finally {
    // Cerrar la conexión a la base de datos
    $db = null;
}
?>
