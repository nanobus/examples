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


import * as runtime from '../runtime';
import type {
  Jot,
  JotPage,
  PostJotRequest,
  UserPage,
} from '../models';
import {
    JotFromJSON,
    JotToJSON,
    JotPageFromJSON,
    JotPageToJSON,
    PostJotRequestFromJSON,
    PostJotRequestToJSON,
    UserPageFromJSON,
    UserPageToJSON,
} from '../models';

export interface DeleteJotRequest {
    id: string;
}

export interface GetFeedRequest {
    before?: Date;
    limit?: number;
}

export interface GetJotRequest {
    id: string;
}

export interface LikeRequest {
    id: string;
}

export interface LikesRequest {
    id: string;
    offset?: number;
    limit?: number;
}

export interface PostJotOperationRequest {
    postJotRequest?: PostJotRequest;
}

export interface UnlikeRequest {
    id: string;
}

/**
 * 
 */
export class JotsApi extends runtime.BaseAPI {

    /**
     * Delete a tweet (only creator has access)
     */
    async deleteJotRaw(requestParameters: DeleteJotRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Jot>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteJot.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/jots/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => JotFromJSON(jsonValue));
    }

    /**
     * Delete a tweet (only creator has access)
     */
    async deleteJot(requestParameters: DeleteJotRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Jot> {
        const response = await this.deleteJotRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get the jot feed
     */
    async getFeedRaw(requestParameters: GetFeedRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<JotPage>> {
        const queryParameters: any = {};

        if (requestParameters.before !== undefined) {
            queryParameters['before'] = (requestParameters.before as any).toISOString();
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/jots`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => JotPageFromJSON(jsonValue));
    }

    /**
     * Get the jot feed
     */
    async getFeed(requestParameters: GetFeedRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<JotPage> {
        const response = await this.getFeedRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get a tweet by id.
     */
    async getJotRaw(requestParameters: GetJotRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Jot>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getJot.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/jots/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => JotFromJSON(jsonValue));
    }

    /**
     * Get a tweet by id.
     */
    async getJot(requestParameters: GetJotRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Jot> {
        const response = await this.getJotRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Like a tweet
     */
    async likeRaw(requestParameters: LikeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling like.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/jots/{id}/like`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Like a tweet
     */
    async like(requestParameters: LikeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.likeRaw(requestParameters, initOverrides);
    }

    /**
     * Get the users that like a jot.
     */
    async likesRaw(requestParameters: LikesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserPage>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling likes.');
        }

        const queryParameters: any = {};

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/jots/{id}/likes`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserPageFromJSON(jsonValue));
    }

    /**
     * Get the users that like a jot.
     */
    async likes(requestParameters: LikesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserPage> {
        const response = await this.likesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Post a Tweet.
     */
    async postJotRaw(requestParameters: PostJotOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Jot>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/v1/jots`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: PostJotRequestToJSON(requestParameters.postJotRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => JotFromJSON(jsonValue));
    }

    /**
     * Post a Tweet.
     */
    async postJot(requestParameters: PostJotOperationRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Jot> {
        const response = await this.postJotRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Unlike a tweet
     */
    async unlikeRaw(requestParameters: UnlikeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling unlike.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/jots/{id}/like`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Unlike a tweet
     */
    async unlike(requestParameters: UnlikeRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.unlikeRaw(requestParameters, initOverrides);
    }

}
