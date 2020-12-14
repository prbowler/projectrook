const h = require("./html");


function setupLoginPage() {
    $("#login_menu").append(preLogin);
    $("#login_menu").append(setupLoginButton);
    $("#login_menu").append(setupNewPlayerButton);
}

function setupLogin() {
    $("#pre_login").hide();
    $("#login_button").hide();
    $("#new_player_button").hide();
    $("#login_message").append(loginMessage);
    $("#login_form").append(loginForm);
    $("#login_form").append(loginButton);
    $("#login_menu").append(setupNewPlayerButton);
}

function setupNewPlayer() {
    $("#pre_login").hide();
    $("#login_button").hide();
    $("#new_player_button").hide();
    $("#login_menu").append(newPlayerMessage);
    $("#login_form").append(loginForm);
    $("#login_form").append(newPlayerButton);
}

function login() {
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username + " " + password);

    let params = {
        username: username,
        password: password
    };

    $.post("/players/validate", params, function(result) {
        if (result && result.success) {
            $("#status").text("Successfully logged in.");
        } else {
            $("#status").text("Error logging in.");
        }
    });
}

function newPlayer() {
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username + " " + password);

    let params = {
        username: username,
        password: password
    };

    $.post("/players", params, function(result) {
        if (result && result.success) {
            $("#status").text("Successfully added player.");
        } else {
            $("#status").text("Error adding player.");
        }
    });
}