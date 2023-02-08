
pub(crate) mod test {
    pub(crate) use super::*;
    pub(crate) mod op;
    pub(crate) mod reverse;
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

fn deserialize_helper<T: serde::de::DeserializeOwned + 'static>(
    i: Mono<ParsedPayload, PayloadError>,
) -> Mono<T, PayloadError> {
    Mono::from_future(async move {
        match i.await {
            Ok(bytes) => match deserialize(&bytes.data) {
                Ok(v) => Ok(v),
                Err(e) => Err(PayloadError::application_error(e.to_string())),
            },
            Err(e) => Err(PayloadError::application_error(e.to_string())),
        }
    })
}

pub(crate) struct TestComponent();

impl TestComponent {
    fn op_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = TestComponent::op(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output).map(|bytes| Payload::new_data(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }

    fn reverse_wrapper(input: IncomingMono) -> Result<OutgoingMono, GenericError> {
        let (tx, rx) = runtime::oneshot();

        let input = Mono::from_future(input.map(|r| r.map(|v| Ok(deserialize(&v.data)?))?));
        let task = TestComponent::reverse(input)
            .map(|result| {
                let output = result?;
                Ok(serialize(&output).map(|bytes| Payload::new_data(None, Some(bytes.into())))?)
            })
            .map(|output| tx.send(output).unwrap());

        spawn(task);

        Ok(Mono::from_future(async move { rx.await? }))
    }
}

#[async_trait::async_trait(?Send)]
/// Test interface
pub(crate) trait TestService {
    /// Returns 'test'
    async fn op(
        inputs: Mono<test_service::op::Inputs, PayloadError>,
    ) -> Result<test_service::op::Outputs, GenericError>;
    /// Returns the input string reversed
    async fn reverse(
        inputs: Mono<test_service::reverse::Inputs, PayloadError>,
    ) -> Result<test_service::reverse::Outputs, GenericError>;
}

#[async_trait::async_trait(?Send)]
impl TestService for TestComponent {
    /// Returns 'test'
    async fn op(
        inputs: Mono<test_service::op::Inputs, PayloadError>,
    ) -> Result<test_service::op::Outputs, GenericError> {
        Ok(crate::actions::test::op::task(inputs.await?).await?)
    }

    /// Returns the input string reversed
    async fn reverse(
        inputs: Mono<test_service::reverse::Inputs, PayloadError>,
    ) -> Result<test_service::reverse::Outputs, GenericError> {
        Ok(crate::actions::test::reverse::task(inputs.await?).await?)
    }
}

pub mod test_service {
    #[allow(unused_imports)]
    pub(crate) use super::*;

    pub mod op {
        #[allow(unused_imports)]
        pub(crate) use super::*;
        #[derive(serde::Deserialize)]
        pub(crate) struct Inputs {}

        pub(crate) type Outputs = String;
    }

    pub mod reverse {
        #[allow(unused_imports)]
        pub(crate) use super::*;
        #[derive(serde::Deserialize)]
        pub(crate) struct Inputs {
            #[serde(rename = "input")]
            pub(crate) input: String,
        }

        pub(crate) type Outputs = String;
    }
}

static EXTERNAL_UPPERCASE_INDEX_BYTES: [u8; 4] = 0u32.to_be_bytes();

pub mod external {
    use super::*;

    /// Uppercases a string

    pub(crate) fn uppercase(
        inputs: uppercase::Inputs<'_>,
    ) -> wasmrs_guest::Mono<uppercase::Outputs, PayloadError> {
        let op_id_bytes = EXTERNAL_UPPERCASE_INDEX_BYTES.as_slice();
        let payload = match wasmrs_guest::serialize(&inputs) {
            Ok(bytes) => Payload::new([op_id_bytes, &[0, 0, 0, 0]].concat().into(), bytes.into()),
            Err(e) => return Mono::new_error(PayloadError::application_error(e.to_string())),
        };
        let fut = Host::default().request_response(payload).map(|result| {
            result.map(|payload| Ok(deserialize::<uppercase::Outputs>(&payload.data.unwrap())?))?
        });
        Mono::from_future(fut)
    }

    pub(crate) mod uppercase {
        use super::*;

        #[derive(serde::Serialize)]
        pub struct Inputs<'a> {
            #[serde(rename = "input")]
            pub(crate) input: &'a str,
        }

        pub(crate) type Outputs = String;
    }
}

pub(crate) fn init_imports() {
    wasmrs_guest::add_import(
        u32::from_be_bytes(EXTERNAL_UPPERCASE_INDEX_BYTES),
        OperationType::RequestResponse,
        "suite.External",
        "uppercase",
    );
}
pub(crate) fn init_exports() {
    wasmrs_guest::register_request_response("suite.Test", "op", TestComponent::op_wrapper);

    wasmrs_guest::register_request_response(
        "suite.Test",
        "reverse",
        TestComponent::reverse_wrapper,
    );
}
