import express from 'express';
import viteExpress from 'vite-express';
import {createServer} from 'http';
import { readFile } from 'fs/promises';

var activeprofile = {};

const app = express();
const server = createServer(app)

app.post('/api/launchapp/', express.json(), (req, res) => {
    console.log("launchapp");
    process.send(JSON.stringify({ type: 'launchapp', url: req.body.url, useragent: req.body.useragent }));
    res.send('ok');
});

app.post('/api/profiles/setactive', express.json(), (req, res) => {
    console.log("setactive");
    activeprofile = req.body.profile;
    res.send('ok');
});

app.get("/api/profiles/getactive", async (req, res) => {
    res.send(activeprofile);
});

app.get("/api/profiles/get", async (req, res) => {
    var profiles = await readFile('./data/profiles.json', 'utf-8');
    res.send(JSON.parse(profiles));
})

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
    
