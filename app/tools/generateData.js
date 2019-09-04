const faker = require('faker');

// the DB will mimick the users, the teams it is associated to, and the calendar
// for that user 
let database = {
    members:{},
    teams: {},
    events: {},
}
const colorName  = ['Turquoise',
'Wisteria','Pumpkin', 'Sun Flower','Pomegranate', 'Midnight Blue', 'Orange','Concrete' ];

const colorSelection = [
    {
        style: {backgroundColor: '#1abc9c'}, 
        name: 'Turquoise'
    },
    {
        style: {backgroundColor: '#8e44ad'},
        name: 'Wisteria',
    }, 
    {
        style: {backgroundColor: '#d35400'},
        name: 'Pumpkin',
    }, 
    {
        style:{backgroundColor: '#f1c40f'},
        name: 'Sun Flower',
    },
    {
        style:{backgroundColor: '#c0392b'},
        name: 'Pomegranate',
    },
    {
        style:{backgroundColor: '#7f8c8d'},
        name: 'Midnight Blue',
    },
    {
        style:{backgroundColor: '#f39c12'},
        name: 'Orange',
    },
    {
        style:{backgroundColor: '#95a5a6'},
        name: 'Concrete'
    }
    
];

// generate random teams
for(let i = 0 ; i< 10; i++) {
    const {teams} = database;
    database.teams = {
        ...teams,
        [i] : {
            id: i,
            teamName: faker.commerce.department(),
            color: 'Turquoise',
        }
    };
}


// generate random members
for(let i = 0 ; i< 20; i++) {
    const {members} = database;
    const username = faker.internet.userName();
    const email = faker.internet.email();
    database.members = {
        ...members,
        [email]: {
            id: faker.random.uuid(),
            username,
            email,
            password: faker.internet.password(),
            age: 23,
            role: {
                'Admin': [database.teams[getRandom(10)].id, database.teams[getRandom(2)].id],
                'User': [database.teams[getRandom(1)].id, database.teams[getRandom(6)].id]
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
        ...members,
        [email]: {
            id: faker.random.uuid(),
            username,
            email,
            password: 'admin123',
            age: 25,
            role: {
                'Admin': [database.teams[getRandom(5)].id, database.teams[getRandom(8)].id],
                'User' : [database.teams[getRandom(4)].id, database.teams[getRandom(7)].id],
            }
        }
    }
}

for(let i = 0 ; i< 20; i++) {
    const id = faker.random.uuid();
    const date = faker.date.future(1);
    database.events = {
        ...database.events,
        [id]: {
            id,
            title: 'Meeting',
            allDay: true,
            team: database.teams[getRandom(10)].teamName,
            start: date,
            end: date,
            color: colorName[getRandom(8)]
        }
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



console.log(JSON.stringify(database));
