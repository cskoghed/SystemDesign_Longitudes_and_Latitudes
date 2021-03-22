let tableHistory = [];
let historyIndex = 0;

// Save what the table orders look like in tableHistory
function saveState(){
    let state = {}
    state['beverages_stockAmounts'] = beverages_stockAmounts;

    let i = 0
    for (let table in tables){
        i++;
        state["table"+i] = table;

    }

    tableHistory.push(state)
}

// Load table orders from tableHistory
function updateTables(){
    state = tableHistory[historyIndex];
    beverages_stockAmounts = state['beverages_stockAmounts'];

    for (let i = 1; i < 5; i++){
        tables["table"+i] = state["table"+i]
    }

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