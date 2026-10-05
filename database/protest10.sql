-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: protest10
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `tb_commit`
--

DROP TABLE IF EXISTS `tb_commit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_commit` (
  `id_commit` int NOT NULL AUTO_INCREMENT,
  `id_eva` int NOT NULL,
  `id_member` int NOT NULL,
  `status_commit` varchar(10) NOT NULL,
  `level_commit` varchar(100) NOT NULL,
  `detail_commit` text,
  `signature` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_commit`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_commit`
--

LOCK TABLES `tb_commit` WRITE;
/*!40000 ALTER TABLE `tb_commit` DISABLE KEYS */;
INSERT INTO `tb_commit` VALUES (16,1,3,'y','ประธาน','ทดสอบกรรมการประเมิน','1788008991475.png'),(17,1,4,'n','กรรมการ',NULL,NULL),(18,1,5,'n','เลขา',NULL,NULL);
/*!40000 ALTER TABLE `tb_commit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_doc`
--

DROP TABLE IF EXISTS `tb_doc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_doc` (
  `id_doc` int NOT NULL AUTO_INCREMENT,
  `name_doc` varchar(100) NOT NULL,
  `day_doc` date DEFAULT NULL,
  `file` varchar(100) NOT NULL,
  PRIMARY KEY (`id_doc`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_doc`
--

LOCK TABLES `tb_doc` WRITE;
/*!40000 ALTER TABLE `tb_doc` DISABLE KEYS */;
INSERT INTO `tb_doc` VALUES (3,'คู่มือการประเมิน','2026-08-29','1787985158410.pdf');
/*!40000 ALTER TABLE `tb_doc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_eva`
--

DROP TABLE IF EXISTS `tb_eva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_eva` (
  `id_eva` int NOT NULL AUTO_INCREMENT,
  `id_member` int DEFAULT NULL,
  `id_sys` int DEFAULT NULL,
  `status_eva` int DEFAULT NULL,
  `day_eva` date DEFAULT NULL,
  `total_eva` double(10,2) DEFAULT NULL,
  `total_commit` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`id_eva`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_eva`
--

LOCK TABLES `tb_eva` WRITE;
/*!40000 ALTER TABLE `tb_eva` DISABLE KEYS */;
INSERT INTO `tb_eva` VALUES (1,1,1,2,'2020-05-06',35.00,21.00);
/*!40000 ALTER TABLE `tb_eva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_evadetail`
--

DROP TABLE IF EXISTS `tb_evadetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_evadetail` (
  `id_evadetail` int NOT NULL AUTO_INCREMENT,
  `id_eva` int NOT NULL,
  `id_indicate` int NOT NULL,
  `status_eva` int DEFAULT NULL,
  `detail_eva` text,
  `score_member` int DEFAULT NULL,
  `score_commit` int DEFAULT NULL,
  `file_eva` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_evadetail`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_evadetail`
--

LOCK TABLES `tb_evadetail` WRITE;
/*!40000 ALTER TABLE `tb_evadetail` DISABLE KEYS */;
INSERT INTO `tb_evadetail` VALUES (3,1,3,1,'ทดสอบ',4,NULL,'1788008722768.2246bject Undefined].png'),(4,1,6,1,'ทดสอบ2',3,NULL,'1788008722770.8298bject Undefined].pdf'),(5,1,5,1,'ทดสอบ3',3,NULL,'1788008722770.25bject Undefined].pdf'),(6,1,7,1,'ทดสอบ4',3,NULL,'1788008722770.7095bject Undefined].pdf'),(7,1,3,2,NULL,NULL,2,NULL),(8,1,6,2,NULL,NULL,3,NULL),(9,1,5,2,NULL,NULL,1,NULL),(10,1,7,2,NULL,NULL,3,NULL);
/*!40000 ALTER TABLE `tb_evadetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_indicate`
--

DROP TABLE IF EXISTS `tb_indicate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_indicate` (
  `id_indicate` int NOT NULL AUTO_INCREMENT,
  `id_topic` int DEFAULT NULL,
  `name_indicate` varchar(100) DEFAULT NULL,
  `point_indicate` int DEFAULT NULL,
  `check_indicate` varchar(100) DEFAULT NULL,
  `detail_indicate` text,
  PRIMARY KEY (`id_indicate`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_indicate`
--

LOCK TABLES `tb_indicate` WRITE;
/*!40000 ALTER TABLE `tb_indicate` DISABLE KEYS */;
INSERT INTO `tb_indicate` VALUES (3,2,'กระทะ',2,'y','กระทะดีขนาดไหน'),(5,3,'ซีพียู',5,'n','ความเร็วการประเมินผลของซีพียู'),(6,2,'หม้อ',2,'y','คุณภาพหม้อ'),(7,3,'การ์ดจอ',2,'y','ความเร็วการประมวลผลภาพ');
/*!40000 ALTER TABLE `tb_indicate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_member`
--

DROP TABLE IF EXISTS `tb_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_member` (
  `id_member` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pic_user` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_member`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_member`
--

LOCK TABLES `tb_member` WRITE;
/*!40000 ALTER TABLE `tb_member` DISABLE KEYS */;
INSERT INTO `tb_member` VALUES (1,'nangi','sang','nangi@hotmail.com','nangi','$2b$10$FwRR86GVo5zpfoz2rNQOfernvV/YB6DuQw14F84mBnlLN5iCqb6ii','ผู้รับการประเมินผล','1787975174720.png'),(2,'staff','staff','staff@gmail.com','staff','$2b$10$MODsAh/LgGnz6pdyCdsIxuCKr.idzImFBxTQQBPpFTpmI7qjUoOpe','ฝ่ายบุคลากร',NULL),(3,'commit','commit','commit@gmail.com','commit','$2b$10$KbDvEygebxQzxmJ1agicauuZ4fHpqEfQpuT5V5FRmVC6od0Xp8242','กรรมการประเมิน',NULL),(4,'commit2','commit2','commit2@gmail.com','commit2','$2b$10$7cp.hXnPP2KTdlpJUA/9oOhgY4I6jnRb6UwknrflZJ4oxUU9nuzsS','กรรมการประเมิน',NULL),(5,'commit3','commit3','commit3@gmail.com','commit3','$2b$10$eDR/sr5Kq.FV56DmrULUJuOrxOX.5dn/q3naKln44SIZZYr38Tqj6','กรรมการประเมิน',NULL);
/*!40000 ALTER TABLE `tb_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_system`
--

DROP TABLE IF EXISTS `tb_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_system` (
  `id_sys` int NOT NULL AUTO_INCREMENT,
  `day_open` date DEFAULT NULL,
  `day_out` date DEFAULT NULL,
  `round_sys` int DEFAULT NULL,
  `year_sys` int DEFAULT NULL,
  `status_sys` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_sys`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_system`
--

LOCK TABLES `tb_system` WRITE;
/*!40000 ALTER TABLE `tb_system` DISABLE KEYS */;
INSERT INTO `tb_system` VALUES (1,'2026-08-29','2026-09-06',1,2569,'y'),(2,'2026-08-05','2026-08-23',2,2568,'y');
/*!40000 ALTER TABLE `tb_system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_topic`
--

DROP TABLE IF EXISTS `tb_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_topic` (
  `id_topic` int NOT NULL AUTO_INCREMENT,
  `name_topic` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_topic`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_topic`
--

LOCK TABLES `tb_topic` WRITE;
/*!40000 ALTER TABLE `tb_topic` DISABLE KEYS */;
INSERT INTO `tb_topic` VALUES (2,'สินค้าถูกใจ'),(3,'การประเมินผลคอม');
/*!40000 ALTER TABLE `tb_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'protest10'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-05 13:58:55
