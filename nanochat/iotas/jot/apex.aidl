import * from "@apexlang/core"
import * from "@apexlang/rest"
import * from "@apexlang/openapi"

namespace "nanochat.io.v1.jots"
  @path("/v1")

alias UUID = string

"Jot API"
interface Jots @service @path("/jots") {
  "Post a Tweet."
  postJot(
    message: string @length(max: 280)
  ): Jot @POST @authenticated

  "Get the jot feed"
  getFeed(
    before: datetime? @query
    limit: u32 = 100 @query @range(min: 1, max: 1000)
  ): JotPage @GET @authenticated

  "Get a tweet by id."
  getJot(id: UUID): Jot @GET @path("/{id}")

  "Delete a tweet (only creator has access)"
  deleteJot(id: UUID): Jot @DELETE @path("/{id}") @authenticated

  "Like a tweet"
  like(id: UUID) @GET @path("/{id}/like") @authenticated

  "Unlike a tweet"
  unlike(id: UUID) @DELETE @path("/{id}/like") @authenticated

  "Get the users that like a jot."
  likes(
    id: UUID
    pagination: Pagination @query
  ): UserPage @GET @path("/{id}/likes")
}

"Users API"
interface Users @service @path("/users") {
  "Get the user's profile"
  getProfile(handle: string): User @GET @path("/{handle}")

  "Get the user's jots."
  getJots(
    handle: string
    before: datetime? @query
    limit: u32 = 100 @query @range(min: 1, max: 1000)
  ): JotPage @GET @path("/{handle}/jots")

  "Follow a user"
  follow(handle: string) @GET @path("/{handle}/follow") @authenticated

  "Unfollow a user"
  unfollow(handle: string) @DELETE @path("/{handle}/follow") @authenticated

  "Get users the followed by the users"
  getFollows(
    handle: string
    pagination: Pagination @query
  ): UserPage @GET @path("/{handle}/follows")

  "Get followers of a user"
  getFollowers(
    handle: string
    pagination: Pagination @query
  ): UserPage @GET @path("/{handle}/followers")
}


"Jot."
type Jot {
  "The dynamically generated ID."
  id: UUID
  "The jot owner ID."
  userId: UUID
  "The jot owner handle"
  handle: string
  "The message body."
  message: string
  "The time the tweet was entered."
  time: datetime
  "The number of likes."
  likes: u32
}

"Jot page"
type JotPage {
  "Before timestamp"
  before: datetime?
  "Limit result"
  limit: u32
  "The tweets returned"
  items: [Jot]
}

"User entity"
type User {
  "User ID."
  id: UUID
  "Handle."
  handle: string
  "The number of followers"
  followers: u32
  "The number of users followed"
  follows: u32
  "If the authenticated user is following this user. Will return false if unauthenticated or outside of Users::getProfile."
  isFollowing: bool
}

"User page"
type UserPage {
  "Offet"
  offset: u32
  "Limit"
  limit: u32
  "The users returned"
  items: [User]
}

"Pagination query parameters"
type Pagination {
  "Offset"
  offset: u32 = 0
  "Limit"
  limit: u32 = 100
}
