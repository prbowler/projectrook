function setup() {
    $.post("/players/user", function(data, result) {
        if(!result) {
            $("#status").text("error getting user");
        } else {
            console.log("user", data);
            $("#status").text("user " + data.username);
        }
    });
}
