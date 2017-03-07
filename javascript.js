$(document).ready(function(){

//array of buttons
var games=["Secret of Mana", "Final Fantasy", "The Legend of Zelda", "The Elder Scrolls"];

//add existing buttons to buttonDump
$.each(games,function(game){
    $("#buttonDump").append("<button class='gameButton btn btn-success'>" + games[game] + "</button>");
})

//when add game button pressed, add button to buttonDump
$("#buttonAdd").on("click",function(event) {
    event.preventDefault();
    games.push($("#buttonText").val());
    $("#buttonDump").append("<button class='gameButton btn btn-success'>" + games[games.length-1] + "</button>");
    $("#buttonText").val("");
    console.log(games);
});

//api call
$(".gameButton").on("click", function(){
    event.preventDefault();
    $("#gifDump").empty();
    var gameSelect = $(this).text();
    console.log(gameSelect);
    var apiURL= "http://api.giphy.com/v1/gifs/search?q=" + gameSelect + "&api_key=dc6zaTOxFJmzC&rating=pg&limit=10";


    $.ajax({
        url: apiURL,
        method: "GET"
    }).done(function(gifs) {
        console.log(gifs);
        $.each(gifs.data, function(key, value) {
            console.log(value.images.original.url);
            console.log(value.images.original_still.url);
            console.log(value.rating)
        });
    });
});





}); //end onready wrapper