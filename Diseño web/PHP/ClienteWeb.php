<?php
class ClienteWeb extends Cliente {
    protected $aprobado;
    protected $menuPersonalizado;

    public function __construct($documento, $contrasena, $nombreCompleto, $email, $direccion, $telefono) {
        parent::__construct($documento, $contrasena, $nombreCompleto, $email, $direccion, $telefono);
        $this->aprobado = false;
        $this->menuPersonalizado = [];
    }

    public function recibirNotificacionAprobacion($aprobado) {
        $this->aprobado = $aprobado;
        // Lógica para notificar al cliente por correo electrónico
    }

    // Otros métodos específicos para clientes web
}
?>