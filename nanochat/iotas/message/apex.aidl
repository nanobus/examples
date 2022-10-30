import * from "@apexlang/core"
import * from "@apexlang/rest"
import * from "@apexlang/openapi"

namespace "nanochat.io.messsage.v1"

alias UUID = string

interface MessageStore @service {
  store(message: string @length(max:280)): Message
  load(id: UUID): Message
  delete(id: UUID): Message
  myMessages(before: datetime?, limit: u32 = 100): stream Message
  getFeed(userIds: [UUID], before: datetime?, limit: u32 = 100): stream Message
  getUserMessages(userId: UUID, before: datetime?, limit: u32 = 100): stream Message
}

"Message record."
type Message @entity(table: "tweets") {
  "The dynamically generated Tweet ID."
  id: UUID @key @column(name: "id")
  "The tweet owner."
  userId: UUID @column(name: "user_id")
  "The message body."
  message: string @column(name: "message")
  "The time the tweet was entered."
  time: datetime @column(name: "time")
}
