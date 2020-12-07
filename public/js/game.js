function deal() {
    $.post("/cards", function(result) {
        let showHand = "<button id=\"show-hand\" onclick=\"showHand();\">Show Hand</button>";
        console.log("game.js result", result);
        $("#status").text("Hand Dealt");
        $("#deal").hide();
        $("#game-menu").append(showHand);
    });
}

function showHand() {
    $.post("/cards/showHand", function(result) {
        let bid = "<input id='bidAmount' type=\"number\" name=\"bidAmount\" step=\"5\"><button id=\"bid\" onclick=\"bid()\">Bid</button>";
        let pass = "<button id=\"pass\" onclick=\"hideBid()\">Pass</button>";
        console.log("game.js result showHand", result);
        $("#show-hand").hide();
        $("#game-menu").append(bid);
        $("#game-menu").append(pass);
        result.forEach(function(r) {
            let renderedCard = renderCard(r);
            $("#cards").append(renderedCard);
        });
    });
}

function hideBid() {
    let newTrick = "<button id=\"newTrick\" onclick=\"newTrick()\">New Trick</button>";
    $("#bidAmount").hide();
    $("#bid").hide();
    $("#pass").hide();
    $("#game-menu").append(newTrick);
    $(".card").click(function() {
        $(this).hide();
        let suit = this.children[0].className.slice(11);
        let params = {
            number: this.children[0].innerHTML,
            suit: suit
        };
        playCard(params);
    });
}

function bid() {
    console.log("bid");
    let bidAmount = $("#bidAmount").val();
    let params = {bidAmount: bidAmount};
    $.post("/games/bid", params, function(result) {
       $("#status").text(JSON.stringify(result));
    });
}

function playCard(params) {
    console.log("play card client", params);
    $.post("/cards/playCard", params, function(result) {
        $("#status").text(JSON.stringify(result));
    });
    showTrick({trickID: 1});
}

function showTrick(params) {
    console.log("show trick cards");
    $.post("/cards/showTrickCards", params, function(result) {
        $("#status").text(JSON.stringify(result));
        $("#played_cards").empty();
        result.forEach(function(r) {
            let renderedCard = renderCard(r);
            $("#played_cards").append(renderedCard);
        });
    });
}

function newTrick() {
    console.log("new trick");
}

function renderCard(card) {
    console.log("card ", card);
    let suit = 'black';
    let number = 'R';
    if (card.suit === 1) { suit = "red";}
    if (card.suit === 2) { suit = "yellow";}
    if (card.suit === 4) { suit = "green";}
    if (card.number !== 0) { number = card.number;}
    let cardDiv = "<div class='card'><span class='top_number " + suit + "'>" + number +
        "</span><div class='inner_card " + suit + "'><span class='middle_number " + suit + "'>" + number +
        "</span></div><span class='bottom_number " + suit + "'>" + number + "</span></div>";
    return cardDiv;
}