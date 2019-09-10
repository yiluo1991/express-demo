CREATE DATABASE  IF NOT EXISTS `tksale`;
USE `tksale`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tksale
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `tb_admin`
--

DROP TABLE IF EXISTS `tb_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_admin` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `LoginName` varchar(64) NOT NULL,
  `Password` varchar(64) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `LoginName` (`LoginName`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_admin`
--

LOCK TABLES `tb_admin` WRITE;
/*!40000 ALTER TABLE `tb_admin` DISABLE KEYS */;
INSERT INTO `tb_admin` VALUES (1,'admin','a66abb5684c45962d887564f08346e8d'),(2,'111','74e9c9f2de6a1f2f73b8d62727449a5e');
/*!40000 ALTER TABLE `tb_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_ads`
--

DROP TABLE IF EXISTS `tb_ads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_ads` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Src` varchar(64) NOT NULL,
  `SortNum` int(11) NOT NULL DEFAULT '100',
  `Enable` tinyint(4) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_ads`
--

LOCK TABLES `tb_ads` WRITE;
/*!40000 ALTER TABLE `tb_ads` DISABLE KEYS */;
INSERT INTO `tb_ads` VALUES (2,'/upload/file-1568078567575.png',100,1);
/*!40000 ALTER TABLE `tb_ads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_category`
--

DROP TABLE IF EXISTS `tb_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_category` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) NOT NULL,
  `Src` varchar(64) NOT NULL,
  `SortNum` int(11) NOT NULL DEFAULT '100',
  `Enable` tinyint(4) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_category`
--

LOCK TABLES `tb_category` WRITE;
/*!40000 ALTER TABLE `tb_category` DISABLE KEYS */;
INSERT INTO `tb_category` VALUES (1,'厦门周边','/upload/head.jpg',100,0),(2,'美食','/upload/head.jpg',100,1),(5,'你好','/upload/file-1567560010822.jpg',55,1),(6,'1234','/upload/file-1567498541221.png',100,1);
/*!40000 ALTER TABLE `tb_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_customer`
--

DROP TABLE IF EXISTS `tb_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_customer` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `AppOpenId` varchar(64) NOT NULL,
  `SessionKey` varchar(64) DEFAULT NULL,
  `NickName` varchar(32) DEFAULT NULL,
  `AvatarUrl` varchar(64) DEFAULT NULL,
  `Sex` tinyint(4) DEFAULT NULL,
  `Country` varchar(32) DEFAULT NULL,
  `Province` varchar(32) DEFAULT NULL,
  `City` varchar(32) DEFAULT NULL,
  `WeChatBindPhone` varchar(16) DEFAULT NULL,
  `Account` decimal(12,2) NOT NULL DEFAULT '0.00',
  `Status` tinyint(4) NOT NULL,
  `RowVersion` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `AppOpenId` (`AppOpenId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_customer`
--

LOCK TABLES `tb_customer` WRITE;
/*!40000 ALTER TABLE `tb_customer` DISABLE KEYS */;
INSERT INTO `tb_customer` VALUES (1,'11111',NULL,'a','/upload/head.jpg',1,'中国','福建','其他','18888888888',0.00,1,1),(6,'12342134',NULL,'b','/upload/head.jpg',0,'中国','福建','厦门',NULL,0.00,1,1),(7,'123213123',NULL,'c','/upload/head.jpg',1,'中国','福建','厦门',NULL,1.00,1,1),(13,'123333213123',NULL,'d','/upload/head.jpg',2,'中国','福建','厦门',NULL,1.00,1,1),(14,'122343213123',NULL,'e','/upload/head.jpg',1,'中国','福建','宁德',NULL,1.00,1,1),(16,'1213123',NULL,'f','/upload/head.jpg',1,'中国','福建','漳州',NULL,1.00,1,1),(17,'2222',NULL,'g','/upload/head.jpg',0,NULL,NULL,NULL,NULL,1.00,1,1),(18,'3333',NULL,'h','/upload/head.jpg',0,NULL,NULL,NULL,NULL,1.00,1,1),(19,'4444',NULL,'i','/upload/head.jpg',0,'中国','福建','莆田',NULL,1.00,1,1),(20,'1235213',NULL,'j','/upload/head.jpg',0,'中国','福建','南平',NULL,1.00,1,1);
/*!40000 ALTER TABLE `tb_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_order`
--

DROP TABLE IF EXISTS `tb_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_order` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerId` int(11) NOT NULL,
  `TicketId` int(11) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Total` decimal(12,2) NOT NULL,
  `Mobile` varchar(12) NOT NULL,
  `ContactName` varchar(16) NOT NULL,
  `UseDate` date DEFAULT NULL,
  `Status` tinyint(4) DEFAULT NULL,
  `CreateTime` timestamp(3) NULL DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_order_customer` (`CustomerId`),
  KEY `FK_order_ticket` (`TicketId`),
  CONSTRAINT `FK_order_customer` FOREIGN KEY (`CustomerId`) REFERENCES `tb_customer` (`Id`),
  CONSTRAINT `FK_order_ticket` FOREIGN KEY (`TicketId`) REFERENCES `tb_ticket` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_order`
--

LOCK TABLES `tb_order` WRITE;
/*!40000 ALTER TABLE `tb_order` DISABLE KEYS */;
INSERT INTO `tb_order` VALUES (1,1,12,100.00,2,200.00,'18046100000','李小阳','2019-11-01',1,'2019-09-10 02:11:11.111');
/*!40000 ALTER TABLE `tb_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_ticket`
--

DROP TABLE IF EXISTS `tb_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_ticket` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(64) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Stock` int(11) NOT NULL,
  `ShopName` varchar(64) DEFAULT NULL,
  `ShopAddress` varchar(64) DEFAULT NULL,
  `ShopPhone` varchar(12) DEFAULT NULL,
  `Lat` decimal(10,6) DEFAULT NULL,
  `Long` decimal(10,6) DEFAULT NULL,
  `Content` text NOT NULL,
  `Src` varchar(64) NOT NULL,
  `CategoryId` int(11) NOT NULL,
  `Enable` tinyint(4) NOT NULL,
  `SortNum` int(11) NOT NULL DEFAULT '100',
  PRIMARY KEY (`Id`),
  KEY `FK_ticket_category` (`CategoryId`),
  CONSTRAINT `FK_ticket_category` FOREIGN KEY (`CategoryId`) REFERENCES `tb_category` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_ticket`
--

LOCK TABLES `tb_ticket` WRITE;
/*!40000 ALTER TABLE `tb_ticket` DISABLE KEYS */;
INSERT INTO `tb_ticket` VALUES (12,'软件园开发体验',11.00,1111,'厦门励航软件','厦门市集美区软件园三期A区-01栋','18888888888',24.613387,118.058804,'<h2><span style=\"text-decoration-line: underline;\"></span>啊哈</h2><p>阿斯蒂芬</p>','/upload/file-1568078400592.png',1,1,100);
/*!40000 ALTER TABLE `tb_ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-10 16:02:23
