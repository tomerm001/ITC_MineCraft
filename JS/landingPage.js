var landingPage = {};


//show background image
$(document).ready(function() {
    $("#background-overlay").show();
    $('#container-world').hide();
    $('#container-toolbar').hide();
});


//new game button
landingPage.newGameButton = function() {
    var newGame = $("<button/>");
    newGame.addClass("new-game-button");
    newGame.text("New Game");
    $("body").append(newGame);

    //when game button is clicked, fade out image, show world and toolbar
    $("#background-overlay").on('click', function () {
        $('#wrapper_index').fadeOut();
        $('#container-world').show();
        $('#container-toolbar').show();
});

}