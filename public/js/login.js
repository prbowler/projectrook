function login() {
    var username = $("#username").val();
    var password = $("#password").val();

    var params = {
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