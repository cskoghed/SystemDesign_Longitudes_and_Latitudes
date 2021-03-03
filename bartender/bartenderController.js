function updateItemsList(db) {

    $("#bartender-items-list").html("");
    
    console.log(db.beverages.length)
    for(let i = 0; i < db.beverages.length; i++) {

        let beverage = db.beverages[i];
        let beverageGroup = beverage.varugrupp.split(",")[0];

        $("#bartender-items-list").append(`
            <li class="item-row">
                <span style="position: relative;" draggable="true">${beverage.namn}</span>
                <span style="position: relative; float: right;">${beverage.prisinklmoms} kr</span>
            </li>
        `)
        
    }
};

function showTotalCost(){
    $("#bartender-items-list").hide();
};


$.getJSON("beverages.json", function(json) {
    updateItemsList(json);

});