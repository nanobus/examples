use crate::actions::greeter_service::say_hello::*;

pub(crate) async fn task(input: Inputs) -> Result<Outputs, crate::Error> {
    Ok(format!("Hello, {}!", input.target))
}
