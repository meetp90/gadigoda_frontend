var partner_profile = {};
function submit_mobile_number() {
  if ($("#mobile_number").val().length != 10) {
    alert("Invalid Phone Number");
    $("#mobile_number").focus();
  } else {
    partner_profile.mobile = $("#mobile_number").val();
    console.log(partner_profile);
    phoneSignIn(partner_profile.mobile);
  }
}

function submit_otp() {
  if ($("#otp").val().length != 6) {
    alert("Invalid OTP");
    $("#otp").focus();
  } else {
    submitPhoneNumberAuthCode($("#otp").val());
  }
}


function car_selected(car) {
  $("#select_car_model").fadeOut("def", function () {
    $("#car_details_layout").fadeIn("slow");
    $("#new_account_sub_label").text("Enter Car & Driver Details");
  });
}

function station_selected(station) {
  $("#new_account_label").text("पिक उप की  तरीक चुनिए।");
  populate_date_list();
  booking.station = station;
  if (booking.station_is == "Pickup") {
    booking.pickup = station;
    booking.pickup_coordinates = "";
  } else {
    booking.destination = station;
    booking.destination_coordinates = "";
  }
  console.log(booking);
  $("#station_selection").fadeOut("def", function () {
    $("#account_details_layout").fadeIn("slow");
  });
}

function populate_date_list() {
  var ul = document.getElementById("date_selection_list");
  var startdate = moment();
  var list_text = "";

  for (i = 0; i < 16; i++) {
    var new_date = moment().add(i, "days");

    list_text = new_date.format("DD, MMM YYYY");
    booking_date_set.push(list_text);
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

  $("#date_selection_list li").click(function () {
    booking.pickup_date = booking_date_set[$(this).index()];
    console.log(booking);

    $("#account_details_layout").fadeOut("def", function () {
      $("#time_selection_list_layout").fadeIn("slow");
      populate_time_list();
      $("#new_account_label").text("पिक उप का समय चुने |");
      $("#new_account_sub_label").text(
        booking.pickup_date +
        " को  कितने बजे " +
        booking.pickup +
        "से पिक उप करे ?"
      );
    });
  });
}

function populate_time_list() {
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

      console.log(booking_time_set_display);
    } else {
      alert("आज की बुकिंग खिड़की बंद , आप कल की बुकिंग कर सकते हैं |");
    }
  } else {
    var next_30min_rounded_hour = moment().startOf("day").add(1, "day");

    console.log(next_30min_rounded_hour.format("DD.MM.YYYY, h:mm:ss a"));

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
      console.log(booking);
      alert("Fetching Plans");
      $.ajax({
        url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllPackages",
        method: "POST", //First change type to method here
        success: function (response) {
          console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllPackages", response);
          received_plans = response;
          received_plans = received_plans.filter(function (jsonObject) {
            return jsonObject.isDeleted != "true";
          });
          //alert("Successfully Edited");
          received_plans.sort((b, a) => b.alloted_kms - a.alloted_kms)
          //received_plans.sort((a,b) => b.alloted_kms - a.alloted_kms)
          console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllPackages", received_plans);
          $("#time_selection_list_layout").fadeOut("def", function () {
            $("#select_car_model").fadeIn("slow");

            $("#new_account_label").text("अपना बुकिंग प्लान सेलेक्ट करे |");
            $("#new_account_sub_label").text(
              "किनते  सीट की गाडी ? कितने  समय के लिए ? "
            );

            setup_package_layout(received_plans);
          });
        },
        error: function () {
          alert("error");
        }
      });


    });
  }
}


var received_plans;
function setup_package_layout(packages) {
  var items = [];
  $.each(packages, function (i, package) {
    if (package.isDeleted == "true") {


    }
    else {
      var li = '<li name="' + i + '" id="' + package.id + '" class="list-group-item" style="text-align: center;padding-left: 30px;padding-right: 30px;">' +
        '<p class="plan-header">' + package.alloted_time + ' ' + package.alloted_time_unit.replace("Hour(s)", "Hrs") + '</p>' +
        '<p>' + package.alloted_kms + 'Kms</p>' +
        '</li>';

      //console.log(li)
      items.push(li);
    }
  });

  document.getElementById("plan_holder_list").innerHTML = "";
  $('#plan_holder_list').append(items.join(''));

  $("#plan_holder_list li").click(function () {
    $('#plan_holder_list li').removeClass('selected');
    $(this).addClass('selected');
    var selected_package_index = $(this).index();
    console.log("Opening", selected_package_index, received_plans[selected_package_index]);
    var vehicles_received = received_plans[selected_package_index].plans;
    console.log(vehicles_received);

    $("#plan_Selected_description_label").text(received_plans[selected_package_index].package_description);

    $("#plan_Selected_label").text(received_plans[selected_package_index].name);
    $("#car_holder").show();

    populate_vehicles_list(received_plans[selected_package_index]);
  });

}


function setup_vehicle_view() {
  if (opened_plan == null) {
    $("#no_vehicles_layout_header").text("No Package Selected.");
    $("#no_vehicles_layout_action_button").hide();
    $("#add_vehicle-package-button").hide();
  }
  else {
    console.log(opened_plan);
    $("#add_vehicle-package-button").show();
    if (opened_plan.plans) {
      if (opened_plan.plans.length > 0) {
        $("#no_vehicles_layout").hide();
        $("#vechicles_list_ul").show();
        populate_vehicles_list(opened_plan.plans);
      }
      else {
        $("#no_vehicles_layout").show();
        $("#no_vehicles_layout_header").text("No Cars Available.");
        $("#no_vehicles_layout_action_button").show();
        $("#vechicles_list_ul").hide();
      }

    }
    else {
      alert("No Plans in the Vehicle.");
      $("#no_vehicles_layout_header").text("No Cars Available.");
      $("#no_vehicles_layout_action_button").show();
      $("#no_vehicles_layout").show();
      $("#vechicles_list_ul").hide();
    }
  }
}

function populate_vehicles_list(plans) {
  alert(plans.plans.length + " cars in this plan");
  opened_vehicle_plans = plans.plans;
  opened_vehicle_plans.sort((b, a) => b.no_of_seats - a.no_of_seats)
  document.getElementById("vehicles_plan_list").innerHTML = "";
  for (var i = 0; i < opened_vehicle_plans.length; i++) 
  { 
    console.log(opened_vehicle_plans[i]);
    var car_image='dzire.jpg';
    switch(opened_vehicle_plans[i].selected_vehicle)
    {
        case "Maruti Suzuki Dzire":{
          break;
        }

        case "Maruti Suzuki Ertiga":{
          car_image='ertiga.jpg';
          break;
        }

        case "Toyota Innova":{
          car_image="innova.jpg";
          break;
        }

        case "Chevrolet Tavera":{
          car_image="travera.jpeg";
          break;
        }

        case "Force Traveller [17 Seater]":{
          car_image="force_traveller.png";
          break;
        }

        case "Force Traveller [12 Seater]":{
          car_image="force_traveller.png";
          break;
        }

        case "Force Toofan":{
          car_image="toofan.webp";
          break;
        }

        case "Toyota Innova Crysta":{
          car_image='toyota-innova-crysta.jpeg';
          break;
        }

        
    }


    $('#vehicles_plan_list').append
      (
        '<li class="list-group-item">' +
        '<div class="car-block">' +
        '<div class="car-image">' +
        '<img class="img-fluid" src="../cab-booking/assets/'+car_image+'">' +
        '</div>' +
        '<div class="car-details">' +
        '<div class="car-name">'+opened_vehicle_plans[i].no_of_seats+' Seater</div>' +
        '<div class="car-sub-name" id="car-sub-name-0">' + opened_vehicle_plans[i].selected_vehicle + ', '+plans.name+'.</div>' +
        '</div>' +
        '<div class="car-fare" id="car-far-0">₹ ' +
        +opened_vehicle_plans[i].plan_baseprice +
        '</div>' +
        '</div>' +
        '</li>'
      );
  }
}

function openplan(index) {
  if (received_plans) {
    alert("Opening " + index);
    var data = received_plans;
    opened_plan = data[index];
    opened_plan_index = index;
    console.log(opened_plan);

    $("#opened_plan").text(opened_plan.name);

    $('#price_per_km_input').bind('input', function () {
      var charge = ($(this).val());
      $("#base_amount_input").val(charge * opened_plan.kms_charged);
      update_plan_total_min_price(get_base_fare(), get_allowance_fare(), 0);
    });

    $('#allowance_amt_input').bind('input', function () {
      update_plan_total_min_price(get_base_fare(), get_allowance_fare(), 0);
    });


    $("#plan_alloted_kms").val(opened_plan.alloted_kms);
    $("#plan_charged_kms").val(opened_plan.kms_charged);
    $("#parent-plan-name-input").val(opened_plan.name);

    setup_vehicle_view();
  }
}

var booking = {};
var booking_date_set = [];
var booking_time_set = [];
var booking_time_set_display = [];
booking.station_is = "Pickup";

function select_station_pickup() {
  booking.station_is = "Pickup";
  console.log(booking);
  $("#account_type_layout").fadeOut("def", function () {
    $("#station_selection").fadeIn("slow");
  });
}

function select_station_destination() {
  booking.station_is = "Destination";
  console.log(booking);
  $("#new_account_label").text("ड्रॉप उप का स्टेशन चुने |");
  $("#account_type_layout").fadeOut("def", function () {
    $("#station_selection").fadeIn("slow");
  });
}

function register_car_number() {
  if ($("#car_number").val() == "") {
    alert("Enter Car Number");
    $("#car_number").focus();
  } else {
    var car = partner_profile.cars[0];
    car.car_number = $("#car_number").val();
    partner_profile.cars[0] = car;
    console.log("Car Number Added", partner_profile);
    $("#car_details_layout").fadeOut("def", function () {
      $("#connect_driver_account_layout").fadeIn("slow");
      $("#new_account_sub_label").text("Enter Car & Driver Details");
    });
  }
}

function profile_submitted() {
  if (account_details_valid()) {
    $("#account_details_layout").fadeOut("def", function () {
      $("#select_car_model").fadeIn("slow");
      $("#new_account_sub_label").text("Select Car Model");
    });
  }
}

function driver_details_added_by_owner() {
  if (owner_added_driver_account_details_valid()) {
    $("#new_account_layout").fadeOut("def", function () {
      $("#confirmation_layout").fadeIn("slow");
    });
  }
}

function owner_added_driver_account_details_valid() {
  if ($("#driver_name").val() == "") {
    alert("Enter Driver Name");
    $("#driver_name").focus();
    return false;
  } else {
    var car = partner_profile.cars[0];
    car.driver_name = $("#driver_name").val();
    car.driver_status = "Not Verified";
    partner_profile.cars[0] = car;
    console.log("Driver  Name Added", partner_profile);
  }

  if ($("#driver_mobile").val().length != 10) {
    alert("Enter Valid Mobile Number");
    $("#email").focus();
    return false;
  } else {
    var car = partner_profile.cars[0];
    car.driver_number = $("#driver_mobile").val();
    car.driver_mobile_verification = "Not Verified";
    partner_profile.cars[0] = car;
    console.log("Driver Number Added", partner_profile);
  }

  return true;
}

function account_details_valid() {
  if ($("#name").val() == "") {
    alert("Enter Name");
    $("#name").focus();
    return false;
  } else {
    partner_profile.name = $("#name").val();
    console.log("Name Added", partner_profile);
  }

  if ($("#email").val() == "") {
    alert("Enter Email Address");
    $("#email").focus();
    return false;
  } else {
    partner_profile.email = $("#email").val();
    console.log("Email Added", partner_profile);
  }
  return true;
}

function go_to_account() {
  window.location.href = "../cab-booking/modules/account/index.html";

  //if(partner_profile.type='')
  {
  }
}