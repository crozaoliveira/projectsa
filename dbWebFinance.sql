#Cria banco de dados
create database webfinance;

use webfinance;

CREATE TABLE `usuarios` (
  `ID_USUARIO` integer unsigned NOT NULL AUTO_INCREMENT,
  `NM_USUARIO` varchar(100) DEFAULT NULL,
  `LOGIN` varchar(100) NOT NULL,
  `SENHA` varchar(100) NOT NULL,
  `IE_ATIVO` set('S','N') DEFAULT 'S',
  `IE_DELETADO` set('S','N') DEFAULT 'N',
  `DT_INCLUSAO` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_USUARIO`)
);

CREATE TABLE `tipos_conta` (
  `ID_TIPO` int unsigned NOT NULL AUTO_INCREMENT,
  `DS_TIPO` varchar(50) DEFAULT NULL,
  `DT_INCLUSAO` datetime DEFAULT NULL,
  `ID_USUARIO` int unsigned DEFAULT NULL,
  `IE_CLASSIF_TIPO` set('D','R') DEFAULT NULL,
  `IE_ATIVO` set('S','N') DEFAULT 'S',
  `IE_DELETADO` set('S','N') DEFAULT 'N',
  PRIMARY KEY (`ID_TIPO`),
  FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`)
);

CREATE TABLE `contas` (
  `NR_CONTA` int unsigned NOT NULL AUTO_INCREMENT,
  `DS_CONTA` varchar(100) DEFAULT NULL,
  `VL_CONTA` decimal(7,2) DEFAULT NULL,
  `DT_VENCIMENTO` date DEFAULT NULL,
  `DT_INCLUSAO` datetime DEFAULT NULL,
  `DT_ATUALIZACAO` datetime DEFAULT NULL,
  `IE_ATIVO` set('S','N') DEFAULT 'S',
  `IE_DELETADO` set('S','N') DEFAULT 'N',
  `ID_USUARIO` int unsigned DEFAULT NULL,
  `ID_TIPO` int unsigned DEFAULT NULL,
  PRIMARY KEY (`NR_CONTA`),
  FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`),
  FOREIGN KEY (`ID_TIPO`) REFERENCES `tipos_conta` (`ID_TIPO`)
);

CREATE TABLE `registro_transacoes` (
  `NR_TRANSACAO` int unsigned NOT NULL AUTO_INCREMENT,
  `NR_CONTA` int(10) unsigned DEFAULT NULL,
  `DT_TRANSACAO` datetime DEFAULT NULL,
  `ID_USUARIO` int unsigned DEFAULT NULL,
  `VL_TRANSACAO` decimal(7,2) DEFAULT NULL,
  `IE_ATIVO` set('S','N') DEFAULT 'S',
  `IE_DELETADO` set('S','N') DEFAULT 'N',
  PRIMARY KEY (`NR_TRANSACAO`),
  FOREIGN KEY (`NR_CONTA`) REFERENCES `contas` (`NR_CONTA`),
  FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`)
);

CREATE TABLE `acessos` (
  `ID_ACESSO` int unsigned NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int unsigned DEFAULT NULL,
  `DT_ACESSO` datetime DEFAULT NULL,
  `IP_ACESSO` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID_ACESSO`),
  FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`)
) 







