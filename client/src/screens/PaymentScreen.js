// Render Payment/Pembayaran CheckoutSteps Page

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartAction';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentScreen(props) {

	const [paymentMethod, setPaymentMethod] = useState('');
 	const dispatch = useDispatch();
  
	const submitHandler = e => {
		e.preventDefault();
		// lakukan dispatch action savePayment dengan mengirimkan argumen berupa data metode pembayaran yang akan dilakukan.
		dispatch(savePayment({paymentMethod}));
		props.history.push('/placeorder'); // redirect
	}

	return (	
		<div>
			<CheckoutSteps step1 step2 step3 />
			<div className="form">
				<form onSubmit={submitHandler}>
					<ul className="form-container">
						<li>
							<h2>Payment</h2>
						</li>
						<li>
							<input type="radio" checked={paymentMethod === 'paypal'} id="paypal" value="paypal" onChange={() => setPaymentMethod('paypal')} name="paymentMethod" />
							<label htmlFor="paypal">
								Paypal
							</label>
						</li>
						<li>
							<button type="submit" className="button primary">Continue</button>
						</li>
					</ul>
				</form> 
			</div>
		</div>
	)
}