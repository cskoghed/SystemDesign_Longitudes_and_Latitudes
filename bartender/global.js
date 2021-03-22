let globalOrder = [];
var tableName = "";
var tableClickEvent;
var beverages_stockAmounts = {};

$(window).ready(function() {
    $.getJSON("beverages.json", function(db) {
        for(let i = 0; i < db.beverages.length; i++) {
            let beverageName = db.beverages[i].namn;
            beverages_stockAmounts[beverageName] = 100;
        };
    });
});