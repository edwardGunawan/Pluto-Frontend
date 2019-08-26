const jsonServer = require('json-server');
const fs = require('fs');
const server = jsonServer.create();
const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
const router = jsonServer.router('db.json');
const jwt = require('jsonwebtoken');
// Can pass a limited number of options to this to override (some) defaults
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors, and no-cache)
server.use(middlewares);

server.use(jsonServer.bodyParser);

const SECRET_KEY = '123456789';
const expiresIn = '1h';



// sitmulate delay on all requests
server.use(function(req,res, next) {
    // if(typeof req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    //     res.status(401).json({status: 401, message: 'Bad authorization header'});
    // }

    try {
        // verifyToken(req.headers.authorization.split(' ')[1]);
        setTimeout(next, 0);
    } catch (e) {
        const status = 401;
        const message = 'Error: access token is not valid';
        res.status(status).json({status,message});
    }
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

server.post('/login', (req,res) => {
    const {email, password, role} = req.body.cred;
    console.log(req.body);
    if(!isAuthenticated({email,password, role})) {
        res.status(403).send();
    }

    const accessToken = createToken({email,password});
    const userInfo = getUserInfo(email);
    console.log(accessToken);
    res.status(200).json({userInfo, accessToken});
});


server.post('/logout', (req,res) => {
    return res.status(200).send();
})


server.post('/register/', (req,res,next) => {
    req.body.slug = createSlug(req.body.name);
    next();
});


server.use(router);
const port = 3001;
server.listen(
    port, 
    () => console.log(
        `JSON server is is running on ${port}`
    ))


// Centralize logic 

// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
// create token
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

//  Verify token
function verify(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) =>
        decode !== undefined ? decode : err
    );
}

// get user info from db
function getUserInfo(email) {
    const {members} = db;
    return members[email];
}

// check if users exist in db 
function isAuthenticated({email, password, role}) {
    const {members} = db;
    if(!members.hasOwnProperty(email)) return false;
    
    return members[`${email}`].password === password && members[`${email}`].role.toLowerCase() === role.toLowerCase();
}