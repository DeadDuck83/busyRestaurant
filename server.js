// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Variables for the reserve seats
var reservedSeats = [{
    "name": "Derek",
    "phone": "5555555555",
    "email": "fake@you.com",
    "uniqueID": 12
}];

var waitingList = [{
    "name": "Waiting Derek",
    "phone": "5555555555",
    "email": "TwoFake@you.com",
    "uniqueID": 9
}];



// Basic route that sends the user first to the AJAX Page
// =============================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});


// convert all data into JSON information
app.get("/api/reservations", function (req, res) {
    return res.json(reservedSeats);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitingList);
});


// Posting new reservation to the array
// =============================================================

app.post("/api/reservations", function (req, res) {

    var newReservation = req.body;

    console.log(newReservation);

    if (reservedSeats.length < 5) {
        reservedSeats.push(newReservation);
        confirmation = true;
        res.json(newReservation);
    }
    else {
        waitingList.push(newReservation);
        res.json(newReservation);
        confirmation = false;
    }

});



// Here is where the local server is spun up:
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});  