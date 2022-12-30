use crate::actions::other_service::action::*;

pub(crate) async fn task(input: Inputs) -> Result<Outputs, crate::Error> {
    Ok(input.this.to_ascii_uppercase())
}
