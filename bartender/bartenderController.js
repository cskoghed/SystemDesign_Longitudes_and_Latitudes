// Functions


// Show the all the available drinks
function showMenu() {
    $.getJSON("beverages.json", function(db) {

        $("#order").hide()
        $("#items").show();

        $("#bartender-items-list").html("");
        
        for(let i = 0; i < db.beverages.length; i++) {

            let beverage = db.beverages[i];
            // let beverageGroup = beverage.varugrupp.split(",")[0];
            let amountInStock = beverages_stockAmounts[beverage.namn];

            $("#bartender-items-list").append(`
                <li class="item-row">
                    <span style="position: relative;" draggable="true" ondragstart="drag(event)" id="` + "item" + i + `">${beverage.namn} x${amountInStock}</span>
                    <span style="position: relative; float: right;">${beverage.prisinklmoms} kr</span>
                </li>
            `);
            $("#item" + i).data("item", JSON.stringify(beverage));
        }
    });
};

// Show the order for a table, which is found using the clickEvent
function showOrder(clickEvent){
    tableClickEvent = clickEvent;
    tableName = clickEvent.srcElement.id;

    $("#items").hide();
    $("#order").show();

    $("#orderList").html("");

    
    // console.log(tableName)
    var table = tables[tableName];
    let cart = table["cart"];

    let i = 0;
    for (let item in cart){
        beverage = cart[item];
        let name = beverage.namn;
        
        $("#orderList").append(`
                <li class="item-row">
                    <textarea class="amtBox" rows="1" id="` + "amt" + i + `">${table.amount[name]}</textarea>
                    <span style="position: relative;" draggable="false" ondragstart="drag(event)" id="` + "item" + i + `">${name}</span>
                    <span style="position: relative; float: right;">${beverage.prisinklmoms} kr</span>
                </li>
            `);

        $("#amt" + i).change(function() {
            let val = parseInt(this.value)


            table.amount[name] = val;
            
            updateSum(table["cart"]);

            saveState();
        });

        $("#amt" + i).keypress(function(e) {
            var a = [];
            var k = e.which;
        
            for (i = 48; i < 58; i++)
                a.push(i);
        
            if (!(a.indexOf(k)>=0))
                e.preventDefault();
        });

        $("#item" + i).data("item", JSON.stringify(beverage));
        i++;
    };

    updateSum(cart);

    
};

// Show total sum of an order
function updateSum(cart){
    sum = totalOrderSum(cart);
    $("#orderSum").text(sum + " kr");
};

// Erases current order
function pay(){
    let table = tables[tableName];
    table["cart"] = [];
    table["amount"] = {};

    saveState();
    showOrder(tableClickEvent);
}

// Calculate total sum of an order
function totalOrderSum() {
    let table = tables[tableName];
    let cart = table["cart"];

    let sum = 0;
    for (let item in cart){
        beverage = cart[item];
        namn = beverage.namn
        
        sum += table["amount"][namn] * parseInt(beverage.prisinklmoms);
    }

    return sum;
}

function logOut() {
    window.location.href = "../index.html"
}

function callGuards() {
    $("#callGuardsBtn").css("background-color", "#a30101");
    alert(dict[language]['callGuardsMessage']);

    window.setTimeout(function() {
        $("#callGuardsBtn").css("background-color", "black");
    }, 10000);
}


// Main

$(window).ready(function() {
    showMenu();
});