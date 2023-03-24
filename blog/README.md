# NanoBlog 

A simple blog implementation on NanoBus.

### Prerequisites

Before you begin, make sure you have the following installed:

* [Apex](https://apexlang.io)
* [NanoBus](https://github.com/nanobus)
* [Docker](https://docs.docker.com/get-docker/)
* [Postgres](https://www.postgresql.org) (optional)

1) Clone the nanobus/examples directory - ``` git clone https://github.com/nanobus/examples.git ```

2) `cd examples/blog`

3) Run `docker compose up -d`.

### Invoking Nanoblog on the command line

The `nanobus invoke <bus file> <operation>` allows you to run nanobus actions in your terminal without having nanobus running 

Below is us echoing in a json with the necessary parameters to make a blog post.

```sh
echo '{ "userId": "myuserid", "title": "My Blog Title", "body": "This is my blog post" }' | nanobus invoke bus.yaml blogs.v1.Blogs::postBlog
```

Here are some other method commands you can run (Pass in the id you get from the `postblog` response) -

Delete Blog Post:

```sh
echo '{ "id": "", "userId": "myuserid" }' | nanobus invoke bus.yaml blogs.v1.Blogs::deleteBlog
 ```

> Note: `userId` has to be passed because this example does not use authentication/authorization.

Get Single Blog Post:

```sh
echo '{ "id": "" }' | nanobus invoke bus.yaml blogs.v1.Blogs::getBlog
```

Show Feed:

```sh
echo '{}' | nanobus invoke bus.yaml blogs.v1.Blogs::getFeed
```

### Invoking Nanoblog as a web service

* To run the application have it running on localhost:8080, you can run the following command.

* `nanobus`

* Now you have a web service and can make rest calls. Below is an example of a curl command you can run to test out the API calls.

```sh
curl -X 'POST' \
  'http://localhost:8080/v1/blogs' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "body": "string",
  "title": "string",
  "userId": "string"
}'
```
## More info

For more info, visit [here](https://github.com/nanobus/nanobus).
