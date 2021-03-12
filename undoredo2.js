let tableHistory = [];
let historyIndex = 0;

function saveState(){
    let state = {}

    let i = 0
    for (let table in tables){
        i++;
        state["table"+i] = table;

    }

    // state["table1"] = table1;
    // state["table2"] = table2;
    // state["table3"] = table3;
    // state["table4"] = table4;

    tableHistory.push(state)
}

function updateTables(){
    state = tableHistory[historyIndex];

    for (let i = 1; i < 5; i++){
        tables["table"+i] = state["table"+i]
    }


    // table1 = state["table1"];
    // table2 = state["table2"];
    // table3 = state["table3"];
    // table4 = state["table4"];

    showOrder(tableClickEvent);
}

function undo(){
    historyIndex--;
    updateTables();
}

function redo(){
    historyIndex++;
    updateTables();
}