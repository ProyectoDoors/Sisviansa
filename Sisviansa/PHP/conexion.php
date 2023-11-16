<?php

// Configuración de la conexión
$servidor = 'localhost';
$baseDatos = 'sisviansa';
$usuario = 'root';
$password = '';

try {
    $db = new PDO("mysql:host=$servidor;dbname=$baseDatos", $usuario, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión a la base de datos: " . $e->getMessage();
}

?>

