const gameForm = '<div id="game_form">' +
    '<label for="gameName">Game Name</label>' +
    '<input id="gameName" type="text" name="gameName">' +
    '<button id="create_game" onclick="createGame()">Create Game</button>' +
    '</div>';

const gamePlayers = '<div id="game_players">' +
    '<label for="player1">Player1</label>' +
    '<select name="player1" id="player1"></select>' +
    '<label for="player2">Player2</label>' +
    '<select name="player2" id="player2"></select>' +
    '<label for="player3">Player3</label>' +
    '<select name="player3" id="player3"></select>' +
    '<label for="player4">Player4</label>' +
    '<select name="player4" id="player4"></select>' +
    '<button id="create_game" onclick="createTeams()">Create Teams</button>' +
    '</div>';

const gameList = '<% include ../partials/gameList.ejs %>'

let gameName = '';
let users = [];
let players = [];
let cards = [];

function setup() {
    setupBanner();
    getUser();
}

function getUser() {
    $.post("/players/user", function(data, results) {
        console.log("data", data);
        console.log("results", results);
        getGames(data);
    });
}

function getGames(params) {
    $.post("/teams/getGames", params, function(data, result) {
        console.log("data2", data);
        console.log("result2", result);
    });
}

function showForm() {
    $("#new_game").append(gameForm);
}

function createGame() {
    gameName = $("#gameName").val();
    let params = {gameName: gameName};
    $.post("/games/add", params, function(data, results) {
        console.log("clientdata", data);
        console.log("clientresult", results);
        if(!results) {
            $("#status").text("error creating game");
        } else {
            $.post("/players/getUsers", function(data, result) {
                if(!result) {
                    $("#status").text("error getting users");
                } else {
                    console.log("clientresult", result);
                    console.log("clientdata", data);
                    users = [];
                    for (const d of data.list) {
                        users.push(d.username);
                    }
                    console.log("users ", users);
                    $("#game_form").hide();
                    $("#new_game").append(gamePlayers);
                    setupPlayerChoices();
                }
            });
        }
    });
}

function createTeams() {
    players = [];
    players.push($("#player1").val());
    players.push($("#player2").val());
    players.push($("#player3").val());
    players.push($("#player4").val());
    players.push("widow");
    console.log("players", players);
    let params = {gameName: gameName, players: players};
    $.post("/teams", params, function(data, result) {
        if(!result) {
            $("#status").text("error creating teams");
        } else {
            console.log("teams setup");
            $("#game_players").hide();
            setupGame();
        }
    });
}

function setupGame() {
    $.post("/cards", function(data, result) {
        if(!result) {
            $("#status").text("error getting cards game");
        } else {
            console.log("cards received");
            console.log("clientresult", result);
            console.log("clientdata", data);
            dealHands(data);
        }
    });

}

function dealHands(data) {
    cards = data.list;
    let params1 = {gameName: gameName, player: players[0], cards: getID(cards, 0, 10)};
    let params2 = {gameName: gameName, player: players[1], cards: getID(cards, 10, 20)};
    let params3 = {gameName: gameName, player: players[2], cards: getID(cards, 20, 30)};
    let params4 = {gameName: gameName, player: players[3], cards: getID(cards, 30, 40)};
    let params5 = {gameName: gameName, player: players[4], cards: getID(cards, 40, 45)};
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

function joinGame() {
    let params = {gameName: gameName};
    $.post("/games/join", params, function(data, result) {
        if(!result) {
            $("#status").text("error joining game");
        } else {
            console.log("game joined");
            $("#status").append('<a ')
        }
    });
}

function getID(result, start, stop) {
    let cards = result.slice(start, stop);
    let ids = [];
    for (const c of cards) {
        ids.push(c.id);
    }
    return ids;
}

function setupPlayerChoices() {
    for(const user of users) {
        if (user !== 'widow'){
            $("#player1").append($('<option>' + user + '</option>').val(user));
            $("#player2").append($('<option>' + user + '</option>').val(user));
            $("#player3").append($('<option>' + user + '</option>').val(user));
            $("#player4").append($('<option>' + user + '</option>').val(user));
        }
    }
}