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

const bidForm = "<input id='bidAmount' type=\"number\" name=\"bidAmount\" step=\"5\"><button id=\"bid\" onclick=\"bid()\">Bid</button>";
const passButton = "<button id=\"pass\" onclick=\"pass()\">Pass</button>";

const loginForm = '<label for="username">Username</label>' +
    '<input type="text" name="username" id="username">' +
    '<label for="password">Password</label>' +
    '<input type="password" name="password" id="password">';

const preLogin = '<h2 id="pre_login">Please Login or create an account to play</h2>';
const loginMessage = '<h2 id="login_message">Please Login to play</h2>';
const newPlayerMessage = '<h2 id="new_player_message">Please create an account to play</h2>';
const loginButton = '<button id="login" onclick="login()">login</button>';
const newPlayerButton = '<button id="new_player" onclick="newPlayer()">Create New Player</button>';
const setupLoginButton = '<button id="login_button" onclick="setupLogin()">Login</button>';
const setupNewPlayerButton = '<button id="new_player_button" onclick="setupNewPlayer()">New Player</button>';

//let showHand = "<button id=\"show-hand\" onclick=\"showHand();\">Show Hand</button>";
/*
let subscribeButton = "<button id=\"subscribe\" onclick=\"subscribe()\">Subscibe</button>";
let checkBid = "<button id=\"check_bid\" onclick=\"checkBid()\">Check Bid</button>";
let newTrick = "<button id=\"newTrick\" onclick=\"newTrick()\">New Trick</button>";
let gameInfo = '<span id="game-name">Game Name:' + result[0].name + '</span><span id="players">Players: ' + result[0].player1 +
    ' ' + result[0].player2 + ' ' + result[0].player3 + ' ' + result[0].player4 + '</span><span id="score">Score Team1: ' +
    result[0].score1 + 'ScoreTeam1: ' + result[0].score2 + '</span>';

 */