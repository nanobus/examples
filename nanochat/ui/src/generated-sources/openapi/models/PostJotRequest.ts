/* tslint:disable */
/* eslint-disable */
/**
 * Simple chat app
 * Simple chat application created using NanoBus and IOtas.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: api@nanochat.io
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface PostJotRequest
 */
export interface PostJotRequest {
    /**
     * 
     * @type {string}
     * @memberof PostJotRequest
     */
    message?: string;
}

/**
 * Check if a given object implements the PostJotRequest interface.
 */
export function instanceOfPostJotRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PostJotRequestFromJSON(json: any): PostJotRequest {
    return PostJotRequestFromJSONTyped(json, false);
}

export function PostJotRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): PostJotRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'message': !exists(json, 'message') ? undefined : json['message'],
    };
}

export function PostJotRequestToJSON(value?: PostJotRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'message': value.message,
    };
}

