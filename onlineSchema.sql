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

USE Storefront_DB;

CREATE TABLE Customer_Id
(
    Cust_ID INTEGER,
    NAME VARCHAR (30),
    PRIMARY KEY (Cust_ID)
);

CREATE TABLE Orders
(
Order_Id INTEGER,
Buyer_ID INTEGER (5),
Buyer VARCHAR (30),
Catergory VARCHAR (30),
Item VARCHAR (30),
Price_Per_Item DECIMAL (10,2),
Quantity INTEGER (5),
TotalCost DECIMAL(10,2)
PRIMARY KEY (Order_Id)
)
