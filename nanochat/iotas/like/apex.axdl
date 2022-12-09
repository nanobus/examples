import * from "@apexlang/core"
import * from "@apexlang/rest"
import * from "@apexlang/openapi"

namespace "nanochat.io.like.v1"

alias UUID = string

interface LikeStore @service {
  # TODO: unique follower/followed relationship - unique constraint
  like(likableId: UUID) # userId: UUID
  unlike(likableId: UUID) # userId: UUID
  load(likableId: UUID): Likable
  delete(likableId: UUID): Likable
  getMultiple(likableIds: [UUID]): stream Likable
  getLikedBy(likableId: UUID, offset: u32 = 0, limit: u32 = 100): stream LikeRef #Like
}

type LikeRef {
  "The likers's user ID"
  userId: UUID @column(name: "user_id")
  "Creation timestamp (for sorting)"
  time: datetime @column(name: "time")
}

type Likable @entity(table: "tweets") {
  "Identifer of the likable entity."
  id: UUID @key @column(name: "id")
  "The number of likes."
  likes: u32 = 0 @column(name: "likes")
}

"Like record"
type Like @entity(table: "likes") {
  "The tweet ID liked"
  likableId: UUID @column(name: "likable_id")
  "The likers's user ID"
  userId: UUID @column(name: "user_id")
  "Creation timestamp (for sorting)"
  time: datetime @column(name: "time")
}
