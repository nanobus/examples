import * from "@apexlang/core"
import * from "@apexlang/rest"
import * from "@apexlang/openapi"

namespace "urlshortener.v1"
  @info(
    title: "Simple URL shortener API"
    description: "Simple API for shortening URLs created using NanoBus and Dapr."
    version: "1.0.0"
    termsOfService: "https://api.goodcorp.com/terms/"
    contact: {
      name: "API Support",
      url: "https://api.goodcorp.com/support",
      email: "api@goodcorp.com"
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0"
    }
  )
  @host("api.goodcorp.com")
  @path("/v1")

"The URL shortening service."
interface Shortener @service @uses([Repository]) {
  "Shorten a URL and return a generated identifier."
  shorten(url: string @url): URL
    @PUT @path("/shorten")

  "Return the URL using the generated identifier."
  lookup(id: string): URL
    @GET @path("/{id}") @nocode
}

"Repository handles loading and storing shortened URLs."
interface Repository @provider {
  "Load the URL by its identifier."
  loadById(id: string): URL
  "Load the ID by its URL."
  loadByURL(url: string): URL
  "Store a URL and its identifier."
  storeURL[url: URL]
}

"URL encapsulates the dynamic identifier and the URL it points to."
type URL @entity(table: "url") {
  "The dynamically generated URL identifier."
  id: string @key
  "The original URL that was shortened."
  url: string @rename({go: "URL"})
}
