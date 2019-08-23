const faker = require('faker');

// the DB will mimick the users, the teams it is associated to, and the calendar
// for that user 
let database = {
    usersInfo: {},
    teams: [],
    isAuthenticated: false,
}

// generate random teams
for(let i = 0 ; i< 10; i++) {
    const {teams} = database;
    database.teams = [...teams, faker.random.words()];
}

