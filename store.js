var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "Storefront_db"
});


connection.connect(function (err) {
    if (err) throw err;
    introductions()

});



function introductions() {
    inquirer.prompt({

        name: "introductions",
        type: "list",
        message: "\n\nWelcome to our Online Office Store! \n\n\n Are you a Store Manager, a Customer or a Supervisor?\n\n\n",
        choices: ["Manager", "Customer", "Supervisor", "Exit"]

    }

    )
        .then(function (answer) {

            switch (answer.introductions) {
                case "Manager":
                    console.log("\n\nThank you for checking in today!\n");
                    managerOptions();
                    break;

                case "Customer":
                    console.log("\n\nThank You for Visiting us today!\n");
                    
                    newOrReturningCustomer();
                    break;

                case "Supervisor":
                    console.log("\n\nThank you for checking in today!\n");
                    // supervisorOptions();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }

        });
}







function managerOptions() {
    inquirer.prompt({
        name: "managerOptions",
        type: "list",
        message: "\n\nWhat would you like to do right now?",
        choices: ["Review Current Inventory", "Consider Restocking", "Check Sales", "Go Home"]
    })

        .then(function (answer) {

            switch (answer.managerOptions) {
                case "Review Current Inventory":
                    console.log("\n\nOK lets take a look to see what is on our shelves!\n\n");
                    seeWhatsOnTheShelves();
                    break;
                case "Consider Restocking":
                    checkStock();
                    break;


                case "Check Sales":
                    console.log("\n\nYour sales are as follows numbers\n\n");
                    break;

                case "Go Home":
                    console.log("\n\nYou just got here!!")
                    connection.end;

            }
        });
}


function customerOptions() {
    inquirer.prompt({

        name: "customerOptions",
        type: "list",
        message: "\n\nWhat would you like to do right now?",
        choices: ["See your purchase history", "Go Shopping", "Go Home"]
    })

        .then(function (answer) {
            switch (answer.customerOptions) {

                case "See your purchase history":
                    console.log("\n\nOK lets take a look to see what you have purchased so far!\n\n");
                    break;

                case "Go Shopping":
                    console.log("\n\nOK Let's go shopping!\n\n");
                    seeWhatsOnTheShelves();
                    break;

                case "Go Home":
                    console.log("\n\nCome back soon!\n\n");
                    connection.end;
                    break;

            }
        });
}

function seeWhatsOnTheShelves() {

    var query = "SELECT Category, Items_For_Sale, Price_Per_Item, Quantity_Available FROM SalesTable";
    console.log("\x1b[44m%s\x1b[0m", "Items For Sale");
    connection.query(query, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {


            console.log("\x1b[44m%s\x1b[0m", "\n" + res[i].Items_For_Sale + "        Price: $" + res[i].Price_Per_Item + "        Quantity Available: " + res[i].Quantity_Available);
        }



    });

    managerOptions()

}

//                 itemsDesired();



function checkStock() {

    inquirer.prompt({
        name: "howManyItemsOnShelves",
        type: "list",
        message: "\n\nEach Manager is different.\n\nAs items are flying off the shelves (due to sales) -\n\nAt what number (quantity) should each item be at before you decide to restock\n\n",
        choices: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    })

        .then(function (answer) {
            var threshold = answer.howManyItemsOnShelves;

            console.log(threshold);

            console.log("\n\nOK lets check to see if any of our items are below that threshold and need to be restocked.\n\n");

            var query = "SELECT Quantity_Available FROM SalesTable";

            connection.query(query, function (err, res) {
                if (err) throw err;

                for (var i = 0; i < res.length; i++) {

                    if (res[i].Quantity_Available < threshold) {

                        console.log("OK based on the threshold that you haves set you are going to need to restock.");

                        inquirer.prompt({
                            name: "maximumAmountOnShelves",
                            type: "list",
                            message: "\n\n In terms of quantity of Items (in stock) what is your limit on the high end?",
                            choices: [14, 15, 16, 17, 18, 19, 20]
                        })

                            .then(function (answer) {
                                var highthreshold = answer.maximumAmountOnShelves;
                               


                                console.log(highthreshold);

                                console.log("\n\nOK so we won't go over " + highthreshold + ".");

                                var nextquery = "UPDATE SalesTable SET Quantity_Available = " + highthreshold + " WHERE Quantity_Available < " + threshold;

                                // RESET
                                // UPDATE SalesTable SET Quantity_Available = 4 Where Quantity_Available > 8

                                connection.query(nextquery, function (err, result) {
                                    if (err) throw err;

                                  

                                    console.log("\n\nOK you've restocked those items that needed it.\n\n")
                                   
                                    customerOptions();
                                })



                            })
                        return false;
                    } else {

                    }
                }
                
            })





        })









    // managerOptions();

}


function newOrReturningCustomer () {

        inquirer.prompt({

            name: "newOrReturning",
            type: "list",
            message: "\n\nAre you a new or Returning Customer?",
            choices: ["New Customer", "Returning Customer"]
        })

            .then(function (answer) {
                switch (answer.newOrReturning) {

                    case "New Customer":
                        console.log("\n\nWelcome!\n\n");
                        register();
                        break;

                    case "Returning Customer":
                        console.log("\n\nWelcome Back!\n\n");
                        signIn();
                        //remember to visits ++
                        break;

                }
            });
    }



function register() {

// delete customers 
//DELETE FROM Customer_ID WHERE Cust_ID > 1;

    inquirer.prompt({

        name: "register",
        type: "input",
        message: "\n\nWhat is your Name?",
    })

        .then(function (answer) {

            var name = answer.register;

            var registerName = "INSERT INTO Customer_Id VALUES (default, '" + name + "', 1)"

            connection.query(registerName, function (err, result) {
                if (err) throw err;

                else {

                    getIdNumber();


               


            }
            })

        
        });
}

function getIdNumber(){

var getID = "SELECT Cust_ID from Customer_Id ORDER BY Cust_ID DESC LIMIT 1;"




    connection.query(getID, function (err, res) {
        if (err) throw err;

else {

    var IdNUMBER = res.Cust_ID;

    console.log(res[0].Cust_ID);
            

    console.log("ID " + IdNUMBER);
    console.log("ID2" + res);
 
        console.log("\n\nYour CustomerID Number is " + res + ".\n\n To log in to your account in the future \n\nyou must type in your name (as  you entered it) and your given CustoemrID number");
    }
  

    customerOptions();
})
}


function customerDocumentation() {

    inquirer.prompt([
        {
            name: "nameOfVisitor",
            type: "input",
            message: "please enter your name"
        },
        {
            name: "addressOfVisitor",
            type: "input",
            message: "please enter your address"
        }
    ])
        .then(function (answer) {

            //check information against users logged in mysql

            if (answer.nameOfVisitor === "a name in customer list" && answer.addressOfVisitor === "") {
                console.log("\n\nWelcome Back!\n\n")

                customerOptions()

            } else {

                //log information into users file in mysql

                console.log("\n\nWe see that your address and name is not an exact match.\n\n We will add your information to our files\n\n")

                customerOptions()
            }



        })


}

// function itemsDesired() {
//     inquirer.prompt([{

//         name: "itemsDesired",
//         type: "list",
//         message: "\n\n At Matt Krebs's store we have a fine selection of products!\n\n What were you looking for today?",
//         choices: ["Umbrellas", "Hampsters", "Machine Guns"]
//     },
//     {
//         name: "quantityDesired",
//         input: "number",
//         message: "\n\n How many of these were you looking to purchase today \n\n(Must not be greater than ______ )\n\n"
//     }

//     ])
//         .then(function (answer) {
//             if (answer.quantityDesired > 0 && answer.quantityDesired <= 6)  //make variable out of inventory of desired number and compare)
//             {
//                 console.log("\n\nyou have chosen to buy 7 _____ at $_____\n\n")
//                 payment()
//             } else {

//                 console.log("\n\nWe only have ___ left in stock.\n\n Please pick a number that is greater than zero but less than\n\n")

//             }

//         })
// }

// function payment() {

// console.log("your order is to buy x of x at x number");

//     inquirer.prompt({

//         name: "confirmOrder",
//         type: "list",
//         message: "Would you like to go forward with this order",
//         choices: ["Yes", "no"]
//     })

//         .then(function (answer) {
//             if (answer.confirmOrder === "Yes"){
//             console.log("Great we have now magically taken x from you and in 10-15 business days you will receive your _______. Your order has been documented in purchase history.")

//             //document purchase - in purchase history - in inventory - in sales. 

//             } else {

//                 console.log("Sorry that you have decided not to purchase the_______. They are very popular. For now we will return you to the main menu ")

//             }



// })
// }

// function restock(){

// UPDATE SalesTable
// SET Quantity_Available = highthreshold
// WHERE Quantity_Available < threshold

// }

// function maximumAmount() {
//     inquirer.prompt({
//         name: "maximumAmountOnShelves",
//         type: "list",
//         message: "\n\n In terms of quantity of Items (in stock) what is your limit on the high end?",
//         choices: [14, 15, 16, 17, 18, 19, 20]
//     })

//         .then(function (answer) {
//             var highthreshold = answer.maximumAmountOnShelves;


//             console.log(highthreshold);

//             console.log("\n\nOK lets check to see if any of our items \n\n are below that threshold and need to be restocked");



//         })
// }



// function checkStock() {

//     inquirer.prompt({
//         name: "howManyItemsOnShelves",
//         type: "list",
//         message: "\n\nEach Manager is different.\n\nAs items are flying off the shelves (due to sales) -\n\nAt what number (quantity) should each item be at before you decide to restock\n\n",
//         choices: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
//     })

//         .then(function (answer) {
//             var threshold = answer.howManyItemsOnShelves;

//             console.log(threshold);

//             console.log("\n\nOK lets check to see if any of our items are below that threshold and need to be restocked.\n\n");

//             var query = "SELECT Quantity_Available FROM SalesTable";

//             connection.query(query, function (err, res) {
//                 if (err) throw err;

//                 for (var i = 0; i < res.length; i++) {

//                     if (res[i].Quantity_Available < threshold) {

//                         console.log("OK based on the threshold that you haves set you are going to need to restock.");

//                         inquirer.prompt({
//                             name: "maximumAmountOnShelves",
//                             type: "list",
//                             message: "\n\n In terms of quantity of Items (in stock) what is your limit on the high end?",
//                             choices: [14, 15, 16, 17, 18, 19, 20]
//                         })

//                             .then(function (answer) {
//                                 var highthreshold = answer.maximumAmountOnShelves;



//                                 console.log(highthreshold);

//                                 console.log("\n\nOK so we won't go over " + highthreshold + ".");



//                                 var nextquery = "UPDATE SalesTable SET Quantity_Available = " + highthreshold + "WHERE Quantity_Available < " + threshold;

//                                 connection.query(nextquery, function (err, result) {
//                                     if (err) throw err;

//                                     console.log(result);
//                                  })



//                                 })
//                                 return false;
//                             } else {

//                             }
                
//                 console.log("OK based on the threshold that you have set we currently have plenty on the shelves. ")
         
//  })



