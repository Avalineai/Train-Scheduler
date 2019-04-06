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

    var currentTime = moment().format("HH:mm")
    console.log("CURRENT TIME: " + currentTime)

    var convertFirstTime = moment(firstTrain, "HH:mm").subtract(1, "years")
    console.log("First Time Converted " + convertFirstTime)

    var diffInTime = moment(currentTime).format("HH:mm").diff(moment(convertFirstTime), "minutes")
    console.log(moment())
    console.log((moment(convertFirstTime)))
    console.log("First Train Time in Minutes " + diffInTime)

    var minutesTill = frequency - (diffInTime % frequency)
    console.log("Minutes Away " + minutesTill)
    var nextTrain = moment().add(minutesTill, "minutes")
    console.log("Next Train military time ", moment(nextTrain).format("HH:mm A"))
    var nextTrainTime = moment(nextTrain).format("hh:mm A")

    database.ref("/TrainInfo").push({
        trainName,
        destination,
        frequency,
        minutesTill,
        nextTrainTime,
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
    var nextArrival = $("<td>").text(snapshot.val().nextTrainTime)
    var minutesAwayTd = $("<td>").text(snapshot.val().minutesTill)

    addRow.append(trainTd, destTd, frequencyTd, nextArrival, minutesAwayTd)
    $("#train-info").append(addRow)


}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
    
})

function timeCatch() {


}

// function validateTime(obj) {
//     var timeValue = obj;
//     if (timeValue == "" || timeValue.indexOf(":") < 0) {
//         alert("Invalid Time format");
//         return false;
//     }
//     else {
//         var sHours = timeValue.split(':')[0];
//         var sMinutes = timeValue.split(':')[1];

//         if (sHours == "" || isNaN(sHours) || parseInt(sHours) > 23) {
//             alert("Invalid Time format");
//             return false;
//         }
//         else if (parseInt(sHours) == 0)
//             sHours = "00";
//         else if (sHours < 10)
//             sHours = "0" + sHours;

//         if (sMinutes == "" || isNaN(sMinutes) || parseInt(sMinutes) > 59) {
//             alert("Invalid Time format");
//             return false;
//         }
//         else if (parseInt(sMinutes) == 0)
//             sMinutes = "00";
//         else if (sMinutes < 10)
//             sMinutes = "0" + sMinutes;

//         obj = sHours + ":" + sMinutes;
//     }

//     return true;
//  }

