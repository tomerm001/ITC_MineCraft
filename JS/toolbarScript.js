//GENERATE TOOLBAR

//toolbar namespace / object
var toolbar = {};

toolbar.currentlySelected = "dirt";
toolbar.currentInventory = {};


//function to update currently slected item in the toolbar
toolbar.updateCurrentlySelected = function () {

    var idClickedElement = $(this).attr("id");   
    toolbar.currentlySelected = idClickedElement;
    console.log(idClickedElement);
}



//generate toolbox container
toolbar.generateToolbox = function() {

    // //main tool div
    // var tMain = $("<div/>");
    // tMain.attr("id", "tMain");

    //get array of tools
    var tools = Object.keys(elements.toolbox);
    console.log(tools);

    //generate toolbox cells
    for(var t = 0; t < tools.length; t++) {
        var toolDiv = $("<div/>");
        toolDiv.attr('id', tools[t]); 
        toolDiv.addClass("tool");
        toolDiv.css({
            backgroundImage: "url(" + elements.toolbox[tools[t]].src + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover"
        });

        //add event listener
        toolDiv.click(toolbar.updateCurrentlySelected);

        // $("#tMain").append(toolDiv);
        $("#container-toolbar").append(toolDiv);

    }
    
   

}


//change background color onclick,toggle class
toolbar.selectedItem = function() {
    $(".tool").click(function() {
        $('div').removeClass("selected");
        $(this).addClass("selected"); 

    });

    $(".resource").click(function() {
        $('div').removeClass("selected");
        $(this).addClass("selected"); 

    });
}


//generate inventory container
toolbar.generateInventory = function() {
    
    // //main resource div
    // var rMain = $("<div/>");
    // rMain.attr("id", "rMain");

    //get array of resources
    var resources = Object.keys(elements.resource);
    console.log(resources);

    //generate resource cells
    for(var r = 0; r < resources.length; r++) {
        var resourceDiv = $("<div/>");
        resourceDiv.attr('id', resources[r]); 
        resourceDiv.addClass("resource");
        resourceDiv.css({
            backgroundImage:  "url(" + elements.resource[resources[r]].src + ")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover"
        });

        //add event listener
        resourceDiv.click(toolbar.updateCurrentlySelected);

        // $("#rMain").append(resourceDiv);
        $("#container-toolbar").append(resourceDiv);

    }
     
       
}


//generate toolbar currentInvetoryObject
toolbar.generateInventoryObject = function () {

    var arrayOfResources = Object.keys(elements.resource);

    var amountOfReources =arrayOfResources.length;

    for (var i = 0; i < amountOfReources; i++) {
        toolbar.currentInventory[arrayOfResources[i]] = 0;
        $("#" + arrayOfResources[i] + "").text("0");

    }
    
}


//new game button
toolbar.newGameBtn = function() {

    // var btnDiv = $("<div/>");
    // btnDiv.attr("id", "toolbarBtn");

    var btn = $("<button/>");
    btn.attr("id", "newGame");
    btn.text("New Game");
    // $("#toolbarBtn").append(btn);
    $("#container-toolbar").append(btn);


    $("#newGame").click(function () {

            //initiate matrix and DOM
            world.init(25, 50, "random"); //rows , colu, ("random", "temp1")

            //initiate toolbar
            toolbar.init();

    });

}


//  ============ INIT FUNCTION FOR TOOLBAR ===================

toolbar.init = function() {
    $("#container-toolbar").html("");
    toolbar.generateToolbox(); //generate toolBox DOM
    toolbar.generateInventory(); //generate Inentory DOM
    toolbar.generateInventoryObject(); //incllude all resources in inventoryObject
    toolbar.selectedItem(); //toggles class onclick for css properties
    toolbar.newGameBtn(); //loads new game btn on toolbar
}

