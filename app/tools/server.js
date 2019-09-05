const jsonServer = require('json-server');
const fs = require('fs');
const server = jsonServer.create();
const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'));
const router = jsonServer.router('db.json');
const jwt = require('jsonwebtoken');
const events = require('./events');
// Can pass a limited number of options to this to override (some) defaults
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors, and no-cache)
server.use(middlewares);

server.use(jsonServer.bodyParser);

const SECRET_KEY = '123456789';
const expiresIn = '1h';

/// Fake in-memory events
let inMemoryEvents = {...events};



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
    // console.log('req body', req.body);
    if(!isAuthenticated({email,password, role})) {
        res.status(403).send();
        res.end();
    }

    const accessToken = createToken({email,password});
    const userInfo = getUserInfo(email);
    console.log(accessToken, userInfo);
    res.status(200).json({userInfo, accessToken});
});


server.post('/logout', (req,res) => {
    res.status(200).send();
})

server.get('/users', (req,res) => {
    console.log(req.headers);
    const { members, teams } = db;
    const {role } = members[Object.keys(members)[0]];
    const {Admin, User} = role;
    const newRole = {
        Admin: Admin.map(teamId => teams[teamId].teamName),
        User: User.map(teamId => teams[teamId].teamName),
    }

    const user = {
        ...members[Object.keys(members)[0]],
        role: newRole,
    }
    
    res.status(200).json(user);
})


server.post('/register', (req,res) => {
    const {username, password, team, age, role} = req.body.user;
    console.log(username);
    console.log(password);
    console.log(team);
    console.log(age);
    console.log(role);
    if(!validateRegistration(req.body.user)) {
        res.status(400).send()
    };

    res.status(200).send();
});

// get all the users corresponding to the team, either admin, or user
server.get('/teams/:teamName', (req,res,next) => {
    const {members, teams} = db;
    const {teamName} = req.params;
    let teamId = null;
    Object.values(teams).forEach((val) => {
        if(teamName === val.teamName) {
            teamId = val.id;
        }
    })
    let users = [];
    Object.values(members).forEach(val => {
        const {role, username} = val;
        const {Admin={}, User={}} = role;
        
        if(Admin.indexOf(teamId) > 0  || User.indexOf(teamId) > 0) {
            users = [...users, username];
        }
    });

    res.status(200).json({...teams[teamId] ,users});
});


/**
 * Events
 */
// get user events
server.get('/events/:username',(req,res) => {
    res.status(200).json(inMemoryEvents);
})


server.post('/events/:username', (req,res) => {
    const {id} = req.body;
    console.log(id);
    inMemoryEvents = {
        ...inMemoryEvents,
        [id]: req.body,
    }
    res.status(201).send();
});

server.put('/events/:username/:id', (req, res) => {
    console.log(req.body);
    const {id} = req.params;
    console.log('inMemorty events', inMemoryEvents);
    inMemoryEvents = {
        ...inMemoryEvents,
        [id]: req.body,
    }
    res.status(204).send();
});

server.delete('/events/:username/:id', (req,res) => {
    const {id} = req.params;
    inMemoryEvents = Object.keys(inMemoryEvents).reduce(
        (acc, eventId) => {
            if(eventId === id) return acc;
            return {
                ...acc,
                [eventId]: inMemoryEvents[eventId],
            }
        },
        {}
    );
    res.status(204).send();
})


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
function isAuthenticated({email, password}) {
    const {members} = db;
    if(!members.hasOwnProperty(email)) return false;
    
    return members[`${email}`].password === password;
}

function validateRegistration(user) {
    const {username, password, team, age, role} = user;
    return username && password && team && age && role;
    // if(!username) return 'username is required';
    // if(!password) return 'password is required';
    // if(!team) return 'team is required';
    // if(!role) return 'role is required';
    // if(!age) return 'age is required';
    // return '';
}