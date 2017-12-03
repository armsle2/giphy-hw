//create an array of movies to put into api search
var movies = ["Star Wars", "Collateral", "300", "The Matrix"];
var giphyCount = 0;
var storageArray = [];


//create function that populates movie buttons to HTML
function displayButtons(){
		$("#giphy-buttons").empty();
	//put each index of array into button
		for (var i = 0; i < movies.length; i++){
		// console.log(local);

		//create button variable
		var movieButton = $("<button class='btn btn-success'>");
		//create id attribute for button variable and set value to array loop
		movieButton.attr("id", movies[i]);
		movieButton.addClass("giphy-button");
		movieButton.text(movies[i]);
		//append mutated button variable to #giphy-buttons id
		$("#giphy-buttons").append(movieButton);
		//on click of #giphy-button alert giphy name for test
		
	}

}

function storage(){
		console.log(storedData);

		//put each index of array into button
		for (var i = 0; i < storageArray.length; i++){
		// console.log(local);

		//create button variable
		var movieButton = $("<button class='btn btn-success'>");
		//create id attribute for button variable and set value to array loop
		movieButton.attr("id", movies[i]);
		movieButton.addClass("giphy-button");
		movieButton.text(storageArray[i]);
		//append mutated button variable to #giphy-buttons id
		$("#giphy-buttons").append(movieButton);
		//on click of #giphy-button alert giphy name for test
	}
	
}
$(document).ready(function(){


displayButtons();
$(document).on("click", ".giphy-button", function(){
	// alert($(this).attr("id"))
	//create variable that has movie name in it
		var movie = $(this).attr("id");
		//create query url with giphy api link and plug in movie variable in appropriate area
		var queryUrl = "http://api.giphy.com/v1/gifs/search?q=movie+" + movie +"&api_key=OHnV2yUg6Vy5DIJmXdsTQU2yV09bSXvC";

		$.ajax({
			url: queryUrl,
			method: "GET"
		}).done(function(response){
			console.log(response);
			$("#giphys").text("");
			for (var i = 0; i < response.data.length; i++){
				var gifs = $("<img>");
				var imagePlay = response.data[i].images.original.url;
				var imageStill = response.data[i].images.original_still.url;
				gifs.attr("src", imageStill);
				gifs.attr("data-still", imageStill);
				gifs.attr("data-play", imagePlay);
				gifs.attr("alt", "movie image");
				$("#giphys").append(gifs);

				}

				$("img").on("click", function(){
						var play = $(this).attr("data-play");
						var still = $(this).attr("data-still");
						console.log(play);
						if ($(this).attr("src") === still){
							$(this).attr("src", play)
						}else {
							$(this).attr("src", still)
						}
						// else {
						// 	gifs.attr("src", imageStill);
						// }

					});
				
			})





	});
$("#giphy-submit").on("click", function(event){
	event.preventDefault();
	var userInput = $("#giphy-input").val().trim();

	storageArray.push(userInput);
	// console.log(storageArray);
	localStorage.setItem("giphy", JSON.stringify(storageArray));
	$("#giphy-input").val("");
	var storedData = JSON.parse(localStorage.getItem("giphy"));
	console.log(storedData);
	$("#user-giphy-buttons").empty();
	for (var i = 0; i < storedData.length; i++){
		// console.log(local);

		//create button variable
		var movieButton = $("<button class='btn btn-success'>");
		//create id attribute for button variable and set value to array loop
		movieButton.attr("id", storedData[i]);
		movieButton.addClass("giphy-button");
		movieButton.text(storedData[i]);
		//append mutated button variable to #giphy-buttons id
		$("#user-giphy-buttons").append(movieButton);
		//on click of #giphy-button alert giphy name for test
	}

})
	
var storedData = JSON.parse(localStorage.getItem("giphy"));
	// console.log(storedData);
	if (storedData === null){
	}else if (storageArray.length === 0){
		for (var i = 0; i < storedData.length; i++){
	storageArray.push(storedData[i]);
		}
	console.log(storageArray)
	}
	$("#user-giphy-buttons").empty();
	for (var i = 0; i < storedData.length; i++){
		// console.log(local);

		//create button variable
		var movieButton = $("<button class='btn btn-success'>");
		//create id attribute for button variable and set value to array loop
		movieButton.attr("id", storedData[i]);
		movieButton.addClass("giphy-button");
		movieButton.text(storedData[i]);
		//append mutated button variable to #giphy-buttons id
		$("#user-giphy-buttons").append(movieButton);
		//on click of #giphy-button alert giphy name for test
	}



});