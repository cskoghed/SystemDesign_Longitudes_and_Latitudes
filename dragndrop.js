// Table orders represented as objects.
var table1 =
    {
        "cart" :
            [

            ],
        "amount" :
            {

            }
    };

var table2 =
    {
        "cart" :
            [

            ],
        "amount" :
            {
                
            }
    };

var table3 =
    {
        "cart" :
            [

            ],
        "amount" :
            {

            }
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

var tableHistory = [JSON.stringify(tables)];        // Load table orders in the undo-/redo-history
var history_pos = 0;                                // Used as an index for tableHistory

// Lets us implement 'drag and drop'
function allowDrop(allowdropevent) {
    allowdropevent.preventDefault();
}

// The drag in 'drag and drop'
function drag(dragevent) {
    dragevent.dataTransfer.setData("text", $("#" + dragevent.target.id).data("item"));
}

// The drop in 'drag and drop'
function drop(dropevent) {
    dropevent.preventDefault();
    var id = dropevent.target.id;

    let beverage = JSON.parse(dropevent.dataTransfer.getData("text"));
    namn = beverage.namn
    
    let table = tables[id];
    if ((namn in table.amount)){
        tables[id].amount[namn] +=1;
    }else{
        tables[id].cart.push(beverage);
        tables[id].amount[namn] = 1;
    }
    beverages_stockAmounts[namn]--;
    showMenu();
    saveState();
}
// Use this to make something undoable
function saveState() {
    if (history_pos < tableHistory.length) {
        tableHistory = tableHistory.slice(0, history_pos+1);
        history_pos = tableHistory.length;
    }
    else {
        history_pos += 1;
    }
    tableHistory.push(JSON.stringify(tables));
}

function undo() {
    if(history_pos <= 0){
        return;
    }
    history_pos -= 1;
    tables = JSON.parse(tableHistory[history_pos]);
    showOrder(tableClickEvent);
}

function redo() {
    if(history_pos >= tableHistory.length-1){
        return;
    }
    history_pos += 1;
    tables = JSON.parse(tableHistory[history_pos]);
    showOrder(tableClickEvent);
}