// GENERATE DOM GRID

// ============= GLOBAL VARIABLES ==============================

    //object / namespace for world variables and functions
    var world = {};

    //rows and columns can be created dynamically based on user input
    world.rows = 0;
    world.columns = 0;

    //container in dom
    world.className =  "#container-world";


// =============  GENERATE WORLD FUNCTIONS ======================

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
                var value = "r" + (r+1) + "c" + (c+1);
                newCell.attr('id', value);

                //append cell to row
                newRow.append(newCell);
            }

            //append new row
            container.append(newRow);

        }

        //add event listener for click
        $(".cell").click(world.clickWorld);
    }

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


    }

    //adjust body size to fit all cells
    world.adjustBodySize = function () {
        var cellDiv = $(".cell").first();
        var widthDiv =  parseInt(cellDiv.css("width"));

        var pixelSize = parseInt(widthDiv * world.columns);

        //find width of html window - if html is smaller than pixelSize then use html
        var htmlSize = window.innerWidth; //no parseInt because the result is a number
        if(htmlSize < pixelSize) {
            pixelSize = htmlSize;
        }


        $("body").css("width", pixelSize);

    }

    //create the blank matrix, can create different worlds based on this template
    world.createMatrix = function(){
        
        world.aMatrix = []; //add aMatrix to world object
        
        for (var i = 0; i < world.rows; i++) {
            world.aMatrix.push([]);
            for (var j = 0; j < world.columns; j++) {
                world.aMatrix[i][j] = "";
            }
        }
    };

    //generate a basix world in the empty aMatrix
    world.createWorldOne = function(matrix){
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (i > (matrix.length*0.5)) {
                    matrix[i][j] = "dirt";
                }
                else if (i > matrix.length*0.4 && i <= matrix.length*0.5) {
                    matrix[i][j] = "grass";
                }
                else if (i > matrix.length*0.35 && j > matrix[i].length*0.1 && j < matrix[i].length*0.2){
                    matrix[i][j] = "rock";
                }
                else if (i > matrix.length*0.2 && i <= matrix.length*0.4 && j == matrix[i].length*0.6){
                    matrix[i][j] = "tree";
                }
                else if (i > matrix.length*0.2 && i <= matrix.length*0.3 && j > matrix[i].length*0.5 && j < matrix[i].length*0.6
                    || i > matrix.length*0.2 && i <= matrix.length*0.3 && j > matrix[i].length*0.6 && j < matrix[i].length*0.7){
                    matrix[i][j] = "leaf";
                }
                else {
                    matrix[i][j] = "sky";
                }
            }
        }
    };


// ==============   INIT FUNCTION FOR WORLD  ====================

    world.init = function(rows, columns, option){

        //update global variables
        world.rows = rows;
        world.columns = columns;

        //functions for matrix
        world.createMatrix(); //generate an empty matrix

        //populate world according to template or worldRandomizer
        switch(option){    
            case "temp1":   world.createWorldOne(world.aMatrix);  //populate empty matrix with a world 
                            break;
            case "random":  worldRand.init();
                            break;
        }

        //functions vor DOM
        world.generateGrid(world.aMatrix,world.className); //generate dom according to matrix size
        world.updateGrid(world.aMatrix,elements);       //populate dom with matrix content 

        world.adjustBodySize(); //adjust the body size

        
        
    }
