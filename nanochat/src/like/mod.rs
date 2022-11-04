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

pub(crate) struct LikeStoreComponent();

impl LikeStoreComponent {
    fn like_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = LikeStoreComponent::like(input)
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
        let task = LikeStoreComponent::unlike(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn load_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = LikeStoreComponent::load(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn delete_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = LikeStoreComponent::delete(input)
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
        let task = LikeStoreComponent::get_multiple(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn get_liked_by_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = LikeStoreComponent::get_liked_by(input)
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

pub(crate) trait LikeStoreService {
    async fn like(
        inputs: Mono<like_store_service::like::Inputs, PayloadError>,
    ) -> Result<like_store_service::like::Outputs, GenericError>;

    async fn unlike(
        inputs: Mono<like_store_service::unlike::Inputs, PayloadError>,
    ) -> Result<like_store_service::unlike::Outputs, GenericError>;

    async fn load(
        inputs: Mono<like_store_service::load::Inputs, PayloadError>,
    ) -> Result<like_store_service::load::Outputs, GenericError>;

    async fn delete(
        inputs: Mono<like_store_service::delete::Inputs, PayloadError>,
    ) -> Result<like_store_service::delete::Outputs, GenericError>;

    async fn get_multiple(
        inputs: Mono<like_store_service::get_multiple::Inputs, PayloadError>,
    ) -> Result<like_store_service::get_multiple::Outputs, GenericError>;

    async fn get_liked_by(
        inputs: Mono<like_store_service::get_liked_by::Inputs, PayloadError>,
    ) -> Result<like_store_service::get_liked_by::Outputs, GenericError>;
}

pub mod like_store_service {
    use super::*;

    pub mod like {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "likableId")]
            pub(crate) likable_id: Uuid,
        }

        pub(crate) type Outputs = ();
    }

    pub mod unlike {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "likableId")]
            pub(crate) likable_id: Uuid,
        }

        pub(crate) type Outputs = ();
    }

    pub mod load {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "likableId")]
            pub(crate) likable_id: Uuid,
        }

        pub(crate) type Outputs = Likable;
    }

    pub mod delete {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "likableId")]
            pub(crate) likable_id: Uuid,
        }

        pub(crate) type Outputs = Likable;
    }

    pub mod get_multiple {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "likableIds")]
            pub(crate) likable_ids: Vec<Uuid>,
        }

        pub(crate) type Outputs = Box<dyn Stream<Item = Likable>>;
    }

    pub mod get_liked_by {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "likableId")]
            pub(crate) likable_id: Uuid,

            #[serde(rename = "offset")]
            pub(crate) offset: u32,

            #[serde(rename = "limit")]
            pub(crate) limit: u32,
        }

        pub(crate) type Outputs = Box<dyn Stream<Item = LikeRef>>;
    }
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct LikeRef {
    /// The likers's user ID
    #[serde(rename = "userId")]
    pub user_id: Uuid,
    /// Creation timestamp (for sorting)
    #[serde(rename = "time")]
    pub time: wasmrs_guest::Timestamp,
}
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Likable {
    /// Identifer of the likable entity.
    #[serde(rename = "id")]
    pub id: Uuid,
    /// The number of likes.
    #[serde(rename = "likes")]
    pub likes: u32,
}
/// Like record
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Like {
    /// The tweet ID liked
    #[serde(rename = "likableId")]
    pub likable_id: Uuid,
    /// The likers's user ID
    #[serde(rename = "userId")]
    pub user_id: Uuid,
    /// Creation timestamp (for sorting)
    #[serde(rename = "time")]
    pub time: wasmrs_guest::Timestamp,
}
pub(crate) fn init_imports() {}
pub(crate) fn init_exports() {
    wasmrs_guest::register_request_response(
        "nanochat.io.like.v1.LikeStore",
        "like",
        LikeStoreComponent::like_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.like.v1.LikeStore",
        "unlike",
        LikeStoreComponent::unlike_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.like.v1.LikeStore",
        "load",
        LikeStoreComponent::load_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.like.v1.LikeStore",
        "delete",
        LikeStoreComponent::delete_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.like.v1.LikeStore",
        "getMultiple",
        LikeStoreComponent::get_multiple_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.like.v1.LikeStore",
        "getLikedBy",
        LikeStoreComponent::get_liked_by_wrapper,
    );
}
