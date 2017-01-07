

//check the logic of inputs
world.processClick = function (currentSelected, clickedObj, rowIndex, colIndex) {

    switch (currentSelected.type) {

        //if the current selected item in toolbar is a tool
        case "tool":

            if (clickedObj == null) { 
                return null;
            }
            else {
                
                //check if the tool is compatible to interact with the element that was clicked
                if(clickedObj.interaction == currentSelected.interaction){

                    //if it is, save remove to it can be removed from world
                    return 'remove';
                }
                else {
                    return null;
                }
            }

            break;

    // if the currenly selected item in the toolbar is a resource
    case "resource":

            //if the space in the div is not a resourse (empty) and the currently selected item is a resource than add to world
            if((currentSelected != null)&&(clickedObj == undefined)){
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
    var amountItem = toolbar.currentInventory[item];

    switch(action){

        case 'add':
            toolbar.currentInventory[item] = amountItem + 1;
            break;

        case 'remove':

            if(amountItem == 0){
                return 'empty';
            }
            else{
                toolbar.currentInventory[item] = amountItem - 1;
            }
            break;
    }
    $("#" + item + "").text(toolbar.currentInventory[item]);
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
            var inventoryLevel = world.updateInventory(selectedItem, 'remove');


            if(inventoryLevel != 'empty'){
                //add item to matrix
                world.aMatrix[r][c] = selectedItem;
            }
            break;

    }


}

//event listener - take ID from click and get OBJ info
//click world
world.clickWorld = function() {
    
    //get ID of DIV
    var clickCell = $(this).attr("id");
    var splitId = clickCell.split("c");
    var row = parseInt(parseInt(splitId[0].replace("r",""))-1);
    var col = parseInt(parseInt(splitId[1])-1);
    

    //extract content from matrix
    var matrixContent = world.aMatrix[row][col];

    //get object matching string of matrix
    var clickedResourceObj;
    clickedResourceObj = elements.resource[matrixContent];
    
    //-------------------

     //get currently slected item toolbar
     var selectedItem = toolbar.currentlySelected;

     var selectedObject;

     if(selectedItem != "") {
        
        //try and find object in toolbox
        selectedObject = elements.toolbox[selectedItem];
        
        //if not found in toolbox search in resources
        if(selectedObject == undefined){
            selectedObject = elements.resource[selectedItem];
        }
     }


     //call functions
     var processResult = world.processClick(selectedObject, clickedResourceObj,row, col);

     //if process is null exit event handler
     if(processResult == null){
         return;
     }
     
     //adjust matrix and and inventory
     world.executeClick(processResult, row, col, selectedItem);

     //refresh matrix
     world.updateGrid(world.aMatrix,elements);       //populate dom with matrix content 

     

}




// //TOOLBAR NEW GAME BUTTON
// world.newGame = function() {

//     $("#newGame").click(function () {

//             //initiate matrix and DOM
//             world.init(25, 50, "random"); //rows , colu, ("random", "temp1")

//             //initiate toolbar
//             toolbar.init();

//     });

// }

