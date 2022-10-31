pub(crate) mod generated;

use generated::*;
use wasmrs_guest::*;

#[async_trait::async_trait(?Send)]
impl JotsService for JotsComponent {
    async fn post_jot(
        inputs: Mono<jots_service::post_jot::Inputs, PayloadError>,
    ) -> Result<jots_service::post_jot::Outputs, GenericError> {
        let inputs = inputs.await?;

        Ok(jot_store::store_jot(jot_store::store_jot::Inputs {
            message: &inputs.message,
        })
        .await?)
    }
/*
    
    async fn get_own_timeline(
        inputs: Mono<jots_service::get_own_timeline::Inputs, PayloadError>,
    ) -> Result<jots_service::get_own_timeline::Outputs, GenericError> {
        let inputs = inputs.await?;

        let stream = jot_store::my_jots(jot_store::my_jots::Inputs {
            before: &inputs.before,
            limit: &inputs.limit,
        });

        let jots_generated: Vec<_> = stream.collect().await;

        Ok(jots_service::get_others_timeline::Outputs {
            before: inputs.before,
            limit: inputs.limit,
            items: jots_generated.into_iter().map(|x| x.unwrap()).collect() })
    }

    async fn get_others_timeline(
        inputs: Mono<jots_service::get_others_timeline::Inputs, PayloadError>,
    ) -> Result<jots_service::get_others_timeline::Outputs, GenericError> {
        let inputs = inputs.await?;


        let stream = jot_store::fetch_jots(jot_store::fetch_jots::Inputs {
            handle: &inputs.handle,
            before: &inputs.before,
            limit: &inputs.limit,
        });

        let jots_generated: Vec<_> = stream.collect().await;

        /*                                                                                                                                     
        let jots_try =                                                                                                                         
            vec![                                                                                                                              
                generated::Jot { id: "0bae024b-2703-4d47-808f-41abe2742691".to_string(),                                                       
                                 user_id: "c961095d-c5c8-4805-b762-743864614d62".to_string(),                                                  
                                 message: "foo".to_string(),                                                                                   
                                 time: Timestamp::new(0,0).unwrap(),                                                                           
                                 likes: 0 } ];                                                                                                 
        */

        Ok(jots_service::get_others_timeline::Outputs {
            before: inputs.before,
            limit: inputs.limit,
            // items: jots_try })                                                                                                              
            items: jots_generated.into_iter().map(|x| x.unwrap()).collect() })

    }

    async fn get_jot(
        inputs: Mono<jots_service::get_jot::Inputs, PayloadError>,
    ) -> Result<jots_service::get_jot::Outputs, GenericError> {
        let inputs = inputs.await?;

        Ok(jot_store::fetch_jot(jot_store::fetch_jot::Inputs {
            id: &inputs.id
        })
        .await?)

        /*                                                                                                                                     
        Ok(generated::Jot { id: "0bae024b-2703-4d47-808f-41abe2742691".to_string(),                                                            
                            user_id: "c961095d-c5c8-4805-b762-743864614d62".to_string(),                                                       
                            message: "foo".to_string(),                                                                                        
                            time: Timestamp::new(0, 0).unwrap(),                                                                               
                            likes: 0 } )                                                                                                       
         */
    }

    async fn delete_jot(
        inputs: Mono<jots_service::delete_jot::Inputs, PayloadError>,
    ) -> Result<jots_service::delete_jot::Outputs, GenericError> {
        let inputs = inputs.await?;

        Ok(jot_store::delete_jot(jot_store::delete_jot::Inputs {
            id: &inputs.id,
        })
        .await?)
    }
     */
}
