var partner_profile = {};
var received_plans;

function submit_mobile_number() {
  if ($("#mobile_number").val().length != 10) {
    alert("Invalid Phone Number");
    $("#mobile_number").focus();
  } else {
    partner_profile.mobile = $("#mobile_number").val();
    //console.log(partner_profile);
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

  // Removes 'onclick' property if found
  $("#date_selection_list li").prop('onclick', null).off('click');

  $("#date_selection_list li").click(function () {
    booking.pickup_date = booking_date_set[$(this).index()];
    booking.pickup_date_object = booking_date_object_set[$(this).index()];
    console.log("Date Selected", booking);

    $("#account_details_layout").fadeOut("def", function () {
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
  $("#new_account_sub_label").text(booking.pickup_date + " को  कितने बजे " + booking.pickup + "से पिक उप करे ?");
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
      $("#loader_layout").modal();
      load_packages();
    });
  }
}

function load_packages() {
  $.ajax({
    url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllPackages",
    method: "POST", //First change type to method here
    success: function (response) {
      console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllPackages", response);
      received_plans = response;

      //remove deleted plans
      received_plans = received_plans.filter(function (jsonObject) {
        return jsonObject.isDeleted != "true";
      });

      //sort plans according to kilometers alloted
      received_plans.sort((b, a) => b.alloted_kms - a.alloted_kms);

      $("#loader_layout").modal('hide');


      $("#time_selection_list_layout").fadeOut("def", function () {
        $("#select_car_model").fadeIn("slow");

        $("#new_account_label").text("अपना बुकिंग प्लान सेलेक्ट करे |");
        $("#new_account_sub_label").text(
          "किनते  सीट की गाडी ? कितने  समय के लिए ? "
        );
        //console.log("Loading Plans", received_plans);

        var items = [];
        $.each(received_plans, function (i, package) {
          //console.log(package);
          if (package.isDeleted == "true") {

          }
          else {
            var li = '<li name="' + i + '" id="' + package.id + '" class="list-group-item" style="text-align: center;padding-left: 30px;padding-right: 30px;">' +
              '<p class="plan-header">' + package.alloted_time + ' ' + package.alloted_time_unit + '</p>' +
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
          vehicles_received = received_plans[selected_package_index].plans;
          console.log('Veehicales', vehicles_received);
          //console.log(vehicles_received);
          var selected_plan = received_plans[selected_package_index];
          delete selected_plan.plans;
          booking.selected_plan = selected_plan;
          console.log("Plan Selected", booking);
          $("#plan_Selected_description_label").text(received_plans[selected_package_index].package_description);

          $("#plan_Selected_label").text(received_plans[selected_package_index].name);
          $("#car_holder").show();

          populate_vehicles_list(received_plans[selected_package_index].name);
        });
      });
    },
    error: function () {
      $("#loader_layout").modal('hide');
      alert("error");
    }
  });
}


function populate_vehicles_list(parent_plan_name) {
  var plans = vehicles_received;
  console.log('Plans ---', plans);
  //alert(plans.length + " cars in this plan");
  plans?.sort((b, a) => b.no_of_seats - a.no_of_seats)
  document.getElementById("vehicles_plan_list").innerHTML = "";
  for (var i = 0; i < plans.length; i++) {
    //console.log(opened_vehicle_plans[i]);
    var car_image = get_car_image(plans[i].selected_vehicle);
    $('#vehicles_plan_list').append
      (
        '<li class="list-group-item" data-direction="bottom" onclick="vehicle_plan_selected(' + i + ')">' +
        '<div class="car-block">' +
        '<div class="car-image">' +
        '<img class="img-fluid" src="../cab-booking/assets/' + car_image + '">' +
        '</div>' +
        '<div class="car-details">' +
        '<div class="car-name">' + plans[i].no_of_seats + ' Seater</div>' +
        '<div class="car-sub-name" id="car-sub-name-0">' + plans[i].selected_vehicle + ', ' + parent_plan_name + '.</div>' +
        '</div>' +
        '<div class="car-fare" id="car-far-0">₹ ' +
        +plans[i].plan_baseprice +
        '</div>' +
        '</div>' +
        '</li>'
      );
  }
}

var vehicles_received;
function vehicle_plan_selected(index) {
  booking.selected_plan.selected_vehicle_plan = vehicles_received[index];
  booking.selected_plan.selected_vehicle_plan.discount = 0;
  booking.selected_plan.selected_vehicle_plan.payable_post_discount = booking.selected_plan.selected_vehicle_plan.plan_baseprice;

  if (booking.selected_plan.selected_vehicle_plan.plan_baseprice > 2500) {
    $('#booking_amount_note_label').text("20% Payment of Total Booking Amount to be paid to confirm the booking.");
    booking.selected_plan.selected_vehicle_plan.payable_post_discount_booking_amount = booking.selected_plan.selected_vehicle_plan.plan_baseprice * 0.2;
  }
  else {
    $('#booking_amount_note_label').text("₹ 500 to be paid to confirm the booking.");
    booking.selected_plan.selected_vehicle_plan.payable_post_discount_booking_amount = 500;
  }

  console.log("Vehicle Plan Selected", booking);
  if (!isLoggedIn()) {
    //$("#login_modal").modal();
    populate_cities();
  }
  else {
    booking.customer = user;
    booking.customer_id = user.id;
    populate_summary_view();
    $('#plan_summary_modal').modal('show');
  }

}

function populate_summary_view() {
  $("#summary_holder").scrollTop(0);
  $("#summary_car_image").attr("src", "../cab-booking/assets/" + get_car_image(booking.selected_plan.selected_vehicle_plan.selected_vehicle));
  $("#summary_seat_label").text(booking.selected_plan.selected_vehicle_plan.no_of_seats + " Seater");
  var ac = "AC Cab";
  if (booking.selected_plan.selected_vehicle_plan.isNONAC) {
    ac = "Non AC Cab";
  };

  $("#summary_plan_overview").text(booking.selected_plan.selected_vehicle_plan.selected_vehicle + ", " + ac + ", " + booking.selected_plan.name);
  $("#pickup").text(booking.pickup);
  $("#pickup_date").text(booking.pickup_date);
  $("#pickup_time").text(booking.pickup_time);
  $("#summary_payable_booking_amount").text("₹ " + booking.selected_plan.selected_vehicle_plan.plan_baseprice);

  $("#summary_plan_name").text(booking.selected_plan.name);
  $("#summary_plan_description").text(booking.selected_plan.package_description);

  var package_notes = booking.selected_plan.selected_vehicle_plan.description.split(';');
  var ul = document.getElementById("package_terms");
  document.getElementById("package_terms").innerHTML = "";
  for (var i = 0; i < package_notes.length; i++) {
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(package_notes[i]));
    ul.appendChild(li);
  }



  $("#breakup_base_fare").text("₹ " + booking.selected_plan.selected_vehicle_plan.base_amount);
  $("#breakup_discount").text("₹ " + booking.selected_plan.selected_vehicle_plan.discount);
  $("#breakup_allowance").text("₹ " + booking.selected_plan.selected_vehicle_plan.allowance_amount);
  $("#breakup_pd_payable_fare").text("₹ " + booking.selected_plan.selected_vehicle_plan.payable_post_discount);
  $("#breakup_booking_payable_amount").text("₹ " + booking.selected_plan.selected_vehicle_plan.payable_post_discount_booking_amount);

  if (booking.selected_plan.selected_vehicle_plan.discount == 0) {
    $("#discount_li").hide();
  }
}

function scroll_to_bottom_of_summary() {
  var objDiv = document.getElementById("summary_holder");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function get_car_image(car) {
  var car_image = 'dzire.jpg';
  switch (car) {
    case "Maruti Suzuki Dzire": {
      break;
    }

    case "Maruti Suzuki Ertiga": {
      car_image = 'ertiga.jpg';
      break;
    }

    case "Toyota Innova": {
      car_image = "innova.jpg";
      break;
    }

    case "Chevrolet Tavera": {
      car_image = "travera.jpeg";
      break;
    }

    case "Force Traveller [17 Seater]": {
      car_image = "force_traveller.png";
      break;
    }

    case "Force Traveller [12 Seater]": {
      car_image = "force_traveller.png";
      break;
    }

    case "Force Toofan": {
      car_image = "toofan.webp";
      break;
    }

    case "Toyota Innova Crysta": {
      car_image = 'toyota-innova-crysta.jpeg';
      break;
    }

    case "Maruti Suzuki Omni": {
      car_image = 'omni.jpeg';
      break;
    }
  }
  return car_image;
}

function openplan(index) {
  if (received_plans) {
    alert("Opening " + index);
    var data = received_plans;
    opened_plan = data[index];
    opened_plan_index = index;
    //console.log(opened_plan);

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

function check_summary_view_scroll(e) {
  var elem = $(e.currentTarget);
  console.log(elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight());
  if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {
    alert("Hit Bottom");
    $("#summary_page_action_button").removeClass("summary_page_action_button_inactive")
    $("#summary_page_action_button").addClass("summary_page_action_button_active");
  }
}

function summary_page_action() {
  if ($("#summary_page_action_button").hasClass("summary_page_action_button_inactive")) {

  }
  else {
    if (isLoggedIn()) {
      var options =
      {
        "key": "rzp_live_WjbZygz4PwOqo3",
        "amount": booking.selected_plan.selected_vehicle_plan.payable_post_discount_booking_amount,
        "name": "Gadigoda.com",
        "reference_id": booking.booking_id,
        "description": "Mobility for Bharat. Payment for Booking ID no #" + booking.booking_id,
        "image": "https://gadigoda-dfc26.web.app/cab-booking/assets/sports-car.svg",// COMPANY LOGO
        "handler": function (response) {
          console.log(response);
          //razorpay_payment_id
        },
        "customer": {
          "name": user.name,
          "contact": user.number,
          "email": user.email,
        },
        "notify": {
          "sms": true,
          "email": true
        },
        "prefill": {
          "name": user.name,
          "email": user.email,
          "contact": user.number,
        },
        "notes": {
          "address": user.city
        },
        "theme": {
          "color": "#FFCD02" // screen color
        }
      };
      //console.log(options);
      console.log("Moving to Payment", booking);
      var propay = new Razorpay(options);
      propay.open();
    }
    else {
      $("#plan_summary_modal").modal('hide');
      $("#login_modal").modal();
    }
  }
}

var user = { loggedIn: false };
function isLoggedIn() {
  if (user.loggedIn) {
    return true;
  }
  else return false;
}

var booking = {};
var booking_date_set = [];
var booking_date_object_set = [];
var booking_time_set = [];
var booking_time_set_display = [];
booking.station_is = "Pickup";

function select_station_pickup() {
  booking.station_is = "Pickup";
  console.log("Station Selected", booking);
  $("#account_type_layout").fadeOut("def", function () {
    $("#station_selection").fadeIn("slow");
  });
}

function select_station_destination() {
  booking.station_is = "Destination";
  console.log("Station Selected", booking);
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


function make_payment() {
}


//login 
function login_now() {
  if (otp_sent) {
    console.log($("#login_otp_input").val().length);
    if ($("#login_otp_input").val().length == 6) {
      verifyOTP();
    }
    else {
      alert("Invalid OTP");
      $("#login_otp_input").focus();
    }
  }
  else if (register_activated) {
    user.loggedIn = true;
    var data = $('#login_form').serializeArray().reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});

    var proceed = true;
    if (!data.name) {
      proceed = false;
      alert("Invalid Name");
    }

    if (data.pincode.length != 6) {
      proceed = false;
      alert("Invalid Pincode");
    }

    if (user.location_object) {
      $("#login_modal").modal('hide');
      populate_summary_view();
      $("#plan_summary_modal").modal();
    }
    else if (proceed) {
      $("#login_modal").modal('hide');
      $("#loader_layout").modal();
      $.ajax({
        url: "https://api.postalpincode.in/pincode/" + data.pincode,
        success: function (response) {
          //console.log(response);
          $("#loader_layout").modal('hide');
          var postoffices = [];
          postoffices = response[0].PostOffice;
          console.log(postoffices);
          if (postoffices.length < 2) {
            user.region = postoffices[0].District;
            user.state = postoffices[0].State;
            user.location_object = postoffices[0];
            $("#area_view").val(postoffices[0].Name + ", " + postoffices[0].District);
            $("#region_layout").show();
            $("#login_modal").modal();
          }
          else {
            $("#list_view_modal_title").text("Select Area / अपना  एरिया सेलेक्ट करे ");
            var items = [];
            var ul = document.getElementById("list_view_modal_list");
            document.getElementById("list_view_modal_list").innerHTML = "";
            for (var i = 0; i < postoffices.length; i++) {
              var li = document.createElement("li");
              li.className = "list-group-item";
              li.appendChild(document.createTextNode(postoffices[i].Name + ", " + postoffices[i].District));
              ul.appendChild(li);
            }
            $("#list_view_modal_list li").click(function () {
              var index = [$(this).index()];
              user.region = postoffices[index].District;
              user.state = postoffices[index].State;
              user.location_object = postoffices[index];
              $("#area_view").val(postoffices[index].Name + ", " + postoffices[index].District);
              $("#region_layout").show();
              $("#list_view_modal").modal('hide');
              $("#login_modal").modal();
            });
            $("#list_view_modal").modal();
          }

          if (false) {
            user.name = data.name;
            user.number = data.number;
            user.email = data.email;
            $("#login_modal").modal('hide');
            populate_summary_view();
            $("#plan_summary_modal").modal();
          }
        },
        error: function () {
          $("#loader_layout").modal('hide');
          alert("error");
        }
      });
    }

  }
  else {
    if ($("#login_mobile_number_input").val().length == 10) {
      user.number = $("#login_mobile_number_input").val();
      sendOTP();
    }
    else {
      alert("Invalid Mobile Number");
      $("#login_mobile_number_input").focus();
    }
  }
}

var otp_sent = false;
function sendOTP() {
  //ajax call
  var data_packet = {};
  data_packet.phoneNumber = user.number;
  $("#login_modal").modal('hide');
  $("#loader_layout").modal();
  $.ajax({
    url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/sendOTP",
    method: "POST",
    data: data_packet,
    success: function (response) {
      $("#login_modal").modal();
      $("#loader_layout").modal('hide');
      console.log("https://us-central1-gadigoda-dfc26.cloudfunctions.net/sendOTP", data_packet, response);
      $("#login_page_label").text("Verify Mobile Number / मोबाइल नंबर वेरीफाई करे ");
      $("#otp_layout").show();
      $("#login_otp_input").focus();
      otp_sent = true;
      $("#login_page_action_button").text("VERIFY OTP");
    },
    error: function () {
      alert("error");
      $("#loader_layout").modal('hide');
    }
  });

}


var register_activated = false;
function verifyOTP() {
  var already_a_user = false;
  var otp = ($("#login_otp_input").val());
  //ajax call
  if (already_a_user) {

  }
  else {
    otp_sent = false;
    register_activated = true;

    $("#otp_layout").hide();
    $("#login_page_action_button").text("PROCEED");
    $("#login_mobile_number_input").attr("readonly", 'readonly');
    alert("Welcome to Gadigoda / गाडीगोडा में आपका स्वागत है ");
    $("#login_modal_header").text("Complete your Profile / अपनी प्रोफाइल पूरी कीजिए ");
    $(".register_variable").show();
    $("#login_name").focus();
  }
}

var login_cities_populated = false;
function populate_cities() {
  if (login_cities_populated) {
    var items = [];
    for (var i = 0; i < cities.length; i++) {
      items.push('<option name="' + i + '" data-subtext="' + cities[i].state + '">' + cities[i].name + '</option>');
    }
    document.getElementById("register_city_select").innerHTML = "";
    $('#register_city_select').append(items.join(''));
    $('#register_city_select').selectpicker();
    login_cities_populated = true;
  }

  $("#login_modal").modal();
}