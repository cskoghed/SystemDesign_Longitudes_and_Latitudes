var table1 =
    {
        "cart" :
            [

            ],

        "amount" :
            [

            ]
    };

var table2 =
    {
        "cart" :
            [

            ],

        "amount" :
            [

            ]
    };

var table3 =
    {
        "cart" :
            [

            ],

        "amount" :
            [

            ]
    };

var table4 =
    {
        "cart" :
            [

            ],

        "amount" :
            {

            }
    };

var tables = {
    "table1": table1,
    "table2": table2,
    "table3": table3,
    "table4": table4
};

function allowDrop(allowdropevent) {
    allowdropevent.preventDefault();
}

function drag(dragevent) {
    dragevent.dataTransfer.setData("text", $("#" + dragevent.target.id).data("item"));
}

const createOrderTable = (table, dropevent) => {

    const previousTable = table.cart;
    dropevent.preventDefault();

    var id = dropevent.target.id;


    return {
        execute() {
            table.cart.push(JSON.parse(dropevent.dataTransfer.getData("text")));
        },

        undo() {
            table.cart = previousTable1;
        }
    }
}

function drop(dropevent) {
    dropevent.preventDefault();
    var id = dropevent.target.id;

    let beverage = JSON.parse(dropevent.dataTransfer.getData("text"));
    // console.log(beverage.namn);
    // console.log(typeof(beverage));
    namn = beverage.namn
    switch(id){
        case "table1":
            // console.log("1");
            if ((namn in table1.amount)){
                table1.amount[namn] +=1;
            }else{
                createCommandManager(tables).doCommand(createOrderTable(table1, dropevent));
                table1.amount[namn] = 1;
            }
            break;

        case "table2":
            if ((namn in table2.amount)){
                table2.amount[namn] +=1;
            }else{
                createCommandManager(tables).doCommand(createOrderTable(table2, dropevent));
                table2.amount[namn] = 1;
            }
            break;

        case "table3":
            if ((namn in table3.amount)){
                table3.amount[namn] +=1;
            }else{
                createCommandManager(tables).doCommand(createOrderTable(table3, dropevent));
                //table3.cart.push(beverage);
                table3.amount[namn] = 1;
            }
            break;

        case "table4":
            if ((namn in table4.amount)){
                table4.amount[namn] +=1;
            }else{
                createCommandManager(tables).doCommand(createOrderTable(table4, dropevent));
                table4.amount[namn] = 1;
            }
            break;

        default:
            break;
    }
}

const TABLEORDER = "TABLEORDER"

const commands = (target, tool) => {
    [TABLEORDER]: createOrderTable(target, tool)
}

const createCommandManager = (target) => {
    let history = [null];
    let position = 0;

    return {
        doCommand(commandType) {
            if (position < history.length -1) {
                history = history.slice(0, position + 1)
            }

            if (commands[commandType]) {
                const concreteCommand = commands[commandType](target);
                history.push(concreteCommand);
                position += 1;

                concreteCommand.execute();
            }
        },

        undo() {
            if (position > 0) {
                history[position].undo();
                position -= 1;
            }
        },

        redo() {
            if(position < history.length -1) {
                position += 1;
                history[position].execute();
            }
        }
    }
}
