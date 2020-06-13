// Render Register Page

import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';

export default function SigninScreen(props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const userRegister = useSelector(state => state.userRegister);
	const { loading, userInfo, error } = userRegister;
 	const dispatch = useDispatch();
    
  // ambil url redirect yang akan tujukan setelah user berhasil signin (default /).
  const redirect = props.location.search ? props.location.search.split('=')[1]: '/';

  // componentDidMout and componentDidUpdate(userInfo)
	useEffect(() => {
		// cek apakah userInfo ada atau kosong
		if(userInfo) {
			/** user info ada 
		   * user sudah login, tidak perlu register
			 * redirect ke halaman utama
			 */
			props.history.push(redirect);
		}
		return () => {
			
		};
	}, [userInfo]);

	const handleSubmit = e => {
		e.preventDefault();
		// lakukan dispatch action register dengan mengirimkan argumen berupa data user register.
		dispatch(register(name, email, password));
	}

	return (	
		<div className="form">
			<form onSubmit={handleSubmit}>
				<ul className="form-container">
					<li>
						<h2>Create Account</h2>
					</li>
				 {error && (
            <li>
              <ErrorBox message={error} />
            </li>
          )}
          {loading && (
            <li>
              <LoadingBox />
            </li>
          )}
					<li>
						<label htmlFor="name">
							Name
						</label>
						<input 
							type="text" 
							name="name" 
							id="name" 
							onChange={e => setName(e.target.value)} 
						/>
					</li>
					<li>
						<label htmlFor="email">
							Email
						</label>
						<input 
							type="email" 
							name="email" 
							id="email" 
							onChange={e => setEmail(e.target.value)}
						/>
					</li>
					<li>
						<label htmlFor="password">
							Password
						</label>
						<input 
							type="password" 
							name="password" 
							id="password" 
							onChange={e => setPassword(e.target.value)} 
						/>
					</li>
					<li>
						<label htmlFor="rePassword">
							Re-Password
						</label>
						<input 
							type="password" 
							name="rePassword" 
							id="rePassword" 
							onChange={e => setRePassword(e.target.value)} 
						/>
					</li>
					<li>
						<button type="submit" className="button primary">Register</button>
					</li>
					 <li>
            <div>
              Already have an account?
               &nbsp;
              <Link to={redirect === '/' ? '/signin' : `/signin?redirect=${redirect}`}>
                Sign-In
              </Link>
            </div>
          </li>
				</ul>
			</form>
		</div>
	)
}