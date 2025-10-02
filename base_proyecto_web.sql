CREATE DATABASE DBFoodin_line;
USE DBFoodin_line;

CREATE TABLE Usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    correo VARCHAR(40),
    password VARCHAR(40)
);
