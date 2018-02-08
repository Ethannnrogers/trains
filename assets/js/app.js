$(document).ready(function() {
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCW722ZqhNYku-jmfXktqccyOm1sT45m_g",
  authDomain: "train-schedule-b2e48.firebaseapp.com",
  databaseURL: "https://train-schedule-b2e48.firebaseio.com",
  projectId: "train-schedule-b2e48",
  storageBucket: "train-schedule-b2e48.appspot.com",
  messagingSenderId: "144164926236"
};
firebase.initializeApp(config);

  var database = firebase.database();

  var liveTime = function() {
      var now = moment().format('hh:mm A');
      $('#currentTime').html(now);
  }
    liveTime();
    setInterval(liveTime, 1000);
    var train = "";
    var destination = "";
    

 var trainName = "";
 var destination = "";
 var firstTrain = 0;
 var frequency = 0;

$("#submit").on("click", function(event) { 
     event.preventDefault();
    
     trainName = $("#train-name").val().trim();
     destination = $("#destination").val().trim();
     firstTrain = $("#first-train-time").val().trim();
     frequency = $("#frequency").val().trim();
 
     database.ref().push({
       name: trainName,
       destination: destination,
       firstTrain: firstTrain,
       frequency: frequency,
       dateAdded: firebase.database.ServerValue.TIMESTAMP
     });
});
     
 
 database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    var snapshotVal = snapshot.val();

       addTrainName = "<td>" + snapshotVal.name + "</td>";
       addDestination = "<td>" + snapshotVal.destination + "</td>"; 
       addFrequency = "<td>" + snapshotVal.frequency + "</td>";
       addFirstTrain = snapshotVal.firstTrain;
   

       var firstTrainTime = moment(snapshotVal.firstTrain, "hh:mm A").subtract(1, "years");
       var timeTillArrival = moment().diff(moment(firstTrainTime, "minutes"));
       var timeRemaining = timeTillArrival % snapshotVal.frequency;
       var nextTrainArrival = moment().add(timeRemaining, "minutes");
       console.log(timeTillArrival);
       console.log(firstTrainTime);
       console.log(timeRemaining);
       console.log(nextTrainArrival);
                                 
       newNextArrival = "<td>" + moment(nextTrainArrival._d).format("hh:mm A") + "</td>"; 
       newMinutesAway = "<td>" + timeRemaining + "</td>";

       var newRow =  "<tr>" + addTrainName + addDestination + addFrequency + newNextArrival + newMinutesAway + "</tr>";
       $("#display-table").append(newRow);

     // include the error funciton
   }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
   });



}); // closes out the document ready function



    
   



