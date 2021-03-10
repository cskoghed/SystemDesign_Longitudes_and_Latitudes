// Functions

function showMenu() {
    $.getJSON("beverages.json", function(db) {

        $("#order").hide()
        $("#items").show();

        $("#bartender-items-list").html("");
        
        for(let i = 0; i < db.beverages.length; i++) {

            let beverage = db.beverages[i];
            let beverageGroup = beverage.varugrupp.split(",")[0];

            $("#bartender-items-list").append(`
                <li class="item-row">
                    <span style="position: relative;" draggable="true" ondragstart="drag(event)" id="` + "item" + i + `">${beverage.namn}</span>
                    <span style="position: relative; float: right;">${beverage.prisinklmoms} kr</span>
                </li>
            `);
            $("#item" + i).data("item", JSON.stringify(beverage));
        }
    });
};

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
            // if (val > 0){
            //     table.amount[name] = val;
            // } else {
            //     delete table.amount[name];
            //     table.cart.splice(i, 1);
            // }
            table.amount[name] = val;
            
            updateSum(table["cart"]);
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

function updateSum(cart){
    sum = totalOrderSum(cart);
    $("#orderSum").text(sum + " kr");
};

function pay(){
    if (tableName == "table1"){
        table1["cart"] = [];
        table1["amount"] = {};
    }else if (tableName == "table2"){
        table2["cart"] = [];
        table2["amount"] = {};
    }else if (tableName == "table3"){
        table3["cart"] = [];
        table3["amount"] = {};
    } else {
        table4["cart"] = [];
        table4["amount"] = {};
    }

    // table = tables["tableName"];
    // table["cart"] = [];
    // table["amount"] = {};
    showOrder(tableClickEvent);

}


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



// Main

showMenu();