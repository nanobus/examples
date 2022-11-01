$(function () {
  const baseURL = "http://localhost:8080";
  const currentUserID = localStorage.getItem("seession");

  // get all jots
  function get_all_jots() {
    let requestURL = baseURL + "/v1/jots";
    $.get(requestURL, function (response, status) {
      if (status == "success") {
        data = $.parseJSON(response);
        $.each(data.items, function (jot) {
          let jotID = jot.id;
          let jotLikes = jot.likes;
          let jotMessage = jot.message;
          let userID = jot.userID;
        });
      }
    });
  }

  // get Jot by id
  function get_jot_by_id(jotID) {
    let requestURL = baseURL + "/v1/jots" + jotID;
    $.get(requestURL, function (response, status) {
      if (status == "success") {
        jot = $.parseJSON(response);
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
        data = $.parseJSON(response);
        $.each(data.items, function (user) {
          let followers = user.followers;
          let handle = user.handle;
          let userID = user.id;
        });
      }
    });
  }
});
