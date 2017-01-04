// GENERATE DOM GRID

//object / namespace for world variables and functions

var world = {};

//generate empty grid based on matrix size
world.generateGrid = function (matrix, parrentID){

    //check length and width of martrix
    var amountOfRows = matrix.length;
    var amountOfCollumns = matrix[0].length;

    //get the dom container
    var container = $(parrentID);

    //generate rows and cells
    for(var r = 0; r < amountOfRows; r++){

        var newRow = $("<div></div>"); // create element
        newRow.addClass("row");

        //add unique row id
        var value = "r" + (r+1);
        newRow.attr('id', value);

        for(var c = 0; c < amountOfCollumns; c++){

            var newCell = $("<div></div>"); // create element
            newCell.addClass("cell"); //add class 
            
            //add unique id for cell
            var value = "r" + (r+1) + " c" + (c+1);
            newCell.attr('id', value);

            //append cell to row
            newRow.append(newCell);
        }

        //append new row
        container.append(newRow);

    }



};

//update grid (DOM) from Matrix
world.updateGrid = function (matrix, elements){
    
    //cheack length and width of martrix
    var amountOfRows = matrix.length;
    var amountOfCollumns = matrix[0].length;



    for (var r = 0; r < amountOfRows; r++){

        for(var c = 0; c < amountOfCollumns; c++){
             
            var currentElement = matrix[r][c];  //get matrix content
            var divId = "#r" + (r+1) + "c" + (c+1);

            //if cell is empty, make src empty
            if(currentElement == undefined){
                $(divId).css("background-image", "");
            }
            //if not empty search object
            else {
                try{
                    var source = elements.resource[currentElement].src; //get resource url for image
                    $(divId).css("background-image", "url(" + source + ")");
                }
                catch (err) {
                    $(divId).css("background-image", '');
                    console.log("Error, resource not found." + err.message);
                }
            }
        }
    }


};



// ==================


var aMatrix = [];
var rows = 2;
var columns = 2;

for (var i = 0; i < rows; i++){
    aMatrix.push([])
    for (var j = 0; j < columns; j++){
        if (i>10) {
            aMatrix[i][j] = "dirt";
        }
    }
}

[
    [00,01,02],
    [10,11,12],
    [20,21,22]
]

var aMatrix = [
    ["dirt","dirt","dirt"],
    ["leaf","leaf","leaf"],
    ["rock","rock","rock"]
];



var className =  "#container-world";

world.generateGrid(aMatrix,className);
world.updateGrid(aMatrix,elements);