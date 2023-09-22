-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: rhyfil
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `amazon`
--

DROP TABLE IF EXISTS `amazon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amazon` (
  `dataset_date` int DEFAULT NULL,
  `territory_code` varchar(200) DEFAULT NULL,
  `subscription_plan` varchar(200) DEFAULT NULL,
  `streams` int DEFAULT NULL,
  `offline_plays` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `track_asin` varchar(200) DEFAULT NULL,
  `isrc` varchar(200) DEFAULT NULL,
  `proprietary_track_id` varchar(200) DEFAULT NULL,
  `song_name` varchar(200) DEFAULT NULL,
  `proprietary_album_id` varchar(200) DEFAULT NULL,
  `digital_album_upc` varchar(200) DEFAULT NULL,
  `album_name` varchar(200) DEFAULT NULL,
  `artist_name` varchar(200) DEFAULT NULL,
  `label` varchar(200) DEFAULT NULL,
  `Main_Label` varchar(200) DEFAULT NULL,
  `Sub_Label` varchar(200) DEFAULT NULL,
  `track_quality` varchar(200) DEFAULT NULL,
  `ratecard_currency` varchar(200) DEFAULT NULL,
  `settlement_currency` varchar(200) DEFAULT NULL,
  `asset_type` varchar(200) DEFAULT NULL,
  `royality` float DEFAULT NULL,
  `id` varchar(200) DEFAULT NULL,
  `original_l1_name` varchar(200) DEFAULT NULL,
  `original_l2_name` varchar(200) DEFAULT NULL,
  `month` int DEFAULT NULL,
  `year` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amazon`
--

LOCK TABLES `amazon` WRITE;
/*!40000 ALTER TABLE `amazon` DISABLE KEYS */;
/*!40000 ALTER TABLE `amazon` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-11 20:49:27
