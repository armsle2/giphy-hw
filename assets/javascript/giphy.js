//create an array of movies from developer to put into api search
var movies = ["Star Wars", "Collateral", "300", "The Matrix"];
//array for movies that user searches
var userMovies = [];


//create function that populates developer movie buttons to HTML
function displayButtons(){
		//clear out div so that appended array doesn't double
		$("#giphy-buttons").empty();
	//put each index of array into a button
	//create loop for developer movie array
		for (var i = 0; i < movies.length; i++){
		// console.log(local);

		//create button variable
		var movieButton = $("<button class='btn btn-success'>");
		//create id attribute for button variable and set value to developer movie array loop
		movieButton.attr("id", movies[i]);
		//add class unique class to identify giphy buttons
		movieButton.addClass("giphy-button");
		//write names of each developer movie into button text
		movieButton.text(movies[i]);
		//append mutated button variable to #giphy-buttons id
		$("#giphy-buttons").append(movieButton);
		
	}

	
}
$(document).ready(function(){

//run displayButtons function to display movies chosen by developer
displayButtons();
$(document).on("click", ".giphy-button", function(){
	// alert($(this).attr("id"))
	//create variable that has movie name in it
		var movie = $(this).attr("id");
		//create query url with giphy api link and plug in movie variable in appropriate area
		var queryUrl = "http://api.giphy.com/v1/gifs/search?q=movie+" + movie +"&api_key=OHnV2yUg6Vy5DIJmXdsTQU2yV09bSXvC";
	//build ajax function
		$.ajax({
			url: queryUrl,
			method: "GET"
		}).done(function(response){
			console.log(response);
			//clear giphys id so that previous set is removed before new set is appended
			$("#giphys").text("");
			//create for loop that spans length of giphys returned
			for (var i = 0; i < response.data.length; i++){
				//create variable to hold image tag
				var gifs = $("<img>");
				//create variable that loops through image playing url
				var imagePlay = response.data[i].images.original.url;
				//create variable that loops through image still url
				var imageStill = response.data[i].images.original_still.url;
				//add src attribute to image tag and set value to image still url
				gifs.attr("src", imageStill);
				//add data-still attribute to image tag and set value to image still url
				gifs.attr("data-still", imageStill);
				//add data-play attribute to image tag and set value to image play url
				gifs.attr("data-play", imagePlay);
				//add alt attribute to image tag in case picture doesn't load
				gifs.attr("alt", "movie image");
				//append all search image results to giphys id
				$("#giphys").append(gifs);

				}
				//create click handler for stop and play functionality
				$("img").on("click", function(){
					//set variable equal to data-play value of giphy clicked
						var play = $(this).attr("data-play");
					//set variable equal to data-still value of giphy clicked
						var still = $(this).attr("data-still");
						console.log(play);
						//create if/else statement based on current value of src
						if ($(this).attr("src") === still){
							$(this).attr("src", play)
						}else {
							$(this).attr("src", still)
						}
				
					});
				
			})





	});
//create click handler for when user submits a movie
$("#giphy-submit").on("click", function(event){
	//prevent submit form refreshing page automatically
	event.preventDefault();
	//captue user input in variable
	var userInput = $("#giphy-input").val().trim();
	//push user input to user movies array
	userMovies.push(userInput);
	//set user movies array to local storage by using JSON.stringify function
	localStorage.setItem("giphy", JSON.stringify(userMovies));
	//clear user input field
	$("#giphy-input").val("");
	//create variable to get data from local storage. since local storage items are being set as an array we use JSON.parse function to retrieve that array
	var storedData = JSON.parse(localStorage.getItem("giphy"));
	console.log(storedData);
	//clear user giphy buttons div before writing updated array of buttons
	$("#user-giphy-buttons").empty();
	//create for loop that loops through the storedData variable displaying movie names stored in local storage
	for (var i = 0; i < storedData.length; i++){
		// console.log(local);

		//create button variable just like displayButtons function
		var movieButton = $("<button class='btn btn-primary'>");
		//create id attribute for button variable and set value to array loop
		movieButton.attr("id", storedData[i]);
		movieButton.addClass("giphy-button");
		movieButton.text(storedData[i]);
		//append mutated button variable to #giphy-buttons id
		$("#user-giphy-buttons").append(movieButton);
		//on click of #giphy-button alert giphy name for test
	}

})
//the following is necessary to display stored data in the form of buttons if there is any stored data to begin with
	//set variable to data from local storage (an array)
var storedData = JSON.parse(localStorage.getItem("giphy"));
	// console.log(storedData);
	//create if/else condition 
	//if storedData is null (no local storage acquired due to user's first time loading page) do nothing
	if (storedData === null){
		//if storedData is not null and userMovies length is equal to 0 (nothing in the array)
	}else if (userMovies.length === 0){
		//run a for loop based on storedData
		for (var i = 0; i < storedData.length; i++){
			//push storedData loop into userMovies array
//**NOTE**: WITHOUT LOCAL STORAGE BEING PUSHED INTO USERMOVIES ARRAY WHEN PAGE IS RELOADED, LOCAL STORAGE WILL ALWAYS BE RESET AFTER USER'S FIRST SUBMISSION SINCE USERMOVIES ARRAY IS NATIVELY EMPTY AND THATS WHERE THE LOCAL STORAGE SET FUNCTION LOOKS TO FOR ITS DATA
	userMovies.push(storedData[i]);
		}
	console.log(userMovies)
	}
	//clear user giphy buttons so they don't double when updated array is appended
	$("#user-giphy-buttons").empty();
	//create for loop that will iterate through storedData array and post current local storage data to page on reload
	for (var i = 0; i < storedData.length; i++){
		// console.log(local);

		//create button variable
		var movieButton = $("<button class='btn btn-primary'>");
		//create id attribute for button variable and set value to array loop
		movieButton.attr("id", storedData[i]);
		movieButton.addClass("giphy-button");
		movieButton.text(storedData[i]);
		//append mutated button variable to #giphy-buttons id
		$("#user-giphy-buttons").append(movieButton);
		//on click of #giphy-button alert giphy name for test
	}



});