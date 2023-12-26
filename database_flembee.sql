-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2023 at 03:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_flembee`
--

-- --------------------------------------------------------

--
-- Table structure for table `fb_categorias`
--

CREATE TABLE `fb_categorias` (
  `id` bigint(20) NOT NULL,
  `nombre_categoria` varchar(200) NOT NULL,
  `descripcion_categoria` text NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fb_categorias`
--

INSERT INTO `fb_categorias` (`id`, `nombre_categoria`, `descripcion_categoria`, `createdAt`, `updatedAt`) VALUES
(1, 'Ensalada', 'Ensalada', '2023-12-22', '2023-12-22'),
(2, 'Comida Mexicana', 'Comida Mexicana', '2023-12-22', '2023-12-22'),
(3, 'Comida India', 'Comida India', '2023-12-22', '2023-12-22'),
(4, 'Comida Italiana', 'Comida Italiana', '2023-12-22', '2023-12-22'),
(5, 'Sopa', 'Sopa', '2023-12-22', '2023-12-22'),
(6, 'Comida Asiatica', 'Comida Asiatica', '2023-12-22', '2023-12-22'),
(7, 'Comida Española', 'Comida Española', '2023-12-22', '2023-12-22'),
(8, 'Comida Francesa', 'Comida Francesa', '2023-12-22', '2023-12-22'),
(9, 'Comida del Medio Oriente', 'Comida del Medio Oriente', '2023-12-22', '2023-12-22');

-- --------------------------------------------------------

--
-- Table structure for table `fb_recetas`
--

CREATE TABLE `fb_recetas` (
  `id` bigint(20) NOT NULL,
  `nombre_receta` varchar(200) NOT NULL,
  `descripcion_receta` varchar(200) NOT NULL,
  `ingredientes` text NOT NULL,
  `tiempo_preparacion` bigint(20) NOT NULL COMMENT 'Tiempo de preparación en minutos',
  `intrucciones` text NOT NULL,
  `informacion_nutricional` text NOT NULL,
  `id_categoria` bigint(20) NOT NULL,
  `activado` tinyint(4) DEFAULT 1,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fb_recetas`
--

INSERT INTO `fb_recetas` (`id`, `nombre_receta`, `descripcion_receta`, `ingredientes`, `tiempo_preparacion`, `intrucciones`, `informacion_nutricional`, `id_categoria`, `activado`, `createdAt`, `updatedAt`) VALUES
(1, 'Ensalada César', 'Clásica ensalada con lechuga romana, crutones y queso parmesano.', 'Lechuga romana, crutones, queso parmesano, anchoas, ajo, yema de huevo, aceite de oliva, limón, mostaza, Worcestershire.', 20, 'Mezcla los ingredientes del aderezo y combina con la lechuga, crutones y queso.', 'Alta en vitaminas A y C, calcio y hierro.', 1, 1, '2023-12-24', '2023-12-24'),
(2, 'Tacos al Pastor', 'Tacos mexicanos con carne de cerdo adobada y piña.', 'Carne de cerdo, chiles secos, achiote, piña, cebolla, cilantro, tortillas de maíz.', 60, 'Marinar la carne, asar con piña y servir en tortillas con cebolla y cilantro.', 'Alta en proteínas.', 2, 1, '2023-12-24', '2023-12-24'),
(3, 'Sushi Maki', 'Rollos de sushi tradicionales con relleno a elección.', 'Arroz para sushi, nori, pescado crudo o vegetales, salsa de soja, wasabi.', 30, 'Cocer arroz, colocar sobre nori, añadir relleno y enrollar.', 'Baja en calorías, rica en omega-3.', 6, 1, '2023-12-24', '2023-12-24'),
(4, 'Risotto de Champiñones', 'Arroz cremoso italiano con champiñones y queso parmesano.', 'Arroz arborio, champiñones, caldo de pollo, cebolla, ajo, vino blanco, parmesano.', 45, 'Sofreír cebolla, ajo y champiñones, añadir arroz y caldo gradualmente.', 'Rico en carbohidratos y vitamina D', 4, 1, '2023-12-24', '2023-12-24'),
(5, 'Curry de Pollo', 'Plato indio especiado con pollo y salsa de curry.', 'Pollo, pasta de curry, leche de coco, cebolla, ajo, jengibre, especias.', 60, 'Sofríe pollo con especias, añade leche de coco y cocina a fuego lento.', 'Alto en proteínas, bajo en carbohidratos.', 3, 1, '2023-12-24', '2023-12-24'),
(6, 'Gazpacho Andaluz', 'Sopa fría española de tomate, pimiento y pepino.', 'Tomates, pimiento, pepino, ajo, pan, aceite de oliva, vinagre.', 15, 'Mezclar todos los ingredientes y triturar. Servir frío.', 'Bajo en calorías, rico en vitaminas.', 5, 1, '2023-12-24', '2023-12-24'),
(7, 'Pollo Tandoori', 'Pollo marinado en especias y yogur, cocido en un horno tandoor.', 'Pollo, yogur, pasta de tandoori, limón, ajo, jengibre.', 60, 'Marinar el pollo y hornear a alta temperatura.', 'Alto en proteínas, bajo en grasa.', 3, 1, '2023-12-24', '2023-12-24'),
(8, 'Lasagna Boloñesa', 'Pasta al horno con capas de carne, salsa de tomate y bechamel.', 'Láminas de lasagna, carne de res, tomate, cebolla, ajo, bechamel, queso.', 90, 'Montar capas de pasta, carne y bechamel. Hornear.', 'Rico en proteínas y calcio.', 4, 1, '2023-12-24', '2023-12-24'),
(9, 'Ratatouille', 'Guiso francés de verduras asadas.', 'Berenjena, calabacín, pimiento, tomate, cebolla, ajo, hierbas provenzales.', 60, 'Cortar verduras, saltear y hornear con hierbas.', 'Bajo en calorías, alto en fibra', 8, 1, '2023-12-24', '2023-12-24'),
(10, 'Pad Thai', 'Fideos tailandeses salteados con huevo, tofu, brotes de soja y cacahuetes.', 'Fideos tailandeses salteados con huevo, tofu, brotes de soja y cacahuetes.', 30, 'Saltear ingredientes, mezclar con fideos cocidos y salsa.', 'Alto en proteínas y carbohidratos.', 6, 1, '2023-12-24', '2023-12-24');

-- --------------------------------------------------------

--
-- Table structure for table `fb_recetas_usuarios`
--

CREATE TABLE `fb_recetas_usuarios` (
  `id` bigint(20) NOT NULL,
  `id_receta` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `fb_usuarios`
--

CREATE TABLE `fb_usuarios` (
  `id` bigint(20) NOT NULL,
  `email` varchar(200) NOT NULL,
  `alias` varchar(200) NOT NULL,
  `contraseña` varchar(200) NOT NULL,
  `activado` tinyint(4) DEFAULT 1,
  `administrador` tinyint(4) DEFAULT 0,
  `createdAt` date NOT NULL,
  `updatedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fb_usuarios`
--

INSERT INTO `fb_usuarios` (`id`, `email`, `alias`, `contraseña`, `activado`, `administrador`, `createdAt`, `updatedAt`) VALUES 
('1', 'admin@gmail.com', 'admin', 'admin', '1', '1', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fb_categorias`
--
ALTER TABLE `fb_categorias`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_categoria` (`nombre_categoria`);

--
-- Indexes for table `fb_recetas`
--
ALTER TABLE `fb_recetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indexes for table `fb_recetas_usuarios`
--
ALTER TABLE `fb_recetas_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_receta` (`id_receta`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `fb_usuarios`
--
ALTER TABLE `fb_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `alias` (`alias`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fb_categorias`
--
ALTER TABLE `fb_categorias`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `fb_recetas`
--
ALTER TABLE `fb_recetas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `fb_recetas_usuarios`
--
ALTER TABLE `fb_recetas_usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `fb_usuarios`
--
ALTER TABLE `fb_usuarios`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;


--
-- Constraints for table `fb_recetas`
--
ALTER TABLE `fb_recetas`
  ADD CONSTRAINT `fb_recetas_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `fb_categorias` (`id`);

--
-- Constraints for table `fb_recetas_usuarios`
--
ALTER TABLE `fb_recetas_usuarios`
  ADD CONSTRAINT `fb_recetas_usuarios_ibfk_1` FOREIGN KEY (`id_receta`) REFERENCES `fb_recetas` (`id`),
  ADD CONSTRAINT `fb_recetas_usuarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `fb_usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
