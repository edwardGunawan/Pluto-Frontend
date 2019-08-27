export default {
    currentUser:{
        role: 'Admin',
        email:'',
        username:'',
        isAuthenticated: localStorage.getItem('access_token') ? true : false,
        isFetching: false,
    },
    register : {
        teams:[],
    }
    
}