$(document).ready(function(){

	var chars = ["Michael Scott", "Jim Halpert"];

	function showImgs(){

			$("#office-img").empty();
			var input = $(this).attr("data-name");
			var limit = 10;
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=xjJ6RyjcZeCTLqtvfAjiuwaKpGr5HO9O&limit=10";;   

			$.ajax({
					url: queryURL, 
					method: "GET"
			}).done(function(response) {

					for(var i = 0; i < limit; i++) {    

							var displayDiv = $("<div>");
							displayDiv.addClass("holder");
					
							var img = $("<img>");
							img.attr("src", response.data[i].images.original_still.url);
							img.attr("data-still", response.data[i].images.original_still.url);
							img.attr("data-animate", response.data[i].images.original.url);
							img.attr("data-state", "still");
							img.attr("class", "gif");
							displayDiv.prepend(img);

							var rating = response.data[i].rating;
							console.log(chars);
							var pRating = $("<p>").text("Rating: " + rating);
							displayDiv.prepend(pRating)

							$("#office-img").prepend(displayDiv);
					}
			});
	}

	function renderButtons(){ 

			$("#office-buttons").empty();

			for (var i = 0; i < chars.length; i++){

					var newButton = $("<button>") 
					newButton.attr("class", "btn btn-default");
					newButton.attr("id", "input")  
					newButton.attr("data-name", chars[i]); 
					newButton.text(chars[i]); 
					$("#office-buttons").append(newButton); 
			}
	}

	function imgState() {          

			var state = $(this).attr("data-state");
			var animateImage = $(this).attr("data-animate");
			var stillImage = $(this).attr("data-still");

			if(state == "still") {
					$(this).attr("src", animateImage);
					$(this).attr("data-state", "animate");
			}

			else if(state == "animate") {
					$(this).attr("src", stillImage);
					$(this).attr("data-state", "still");
			}   
	}

	$("#officeadd").on("click", function(){

			var input = $("#user-input").val().trim();
			form.reset();
			chars.push(input);
							
			renderButtons();

			return false;
	})

	renderButtons();

	$(document).on("click", "#input", showImgs);
	$(document).on("click", ".gif", imgState);
});