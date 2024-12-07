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
-- Table structure for table `jobseekers`
--

DROP TABLE IF EXISTS `jobseekers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobseekers` (
  `JobSeekerID` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `ProfilePicture` varchar(255) DEFAULT NULL,
  `Resume` text,
  `Skills` varchar(255) DEFAULT NULL,
  `JoinDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `Address` varchar(255) DEFAULT NULL,
  `Otp` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`JobSeekerID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobseekers`
--

LOCK TABLES `jobseekers` WRITE;
/*!40000 ALTER TABLE `jobseekers` DISABLE KEYS */;
INSERT INTO `jobseekers` VALUES (41,'Prakash Aryal','pandeymukti407@gmail.com','$2a$10$gBF6IIuDqn8Di4URLtbYOerCauy95X4ZSFSyhdeDo7Ge6kAXHvLre','1730074970144.png','1730074970145.pdf','Web Devlopment, software development','2024-10-27 20:22:50','Melbourne, Victoria, Australia',NULL),(42,'Sugam Kandel','kandel.sugam.24@gmail.com','$2a$10$JOlZ.OmcVyp4H/aQupOCOOORKKOX1StF90zL.MEwCPc/pIzh.FCDG','1730478578957.jpeg','1730478578978.pdf','good kisser,','2024-11-01 12:29:39','Heavenly Mountain Resort, 4080 Lake Tahoe Blvd, South Lake Tahoe, California 96150, United States',NULL),(44,'Adarsha Sapkota','adarshasapkota150@gmail.com','$2a$10$dzro8WMAoryMDTetTc5eDOKDT4iHiiGcgU5aXZv3uHGjhBvkOPRrS','1731077233080.png','1731077233088.pdf','PUBG','2024-11-08 09:47:13','56 Claire Close, Ormeau Queensland 4208, Australia',NULL),(53,'Indeed','alert@indeed.com','$2a$10$KBUf8ZxbqdkN0tuSFlvv6eKFh3GHpkaKcYwTkWUmBB/7dEzS5dGk.','1732262020799.png','1732262020801.pdf','job application','2024-11-22 02:53:40','Btrust Supermarket, 1105 Wilson Ave., North York, Ontario M3M 1H2, Canada',NULL),(54,'Samiksha Pandey','pandeysamiksha169@gmail.com','$2a$10$PUBGUsMyu/PlbG.nB.1/GO1GgaoCNxs6h9AQ2ap4PTa5xLTwngGQy','1732263853989.gif','1732263854051.pdf','Web Devlopment, software development','2024-11-22 03:24:14','Bhumahi, Ramnagar, Nawalparasi West, Lumbini Province, Nepal',NULL),(67,'Sabin Neupane','neupanesabin143@gmail.com','$2a$10$WIFsXuNFzmEZi6z9SFCWhuqK3wzJgYR53esHlClqysTrobCmrKvLK','1733081666401.png','1733081666411.pdf','Web Devlopment, software development','2024-12-01 14:34:26','670 Parliament Street, Toronto, Ontario M4X 1R4, Canada',NULL),(70,'Sagar Rana','autostocksinc@gmail.com','$2a$10$OhEfMeJdpQ6KMM.gMFX5Texz9SxDeuQIBH8GquSBmnP8xQH3BaYSq','1733083967126.png','1733083967139.pdf','Web DEVElopment','2024-12-01 15:12:47','Bhumahi, Ramnagar, Nawalparasi West, Lumbini Province, Nepal',NULL),(71,'Sudip Gurung','sudeepgrg9825@gmail.com','$2a$10$qn9pKKdBUd/7cKsRxEOEUunl11fCxJogK7GVh3FYxkGef9G9BNUMy','1733085729495.png','1733085729504.pdf','Web DEVElopment','2024-12-01 15:42:09','The Parliament, 76 E Monroe St, Chicago, Illinois 60603, United States',NULL),(72,'Aswin Adhikari','oceanphoto85@gmail.com','$2a$10$dzf/ywkwSVqgsZhgwHgbqeWdcT9JpbzYRiwdhZ2wSQlp4a1N/bVZW','1733085969315.png','1733085969325.pdf','Web developemnt ','2024-12-01 15:46:09','89 Claremont Street, Birkdale Queensland 4159, Australia',NULL),(73,'Dipak Bhandari','dipak1bhandari@gmail.com','$2a$10$/UCmVJv8CAUnnbgLEuMEpOXLo6sfJTZj5hPJu5EP/dqe0/OmQrCQ.','1733087340069.png','1733087340076.pdf','Web Devlopment, software development','2024-12-01 16:09:00','89 Claremont Street, Campsie New South Wales 2194, Australia',NULL),(74,'Sanjit Chapagain','chapagainsanjit7@gmail.com','$2a$10$7QgaKGw759nFrMxFV44eJOwoENIMlKhkHwJBZMG0sJrz5r1Vlf5se','1733087627925.png','1733087627927.pdf','Web development','2024-12-01 16:13:48','89 Claremont Street, Toronto, Ontario M6J 2M7, Canada',NULL),(75,'Navin Gharti','navin20604@gmail.com','$2a$10$8xwuJvoUqXBi97DbAr0phuAiW1ouFE9STazWVz.D35ZHfl1vXG/R6','1733087964526.png','1733087964534.pdf','Node js, React Js, HTml, css, Typescript','2024-12-01 16:19:24','670 Parliament Street, Toronto, Ontario M4X 1R4, Canada',NULL),(76,'Kiran Bhusal','kiranbhusal5420@gmail.com','$2a$10$iTlYTTYy2OkSX311yyiVyOpJGsahO4.UTEMG.RLuWiBiLAYSu64Ei','1733088866065.png','1733088866078.pdf','Web developemnt ','2024-12-01 16:34:26','670 Parliament Street, Toronto, Ontario M4X 1R4, Canada',NULL),(77,'AKASH PANDEY','pandeyakas209@gmail.com','$2a$10$D5HapgnqHlytIRHNi4/QD.G0OMciQys18Q4YL4iZcUworVA/r/09C','1733368904852.jpg','1733368904858.pdf','Node.js, Express.js, React.js','2024-12-04 22:21:44','670 Parliament Street, Toronto, Ontario M4X 1R4, Canada',NULL),(78,'Akash Pandey','ap636374@gmail.com','$2a$10$lCJuj0TLJn0WZYMGYOjMH.kTWBB/fRoDEl8TQfKropz/b/eLCDyuu','1733413172867.jpg','1733413172873.pdf','Web Devlopment, software development','2024-12-05 10:39:32','65 Bakerton Drive, Scarborough, Ontario M1J 2T3, Canada',NULL),(79,'Sujit Tamang','crsujit7@gmail.com','$2a$10$1GMflyimE/SzX5DFFKaJLOYKOCGnIlkv9G30NDqTwMREQycR3DYm2','1733414282938.jpg','1733414282946.pdf','Web Devlopment, software development','2024-12-05 10:58:03','Kennedy Road Tabernacle, 141 Kennedy Rd N, Brampton, Ontario L6V 2P2, Canada',NULL),(80,'AKASH PANDEY','panvd34@gmail.com','$2a$10$NsbMXTHqncAUx8SipP1iauBIa6zHbRNaaw1/rq3CqMAEcvSQDOfZG','1733472508335.jpeg','1733472508339.pdf','Web development','2024-12-06 03:08:28','65 Baverton Drive, Flat Bush, Auckland 2016, New Zealand',NULL),(81,'Data ','potomac1050@mktomail.com','$2a$10$94ppb3LPjHNi7NL/MnmZOu6NE.7uEIR44zRqqG1f76rxFWpwHfGJm','1733472664276.jpeg','1733472664283.pdf','Web DEVElopment','2024-12-06 03:11:04','Parliament, 2418 Allen St, Dallas, Texas 75204, United States',NULL),(83,'John Doe','pandeydhankumari99@gmail.com','$2a$10$ERSECavOIrtWWxj61KcjVuTDVuUJqTz6kLjjzLKhrcsJ2ZomGVHS6','1733472881729.png','1733472881733.pdf','Web development','2024-12-06 03:14:41','89 Claremont Street, Campsie New South Wales 2194, Australia',NULL),(84,'Andrew ','andrew@hi.quizizz.com','$2a$10$i6eIa891fFcJQcXQkpmLWul34x/.XqShXuHdjdJepjiHY/7nvB3cu','1733473236647.jpg','1733473236650.pdf','Web DEVElopment','2024-12-06 03:20:36','89 Claremont Street, Campsie New South Wales 2194, Australia',NULL);
/*!40000 ALTER TABLE `jobseekers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-06 21:05:56
