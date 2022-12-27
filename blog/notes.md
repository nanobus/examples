```yaml
id: nanoblog
version: 0.0.1
interfaces:
  Blogs:
    postBlog:
      steps:
        - name: Post a blog
          uses: "@postgres/query"
          with:
            resource: messagedb
            single: true
            sql: |-

              INSERT INTO message (user_id, message, time)
              VALUES ($1, $2, now())
              RETURNING *
            args:
              - claims.sub
              - input.message
```

When I try to invoke postBlog, I get a null response rather than an error providing any feedback.

Command I ran was:
echo '{ "message": "Contrary to popular belief" }' | nanobus invoke Blogs postBlog --bus=bus\ copy.yaml 

###################################################################################################################################
###################################################################################################################################
My Command:
echo '{ "userId":"myuserid", "title":"My Blog Title", "body": "Contrary to popular belief" }' | nanobus invoke Blogs postBlog

My Response:
{"body":"Contrary to popular belief","id":"fe80b07f-d886-432a-b0a6-7394211f4232","time":"2022-12-22T11:42:59.741433-05:00","title":"My Blog Title","userId":"myuserid"}


getBlog:
echo '{"id":"fe80b07f-d886-432a-b0a6-7394211f4232", "body":"This is my updated blog post" }' | nanobus invoke Blogs editBlog

echo '{"id":"fe80b07f-d886-432a-b0a6-7394211f4232" }' | nanobus invoke Blogs getBlog

"id":"2bb6cd9e-beb7-45f3-88f5-2f5798222b93"






###################################################################################################################################
###################################################################################################################################

```yaml
id: nanoblog
version: 0.0.1
interfaces:
  Blogs:
    getFeed:
      steps:
       - name: Get blog timeline for multiple users
         uses: "@postgres/query"
         with:
          resource: blogdb
          sql: |-

            SELECT * FROM blog
            ORDER BY time DESC
```
When I run this command 
echo '{}' | nanobus invoke Blogs getFeed --bus=bus\ copy.yaml

###################################################################################################################################
###################################################################################################################################
echo '{}' | nanobus invoke Blogs getFeed --bus=bus\ copy.yaml
echo '{}' | nanobus invoke Blogs getFeed --pretty
echo '{}' | nanobus invoke Blogs getFeed
echo '{ "userId":"myuserid3", "title":"My Latest Blog Title Part 2", "body": "This is popular belief believe it or not" }' | nanobus invoke Blogs postBlog
echo '{ "userId":"myuserid2", "title":"My Latest Blog Title", "body": "This is popular belief" }' | nanobus invoke Blogs postBlog
echo '{"id":"fe80b07f-d886-432a-b0a6-7394211f4232" }' | nanobus invoke Blogs getBlog
echo '{"id":"fe80b07f-d886-432a-b0a6-7394211f4232", "body":"This is my updated blog post" }' | nanobus invoke Blogs editBlog
echo '{"id":"2bb6cd9e-beb7-45f3-88f5-2f5798222b93", "userId":"myuserid2" }' | nanobus invoke Blogs deleteBlog

###################################################################################################################################
###################################################################################################################################

pre reqs.
How to run it.
How to interact with it
Postman/Swagger