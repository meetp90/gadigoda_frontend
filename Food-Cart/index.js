function updatelocalstorage(i, incartcount) {
  var old = localStorage.getItem("cart_item");
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

        items.push(htmlcode);
      }
    });
  }

  document.querySelector(".cartitems").innerHTML = "";
  $(".cartitems").append(items.join(""));
  $(".cartitems").show();



  //For displaying Cabs in Cart
  var cab_bookings = localStorage.getItem("cart_cab_item");
  console.log(cab_bookings);
  console.log(cart_item);
  var cab_items = [];
  var htmlcode_cab = "";
  data = JSON.parse(cab_bookings);
  if (data) {
    data?.forEach(function (cab_bookings, i) {
      console.log(cab_bookings[i]);
      if (cart_item.isDeleted) {
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

        cab_items.push(htmlcode_cab);
      }
    });
  }
  document.querySelector(".cab_bookings").innerHTML = "";
  $(".cab_bookings").append(cab_items.join(""));
  $(".cab_bookings").show();
});


function addingcustdetails() {
  //storing the items from local storage cart_item to local storage cart(for products)
  var old = localStorage.getItem("cart_item");
  old = old ? JSON.parse(old) : [];
  var cart = {};
  const products = [];
  var details = new Array(old.length);

  for (var i = 0; i < old.length; i++) {
    details[i] = {
      type: "",
      id: "",
      quantity: "",
    };
  }

  for (var i = 0; i < old.length; i++) {
    details[i].type = "Food";
    details[i].id = old[i].id;
    details[i].quantity = old[i].count;
    console.log(details[i]);
    details.push(details[i]);
    products[i] = details[i];
    console.log(products);
  }

  cart.items = products;
  cart.user = "Meet";
  cart.coupon = 123456;
  cart.location = "Powai";
  cart.trainDetails = {};
  console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));

  //storing the items from local storage cart_cab_item to local storage cart(for cab_bookings)
  var bookings = [];
  var old = localStorage.getItem("cart_cab_item");
  old = old ? JSON.parse(old) : [];
  bookings = old;
  console.log(bookings);
  var cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];
  cart.cab_bookings = bookings;

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
  addingcustdetails();
  var cart = localStorage.getItem("cart");
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
}
