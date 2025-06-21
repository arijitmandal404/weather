const fs = require('fs');

const serveFile = (filePath, fileType, response) =>{
    fs.readFile(filePath, (err, data)=>{
        if(!err){
            response.writeHead(200, {'content-type' : fileType})
            response.end(data);
        }
        else{
            response.writeHead(400)
            response.end('server error: '+err)
        }
    })
}

const handleRouting = (req, res) =>{
    console.log(req.url);
    console.log(__dirname)
    if(req.url === '/' || req.url === '/public/index.html' ){
        serveFile('../public/index.html', 'text/html', res);
    }else if(req.url === '/public/icons/favicon.png'){
        serveFile('../public/icons/favicon.png', 'image/png', res)
    }else if(req.url === '/public/css/style.css' ){
        serveFile('../public/css/style.css','text/css' , res);
    }else if(req.url === '/public/js/script.js' ){
        serveFile('../public/js/script.js','text/javascript' , res);
    }else if(req.url === '/public/images/sun.png'){
        serveFile('../public/images/sun.png', 'image/png', res);
    }else if(req.url === '/public/images/moon.png'){
        serveFile('../public/images/moon.png', 'image/png', res);
    }else if(req.url === '/public/images/disconnected_icon.png'){
        serveFile('../public/images/disconnected_icon.png', 'image/png', res)
    }else if(req.url === '/public/images/theme_sun.png'){
        serveFile('../public/images/theme_sun.png', 'image/png', res)
    }else if(req.url === '/public/images/theme_moon.png'){
        serveFile('../public/images/theme_moon.png', 'image/png', res)
    }else if(req.url === '/public/morepage.html'){
        serveFile('../public/morepage.html', 'text/html', res)
    }else if(req.url === '/public/css/morepage_style.css'){
        serveFile('../public/css/morepage_style.css', 'text/css', res)
    }else if(req.url === '/public/js/morepage.js'){
        serveFile('../public/js/morepage.js', 'text/javascript', res)
    }else if(req.url === '/public/images/search.png'){
        serveFile('../public/images/search.png', 'image/png', res)
    }else{
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
}

module.exports = {handleRouting};