function call_main_menu() {
  $("#main_menu").modal("toggle");
}

function become_a_partner_click() {}

function access_partner_account() {
  if (is_logged_in()) {
  } else {
    window.location.href = "../cab-booking/onboarding.html";
  }
}

function is_logged_in() {
  return false;
}

$(document).ready(function () {
  displaySpecialPackages();
});

function displaySpecialPackages() {
  $.ajax({
    url: "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllPackages",
    method: "POST",
    success: function (response) {
      alert("Successfully Received;");
      console.log(
        "https://us-central1-gadigoda-dfc26.cloudfunctions.net/getAllPackages",
        response
      );
      received_plans = response;
      var data = response;
      //console.log('storage', data);
      var items = [];

      
         
        $.each(data, function (i, package) {
            if (package.special_plan) {

          
            var li =
              '<div class="package-container comm-ml">' +
              '<div class="img-container">' +
              " <img src=" +
              '"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/99/ae/7f/images-14-largejpg.jpg?w=600&h=400&s=1"/>' +
              '<div class="rate">' +
              "4.6" +
              "</div>" +
              " </div>" +
              ' <div class="card--content">' +
              '<div class="startloc--droploc">' +
              package.pickup_location +
              " →" +
              package.drop_location +
              "</div>" +
              '<div class="date">' +
              "Date:-" +
              package.date_1 +
              "</div>" +
              '<div class="price">' +
              "Price:- " +
              package.price +
              "</div>" +
              "</div>" +
              '<div class="action">View More →</div>' +
              " </div>";

            items.push(li);
          
        }
        });
      
      document.getElementsByClassName("list-h").innerHTML = "";
      $(".list-h").append(items.join(""));
    },

    error: function () {
      alert("error");
    },
  });
}
