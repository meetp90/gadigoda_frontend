var booking = {};
var booking_date_set = [];
var booking_date_object_set = [];
var booking_time_set = [];
var booking_time_set_display = [];
booking.station_is = "Pickup";

$(document).ready(function(){    
    $('#stationSelectionModal').hide(); //enter the class or id of the particular html element which you wish to hide. 
});

function stationSelection() {
    $("#trainSelectionModal").fadeOut("def", function () {
        $("#stationSelectionModal").fadeIn("slow");
});
}

function station_selected(station) {

    populate_date_list();
    booking.station = station;
    if (booking.station_is == "Pickup") {
      booking.pickup = station;
      booking.pickup_coordinates = "";
    } else {
      booking.destination = station;
      booking.destination_coordinates = "";
    }
    console.log("Station Selected", booking);
    
  
  }
  
  function populate_date_list() {
    $("#new_account_label").text("पिक उप की  तरीक चुनिए।");
    var ul = document.getElementById("date_selection_list");
    var startdate = moment();
    var list_text = "";
  
    for (i = 0; i < 16; i++) {
      var new_date = moment().add(i, "days");
  
      list_text = new_date.format("DD, MMM YYYY");
      booking_date_set.push(list_text);
      var date_obj = {};
      date_obj.date = new_date.format("DD");
      date_obj.month = new_date.format("M");
      date_obj.year = new_date.format("YYYY");
      booking_date_object_set.push(date_obj);
      if (i == 0) {
        list_text = list_text + "  [ आज की बुकिंग ]";
      }
      if (i == 1) {
        list_text = list_text + "  [ कल की बुकिंग ]";
      }
      if (i == 2) {
        list_text = list_text + "  [ परसो की बुकिंग ]";
      }
      var li = document.createElement("li");
      li.className = "list-group-item";
      li.appendChild(document.createTextNode(list_text));
      ul.appendChild(li);
    }
  
    $("#date_selection_list li").prop('onclick', null).off('click');
  
    $("#date_selection_list li").click(function () {
      booking.pickup_date = booking_date_set[$(this).index()];
      booking.pickup_date_object = booking_date_object_set[$(this).index()];
      console.log("Date Selected", booking);
  
      $("#account_details_layout").fadeOut("def", function () {
       
        $("#date_selection_list").fadeOut("slow");
        $("#time_selection_list_layout").fadeIn("slow");
        populate_time_list();
  
      });
    });  
    $("#station_selection").fadeOut("def", function () {
      $("#account_details_layout").fadeIn("slow");
    });
  }
  
  function populate_time_list() {
    $("#new_account_label").text("पिक उप का समय चुने |");
    $("#new_account_sub_label").text(booking.pickup_date + " को  कितने बजे " + booking.pickup + " से पिक उप करे ?");
    var ul = document.getElementById("time_selection_list");
  
    var list_text = "";
  
    if (moment().format("DD, MMM YYYY") == booking.pickup_date) {
      var jetzt = moment();
      jetzt.seconds(0);
      jetzt.milliseconds(0);
      var minuten = jetzt.minutes();
      var minutenToAdd = 0;
      if (minuten >= 0 && minuten <= 29) {
        minutenToAdd = 30 - minuten;
      } else if (minuten >= 31 && minuten <= 59) {
        minutenToAdd = 60 - minuten;
      }
      var MIN_IN_MS = 60000;
      var HALF_HOUR_IN_MS = 3600000;
  
      minutenToAdd = minutenToAdd * MIN_IN_MS;
      var next_30min_rounded_hour = moment(jetzt + minutenToAdd);
      next_30min_rounded_hour = next_30min_rounded_hour.add(2, 'hours');
  
      if (next_30min_rounded_hour.isSame(moment(), "day")) {
  
        while (next_30min_rounded_hour.isSame(moment(), "day")) {
          var prefix = "";
  
          if (next_30min_rounded_hour.format("A") == "AM") {
            if (Number(next_30min_rounded_hour.format("hh")) > 11) {
              prefix = "लेट नाईट, ";
            }
            else if (Number(next_30min_rounded_hour.format("hh")) < 5) {
              prefix = "लेट नाईट, ";
            }
            else {
              prefix = "सुबह, ";
            }
          } else {
            if (Number(next_30min_rounded_hour.format("hh")) < 4) {
              prefix = "दोपहर , ";
            } else if (Number(next_30min_rounded_hour.format("hh")) < 7) {
              prefix = "शाम , ";
            } else if (Number(next_30min_rounded_hour.format("hh")) < 12) {
              prefix = "शाम , ";
            } else prefix = "दोपहर  , ";
          }
          booking_time_set.push(next_30min_rounded_hour.format("hh:mm A"));
          booking_time_set_display.push(
            prefix + next_30min_rounded_hour.format("hh:mm A")
          );
          next_30min_rounded_hour = next_30min_rounded_hour.add(30, "minutes");
        }
  
        //console.log(booking_time_set_display);
      }
      else {
        alert("आज की बुकिंग खिड़की बंद , आप कल की बुकिंग कर सकते हैं |");
        populate_date_list();
      }
    }
    else {
      var next_30min_rounded_hour = moment().startOf("day").add(1, "day");
  
      //console.log(next_30min_rounded_hour.format("DD.MM.YYYY, h:mm:ss a"));
  
      if (next_30min_rounded_hour.isSame(moment().add(1, "day"), "day")) {
  
        while (next_30min_rounded_hour.isSame(moment().add(1, "day"), "day")) {
          var prefix = "";
  
          if (next_30min_rounded_hour.format("A") == "AM") {
            if (Number(next_30min_rounded_hour.format("hh")) > 11) {
              prefix = "लेट नाईट, ";
            }
            else if (Number(next_30min_rounded_hour.format("hh")) < 5) {
              prefix = "लेट नाईट, ";
            } else {
              prefix = "सुबह, ";
            }
          } else {
            if (Number(next_30min_rounded_hour.format("hh")) < 4) {
              prefix = "दोपहर , ";
            } else if (Number(next_30min_rounded_hour.format("hh")) < 7) {
              prefix = "शाम , ";
            } else if (Number(next_30min_rounded_hour.format("hh")) < 12) {
              prefix = "रात  , ";
            } else prefix = "दोपहर , ";
          }
          booking_time_set.push(next_30min_rounded_hour.format("hh:mm A"));
          booking_time_set_display.push(
            prefix + next_30min_rounded_hour.format("hh:mm A")
          );
          next_30min_rounded_hour = next_30min_rounded_hour.add(30, "minutes");
        }
      }
    }
  
    if (booking_time_set_display.length > 0) {
      var ul = document.getElementById("time_selection_list");
      for (i = 0; i < booking_time_set_display.length; i++) {
        var li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(booking_time_set_display[i]));
        ul.appendChild(li);
      }
  
      $("#time_selection_list li").click(function () {
        booking.pickup_time = booking_time_set[$(this).index()];
        console.log("Time Selected", booking);
        localStorage.setItem('Booking', JSON.stringify(booking));
        location.href='/FoodBooking-HomeScreen/index.html'
        // $("#loader_layout").modal();
        // load_packages();
      });
    }
  }