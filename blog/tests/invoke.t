Test invocation of our service

  $ cd $TESTDIR/.. && echo '{ "userId":"myuserid", "title":"My Blog Title ", "body": "This is my blog post" }' | nanobus invoke blogs.v1::postBlog
  {"body":"This is my blog post","id":".*?","time":".*?","title":"My Blog Title ","userId":"myuserid"} (re)

