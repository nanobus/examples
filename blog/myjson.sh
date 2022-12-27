#!/bin/bash


FILE=$1

BLOG=$(cat $FILE)

JSON=$(jq --null-input \
  --arg blog "$BLOG" \
  '{"message": $blog}')

# echo $JSON | nanobus invoke nanoblog.io.v1.Blogs postBlog
echo $JSON 
echo { "message": "Contrary to popular belief" } | nanobus invoke nanoblog.io.v1.Blogs postBlog