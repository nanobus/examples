/************************************************
 * THIS FILE IS GENERATED, DO NOT EDIT          *
 *                                              *
 * See https://apexlang.io for more information *
 ***********************************************/
use wasmrs_guest::FutureExt;

use wasmrs_guest::*;

#[no_mangle]
extern "C" fn __wasmrs_init(
    guest_buffer_size: u32,
    host_buffer_size: u32,
    max_host_frame_len: u32,
) {
    init_exports();
    init_imports();
    wasmrs_guest::init(guest_buffer_size, host_buffer_size, max_host_frame_len);
}

pub type Uuid = String;

pub(crate) struct JotsComponent();

impl JotsComponent {
    fn post_jot_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = JotsComponent::post_jot(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn get_feed_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = JotsComponent::get_feed(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn get_jot_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = JotsComponent::get_jot(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn delete_jot_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = JotsComponent::delete_jot(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn like_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = JotsComponent::like(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn unlike_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = JotsComponent::unlike(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn likes_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = JotsComponent::likes(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }
}

#[async_trait::async_trait(?Send)]
/// Jot API
pub(crate) trait JotsService {
    /// Post a Tweet.
    async fn post_jot(
        inputs: Mono<jots_service::post_jot::Inputs, PayloadError>,
    ) -> Result<jots_service::post_jot::Outputs, GenericError>;

    /// Get the jot feed
    async fn get_feed(
        inputs: Mono<jots_service::get_feed::Inputs, PayloadError>,
    ) -> Result<jots_service::get_feed::Outputs, GenericError>;

    /// Get a tweet by id.
    async fn get_jot(
        inputs: Mono<jots_service::get_jot::Inputs, PayloadError>,
    ) -> Result<jots_service::get_jot::Outputs, GenericError>;

    /// Delete a tweet (only creator has access)
    async fn delete_jot(
        inputs: Mono<jots_service::delete_jot::Inputs, PayloadError>,
    ) -> Result<jots_service::delete_jot::Outputs, GenericError>;

    /// Like a tweet
    async fn like(
        inputs: Mono<jots_service::like::Inputs, PayloadError>,
    ) -> Result<jots_service::like::Outputs, GenericError>;

    /// Unlike a tweet
    async fn unlike(
        inputs: Mono<jots_service::unlike::Inputs, PayloadError>,
    ) -> Result<jots_service::unlike::Outputs, GenericError>;

    /// Get the users that like a jot.
    async fn likes(
        inputs: Mono<jots_service::likes::Inputs, PayloadError>,
    ) -> Result<jots_service::likes::Outputs, GenericError>;
}

pub mod jots_service {
    use super::*;

    pub mod post_jot {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "message")]
            pub(crate) message: String,
        }

        pub(crate) type Outputs = Jot;
    }

    pub mod get_feed {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "before")]
            pub(crate) before: Option<wasmrs_guest::Timestamp>,

            #[serde(rename = "limit")]
            pub(crate) limit: u32,
        }

        pub(crate) type Outputs = JotPage;
    }

    pub mod get_jot {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "id")]
            pub(crate) id: Uuid,
        }

        pub(crate) type Outputs = Jot;
    }

    pub mod delete_jot {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "id")]
            pub(crate) id: Uuid,
        }

        pub(crate) type Outputs = Jot;
    }

    pub mod like {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "id")]
            pub(crate) id: Uuid,
        }

        pub(crate) type Outputs = ();
    }

    pub mod unlike {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "id")]
            pub(crate) id: Uuid,
        }

        pub(crate) type Outputs = ();
    }

    pub mod likes {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "id")]
            pub(crate) id: Uuid,

            #[serde(rename = "pagination")]
            pub(crate) pagination: Pagination,
        }

        pub(crate) type Outputs = UserPage;
    }
}

pub(crate) struct UsersComponent();

impl UsersComponent {
    fn me_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = UsersComponent::me(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn get_profile_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = UsersComponent::get_profile(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn get_jots_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = UsersComponent::get_jots(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn follow_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = UsersComponent::follow(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn unfollow_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = UsersComponent::unfollow(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn get_follows_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = UsersComponent::get_follows(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn get_followers_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = UsersComponent::get_followers(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }
}

#[async_trait::async_trait(?Send)]
/// Users API
pub(crate) trait UsersService {
    async fn me(
        inputs: Mono<users_service::me::Inputs, PayloadError>,
    ) -> Result<users_service::me::Outputs, GenericError>;

    /// Get the user's profile
    async fn get_profile(
        inputs: Mono<users_service::get_profile::Inputs, PayloadError>,
    ) -> Result<users_service::get_profile::Outputs, GenericError>;

    /// Get the user's jots.
    async fn get_jots(
        inputs: Mono<users_service::get_jots::Inputs, PayloadError>,
    ) -> Result<users_service::get_jots::Outputs, GenericError>;

    /// Follow a user
    async fn follow(
        inputs: Mono<users_service::follow::Inputs, PayloadError>,
    ) -> Result<users_service::follow::Outputs, GenericError>;

    /// Unfollow a user
    async fn unfollow(
        inputs: Mono<users_service::unfollow::Inputs, PayloadError>,
    ) -> Result<users_service::unfollow::Outputs, GenericError>;

    /// Get users the followed by the users
    async fn get_follows(
        inputs: Mono<users_service::get_follows::Inputs, PayloadError>,
    ) -> Result<users_service::get_follows::Outputs, GenericError>;

    /// Get followers of a user
    async fn get_followers(
        inputs: Mono<users_service::get_followers::Inputs, PayloadError>,
    ) -> Result<users_service::get_followers::Outputs, GenericError>;
}

pub mod users_service {
    use super::*;

    pub mod me {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {}

        pub(crate) type Outputs = User;
    }

    pub mod get_profile {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "handle")]
            pub(crate) handle: String,
        }

        pub(crate) type Outputs = User;
    }

    pub mod get_jots {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "handle")]
            pub(crate) handle: String,

            #[serde(rename = "before")]
            pub(crate) before: Option<wasmrs_guest::Timestamp>,

            #[serde(rename = "limit")]
            pub(crate) limit: u32,
        }

        pub(crate) type Outputs = JotPage;
    }

    pub mod follow {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "handle")]
            pub(crate) handle: String,
        }

        pub(crate) type Outputs = ();
    }

    pub mod unfollow {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "handle")]
            pub(crate) handle: String,
        }

        pub(crate) type Outputs = ();
    }

    pub mod get_follows {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "handle")]
            pub(crate) handle: String,

            #[serde(rename = "pagination")]
            pub(crate) pagination: Pagination,
        }

        pub(crate) type Outputs = UserPage;
    }

    pub mod get_followers {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "handle")]
            pub(crate) handle: String,

            #[serde(rename = "pagination")]
            pub(crate) pagination: Pagination,
        }

        pub(crate) type Outputs = UserPage;
    }
}

/// Jot entity
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Jot {
    /// The dynamically generated ID.
    #[serde(rename = "id")]
    pub id: Uuid,
    /// The jot owner ID.
    #[serde(rename = "userId")]
    pub user_id: Uuid,
    /// The jot owner handle
    #[serde(rename = "handle")]
    pub handle: String,
    /// The message body.
    #[serde(rename = "message")]
    pub message: String,
    /// The time the tweet was entered.
    #[serde(rename = "time")]
    pub time: wasmrs_guest::Timestamp,
    /// The number of likes.
    #[serde(rename = "likes")]
    pub likes: u32,
}
/// Jot page
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct JotPage {
    /// Before timestamp
    #[serde(rename = "before")]
    pub before: Option<wasmrs_guest::Timestamp>,
    /// Limit result
    #[serde(rename = "limit")]
    pub limit: u32,
    /// The tweets returned
    #[serde(rename = "items")]
    pub items: Vec<Jot>,
}
/// User entity
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct User {
    /// User ID.
    #[serde(rename = "id")]
    pub id: Uuid,
    /// Handle.
    #[serde(rename = "handle")]
    pub handle: String,
    /// The number of followers
    #[serde(rename = "followers")]
    pub followers: u32,
    /// The number of users followed
    #[serde(rename = "follows")]
    pub follows: u32,
    /// If the authenticated user is following this user. Will return false if unauthenticated or outside of Users::getProfile.
    #[serde(rename = "isFollowing")]
    pub is_following: bool,
}
/// User page
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct UserPage {
    /// Offet
    #[serde(rename = "offset")]
    pub offset: u32,
    /// Limit
    #[serde(rename = "limit")]
    pub limit: u32,
    /// The users returned
    #[serde(rename = "items")]
    pub items: Vec<User>,
}
/// Pagination query parameters
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Pagination {
    /// Offset
    #[serde(rename = "offset")]
    pub offset: u32,
    /// Limit
    #[serde(rename = "limit")]
    pub limit: u32,
}
pub(crate) fn init_imports() {}
pub(crate) fn init_exports() {
    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Jots",
        "postJot",
        JotsComponent::post_jot_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Jots",
        "getFeed",
        JotsComponent::get_feed_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Jots",
        "getJot",
        JotsComponent::get_jot_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Jots",
        "deleteJot",
        JotsComponent::delete_jot_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Jots",
        "like",
        JotsComponent::like_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Jots",
        "unlike",
        JotsComponent::unlike_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Jots",
        "likes",
        JotsComponent::likes_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Users",
        "me",
        UsersComponent::me_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Users",
        "getProfile",
        UsersComponent::get_profile_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Users",
        "getJots",
        UsersComponent::get_jots_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Users",
        "follow",
        UsersComponent::follow_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Users",
        "unfollow",
        UsersComponent::unfollow_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Users",
        "getFollows",
        UsersComponent::get_follows_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.v1.jots.Users",
        "getFollowers",
        UsersComponent::get_followers_wrapper,
    );
}
