<?php
// Configuración de conexión a la base de datos
include 'conexion.php';

try {
    // Consulta para obtener todos los menús registrados
    $select_menus_stmt = $db->prepare("SELECT ID_Menu, Nombre, Precio ,Tipo_Menu, fecha_creacion, descripcion, imagen FROM menu");
    $select_menus_stmt->execute();

    if ($select_menus_stmt->rowCount() > 0) {
        $menus = array();

        while ($row = $select_menus_stmt->fetch(PDO::FETCH_ASSOC)) {
            // ...
        
            // Convertir el BLOB a una URL base64
            $imagenBase64 = base64_encode($row['imagen']);
            $imagenURL = 'data:image/png;base64,' . $imagenBase64;
        
            $row['imagen'] = $imagenURL;
        
            $menus[] = $row;
        }

        // Devolver resultados como JSON
        echo json_encode($menus);
    } else {
        echo json_encode(array('message' => 'No hay menús registrados.'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => 'Error en la consulta SQL: ' . $e->getMessage()));
} finally {
    // Cerrar la conexión a la base de datos
    $db = null;
}
?>