import express from 'express';
import viteExpress from 'vite-express';
import {createServer} from 'http';

const app = express();
const server = createServer(app)

app.post('/api/launchapp/', express.json(), (req, res) => {
    console.log("launchapp");
    process.send(JSON.stringify({ type: 'launchapp', url: req.body.url, useragent: req.body.useragent }));
    res.send('ok');
});

// var server = app.listen(5173, () => {
//     console.log('Server running on http://localhost:5173');
// });

// viteExpress.bind(app, server);

// viteExpress.listen(app, 5173, () => {
//     console.log('Server running on http://localhost:5173');
// });

server.listen(5173, () => {
    console.log('Server running on http://localhost:5173');
});

viteExpress.bind(app, server);
    
