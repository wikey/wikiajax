function wikiParse(lesson){
    lessonId(lesson); //Lesson identifing
    objectIfy(lesson.cards); //Card processing
}

function lessonId(lesson){
    var sideNumber = lesson.answer_columns.length + lesson.prompt_columns.length
    $(".lessonInfo").append("<p><strong>Lesson Info</strong><br>" + "Groups: " + lesson.dividers.length + "<br>" + "Cards: " + lesson.cards.length + "<br>" + "Sides per card: " + sideNumber + "</p>");
}

function objectIfy(cardArray, cardNum){
    cards_to_search = cardArray[cardNum] || cardArray
    // This level is the array of cards/arrays belonging to a page
    var card_counter = 0;
    for (var card in Object.keys(cards_to_search)){
	// This level is the array of sides/objects belonging to a single card
	card_counter += 1;
	var card_info = "Card " + card_counter + ":";
	var side_counter = 0;
	var side_info = [];
	for (var side in Object.keys(cardArray[card])){
	    //This level is the collection of properties belonging to a single side/object of a single card
	    side_counter += 1;
	    console.log("side: " + side_counter);
//	    side_info = "<div id='" + "side" + side_counter + "'" + " class='side'" + ">" + "</div>";
	    side_info.push("<div class='side'>" + "<h4>" + "side" + side_counter + "</h4>");
	    for (var property in cardArray[card][side]){
		console.log("property: " + property);
//Works but doesn't nest the divs inside the side div//		side_info.push("<div class='property'>" + property + ": " + cardArray[card][side][property] + "</div>");
		side_info.push(property + ": " + cardArray[card][side][property] + "<br>");
	    }//End Property
	    side_info.push("</div>")
	}//End side
	$(".cardGroup").append("<div class='card' id='c" + card_counter + "'>" + "<h2>" + card_info + "</h2>" + "<p>" + side_info.join("") + "</p>" + "</div>");
    } //End card level
}//End cardArray

$(function(){
    function fetch_and_clean_wiki(){
	lesson_url = prompt("Give me your wikiotics lesson please.")
	$.ajax({
	    url: lesson_url + "?view=resource_jsonp",
	    dataType: 'jsonp',
	    jsonpCallback: 'callback',
	    success: function(data){
		lesson_json_simplified = transform1(data);
		console.log(lesson_json_simplified.cards);
		//		objectIfy(lesson_json_simplified.cards);
		wikiParse(lesson_json_simplified)
	    }
	});
    }
    fetch_and_clean_wiki();
});
