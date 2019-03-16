var config = {
  apiKey: "AIzaSyDju7BtCJ_FI-vDt6-HFsUmuuUk79CbpMk",
  authDomain: "train-scheduler-f0d0f.firebaseapp.com",
  databaseURL: "https://train-scheduler-f0d0f.firebaseio.com",
  projectId: "train-scheduler-f0d0f",
  storageBucket: "train-scheduler-f0d0f.appspot.com",
  messagingSenderId: "171218627913"
};
firebase.initializeApp(config);
var database = firebase.database();

$(document).ready(function() {
  database.ref().on("child_added", function(snapshot) {
    var data = snapshot.val();

    var tr = $("<tr>");
    tr.append($("<th>").text(data.name));
    tr.append($("<th>").text(data.destination));
    tr.append($("<th>").text(data.frequency));

    var minutesAway = Math.abs(
      moment().diff(moment(data.firstTrain, "HH:mm"), "minutes") %
        data.frequency
    );
    var nextArrival = moment()
      .add(minutesAway, "minutes")
      .format("hh:mm A");

    tr.append($("<th>").text(nextArrival));
    tr.append($("<th>").text(minutesAway));

    $("tbody").append(tr);
  });

  $("#submit").on("click", function(e) {
    e.preventDefault();
    var name = $("#name")
      .val()
      .trim();
    var destination = $("#destination")
      .val()
      .trim();
    var firstTrain = $("#first-train")
      .val()
      .trim();
    var frequency = $("#frequency")
      .val()
      .trim();

    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    });
  });
});
