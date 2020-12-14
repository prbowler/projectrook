

function setupPage() {
    //$("#login_menu").append(preLogin);
    //$("#login_menu").append(setupLoginButton);
    //$("#login_menu").append(setupNewPlayerButton);
    setupBanner();
}

/*function setupBanner() {
    console.log("Banner Loaded");
    $.post("/players/user", function(data, result) {
        console.log("bannerdata", data);
        console.log("bannerresult",result);
        if(data.player) {
            console.log("bannerdata2", data);
            console.log("bannerresult2",result);
            $("#main-menu").append(logoutLink);
            $("#main-menu").append(gamesLink);
            $("#main-menu").append('<li><a>'+ data.player +'</a></li>');
        } else {
            console.log("bannerdata3", data);
            console.log("bannerresult3",result);
            $("#main-menu").append(loginLink);
            $("#main-menu").append(newPlayerLink);
        }
    });
}

function setupLogin() {
    $("#login_form").empty();
    $("#login_form").append(loginMessage);
    $("#login_form").append(loginForm);
    $("#login_form").append(loginButton);
}

function setupNewPlayer() {
    $("#login_form").empty();
    $("#login_form").append(newPlayerMessage);
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
            console.log("Successfully logged in.");
            $.post("/games/show", function(result, data) {
                console.log("result", result);
                console.log("data");
                if (!result) {
                    console.log(data);
                    $("#status").text("Error loading games.", data);
                }

            });
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
}*/
