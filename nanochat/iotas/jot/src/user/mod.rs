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

pub(crate) struct UserStoreComponent();

impl UserStoreComponent {
    fn me_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = UserStoreComponent::me(input)
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
        let task = UserStoreComponent::load(input)
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
        let task = UserStoreComponent::get_multiple(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output)
                    .map(|bytes| Payload::new_optional(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn find_by_handle_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = UserStoreComponent::find_by_handle(input)
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

pub(crate) trait UserStoreService {
    async fn me(
        inputs: Mono<user_store_service::me::Inputs, PayloadError>,
    ) -> Result<user_store_service::me::Outputs, GenericError>;

    async fn load(
        inputs: Mono<user_store_service::load::Inputs, PayloadError>,
    ) -> Result<user_store_service::load::Outputs, GenericError>;

    async fn get_multiple(
        inputs: Mono<user_store_service::get_multiple::Inputs, PayloadError>,
    ) -> Result<user_store_service::get_multiple::Outputs, GenericError>;

    async fn find_by_handle(
        inputs: Mono<user_store_service::find_by_handle::Inputs, PayloadError>,
    ) -> Result<user_store_service::find_by_handle::Outputs, GenericError>;
}

pub mod user_store_service {
    use super::*;

    pub mod me {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {}

        pub(crate) type Outputs = User;
    }

    pub mod load {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "userId")]
            pub(crate) user_id: Uuid,
        }

        pub(crate) type Outputs = User;
    }

    pub mod get_multiple {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "userIds")]
            pub(crate) user_ids: Vec<Uuid>,
        }

        pub(crate) type Outputs = Box<dyn Stream<Item = User>>;
    }

    pub mod find_by_handle {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "handle")]
            pub(crate) handle: String,
        }

        pub(crate) type Outputs = User;
    }
}

/// User record
#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct User {
    /// User ID.
    #[serde(rename = "id")]
    pub id: Uuid,
    /// Handle.
    #[serde(rename = "handle")]
    pub handle: String,
}
pub(crate) fn init_imports() {}
pub(crate) fn init_exports() {
    wasmrs_guest::register_request_response(
        "nanochat.io.user.v1.UserStore",
        "me",
        UserStoreComponent::me_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.user.v1.UserStore",
        "load",
        UserStoreComponent::load_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.user.v1.UserStore",
        "getMultiple",
        UserStoreComponent::get_multiple_wrapper,
    );

    wasmrs_guest::register_request_response(
        "nanochat.io.user.v1.UserStore",
        "findByHandle",
        UserStoreComponent::find_by_handle_wrapper,
    );
}
