-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local
*/

CREATE DATABASE IF NOT EXISTS slim_archives;
USE slim_archives;

CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nome_usuario VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(20) NOT NULL
    album_favorito_id INT,
    FOREIGN KEY (album_favorito_id) REFERENCES albuns(id)

);

CREATE TABLE albuns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_album VARCHAR(100) NOT NULL,
   
);

CREATE TABLE Quiz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_hora DATETIME NOT NULL,
    quantidade_acertos INT NOT NULL,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

INSERT INTO albuns (nome_album, ano_lancamento) VALUES
('Infinite', 1996),
('The Slim Shady LP', 1999),
('The Marshall Mathers LP', 2000),
('The Eminem Show', 2002),
('8 Mile Soundtrack (2002)'),
('D12 World (2004) - com D12'),
('Encore (2004)'),
('Curtain Call: The Hits (2005)'),
('Eminem Presents The Re-Up (2006)'),
('Relapse (2009)'),
('Relapse: Refil (2009)'),
('Recovery (2010)'),
('Hell: The Sequel (2011) - com Bad Meets Evil'),
('The Marshall Mathers LP 2 (2013)'),
('Revival (2017)'),
('Kamikaze (2018)'),
('Music to Be Murdered By', 2020),
('Music to Be Murdered By - Side B (2020)'),
('Curtain Call 2 (2022)'),
('The Death of Slim Shady (2024)');