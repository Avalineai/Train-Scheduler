
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyB45yUTfZOVHxGXPXmkSis9nqQlw50zk3c",
    authDomain: "train-scheduler-ab0ce.firebaseapp.com",
    databaseURL: "https://train-scheduler-ab0ce.firebaseio.com",
    projectId: "train-scheduler-ab0ce",
    storageBucket: "train-scheduler-ab0ce.appspot.com",
    messagingSenderId: "249896335614"
};

firebase.initializeApp(config);

var database = firebase.database()

$("#submit-info").on("click", function (event) {
    event.preventDefault()

    var trainName = $("#train-name").val().trim();
    var destination = $("#dest-info").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim()
    console.log(frequency)

    console.log(trainName)
    console.log(firstTrain)

    var currentTime = moment()
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"))
    var convertFirstTime = moment(firstTrain, "HH:mm").subtract(1, "years")
    console.log("First Time Converted " + convertFirstTime)
    var diffInTime = moment().diff(moment(convertFirstTime), "minutes")
    console.log("First Train Time in Minutes " + diffInTime)
    var minutesTill = frequency - (diffInTime % frequency)
    console.log("Minutes Away " + minutesTill)
    var nextTrain = moment().add(minutesTill, "minutes")
    console.log(moment(nextTrain).format("HH:mm A"))

    database.ref("/TrainInfo").push({
        trainName,
        destination,
        firstTrain,
        frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

})

database.ref("/TrainInfo").on("child_added", function (snapshot) {
    var addRow = $("<tr>")
    var trainTd = $("<td>").text(snapshot.val().trainName)
    var destTd = $("<td>").text(snapshot.val().destination)

    //var firstTrainTd = $("<td>").text(snapshot.val().firstTrain)

    var frequencyTd = $("<td>").text(snapshot.val().frequency)
    var nextArrival = $("<td>").text("next arrival")
    var minutesAwayTd = $("<td>").text("minutes away")
    //var monthlyRateTd = $("<td>").text(snapshot.val().frequency)

    addRow.append(trainTd, destTd, frequencyTd, nextArrival, minutesAwayTd)
    $("#train-info").append(addRow)

})