
worldRand = {
    worldHeight: 0,
    worldWidth: 0,
    dirtHeightPercent: 0.35,
    dirtMinToMax: 0.5,
    treeDensity: 0.30,
    stoneDensity: 0.30,
    cloudDensity: 0.10,
    maxHeightDirt: 0,
    minHeightDirt: 0,
    maxHeightStone: 0,
    minHeightStone: 0
}

//update worldRand values
worldRand.updateRandValues = function(){

    var valueTree = $("#rangeTree").val();
    var valueRock = $("#rangeRock").val();
    var valueGround = $("#rangeGround").val();
    var valuePeak = $("#rangePeak").val();

    worldRand.treeDensity = valueTree / 100;
    worldRand.stoneDensity = valueRock / 100;
    worldRand.dirtMinToMax = valuePeak / 100;
    
    if(valueGround > 85){ 
         worldRand.dirtHeightPercent = 85/100;
        }
    else{
        worldRand.dirtHeightPercent = valueGround/100;
    }
    
}


//update wolrdHeight and worldWidth
worldRand.updateVars = function() {
    worldRand.worldHeight = world.rows;
    worldRand.worldWidth = world.columns;

}

//caluclate the max height for dirt
worldRand.calculateMaxHeightDirt = function(){
    worldRand.maxHeightDirt = Math.ceil(worldRand.worldHeight * worldRand.dirtHeightPercent);
    worldRand.minHeightDirt = Math.ceil(worldRand.maxHeightDirt * worldRand.dirtMinToMax);
}

//calculate the max height for stone
worldRand.calculateMaxHeightStone = function(){
    worldRand.maxHeightStone = worldRand.calculateMaxHeightDirt - 1;
}

//function to generate random vertical dirt heigth
worldRand.randomDirtHeight = function(){
    var maxHeight = worldRand.maxHeightDirt;

    var rand = ((Math.random() * 10)) / 10;
    var currentHeight = Math.ceil(maxHeight * rand);

    return currentHeight;
}

//function update matrix with dirt
worldRand.insertDirt = function() {

    var indexBottom = worldRand.worldHeight - 1;
    var indexWidth = worldRand.worldWidth;

    //move left to right in world
    for(var j = 0; j < indexWidth; j++){

        //generate dirt vertically  
        var currentHeight = worldRand.randomDirtHeight();

        if(currentHeight <= worldRand.minHeightDirt){
            currentHeight = worldRand.minHeightDirt;
        }

        var indexCurrentHeight = indexBottom - currentHeight;

        for(var i = indexCurrentHeight; i <= indexBottom; i++){
            world.aMatrix[i][j] = 'dirt';
        }
    }
}

//function to find dirt
worldRand.findGround = function(positionX){

    //find ground 
    var groundIndex = 0;
    var groundFound = false;

    for(var i = 0; i < worldRand.worldHeight; i++ ){

        var contentMatrix = world.aMatrix[i][positionX]

        if((contentMatrix == 'dirt')&&(!groundFound)){
            groundIndex= i;
            groundFound = true;
        }
    }
    return groundIndex;
}

//function for planting tree 
worldRand.plantTree = function(positionX, treeType) {

    var tree = treeType;
    var treeHeight = tree.length;
    var treeWidth = tree[0].length;


    //find ground 
    var groundIndex = worldRand.findGround(positionX); //receive y index for dirt in world
    

    //plant tree
    var startPosition = groundIndex - 1;
    var topTree = groundIndex - treeHeight;
    var contentSide = Math.floor(treeWidth/2);

    //plant tree ontop of dirt
    var verticalPosTree = treeHeight-1; //index of bottom row of matrix

    for(var i = startPosition; i >= topTree; i--){

        var positionMatrix = positionX - contentSide;

        //x is x position in tree matrix
        for(var x = 0; x < treeWidth; x++){
        
            try{
                world.aMatrix[i][positionMatrix] = tree[verticalPosTree][x];
            }
            catch(err){
                console.log("Tree extends out of world");
            }

            positionMatrix++; //moving one position right in aMatrix 
        }

        verticalPosTree--; //going up a row in the tree matrix
    }



}

//randomize tree plantation
worldRand.plantRandomTrees = function(){

    var amountOfTreesMax = worldRand.worldWidth / 4;
    var actualAmount = amountOfTreesMax * worldRand.treeDensity;
    var averageDistance  = worldRand.worldWidth / actualAmount;

    var startPosition = Math.floor((Math.random() * 10) + 1);
    
    var treePosition = startPosition;
    var fits = true;
    
    while(fits){

        var amountOfTrees = elements.trees.length;
        var treeTypeN = Math.floor(Math.random() * (amountOfTrees))
        console.log(treeTypeN);

        worldRand.plantTree(treePosition, elements.trees[treeTypeN]);

        var positionMoveCalc = (averageDistance/2)  * Math.random();
        positionMoveCalc *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        treePosition = treePosition + Math.ceil(averageDistance + positionMoveCalc);

        if(treePosition > (worldRand.worldWidth-4)){
            fits = false;
        }

    }


}

//add gras above dirt
worldRand.plantGrass = function () {

    var indexWidth = worldRand.worldWidth;

    //move left to right in world
    for(var j = 0; j < indexWidth; j++){
        
        var heightToPlant = worldRand.findGround(j);

        world.aMatrix[heightToPlant][j] = 'grass';
        
    }



}

//Insert stone in specific location
worldRand.insertStone = function (positionX, stoneType) {


    var stone = stoneType;
    var stoneHeight = stone.length;
    var stoneWidth = stone[0].length;


    //find y position
    var centerLine = worldRand.minHeightDirt - 2;
    var indexCenterLine = worldRand.worldHeight - centerLine;


    //randomize y position
    indexCenterLine = indexCenterLine + ( (Math.floor(Math.random() * 2) + 1) * (Math.floor(Math.random()*2) == 1 ? 1 : -1))



    //insert stone
    var startPosition = indexCenterLine - 1;
    var topStone = centerLine - stoneHeight;
    var contentSide = Math.floor(stoneWidth/2);

    //plant tree ontop of dirt
    var verticalPosStone = stoneHeight-1; //index of bottom row of matrix

    for(var i = startPosition; i >= topStone; i--){

        var positionMatrix = positionX - contentSide;

        //x is x position in tree matrix
        for(var x = 0; x < stoneWidth; x++){
        
            try{
                world.aMatrix[i][positionMatrix] = stone[verticalPosStone][x];
            }
            catch(err){
                console.log("Stone extends out of world");
            }

            positionMatrix++; //moving one position right in aMatrix 
        }

        verticalPosStone--; //going up a row in the tree matrix
    }





}


//generate xcordinate to add stone
worldRand.insertRandomStone = function (density, objectToInsert) {

    var amountMax = worldRand.worldWidth / 4;
    var actualAmount = amountMax * density;
    var averageDistance  = worldRand.worldWidth / actualAmount;

    var startPosition = Math.floor((Math.random() * 10) + 1);
    
    var insertPosition = startPosition;
    var fits = true;
    
    while(fits){

        //randomize the selected stone
        var amountOfObjects = objectToInsert.length;
        var objectTypeN = Math.floor(Math.random() * (amountOfObjects))
        console.log(objectTypeN);

        worldRand.insertStone(insertPosition, objectToInsert[objectTypeN]); //chaneg to stone

        var positionMoveCalc = (averageDistance/2)  * Math.random();
        positionMoveCalc *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        insertPosition = insertPosition + Math.ceil(averageDistance + positionMoveCalc);

        if(insertPosition > (worldRand.worldWidth-4)){
            fits = false;
        }

    }



}

//init for randomizer
worldRand.init = function() {
    worldRand.updateVars(); //update height and width
    worldRand.calculateMaxHeightDirt(); //calculate the maximum height for dirt 
    worldRand.calculateMaxHeightStone(); //calculate the maxium height for stone
    worldRand.insertDirt(); //insert dirt to world
    worldRand.plantRandomTrees(); //insert random 
    worldRand.plantGrass(); //plant gras on top layer of dirt
    worldRand.insertRandomStone(worldRand.stoneDensity,elements.stone); //add rocks to ground
    
}



