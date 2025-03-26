/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.7.2-MariaDB, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: dashboard
-- ------------------------------------------------------
-- Server version	11.7.2-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` VALUES
(1,'AOC','AOC@l-support.com','2025-03-25 16:46:15','2025-03-26 17:50:20'),
(2,'Samsung','Samsung@l2-support.com','2025-03-25 17:04:00','2025-03-25 17:24:48');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tasks`
--

DROP TABLE IF EXISTS `Tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parentId` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `name` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `plannedEndDate` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_parent` (`parentId`),
  CONSTRAINT `fk_parent` FOREIGN KEY (`parentId`) REFERENCES `Tasks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tasks`
--

LOCK TABLES `Tasks` WRITE;
/*!40000 ALTER TABLE `Tasks` DISABLE KEYS */;
INSERT INTO `Tasks` VALUES
(2,NULL,1,'Konfiguracja systemu','Ogólna konfiguracja i ustawienia systemu.','2025-03-11T23:00:00.000Z','New','2025-03-25 15:29:54','2025-03-26 11:54:18'),
(3,2,1,'Instalacja środowiska','Instalacja oraz konfiguracja niezbędnego oprogramowania.','2025-03-24T21:09:24.933Z','Completed','2025-03-25 15:29:54','2025-03-25 22:50:39'),
(6,3,1,'Negocjacja z klientem','Omówienie warunków projektu z klientem.','2025-03-26T23:00:00.000Z','In Progress','2025-03-25 15:29:54','2025-03-26 11:19:06'),
(51,NULL,1,'Testowy task','sdfsdfhsdfghjdfgj','2025-03-10T23:00:00.000Z','Completed','2025-03-26 08:47:11','2025-03-26 17:50:37'),
(52,NULL,2,'Testowy task dla samsunga','Testowy opis testowego taska, testowanie systemu...','2025-03-26T08:47:29.952Z','New','2025-03-26 08:47:29','2025-03-26 08:47:34'),
(55,51,1,'Testowy task','Testowy opis testowego taska, testowanie systemu...','2025-03-10T23:00:00.000Z','New','2025-03-26 17:50:22','2025-03-26 17:50:24'),
(56,51,1,'Testowy task','Testowy opis testowego taska, testowanie systemu...','2025-03-26T17:50:26.037Z','New','2025-03-26 17:50:26','2025-03-26 17:50:26'),
(57,55,1,'Testowy task','Testowy opis testowego taska, testowanie systemu...','2025-03-26T17:50:30.196Z','New','2025-03-26 17:50:30','2025-03-26 17:50:30');
/*!40000 ALTER TABLE `Tasks` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-03-26 23:54:17
