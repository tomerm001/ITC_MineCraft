//GENERATE TOOLBAR

//toolbar namespace / object
var toolbar = {};

toolbar.currentlySelected = "";

//generate toolbox container
toolbar.generateToolbox = function() {

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
        $("#container-toolbar").append(toolDiv);

        // var textDiv = $("<div/>");
        // textDiv.addClass("text");
        // textDiv.text(tools[t]);
        // $("#container-toolbar").append(textDiv);
    }


}



//generate inventory container
toolbar.generateInventory = function() {
    
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
        $("#container-toolbar").append(resourceDiv);

        // var textDiv = $("<div/>");
        // textDiv.addClass("text");
        // textDiv.text(resources[r]);
        // $("#container-toolbar").append(textDiv);
    }
    
    
}



//inventory
toolbar.currentInventory = {
    dirt: 0,
    grass: 0,
    leaf: 0,
    rock: 0,
    tree: 0
}



toolbar.init = function() {
    toolbar.generateToolbox();
    toolbar.generateInventory();
}

toolbar.init();