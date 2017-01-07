var landingPage = {};


//show background image
$(document).ready(function() {

    //initiate background
    $("#background-overlay").show();


    //when game button is clicked, fade out image, show world and toolbar
    $(".new-game-btn").click(function () {

        //fade out background
        $("#background-overlay").fadeOut("slow");

        //update world Values
        worldRand.updateRandValues();

        //initiate matrix and DOM
        world.init(25, 50, "random"); //rows , colu, ("random", "temp1")

        //initiate toolbar
        toolbar.init();
    });
});

