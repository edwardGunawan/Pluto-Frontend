export default {
    currentUser:{
        role: 'Admin',
        email:'',
        username:'',
        isAuthenticated: localStorage.getItem('access_token') ? true : false,
        isFetching: false,
    },
    // teams : { network: { color: 'rgba(1,2,3)', user:[user1, user2, user3]}
    teams : { },
    // either message failed or succeed
    // register: {message: 'success', }
    register:{},
    
}