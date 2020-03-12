DROP DATABASE IF EXISTS Storefront_DB;
CREATE DATABASE Storefront_DB;
USE Storefront_DB;

CREATE TABLE SalesTable
(
    Product_ID INTEGER,
    Category VARCHAR (40),
    Items_For_Sale VARCHAR (100),
    Price_Per_Item DECIMAL (10,3),
    Quantity_Available DECIMAL (10,1),
    Discount DECIMAL(10,3),
    Items_Sold DECIMAL(10,3),
    Total_Sales DECIMAL (10,3),
    PRIMARY KEY (Product_ID)
);

CREATE TABLE Customer_Id
(
    Cust_ID INTEGER AUTO_INCREMENT,
    Name VARCHAR (40),
    PRIMARY KEY (Cust_ID)
);
