//create an array of movies to put into api search
var movies = ["Heat", "Collateral", "300", "The Matrix"];
//create function that populates movie buttons to HTML
function displayButtons(){
	//put each index of array into button
		for (var i = 0; i < movies.length; i++){

		//create button variable
		var movieButton = $("<button class='btn btn-success'>");
		//create id attribute for button variable and set value to array loop
		movieButton.attr("id", movies[i]);
		movieButton.text(movies[i]);
		//append mutated button variable to #giphy-buttons id
		$("#giphy-buttons").append(movieButton);

		//on click of #giphy-button alert giphy name for test
	}

}
$(document).ready(function(){


displayButtons();
$(document).on("click", "button", function(){
	// alert($(this).attr("id"))
	//create variable that has movie name in it
		var movie = $(this).attr("id");
		//create query url with giphy api link and plug in movie variable in appropriate area
		var queryUrl = "http://api.giphy.com/v1/gifs/search?q=the+movie+collateral&api_key=OHnV2yUg6Vy5DIJmXdsTQU2yV09bSXvC";

		$.ajax({
			url: queryUrl,
			method: "GET"
		}).done(function(response){
			console.log(response);
			var img = $("<img>");
			var imagePlay = response.data[1].images.original.url;
			var imageStill = response.data[1].images.original_still.url;
			img.attr("src", imageStill);
			img.attr("data-still", imageStill);
			img.attr("data-play", imagePlay);
			img.attr("alt", "movie image");
			$("#giphys").prepend(img);

			$("img").on("click", function(){
					if ($(this).attr("src") === imageStill){
						img.attr("src", imagePlay);
					}else {
						img.attr("src", imageStill);
					}

				});
			})





	});




});