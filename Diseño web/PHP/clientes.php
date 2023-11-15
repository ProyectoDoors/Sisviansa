<?php
// Configuración de conexión a la base de datos
include 'conexion.php';



try {
    // Consulta para obtener todos los usuarios registrados
    $select_users_stmt = $db->prepare("SELECT `ID_Usuario`, `E-mail` , `Rol`, `Tiempo_Conexion` FROM usuario");
    $select_users_stmt->execute();

    if ($select_users_stmt->rowCount() > 0) {
        $usuarios = array();

        while ($row = $select_users_stmt->fetch(PDO::FETCH_ASSOC)) {
            $usuarios[] = $row;
        }

        // Devolver resultados como JSON
        echo json_encode($usuarios);
    } else {
        echo json_encode(array('message' => 'No hay usuarios registrados.'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Error en la consulta SQL: ' . $e->getMessage()));
} finally {
    // Cerrar la conexión a la base de datos
    $db = null;
}
