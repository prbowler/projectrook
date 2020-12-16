const bidForm = "<input id='bidAmount' type=\"number\" name=\"bidAmount\" step=\"5\"><button id=\"bid\" onclick=\"bid()\">Bid</button>";
const passButton = "<button id=\"pass\" onclick=\"pass()\">Pass</button>";
let cards = [];

function setupTable() {
    showHand();
    //showPlayedCards();
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
                            //conductDiscard();
                        });
                    });
                }
            });
        }
    });
}

function playRound() {
    playCards();
    showPlayedCards();
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
                                showPlayedCards();
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
                    $("#played_cards").empty();
                    cardData.list.forEach(function(r) {
                        $("#played_cards").append(renderCard(r));
                    });
                }
            });
        }
    });
}
/*
function getCards() {
    $.post("/cards", function(data, result) {
        if(!result) {
            $("#status").text("error getting cards game");
        } else {
            console.log("cards received");
            dealNewHands(data);
        }
    });
}


function dealNewHands(data) {
    cards = data.list;
    $.post("/players")
    let params1 = {cards: getID(cards, 0, 10), player: players[0]};
    let params2 = {cards: getID(cards, 10, 20), player: players[1]};
    let params3 = {cards: getID(cards, 20, 30), player: players[2]};
    let params4 = {cards: getID(cards, 30, 40), player: players[3]};
    let params5 = {cards: getID(cards, 40, 45), player: players[4]};
    let params6 = {gameName: gameName, player: players[5], cards: []};
    console.log("params ", params1);
    $.post("/hands", params1, function(data, result) {
        if(!result) {
            $("#status").text("error dealing player1 cards");
        } else {
            $.post("/hands", params2, function(data, result) {
                if(!result) {
                    $("#status").text("error dealing player2 cards");
                } else {
                    $.post("/hands", params3, function(data, result) {
                        if(!result) {
                            $("#status").text("error dealing player3 cards");
                        } else {
                            $.post("/hands", params4, function(data, result) {
                                if(!result) {
                                    $("#status").text("error dealing player4 cards");
                                } else {
                                    $.post("/hands", params5, function(data, result) {
                                        if(!result) {
                                            $("#status").text("error dealing widow cards");
                                        } else {
                                            $.post("/hands", params6, function (data, result) {
                                                if (!result) {
                                                    $("#status").text("error dealing trick cards");
                                                } else {
                                                    console.log("hands dealt");
                                                    setupTrick();
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

function setupTrick() {
    let params = {gameName: gameName};
    $.post("/tricks", params, function(data, result) {
        if(!result) {
            $("#status").text("error setting up trick");
        } else {
            console.log("trick setup");
            setupBid();
        }
    });
}

function setupBid() {
    let params = {gameName: gameName};
    $.post("/bids", params, function(data, result) {
        if(!result) {
            $("#status").text("error setting up bid");
        } else {
            console.log("bid setup");
            setupRound();
        }
    });
}

function setupRound() {
    let params = {gameName: gameName};
    $.post("/rounds", params, function(data, result) {
        if(!result) {
            $("#status").text("error setting up round");
        } else {
            console.log("round setup");
            setupScore();
        }
    });
}

function setupScore() {
    let params = {gameName: gameName};
    $.post("/scores", params, function(data, result) {
        if(!result) {
            $("#status").text("error setting up score");
        } else {
            console.log("score setup game ready to play");
            joinGame();
        }
    });
}


 */
