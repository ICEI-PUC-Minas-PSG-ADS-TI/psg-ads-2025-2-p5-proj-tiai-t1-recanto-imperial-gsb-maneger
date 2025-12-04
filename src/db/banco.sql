-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: criatorio
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aves`
--

DROP TABLE IF EXISTS `aves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aves` (
  `idAve` int NOT NULL AUTO_INCREMENT,
  `anilha` varchar(50) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `linhagem` varchar(100) DEFAULT NULL,
  `sexo` enum('Macho','Fêmea') DEFAULT 'Fêmea',
  `dataNascimento` date DEFAULT NULL,
  `idade` int DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `cor_bico` varchar(50) DEFAULT NULL,
  `canelas` varchar(50) DEFAULT NULL,
  `plumagem_pattern` varchar(50) DEFAULT NULL,
  `caracteristicas` text,
  `auricula_despig_percent` tinyint unsigned DEFAULT '0',
  `crista_tombamento` enum('Nenhuma','TercoDistal','DoisTerços','Outro') DEFAULT 'Nenhuma',
  `barbela_desigualdade_percent` decimal(5,2) DEFAULT '0.00',
  `plumagem_barrada` tinyint(1) DEFAULT '0',
  `plumagem_frisada` tinyint(1) DEFAULT '0',
  `plumagem_carijo` tinyint(1) DEFAULT '0',
  `pescoco_pelado` tinyint(1) DEFAULT '0',
  `barbuda` tinyint(1) DEFAULT '0',
  `olhos_vermelhos` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idAve`),
  UNIQUE KEY `anilha` (`anilha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aves`
--

LOCK TABLES `aves` WRITE;
/*!40000 ALTER TABLE `aves` DISABLE KEYS */;
/*!40000 ALTER TABLE `aves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `backups`
--

DROP TABLE IF EXISTS `backups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `backups` (
  `idBackup` int NOT NULL AUTO_INCREMENT,
  `caminho` varchar(255) NOT NULL,
  `data` date NOT NULL,
  PRIMARY KEY (`idBackup`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `backups`
--

LOCK TABLES `backups` WRITE;
/*!40000 ALTER TABLE `backups` DISABLE KEYS */;
/*!40000 ALTER TABLE `backups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracoes`
--

DROP TABLE IF EXISTS `configuracoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracoes` (
  `idConfig` int NOT NULL AUTO_INCREMENT,
  `chave` varchar(100) NOT NULL,
  `valor` varchar(255) NOT NULL,
  PRIMARY KEY (`idConfig`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracoes`
--

LOCK TABLES `configuracoes` WRITE;
/*!40000 ALTER TABLE `configuracoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `configuracoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cruzamento`
--

DROP TABLE IF EXISTS `cruzamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cruzamento` (
  `idCruzamento` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  PRIMARY KEY (`idCruzamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cruzamento`
--

LOCK TABLES `cruzamento` WRITE;
/*!40000 ALTER TABLE `cruzamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `cruzamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cruzamento_aves`
--

DROP TABLE IF EXISTS `cruzamento_aves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cruzamento_aves` (
  `idCruzamento` int NOT NULL,
  `idAve` int NOT NULL,
  `papel` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idCruzamento`,`idAve`),
  KEY `idAve` (`idAve`),
  CONSTRAINT `cruzamento_aves_ibfk_1` FOREIGN KEY (`idCruzamento`) REFERENCES `cruzamento` (`idCruzamento`),
  CONSTRAINT `cruzamento_aves_ibfk_2` FOREIGN KEY (`idAve`) REFERENCES `aves` (`idAve`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cruzamento_aves`
--

LOCK TABLES `cruzamento_aves` WRITE;
/*!40000 ALTER TABLE `cruzamento_aves` DISABLE KEYS */;
/*!40000 ALTER TABLE `cruzamento_aves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `idEvento` int NOT NULL AUTO_INCREMENT,
  `idAve` int NOT NULL,
  `tipoEvento` varchar(100) NOT NULL,
  `data` date NOT NULL,
  PRIMARY KEY (`idEvento`),
  KEY `idAve` (`idAve`),
  CONSTRAINT `eventos_ibfk_1` FOREIGN KEY (`idAve`) REFERENCES `aves` (`idAve`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagens_aves`
--

DROP TABLE IF EXISTS `imagens_aves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagens_aves` (
  `idImagem` int NOT NULL AUTO_INCREMENT,
  `idAve` int NOT NULL,
  `caminho` varchar(255) NOT NULL,
  `dataUpload` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idImagem`),
  KEY `idAve` (`idAve`),
  CONSTRAINT `imagens_aves_ibfk_1` FOREIGN KEY (`idAve`) REFERENCES `aves` (`idAve`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagens_aves`
--

LOCK TABLES `imagens_aves` WRITE;
/*!40000 ALTER TABLE `imagens_aves` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagens_aves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relatorios`
--

DROP TABLE IF EXISTS `relatorios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relatorios` (
  `idRelatorio` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  `dataGeracao` date NOT NULL,
  PRIMARY KEY (`idRelatorio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relatorios`
--

LOCK TABLES `relatorios` WRITE;
/*!40000 ALTER TABLE `relatorios` DISABLE KEYS */;
/*!40000 ALTER TABLE `relatorios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `idToken` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `criadoEm` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idToken`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `role` enum('admin','usuario') DEFAULT 'usuario',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-13 16:48:34
