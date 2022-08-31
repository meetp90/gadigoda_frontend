var price=0;
var cart = {};
function updatelocalstorage(i, incartcount) {
  var old = localStorage.getItem("cart_item");
  console.log(old)
  old = old ? JSON.parse(old) : [];

  old[i].count = incartcount;
  console.log(old[i].count);
  localStorage.setItem("cart_item", JSON.stringify(old));
}

function removeitem(i) {
  var old = localStorage.getItem("cart_item");
  old = old ? JSON.parse(old) : [];
  old.splice(i, 1);
  console.log(old);
  localStorage.setItem("cart_item", JSON.stringify(old));
  location.reload(true);
}

function removecabitem(i) {
  var old = localStorage.getItem("cart_cab_item");
  old = old ? JSON.parse(old) : [];
  old.splice(i, 1);
  console.log(old);
  localStorage.setItem("cart_cab_item", JSON.stringify(old));
  location.reload(true);
}
function minus(i) {
  var count = $("#num" + i).val() - 1;
  count = count < 1 ? 1 : count;
  $("#num" + i).val(count);
  // alert(count);
  $("#num" + i).change();
  if (count) {
    updatelocalstorage(i, count);
  }
  return false;
}

function plus(i) {
  var count = $("#num" + i).val();
  count++;
  $("#num" + i).val(count);
  $("#num" + i).change();

  if (count) {
    updatelocalstorage(i, count);
  }
  return false;
}

$(document).ready(function () {

   //For displaying products in Cart
  var cart_item = localStorage.getItem("cart_item");
  console.log(cart_item);
  items = [];

  data = JSON.parse(cart_item);
  if (data) {
    data?.forEach(function (cart_item, i) {

      if (cart_item.isDeleted) {
      } else {
 
        var htmlcode =
          "<div class='con2'>" +
          '<div class="con7">' +
          '<div class="imgcon">' +
          "<img class='img_food' src=" +
          cart_item.media +
          " " +
          "/>" +
          "</div>" +
          '<div class="btns">' +
          ' <div class="ordernow">' +
          ' <button class="ordernowbtn" >' +
          "ORDER NOW" +
          "</button>" +
          " </div>" +
          ' <div class="combobox" id="box' +
          i +
          '">' +
          '<div class="number">' +
          '<button class="minus" onclick="minus(' +
          i +
          ')">' +
          "-" +
          "</button>" +
          '<input type="text" id="num' +
          i +
          '" value="' +
          cart_item.count +
          '"/>' +
          '<button class="plus" onclick="plus(' +
          i +
          ')">' +
          "+" +
          "</button>" +
          "</div>" +
          "</div>" +
          ' <div id="removebtn" >' +
          '<button class="removebtn" onclick="removeitem(' +
          i +
          ')">' +
          "REMOVE" +
          "</button>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="con3">' +
          ' <div class="con4">' +
          ' <div id="title-thali"><b>' +
          cart_item.name +
          "</b></div>" +
          "</div>" +
          '<div class="con5">' +
          ' <div id="price"><b>' +
          "₹" +
          cart_item.price +
          "</b></div>" +
          '<div id="mrp">' +
          cart_item.mrp +
          "</div>" +
          "</div>" +
          '<div id="items">' +
          "2 Chapati, 1 Mix Veg, 1 Dal Fry, 1 Jeera Rice, Salad, Pickle" +
          " </div>" +
          '<div class="con6">' +
          ' <div class="rating">' +
          ' <img class="star" src="star.png" />' +
          '<div id="number">4.5</div>' +
          "</div>" +
          '<div class="time">' +
          '<img class="clock" src="clock.png" />' +
          '<div id="mins">' +
          cart_item.delay +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
        price = price + parseInt(cart_item.price*cart_item.count);
        items.push(htmlcode);
      }
    });
  }

  document.querySelector(".cartitems").innerHTML = "";
  $(".cartitems").append(items.join(""));
  $(".cartitems").show();



  //For displaying Cabs in Cart
  var cab_bookings = localStorage.getItem("cart_cab_item");
  //console.log(cab_bookings);
  console.log(cart_item);
  var cab_items = [];
  var htmlcode_cab = "";
  data = JSON.parse(cab_bookings);
  if (data) {
    data?.forEach(function (cab_bookings, i) {
      if (cab_bookings.isDeleted) {
      } else {
        htmlcode_cab =
          '<div class="car-block">' +
          '<div class="car-details">' +
          '<div class="car-image">' +
          '<img class="img-fluid" src="../public/cab-booking/assets/' +
          cab_bookings.carimage +
          '">' +
          "</div>" +
          '<div class="carnamecontainer">' +
          '<div class="car-name">' +
          cab_bookings.noofseats +
          " Seater" +
          "</div>" +
          '<div class="car-sub-name" id="car-sub-name-0">' +
          cab_bookings.carsubname +
          "</div>" +
          "</div>" +
          '  <div class="cab_price">' +
          '<div class="car-fare" id="car-far-0"><b>₹' +
          cab_bookings.price +
          "</b></div>" +
          '    <div><button class="removebtncab" onclick="removecabitem(' +
          i +
          ')"' +
          ">REMOVE</button></div>" +
          "  </div>" +
          "  </div>" +
          '<div class="start_end_location"><b>' +
          cab_bookings.station +
          "</b></div>" +
          '<div class="date_and_time">' +
          '<div class="date">' +
          cab_bookings.pickup_date +
          "</div>" +
          '<div class="time"><img class="clock" src="clock.png">' +
          cab_bookings.pickup_time +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
          console.log("cab booking"+  i+"price "+cab_bookings.price )
          price+=parseInt(cab_bookings.price);
          
        cab_items.push(htmlcode_cab);
      }
    });
  }
  
  document.querySelector(".cab_bookings").innerHTML = "";
  $(".cab_bookings").append(cab_items.join(""));
  $(".cab_bookings").show();
  console.log(price);


 var htmlcode_checkout='<button class="checkout-button" onclick="createCart()">'+'<div>Checkout </div><div>₹ '+price+'</div></button>'
 document.querySelector('.checkout').innerHTML = htmlcode_checkout;
 $(".checkout").show();  
});



function addingcustdetails() {
  //storing the items from local storage cart_item to local storage cart(for products)
  var old = localStorage.getItem("cart_item");
  console.log(old)
  old = old ? JSON.parse(old) : [];
  var products = [];
  var details = new Array(old.length);

  for (var i = 0; i < old.length; i++) {
    details[i] = {
      type: "",
      id: "",
      quantity: "",
      name:""
    };
  }

  for (var i = 0; i < old.length; i++) {
    details[i].type = old[i].type;
    details[i].id = old[i].id;
    details[i].quantity = old[i].count;
    details[i].name = old[i].name;
    console.log(details[i]);
    details.push(details[i]);
    products[i] = details[i];
    console.log(products);
  } 

 
 
  //storing the items from local storage cart_cab_item to local storage cart(for cab_bookings)
 
  var bookings = [];
  var old = localStorage.getItem("cart_cab_item");
  var details = new Array(old.length);
  old = old ? JSON.parse(old) : [];
  console.log(old)
  for (var i = 0; i < old.length; i++) {
    details[i] = {
      type: "",
      id: "",
      quantity: "",
    };
  }
  for (var i = 0; i < old.length; i++) {
    details[i].type = "Cab";
    details[i].id = old[i].selected_plan.id;
    details[i].quantity = "1";
    console.log(details[i]);
    details.push(details[i]);
    bookings[i] = details[i];
    console.log(bookings);
  }
  products=products.concat(bookings); 
  cart.items = products;
  console.log("yeh hai products: ",products)
  localStorage.setItem("cart", JSON.stringify(cart));

  // const cart = {
  //   items: [{
  //       type: 'cab|food|accessories',
  //       quantity: 0,
  //       id : Product_Item.id,
  //   }],
  //   user: '',
  //   coupon: '',
  //   location: '',
  //   trainDetails: {}
  // }
}
function createCart() {
  //storing user details in cart
  cart.id="ftb687678";
  cart.user = "Meet";
  cart.coupon = 123456;
  cart.location = "Powai";
  cart.trainDetails = {};

  cart.user ?  addingcustdetails(): alert("Please login to continue");
  // var cart = localStorage.getItem("cart");
  console.log(cart)
  $.ajax({
    url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/createCart",
    method: "POST", //First change type to method here
    data: cart,
    success: function (response) {
      console.log(
        "https://us-central1-gadigoda-dfc26.cloudfunctions.net/createCart",
        response
      );
    },
    error: function () {
      alert("error");
    },
  });
  summary_page_action();
}




//login


var user = { loggedIn: false };
function isLoggedIn() {
  if (user.loggedIn) {
    return true;
  } else return false;
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

function make_payment() {}

//login
function login_now() {
  if (otp_sent) {
    console.log($("#login_otp_input").val().length);
    if ($("#login_otp_input").val().length == 6) {
      verifyOTP();
    } else {
      alert("Invalid OTP");
      $("#login_otp_input").focus();
    }
  } else if (register_activated) {
    user.loggedIn = true;
    var data = $("#login_form")
      .serializeArray()
      .reduce(function (obj, item) {
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
      $("#login_modal").modal("hide");
      populate_summary_view();
      $("#plan_summary_modal").modal();
    } else if (proceed) {
      $("#login_modal").modal("hide");
      $("#loader_layout").modal();
      $.ajax({
        url: "https://api.postalpincode.in/pincode/" + data.pincode,
        success: function (response) {
          //console.log(response);
          $("#loader_layout").modal("hide");
          var postoffices = [];
          postoffices = response[0].PostOffice;
          console.log(postoffices);
          if (postoffices.length < 2) {
            user.region = postoffices[0].District;
            user.state = postoffices[0].State;
            user.location_object = postoffices[0];
            $("#area_view").val(
              postoffices[0].Name + ", " + postoffices[0].District
            );
            $("#region_layout").show();
            $("#login_modal").modal();
          } else {
            $("#list_view_modal_title").text(
              "Select Area / अपना  एरिया सेलेक्ट करे "
            );
            var items = [];
            var ul = document.getElementById("list_view_modal_list");
            document.getElementById("list_view_modal_list").innerHTML = '';
            for (var i = 0; i < postoffices.length; i++) {
              var li = document.createElement("li");
              li.className = "list-group-item";
              li.appendChild(
                document.createTextNode(
                  postoffices[i].Name + ", " + postoffices[i].District
                )
              );
              ul.appendChild(li);
            }
            $("#list_view_modal_list li").click(function () {
              var index = [$(this).index()];
              user.region = postoffices[index].District;
              user.state = postoffices[index].State;
              user.location_object = postoffices[index];
              $("#area_view").val(
                postoffices[index].Name + ", " + postoffices[index].District
              );
              $("#region_layout").show();
              $("#list_view_modal").modal("hide");
              $("#login_modal").modal();
            });
            $("#list_view_modal").modal();
          }

          if (false) {
            user.name = data.name;
            user.number = data.number;
            user.email = data.email;
            $("#login_modal").modal("hide");
            populate_summary_view();
            $("#plan_summary_modal").modal();
          }
        },
        error: function () {
          $("#loader_layout").modal("hide");
          alert("error");
        },
      });
    }
  } else {
    if ($("#login_mobile_number_input").val().length == 10) {
      user.number = $("#login_mobile_number_input").val();
      sendOTP();
    } else {
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
  $("#login_modal").modal("hide");
  $("#loader_layout").modal();
  $.ajax({
    url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/sendOTP",
    method: "POST",
    data: data_packet,
    success: function (response) {
      $("#login_modal").modal();
      $("#loader_layout").modal("hide");
      console.log(
        "https://us-central1-gadigoda-dfc26.cloudfunctions.net/sendOTP",
        data_packet,
        response
      );
      $("#login_page_label").text(
        "Verify Mobile Number / मोबाइल नंबर वेरीफाई करे "
      );
      $("#otp_layout").show();
      $("#login_otp_input").focus();
      otp_sent = true;
      $("#login_page_action_button").text("VERIFY OTP");
    },
    error: function () {
      alert("error");
      $("#loader_layout").modal("hide");
    },
  });
}

var register_activated = false;
function verifyOTP() {
  var already_a_user = false;
  var otp = $("#login_otp_input").val();
  //ajax call
  if (already_a_user) {
  } else {
    otp_sent = false;
    register_activated = true;

    $("#otp_layout").hide();
    $("#login_page_action_button").text("PROCEED");
    $("#login_mobile_number_input").attr("readonly", "readonly");
    alert("Welcome to Gadigoda / गाडीगोडा में आपका स्वागत है ");
    $("#login_modal_header").text(
      "Complete your Profile / अपनी प्रोफाइल पूरी कीजिए "
    );
    $(".register_variable").show();
    $("#login_name").focus();
  }
}

var login_cities_populated = false;
function populate_cities() {
  if (login_cities_populated) {
    var items = [];
    for (var i = 0; i < cities.length; i++) {
      items.push(
        '<option name="' +
          i +
          '" data-subtext="' +
          cities[i].state +
          '">' +
          cities[i].name +
          "</option>"
      );
    }
    document.getElementById("register_city_select").innerHTML = "";
    $("#register_city_select").append(items.join(""));
    $("#register_city_select").selectpicker();
    login_cities_populated = true;
  }

  $("#login_modal").modal();
}

function check_summary_view_scroll(e) {
  var elem = $(e.currentTarget);
  console.log(elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight());
  if (elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()) {
    alert("Hit Bottom");
    $("#summary_page_action_button").removeClass(
      "summary_page_action_button_inactive"
    );
    $("#summary_page_action_button").addClass(
      "summary_page_action_button_active"
    );
  }
}

function summary_page_action() {
  if (
    $("#summary_page_action_button").hasClass(
      "summary_page_action_button_inactive"
    )
  ) {
  } else {
    if (isLoggedIn()) {
      var options = {
        key: "rzp_live_WjbZygz4PwOqo3",
        amount:
          booking.selected_plan.selected_vehicle_plan.payable_post_discount_booking_amount,
        name: "Gadigoda.com",
        reference_id: booking.booking_id,
        description:
          "Mobility for Bharat. Payment for Booking ID no #" +
          booking.booking_id,
        image:
          "https://gadigoda-dfc26.web.app/cab-booking/assets/sports-car.svg", // COMPANY LOGO
        handler: function (response) {
          console.log(response);
          //razorpay_payment_id
        },
        customer: {
          name: user.name,
          contact: user.number,
          email: user.email,
        },
        notify: {
          sms: true,
          email: true,
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.number,
        },
        notes: {
          address: user.city,
        },
        theme: {
          color: "#FFCD02", // screen color
        },
      };
      //console.log(options);
      console.log("Moving to Payment", booking);
      var propay = new Razorpay(options);
      propay.open();
    } else {
      $("#plan_summary_modal").modal("hide");
      $("#login_modal").modal();
    }
  }
}
