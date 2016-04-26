"use strict"
var jsonfile = require("jsonfile")


var data = jsonfile.readFileSync("data.json");


if (!data.tag) {
  data.tag=[];
}


for(var i in data.post){
  var post=data.post[i];
  if (post.title.indexOf("暴露")>=0) {
    data.tag.push({
      value:"楠楠的暴露系列",
      post_id:post.post_id
    });

    data.tag.push({
      value:"小说",
      post_id:post.post_id
    });

  }else if(post.title.indexOf("门房")>=0){
    data.tag.push({
      value:"门房秦大爷的故事",
      post_id:post.post_id
    });
    data.tag.push({
      value:"小说",
      post_id:post.post_id
    });
  }
    
  post.body="---\n"+post.body;
}

jsonfile.writeFileSync("new_data.json",data,{spaces:2});

