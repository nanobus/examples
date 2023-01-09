
pub(crate) mod greeter {
    pub(crate) mod say_hello;
}

pub(crate) mod other {
    pub(crate) mod action;
}
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

pub(crate) struct GreeterComponent();

impl GreeterComponent {
    fn say_hello_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = GreeterComponent::say_hello(input)
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

pub(crate) trait GreeterService {
    async fn say_hello(
        inputs: Mono<greeter_service::say_hello::Inputs, PayloadError>,
    ) -> Result<greeter_service::say_hello::Outputs, GenericError>;
}

#[async_trait::async_trait(?Send)]
impl GreeterService for GreeterComponent {
    async fn say_hello(
        inputs: Mono<greeter_service::say_hello::Inputs, PayloadError>,
    ) -> Result<greeter_service::say_hello::Outputs, GenericError> {
        Ok(crate::actions::greeter::say_hello::task(inputs.await?).await?)
    }
}

pub mod greeter_service {
    use super::*;

    pub mod say_hello {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "target")]
            pub(crate) target: String,
        }

        pub(crate) type Outputs = String;
    }
}

pub(crate) struct OtherComponent();

impl OtherComponent {
    fn action_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = OtherComponent::action(input)
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

pub(crate) trait OtherService {
    async fn action(
        inputs: Mono<other_service::action::Inputs, PayloadError>,
    ) -> Result<other_service::action::Outputs, GenericError>;
}

#[async_trait::async_trait(?Send)]
impl OtherService for OtherComponent {
    async fn action(
        inputs: Mono<other_service::action::Inputs, PayloadError>,
    ) -> Result<other_service::action::Outputs, GenericError> {
        Ok(crate::actions::other::action::task(inputs.await?).await?)
    }
}

pub mod other_service {
    use super::*;

    pub mod action {
        use super::*;
        #[derive(serde::Deserialize, Debug)]
        pub(crate) struct Inputs {
            #[serde(rename = "this")]
            pub(crate) this: String,
        }

        pub(crate) type Outputs = String;
    }
}

pub(crate) fn init_imports() {}
pub(crate) fn init_exports() {
    wasmrs_guest::register_request_response(
        "my-module.v1.Greeter",
        "sayHello",
        GreeterComponent::say_hello_wrapper,
    );

    wasmrs_guest::register_request_response(
        "my-module.v1.Other",
        "action",
        OtherComponent::action_wrapper,
    );
}
