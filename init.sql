drop database if exists Estefanini;

create database Estefanini;

CREATE TABLE COMPANY(
    id SERIAL PRIMARY KEY,
    name varchar(250)  NOT NULL,
    accessionDate timestamp default current_timestamp
);

CREATE TABLE TRANSFER(
    id SERIAL PRIMARY KEY,
    amount varchar(250) NOT NULL,
    date timestamp default current_timestamp,
    company_id int NOT NULL,
);

ALTER TABLE TRANSFER ADD CONSTRAINT fk_tranfer_company FOREIGN KEY (company_id) REFERENCES COMPANY(id);

