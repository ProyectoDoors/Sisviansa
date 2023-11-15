<?php
include('Cliete.php');

class ClienteEmpresa extends Cliente {
    protected $aprobado;
    protected $formularioSolicitud;

    public function __construct($documento, $contrasena, $nombreCompleto, $email, $direccion, $telefono) {
        parent::__construct($documento, $contrasena, $nombreCompleto, $email, $direccion, $telefono);
        $this->aprobado = false;
        $this->formularioSolicitud = '';
    }

    public function aprobarSolicitud($aprobado) {
        $this->aprobado = $aprobado;
        // Lógica para notificar a la empresa sobre la aprobación
    }

    // Otros métodos específicos para clientes de empresa
}
?>