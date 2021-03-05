// Functions

function showMenu() {
    $.getJSON("beverages.json", function(db) {

        $("order").hide()
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
    $("#items").hide();
    $("order").show();

    $("#orderList").html("");

    let table = tables[clickEvent.srcElement.id];
    let cart = table["cart"];

    let i = 0;
    for (let item in cart){
        beverage = cart[item]

        $("#orderList").append(`
                <li class="item-row">
                    <span style="position: relative;" draggable="false" ondragstart="drag(event)" id="` + "item" + i + `">${beverage.namn}</span>
                    <span style="position: relative; float: right;">${beverage.prisinklmoms} kr</span>
                </li>
            `);

        $("#item" + i).data("item", JSON.stringify(beverage));
        i++;
    }
};




// Main

showMenu();