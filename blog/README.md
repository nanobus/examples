# NanoBlog 

A simple blog implementation on Nanobus.

### Prerequisites

Before you begin, make sure you have the following installed:

* [Apex](https://apexlang.io)
* [Nanobus](https://github.com/nanobus)
* [Just](https://just.systems)
* [Docker](https://docs.docker.com/get-docker/)
* [Postgres](https://www.postgresql.org)

1) Clone the nanobus/examples directory - ``` git clone ```

2) `cd examples/blog`

3) Run `docker compose up -d`.


### Invoking Nanoblog on the command line

The `nanobus invoke {interface} {method}` allows you to run nanobus actions in your terminal without having nanobus running 

Below is us echoing in a json with the necessary parameters to make a blog post.

``` echo '{ "userId":"myuserid", "title":"My Blog Title ", "body": "This is my blog post" }' | nanobus invoke Blogs postBlog ```

Here are some other method commands you can run (Pass in the id you get from the `postblog` response) -

Show Feed:

``` echo '{}' | nanobus invoke Blogs getFeed ```

Delete Blog Post:

``` echo '{"id":"", "userId":"myuserid" }' | nanobus invoke Blogs deleteBlog ```

Get Single Blog Post:

```echo '{"id":"" }' | nanobus invoke Blogs getBlog```


### Invoking Nanoblog as a web service

* To run the application have it running on localhost:8080, you can run the following command.

* `nanobus`

* Now you have a web service and can make rest calls. Below is an example of a curl command you can run to test out the API calls.

```
curl -X 'POST' \
  'http://localhost:8080/v1/blogs/blog' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "body": "string",
  "title": "string",
  "userId": "string"
}' 
```
## More info

For more info, visit here.


