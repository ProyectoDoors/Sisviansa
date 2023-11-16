<?php
include 'conexion.php';

$errorMSG = array();

if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $Contrasena = $_POST['password'];

    $select_user_stmt = $db->prepare("SELECT * FROM usuario WHERE `E-mail` = :email");
    $select_user_stmt->bindParam(":email", $email);
    $select_user_stmt->execute();

    if ($select_user_stmt->rowCount() > 0) {
        $user = $select_user_stmt->fetch(PDO::FETCH_ASSOC);

        if (password_verify($Contrasena, $user['Contraseña'])) {
            session_start();
            $_SESSION['user_id'] = $user['ID_Usuario'];
            $_SESSION['user_email'] = $user['E-mail'];

            
            $userData = array(
                'id' => $user['ID_Usuario'],
                'email' => $user['E-mail'],
                'role' => $user['Rol'] 
            );

            $response = array(
                'success' => true,
                'message' => 'Inicio de sesión exitoso',
                'user' => $userData
            );

            echo json_encode($response);
            exit;
        } else {
            $response = array(
                'success' => false,
                'message' => 'Contraseña incorrecta. Intenta de nuevo.'
            );
            echo json_encode($response);
        }
    } else {
        $response = array(
            'success' => false,
            'message' => 'No se encontró un usuario con ese correo electrónico.'
        );
        echo json_encode($response);
    }
}
?>
