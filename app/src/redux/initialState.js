export default {
    currentUser:{
        email:'',
        username:'',
        isAuthenticated: localStorage.getItem('access_token') ? true : false,
        isFetching: false,
        availableDates: [],
    },
    // teams : [{id: , admins:[], users:[], name: }]
    teams : { },
    
    // for updating courses
    // team : {id: number, name: string, admin: Array<String>, users: Array<String>}
    team: {},

    // either message failed or succeed (on users)
    // register: {message: 'success', }
    register:{},

    // either message failed or succeed
    // events : {message: 'success', event: []}
    events: {},

    // consist of all the users
    // [id: number, name: string,username: string, email: string, availableDates: Array<String>]
    users: []

    

    
}