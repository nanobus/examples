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

static MESSAGE_STORE_STORE_INDEX_BYTES: [u8; 4] = 0u32.to_be_bytes();
static MESSAGE_STORE_LOAD_INDEX_BYTES: [u8; 4] = 1u32.to_be_bytes();
static MESSAGE_STORE_DELETE_INDEX_BYTES: [u8; 4] = 2u32.to_be_bytes();
static MESSAGE_STORE_MY_MESSAGES_INDEX_BYTES: [u8; 4] = 3u32.to_be_bytes();
static MESSAGE_STORE_GET_FEED_INDEX_BYTES: [u8; 4] = 4u32.to_be_bytes();
static MESSAGE_STORE_GET_USER_MESSAGES_INDEX_BYTES: [u8; 4] = 5u32.to_be_bytes();

pub mod message_store {
    use super::*;

    pub(crate) fn store(
        inputs: store::Inputs<'_>,
    ) -> wasmrs_guest::Mono<store::Outputs, PayloadError> {
        let op_id_bytes = MESSAGE_STORE_STORE_INDEX_BYTES.as_slice();
        let payload = match wasmrs_guest::serialize(&inputs) {
            Ok(bytes) => Payload::new([op_id_bytes, &[0, 0, 0, 0]].concat().into(), bytes.into()),
            Err(e) => return Mono::new_error(PayloadError::application_error(e.to_string())),
        };
        let fut = Host::default().request_response(payload).map(|result| {
            result.map(|payload| Ok(deserialize::<store::Outputs>(&payload.data.unwrap())?))?
        });
        Mono::from_future(fut)
    }

    pub(crate) mod store {
        use super::*;

        #[derive(serde::Serialize)]
        pub struct Inputs<'a> {
            #[serde(rename = "message")]
            pub(crate) message: &'a str,
        }

        pub(crate) type Outputs = Message;
    }

    pub(crate) fn load(
        inputs: load::Inputs<'_>,
    ) -> wasmrs_guest::Mono<load::Outputs, PayloadError> {
        let op_id_bytes = MESSAGE_STORE_LOAD_INDEX_BYTES.as_slice();
        let payload = match wasmrs_guest::serialize(&inputs) {
            Ok(bytes) => Payload::new([op_id_bytes, &[0, 0, 0, 0]].concat().into(), bytes.into()),
            Err(e) => return Mono::new_error(PayloadError::application_error(e.to_string())),
        };
        let fut = Host::default().request_response(payload).map(|result| {
            result.map(|payload| Ok(deserialize::<load::Outputs>(&payload.data.unwrap())?))?
        });
        Mono::from_future(fut)
    }

    pub(crate) mod load {
        use super::*;

        #[derive(serde::Serialize)]
        pub struct Inputs<'a> {
            #[serde(rename = "id")]
            pub(crate) id: &'a Uuid,
        }

        pub(crate) type Outputs = Message;
    }

    pub(crate) fn delete(
        inputs: delete::Inputs<'_>,
    ) -> wasmrs_guest::Mono<delete::Outputs, PayloadError> {
        let op_id_bytes = MESSAGE_STORE_DELETE_INDEX_BYTES.as_slice();
        let payload = match wasmrs_guest::serialize(&inputs) {
            Ok(bytes) => Payload::new([op_id_bytes, &[0, 0, 0, 0]].concat().into(), bytes.into()),
            Err(e) => return Mono::new_error(PayloadError::application_error(e.to_string())),
        };
        let fut = Host::default().request_response(payload).map(|result| {
            result.map(|payload| Ok(deserialize::<delete::Outputs>(&payload.data.unwrap())?))?
        });
        Mono::from_future(fut)
    }

    pub(crate) mod delete {
        use super::*;

        #[derive(serde::Serialize)]
        pub struct Inputs<'a> {
            #[serde(rename = "id")]
            pub(crate) id: &'a Uuid,
        }

        pub(crate) type Outputs = Message;
    }

    pub(crate) fn my_messages(
        inputs: my_messages::Inputs<'_>,
    ) -> impl Stream<Item = Result<my_messages::Outputs, PayloadError>> {
        //) -> wasmrs_guest::Flux<my_messages::Outputs, PayloadError> {
        let op_id_bytes = MESSAGE_STORE_MY_MESSAGES_INDEX_BYTES.as_slice();
        let payload = match wasmrs_guest::serialize(&inputs) {
            Ok(bytes) => Payload::new([op_id_bytes, &[0, 0, 0, 0]].concat().into(), bytes.into()),
            Err(_) => unreachable!(),
        };
        Host::default().request_stream(payload).map(|result| {
            result
                .map(|payload| Ok(deserialize::<my_messages::Outputs>(&payload.data.unwrap())?))?
        })
    }

    pub(crate) mod my_messages {
        use super::*;

        #[derive(serde::Serialize)]
        pub struct Inputs<'a> {
            #[serde(rename = "before")]
            pub(crate) before: &'a Option<wasmrs_guest::Timestamp>,

            #[serde(rename = "limit")]
            pub(crate) limit: &'a u32,
        }

        pub(crate) type Outputs = Message;
    }

    pub(crate) fn get_feed(
        inputs: get_feed::Inputs<'_>,
    ) -> impl Stream<Item = Result<get_feed::Outputs, PayloadError>> {
        //) -> wasmrs_guest::Flux<get_feed::Outputs, PayloadError> {
        let op_id_bytes = MESSAGE_STORE_GET_FEED_INDEX_BYTES.as_slice();
        let payload = match wasmrs_guest::serialize(&inputs) {
            Ok(bytes) => Payload::new([op_id_bytes, &[0, 0, 0, 0]].concat().into(), bytes.into()),
            Err(_) => unreachable!(),
        };
        Host::default().request_stream(payload).map(|result| {
            result.map(|payload| Ok(deserialize::<get_feed::Outputs>(&payload.data.unwrap())?))?
        })
    }

    pub(crate) mod get_feed {
        use super::*;

        #[derive(serde::Serialize)]
        pub struct Inputs<'a> {
            #[serde(rename = "userIds")]
            pub(crate) user_ids: &'a [Uuid],

            #[serde(rename = "before")]
            pub(crate) before: &'a Option<wasmrs_guest::Timestamp>,

            #[serde(rename = "limit")]
            pub(crate) limit: &'a u32,
        }

        pub(crate) type Outputs = Message;
    }

    pub(crate) fn get_user_messages(
        inputs: get_user_messages::Inputs<'_>,
    ) -> impl Stream<Item = Result<get_user_messages::Outputs, PayloadError>> {
        //) -> wasmrs_guest::Flux<get_user_messages::Outputs, PayloadError> {
        let op_id_bytes = MESSAGE_STORE_GET_USER_MESSAGES_INDEX_BYTES.as_slice();
        let payload = match wasmrs_guest::serialize(&inputs) {
            Ok(bytes) => Payload::new([op_id_bytes, &[0, 0, 0, 0]].concat().into(), bytes.into()),
            Err(_) => unreachable!(),
        };
        Host::default().request_stream(payload).map(|result| {
            result.map(|payload| {
                Ok(deserialize::<get_user_messages::Outputs>(
                    &payload.data.unwrap(),
                )?)
            })?
        })
    }

    pub(crate) mod get_user_messages {
        use super::*;

        #[derive(serde::Serialize)]
        pub struct Inputs<'a> {
            #[serde(rename = "userId")]
            pub(crate) user_id: &'a Uuid,

            #[serde(rename = "before")]
            pub(crate) before: &'a Option<wasmrs_guest::Timestamp>,

            #[serde(rename = "limit")]
            pub(crate) limit: &'a u32,
        }

        pub(crate) type Outputs = Message;
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
pub(crate) fn init_imports() {
    wasmrs_guest::add_import(
        u32::from_be_bytes(MESSAGE_STORE_STORE_INDEX_BYTES),
        OperationType::RequestResponse,
        "nanochat.io.messsage.v1.MessageStore",
        "store",
    );

    wasmrs_guest::add_import(
        u32::from_be_bytes(MESSAGE_STORE_LOAD_INDEX_BYTES),
        OperationType::RequestResponse,
        "nanochat.io.messsage.v1.MessageStore",
        "load",
    );

    wasmrs_guest::add_import(
        u32::from_be_bytes(MESSAGE_STORE_DELETE_INDEX_BYTES),
        OperationType::RequestResponse,
        "nanochat.io.messsage.v1.MessageStore",
        "delete",
    );

    wasmrs_guest::add_import(
        u32::from_be_bytes(MESSAGE_STORE_MY_MESSAGES_INDEX_BYTES),
        OperationType::RequestResponse,
        "nanochat.io.messsage.v1.MessageStore",
        "myMessages",
    );

    wasmrs_guest::add_import(
        u32::from_be_bytes(MESSAGE_STORE_GET_FEED_INDEX_BYTES),
        OperationType::RequestResponse,
        "nanochat.io.messsage.v1.MessageStore",
        "getFeed",
    );

    wasmrs_guest::add_import(
        u32::from_be_bytes(MESSAGE_STORE_GET_USER_MESSAGES_INDEX_BYTES),
        OperationType::RequestResponse,
        "nanochat.io.messsage.v1.MessageStore",
        "getUserMessages",
    );
}
pub(crate) fn init_exports() {}
