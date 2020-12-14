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