//user interval to deduct time


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

    // if (typeof firstTrain === ("string")) {
    //     alert("input invalid")
    // }

    var currentTime = moment().format("hh:mma")
    console.log("CURRENT TIME: " + currentTime)
    var diffInTime
    var minutesTill
    var nextTrain
    var convertArr = firstTrain.split(":")
    var firstTrainTime = moment().hours(convertArr[0]).minutes(convertArr[1]);
    var convertFirstTime = moment(firstTrainTime).format("hh:mma")
    console.log("First Time Converted " + convertFirstTime)

    console.log("First Train After Current Time?", moment(currentTime, "hh:mma").isBefore(moment(convertFirstTime, "hh:mma")))
    if (moment(currentTime, "hh:mma").isBefore(moment(convertFirstTime, "hh:mma"))) {
    
        diffInTime = moment(convertFirstTime, "hh:mma").diff(moment(currentTime, "hh:mma"), "minutes")
        console.log("difference " + (diffInTime))
        nextTrain = moment(convertFirstTime, "hh:mma").format("hh:mma")
        console.log(moment(convertFirstTime, "hh:mma").format("hh:mma"))
        minutesTill = diffInTime
    }
    else {
        diffInTime = moment(currentTime, "hh:mma").diff(moment(convertFirstTime, "hh:mma"), "minutes")
        console.log("difference " + diffInTime)

        minutesTill = frequency - (diffInTime % frequency)
        console.log("Minutes Away " + minutesTill)
        nextTrain = moment(currentTime, "hh:mma").add(minutesTill, "minutes").format("hh:mma")
        console.log("Next Train military time ", moment(nextTrain, "hh:mma").format("hh:mma"))
    }
    
    database.ref("/TrainInfo").push({
        trainName,
        destination,
        frequency,
        minutesTill,
        nextTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })

    $("#train-name").val("")
    $("#dest-info").val("")
    $("#first-train").val("")
    $("#frequency").val("")
})

database.ref("/TrainInfo").on("child_added", function (snapshot) {
    var addRow = $("<tr>")
    var trainTd = $("<td>").text(snapshot.val().trainName)
    var destTd = $("<td>").text(snapshot.val().destination)
    var frequencyTd = $("<td>").text(snapshot.val().frequency)
    var nextArrival = $("<td>").text(snapshot.val().nextTrain)
    var minutesAwayTd = $("<td>").text(snapshot.val().minutesTill)

    addRow.append(trainTd, destTd, frequencyTd, nextArrival, minutesAwayTd)
    $("#train-info").append(addRow)


}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    
})

function timeCatch() {

}

