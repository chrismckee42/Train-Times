var firebaseConfig = {
    apiKey: "AIzaSyArd55Fmm0T5pvCHYV-yoFhfkQ_51aqRNo",
    authDomain: "train-times-8ab27.firebaseapp.com",
    databaseURL: "https://train-times-8ab27.firebaseio.com",
    projectId: "train-times-8ab27",
    storageBucket: "train-times-8ab27.appspot.com",
    messagingSenderId: "364832833754",
    appId: "1:364832833754:web:65f083e89c34c8518965e3",
    measurementId: "G-Z0QH80PRLP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();


// Initial Values
var name = "";
var dest = "";
var time = "";
var freq = 0;
$("#add-user").on("click", function (event) {

    event.preventDefault();

    name = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    time = $("#time-input").val().trim();
    freq = $("#freq-input").val().trim();

    database.ref().push({
        name,
        dest,
        time,
        freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});

database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    console.log("Firebase")
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().dest);
    console.log(snapshot.val().time);
    console.log(snapshot.val().freq);


    var row = $("<tr>")
    row.append($("<td>").text(snapshot.val().name))
    row.append($("<td>").text(snapshot.val().dest))
    row.append($("<td>").text(snapshot.val().time))
    row.append($("<td>").text(5))
    row.append($("<td>").text(snapshot.val().freq))

    $("#table").append(row)


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
