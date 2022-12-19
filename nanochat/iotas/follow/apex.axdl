import * from "@apexlang/core"
import * from "@apexlang/rest"
import * from "@apexlang/openapi"

namespace "nanochat.io.follows.v1"

alias UUID = string

interface FollowStore @service {
  # TODO: unique follower/followed relationship - unique constraint
  load(userId: UUID): UserRef
  getMultiple(userIds: [UUID]): stream UserRef
  isFollowing(userId: UUID): bool
  follow(followedId: UUID) # followerId: UUID, 
  unfollow(followedId: UUID) # followerId: UUID, 
  fetchFollowers(userId: UUID, offset: u32 = 0, limit: u32 = 100): stream FollowRef
  fetchFollows(userId: UUID, offset: u32 = 0, limit: u32 = 100): stream FollowRef
  myFollows(): stream FollowRef
}

type FollowRef {
  "User ID."
  id: UUID @column(name: "id")
  "Creation timestamp (for sorting)"
  time: datetime @column(name: "time")
}

"User record"
type UserRef @entity(table: "follow_user") {
  "User ID."
  id: UUID @column(name: "id")
  "The number of followers"
  followers: u32 @column(name: "followers")
  "The number of users followed"
  follows: u32 @column(name: "follows")
}

"Follow record"
type Follow @entity(table: "follow") {
  "The ID of the user being followed"
  followedId: UUID @column(name: "followed_id")
  "The follower's user ID"
  followerId: UUID @column(name: "follower_id")
  "Creation timestamp (for sorting)"
  time: datetime @column(name: "time")
}
