var mysql = require("mysql");
var inquirer = require("inquirer");

function introductions() {
    inquirer.prompt({

        name: "introductions",
        type: "list",
        message: "\n\nWelcome to Matt Krebs's Store! \n\n\n Are you a store manager or a customer?",
        choices: ["Manager", "Customer", "Exit"]

    }

    )
        .then(function (answer) {

            if (answer.introductions === "Customer") {



                console.log("\n\nThank You for Visiting us today!\n");

                customerDocumentation()



            }
            else if (answer.introductions === "Manager") {

                console.log("\n\nThank you for checking in today!\n");

                managerOptions();

            }
            else {

                console.log("\n\nThanks for coming and have a nice day!");

            }
        })
}

function managerOptions() {
    inquirer.prompt({

        name: "managerOptions",
        type: "list",
        message: "\n\nFYI - A new shipment of inventory has just arrived. \n\nWhat would you like to do right now?",
        choices: ["Review Current Inventory", "Accept shipment - Stock Inventory", "Check Sales"]
    })

        .then(function (answer) {
            if (answer.managerOptions === "Review Current Inventory") {

                console.log("\n\nOK lets take a look to see what is on our shelves!\n\n")

                // readCurrentInventory()

            } else if (answer.managerOptions === "Accept shipment - Stock Inventory") {

                console.log("\n\nOK Great - We have just restocked the shelves with this shipment. \n\n It included x units of this \n\ny units of that \n\nand z units of that\n\n");


            } else {

                console.log("\n\nYour sales are as follows numbers\n\n");

            }

        })
}


function customerOptions() {
    inquirer.prompt({

        name: "customerOptions",
        type: "list",
        message: "\n\nWhat would you like to do right now?",
        choices: ["See your purchase history", "Go Shopping","Go Home"]
    })

        .then(function (answer) {
            if (answer.customerOptions === "Review Your Purchase History") {

                console.log("\n\nOK lets take a look to see what you have purchased so far!\n\n")

                // recordOfPurchases()

            } else if (answer.customerOptions === "Go Shopping") 
            
            {


                itemsDesired();

            } else {

               // connection.end();
            }
        })
}


introductions()


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

function itemsDesired() {
    inquirer.prompt([{

        name: "itemsDesired",
        type: "list",
        message: "\n\n At Matt Krebs's store we have a fine selection of products!\n\n What were you looking for today?",
        choices: ["Umbrellas", "Hampsters", "Machine Guns"]
    },
    {
        name: "quantityDesired",
        input: "number",
        message: "\n\n How many of these were you looking to purchase today \n\n(Must not be greater than ______ )\n\n"
    }

    ])
        .then(function (answer) {
            if (answer.quantityDesired > 0 && answer.quantityDesired <= 6)  //make variable out of inventory of desired number and compare)
            {
                console.log("\n\nyou have chosen to buy 7 _____ at $_____\n\n")
                payment()
            } else {

                console.log("\n\nWe only have ___ left in stock.\n\n Please pick a number that is greater than zero but less than\n\n")

            }

        })
}

function payment() {

console.log("your order is to buy x of x at x number");

    inquirer.prompt({

        name: "confirmOrder",
        type: "list",
        message: "Would you like to go forward with this order",
        choices: ["Yes", "no"]
    })

        .then(function (answer) {
            if (answer.confirmOrder === "Yes"){
            console.log("Great we have now magically taken x from you and in 10-15 business days you will receive your _______. Your order has been documented in purchase history.")

            //document purchase - in purchase history - in inventory - in sales. 

            } else {

                console.log("Sorry that you have decided not to purchase the_______. They are very popular. For now we will return you to the main menu ")

            }



})
}