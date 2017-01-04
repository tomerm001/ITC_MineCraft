
worldRand = {
    worldHeight: 0,
    worldWidth: 0,
    dirtHeightPercent: 0.3,
    dirtMinToMax: 0.3,
    treeDensity: 0.4,
    stoneDensity: 0.10,
    cloudDensity: 0.10,
    maxHeightDirt: 0,
    minHeightDirt: 0,
    maxHeightStone: 0,
    minHeightStone: 0
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

//function for planting tree 
worldRand.plantTree = function(positionX, treeType) {

    var tree = treeType;
    var treeHeight = tree.length;
    var treeWidth = tree[0].length;


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

//init for randomizer
worldRand.init = function() {
    worldRand.updateVars(); //update height and width
    worldRand.calculateMaxHeightDirt(); //calculate the maximum height for dirt 
    worldRand.calculateMaxHeightStone(); //calculate the maxium height for stone
    worldRand.insertDirt(); //insert dirt to world
    worldRand.plantRandomTrees(); //insert random 
    
}



