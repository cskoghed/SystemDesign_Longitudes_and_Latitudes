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

var tableHistory = [JSON.stringify(tables)];

var history_pos = 0;

function allowDrop(allowdropevent) {
    allowdropevent.preventDefault();
}

function drag(dragevent) {
    dragevent.dataTransfer.setData("text", $("#" + dragevent.target.id).data("item"));
}

function drop(dropevent) {
    dropevent.preventDefault();
    var id = dropevent.target.id;

    let beverage = JSON.parse(dropevent.dataTransfer.getData("text"));
    namn = beverage.namn
    switch(id){
        case "table1":
            if ((namn in table1.amount)){
                tables.table1.amount[namn] +=1;
            }else{
                tables.table1.cart.push(beverage);
                tables.table1.amount[namn] = 1;
            }
            saveState();
            break;

        case "table2":
            if ((namn in table2.amount)){
                tables.table2.amount[namn] +=1;
            }else{
                tables.table2.cart.push(beverage);
                tables.table2.amount[namn] = 1;
            }
            saveState();
            break;

        case "table3":
            if ((namn in table3.amount)){
                tables.table3.amount[namn] +=1;
            }else{
                tables.table3.cart.push(beverage);
                tables.table3.amount[namn] = 1;
            }
            saveState();
            break;

        case "table4":
            if ((namn in table4.amount)){
                tables.table4.amount[namn] +=1;
            }else{
                tables.table4.cart.push(beverage);
                tables.table4.amount[namn] = 1;
            }
            saveState();
            break;

        default:
            break;
    }
}

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
}

function redo() {
    if(history_pos >= tableHistory.length-1){
        return;
    }
    history_pos += 1;
    tables = JSON.parse(tableHistory[history_pos]);
}