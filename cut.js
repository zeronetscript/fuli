var LineByLineReader = require('line-by-line');
var jsonfile = require('jsonfile');

var lr = new LineByLineReader('honglou.txt');

var data = jsonfile.readFileSync("data.json");

var first =true;

lr.on('error', function (err) {
  console.log(err);
});

var post;

lr.on('line', function (line) {
  if (line.match(/第.*集.*第.*回/) || first) {

    post = {
      post_id:data.next_post_id,
      title:first?"红楼遗秘 - 前言":"红楼遗密 "+line,
      date_published: new Date().getTime()/1000,
      body:"---\n"
    }
    data.post.unshift(post);
    first= false;
    data.next_post_id++;
    data.tag.push({
      value:"红楼遗秘",
      post_id:post.post_id
    });
    data.tag.push({
      value:"小说",
      post_id:post.post_id
    });
  }else{
    post.body += ("\n"+line);
  }
});

lr.on('end', function () {
  data.modified = new Date().getTime()/1000;
  jsonfile.writeFileSync("new_data.json",data,{spaces:2});
});


