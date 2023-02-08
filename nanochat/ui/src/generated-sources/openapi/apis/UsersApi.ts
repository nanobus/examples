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
  JotPage,
  User,
  UserPage,
} from '../models';
import {
    JotPageFromJSON,
    JotPageToJSON,
    UserFromJSON,
    UserToJSON,
    UserPageFromJSON,
    UserPageToJSON,
} from '../models';

export interface FollowRequest {
    handle: string;
}

export interface GetFollowersRequest {
    handle: string;
    offset?: number;
    limit?: number;
}

export interface GetFollowsRequest {
    handle: string;
    offset?: number;
    limit?: number;
}

export interface GetJotsRequest {
    handle: string;
    before?: Date;
    limit?: number;
}

export interface GetProfileRequest {
    handle: string;
}

export interface UnfollowRequest {
    handle: string;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * Follow a user
     */
    async followRaw(requestParameters: FollowRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.handle === null || requestParameters.handle === undefined) {
            throw new runtime.RequiredError('handle','Required parameter requestParameters.handle was null or undefined when calling follow.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/users/{handle}/follow`.replace(`{${"handle"}}`, encodeURIComponent(String(requestParameters.handle))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Follow a user
     */
    async follow(requestParameters: FollowRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.followRaw(requestParameters, initOverrides);
    }

    /**
     * Get five random users to suggest
     */
    async getFiveRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserPage>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/users/five`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserPageFromJSON(jsonValue));
    }

    /**
     * Get five random users to suggest
     */
    async getFive(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserPage> {
        const response = await this.getFiveRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get followers of a user
     */
    async getFollowersRaw(requestParameters: GetFollowersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserPage>> {
        if (requestParameters.handle === null || requestParameters.handle === undefined) {
            throw new runtime.RequiredError('handle','Required parameter requestParameters.handle was null or undefined when calling getFollowers.');
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
            path: `/v1/users/{handle}/followers`.replace(`{${"handle"}}`, encodeURIComponent(String(requestParameters.handle))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserPageFromJSON(jsonValue));
    }

    /**
     * Get followers of a user
     */
    async getFollowers(requestParameters: GetFollowersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserPage> {
        const response = await this.getFollowersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get users the followed by the users
     */
    async getFollowsRaw(requestParameters: GetFollowsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserPage>> {
        if (requestParameters.handle === null || requestParameters.handle === undefined) {
            throw new runtime.RequiredError('handle','Required parameter requestParameters.handle was null or undefined when calling getFollows.');
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
            path: `/v1/users/{handle}/follows`.replace(`{${"handle"}}`, encodeURIComponent(String(requestParameters.handle))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserPageFromJSON(jsonValue));
    }

    /**
     * Get users the followed by the users
     */
    async getFollows(requestParameters: GetFollowsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserPage> {
        const response = await this.getFollowsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get the user\'s jots.
     */
    async getJotsRaw(requestParameters: GetJotsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<JotPage>> {
        if (requestParameters.handle === null || requestParameters.handle === undefined) {
            throw new runtime.RequiredError('handle','Required parameter requestParameters.handle was null or undefined when calling getJots.');
        }

        const queryParameters: any = {};

        if (requestParameters.before !== undefined) {
            queryParameters['before'] = (requestParameters.before as any).toISOString();
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/users/{handle}/jots`.replace(`{${"handle"}}`, encodeURIComponent(String(requestParameters.handle))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => JotPageFromJSON(jsonValue));
    }

    /**
     * Get the user\'s jots.
     */
    async getJots(requestParameters: GetJotsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<JotPage> {
        const response = await this.getJotsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get the user\'s profile
     */
    async getProfileRaw(requestParameters: GetProfileRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        if (requestParameters.handle === null || requestParameters.handle === undefined) {
            throw new runtime.RequiredError('handle','Required parameter requestParameters.handle was null or undefined when calling getProfile.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/users/{handle}`.replace(`{${"handle"}}`, encodeURIComponent(String(requestParameters.handle))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     * Get the user\'s profile
     */
    async getProfile(requestParameters: GetProfileRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.getProfileRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async meRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<User>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/users/me`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserFromJSON(jsonValue));
    }

    /**
     */
    async me(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<User> {
        const response = await this.meRaw(initOverrides);
        return await response.value();
    }

    /**
     * Unfollow a user
     */
    async unfollowRaw(requestParameters: UnfollowRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.handle === null || requestParameters.handle === undefined) {
            throw new runtime.RequiredError('handle','Required parameter requestParameters.handle was null or undefined when calling unfollow.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/v1/users/{handle}/follow`.replace(`{${"handle"}}`, encodeURIComponent(String(requestParameters.handle))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Unfollow a user
     */
    async unfollow(requestParameters: UnfollowRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.unfollowRaw(requestParameters, initOverrides);
    }

}
