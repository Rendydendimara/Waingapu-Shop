// User Action 

import axios from 'axios';
import Cookie from 'js-cookie';
import {USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL} from '../constants/userConstants';
import { getErrorMessage } from '../utils';

/**
 * Signin Action
 * @param  [email, password]  [email user yang login, password user yang login]
 * @return none
 * Melakukan fetch API ke server untuk post data user untuk melakukan login kemudian dispatch  action type yang sesuai dari hasil fetch API ke server ke reducer userSiginReducer. 
 */ 
const signin = (email, password) => async(dispatch) => {
	dispatch({ type: USER_SIGNIN_REQUEST });
	try {
		const { data } = await axios.post('http://localhost:5000/api/users/signin', {email, password});
		dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
		Cookie.set('userInfo', JSON.stringify(data)); // set cookie untuk userInfo yang berupa data user yang berhasil signin
	} catch(error) {
		dispatch({type: USER_SIGNIN_FAIL, payload: getErrorMessage(error)});
	}
}
	
/**
 * Signin Action
 * @param  [name, email, password]  [nama user register, email user register, password user register]
 * @return none
 * Melakukan fetch API ke server untuk post data user untuk melakukan register kemudian dispatch ke reducer userRegisterReducer
 */ 
const register = (name, email, password) => async(dispatch) => {
	dispatch({ type: USER_REGISTER_REQUEST, payload: {name, email, password} });
	try {
		const { data } = await axios.post('http://localhost:5000/api/users/register', {name, email, password});
		console.log(data)
		dispatch({type: USER_REGISTER_SUCCESS, payload: data});
		Cookie.set('userInfo', JSON.stringify(data)); // set cookie untuk userInfo ynag berupa data user yang berhasil register
	} catch(error) {
	    console.log('gagal register');
		dispatch({type: USER_REGISTER_FAIL, payload: getErrorMessage(error)});
	}
}

/**
 * Logout Action
 * @param  none
 * @return none
 * Melakukan penghapusan informasi user yang login didalam cookie kemudian dispatch ke reducer userRegisterReducer
 */ 
const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}

/**
 * Update Action
 * @param  [userId, name, email, password]  [id nama user, nama user, email user, password user]
 * @return none
 * Melakukan fetch API ke server untuk put data user kedalam database user berdasarkan id user kemudian dispatch  action type yang sesuai dari hasil fetch API ke server ke reducer userUpdateReducer dan userSiginReducer. 
 */ 
const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await axios.put("http://localhost:5000/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data)); // update cookie untuk userInfo ynag berupa data user yang sudah diupdate datanya
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: getErrorMessage(error) });
  }
}

export { signin, register, update, logout };