var lesson_json_simplified = {};

function resolve_urn(urn) {
    return 'https://wikiotics.org/' + urn.split(':').join('/');
} 

function transform1(resource_json) {
    if (resource_json.fqn != "{http://wikiotics.org/ns/2011/flashcards}flashcard_deck") {
        // FIXME: error out
        alert("error");
        return;
    }
    var interaction_idx = 0, // by default
        interaction = resource_json.interactions.array[interaction_idx].resource;
    if (interaction.fqn != "{http://wikiotics.org/ns/2011/flashcards}choice_interaction") {
        // FIXME: error out
        alert("error");
        return;
    }
    var prompt_columns = interaction.prompt.split(","),
        answer_columns = interaction.answer.split(","),
        dividers = resource_json.dividers.split(","),
	lesson_json = resource_json;
    var _cards = resource_json.cards.array;
    var cards = [], sides;
    var i, e_i, j, e_j, _sides, _side, _href;
    for (i = 0, e_i = _cards.length; i < e_i; ++i) {
        _sides = _cards[i].resource.sides.array;
        sides = [];
        for (j = 0, e_j = _sides.length; j < e_j; ++j) {
	    _href = _sides[j].href;
	    _side = _sides[j].resource;
	    if (_side == null) {
                sides.push({type: "null"});
	    } else if (_side.fqn == "{http://wikiotics.org/ns/2011/phrase}phrase") {
                sides.push({type: "phrase", phrase: _side.phrase.text});
	    } else if (_side.fqn == "{http://wikiotics.org/ns/2009/picture}picture") {
                sides.push({type: "picture", url: resolve_urn(_href) + "?view=image&max_size=250,250"});
	    } else if (_side.fqn == "{http://wikiotics.org/ns/2010/audio}audio") {
                sides.push({type: "audio", url: resolve_urn(_href) + "?view=audio"});
		//https://wikiotics.org/mediacache/sha384/R21dBYbLEJW2vHMlXJBiRN9WYx3Pm-dLFzmv8f8WptYJIYtwD2Xn6O01AEohG8Lk.31238ca1d37e7ba88b9c845d2c1b902ebfec22d5.webma?urn:sha384:hXHDivFJhI6WJQ36JLQil4joERNjTgOFEr0iFnrEFgImor20uoVgWWAZm9WLoQnU
	    } else {
                sides.push({type: "unknown"});
	    }
        }
        cards.push(sides);
    }
    return {
        dividers: dividers,
        prompt_columns: prompt_columns,
        answer_columns: answer_columns,
        cards: cards,
	lesson_json: lesson_json
    }
}
