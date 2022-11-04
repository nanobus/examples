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

pub(crate) struct MessageStoreComponent();

impl MessageStoreComponent {
    fn store_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = MessageStoreComponent::store(input)
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
        let task = MessageStoreComponent::load(input)
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
        let task = MessageStoreComponent::delete(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn my_messages_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = MessageStoreComponent::my_messages(input)
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
        let task = MessageStoreComponent::get_feed(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn get_user_messages_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = MessageStoreComponent::get_user_messages(input)
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

pub(crate) trait MessageStoreService {
    async fn store(
        inputs: Mono<message_store_service::store::Inputs, PayloadError>,
    ) -> Result<message_store_service::store::Outputs, GenericError>;

    async fn load(
        inputs: Mono<message_store_service::load::Inputs, PayloadError>,
    ) -> Result<message_store_service::load::Outputs, GenericError>;

    async fn delete(
        inputs: Mono<message_store_service::delete::Inputs, PayloadError>,
    ) -> Result<message_store_service::delete::Outputs, GenericError>;

    async fn my_messages(
        inputs: Mono<message_store_service::my_messages::Inputs, PayloadError>,
    ) -> Result<message_store_service::my_messages::Outputs, GenericError>;

    async fn get_feed(
        inputs: Mono<message_store_service::get_feed::Inputs, PayloadError>,
    ) -> Result<message_store_service::get_feed::Outputs, GenericError>;

    async fn get_user_messages(
        inputs: Mono<message_store_service::get_user_messages::Inputs, PayloadError>,
    ) -> Result<message_store_service::get_user_messages::Outputs, GenericError>;
}

pub mod message_store_service {
    use super::*;

    pub mod store {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "message")]
            pub(crate) message: String,
        }

        pub(crate) type Outputs = Message;
    }

    pub mod load {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "id")]
            pub(crate) id: Uuid,
        }

        pub(crate) type Outputs = Message;
    }

    pub mod delete {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "id")]
            pub(crate) id: Uuid,
        }

        pub(crate) type Outputs = Message;
    }

    pub mod my_messages {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "before")]
            pub(crate) before: Option<wasmrs_guest::Timestamp>,

            #[serde(rename = "limit")]
            pub(crate) limit: u32,
        }

        pub(crate) type Outputs = Box<dyn Stream<Item = Message>>;
    }

    pub mod get_feed {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "userIds")]
            pub(crate) user_ids: Vec<Uuid>,

            #[serde(rename = "before")]
            pub(crate) before: Option<wasmrs_guest::Timestamp>,

            #[serde(rename = "limit")]
            pub(crate) limit: u32,
        }

        pub(crate) type Outputs = Box<dyn Stream<Item = Message>>;
    }

    pub mod get_user_messages {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "userId")]
            pub(crate) user_id: Uuid,

            #[serde(rename = "before")]
            pub(crate) before: Option<wasmrs_guest::Timestamp>,

            #[serde(rename = "limit")]
            pub(crate) limit: u32,
        }

        pub(crate) type Outputs = Box<dyn Stream<Item = Message>>;
    }
}

/// Message record.
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Message {
    /// The dynamically generated Tweet ID.
    #[serde(rename = "id")]
    pub id: Uuid,
    /// The tweet owner.
    #[serde(rename = "userId")]
    pub user_id: Uuid,
    /// The message body.
    #[serde(rename = "message")]
    pub message: String,
    /// The time the tweet was entered.
    #[serde(rename = "time")]
    pub time: wasmrs_guest::Timestamp,
}
pub(crate) fn init_imports() {}
pub(crate) fn init_exports() {
    wasmrs_guest::register_request_response(
        "nanochat.io.messsage.v1.MessageStore",
        "store",
        MessageStoreComponent::store_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.messsage.v1.MessageStore",
        "load",
        MessageStoreComponent::load_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.messsage.v1.MessageStore",
        "delete",
        MessageStoreComponent::delete_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.messsage.v1.MessageStore",
        "myMessages",
        MessageStoreComponent::my_messages_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.messsage.v1.MessageStore",
        "getFeed",
        MessageStoreComponent::get_feed_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.messsage.v1.MessageStore",
        "getUserMessages",
        MessageStoreComponent::get_user_messages_wrapper,
    );
}
