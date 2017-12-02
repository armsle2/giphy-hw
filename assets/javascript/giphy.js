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
		console.log(movieButton);
		//append mutated button variable to #giphy-buttons id
		$("#giphy-buttons").append(movieButton);

		//on click of #giphy-button alert giphy name for test
	}

}
$(document).ready(function(){


displayButtons();




});