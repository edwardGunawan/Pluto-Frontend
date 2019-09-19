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
    // either message failed or succeed (on users)
    // register: {message: 'success', }
    register:{},

    // either message failed or succeed
    // events : {message: 'success', event: []}
    events: {},

    
}