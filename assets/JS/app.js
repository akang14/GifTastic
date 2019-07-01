$(document).ready(function () {
	var office = ["Michael Scott", "Dwight Schrute", "Jim Halpert"];

	function newButtons() {
		$("#office-buttons").empty();
		for (i = 0; i < office.length; i++) {
			$("#office-buttons").append("<button class='btn btn-success' office='" + office[i] + "'>" + office[i] + "</button>");
		}
	}

	newButtons();

	
	$("#add-office").on("click", function () {
		event.preventDefault();
		var offices = $("#office-input").val().trim();
		office.push(offices);
		renderButtons();
		return;
    });
    $("button").on("click", function() {
        var office = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          office + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .done(function(response) {
            var results = response.data;
  
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
  
              var rating = results[i].rating;
  
              var p = $("<p>").text("Rating: " + rating);
  
              var offImage = $("<img>");
              offImage.attr("src", results[i].images.fixed_height.url);
              
              offImage.attr("data-still", results[i].images.original_still.url);
              offImage.attr("data-animate", results[i].images.original.url);
              offImage.attr("data-state", "still");
              offImage.attr("class", "gif");
              gifDiv.prepend(p);
              gifDiv.prepend(offImage);
  
              $("#offices").append(gifDiv);
            }
          });
      });

	
	

	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");

		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}

		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}

	$(document).on("click", ".gif", changeState);

});