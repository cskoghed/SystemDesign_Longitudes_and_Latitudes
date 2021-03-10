var table1 =
    {
        "cart" :
            [

            ]
    };

var table2 =
    {
        "cart" :
            [

            ]
    };

var table3 =
    {
        "cart" :
            [

            ]
    };

var table4 =
    {
        "cart" :
            [

            ]
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
    switch(id){
        case "table1":
            console.log("1");
            createCommandManager(tables).doCommand(createOrderTable(table1, dropevent));
            break;

        case "table2":
            createCommandManager(tables).doCommand(createOrderTable(table2, dropevent));
            break;

        case "table3":
            createCommandManager(tables).doCommand(createOrderTable(table3, dropevent));
            break;

        case "table4":
            createCommandManager(tables).doCommand(createOrderTable(table4, dropevent));
            break;

        default:
            break;
    }
}

const INCREMENT = "INCREMENT"
const DECREMENT = "DECREMENT"

const commands = {
    [INCREMENT]: createIncrementCommand,
    [DECREMENT]: createDecrementCommand
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

