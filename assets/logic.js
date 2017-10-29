$(function() {
	populateButtons(searchArray, 'btn', 'btn-success', 'buttonSearch', '#button-placement');
})

var searchArray = ["potato", "turtle", "hello"];

function populateButtons(searchArray,btn,buttonSuccess,classToAdd,areaToAddTo){
	$(areaToAddTo).empty();
	for(var i=0; i<searchArray.length; i++) {
		var button = $('<button>');
		button.addClass(btn);
		button.addClass(buttonSuccess);
		button.addClass(classToAdd);
		button.attr('data-type', searchArray[i]);
		button.text(searchArray[i]);
		$(areaToAddTo).append(button);
	}
}

function getRandomInt() {
    return Math.floor(Math.random() * (4 - 0 + 1)) + 0;
}


$(document).on('click','.buttonSearch', function() {
	var type = $(this).data('type');
	console.log(type);
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=dc6zaTOxFJmzC&limit=5';
	$.ajax({
          url: queryURL,
          method: "GET"
        })
		.done(function(response){
			var i = getRandomInt();
			var results = response.data;
			console.log(results);
			// for (var i=0;i<results.length;i++){
				var searchDiv = $("<div class='search-item'>");
				var rating = results[i].rating;
				var p = $("<p>").text('Rating: '+ rating);
				var animated = results[i].images.fixed_height.url;
				var still = results[i].images.fixed_height_still.url;
				var image = $("<img>");
				image.attr('src', still);
				image.attr('data-still', still);
				image.attr('data-animated', animated);
				image.attr('data-state', 'still');
				image.addClass('searchImage');

				searchDiv.append(p);
				searchDiv.append(image);
				$('#searches').prepend(searchDiv);
			// }
		})
})

$(document).on('click','.searchImage', function() {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src',$(this).data('animated'));
		$(this).attr('data-state', 'animated');
	} else {
		$(this).attr('src',$(this).data('still'));
		$(this).attr('data-state', 'still');
	}
})

$('#addSearch').on('click', function() {
	
	var newSearch = $('#search-input').val();
	searchArray.push(newSearch);
	populateButtons(searchArray, 'btn', 'btn-success', 'buttonSearch', '#button-placement');
	$('#search-input').val('');
	return false;
})

