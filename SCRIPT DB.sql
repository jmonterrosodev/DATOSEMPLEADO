CREATE DATABASE TEST;
USE TEST;
CREATE TABLE COLABORADOR (
 IDCOLABORADOR INT(11) AUTO_INCREMENT PRIMARY KEY,
 NOMBRE VARCHAR(45) NOT NULL,
 APELLIDO VARCHAR(45) NOT NULL,
 DIRECCION VARCHAR(45),
 EDAD INT(3) NOT NULL,
 PROFESION VARCHAR(45),
 ESTADOCIVIL VARCHAR(45)
);

INSERT INTO `test`.`colaborador` (`NOMBRE`, `APELLIDO`, `DIRECCION`, `EDAD`, `PROFESION`, `ESTADOCIVIL`) VALUES ('Jorge', 'Monterroso', 'San Lucas', '28', 'Desarrollador', 'Soltero');
INSERT INTO `test`.`colaborador` (`NOMBRE`, `APELLIDO`, `DIRECCION`, `EDAD`, `PROFESION`, `ESTADOCIVIL`) VALUES ('Antonio', 'Aspuac', 'San Lucas', '28', 'Desarrollador', 'Soltero');
