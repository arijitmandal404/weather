const http = require('http');
const route = require('./routes')
const jsondata = require('./api/weatherData')
const port = 8000;

const server = http.createServer(async (req, res)=>{
    
    if (req.url.startsWith('/api/weather')) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const zip = url.searchParams.get('zip') || '722121';
        try {
            const weatherData = await jsondata.fetchWeather(zip);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(weatherData)); // Send weather data to the frontend
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error fetching weather data');
        }
    }
    else{
        route.handleRouting(req, res);
    }
    
})


server.listen(port, "127.0.0.1", ()=>{
    console.log("server is runnig at localhost 8000");
}) 