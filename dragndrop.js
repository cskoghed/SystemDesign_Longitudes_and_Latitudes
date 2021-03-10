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
                table1.cart.push(beverage);
                table1.amount[namn] = 1;
            }
            
            
            break;
            
        case "table2":
            if ((namn in table2.amount)){
                table2.amount[namn] +=1;
            }else{
                table2.cart.push(beverage);
                table2.amount[namn] = 1;
            }
            break;
            
        case "table3":
            if ((namn in table3.amount)){
                table3.amount[namn] +=1;
            }else{
                table3.cart.push(beverage);
                table3.amount[namn] = 1;
            }
            break;
            
        case "table4":
            if ((namn in table4.amount)){
                table4.amount[namn] +=1;
            }else{
                table4.cart.push(beverage);
                table4.amount[namn] = 1;
            }
            break;
            
        default:
            break;
    }
}

/*
window.onload = beverageList;
function beverageList() {
    var listDiv = document.getElementById('list');
    var ul=document.createElement('ul');
    
    listDiv.appendChild(ul);
    
    //List items
    for (var i = 0; i < Object.keys(DB1.sprits).length; ++i) {
        
        var li= document.createElement('li');
        li.setAttribute("ondragstart", "drag(event)");
        li.setAttribute("draggable", "true");
        li.setAttribute("id", i);
        
        //List properties of item
        var innerUl = document.createElement('ul');
        var name = document.createElement('li');
        var price = document.createElement('li');
        name.append(DB1.sprits[i].namn);   
        price.append(DB1.sprits[i].prisinklmoms);
        innerUl.appendChild(name); 
        innerUl.appendChild(price); 
        li.appendChild(innerUl);
        ul.appendChild(li);
        $("#" + i).data("item", JSON.stringify(DB1.sprits[i]));
    }
}
*/