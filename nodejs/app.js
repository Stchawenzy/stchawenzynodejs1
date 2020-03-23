const http=require('http');
const fs=require('fs');
const path=require('path');
var qs = require('querystring');

const server= http.createServer(
(req, res)=>{
if(req.method=='POST' && req.url=='/message'){
    var body='';
    req.on('data', (data)=>{
   body+=data;
   if (body.length > 1e6)
   request.connection.destroy();
 });
 req.on('end', ()=>{
     var post=qs.parse(body);
        fs.writeFile(path.join(__dirname, "/html", "message.txt"),  
        post.message,
              err => {
                if (err) throw err;
                res.end(`Submitted!!!`);
              });
 });
}else{
    let urlpath=path.join(__dirname,
        'html',
        req.url==='/'? 'index.html':req.url
        );
    let ext=path.extname(urlpath);
     let contentype='text/html';

     switch(ext){
        case '.html':
            contenttype='text/html';
            break;
        case '.js':
            contenttype='text/javascript';
            break;
        case '.css':
            contenttype='text/css';
            break;
        case '.json':
            contenttype='application/json';
            break;
        case '.png':
            contenttype='image/png';
            break;
        case '.jpg':
            contenttype='image/jpg';
            break;
      }
      
      fs.readFile(urlpath,(err, content)=>{
          if(err){
                if(err.code=='ENOENT'){
                    res.end('404 error, page not fund') 
                }
          }else{
            res.writeHead(200, {'Content-Tpe':contentype});
            res.end(content, 'utf8');

          }

      });
    }
    }
);

const port=process.env.port || 8080
server.listen(port,()=>console.log(`listening to port ${port}`));