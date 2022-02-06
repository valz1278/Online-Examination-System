import { LOGIN,LOGOUT } from '../actions/auth'
import Auth from '../../modules/Auth'

let defaultState = {
    token : false,
}

if(Auth.isUserAuthenticated()){
    try {
        const token = Auth.getToken()
        defaultState.token = token
    } catch (error) {
        defaultState.token = false
    }
}

const authReducers = (state = defaultState,action) => {
    switch(action.type){
        case LOGIN : 
            const authToken = {
                token : action.token
            }        
            Auth.authenticateUser(authToken);
            return authToken
        case LOGOUT : 
            Auth.deauthenticateUser();
            return {
                token : false
            }
        default : 
            return state
    }
}
export default authReducers