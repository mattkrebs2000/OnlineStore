var mysql = require("mysql");
var inquirer = require("inquirer");

function introductions() {
    inquirer.prompt({

        name: "introductions",
        type: "list",
        message: "\n\nWelcome to Matt Krebs's Store! \n\n\n Are you a store manager or a customer?",
        choices: ["Manager", "Customer", "Exit"]

    })
        .then(function (answer) {

            if (answer.introductions === "Customer") {

                console.log("\n\nThank You for being such a Loyal Customer!\n");

                // customerOptions()
               

            }
            else if (answer.introductions === "Manager") {

                console.log("\n\nThank you for checking in today!\n");

                managerOptions();

            }
            else {

                console.log("\n\nThanks for visiting us today!");

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


introductions()
