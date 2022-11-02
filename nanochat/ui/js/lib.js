// $(function () {

// function calcDate(date1, date2) {
//   var diff = Math.floor(date1.getTime() - date2.getTime());
//   var day = 1000 * 60 * 60 * 24;
//   var days = Math.floor(diff / day);
//   var months = Math.floor(days / 31);
//   var years = Math.floor(months / 12);
//   var message = date2.toDateString();
//   message += days + " days ";
//   message += months + " months ";
//   message += years + " years ago \n";
//   return message;
// }



const baseURL = "";
const currentUserID = localStorage.getItem("seession");
const sid = localStorage.getItem("sid");

// get all jots
function get_all_jots() {
  let requestURL = baseURL + "/v1/jots";
  $.get(requestURL, function (response, status) {
    if (status == "success") {
      data = response;
      var jotHTML = "";
      $.each(data.items, function (index, jot) {
        let jotID = jot.id;
        let handle = jot.handle;
        let jotLikes = jot.likes;
        let jotMessage = jot.message;
        let userID = jot.userId;

        jotHTML +=
          '<div class="single-tweet d-flex" data-tweet-id="' +
          jotID +
          '">' +
          '                  <div class="single-tweet--tweet-profile-icon">' +
          '                    <img src="./images/profile.jpg" />' +
          "                  </div>" +
          '                  <div class="single-tweet--tweet-content">' +
          "                    <div" +
          '                      class="tweet-head d-flex align-items-center justify-content-between"' +
          "                    >" +
          '                      <div class="tweet-head--left d-flex align-items-center">' +
          '                        <h4 class="mb-0">' + handle + '</h4>' +
          '                        <div class="profile-premium">' +
          "                          <img" +
          '                            src="./images/icons/circle-check.svg"' +
          '                            width="16"' +
          "                          />" +
          "                        </div>" +
          '                        <div class="tweet-username">@' +
          handle +
          "</div>" +
          '                        <div class="time-sprator">-</div>' +
          '                        <div class="tweet-time">4h</div>' +
          "                      </div>" +
          '                      <div class="tweet-actions">' +
          '                        <div class="dropdown">' +
          '                          <div data-bs-toggle="dropdown">' +
          '                            <div class="dropdown">' +
          '                              <div data-bs-toggle="dropdown">' +
          '                                <img src="./images/icons/more.svg" width="12" />' +
          "                              </div>" +
          '                              <ul class="dropdown-menu">' +
          "                                <li>" +
          "                                  <a" +
          '                                    href="#"' +
          '                                    class="dropdown-item delete-tweet"' +
          '                                    data-tweet-id="1"' +
          "                                    >Delete</a" +
          "                                  >" +
          "                                </li>" +
          "                                <li>" +
          '                                  <a class="dropdown-item" href="#"' +
          "                                    >Another action</a" +
          "                                  >" +
          "                                </li>" +
          "                              </ul>" +
          "                            </div>" +
          "                          </div>" +
          '                          <ul class="dropdown-menu">' +
          "                            <li>" +
          "                              <a" +
          '                                href="#"' +
          '                                class="dropdown-item delete-tweet"' +
          '                                data-tweet-id="1"' +
          "                                >Delete</a" +
          "                              >" +
          "                            </li>" +
          "                            <li>" +
          '                              <a class="dropdown-item" href="#"' +
          "                                >Another action</a" +
          "                              >" +
          "                            </li>" +
          "                          </ul>" +
          "                        </div>" +
          "                      </div>" +
          "                    </div>" +
          "" +
          '                    <div class="tweet-description">' +
          jotMessage +
          "                    </div>" +
          "" +
          '                    <div class="tweet-footer">' +
          "                      <div" +
          '                        class="tweet-reactions d-flex justify-content-between"' +
          "                      >" +
          '                        <div class="tweet-reaction comment-tweet">' +
          // '                          <div class="mr-75">' +
          // '                            <img src="./images/icons/comment.svg" />' +
          // "                          </div>" +
          // "                          <span>363</span>" +
          "                        </div>" +
          "" +
          '                        <div class="tweet-reaction comment-tweet">' +
          // '                          <div class="mr-75">' +
          // '                            <img src="./images/icons/retweet.svg" />' +
          // "                          </div>" +
          // "                          <span>10.9k</span>" +
          "                        </div>" +
          "" +
          '                        <div class="tweet-reaction like-tweet">' +
          '                          <div class="mr-75">' +
          '                            <img src="./images/icons/heart.svg" />' +
          "                          </div>" +
          "                          <span>" +
          jotLikes +
          "</span>" +
          "                        </div>" +
          "" +
          '                        <div class="tweet-reaction comment-tweet">' +
          '                          <div class="mr-75">' +
          '                            <img src="./images/icons/share.svg" />' +
          "                          </div>" +
          "                        </div>" +
          "                      </div>" +
          "                    </div>" +
          "                  </div>" +
          "                </div>";
      });
      $("#tweetsWrapper").append(jotHTML);
    }
  });
}

get_all_jots();

// get Jot by id
function get_jot_by_id(jotID) {
  let requestURL = baseURL + "/v1/jots" + jotID;
  $.get(requestURL, function (response, status) {
    if (status == "success") {
      jot = response;
      let jotID = jot.id;
      let jotLikes = jot.likes;
      let jotMessage = jot.message;
      let userID = jot.userID;
    }
  });
}

//post a jot
$("#postJot").submit(function (event) {
  event.preventDefault();
  let jotMessage = $("[name='description']").val();
  let requestURL = baseURL + "/v1/jots";
  var settings = {
    url: requestURL,
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      message: jotMessage,
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    $("#newTweet").modal("hide");
  });
});

//   Delete a jot
$(document).on("click", ".delete-tweet", function (event) {
  event.preventDefault();
  let jotID = $(this).data("tweet-id");
  let requestURL = baseURL + "/v1/jots/" + jotID;
  var settings = {
    url: requestURL,
    method: "DELETE",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});

//   Unlike a jot
$(document).on("click", ".like-tweet", function (event) {
  event.preventDefault();
  let jotID = $(this).closest(".single-tweet").data("tweet-id");
  let requestURL = baseURL + "/v1/jots/" + jotID + "/like";
  var settings = {
    url: requestURL,
    method: "DELETE",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});

//   Like a jot
$(document).on("click", ".dislike-tweet", function (event) {
  event.preventDefault();
  let jotID = $(this).closest(".single-tweet").data("tweet-id");
  let requestURL = baseURL + "/v1/jots/" + jotID + "/like";
  var settings = {
    url: requestURL,
    method: "PUT",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});

//   Get the users that like a jot.
function get_users_by_liked(jotID) {
  let requestURL = baseURL + "/v1/jots/" + jotID + "/likes";
  $.get(requestURL, function (response, status) {
    if (status == "success") {
      data = response;
      $.each(data.items, function (user) {
        let followers = user.followers;
        let handle = user.handle;
        let userID = user.id;
      });
    }
  });
}
// });
