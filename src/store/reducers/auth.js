import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'

const initialState ={
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath:'/'
};

const authSuccess = (state, action)=>{
    return updateObject(state,{
        token:action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
    })
}

const authFail = (state, action)=>{
    return updateObject(state,{
        error: action.error,
        loading: false,
    })
}


const authLogout = (state,action) =>{
    return updateObject(state,{token:null, userId:null})
}

const setAuthRedirectPath = (state, action) =>{
    return updateObject (state,{authRedirectPath:action.path})
}


// both ways work either authStart or AuthFail/sucsses, its just a cleaner code  

const reducer = (state = initialState, action) =>{
    switch (action.type){
        case actionTypes.AUTH_START:
            return updateObject(state,{error:null, loading:true});
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH : return setAuthRedirectPath(state,action)

        default: 
            return state;    
    }
}

export default reducer;