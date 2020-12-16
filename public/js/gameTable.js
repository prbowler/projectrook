const bidForm = "<input id='bidAmount' type=\"number\" name=\"bidAmount\" step=\"5\"><button id=\"bid\" onclick=\"bid()\">Bid</button>";
const passButton = "<button id=\"pass\" onclick=\"pass()\">Pass</button>";

function setupTable() {
    showHand();
}

function showHand() {
    $.post("/hands/get", function(data, result) {
        if(!result) {
            $("#status").text("error joining game");
        } else {
            console.log("hand", data.list[0].cards);
            let params = {ids: data.list[0].cards};
            console.log("params", params);
            $.post("/cards/fromIDs", params, function(data, result) {
                if(!result) {
                    $("#status").text("error joining game");
                } else {
                    console.log("hand cards", data.list);
                    data.list.forEach(function(r) {
                        $("#cards").append(renderCard(r));
                    });
                }
            });
        }
    });
}

function conductBid() {
    $("#game-menu").empty();
    $("#game-menu").append(bidForm);
    $("#game-menu").append(passButton);
}

function awardBid() {
    $("#game-menu").empty();
    $.post("/bids/get", function(data, result) {
        if(!result) {
            $("#status").text("error getting bid");
        } else {
            console.log("bids are", data);
            let bidArray = [];
            data.list[0].bids.forEach(function(r) {
               bidArray.push(r.split(": "));
            });
            console.log("bidArray", bidArray);
            let bidPerson = [];
            let bid = [];
            for(let i = 0; i < bidArray.length; i++) {
                bidPerson.push(bidArray[i][0]);
                let b = bidArray[i][1];
                if(b !== 'pass') {bid.push(Number(b));}
            }
            console.log("bidPerson", bidPerson);
            console.log("bid", bid);
            let bidAmount = Math.max(...bid);
            let maxBidder = bidPerson[bid.indexOf(bidAmount)];
            console.log("bidAmount", bidAmount);
            console.log("maxBidder", maxBidder);
            $.post("/hands/getWidow", function(widow, result) {
                if(widow.success) {
                    console.log("widow", widow.list[0].cards);
                    let params = {
                        cards: widow.list[0].cards,
                        player: maxBidder
                    };
                    $.post("/hands/addWidow", params, function(data, result) {
                        console.log("get widow data", data);
                        let params = {
                            cards: '{}',
                            player: 'widow'
                        };
                        $.post("/hands/updateByPlayer", params, function(data, result) {
                            console.log("update player data", data);
                            location.reload();

                            conductDiscard();
                        });
                    });
                }
            });
        }
    });
}

function playRound() {
    showPlayedCards();
    playCards();
}

function newTrick() {

}

function pass() {
    $("#game-menu").empty();
    let params = {bid: "pass"};
    $.post("/bids/addOne", params, function(result) {
        console.log("result", result);
    });

}

function playCards() {
    $(".card").click(function() {
        playCard(this);
    });
}

function playCard(card) {
    console.log("play card ", card);
    let suit = card.children[0].className.slice(11);
    let params = {};
    if (card.children[0].innerHTML === 'R') {
        params = {
            number: 0,
            suit: 'rook'
        };
    } else {
        params = {
            number: card.children[0].innerHTML,
            suit: suit
        };
    }
    $.post("/cards/idFromSN", params, function(data, result) {
        console.log("cardID", data.list[0].id);
        let params = {card: data.list[0].id};
        $.post("/hands/addToTrick", params, function (data, result) {
            if (!data.success) {
                console.log("error playing card", data);
            } else {
                $.post("/hands/subtract", params, function(data, result) {
                    if (!data.success) {
                        console.log("error removing card", data);
                    } else {
                        $.post("/tricks/addCard", params, function (data, result) {
                            if (!data.success) {
                                console.log("error removing card", data);
                            } else {
                                $(card).hide();
                                location.reload();
                            }
                        });
                    }
                });
            }
        });
    });

}


function bid() {
    console.log("bid");
    let bidAmount = $("#bidAmount").val();
    console.log("bid amount ", bidAmount);
    if (!bidAmount || bidAmount === 0) { pass(); }
    let params = {bid: bidAmount};
    $.post("/bids/addOne", params, function(result) {
        console.log(result);
    });
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

function showPlayedCards() {
    $.post("/hands/getTrick", function(data, result) {
        console.log("showplayedcards", data);
        if(data.success && data.list.length > 0) {
            console.log("played", data.list[0].cards);
            let params = {ids: data.list[0].cards};
            console.log("params", params);
            $.post("/cards/fromIDs", params, function(cardData, results) {
                if(!results) {
                    $("#status").text("error joining game");
                } else {
                    console.log("played cards", cardData);
                    cardData.list.forEach(function(r) {
                        $("#played_cards").append(renderCard(r));
                    });
                }
            });
        }
    })
}
/*

function deal() {
    $.post("/cards", function(result) {
        let showHand = "<button id=\"show-hand\" onclick=\"showHand();\">Show Hand</button>";
        console.log("game.js result", result);
        $("#status").text("Hand Dealt");
        $("#deal").hide();
        $("#game-menu").append(showHand);
    });
}



function showHandOld() {
    $.post("/cards/showHand", function(result) {
        console.log("game.js result showHand", result);
        $("#show-hand").hide();
        $("#game-menu").append(bid);
        $("#game-menu").append(pass);
        $("#game-menu").append(subcribeButton);
        $("#game-menu").append(checkBid);
        result.forEach(function(r) {
            let renderedCard = renderCard(r);
            $("#cards").append(renderedCard);
        });
    });
}

function pass() {

    $("#bidAmount").hide();
    $("#bid").hide();
    $("#pass").hide();
    $("#game-menu").append(newTrick);
    $.post("/games/pass", function(result) {
        console.log("game.js result", result);
    });
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
    console.log("bid amount ", bidAmount);
    if (!bidAmount || bidAmount === 0) { pass(); }
    let params = {bidAmount: bidAmount};
    $.post("/games/bid", params, function(result) {
        $("#status").text(JSON.stringify(result));
    });
}

function checkBid() {
    console.log("checkbid");
    $.post("/games/checkBid", function(result) {

        $("#game-info").html(gameInfo);
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
    let gameName = "test";
    let round = 1;
    let trickNumber = 2;
    let params = {
        gameName: gameName,
        round: round,
        trickNumber: trickNumber
    };
    $.post("/cards/newTrick", params, function(result) {
        $("#bidAmount").show();
        $("#bid").show();
        $("#pass").show();
    });
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
}*/