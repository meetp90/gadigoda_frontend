var filtercategory = "";
var received_products;
var selecteditems = [];
var arr = [];
function stringmatch(input, thali_title) {
  console.log(thali_title);
  console.log(input);
  var flag;
  for (var i = 1; i < (input.length+1); i++) {
     if (thali_title.substr(0, i) === input.substr(0, i)) {
      
      flag = 1;
    } else {
      flag = 0;
    }
  }
  return flag;
}

function call_main_menu() {
  $("#main_menu").modal("toggle");
}
//searchbar
function searchfood() {
  let input = $("#input").val();
  console.log(input);
  input = input.toLowerCase();
  console.log(input);

  $(".title-thali").each(function (i, obj) {
    
    thali_title = $(this).text().toLowerCase();
    inputString = input;

    if ((stringmatch(inputString, thali_title))) {
      console.log("yes");
    } else {
       //hiding the div
      console.log($(this).parent());
      var parent1=$(this).parent() ;
      var parent2=parent1.parent() ;
      parent2.parent().hide();
       
    }
    if($("#input").val()=='')
    {
      $('.con2').each(function(){
        $(this).show();
      })
    }
  });

  // var cart_item=localStorage.getItem('cart_item');
  // cart_itemslist = JSON.parse(cart_item);
  // for (i = 0; i < cart_itemslist.length; i++) {
  //   console.log(cart_itemslist[i])
  //     if (!cart_itemslist[i].name.toLowerCase().includes(input)) {
  //        id=cart_itemslist[i].id;
  //       $(cart_itemslist[i]).hide();
  //       element=$('#div')
  //       $('#div')
  //       console.log('nah')
  //     }
  //     else {
  //       $(cart_itemslist[i]).show();
  //       console.log('reh')

  //     }
  // }
}
function updatelocalstorage(i, incartcount) {
  var old = localStorage.getItem("cart_item");
  old = old ? JSON.parse(old) : [];
  old[i].count = incartcount;
  console.log(old[i].count);
  localStorage.setItem("cart_item", JSON.stringify(old));
}
$(".combobox").hide();
function storeInLocalStorage() {
  var old = localStorage.getItem("cart_item");
  old = old ? JSON.parse(old) : [];
  var newarr = old.concat(selecteditems);
  console.log(newarr);

  localStorage.setItem("cart_item", JSON.stringify(newarr));
}
function cart() {
  storeInLocalStorage();
  location.href = "../Food-Cart/index.html";
}
function addtocart(i, products) {
  console.log(products);
  $("#addtocartbtn" + i).hide();
  $("#box" + i).show();
  $(".cart").show();
  received_products[i].count = 1;
  received_products[i].inCart = true;
  selecteditems.push(received_products[i]);
  console.log(selecteditems);
}
function minus(i) {
  var count = $("#num" + i).val() - 1;
  count = count < 1 ? 1 : count;
  $("#num" + i).val(count);
  // alert(count);
  $("#num" + i).change();
  received_products[i].count = $("#num" + i).val();
  received_products[i].inCart = true;
  if (received_products[i].inCart) {
    incartcount = $("#num" + i).val();
    console.log(incartcount);
    updatelocalstorage(i, incartcount);
  }
  $(".cart").show();
  return false;
}

function plus(i) {
  var count = $("#num" + i).val();
  count++;
  $("#num" + i).val(count);
  $("#num" + i).change();

  received_products[i].count = $("#num" + i).val();
  id = $("#num" + i);

  received_products[i].inCart = true;
  if (received_products[i].inCart) {
    incartcount = $("#num" + i).val();
    console.log(incartcount);
    updatelocalstorage(i, incartcount);
  }
  $(".cart").show();

  // selecteditems.push(received_products[i]);
  return false;
}

$(document).ready(function () {
  var cart_item = localStorage.getItem("cart_item");
  console.log(cart_item);
  cart_itemslist = JSON.parse(cart_item);
  $.ajax({
    url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllProducts",

    method: "POST", //First change type to method here
    success: function (response) {
      alert("Successfully Received;");
      console.log(
        "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllProducts",
        response
      );
      received_products = response;
      console.log(filtercategory);
      // console.log(received_products)
      var data = response;
      function findid(id) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] == id) {
            return false;
          }
        }
        return true;
      }

      items = [];
      if (cart_itemslist) {
        cart_itemslist?.forEach(function (cart_item, i) {
          arr.push(cart_item.id);
          console.log(arr);
          if (cart_item.isDeleted) {
          } else {
            var htmlcode =
              "<div class='con2'  >" +
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
              ' <div class="ordercombobox" id="box' +
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
              "</div>" +
              "</div>" +
              '<div class="con3">' +
              ' <div class="con4">' +
              ' <div class="title-thali"><b>' +
              cart_item.name +
              "</b></div>" +
              ' <div id="percentoff" >15% Off</div>' +
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
              '<div class="availableAt">' +
              "<div>" +
              "</div>" +
              '<div class="availableAtText">' +
              cart_item.availableAt +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>";

            items.push(htmlcode);
          }
        });
      }
      if (data) {
        data?.forEach(function (products, i) {
          if (findid(products.id)) {
            if (products.isDeleted) {
            } else {
              var htmlcode =
                "<div class='con2'>" +
                '<div class="con7">' +
                '<div class="imgcon">' +
                "<img class='img_food' src=" +
                products.media +
                " " +
                "/>" +
                "</div>" +
                '<div class="btns">' +
                ' <div class="addtocart">' +
                ' <button class="addtocartbtn" id="addtocartbtn' +
                i +
                '" onclick="addtocart(' +
                i +
                ')">' +
                "ADD TO CART" +
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
                '" value="1"/>' +
                '<button class="plus" onclick="plus(' +
                i +
                ')">' +
                "+" +
                "</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                '<div class="con3">' +
                ' <div class="con4">' +
                ' <div class="title-thali"><b>' +
                products.name +
                "</b></div>" +
                ' <div id="percentoff" >15% Off</div>' +
                "</div>" +
                '<div class="con5">' +
                ' <div id="price"><b>' +
                "₹" +
                products.price +
                "</b></div>" +
                '<div id="mrp">' +
                products.mrp +
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
                products.delay +
                "</div>" +
                "</div>" +
                '<div class="availableAt">' +
                "<div>" +
                "</div>" +
                '<div class="availableAtText">' +
                products.availableAt +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";

              items.push(htmlcode);
            }
          }
        });
      }

      document.querySelector(".products").innerHTML = "";
      $(".products").append(items.join(""));
      $(".combobox").hide();
      $(".ordernowbtn").hide();
      $(".cart").hide();
      $(".products").show();
    },
    error: function () {
      alert("error");
    },
  });
});
