//Define global variables

//Declare array to hold strings inputted
var topics = ["Michael Scott","Jim Halpert","Pam Beesly","Dwight Schrute"];

//Create a function to dynamically add buttons to the html
function createButton() {

    //Clear the div we are adding buttons to so no multiples are added
    $("#addButton").empty();

    //Generate buttons for each sport in the array
    for (var i = 0; i < topics.length; i++) {

        var sportButton = $("<button>");
        sportButton.addClass('sport-button');
        sportButton.addClass('btn btn-success');
        sportButton.attr('data-name', topics[i]);
        sportButton.text(topics[i]);
        var emptySpace = " ";
        $('#addButton').append(sportButton);
        $('#addButton').append(emptySpace);
    }
}

//Create a function to get the GIF info for the sport
function sportInfo() {
    var input = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xjJ6RyjcZeCTLqtvfAjiuwaKpGr5HO9O&q=" + input + "&limit=10&lang=en";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gifHolder").empty();
        var sportResults = response.data;
        //For loop to retrieve 10 responses
        for (i = 0; i < 10; i++) {
            //Create a div to hold the data retrieved from the API
            var sportDiv = $("<div class='sport'>");

            //Create a variable to hold each data wanted
            var rating = sportResults[i].rating;
            var ratingHolder = $("<h6>").text("Rating: " + rating);

            //Variables for still images and gifs
            var gifStill = sportResults[i].images.fixed_height_small_still.url;
            var gifAnimate = sportResults[i].images.fixed_height_small.url;
            
            //Variable to hold gif
            var gifHolder = $("<img>").attr("src", gifStill);
            gifHolder.attr("data-still", gifStill);
            gifHolder.attr("data-animate", gifAnimate);
            //Add attribute that determines which link to use in function
            gifHolder.attr("data-state", "still");
            gifHolder.addClass("gif");

            sportDiv.append(ratingHolder);
            sportDiv.append(gifHolder);

            $("#gifHolder").append(sportDiv);
        };
    });
};

//Adding buttons to the array and html
$('#addSport').on("click", function () {
    //Prevent the page from reloading
    event.preventDefault();

    //Take input from form and push to array
    var sportInput = $('#sportInput').val().trim();
    //Prevent blank button
    if (sportInput === "") {
        return;
    }
    topics.push(sportInput);

    //Call function to create button
    createButton();
});

//Retrieve data from Giphy
$(document).on("click", ".sport-button", sportInfo);

//Create on click to start and stop gif
$(document).on("click", ".gif", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

//Call function on page load
createButton();