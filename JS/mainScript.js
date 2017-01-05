//initiate matrix and DOM
world.init(25, 50, "random"); //rows , colu, ("random", "temp1")


//check the logic of inputs
world.processClick = function (currentSelected, clickedObj, rowIndex, colIndex) {

    switch (currentSelected.type) {

        case "tool":

            if (clickedObj == null) { 
                return null;
            }
            else {
                
                if(clickedObj.interaction == currentSelected.interaction){
                    return 'remove';
                }
                else {
                    return null;
                }
            }

            break;

    case "resource":

            if(currentSelected == null){
                return 'add';
            }
            else{
                return null;
            }

            break;

    default:
            return null;
            break;
    }
}

//update inventory (action 'add' or 'remove')
world.updateInventory = function (item, action){

    //get current inventory level of item
    var amountItem = toolbar.currentInventory["item"];

    switch(action){

        case 'add':
            toolbar.currentInventory["item"] = amountItem + 1;
            break;

        case 'remove':

            if(amountItem == 0){
                return;
            }
            else{
                toolbar.currentInventory["item"] = amountItem - 1;
            }
            break;
    }


}


//function execute
world.executeClick = function (action, rowIndex, colIndex, selectedItem) {

    //get indexes for matric
    var r = rowIndex;
    var c = colIndex ;

    var contentMatrix = "";


    switch(action){

        //in case need to remove element from matrix and add to inventory
        case 'remove':

            //change matrix to empty
            contentMatrix = world.aMatrix[r][c];
            world.aMatrix[r][c] = "";

            //update inventory (add to inventory)
            world.updateInventory(contentMatrix, 'add');

            break;



        //in case need to add from inventory to matrix
        case 'add':
            //update inventory (remove to inventory)
            world.updateInventory(contentMatrix, 'remove');

            //add item to matrix
            world.aMatrix[r][c] = selectedItem;

            break;

    }


}
