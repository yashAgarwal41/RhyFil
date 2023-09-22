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
-- Table structure for table `voda`
--

DROP TABLE IF EXISTS `voda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voda` (
  `circle_name` varchar(200) DEFAULT NULL,
  `service_keyword` varchar(200) DEFAULT NULL,
  `product` varchar(200) DEFAULT NULL,
  `total` int DEFAULT NULL,
  `charged_to_customer` int DEFAULT NULL,
  `gross_revenue` int DEFAULT NULL,
  `shuffle_promo_id` varchar(200) DEFAULT NULL,
  `vodafonerbtclipid` int DEFAULT NULL,
  `promocode` int DEFAULT NULL,
  `song_name` varchar(200) DEFAULT NULL,
  `album_name` varchar(200) DEFAULT NULL,
  `languagename` varchar(200) DEFAULT NULL,
  `label` varchar(200) DEFAULT NULL,
  `Main_Label` varchar(200) DEFAULT NULL,
  `Sub_Label` varchar(200) DEFAULT NULL,
  `Label_Identification` varchar(200) DEFAULT NULL,
  `rightsbodyname` varchar(200) DEFAULT NULL,
  `contentprovidername` varchar(200) DEFAULT NULL,
  `payto` varchar(200) DEFAULT NULL,
  `genreid` varchar(200) DEFAULT NULL,
  `subgenreid` varchar(200) DEFAULT NULL,
  `contentid` varchar(200) DEFAULT NULL,
  `richcategory` varchar(200) DEFAULT NULL,
  `richsubcategory` varchar(200) DEFAULT NULL,
  `short_name` varchar(200) DEFAULT NULL,
  `final_circle_name` varchar(200) DEFAULT NULL,
  `sheet_name` varchar(200) DEFAULT NULL,
  `royality` float DEFAULT NULL,
  `original_l1_name` varchar(200) DEFAULT NULL,
  `original_l2_name` varchar(200) DEFAULT NULL,
  `month` int DEFAULT NULL,
  `year` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voda`
--

LOCK TABLES `voda` WRITE;
/*!40000 ALTER TABLE `voda` DISABLE KEYS */;
/*!40000 ALTER TABLE `voda` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-11 20:49:26
