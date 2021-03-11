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

const createOrderTable1 = (dropevent) => {

    //dropevent.preventDefault();
    const previousTable = table1.cart;
    return {
        execute() {
            table1.cart.push(JSON.parse(dropevent.dataTransfer.getData("text")));
        },
        
        undo() {
            table1.cart = previousTable;
        }
    }
}

const createOrderTable2 = (dropevent) => {

    //dropevent.preventDefault();
    var previousTable = table2.cart;
    return {
        execute() {
            table2.cart.push(JSON.parse(dropevent.dataTransfer.getData("text")));
        },
        
        undo() {
            console.log(previousTable);
            table2.cart = previousTable;
        }
    }
}

const createOrderTable3 = (dropevent) => {

    //dropevent.preventDefault();
    const previousTable = table3.cart;
    return {
        execute() {
            table3.cart.push(JSON.parse(dropevent.dataTransfer.getData("text")));
        },
        
        undo() {
            table3.cart = previousTable;
        }
    }
}

const createOrderTable4 = (dropevent) => {

    //dropevent.preventDefault();
    const previousTable = table4;
    return {
        execute() {
            table4.cart.push(JSON.parse(dropevent.dataTransfer.getData("text")));
        },
        
        undo() {
            table4 = previousTable;
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
                commandManager.doCommand(TABLEORDER1, dropevent);//createOrderTable(table1, dropevent));
                table1.amount[namn] = 1;
            }
            break;

        case "table2":
            if ((namn in table2.amount)){
                table2.amount[namn] +=1;
            }else{
                commandManager.doCommand(TABLEORDER2, dropevent);//createOrderTable(table2, dropevent));
                table2.amount[namn] = 1;
            }
            break;

        case "table3":
            if ((namn in table3.amount)){
                table3.amount[namn] +=1;
            }else{
                commandManager.doCommand(TABLEORDER3, dropevent);//createOrderTable(table3, dropevent));
                //table3.cart.push(beverage);
                table3.amount[namn] = 1;
            }
            break;

        case "table4":
            if ((namn in table4.amount)){
                table4.amount[namn] +=1;
            }else{
                commandManager.doCommand(TABLEORDER4, dropevent);//createOrderTable(table4, dropevent));
                table4.amount[namn] = 1;
            }
            break;

        default:
            break;
    }
}

const TABLEORDER1 = "TABLEORDER1";
const TABLEORDER2 = "TABLEORDER2";
const TABLEORDER3 = "TABLEORDER3";
const TABLEORDER4 = "TABLEORDER4";

const commands = {
    [TABLEORDER1]: createOrderTable1,
    [TABLEORDER2]: createOrderTable2,
    [TABLEORDER3]: createOrderTable3,
    [TABLEORDER4]: createOrderTable4
}

const createCommandManager = () => {
    let history = [null];
    let position = 0;
    
    return {
        doCommand(commandType, extra) {
            if (position < history.length -1) {
                history = history.slice(0, position + 1)
            }
            
            if (commands[commandType]) {
                const concreteCommand = commands[commandType](extra);
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
var commandManager = createCommandManager();