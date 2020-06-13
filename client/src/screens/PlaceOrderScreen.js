// Render PlaceOrder/Informasi Pembelian  Page

import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../actions/orderAction';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { CART_EMPTY_ITEMS } from '../constants/cartConstants';
import Cookies from 'js-cookie';

export default function PlaceOrderScreen(props) {
	const dispatch = useDispatch();

	// mengambil data cart, orderCreate dari global store
	const cart = useSelector(state => state.cart);
	const orderCreate = useSelector(state => state.orderCreate);
 	// extract
	const { cartItems, shipping, payment } = cart;
	const { loading, success, error, order } = orderCreate;
	
	if(!shipping.address) {
		// jika belum melakukan pengisian informasi pengiriman
		props.history.push('/shipping');
	} else if(!payment.paymentMethod) {
		// jika belum melakukan pengisian metode pembayaran
		props.history.push('/payment');
	}

	// menghitung total harga barang
	cart.itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0); 
	// menghitung harga pengiriman barang
	cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
	// menghitung harga pajak
	cart.taxPrice = 0.15*cart.itemsPrice; 
	// menghitung harga total pembayaran yang akan dibayarkan user	
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice; 

	// handle place order
 	const handlePlaceOrder = () => {
		// lakukan dispatch action createOrder dengan memberikan argumen berupa cart (product yang ada dikeranjang/barang pesanan user).
	    dispatch(createOrder(cart));
	    alert('success pembelian barang, silakan lakukan pembayaran. ke profile anda')
 	}

 	// componentDidMount and componentDidUpdate(success)
	useEffect(() => {
		if(success) {
			// jika berhasil melakukan pengisian data order/pesanan (tinggal menunggu pengiriman)

			// dispatch action type CART_EMPTY_ITEMS ke reducer cartReducer 
	      	dispatch({ type: CART_EMPTY_ITEMS });
		    Cookies.remove('cartItems'); // hapus data cart ynag ada di cookie 
			// redirect halaman detail order
			props.history.push(`/order/${order._id}`)
		}
	}, [success]);

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
			<div className="placeorder">
				<div className="placeorder-info">
					<div>
						<h3>Shipping</h3>
					</div>
					<div>
						{shipping.address}, {' '}, {shipping.city}, {' '}, {shipping.postalCode}, {' '}, {shipping.country},
					</div>
					<div>
						<h3>Payment</h3>
						<div>
							Payment Method: {cart.payment.paymentMethod}
						</div>
					</div>
					<div>
						<ul className="cart-list-container">
							<li>
								<h3>Order Items</h3>
								<div>Price</div>
							</li>
							{cartItems.map((item) => (
                <li key={item.product}>
                  <div className="cart-image">
                    { 
		             	item.images !== undefined ?  item.images.map((img, i) => ( <img src={img} key={i} alt="item" /> ))  : null
			        }
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="cart-list-actions">
                      Qty:
                      {' '}
                      {item.qty}

                    </div>
                  </div>
                  <div className="cart-price">
                    Rp.
                    {item.price}
                  </div>
                </li>
              ))}
						</ul>
					</div>
				</div>
				<div className="placeorder-action">	
					<ul>
						<li>
							<button className="button primary" type="button" onClick={handlePlaceOrder}> Place Order </button>
						</li>
						<li>
							<h3>Order Summary</h3>
						</li>
						<li>
							<div>Items</div>
							<div>Rp.{cart.itemsPrice}</div>
						</li>
						<li>
							<div>Shipping</div>
							<div>{cart.shippingPrice ? `Rp.${cart.shippingPrice}` : 'Free'}</div>
						</li>
						<li>
							<div>Tax</div>
							<div>Rp.{cart.taxPrice}</div>
						</li>
						<li>
							<div>Order Total</div>
							<div>Ro.{cart.totalPrice}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}