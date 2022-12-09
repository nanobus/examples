import * from "@apexlang/core"
import * from "@apexlang/rest"
import * from "@apexlang/openapi"

namespace "nanochat.io.user.v1"

alias UUID = string

interface UserStore @service {
  me(): User
  load(userId: UUID): User
  getMultiple(userIds: [UUID]): stream User
  findByHandle(handle: string): User
  getFive(): stream User
}

"User record"
type User @entity(table: "user") {
  "User ID."
  id: UUID @column(name: "id")
  "Handle."
  handle: string @column(name: "handle")
}
