-- MySQL dump 10.13  Distrib 8.4.0, for Linux (x86_64)
--
-- Host: localhost    Database: meestdb
-- ------------------------------------------------------
-- Server version	8.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'tommy_hilfiger','Tommy Hilfiger','https://i.ibb.co/72h5sHf/Tommy-Hilfiger-Logo.png'),(2,'asos','asos','https://i.ibb.co/m5pzs3S/asos.png'),(3,'adidas','Adidas','https://i.ibb.co/s1vc1Ty/adidas.png'),(4,'columbia','Columbia','https://i.ibb.co/Yp1bjQ0/columbia.png'),(5,'gap','Gap','https://i.ibb.co/5KY34M6/gap.png'),(6,'massimo_dutti','Massimo Dutti','https://i.ibb.co/qjKRWMn/massimo-Dutti.png'),(7,'new_balance','New Balance','https://i.ibb.co/3vs7x7x/new-Balance.png'),(8,'puma','Puma','https://i.ibb.co/pnSHDYS/puma.png');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes`
--

DROP TABLE IF EXISTS `clothes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `name_UA` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes`
--

LOCK TABLES `clothes` WRITE;
/*!40000 ALTER TABLE `clothes` DISABLE KEYS */;
INSERT INTO `clothes` VALUES (1,'shoes','Shoes','Туфлі'),(2,'t_shirt','T-Shirt','Футболка'),(3,'jeans','Jeans','Джинси'),(4,'jacket','Jacket','Піджак'),(5,'undershirt','Undershirt','Нижня Сорочка'),(6,'shirt','Shirt','Сорочка'),(7,'sweater','Sweater','Светр'),(8,'blouse','Blouse','Блузка'),(9,'dress','Dress','Сукня'),(10,'pants','Pants','Штани'),(11,'shorts','Shorts','Шорти');
/*!40000 ALTER TABLE `clothes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothes_data`
--

DROP TABLE IF EXISTS `clothes_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothes_data` (
  `uniq_cloth_id` int NOT NULL AUTO_INCREMENT,
  `cloth_id` int DEFAULT NULL,
  `gender_id` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  PRIMARY KEY (`uniq_cloth_id`),
  KEY `clothes_data_brands_id_fk` (`brand_id`),
  KEY `clothes_data_genders_id_fk` (`gender_id`),
  KEY `clothes_data_clothes_definition_id_fk` (`cloth_id`),
  CONSTRAINT `clothes_data_brands_id_fk` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `clothes_data_clothes_definition_id_fk` FOREIGN KEY (`cloth_id`) REFERENCES `clothes` (`id`),
  CONSTRAINT `clothes_data_genders_id_fk` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothes_data`
--

LOCK TABLES `clothes_data` WRITE;
/*!40000 ALTER TABLE `clothes_data` DISABLE KEYS */;
INSERT INTO `clothes_data` VALUES (1,1,2,1),(2,1,1,1),(3,2,2,1),(4,4,2,1),(5,5,2,1),(6,6,2,1),(7,7,2,1),(8,2,1,1),(9,4,1,1),(10,5,1,1),(11,7,1,1),(12,6,1,1),(13,8,1,1),(14,3,2,1),(15,10,2,1),(16,11,2,1),(17,3,1,1),(18,10,1,1),(19,11,1,1),(20,1,3,1);
/*!40000 ALTER TABLE `clothes_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversions`
--

DROP TABLE IF EXISTS `conversions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uniq_cloth_id` int DEFAULT NULL,
  `height` float DEFAULT NULL,
  `head_length` float DEFAULT NULL,
  `chest_length` float DEFAULT NULL,
  `waist_length` float DEFAULT NULL,
  `hip_length` float DEFAULT NULL,
  `foot_length` float DEFAULT NULL,
  `pants_length` float DEFAULT NULL,
  `size_type_id` int DEFAULT NULL,
  `size_value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `conversions_size_types_id_fk` (`size_type_id`),
  KEY `conversions_clothes_data_uniq_cloth_id_fk` (`uniq_cloth_id`),
  CONSTRAINT `conversions_clothes_data_uniq_cloth_id_fk` FOREIGN KEY (`uniq_cloth_id`) REFERENCES `clothes_data` (`uniq_cloth_id`),
  CONSTRAINT `conversions_size_types_id_fk` FOREIGN KEY (`size_type_id`) REFERENCES `size_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversions`
--

LOCK TABLES `conversions` WRITE;
/*!40000 ALTER TABLE `conversions` DISABLE KEYS */;
INSERT INTO `conversions` VALUES (1,1,NULL,NULL,NULL,NULL,NULL,22.5,NULL,1,'35'),(2,1,NULL,NULL,NULL,NULL,NULL,23.4,NULL,1,'36'),(3,1,NULL,NULL,NULL,NULL,NULL,24,NULL,1,'37'),(4,1,NULL,NULL,NULL,NULL,NULL,24.6,NULL,1,'38'),(5,1,NULL,NULL,NULL,NULL,NULL,25.3,NULL,1,'39'),(6,1,NULL,NULL,NULL,NULL,NULL,26,NULL,1,'40'),(7,1,NULL,NULL,NULL,NULL,NULL,26.6,NULL,1,'41'),(8,1,NULL,NULL,NULL,NULL,NULL,27.3,NULL,1,'42'),(9,2,NULL,NULL,NULL,NULL,NULL,25.3,NULL,1,'39'),(10,2,NULL,NULL,NULL,NULL,NULL,25.8,NULL,1,'40'),(11,2,NULL,NULL,NULL,NULL,NULL,26.4,NULL,1,'41'),(12,2,NULL,NULL,NULL,NULL,NULL,27,NULL,1,'42'),(13,2,NULL,NULL,NULL,NULL,NULL,27.6,NULL,1,'43'),(14,2,NULL,NULL,NULL,NULL,NULL,28.3,NULL,1,'44'),(15,2,NULL,NULL,NULL,NULL,NULL,28.9,NULL,1,'45'),(16,2,NULL,NULL,NULL,NULL,NULL,29.6,NULL,1,'46'),(17,2,NULL,NULL,NULL,NULL,NULL,30.3,NULL,1,'47'),(18,3,NULL,NULL,80,58,NULL,NULL,NULL,1,'XXS'),(19,3,NULL,NULL,82,62,NULL,NULL,NULL,1,'XS'),(20,3,NULL,NULL,86,66,NULL,NULL,NULL,1,'S'),(21,3,NULL,NULL,90,70,NULL,NULL,NULL,1,'M'),(22,3,NULL,NULL,96,76,NULL,NULL,NULL,1,'L'),(23,3,NULL,NULL,102,82,NULL,NULL,NULL,1,'XL'),(24,3,NULL,NULL,108,88,NULL,NULL,NULL,1,'XXL'),(25,4,NULL,NULL,80,58,NULL,NULL,NULL,1,'XXS'),(26,4,NULL,NULL,82,62,NULL,NULL,NULL,1,'XS'),(27,4,NULL,NULL,86,66,NULL,NULL,NULL,1,'S'),(28,4,NULL,NULL,90,70,NULL,NULL,NULL,1,'M'),(29,4,NULL,NULL,96,76,NULL,NULL,NULL,1,'L'),(30,4,NULL,NULL,102,82,NULL,NULL,NULL,1,'XL'),(31,4,NULL,NULL,108,88,NULL,NULL,NULL,1,'XXL'),(32,5,NULL,NULL,80,58,NULL,NULL,NULL,1,'XXS'),(33,5,NULL,NULL,82,62,NULL,NULL,NULL,1,'XS'),(34,5,NULL,NULL,86,66,NULL,NULL,NULL,1,'S'),(35,5,NULL,NULL,90,70,NULL,NULL,NULL,1,'M'),(36,5,NULL,NULL,96,76,NULL,NULL,NULL,1,'L'),(37,5,NULL,NULL,102,82,NULL,NULL,NULL,1,'XL'),(38,5,NULL,NULL,108,88,NULL,NULL,NULL,1,'XXL'),(39,6,NULL,NULL,80,58,NULL,NULL,NULL,1,'XXS'),(40,6,NULL,NULL,82,62,NULL,NULL,NULL,1,'XS'),(41,6,NULL,NULL,86,66,NULL,NULL,NULL,1,'S'),(42,6,NULL,NULL,90,70,NULL,NULL,NULL,1,'M'),(43,6,NULL,NULL,96,76,NULL,NULL,NULL,1,'L'),(44,6,NULL,NULL,102,82,NULL,NULL,NULL,1,'XL'),(45,6,NULL,NULL,108,88,NULL,NULL,NULL,1,'XXL'),(46,7,NULL,NULL,80,58,NULL,NULL,NULL,1,'XXS'),(47,7,NULL,NULL,82,62,NULL,NULL,NULL,1,'XS'),(48,7,NULL,NULL,86,66,NULL,NULL,NULL,1,'S'),(49,7,NULL,NULL,90,70,NULL,NULL,NULL,1,'M'),(50,7,NULL,NULL,96,76,NULL,NULL,NULL,1,'L'),(51,7,NULL,NULL,102,82,NULL,NULL,NULL,1,'XL'),(52,7,NULL,NULL,108,88,NULL,NULL,NULL,1,'XXL'),(53,8,NULL,NULL,93.5,NULL,NULL,NULL,NULL,1,'S'),(54,8,NULL,NULL,98.5,NULL,NULL,NULL,NULL,1,'M'),(55,8,NULL,NULL,104,NULL,NULL,NULL,NULL,1,'L'),(56,8,NULL,NULL,109.5,NULL,NULL,NULL,NULL,1,'XL'),(57,8,NULL,NULL,114.5,NULL,NULL,NULL,NULL,1,'XXL'),(58,9,NULL,NULL,93.5,NULL,NULL,NULL,NULL,1,'S'),(59,9,NULL,NULL,98.5,NULL,NULL,NULL,NULL,1,'M'),(60,9,NULL,NULL,104,NULL,NULL,NULL,NULL,1,'L'),(61,9,NULL,NULL,109.5,NULL,NULL,NULL,NULL,1,'XL'),(62,9,NULL,NULL,114.5,NULL,NULL,NULL,NULL,1,'XXL'),(63,10,NULL,NULL,93.5,NULL,NULL,NULL,NULL,1,'S'),(64,10,NULL,NULL,98.5,NULL,NULL,NULL,NULL,1,'M'),(65,10,NULL,NULL,104,NULL,NULL,NULL,NULL,1,'L'),(66,10,NULL,NULL,109.5,NULL,NULL,NULL,NULL,1,'XL'),(67,10,NULL,NULL,114.5,NULL,NULL,NULL,NULL,1,'XXL'),(68,11,NULL,NULL,93.5,NULL,NULL,NULL,NULL,1,'S'),(69,11,NULL,NULL,98.5,NULL,NULL,NULL,NULL,1,'M'),(70,11,NULL,NULL,104,NULL,NULL,NULL,NULL,1,'L'),(71,11,NULL,NULL,109.5,NULL,NULL,NULL,NULL,1,'XL'),(72,11,NULL,NULL,114.5,NULL,NULL,NULL,NULL,1,'XXL'),(73,12,NULL,NULL,93.5,NULL,NULL,NULL,NULL,1,'S'),(74,12,NULL,NULL,98.5,NULL,NULL,NULL,NULL,1,'M'),(75,12,NULL,NULL,104,NULL,NULL,NULL,NULL,1,'L'),(76,12,NULL,NULL,109.5,NULL,NULL,NULL,NULL,1,'XL'),(77,12,NULL,NULL,114.5,NULL,NULL,NULL,NULL,1,'XXL'),(78,13,NULL,NULL,93.5,NULL,NULL,NULL,NULL,1,'S'),(79,13,NULL,NULL,98.5,NULL,NULL,NULL,NULL,1,'M'),(80,13,NULL,NULL,104,NULL,NULL,NULL,NULL,1,'L'),(81,13,NULL,NULL,109.5,NULL,NULL,NULL,NULL,1,'XL'),(82,13,NULL,NULL,114.5,NULL,NULL,NULL,NULL,1,'XXL'),(83,14,NULL,NULL,NULL,58,86,NULL,NULL,1,'XXS'),(84,14,NULL,NULL,NULL,62,90,NULL,NULL,1,'XS'),(85,14,NULL,NULL,NULL,66,94,NULL,NULL,1,'S'),(86,14,NULL,NULL,NULL,70,98,NULL,NULL,1,'M'),(87,14,NULL,NULL,NULL,76,104,NULL,NULL,1,'L'),(88,14,NULL,NULL,NULL,82,110,NULL,NULL,1,'XL'),(89,15,NULL,NULL,NULL,58,86,NULL,NULL,1,'XXS'),(90,15,NULL,NULL,NULL,62,90,NULL,NULL,1,'XS'),(91,15,NULL,NULL,NULL,66,94,NULL,NULL,1,'S'),(92,15,NULL,NULL,NULL,70,98,NULL,NULL,1,'M'),(93,15,NULL,NULL,NULL,76,104,NULL,NULL,1,'L'),(94,15,NULL,NULL,NULL,82,110,NULL,NULL,1,'XL'),(95,16,NULL,NULL,NULL,58,86,NULL,NULL,1,'XXS'),(96,16,NULL,NULL,NULL,62,90,NULL,NULL,1,'XS'),(97,16,NULL,NULL,NULL,66,94,NULL,NULL,1,'S'),(98,16,NULL,NULL,NULL,70,98,NULL,NULL,1,'M'),(99,16,NULL,NULL,NULL,76,104,NULL,NULL,1,'L'),(100,16,NULL,NULL,NULL,82,110,NULL,NULL,1,'XL'),(101,17,NULL,NULL,NULL,72.5,91.5,NULL,NULL,1,'36'),(102,17,NULL,NULL,NULL,76.5,95.5,NULL,NULL,1,'38'),(103,17,NULL,NULL,NULL,80.5,99.5,NULL,NULL,1,'40'),(104,17,NULL,NULL,NULL,84.5,103.5,NULL,NULL,1,'42'),(105,17,NULL,NULL,NULL,88.5,107.5,NULL,NULL,1,'44'),(106,17,NULL,NULL,NULL,92.5,111.5,NULL,NULL,1,'46'),(107,18,NULL,NULL,NULL,NULL,69,NULL,NULL,1,'XS'),(108,18,NULL,NULL,NULL,NULL,75,NULL,NULL,1,'S'),(109,18,NULL,NULL,NULL,NULL,81,NULL,NULL,1,'M'),(110,18,NULL,NULL,NULL,NULL,87,NULL,NULL,1,'L'),(111,18,NULL,NULL,NULL,NULL,93,NULL,NULL,1,'XL'),(112,18,NULL,NULL,NULL,NULL,99,NULL,NULL,1,'XXL'),(113,19,NULL,NULL,NULL,NULL,69,NULL,NULL,1,'XS'),(114,19,NULL,NULL,NULL,NULL,75,NULL,NULL,1,'S'),(115,19,NULL,NULL,NULL,NULL,81,NULL,NULL,1,'M'),(116,19,NULL,NULL,NULL,NULL,87,NULL,NULL,1,'L'),(117,19,NULL,NULL,NULL,NULL,93,NULL,NULL,1,'XL'),(118,19,NULL,NULL,NULL,NULL,99,NULL,NULL,1,'XXL');
/*!40000 ALTER TABLE `conversions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genders`
--

DROP TABLE IF EXISTS `genders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(50) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `name_UA` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genders`
--

LOCK TABLES `genders` WRITE;
/*!40000 ALTER TABLE `genders` DISABLE KEYS */;
INSERT INTO `genders` VALUES (1,'male','Male','Чоловік'),(2,'female','Female','Жінка'),(3,'child','Child','Дитина');
/*!40000 ALTER TABLE `genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size_types`
--

DROP TABLE IF EXISTS `size_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country_key` varchar(50) DEFAULT NULL,
  `country_name_UA` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `country_key` (`country_key`),
  UNIQUE KEY `country_name_UA` (`country_name_UA`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size_types`
--

LOCK TABLES `size_types` WRITE;
/*!40000 ALTER TABLE `size_types` DISABLE KEYS */;
INSERT INTO `size_types` VALUES (1,'europe','Європа');
/*!40000 ALTER TABLE `size_types` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-10 17:40:37
