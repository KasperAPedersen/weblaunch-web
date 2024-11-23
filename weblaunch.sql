-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 23. 11 2024 kl. 17:31:56
-- Serverversion: 10.4.32-MariaDB
-- PHP-version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weblaunch`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `pricefeatures`
--

CREATE TABLE `pricefeatures` (
  `id` int(11) NOT NULL,
  `price_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Data dump for tabellen `pricefeatures`
--

INSERT INTO `pricefeatures` (`id`, `price_id`, `description`) VALUES
(1, 1, 'One-pager'),
(2, 2, 'Stilren og lækker hjemmeside'),
(3, 2, 'Unikt design – Fra vores custom templates'),
(4, 2, 'Optimeret til Mobil & Tablet'),
(5, 2, 'Grundlæggende tekstskrivning'),
(6, 2, 'SEO (Søgemaskineoptimeret)'),
(7, 2, 'Kontaktformular'),
(8, 2, 'Første udkast klar på 7 arbejdsdage'),
(9, 2, 'Op til 6 sider (1 forside + 5 undersider)'),
(10, 2, 'Stilren og lækker hjemmeside'),
(11, 2, 'Unikt design'),
(12, 2, 'Optimeret til Mobil & Tablet'),
(13, 2, 'Grundlæggende tekstskrivning'),
(14, 2, 'SEO (Søgemaskineoptimeret)'),
(15, 2, 'Kontaktformular'),
(16, 2, 'Første udkast klar på 14 arbejdsdage'),
(17, 3, 'Op til 10 sider (1 forside + 9 undersider)'),
(18, 3, 'Stilren og lækker hjemmeside'),
(19, 3, 'Unikt design'),
(20, 3, 'Optimeret til Mobil & Tablet'),
(21, 3, 'SEO (Søgemaskineoptimeret)'),
(22, 3, 'Udvidet kontaktformular'),
(23, 3, 'Salgsoptimeret'),
(24, 3, 'Hastighedsoptimeret'),
(25, 3, '3 mdr. service inkluderet (værdi 2.985 kr. ekskl. moms)'),
(26, 3, 'Første udkast klar på 21 arbejdsdage'),
(27, 4, 'Pakken tilpasses dine behov og krav'),
(28, 4, 'Mulighed for specialudviklede funktioner'),
(29, 4, 'Fokus på din forretning og målgruppe'),
(30, 4, 'Fuld fleksibilitet i design og funktionalitet');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `prices`
--

CREATE TABLE `prices` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Data dump for tabellen `prices`
--

INSERT INTO `prices` (`id`, `name`, `description`, `price`) VALUES
(1, '', 'Til dig der har brug for en simpel men professionel digital tilstedeværelse', 6.297),
(2, '', 'Til dig der ønsker mere fleksibilitet og avancerede funktioner', 10.497),
(3, '', 'Til dig der kræver det bedste inden for digital tilstedeværelse', 17.497),
(4, '', 'Til dig med unikke behov og krav', NULL);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `pricefeatures`
--
ALTER TABLE `pricefeatures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `price_id` (`price_id`);

--
-- Indeks for tabel `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `pricefeatures`
--
ALTER TABLE `pricefeatures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Tilføj AUTO_INCREMENT i tabel `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `pricefeatures`
--
ALTER TABLE `pricefeatures`
  ADD CONSTRAINT `pricefeatures_ibfk_1` FOREIGN KEY (`price_id`) REFERENCES `prices` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
