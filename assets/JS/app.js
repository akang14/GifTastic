var office = ["Michael Scott","Jim Halpert","Pam Beesly","Dwight Schrute"];

function createButton() {

    $("#addButton").empty();

    for (var i = 0; i < office.length; i++) {

        var charButton = $("<button>");
        charButton.addClass('char-button');
        charButton.addClass('btn btn-success');
        charButton.attr('data-name', office[i]);
        charButton.text(office[i]);
        var emptySpace = " ";
        $('#addButton').append(charButton);
        $('#addButton').append(emptySpace);
    }
}

function charInfo() {
    var input = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xjJ6RyjcZeCTLqtvfAjiuwaKpGr5HO9O&q=" + input + "&limit=10&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#gifHolder").empty();
        var charResults = response.data;
        for (i = 0; i < 10; i++) {
            var charDiv = $("<div class='char'>");

            var rating = charResults[i].rating;
            var ratingHolder = $("<h6>").text("Rating: " + rating);
            var gifStill = charResults[i].images.fixed_height_small_still.url;
            var gifAnimate = charResults[i].images.fixed_height_small.url;

            var gifHolder = $("<img>").attr("src", gifStill);
            gifHolder.attr("data-still", gifStill);
            gifHolder.attr("data-animate", gifAnimate);
            gifHolder.attr("data-state", "still");
            gifHolder.addClass("gif");

            charDiv.append(ratingHolder);
            charDiv.append(gifHolder);

            $("#gifHolder").append(charDiv);
        };
    });
};

$('#addChar').on("click", function () {
    event.preventDefault();

    var charInput = $('#charInput').val().trim();

    if (charInput === "") {
        return;
    }
    office.push(charInput);
    createButton();
});

$(document).on("click", ".char-button", charInfo);

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

createButton();