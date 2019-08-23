const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
// Can pass a limited number of options to this to override (some) defaults
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors, and no-cache)
server.use(middlewares);

server.use(jsonServer.bodyParser);

// sitmulate delay on all requests
server.use(function(req,res, next) {
    setTimeout(next,0);
});

// declaring custom routes below add custom routes before JSON server router

// add createdAt to all POSTS
server.use((req,res,next) => {
    if(req.method === 'POST') {
        req.body.createdAt = Date.now();
    }
    // Continue to JSON server router
    next();
});

// handling POST, Put and PATCH 
server.post('/login', (req,res,next) => {
    res.redirect('/main')
    next();
})


server.use(router);
const port = 30001;
server.listen(
    port, 
    () => console.log(
        `JSON server is is running on ${port}`
    ))