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

function redirect_to_login() {
  var mycookies = document.cookie;
  if (mycookies.match(/sid=(\S*)/) == null) {
    window.location.replace("http://" + window.location.host + "/index.html");
  }

  get_loggedin_user();
  get_all_jots();
}

function redirect_to_home() {
  var mycookies = document.cookie;
  if (mycookies.match(/sid=(\S*)/)[1] !== null && window.location.pathname != "/home.html") {
    window.location.replace("http://" + window.location.host + "/home.html");
  }
}

// get all jots
function get_all_jots() {
  let requestURL = "/v1/jots";
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
          '                <div class="single-chat d-flex" data-chat-id="' +
          jotID +
          '">' +
          '                  <div class="single-chat--chat-profile-icon">' +
          '                    <img src="./images/profile.jpg" />' +
          "                  </div>" +
          '                  <div class="single-chat--chat-content">' +
          "                    <div" +
          '                      class="chat-head d-flex align-items-center justify-content-between"' +
          "                    >" +
          '                      <div class="chat-head--left d-flex align-items-center">' +
          '                        <h4 class="mb-0">' + handle + '</h4>' +
          '                        <div class="profile-premium">' +
          "                          <img" +
          '                            src="./images/icons/circle-check.svg"' +
          '                            width="16"' +
          "                          />" +
          "                        </div>" +
          '                        <div class="chat-username">@' +
          handle +
          "</div>" +
          '                        <div class="time-sprator">-</div>' +
          '                        <div class="chat-time">4h</div>' +
          "                      </div>" +
          '                      <div class="chat-actions">' +
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
          '                                    class="dropdown-item delete-chat"' +
          '                                    data-chat-id="' + jotID + '"' +
          "                                    >Delete</a" +
          "                                  >" +
          "                                </li>" +
          // "                                <li>" +
          // '                                  <a class="dropdown-item" href="#"' +
          // "                                    >Another action</a" +
          // "                                  >" +
          // "                                </li>" +
          "                              </ul>" +
          "                            </div>" +
          "                          </div>" +
          '                          <ul class="dropdown-menu">' +
          "                            <li>" +
          "                              <a" +
          '                                href="#"' +
          '                                class="dropdown-item delete-chat"' +
          '                                data-chat-id="' + jotID + '"' +
          "                                >Delete</a" +
          "                              >" +
          "                            </li>" +
          // "                            <li>" +
          // '                              <a class="dropdown-item" href="#"' +
          // "                                >Another action</a" +
          // "                              >" +
          // "                            </li>" +
          "                          </ul>" +
          "                        </div>" +
          "                      </div>" +
          "                    </div>" +
          "" +
          '                    <div class="chat-description">' +
          jotMessage +
          "                    </div>" +
          "" +
          '                    <div class="chat-footer">' +
          "                      <div" +
          '                        class="chat-reactions d-flex justify-content-between"' +
          "                      >" +
          '                        <div class="chat-reaction comment-chat">' +
          // '                          <div class="mr-75">' +
          // '                            <img src="./images/icons/comment.svg" />' +
          // "                          </div>" +
          // "                          <span>363</span>" +
          "                        </div>" +
          "" +
          '                        <div class="chat-reaction comment-chat">' +
          // '                          <div class="mr-75">' +
          // '                            <img src="./images/icons/rechat.svg" />' +
          // "                          </div>" +
          // "                          <span>10.9k</span>" +
          "                        </div>" +
          "" +
          '                        <div class="chat-reaction like-chat">' +
          '                          <div class="mr-75">' +
          '                            <img src="./images/icons/heart.svg" />' +
          "                          </div>" +
          "                          <span>" +
          jotLikes +
          "</span>" +
          "                        </div>" +
          "" +
          '                        <div class="chat-reaction comment-chat">' +
          '                          <div class="mr-75">' +
          '                            <img src="./images/icons/share.svg" />' +
          "                          </div>" +
          "                        </div>" +
          "                      </div>" +
          "                    </div>" +
          "                  </div>" +
          "                </div>";
      });
      $("#chatsWrapper").append(jotHTML);
    }
  });
};

// get Jot by id
function get_jot_by_id(jotID) {
  let requestURL = "/v1/jots" + jotID;
  $.get(requestURL, function (response, status) {
    if (status == "success") {
      jot = response;
      let jotID = jot.id;
      let jotLikes = jot.likes;
      let jotMessage = jot.message;
      let userID = jot.userID;

      location.reload();
    }
  });
}

function logoff() {
  document.cookie = 'sid=;Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  location.reload();
};

//post a jot
$("#postJot").submit(function (event) {
  event.preventDefault();
  let jotMessage = $("[name='description']").val();
  let requestURL = "/v1/jots";
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
    $("#newChat").modal("hide");
    location.reload();
  });


});

//   Delete a jot
$(document).on("click", ".delete-chat", function (event) {
  event.preventDefault();
  let jotID = $(this).data("chat-id");
  let requestURL = "/v1/jots/" + jotID;
  var settings = {
    url: requestURL,
    method: "DELETE",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    location.reload();
  });


});

//   Unlike a jot
$(document).on("click", ".dislike-chat", function (event) {
  event.preventDefault();
  let jotID = $(this).closest(".single-chat").data("chat-id");
  let requestURL = "/v1/jots/" + jotID + "/like";
  var settings = {
    url: requestURL,
    method: "DELETE",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    location.reload();
  });


});

//   Like a jot
$(document).on("click", ".like-chat", function (event) {
  event.preventDefault();
  let jotID = $(this).closest(".single-chat").data("chat-id");
  let requestURL = "/v1/jots/" + jotID + "/like";
  var settings = {
    url: requestURL,
    method: "GET",
    timeout: 0,
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    location.reload();
  });
});

//   Get the users that like a jot.
function get_users_by_liked(jotID) {
  let requestURL = "/v1/jots/" + jotID + "/likes";
  $.get(requestURL, function (response, status) {
    if (status == "success") {
      data = response;
      $.each(data.items, function (user) {
        let followers = user.followers;
        let handle = user.handle;
        let userID = user.id;
      });
      location.reload();
    }
  });
};


//   Get the logged in user
function get_loggedin_user() {
  let requestURL = "/v1/users/me";
  $.get(requestURL, function (response, status) {
    if (status == "success") {
      data = response;
      let userhtml = "";
      let handle = data.handle;
      let userID = data.id;
      userhtml += '<p class="mb-0"><strong>' + handle + '</strong></p><p class="mb-0">@' + handle + '</p>';
      $("#userinfo").append(userhtml);
    }
  });
};