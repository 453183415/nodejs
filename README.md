# node
a simple web service about node.js
this projecte have three interface

search by name url:localhost:5000/book/seach_name 
request :get
{
  name
}
response:
{
  number:num,
  books:[]
}

search by ID  url:localhost:5000/book/search_id

request : get
{
  book id
}

response:
{
  number:num,
  books:[]
}

update by id url:localhost:5000:/book/update
request: post
{
  ID:id,
  Info:[{key:value,...,kye:value}]
}

response
{
  statue:bool;//TRUE is success，FALSE is failed
}



