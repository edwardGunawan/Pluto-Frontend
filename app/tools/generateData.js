const faker = require('faker');

// the DB will mimick the users, the teams it is associated to, and the calendar
// for that user 
let database = {
    members:{},
    teams: [],
}

// generate random teams
for(let i = 0 ; i< 10; i++) {
    const {teams} = database;
    database.teams = [...teams, faker.company.bsNoun()];
}


// generate random members
for(let i = 0 ; i< 20; i++) {
    const {members} = database;
    const username = faker.internet.userName();
    const email = faker.internet.email();
    database.members = {
        ...database.members,
        [email]: {
            id: faker.random.uuid(),
            username,
            email,
            password: faker.internet.password(),
            age: 23,
            role: {
                'Admin': [database.teams[getRandom(10)], database.teams[getRandom(2)]],
                'User': [database.teams[getRandom(1)], database.teams[getRandom(6)]]
            },
        }
    };
}



// create fake admin
for(let i = 0 ; i< 10; i++) {
    const {members} = database;
    const username = faker.internet.userName();
    const email = faker.internet.email();
    database.members = {
        ...database.members,
        [email]: {
            id: faker.random.uuid(),
            username,
            email,
            password: 'admin123',
            age: 25,
            role: {
                'Admin': [database.teams[getRandom(5)], database.teams[getRandom(8)]],
                'User' : [database.teams[getRandom(4)], database.teams[getRandom(7)]],
            }
        }
    }
}


function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



console.log(JSON.stringify(database));
