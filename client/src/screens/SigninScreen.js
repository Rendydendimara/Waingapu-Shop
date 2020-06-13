// Render Signin Page

import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import ErrorBox from '../components/ErrorBox';

export default function SigninScreen(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const userSignin = useSelector(state => state.userSignin);
	const { loading, userInfo, error } = userSignin;
  	const dispatch = useDispatch();

	// Ambil url redirect yang akan tujukan setelah user berhasil/sudah signin.
	const redirect = props.location.search ? props.location.search.split('=')[1]: '/';

	// componentDidMount and componentDidUpdate(userInfo)
	useEffect(() => {
		// cek apakah user sudah login atau belum
		if(userInfo) {
			/**
			 * User sudah login
			 * Redirect ke url yang akan di redirect (/shipping)
			 */
			props.history.push(redirect);
		}
		return () => {
			
		};
	}, [userInfo]);

	// Handle submitHandler
	const handleSubmit = e => {
		e.preventDefault();
		// lakukan dispatch action signin pada userAction
		dispatch(signin(email, password));
	}

	return (	
		<div className="form">
			<form onSubmit={handleSubmit}>
				<ul className="form-container">
					<li>
						<h2>Sign-In</h2>
					</li>
					{loading && (
						<li>
							<LoadingBox />
						</li>
					)}
					{error && (
						<li>
							<ErrorBox message={error} />
						</li>
					)}
			          <li>
			            <label htmlFor="email">Email </label>
			            <input
			              type="email"
			              name="email"
			              id="email"
			              required
			              value={email}
			              onChange={(e) => setEmail(e.target.value)}
			            />
			          </li>
			          <li>
			            <label htmlFor="password">Password </label>
			            <input
			              type="password"
			              name="password"
			              id="password"
			              required
			              value={password}
			              onChange={(e) => setPassword(e.target.value)}
			            />
			          </li>
						<li>
							<button type="submit" className="button primary">Signin</button>
						</li>
						<li>New to WGP SHOP?</li>
						<li> 
							<Link to={redirect === '/' ? 'register' : 'register?redirect='+redirect} className="button full-width">Create account</Link>
						</li>
				</ul>
			</form>
		</div>
	)
}