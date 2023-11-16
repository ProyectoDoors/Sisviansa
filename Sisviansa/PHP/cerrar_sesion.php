<?php
// Inicializar la sesion
session_start();

// Borrar todas las variables de la sesion
$_SESSION = array();

// Cerrar sesion y borrar las cookies de sesion
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destruir la sesion
session_destroy();

// Enviar una respuesta al cliente
echo "Sesión cerrada correctamente";
?>
