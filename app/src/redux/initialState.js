export default {
    currentUser:{
        role: 'Admin',
        email:'',
        username:'',
        isAuthenticated: localStorage.getItem('access_token') ? true : false,
        isFetching: false,
    },
    teams : { },
    // either message failed or succeed
    register:{},
    
}