//initiate matrix and DOM
world.init(25, 50, "random"); //rows , colu, ("random", "temp1")


//event listener - take ID from click and get OBJ info
//click world
world.clickWorld = function(e) {
    
    //get ID of DIV
    var clickCell = $(this).attr("id");
    var splitId = clickCell.split("c");
    var row = parseInt(splitId[0]-1);
    var col = parseInt(splitId[1]-1);

    //extract content from matrix
     var matrixContent = world.aMatrix[row][col];

     //get object matching string of matrix
     
     var clickedResourceObj;
     try {
        clickedResourceObj = elements.resource[matrixContent];
     }
     catch(err) {
         clickedResourceObj = null;
     }



     //-------------------

     //get currently slected item toolbar
     var selectedItem = toolbar.currentlySelected;

     var selectedObject;

     if(selectedItem != "") {
        try {
            selectedObject = elements.toolbox[selectedItem];
            }
        catch (err) {
            selectedObject = elements.resource[selectedItem];
        }
     }

}