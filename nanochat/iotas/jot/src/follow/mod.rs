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

pub(crate) struct FollowStoreComponent();

impl FollowStoreComponent {
    fn load_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = FollowStoreComponent::load(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn get_multiple_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = FollowStoreComponent::get_multiple(input)
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
        let task = FollowStoreComponent::follow(input)
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
        let task = FollowStoreComponent::unfollow(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn fetch_followers_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = FollowStoreComponent::fetch_followers(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn fetch_follows_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = FollowStoreComponent::fetch_follows(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn my_follows_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = FollowStoreComponent::my_follows(input)
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

pub(crate) trait FollowStoreService {
    async fn load(
        inputs: Mono<follow_store_service::load::Inputs, PayloadError>,
    ) -> Result<follow_store_service::load::Outputs, GenericError>;

    async fn get_multiple(
        inputs: Mono<follow_store_service::get_multiple::Inputs, PayloadError>,
    ) -> Result<follow_store_service::get_multiple::Outputs, GenericError>;

    async fn follow(
        inputs: Mono<follow_store_service::follow::Inputs, PayloadError>,
    ) -> Result<follow_store_service::follow::Outputs, GenericError>;

    async fn unfollow(
        inputs: Mono<follow_store_service::unfollow::Inputs, PayloadError>,
    ) -> Result<follow_store_service::unfollow::Outputs, GenericError>;

    async fn fetch_followers(
        inputs: Mono<follow_store_service::fetch_followers::Inputs, PayloadError>,
    ) -> Result<follow_store_service::fetch_followers::Outputs, GenericError>;

    async fn fetch_follows(
        inputs: Mono<follow_store_service::fetch_follows::Inputs, PayloadError>,
    ) -> Result<follow_store_service::fetch_follows::Outputs, GenericError>;

    async fn my_follows(
        inputs: Mono<follow_store_service::my_follows::Inputs, PayloadError>,
    ) -> Result<follow_store_service::my_follows::Outputs, GenericError>;
}

pub mod follow_store_service {
    use super::*;

    pub mod load {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "userId")]
            pub(crate) user_id: Uuid,
        }

        pub(crate) type Outputs = UserRef;
    }

    pub mod get_multiple {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "userIds")]
            pub(crate) user_ids: Vec<Uuid>,
        }

        pub(crate) type Outputs = Box<dyn Stream<Item = UserRef>>;
    }

    pub mod follow {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "followedId")]
            pub(crate) followed_id: Uuid,
        }

        pub(crate) type Outputs = ();
    }

    pub mod unfollow {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "followedId")]
            pub(crate) followed_id: Uuid,
        }

        pub(crate) type Outputs = ();
    }

    pub mod fetch_followers {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "userId")]
            pub(crate) user_id: Uuid,

            #[serde(rename = "offset")]
            pub(crate) offset: u32,

            #[serde(rename = "limit")]
            pub(crate) limit: u32,
        }

        pub(crate) type Outputs = Box<dyn Stream<Item = FollowRef>>;
    }

    pub mod fetch_follows {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "userId")]
            pub(crate) user_id: Uuid,

            #[serde(rename = "offset")]
            pub(crate) offset: u32,

            #[serde(rename = "limit")]
            pub(crate) limit: u32,
        }

        pub(crate) type Outputs = Box<dyn Stream<Item = FollowRef>>;
    }

    pub mod my_follows {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {}

        pub(crate) type Outputs = Box<dyn Stream<Item = FollowRef>>;
    }
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct FollowRef {
    /// User ID.
    #[serde(rename = "id")]
    pub id: Uuid,
    /// Creation timestamp (for sorting)
    #[serde(rename = "time")]
    pub time: wasmrs_guest::Timestamp,
}
/// User record
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct UserRef {
    /// User ID.
    #[serde(rename = "id")]
    pub id: Uuid,
    /// The number of followers
    #[serde(rename = "followers")]
    pub followers: u32,
    /// The number of users followed
    #[serde(rename = "follows")]
    pub follows: u32,
}
/// Follow record
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Follow {
    /// The ID of the user being followed
    #[serde(rename = "followedId")]
    pub followed_id: Uuid,
    /// The follower's user ID
    #[serde(rename = "followerId")]
    pub follower_id: Uuid,
    /// Creation timestamp (for sorting)
    #[serde(rename = "time")]
    pub time: wasmrs_guest::Timestamp,
}
pub(crate) fn init_imports() {}
pub(crate) fn init_exports() {
    wasmrs_guest::register_request_response(
        "nanochat.io.follows.v1.FollowStore",
        "load",
        FollowStoreComponent::load_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.follows.v1.FollowStore",
        "getMultiple",
        FollowStoreComponent::get_multiple_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.follows.v1.FollowStore",
        "follow",
        FollowStoreComponent::follow_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.follows.v1.FollowStore",
        "unfollow",
        FollowStoreComponent::unfollow_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.follows.v1.FollowStore",
        "fetchFollowers",
        FollowStoreComponent::fetch_followers_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.follows.v1.FollowStore",
        "fetchFollows",
        FollowStoreComponent::fetch_follows_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.follows.v1.FollowStore",
        "myFollows",
        FollowStoreComponent::my_follows_wrapper,
    );
}
