import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = ()=> {
    return{
       type: actionTypes.AUTH_START 
    }
}

export const authSuccess = (token,userId) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail = (error) =>{ 
    return{
        type:actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) =>{
    return dispatch => {
        dispatch(authStart());
        const authData ={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url= 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc6ycbLbVCC2QibSM9aom7QH90MfcFAo0'
        if(!isSignup){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc6ycbLbVCC2QibSM9aom7QH90MfcFAo0'
        }
        axios.post(url, authData)
        .then(res =>{
            console.log(res);
            //we doing the local storage so it wont sing up with refreshing the page
            localStorage.setItem('token',res.data.idToken);
            const expirationDate =new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(res.data.idToken,res.data.localId))
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch(err=>{
            console.log(err.response.data.error.message);
            dispatch(authFail(err.response.data.error))
        }

        )
    }
}

export const setAuthRedirectPath = (path) =>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}