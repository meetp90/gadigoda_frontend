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
        if (package.isDeleted) {
        } else {
          var li =
            '<div class="list-h">' +
            ' <div class="package-container comm-ml">' +
            '<div class="title">Package - Name</div>' +
            ' <div class="price">' +
            "<span>" +
            "₹" +
            "11,000" +
            "</span>" +
            "₹7,000" +
            "</div>" +
            '<div class="desc">' +
            "Lots of description to describe thing about something which decribes itself but we add more to it just for enjoyment." +
            "</div>" +
            '<div class="action">' +
            "View More → " +
            "</div>" +
            " </div>" +
            " </div>";
          items.push(li);
        }
      });
      document.getElementsByClassName("list-container").innerHTML = "";
      $(".list-container").append(items.join(""));
    },

    error: function () {
      alert("error");
    },
  });
}
