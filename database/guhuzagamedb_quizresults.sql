CREATE DATABASE  IF NOT EXISTS `guhuzagamedb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `guhuzagamedb`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: guhuzagamedb
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `quizresults`
--

DROP TABLE IF EXISTS `quizresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizresults` (
  `ResultID` int NOT NULL AUTO_INCREMENT,
  `JobSeekerID` int NOT NULL,
  `GroupCollection` varchar(255) DEFAULT NULL,
  `CorrectAnswers` int DEFAULT '0',
  `TimeTaken` int DEFAULT NULL,
  `TotalXP` int DEFAULT NULL,
  `PlayedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ResultID`),
  KEY `JobSeekerID` (`JobSeekerID`),
  CONSTRAINT `quizresults_ibfk_1` FOREIGN KEY (`JobSeekerID`) REFERENCES `jobseekers` (`JobSeekerID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizresults`
--

LOCK TABLES `quizresults` WRITE;
/*!40000 ALTER TABLE `quizresults` DISABLE KEYS */;
INSERT INTO `quizresults` VALUES (39,41,'Level 1',8,120,138,'2024-11-21 19:30:31'),(59,41,'Level 2',3,22,80,'2024-12-01 13:52:42'),(60,41,'Level 1',2,10,70,'2024-12-01 13:58:56'),(61,41,'Level 1',5,90,100,'2024-12-01 19:32:33'),(62,67,'Level 1',3,12,80,'2024-12-01 20:17:57'),(63,70,'Level 1',5,22,100,'2024-12-01 20:20:23'),(65,54,'Level 1',1,11,60,'2024-12-01 20:35:12'),(66,71,'Level 1',2,10,70,'2024-12-01 20:43:27'),(67,72,'Level 2',4,11,90,'2024-12-01 20:47:41'),(68,73,'Level 1',3,13,80,'2024-12-01 21:10:30'),(69,74,'Level 1',3,14,80,'2024-12-01 21:14:55'),(70,75,'Level 1',2,13,70,'2024-12-01 21:20:29'),(71,76,'Level 1',3,10,80,'2024-12-01 21:39:28'),(72,76,'Level 2',5,18,100,'2024-12-01 21:42:18'),(76,54,'Level 1',6,27,110,'2024-12-05 03:06:15'),(77,54,'Level 1',3,14,80,'2024-12-05 03:15:17'),(78,77,'Level 1',4,18,90,'2024-12-05 03:50:41'),(79,71,'Level 1',7,31,120,'2024-12-05 07:05:00'),(80,77,'Level 1',4,15,90,'2024-12-05 15:20:02'),(81,79,'Level 1',1,54,60,'2024-12-05 16:06:28'),(82,78,'Level 1',8,14,138,'2024-12-05 18:50:02'),(83,78,'Level 1',8,189,138,'2024-12-05 22:46:13'),(84,78,'Level 1',9,18,149,'2024-12-05 23:30:32'),(85,78,'Level 1',8,17,138,'2024-12-05 23:35:25'),(86,78,'Level 2',7,99,120,'2024-12-05 23:38:28'),(87,78,'Level 3',7,77,120,'2024-12-05 23:46:46'),(88,78,'Level 4',4,66,90,'2024-12-05 23:48:53'),(89,78,'Level 6',9,21,149,'2024-12-06 00:00:12'),(90,78,'Level 2',4,14,90,'2024-12-06 00:03:04'),(91,78,'Level 3',4,14,90,'2024-12-06 00:11:05'),(92,78,'Level 1',9,20,149,'2024-12-06 00:17:46'),(93,79,'Level 1',5,475,100,'2024-12-06 03:44:36'),(94,77,'Level 1',9,21,149,'2024-12-06 06:57:44'),(95,77,'Level 1',8,23,138,'2024-12-06 07:00:15'),(96,77,'Level 1',8,28,138,'2024-12-06 07:01:28'),(97,77,'Level 1',8,19,138,'2024-12-06 07:15:19'),(98,77,'Level 1',8,15,138,'2024-12-06 07:21:01'),(99,77,'Level 1',3,14,80,'2024-12-06 07:28:11'),(100,77,'Level 1',8,23,138,'2024-12-06 07:28:45'),(101,77,'Level 1',10,18,160,'2024-12-06 07:40:41'),(102,77,'Level 1',7,23,120,'2024-12-06 07:45:08'),(103,77,'Level 1',5,18,100,'2024-12-06 07:48:56'),(104,77,'Level 3',4,15,90,'2024-12-06 07:50:02'),(105,77,'Level 1',10,21,160,'2024-12-06 07:51:52'),(106,77,'Level 1',8,23,138,'2024-12-06 07:55:35'),(107,77,'Level 2',4,17,90,'2024-12-06 07:56:10'),(108,77,'Level 2',4,20,90,'2024-12-06 08:04:58'),(109,77,'Level 3',5,21,100,'2024-12-06 08:05:33'),(110,77,'Level 1',5,28,100,'2024-12-06 13:56:35'),(111,77,'Level 1',8,133,138,'2024-12-06 15:12:30'),(112,77,'Level 1',7,171,120,'2024-12-07 00:51:13');
/*!40000 ALTER TABLE `quizresults` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_UpdateLeaderboardTotalXP` AFTER INSERT ON `quizresults` FOR EACH ROW BEGIN
    -- Calculate the total XP for the job seeker
    DECLARE total_xp INT;
    SELECT SUM(TotalXP) INTO total_xp
    FROM quizresults
    WHERE JobSeekerID = NEW.JobSeekerID;

    -- Update the leaderboard with the new total XP
    UPDATE leaderboard
    SET TotalXP = total_xp
    WHERE JobSeekerID = NEW.JobSeekerID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-06 21:05:56
