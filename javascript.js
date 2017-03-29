$(document).ready(function(){

//array of buttons
games=["Secret of Mana", "Final Fantasy", "The Legend of Zelda", "The Elder Scrolls", "Super Mario Bros", "Minecraft"];

//add existing buttons to buttonDump
$.each(games,function(game){
    $("#buttonDump").append("<button class='gameButton btn'>" + games[game] + "</button>");
});

//when "add game" button pressed, add button to buttonDump
$("#buttonAdd").on("click",function(event) {
    event.preventDefault();
    games.push($("#buttonText").val());
    $("#buttonDump").append("<button class='gameButton btn'>" + games[games.length-1] + "</button>");
    $("#buttonText").val("");
    console.log(games);
});

//on click create url and put it through an api call
$("#buttonDump").on("click",".gameButton" , function(){
    event.preventDefault();
    $("#gifDump").empty();
    var gameSelect = $(this).text();
    console.log(gameSelect);
    var apiURL= "http://api.giphy.com/v1/gifs/search?q=" + gameSelect + "&api_key=dc6zaTOxFJmzC&rating=pg&limit=10";

    //api call
    $.ajax({
        url: apiURL,
        method: "GET"
    }).done(function(gifs) {
        console.log(gifs);
        //pull specific information from json file and append to gifDump
        $.each(gifs.data, function(key, value) {
            var currentGif = '<img src="' + value.images.original_still.url + '" data-still="' + value.images.original_still.url + '" data-animate="' + value.images.original.url + '" data-state="still" class="gif">'
            $("#gifDump").append("<div class='gifDiv panel panel-dafault'><p class = 'rating'>Rating: " + value.rating + "</p>" + currentGif + "</div>");
        });
        //add start/stop functionality to gifs
        $(".gif").on("click", function() {
            console.log("gif clicked")
            var state = $(this).attr("data-state");
            if (state == "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                console.log(state);
            } else {
                $(this).attr("src", $(this).attr("data-still"))
                $(this).attr("data-state", "still");                   
                console.log(state);
            };
        });
    });
});






}); //end onready wrapper