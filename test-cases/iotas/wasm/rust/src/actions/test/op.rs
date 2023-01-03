use crate::actions::test_service::op::*;

pub(crate) async fn task(input: Inputs) -> Result<Outputs, crate::Error> {
    Ok("test".to_owned())
}
